import { emailMarketingContent } from "@/data/services/emailMarketing";

const { feedback } = emailMarketingContent;

const EmailFeedback = () => {
  return (
    <section className='emFeedback' aria-labelledby='em-feedback-heading'>
      <div className='container_main emFeedback__inner'>
        <h2 id='em-feedback-heading' className='emSectionTitle'>
          {feedback.heading}
        </h2>
        <figure className='emFeedback__quote'>
          <blockquote>
            <p>“{feedback.quote}”</p>
          </blockquote>
          <figcaption>
            <strong>{feedback.name}</strong>
            <span> · {feedback.role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default EmailFeedback;
