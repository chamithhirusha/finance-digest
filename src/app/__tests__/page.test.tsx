import { render, screen, fireEvent, act, within } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/components/Header", () => ({
  Header: () => <div>Header Component</div>,
}));
jest.mock("@/components/BlogListing", () => ({
  BlogListing: () => <div>BlogListing Component</div>,
}));
jest.mock("@/components/Icons", () => ({
  BitcoinIcon: () => <div>BitcoinIcon</div>,
  CircleArrowUpIcon: () => <div>CircleArrowUpIcon</div>,
}));

Object.defineProperty(window, "scrollTo", { value: jest.fn(), writable: true });

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Header, BlogListing, and titles", () => {
    render(<Home />);

    expect(screen.getByText("Header Component")).toBeInTheDocument();
    expect(screen.getByText("BlogListing Component")).toBeInTheDocument();

    const desktopContainer = screen.getByTestId("desktop-title");
    expect(
      within(desktopContainer).getByText(/Latest news/i),
    ).toBeInTheDocument();
    expect(within(desktopContainer).getByText(/From/i)).toBeInTheDocument();
    expect(
      within(desktopContainer).getByText(/The world/i),
    ).toBeInTheDocument();

    const mobileContainer = screen.getByTestId("mobile-title");
    expect(
      within(mobileContainer).getByText(/Latest news from the world of/i),
    ).toBeInTheDocument();
  });

  it("go to top button is hidden initially", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /Go to top/i });
    expect(button).toHaveClass("opacity-0");
    expect(button).toHaveClass("pointer-events-none");
  });

  it("shows go to top button after scroll", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /Go to top/i });

    act(() => {
      window.scrollY = 400;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(button).toHaveClass("opacity-100");
    expect(button).toHaveClass("pointer-events-auto");
  });

  it("clicking go to top calls window.scrollTo", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /Go to top/i });

    act(() => {
      window.scrollY = 400;
      window.dispatchEvent(new Event("scroll"));
    });

    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
