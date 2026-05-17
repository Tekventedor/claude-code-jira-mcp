# Voice-over script — claude-code-jira-mcp

**Total runtime**: ~80.8 s · 10 scenes · 2425 frames. Per-scene frame ranges live in `timing.md`.

This file has two parts:

- **Part 1 — Scene narrative** (plain English summary of *what is said* over each scene). Read this first to align with the video before you record.
- **Part 2 — Flowing read with stage directions** (the actual recording script). Stage directions in `[brackets]` are reader cues only; they don't get spoken.

---

## Part 1 — Scene narrative

| # | Scene | Spoken about |
|---|---|---|
| 1 | Pivot | Claude Code now connects directly to your Atlassian workspace. |
| 2 | Project codes | Vocabulary primer. Every Jira project has a short code. `KAN` stands for the Kanban template we picked; your team's code could be anything. |
| 3 | Demo (bug triage) | One natural-language prompt: Claude opens the right Jira project, searches for bugs nobody owns, and files a tracked fix task linked back to the bug it found. |
| 4 | Architecture | The prompt becomes a tool call. Claude Code reaches your Jira through one of two MCP endpoints — Atlassian's MCP directly, or FlowHunt's hosted MCP as a bridge. |
| 5 | Claude Code direct path | The simplest route. `claude mcp add atlassian` once in the terminal, approve the OAuth scopes in your browser, and Claude Code is talking to Atlassian directly. |
| 6 | FlowHunt Token-Auth | The point-and-click route. In FlowHunt, open Integrations, click Manage Integration on the Atlassian Token-based Auth card, paste your Atlassian domain, email, and API token, and Integrate. The page confirms it's connected. |
| 7 | MCP server config + Connect JSON | Inside FlowHunt, that same integration powers a Jira MCP server with thirty-four tools. Open MCP Servers, search Atlassian, name your server, and the Configure tab lists every capability. Switch to the Connect tab and FlowHunt hands you a ready-to-use MCP client configuration — copy it once. |
| 8 | Same MCP, both sides | That copied configuration works in two places. On the left, paste it into Claude Code and `/mcp` shows your Jira MCP connected. On the right, paste it into a FlowHunt agent's MCP Client field and the agent picks it up the same way. Both surfaces talk to the same server. |
| 9 | FlowHunt agent in action | Once the FlowHunt agent is wired, the chat reads your real Atlassian workspace and lists the full surface — create, search, update, transition, and comment on Jira issues. |
| 10 | CTA | The complete setup guide is on the FlowHunt blog. |

---

## Part 2 — Flowing read

Target ~180 WPM informational. Read like a presenter explaining a product, not a punchy ad. Stage directions in `[brackets]` are reader cues — they don't get spoken. Speak `K-A-N` letter by letter. Speak the URL as "flowhunt dot io slash blog".

[calm, clear] Claude Code now connects directly to your Atlassian workspace. [slight pause]

[light, explanatory] Quick vocabulary check. Every Jira project has a short code. [emphasize, spell out] K-A-N, for Kanban template — [release] but your team's code could be anything. [pause]

[slightly quicker, conversational] One natural-language prompt. Claude opens the right Jira project, searches for bugs nobody owns, and files a tracked fix task linked back to the bug it found. [brief pause]

[tight, technical] Under the hood, your prompt becomes a tool call. Claude Code reaches your Jira through one of two MCP endpoints — [emphasize] Atlassian's MCP directly, or FlowHunt's hosted MCP as a bridge. [no extra pause]

[matter-of-fact, brief] The direct route is the simplest. [conversational] One terminal command — `claude mcp add atlassian` — then approve the OAuth scopes in your browser, and Claude Code is talking to Atlassian. [pause]

[guided, step-by-step] The FlowHunt route is point-and-click. Open Integrations, click Manage Integration on the Atlassian Token-based Auth card, paste your Atlassian domain, email, and API token, and [slight emphasis] Integrate. [release] The page confirms it's connected. [pause]

[steady, informative] Inside FlowHunt, that same integration powers a Jira MCP server with [emphasize] thirty-four tools — [flow] from creating issues to running JQL searches. Open MCP Servers, search Atlassian, name your server, and the Configure tab lists every capability. Switch to Connect, and FlowHunt hands you a [emphasize] ready-to-use client configuration. [pause]

[balanced, clear contrast] One configuration. Two places. [slight emphasis] Paste it into Claude Code and `/mcp` shows your Jira MCP connected. Paste it into a FlowHunt agent's MCP Client field and the agent picks it up the same way. [resolve] Both surfaces, the same server. [pause]

[observational, guided] Once the FlowHunt agent is wired, the chat reads your real Atlassian workspace and lists the full surface — [light emphasis sequence] create, search, update, transition, and comment on Jira issues. [pause]

[soft, closing tone] The complete setup guide is on the FlowHunt blog, with step-by-step instructions and worked examples for both Jira and Confluence. [trail off]

---

## Total word count

~285 words across ~80.8 s. Comfortable at ~212 WPM (presenter pace — neither hurried nor leisurely). Read flat — no upspeak, no hyped energy.

## Recording notes

- Voice: presenter tone. The viewer should feel they are being explained to, not sold to.
- Pronunciation: spell `K-A-N` letter by letter (not "kan"). Speak `claude mcp add atlassian` as natural English ("claude m-c-p add atlassian"). Speak `/mcp` as "slash m-c-p". Speak the URL as "flowhunt dot io slash blog".
- Mic: a flat-EQ tracking signal is fine; no broadcast compression.
- Cuts: the video has no music bed; pauses are silent, so leave a half-beat of breath at each `[pause]`.
- File format: deliver as a single mono WAV at 48 kHz.
- The bracketed directions in Part 2 are reader cues, not spoken text. Part 1 is a reference summary only — don't read it on the recording.
