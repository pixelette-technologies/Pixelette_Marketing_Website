import { Heading } from "@/components/feature";
import type { GrowthStage } from "@/data/industries/whoWeHelp";

// What is left of the pieces the home page's Who we help section and the
// /industries hub used to share. 28 Sep 2026: the home section became the
// Industries preview and the hub's sector cards became SectorIndex, so
// SectorGrid and SplitTitle went with them. The stage list is the one piece
// still in use, on /industries. Its rules are in industries/_stageList.scss.

/** Launch, scale, established — business stage, never sector. */
export const StageList = ({
  stages,
  level
}: {
  stages: GrowthStage[];
  level: 3 | 4;
}) => (
  <div className='dynamicMarket__stages' data-reveal='stagger'>
    {stages.map(({ title, body, icon: Icon }) => (
      <div className='growthStage' key={title}>
        <span className='growthStage__chip'>
          <Icon />
        </span>
        <div>
          <Heading className='growthStage__title' level={level}>
            {title}
          </Heading>
          <p className='growthStage__body'>{body}</p>
        </div>
      </div>
    ))}
  </div>
);
