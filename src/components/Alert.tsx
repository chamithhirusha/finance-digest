import { CloseIcon, WarningIcon } from "./Icons";

interface Props {
  label: String;
  onClose: () => void;
}

export const Alert = ({ label, onClose }: Props) => {
  return (
    <div className="flex justify-between items-center gap-5 p-2 bg-pink-900 rounded-sm mt-10">
      <div className="flex items-center gap-2">
        <WarningIcon />
        <code className="text-white text-sm">{label}</code>
      </div>
      <button className="cursor-pointer" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
};
