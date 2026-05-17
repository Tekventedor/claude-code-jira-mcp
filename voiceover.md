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
| 3 | Demo (bug triage) | One prompt: Claude opens the project, finds an unassigned bug, and files a tracked fix task linked back to it. |
| 4 | Architecture | The prompt becomes a tool call. Claude Code reaches your Jira through one of two MCP endpoints — Atlassian's directly, or FlowHunt as a bridge. |
| 5 | Claude Code direct path | The simplest route. `claude mcp add atlassian` once, approve the OAuth scopes in the browser, and you're connected. |
| 6 | FlowHunt Token-Auth | The point-and-click route. In FlowHunt, open Integrations, paste an Atlassian API token, and approve the connection. |
| 7 | MCP server config + Connect JSON | Inside FlowHunt the integration powers a Jira MCP server with thirty-four tools. Name it, save it, and FlowHunt hands back a ready-to-use client configuration. |
| 8 | Same MCP, both sides | The same configuration works in two places — drop it into Claude Code, or paste it into a FlowHunt agent's MCP Client field. Both surfaces talk to the same server. |
| 9 | FlowHunt agent in action | Once connected, the agent reads your workspace and lists the full surface — create, search, update, transition, and comment on Jira issues. |
| 10 | CTA | The complete setup guide is on the FlowHunt blog. |

---

## Part 2 — Flowing read

Target ~180 WPM informational. Read like a presenter explaining a product, not a punchy ad. Stage directions in `[brackets]` are reader cues — they don't get spoken. Speak `K-A-N` letter by letter. Speak the URL as "flowhunt dot io slash blog".

[calm, clear] Claude Code now connects directly to your Atlassian workspace. [slight pause]

[light, explanatory] Quick vocabulary check. Every Jira project has a short code. [emphasize, spell out] K-A-N, for Kanban template — [release] but your team's code could be anything. [pause]

[slightly quicker, conversational] One prompt. Claude opens the project, finds an unassigned bug, and creates a tracked fix task linked to it. [brief pause]

[tight, technical] Your prompt becomes a tool call. Claude Code reaches your Jira through one of two MCP endpoints — [emphasize] Atlassian's directly, or FlowHunt as a bridge. [no extra pause]

[matter-of-fact, brief] The direct path is the simplest. [conversational] Claude Code adds Atlassian as an MCP server in one command. You approve the OAuth scopes in the browser, and the connection goes live. [pause]

[guided, step-by-step] The FlowHunt path is point-and-click. Open Integrations, paste an Atlassian API token, and [slight emphasis] approve [release] the connection. [pause]

[steady, informative] Inside FlowHunt, that integration powers a Jira MCP server with [emphasize] thirty-four tools — [flow] from creating issues to running JQL searches. Name it, save it, and FlowHunt hands back a [emphasize] ready-to-use client configuration. [pause]

[balanced, clear contrast] The same configuration works in two places. [slight emphasis] Drop it into Claude Code, or paste it into a FlowHunt agent's MCP Client field. [resolve] Both surfaces talk to the same server. [pause]

[observational, guided] Once connected, the agent reads your workspace. Ask what it can do, and it lists the full surface — [light emphasis sequence] create, search, update, transition, and comment on Jira issues. [pause]

[soft, closing tone] The complete setup guide is on the FlowHunt blog, with step-by-step instructions and worked examples for both Jira and Confluence. [trail off]

---

## Total word count

~245 words across ~80.8 s. Comfortable at ~182 WPM. Read flat — no upspeak, no hyped energy.

## Recording notes

- Voice: presenter tone. The viewer should feel they are being explained to, not sold to.
- Pronunciation: spell `K-A-N` letter by letter (not "kan"). Speak `claude mcp add atlassian` as natural English ("claude m-c-p add atlassian"). Speak the URL as "flowhunt dot io slash blog".
- Mic: a flat-EQ tracking signal is fine; no broadcast compression.
- Cuts: the video has no music bed; pauses are silent, so leave a half-beat of breath at each `[pause]`.
- File format: deliver as a single mono WAV at 48 kHz.
- The bracketed directions in Part 2 are reader cues, not spoken text. Part 1 is a reference summary only — don't read it on the recording.
