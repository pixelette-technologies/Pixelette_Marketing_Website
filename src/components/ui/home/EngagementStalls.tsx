// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Container } from "@/components/common";
// import { ArrowCard, Heading, Text } from "@/components/feature";
// import { engagementData } from "@/data";

// const EngagementStalls = () => {
//   const [visibleIndexFirst, setVisibleIndexFirst] = useState(0);
//   const [visibleIndexRemaining, setVisibleIndexRemaining] = useState(0);
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const [isInView, setIsInView] = useState(false);
//   const [isScrollingAllowed, setIsScrollingAllowed] = useState(false);

//   const firstFiveItems = engagementData.slice(0, 5);
//   const remainingItems = engagementData.slice(5);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return;
//       const sectionTop = sectionRef.current.getBoundingClientRect().top;
//       if (sectionTop <= 0) {
//         setIsInView(true);
//         setIsScrollingAllowed(true);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!isInView || !isScrollingAllowed) return;

//     const handleScroll = (event: Event) => {
//       event.preventDefault();

//       if (visibleIndexFirst + 2 < firstFiveItems.length) {
//         setVisibleIndexFirst(prev => prev + 2);
//       } else if (visibleIndexRemaining + 2 < remainingItems.length) {
//         setVisibleIndexRemaining(prev => prev + 2);
//       } else {
//         setIsScrollingAllowed(false);
//       }
//     };

//     window.addEventListener("wheel", handleScroll, { passive: false });
//     return () => window.removeEventListener("wheel", handleScroll);
//   }, [isInView, visibleIndexFirst, visibleIndexRemaining, isScrollingAllowed]);

//   return (
//     <div className='bg_tertiary--dark' ref={sectionRef}>
//       <Container className='main'>
//         <section className='engagementStalls'>
//           <header>
//             <div>
//               <Heading className='primary color_primary uppercase font_family_glory'>
//                 Engagement stalls without strategy
//               </Heading>
//               <Heading className='primary color_secondry uppercase font_family_glory'>
//                 We drive it forward
//               </Heading>
//               <Text className='secondry'>
//                 Simplify your marketing efforts with our end-to-end digital
//                 solutions.
//               </Text>
//             </div>
//           </header>
//           <section className='bg_secondry'>
//             <div>
//               {firstFiveItems
//                 .slice(visibleIndexFirst, visibleIndexFirst + 2)
//                 .map((el, index) => (
//                   <ArrowCard
//                     key={index + visibleIndexFirst}
//                     mainHeading={el.mainHeading}
//                     subHeading={el.subHeading}
//                     summary={el.text}
//                     to={`/services/${el.route}`}
//                     theme={true}
//                     textfloat={false}
//                     className='hover_black_arrowCard transition-opacity duration-500 opacity-100'
//                   />
//                 ))}
//             </div>
//             <blockquote>
//               {remainingItems
//                 .slice(visibleIndexRemaining, visibleIndexRemaining + 2)
//                 .map((el, index) => (
//                   <ArrowCard
//                     key={index + visibleIndexRemaining + 5}
//                     mainHeading={el.mainHeading}
//                     subHeading={el.subHeading}
//                     summary={el.text}
//                     to={`/services/${el.route}`}
//                     theme={true}
//                     textfloat={true}
//                     className='hover_black_arrowCard transition-opacity duration-500 opacity-100'
//                   />
//                 ))}
//             </blockquote>

//             <section>
//               {engagementData.map((el, index) => (
//                 <ArrowCard
//                   key={index}
//                   mainHeading={el.mainHeading}
//                   subHeading={el.subHeading}
//                   summary={el.text}
//                   to={`/services/${el.route}`}
//                   theme={true}
//                   textfloat={false}
//                   className='hover_black_arrowCard transition-opacity duration-500 opacity-100'
//                 />
//               ))}
//             </section>
//           </section>
//         </section>
//       </Container>
//     </div>
//   );
// };

// export default EngagementStalls;

import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { engagementData } from "@/data";

const EngagementStalls = () => {
  const firstFiveItems = engagementData.slice(0, 5);
  const remainingItems = engagementData.slice(5);

  return (
    <div
      className='bg_tertiary--dark'
      data-aos='fade-up'
      data-aos-duration='1400'
    >
      <Container className='main '>
        <section className='engagementStalls'>
          <div>
            <Heading
              className='primary color_primary uppercase font_family_glory'
              animation='fade-up'
              duration='1200'
            >
              Engagement stalls without strategy
            </Heading>
            <Heading
              className='primary color_secondry uppercase font_family_glory'
              animation='fade-up'
              duration='1400'
            >
              We drive it forward
            </Heading>
            <Text className='secondry' animation='fade-up' duration='1600'>
              Simplify your marketing efforts with our end-to-end digital
              solutions. We create strategies that attract, engage and convert
              your audience at every step.
            </Text>
          </div>
          <section
            className='bg_secondry'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <div>
              {firstFiveItems.map((el, index) => (
                <ArrowCard
                  key={index}
                  mainHeading={el.mainHeading}
                  subHeading={el.subHeading}
                  summary={el.text}
                  theme={true}
                  textfloat={false}
                  className='hover_black_arrowCard'
                  animation='fade-up'
                  duration={`${1000 + index * 200}`}
                />
              ))}
            </div>
            <blockquote>
              {remainingItems.map((el, index) => (
                <ArrowCard
                  key={index + 5}
                  mainHeading={el.mainHeading}
                  subHeading={el.subHeading}
                  summary={el.text}
                  theme={true}
                  textfloat={true}
                  className='hover_black_arrowCard'
                  animation='fade-up'
                  duration={`${1000 + index * 200}`}
                />
              ))}
            </blockquote>
            <section>
              {remainingItems.map((el, index) => (
                <ArrowCard
                  key={index + 5}
                  mainHeading={el.mainHeading}
                  subHeading={el.subHeading}
                  summary={el.text}
                  theme={true}
                  textfloat={false}
                  className='hover_black_arrowCard'
                  animation='fade-up'
                  duration={`${1000 + index * 200}`}
                />
              ))}
            </section>
          </section>
        </section>
      </Container>
    </div>
  );
};

export default EngagementStalls;
