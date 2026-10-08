/**
 * In-repo answering machine for the Marketing assistant.
 *
 * Vendored from the parameterized brain (the form that takes a knowledge
 * file and a site pack). Lead scoring is not part of this tree.
 */

export type { PixContext } from './context';

export type {
  AgentConfig,
  ClaimGuard,
  KbDoc,
  KnowledgeFile,
  LeadPayload,
  LeadResult,
  PublishableFact,
  Rule,
  SitePack,
  TopicRoute,
} from './types';

export {
  createRetriever,
  getRetriever,
  MIN_COVERAGE,
  tokenise,
} from './retrieve';
export type { Match, Retriever } from './retrieve';

export { respond, labelForPath } from './respond';
export type { PixReply } from './respond';

export { TIMELINE_ASK } from './rules';

export {
  ASK_NAME,
  askEmail,
  greeting,
  DISCOVERY_OPENING,
  EMAIL_PATTERN,
  ENQUIRY_MAX,
  EMPTY_DRAFT,
  buildEnquirySteps,
  checkAnswer,
  checkEmail,
  checkName,
  createEnquiryHelpers,
  isEmail,
  looksLikeQuestion,
  saysSomething,
} from './enquiry';
export type {
  AnswerCheck,
  EnquiryDraft,
  EnquiryField,
  EnquiryQuestions,
  EnquiryStep,
} from './enquiry';
