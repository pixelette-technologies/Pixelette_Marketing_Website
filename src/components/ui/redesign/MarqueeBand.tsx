/**
 * MarqueeBand - a slow kinetic brand moment. Large Fraunces phrase drifting
 * horizontally, crimson dot separators. CSS-only, seamless loop, slows on
 * hover, halts under reduced-motion. Claims-safe (positioning words only).
 */

const PHRASES = ["Strategy", "Demand", "Proof", "Compound"];

export default function MarqueeBand() {
  const track = (
    <div className='pmMarquee__track' aria-hidden='true'>
      {PHRASES.concat(PHRASES).map((p, i) => (
        <span className='pmMarquee__item' key={i}>
          {p}
          <span className='pmMarquee__dot' />
        </span>
      ))}
    </div>
  );

  return (
    <div className='pmMarquee'>
      <div className='pmMarquee__rail'>
        {track}
        {track}
      </div>
    </div>
  );
}
