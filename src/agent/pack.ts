import {
  TIMELINE_ASK,
  type ClaimGuard,
  type PixContext,
  type PublishableFact,
  type Rule,
  type SitePack,
  type TopicRoute,
} from '@pixelette/agent';

/**
 * Marketing site pack — demand, pipeline, conversion, growth.
 *
 * No technologies stack rule, no ISO/Clutch facts, no careers paths, no
 * tech-firm competitor list. Services FAQs that are only about budget or
 * turnaround are omitted from pix-kb.json; price/timeline rules would
 * suppress them anyway. See src/agent/README.md.
 */

const CONTACT = '/contactus';

function rules(ctx: PixContext): Rule[] {
  return [
    {
      id: 'abuse',
      test: /\b(fuck|fucking|shit|bitch|bastard|cunt|dickhead|wanker|arsehole|idiot|moron|scam|scammer|fraud|fraudster|crooks?)\b/i,
      reply:
        'I am here to help with marketing projects, and I would be glad to assist with a genuine enquiry. You are also welcome to contact the team directly at ' +
        `${ctx.contactEmail}.`,
    },
    {
      id: 'injection',
      test: /\b(ignore (all |your |the )?(previous|prior|above)|system prompt|your instructions|hidden instructions|you are now|disregard (all|your|the)|jailbreak|pretend you are|(reveal|show|print|repeat|display) (me )?(your |the )?(system |hidden )?(prompt|instructions|rules)|developer mode|you are dan|dan mode|do anything now|act as (an? )?(unrestricted|unfiltered|uncensored|different)|new system (message|prompt)|use this (page|text|message) as (your )?(new )?(system|instructions|prompt)|(forget|override) (your|all|the|previous) (rules|instructions|guidelines))\b/i,
      reply:
        'There is nothing behind me to unlock. I answer only from the published pages of this website, so the most useful thing I can do is point you to the right one. What would you like to find out?',
    },
    {
      id: 'off-topic',
      test: /^(?![\s\S]*\b(marketing|growth|demand|pipeline|conversion|seo|campaign|brand|audience|content|ads?|ppc|leads?|funnel|positioning|pixelette)\b)[\s\S]*\b(weather|joke|poem|limerick|recipe|cook(ing)?|football|soccer|cricket|basketball|sports?|match score|horoscope|astrology|president|prime minister|election|politic(s|al)|religio(n|us)|sing|song|music|movies?|films?|tv show|netflix|celebrit(y|ies)|actor|actress|homework|essay|translate (this|that|the following|into)|write (me )?(an? )?(story|essay|poem|song|cover letter)|cover letter|who won|latest news|news today|headlines|summari[sz]e (this|that|the following|my)|crossword|lottery|stock tips?|crypto price|bitcoin price|dating|relationship advice|diet|symptoms?|medicine|medical advice|doctor|travel|flights?|hotels?|holiday|capital of|what time is it|what day is it|how old is|solve (this|the equation)|calculate)\b/i,
      reply:
        'I am not trained for that. I can only help with Pixelette Marketing and the work we do: demand, pipeline, conversion and growth. What would you like to know?',
    },
    {
      id: 'identity',
      test: /\b(are you (a |an )?(human|real|person|bot|ai|robot|chatbot|chatgpt|gpt|claude|gemini)|is this (a |an )?(bot|human|person|chatbot|chatgpt|gpt|real person|ai)|am i (talking|speaking|chatting) to (a |an )?(human|person|real|bot|ai|machine)|what are you|who (made|built|created|programmed) you|what (model|ai|llm) (are|is) (you|this)|are you (using|powered by) (chatgpt|gpt|openai|claude|an? llm|ai))\b/i,
      reply:
        'I am an automated assistant rather than a member of the team. I answer by finding the relevant passage on this website rather than by generating an opinion, so if I cannot find it I will tell you plainly and put you in touch with a colleague who can.',
    },
    {
      id: 'price',
      test: /\b(price|prices|pricing|cost|costs|costing|quote|quotation|estimate|budget|how much (does|do|would|will|is|are|was|for|money|to|should|it|of)|day rates?|daily rates?|hourly rates?|your rates|rates for|rate card|fee|fees|ballpark|cheap|expensive|afford|pricey|costly|(what|how much) (do|would|will) you charge|you charge|charges|fixed[- ]price|time and materials|commercial model|payment terms|rough (figure|number|idea)|minimum (project|engagement|budget|spend|contract|order))\b/i,
      reply:
        'Pricing is always scoped to the individual engagement, so any figure I gave you now would be misleading. The quickest route to an accurate picture is a conversation with the team. I would be glad to take your details here, or you are welcome to use the contact page.',
      path: CONTACT,
      offer: 'enquiry',
    },
    {
      id: 'timeline',
      test: TIMELINE_ASK,
      reply:
        'Timelines depend entirely on scope and complexity, so a figure given without a scope would only be a guess. The team will give you a realistic picture on a scoping call. I would be glad to take your details here, or you are welcome to use the contact page.',
      path: CONTACT,
      offer: 'enquiry',
    },
    {
      id: 'staff-contact',
      test: /\b(personal (email|number|phone|mobile)|mobile number of|home address|linkedin of|who is your (ceo|cto)\b.*\b(email|number|phone))\b/i,
      reply: `I am not able to share individual contact details, though nothing is lost by that: everything reaches the right person through ${ctx.contactEmail} or the contact page.`,
      path: CONTACT,
    },
    {
      id: 'contact',
      test: /\b(contact|get in touch|speak to|talk to (someone|somebody|a human|a person|the team|sales)|just want to (speak|talk)|book (a )?(call|conversation|meeting)|arrange a call|scoping call|meeting|email you|phone you|call you)\b/i,
      reply: `The contact page is the quickest route to the team, and ${ctx.contactEmail} reaches the same place. If you would prefer, I would be glad to take your details here.`,
      path: CONTACT,
      offer: 'enquiry',
    },
    {
      id: 'legal-or-financial-advice',
      test: /\b(legal advice|is (this|it) legal|tax advice|investment advice|should i invest|financial advice|sue|lawsuit)\b/i,
      reply:
        'That falls outside what a marketing firm should advise on, and I am not a suitable source for it. I would recommend speaking with a qualified adviser.',
    },
  ];
}

