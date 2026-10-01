import { FaArrowLeft } from "react-icons/fa";

export default function BackButton({
  onClick,
  label = "Go back",
  className = "",
  tone = "surface",
}) {
  const toneClasses =
    tone === "overlay"
      ? "border-sage/35 bg-black/25 text-white hover:border-sage hover:bg-black/40 hover:text-fog-muted focus-visible:ring-sage/50"
      : "border-sage/35 bg-white/75 text-ink dark:border-sage/45 dark:bg-forest-raised/75 dark:text-fog hover:border-sage hover:text-sage hover:bg-white dark:hover:bg-forest-line focus-visible:ring-sage/45";

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
