export function AmbientBackdrop() {
  return (
    <div className="ambient-backdrop" aria-hidden="true">
      <span className="ambient-backdrop__orb ambient-backdrop__orb--one" />
      <span className="ambient-backdrop__orb ambient-backdrop__orb--two" />
      <span className="ambient-backdrop__orb ambient-backdrop__orb--three" />
      <span className="ambient-backdrop__ring ambient-backdrop__ring--one" />
      <span className="ambient-backdrop__ring ambient-backdrop__ring--two" />
      <span className="ambient-backdrop__grid" />
      <span className="ambient-backdrop__horizon" />
    </div>
  )
}
