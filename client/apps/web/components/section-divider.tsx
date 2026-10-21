export function SectionDivider({
  flip = false,
  color = '#ffffff',
}: {
  flip?: boolean;
  color?: string;
}) {
  return (
    <div className="section-divider" aria-hidden="true">
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      >
        <path d="M0 48 L1440 0 L1440 48 Z" fill={color} />
      </svg>
    </div>
  );
}
