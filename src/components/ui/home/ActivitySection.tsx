import { Container, MotionPauseControl } from "@/components/common";
import { activityCopy } from "@/data/home";
import EditorialCopy from "./EditorialCopy";
import HomeSceneReveal from "./HomeSceneReveal";
import PostitField from "./PostitField";

// 02 — "More activity isn't the answer / Better decisions are".
// Original Post-it field + copy, as a rectangular band (copy left, art right).

export default function ActivitySection() {
  return (
    <HomeSceneReveal
      className='homeScene homeScene--activity'
      labelledBy='activity-title'
    >
      <div className='homeScene__art'>
        <MotionPauseControl />
        <PostitField
          words={activityCopy.notes}
          clearerPath={activityCopy.clearerPath}
        />
      </div>
      <div className='homeScene__body'>
        <Container className='main'>
          <div className='homeScene__inner'>
            <EditorialCopy copy={activityCopy} titleId='activity-title' />
          </div>
        </Container>
      </div>
    </HomeSceneReveal>
  );
}
