"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties
} from "react";
import { influencerPartnershipsContent } from "@/data/services/influencerPartnerships";
import { useInView, useMotionAllowed } from "@/lib/useInView";
import InfluencerIcon from "./InfluencerIcons";

const { deliver } = influencerPartnershipsContent;

const InfluencerDeliver = () => {
  const rootRef = useRef<HTMLElement>(null);
  const visible = useInView(rootRef, "0px 0px -10% 0px");
  const motion = useMotionAllowed();
  const [motionReady, setMotionReady] = useState(false);
  const [entered, setEntered] = useState(true);

  useLayoutEffect(() => {
    if (!motion) {
      setMotionReady(false);
      setEntered(true);
      return;
    }
    const el = rootRef.current;
    const onScreen =
      !!el &&
      el.getBoundingClientRect().top < window.innerHeight * 0.9 &&
      el.getBoundingClientRect().bottom > 0;
    setEntered(onScreen);
    setMotionReady(true);
  }, [motion]);

  useEffect(() => {
    if (visible && motionReady) setEntered(true);
  }, [visible, motionReady]);

  return (
    <section
      ref={rootRef}
      className='ipDeliver'
      aria-labelledby='ip-deliver-heading'
      data-motion={motionReady ? "ready" : "off"}
      data-entered={entered ? "true" : "false"}
      data-reveal='off'
    >
      <div className='container_main'>
        <header className='ipDeliver__head'>
          <div className='ipDeliver__titleBlock'>
            <h2 id='ip-deliver-heading' className='ipDeliver__heading'>
              {deliver.heading}
            </h2>
          </div>
          <p className='ipDeliver__intro'>{deliver.intro}</p>
        </header>

        <ul className='ipDeliver__grid'>
          {deliver.items.map((item, index) => (
            <li
              className='ipDeliver__card'
              key={item.title}
              style={{ "--ip-i": index } as CSSProperties}
            >
              <div className='ipDeliver__photo'>
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes='(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 360px'
                  className='ipDeliver__image'
                />
              </div>
              <span className='ipDeliver__icon' aria-hidden='true'>
                <InfluencerIcon name={item.icon} />
              </span>
              <h3 className='ipDeliver__cardTitle'>{item.title}</h3>
              <p className='ipDeliver__cardBody'>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InfluencerDeliver;
