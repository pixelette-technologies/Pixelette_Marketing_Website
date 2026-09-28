import { Container } from "@/components/common";
import { widerAdvantageData } from "@/data/home";

// THE PIXELETTE ADVANTAGE — 28 Sep 2026, brief section 29 item 10:
// "marketing + technology + wider group capability. Keep concise."
//
// The statement on one side and the three group companies as three lines on
// the other. It was a three-column PointItem row, which gave three one-line
// descriptions the same visual weight as the capabilities and the engagements
// above them; this is the smallest section on the page, and it now looks it.
// The copy is unchanged — the group naming is still a publication gate.

export default function GroupAdvantage() {
  const { eyebrow, heading, lead, items, closing } = widerAdvantageData;

  return (
    <section className='groupAdvantage sec'>
      <Container className='main'>
        <div className='groupAdvantage__inner'>
          <header className='groupAdvantage__head'>
            <h2 className='eyebrow'>{eyebrow}</h2>
            <h3 className='h2'>{heading}</h3>
            {lead && <p className='body'>{lead}</p>}
          </header>
          <div className='groupAdvantage__side'>
            <ul className='groupAdvantage__list'>
              {items.map(item => (
                <li key={item.title}>
                  <span className='groupAdvantage__name'>{item.title}</span>
                  <span className='groupAdvantage__line'>{item.body}</span>
                </li>
              ))}
            </ul>
            {closing && <p className='small groupAdvantage__closing'>{closing}</p>}
          </div>
        </div>
      </Container>
    </section>
  );
}
