import type { ReactNode } from "react";

/** Split a hero title so the trailing word(s) can take brand italic emphasis. */
export function heroEmphasis(
  text: string,
  lastWordCount = 2
): { lead: string; emphasis: string } {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return { lead: "", emphasis: "" };
  if (words.length === 1) return { lead: "", emphasis: words[0] };

  const count = Math.min(Math.max(1, lastWordCount), words.length - 0);
  const take = Math.min(count, words.length);
  // Keep at least one non-emphasized word when the title has 2+ words,
  // unless caller asks for the whole string (take === length).
  const emphasisCount =
    take >= words.length ? Math.max(1, words.length - 1) : take;

  return {
    lead: words.slice(0, -emphasisCount).join(" "),
    emphasis: words.slice(-emphasisCount).join(" ")
  };
}

/** Render lead + <em>emphasis</em> for hero headings. */
export function HeroEmphasis({
  text,
  lastWordCount = 2
}: {
  text: string;
  lastWordCount?: number;
}): ReactNode {
  const { lead, emphasis } = heroEmphasis(text, lastWordCount);
  if (!emphasis) return text;
  return (
    <>
      {lead ? `${lead} ` : null}
      <em>{emphasis}</em>
    </>
  );
}
