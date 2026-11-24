// /accessibility — approved 24 Nov 2026 handoff. Wording is verbatim.

export const accessibilityContent = {
  eyebrow: "Accessibility",
  hero: {
    heading: "Making our website easier to use",
    headingLines: ["Making our website", "easier to use"],
    paragraphs: [
      "We want everyone visiting Pixelette Marketing to be able to explore our services, find the information they need and get in touch without unnecessary barriers.",
      "Accessibility is an important part of good digital design. It means considering how people navigate a website, read its content and interact with it using different devices and assistive technologies."
    ]
  },
  matters: {
    heading: "Accessibility matters to us",
    intro:
      "We recognise that people access websites in different ways, using different devices, technologies and methods of navigation.",
    cards: [
      {
        title: "Clear navigation",
        copy: "A logical structure that helps you find what you need quickly.",
        icon: "navigation" as const
      },
      {
        title: "Readable content",
        copy: "Clear, well-written content with good contrast and readability.",
        icon: "readable" as const
      },
      {
        title: "Keyboard access",
        copy: "Designed to work with keyboard navigation and assistive technologies.",
        icon: "keyboard" as const
      },
      {
        title: "Across devices",
        copy: "A consistent and accessible experience on desktop, tablet and mobile.",
        icon: "devices" as const
      }
    ]
  },
  help: {
    heading: "Having difficulty using our website?",
    copy: "If something isn’t working as expected, or you need information in another format, please get in touch. Let us know which page you’re using and what you’re trying to access. We’ll look into the issue and help you find an appropriate way to get the information you need.",
    cta: { label: "Contact Us", href: "/contactus" }
  },
  work: {
    heading: "Accessibility in our work",
    left: "We believe accessibility should be considered from the beginning of a project, rather than treated as an afterthought.",
    right:
      "In digital and communications work, that means considering how people access information, navigate digital experiences and engage with content. We draw on internationally recognised accessibility principles and guidance, including the Web Content Accessibility Guidelines (WCAG)."
  },
  close: {
    heading: "Let’s make digital experiences more inclusive",
    copy: "If you’d like to discuss accessibility in a project, or how we can help you create more inclusive communications, please get in touch.",
    cta: { label: "Contact Us", href: "/contactus" }
  },
  image: {
    alt: "Laptop showing the accessibility symbol, surrounded by icons for sound, vision, text size, a keyboard and a mobile phone, on layered mosaic waves",
    width: 675,
    height: 405
  }
};
