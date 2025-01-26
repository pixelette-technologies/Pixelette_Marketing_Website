import { Container } from "@/components/common";
import StoriesCardGrid from "./StoriesCardGrid";

const StoriesDataDisplay = () => {
  return (
    <Container className='main'>
      <div
        className='storiesDataDisplay'
        data-aos='fade-up'
        data-aos-duration='1200'
      >
        <header>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
          <div>All</div>
        </header>
        <section>
          <StoriesCardGrid />
        </section>
      </div>
    </Container>
  );
};

export default StoriesDataDisplay;
