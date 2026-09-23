// The legal pages' routes. One constant each, because the privacy statement is
// linked from the enquiry form's consent line and from the footer, and those
// two must never point at different places — the form's link is what the
// visitor is agreeing to.
//
// 23 Sep 2026: the form used to read this from
// NEXT_PUBLIC_CONTACT_PRIVACY_NOTICE_URL. Deployments shipped with that set to
// placeholders ("asdas" locally, fake-url.com on a preview), and because the
// value was non-empty the governance gate passed and the consent line linked
// to nowhere. The statement is a page on this site now, so the link is a route
// and there is nothing left to misconfigure.

export const PRIVACY_HREF = "/privacy";
export const COOKIE_POLICY_HREF = "/cookie-policy";
