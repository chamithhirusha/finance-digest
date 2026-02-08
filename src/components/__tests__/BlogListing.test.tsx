import { render, screen, fireEvent, act } from "@testing-library/react";
import { BlogListing } from "../BlogListing";
import { getNews } from "@/utils/api";
import { TBlog } from "@/utils/types";

// -----------------------------
// Mock API and child components
// -----------------------------
jest.mock("@/utils/api");
jest.mock("../BlogItem", () => ({
  BlogItem: ({ data }: { data: TBlog }) => (
    <div>{`BlogItem: ${data.headline}`}</div>
  ),
}));
jest.mock("../Alert", () => ({
  Alert: ({ label, onClose }: { label: string; onClose: () => void }) => (
    <div>
      Alert: {label} <button onClick={onClose}>Close</button>
    </div>
  ),
}));
jest.mock("../Icons", () => ({
  SortIcon: () => <div>SortIcon</div>,
}));

// -----------------------------
// Mock IntersectionObserver
// -----------------------------
beforeAll(() => {
  class MockIntersectionObserver {
    observe = jest.fn();
    disconnect = jest.fn();
  }
  // @ts-ignore
  window.IntersectionObserver = MockIntersectionObserver;
});

// -----------------------------
// Mock window.scrollTo
// -----------------------------
Object.defineProperty(window, "scrollTo", { value: jest.fn(), writable: true });

// -----------------------------
// Mock blog data matching TBlog
// -----------------------------
const mockBlogs: TBlog[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  category: `Category ${i + 1}`,
  headline: `Blog Post ${i + 1}`,
  datetime: Date.now() + i * 1000,
  image: `https://picsum.photos/200/300?random=${i + 1}`,
  related: `Related ${i + 1}`,
  source: `Source ${i + 1}`,
  summary: "Lorem ipsum",
  url: `/blog/${i + 1}`,
}));

const mockedGetNews = getNews as jest.MockedFunction<typeof getNews>;

// -----------------------------
// Test suite
// -----------------------------
describe("BlogListing Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    mockedGetNews.mockResolvedValueOnce(mockBlogs);

    render(<BlogListing />);
    expect(screen.getByText(/Loading blogs.../i)).toBeInTheDocument();
    await act(async () => {}); // wait for useEffect
  });

  it("renders blogs after fetch", async () => {
    mockedGetNews.mockResolvedValueOnce(mockBlogs);

    await act(async () => {
      render(<BlogListing />);
    });

    // Sort blogs the same way the component does
    const sortedBlogs = [...mockBlogs].sort((a, b) => b.datetime - a.datetime);

    // First 8 items should render
    sortedBlogs.slice(0, 8).forEach((blog) => {
      expect(
        screen.getByText(new RegExp(blog.headline, "i")),
      ).toBeInTheDocument();
    });

    // Infinite scroll loader should appear
    expect(screen.getByText(/Loading more.../i)).toBeInTheDocument();
  });

  it("handles API error", async () => {
    mockedGetNews.mockRejectedValueOnce(new Error("API Error"));

    await act(async () => {
      render(<BlogListing />);
    });

    expect(screen.getByText(/Alert: API Error/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByText(/Alert: API Error/i)).not.toBeInTheDocument();
  });

  it("toggles sort order", async () => {
    mockedGetNews.mockResolvedValueOnce(mockBlogs);

    await act(async () => {
      render(<BlogListing />);
    });

    const sortButton = screen.getByRole("button", {
      name: /Toggle sort order/i,
    });
    expect(sortButton.textContent).toContain("Latest to older");

    fireEvent.click(sortButton);
    expect(sortButton.textContent).toContain("Older to latest");

    fireEvent.click(sortButton);
    expect(sortButton.textContent).toContain("Latest to older");
  });

  it("renders fewer blogs if total is less than ITEMS_PER_LOAD", async () => {
    const smallBlogList = mockBlogs.slice(0, 5);
    mockedGetNews.mockResolvedValueOnce(smallBlogList);

    await act(async () => {
      render(<BlogListing />);
    });

    smallBlogList.forEach((blog) => {
      expect(
        screen.getByText(new RegExp(blog.headline, "i")),
      ).toBeInTheDocument();
    });

    // Infinite scroll loader should NOT appear because all items are visible
    expect(screen.queryByText(/Loading more.../i)).not.toBeInTheDocument();
  });
});
