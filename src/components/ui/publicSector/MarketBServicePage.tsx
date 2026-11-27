import { Container } from "@/components/common";
import MockupBanner from "@/components/common/MockupBanner";
import { Heading, Text } from "@/components/feature";
import type { MarketBServiceLine } from "@/data/publicSector/serviceLines";
import { HeroEmphasis } from "@/lib/heroEmphasis";

export default function MarketBServicePage({ line }: { line: MarketBServiceLine }) {
  return (
    <>
      <MockupBanner />
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              <HeroEmphasis text={line.h1} lastWordCount={2} />
            </Heading>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-labelledby='objective-title'>
          <Heading className='h2' level={2} id='objective-title'>
            The objective
          </Heading>
          <Text className='body'>{line.objective}</Text>
        </section>
        <section className='sec' aria-labelledby='what-title'>
          <Heading className='h2' level={2} id='what-title'>
            What we do
          </Heading>
          <Text className='body'>{line.whatWeDo}</Text>
        </section>
        <section className='sec' aria-labelledby='measure-title'>
          <Heading className='h2' level={2} id='measure-title'>
            How it is measured
          </Heading>
          <Text className='body'>{line.howMeasured}</Text>
        </section>
        <section className='sec' aria-labelledby='conditions-title'>
          <Heading className='h2' level={2} id='conditions-title'>
            Conditions that apply
          </Heading>
          <Text className='body'>{line.conditions}</Text>
          {line.extra ? <Text className='body'>{line.extra}</Text> : null}
        </section>
      </Container>
    </>
  );
}
