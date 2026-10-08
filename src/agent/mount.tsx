"use client";

/**
 * Client mount for the site assistant. Rendered once from the root layout
 * (`src/app/layout.tsx`), so the widget is present on every route.
 *
 * `context` is a prop rather than an import here because `src/agent/context.ts`
 * is `server-only`: it must be read on the server and handed down as plain
 * data, the same way the rest of this component's inputs
 * (`knowledge`, `marketingAgentConfig`, `marketingSitePack`) are either
 * JSON or server-action-free modules safe to bundle for the browser.
 */
import { Agent, AgentBoundary } from "@/components/pix";
import type { KnowledgeFile, PixContext } from "@/lib/pix";

import rawKnowledge from "@/content/pix-kb.json";
import {
  identifyAssistant,
  submitAssistantLead,
} from "@/app/agent/actions";
import { marketingAgentConfig, marketingThemeOptions } from "@/agent/config";
import { marketingPack } from "@/agent/pack";

// `kind` on each doc is a closed string union (`KbDoc['kind']`); a JSON
// module import widens it to plain `string`, so this is cast once here
// rather than at every call site.
const knowledge = rawKnowledge as KnowledgeFile;

export default function AgentMount({ context }: { context: PixContext }) {
  return (
    <AgentBoundary contactPath={marketingAgentConfig.contactPath}>
      <Agent
        config={marketingAgentConfig}
        context={context}
        knowledge={knowledge}
        sitePack={marketingPack}
        onIdentify={identifyAssistant}
        onLead={submitAssistantLead}
        themeOptions={marketingThemeOptions}
      />
    </AgentBoundary>
  );
}
