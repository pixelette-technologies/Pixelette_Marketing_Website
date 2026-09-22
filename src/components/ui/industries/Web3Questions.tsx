import { FC } from "react";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";

interface Web3CardsProps {
  heading?: string;
  text?: string;
}

interface Web3QuestionsProps {
  heading?: string;
  text?: string;
  data?: Web3CardsProps[];
}

// The sector constraints block, rebuilt 22 Sep 2026.
//
// IT WAS A GRID OF THREE IMAGE CARDS, and both halves of that were wrong.
//
// The images first: mq_1, mq_2 and mq_3 were the SAME THREE FILES on all five
// sector pages. Not similar — identical. The trading-screen photo above a tech
// question was the same file above a Web3 question and an AI question, so they
// carried no sector meaning whatever. Every UK agency sector page reviewed
// proved competence with named clients, logos, case studies and trade-body
// membership; not one used decorative stock photography. They are gone, and
// Web3MarketingCard went with them since this was its only call site.
//
// Then the question form. Each card was phrased as a question — and this page
// already carries a rhetorical question in QuestionAndAnswer and EIGHT more in
// Faqs, which is twelve question marks on one page across three blocks.
// Cleaning the cards up as a tidier Q&A would have sharpened the collision
// rather than removed it.
//
// So the division of labour is now explicit: THIS BLOCK STATES THE MARKET'S
// CONSTRAINTS, THE FAQ ASKS THE QUESTIONS. Each row is a short declarative
// statement of something that is genuinely hard in that market, with the
// approach beneath it. That is also what the sector research said earns
// credibility — naming the constraint is the credential, and it is the one
// thing on these pages that could never be written for a different sector.
//
// Rows, not cards, on the pattern /services and /industries now use: three
// equal boxes of short text is the shape both hub pages were just taken off.
const Web3Questions: FC<Web3QuestionsProps> = ({ heading, text, data }) => {
  return (
    <div className='band-alt'>
      <Container className='main'>
        <section className='web3Question'>
          <header>
            <h2
              dangerouslySetInnerHTML={{ __html: heading || "Heading" }}
              className='heading_secondry--light'
            ></h2>
            <Text className='text_secondry'>{text}</Text>
          </header>

          <ul className='constraintList' data-reveal='stagger'>
            {data?.map((el, index) => (
              <li className='constraintList__item' key={index}>
                {/* h3 in the outline: the section heading above is the h2. */}
                <Heading className='h4 constraintList__title' level={3}>
                  {el.heading}
                </Heading>
                <Text className='body'>{el.text}</Text>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
};

export default Web3Questions;
