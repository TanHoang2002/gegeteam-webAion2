/* Vòng phù văn quanh ảnh chính */
export function AetherRing() {
  return (
    <svg className="aether-ring" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="97" fill="none" stroke="#ffe2a0" strokeWidth="1" strokeDasharray="2 5" />
      <circle cx="100" cy="100" r="92" fill="none" stroke="#7fe3ff" strokeOpacity=".7" strokeWidth=".6" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <path key={deg} d="m100 0 3 5-3 5-3-5Z" fill="#ffe2a0" transform={`rotate(${deg} 100 100)`} />
      ))}
    </svg>
  );
}

/* Lông vũ bay nhẹ trên nền */
export function FeatherField() {
  return (
    <div className="feather-field" aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => <i key={i} />)}
    </div>
  );
}
