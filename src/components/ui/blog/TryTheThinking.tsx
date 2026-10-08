import Link from "next/link";
import { Container } from "@/components/common";
import { tools } from "@/data/insights/insights";

// /blog-list, 04 Try the thinking. 30 Sep 2026, to the final Insights brief:
// "one of the page's main conversion assets".
//
// ONE LIVE TOOL, ONE HONEST PREVIEW. The positioning diagnostic is live on
// /strategy-positioning and its card says so. The spend readiness check does
// not exist yet: its card is marked Coming next, its preview is marked as a
// preview, and its button goes to the article the check comes from. Nothing
// here runs a tool or keeps an answer.
//
// THE PREVIEW REACTS, THEN STOPS. Each card shows one sample question. On
// hover, or when anything in the card takes focus, one sample option lights
// and the line under it changes: CSS transitions, no timer and no loop, so
// motion ends the moment the visitor does. Under reduced motion the states
// still change; nothing travels.

export default function TryTheThinking() {
  return (
    <div className='sec-sm'>
      <Container className='main'>
        <section className='ixTools' aria-labelledby='ix-tools'>
          <h2 className='ixLabel ixLabel--large' id='ix-tools'>
            {tools.label}
          </h2>
          <ul className='ixTools__list'>
            {tools.items.map(tool => (
              <li key={tool.title} className='ixTool' data-status={tool.status}>
                <div className='ixTool__text'>
                  <p className='ixTool__status'>{tool.statusLabel}</p>
                  <h3 className='ixTool__title'>{tool.title}</h3>
                  <p className='ixTool__explain'>{tool.explanation}</p>
                  <p className='ixTool__get'>
                    <span>What you get</span> {tool.youGet}
                  </p>
                  <Link
                    href={tool.cta.href}
                    className={tool.status === "live" ? "btn ixTool__cta" : "btn-ghost ixTool__cta"}
                  >
                    {tool.cta.label}
                    <span aria-hidden='true'>→</span>
                  </Link>
                </div>

                <div className='ixTool__preview' aria-hidden='true'>
                  <p className='ixTool__kicker'>{tool.preview.kicker}</p>
                  <p className='ixTool__question'>{tool.preview.question}</p>
                  <ol className='ixTool__options'>
                    {tool.preview.options.map((option, i) => (
                      <li key={option} data-sample={i === tool.preview.sample || undefined}>
                        <span className='ixTool__radio' />
                        {option}
                      </li>
                    ))}
                  </ol>
                  <p className='ixTool__after'>
                    <span className='ixTool__rest'>
                      {tool.status === "live"
                        ? "One of twelve, each answered on a five-point scale."
                        : "Built from the five checks in the article."}
                    </span>
                    <span className='ixTool__lit'>
                      {tool.status === "live"
                        ? "Sample answer. Eleven more, then your clarity profile."
                        : "Sample answer. The check itself is coming next."}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
