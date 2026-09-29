import { Container } from "@/components/common";
import { activityCopy } from "@/data/home";
import EditorialCopy from "./EditorialCopy";
import PostitField from "./PostitField";
import RailLabel from "./RailLabel";

// 02 — "More activity isn't the answer / Better decisions are". Locked
// implementation specification, 28 Sep 2026. The energetic section of the
// four: the notes fall. Copy and rail are server-rendered; the picture owns
// its client boundary. See PostitField.tsx for the motion.

export default function ActivitySection() {
  return (
    <section
      className='homeScene homeScene--activity'
      aria-labelledby='activity-title'
    >
      <div className='homeScene__art'>
        <PostitField
          words={activityCopy.notes}
          clearerPath={activityCopy.clearerPath}
        />
      </div>
      <div className='homeScene__body'>
        <Container className='main'>
          <div className='homeScene__inner'>
            <EditorialCopy copy={activityCopy} titleId='activity-title' />
            <RailLabel lines={activityCopy.rail} className='homeScene__rail' />
          </div>
        </Container>
      </div>
    </section>
  );
}
