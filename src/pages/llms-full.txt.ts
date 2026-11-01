import { SITE } from "../i18n";
import { DOC_GROUPS, DOCS_UPDATED, docsUI, docOf, docPath } from "../i18n/docs";
import { GUIDES, COMPARES, articleOf, articlePath, type Article } from "../i18n/articles";

// The whole English user guide, guides and comparisons as plain text, for AI assistants (llmstxt.org).
const text = (html: string) => html
  .replace(/<\/(td|th)>\s*<(td|th)[^>]*>/g, " | ")
  .replace(/<\/(p|li|tr|h\d)>/g, "\n")
  .replace(/<li[^>]*>/g, "- ")
  .replace(/<[^>]+>/g, "")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

function article(a: Article) {
  const x = articleOf("en", a.slug);
  const parts = [`## ${x.h1}`, `${SITE}${articlePath("en", a)}`, x.intro];
  if (x.steps) parts.push(x.steps.map((s: { name: string; text: string }, i: number) => `${i + 1}. ${s.name}: ${s.text}`).join("\n"));
  for (const s of x.sections) parts.push(`### ${s.h2}\n\n${text(s.html)}`);
  if (x.faq?.length) parts.push(x.faq.map((f: { q: string; a: string }) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n"));
  return parts.join("\n\n");
}

export function GET() {
  const ui = docsUI("en");
  const docs = DOC_GROUPS.flatMap(g => g.slugs).map(slug => {
    const d = docOf("en", slug);
    const blocks = d.blocks.map((b: { h2?: string; html: string }) => (b.h2 ? `### ${b.h2}\n\n` : "") + text(b.html));
    return [`## ${d.title}`, `${SITE}${docPath("en", slug)}`, d.intro, ...blocks].join("\n\n");
  });
  const body = [
    "# EasyShoot: full documentation",
    `> ${ui.description} The short summary is at ${SITE}/llms.txt. Last updated ${DOCS_UPDATED}.`,
    "# User guide", ...docs,
    "# Guides", ...GUIDES.map(article),
    "# Comparisons", ...COMPARES.map(article),
  ].join("\n\n");
  return new Response(body + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
