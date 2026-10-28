export function PulseMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect width="36" height="36" rx="11" fill="#3dff8a" />
      <path
        d="M6.5 18.5H12L15.2 18.5L17.4 9.5L20.6 27L23.2 18.5H29.5"
        stroke="#07140c"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
