import { FaArrowLeft } from "react-icons/fa";

export default function BackButton({
  onClick,
  label = "Go back",
  className = "",
  tone = "surface",
}) {
  const toneClasses =
    tone === "overlay"
      ? "border-[#92ACA0]/35 bg-black/25 text-white hover:border-[#92ACA0] hover:bg-black/40 hover:text-[#c4d5ce] focus-visible:ring-[#92ACA0]/50"
      : "border-[#92ACA0]/35 bg-white/75 text-[#3e5d58] dark:border-[#92ACA0]/45 dark:bg-[#243b35]/75 dark:text-[#e8f0ee] hover:border-[#92ACA0] hover:text-[#92ACA0] hover:bg-white dark:hover:bg-[#2b453f] focus-visible:ring-[#92ACA0]/45";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 ${toneClasses} ${className}`}
    >
      <FaArrowLeft className="text-xs" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