function publishableFacts(_ctx: PixContext): PublishableFact[] {
  // Marketing publishable is empty and legal fields stay null — never state ISO/Clutch/Ltd identity.
  return [];
}

const TOPIC_ROUTES: readonly TopicRoute[] = [
  {
    id: 'services',
    test: /\b(what can you (help|do)|how can you help|what (do|can) you (offer|help with)|what (are|is) your services|what services do you offer|marketing services|what does pixelette marketing do)\b/i,
    path: '/services',
  },
  {
    id: 'about',
    test: /\b(about (you|the company|your company|pixelette)|tell me about (your|the) company|who (are|is) (you|pixelette)|what is pixelette marketing)\b/i,
    path: '/aboutus',
  },
  {
    id: 'privacy',
    test: /\b(gdpr|data protection|privacy|personal (data|information)|(my|our) (data|information)|store (my|our|your) (data|details)|cookies?)\b/i,
    path: '/privacy',
  },
  {
    id: 'results',
    test: /\b(case stud(y|ies)|results|proof|examples? of (your )?work|(previous|past) (work|campaigns)|what have you (delivered|done)|show me (your |some )?(work|results|examples))\b/i,
    path: '/results',
  },
  {
    id: 'industries',
    test: /\b(industr(y|ies)|sectors?|markets? you (serve|work)|who do you (help|work with))\b/i,
    path: '/industries',
  },
  {
    id: 'strategy',
    test: /\b(strateg(y|ic)|positioning|diagnostic|growth plan|where (should|do) we start)\b/i,
    path: '/strategy-positioning',
  },
  {
    id: 'contact',
    test: /\b(enquiry|enquir(y|ies)|get in touch|contact (form|page))\b/i,
    path: '/contactus',
  },
  {
    id: 'paid',
    test: /\b(paid (media|ads?|advertising)|ppc|pay per click)\b/i,
    path: '/services/ads_ppc',
  },
  {
    id: 'demand',
    test: /\bdemand generation\b/i,
    path: '/services',
  },
  {
    id: 'pipeline',
    test: /\bpipeline( and | & )?conversion\b/i,
    path: '/services',
  },
];

export const marketingPack: SitePack = {
  contactPath: CONTACT,
  emptyPrompt:
    'Please ask me anything about the demand, pipeline, conversion or growth work on this site.',
  askMore:
    'If you could tell me a little more, I will find you the right page. What are you looking to grow, or what would you like to know about how the firm works?',
  noAnswer: (email: string) =>
    'I am not trained for that, and I would rather not guess. ' +
    `You are welcome to use the contact page or email ${email}, or I would be glad to take your details here.`,
  rules,
  claimGuards: [] as readonly ClaimGuard[],
  publishableFacts,
  topicRoutes: TOPIC_ROUTES,
};

/** Alias kept for earlier mount imports. */
export const marketingSitePack = marketingPack;

export default marketingPack;
