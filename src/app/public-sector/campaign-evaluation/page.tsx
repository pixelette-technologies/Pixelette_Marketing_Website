import { Container } from "@/components/common";
import MockupBanner from "@/components/common/MockupBanner";
import { Heading } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Campaign evaluation",
  description: "Campaign evaluation.",
  path: "/public-sector/campaign-evaluation"
});

export default function CampaignEvaluationPage() {
  return (
    <>
      <MockupBanner />
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Campaign evaluation
            </Heading>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-label='Block quotations'>
          <blockquote />
          <blockquote />
        </section>
        <section className='sec' aria-label='Evaluation table'>
          <table>
            <thead>
              <tr>
                <th scope='col' />
                <th scope='col' />
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map(row => (
                <tr key={row}>
                  <td />
                  <td />
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Container>
    </>
  );
}
