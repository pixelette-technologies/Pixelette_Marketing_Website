// A deterministic 0..1 value for (index, salt), for scattering animation
// timings across the home page's notes and ducks (28 Sep 2026).
//
// INTEGER ARITHMETIC ON PURPOSE. The first version was the familiar
// fract(sin(x) * 43758.5453), and it hydration-failed: Node and Chrome agree
// on Math.sin only to the last few bits, and multiplying by 43758 moves those
// bits into the digits that were rendered into inline styles. Math.imul is
// exact on every engine, and the result is rounded to three places so the
// server and the browser print the same string.

export function spread(i: number, salt: number): number {
  let h = Math.imul(i + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return Math.round(((h >>> 0) / 4294967296) * 1000) / 1000;
}
