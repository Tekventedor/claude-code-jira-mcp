# Voice-over script — claude-code-jira-mcp

**Total runtime**: ~80.8 s video · 10 scenes · 2425 frames. Per-scene frame ranges live in `timing.md`.

**Speaker**: ElevenLabs voice "Jon — Natural Authority" (id `sB7vwSCyX0tQmU24cW2C`), ~136 WPM. Reading the script below renders at ~2:06; trim later if the audio needs to land inside the video runtime.

This file has two parts:

- **Part 1 — Scene narrative** (plain English summary of *what is said* over each scene). Read this first to align with the video before you record.
- **Part 2 — Flowing read** (the actual recording script). Plain prose, one paragraph per scene, in order.

---

## Part 1 — Scene narrative

| # | Scene | Spoken about |
|---|---|---|
| 1 | Pivot | Claude Code now connects directly to your Atlassian workspace. |
| 2 | Project codes | Every Jira project has a short code. Ours is `KAN` because we used a Kanban template. |
| 3 | Demo (bug triage) | One natural-language prompt. Claude opens the project, finds an unassigned bug, and files a tracked fix task linked to it. |
| 4 | Architecture | The prompt becomes a tool call sent to one of two MCP endpoints — Atlassian's MCP directly, or FlowHunt's hosted MCP as a bridge. |
| 5 | Claude Code direct path | The direct route is one terminal command, then approve the OAuth scopes. |
| 6 | FlowHunt Token-Auth | The FlowHunt route is point-and-click. Open Integrations, paste your Atlassian domain, email, and API token. |
| 7 | MCP server config + Connect JSON | Inside FlowHunt, the integration powers a Jira MCP server with thirty-four tools. Switch to Connect and copy the client configuration. |
| 8 | Same MCP, both sides | One configuration, two places. Paste it into Claude Code, or into a FlowHunt agent's MCP Client field. |
| 9 | FlowHunt agent in action | Once wired, the agent reads your workspace — create, search, update, transition, comment. |
| 10 | CTA | The complete setup guide is on the FlowHunt blog. |

---

## Part 2 — Flowing read

Claude Code now connects directly to your Atlassian workspace.

Quick vocabulary check. Every Jira project has a short code. K-A-N, for Kanban template — but your team's code could be anything.

One natural-language prompt. Claude opens the right Jira project, searches for bugs nobody owns, and files a tracked fix task linked back to the bug it found.

Under the hood, your prompt becomes a tool call. Claude Code reaches your Jira through one of two MCP endpoints — Atlassian's MCP directly, or FlowHunt's hosted MCP as a bridge.

The direct route is the simplest. One terminal command — `claude mcp add atlassian` — then approve the OAuth scopes in your browser, and Claude Code is talking to Atlassian.

The FlowHunt route is point-and-click. Open Integrations, click Manage Integration on the Atlassian Token-based Auth card, paste your Atlassian domain, email, and API token, and Integrate. The page confirms it's connected.

Inside FlowHunt, that same integration powers a Jira MCP server with thirty-four tools — from creating issues to running JQL searches. Open MCP Servers, search Atlassian, name your server, and the Configure tab lists every capability. Switch to Connect, and FlowHunt hands you a ready-to-use client configuration.

One configuration. Two places. Paste it into Claude Code and `/mcp` shows your Jira MCP connected. Paste it into a FlowHunt agent's MCP Client field and the agent picks it up the same way. Both surfaces, the same server.

Once the FlowHunt agent is wired, the chat reads your real Atlassian workspace and lists the full surface — create, search, update, transition, and comment on Jira issues.

The complete setup guide is on the FlowHunt blog, with step-by-step instructions and worked examples for both Jira and Confluence.

---

## Recording notes

- Voice: Jon — Natural Authority (Agent / Assistant). Calm, natural American.
- Pronunciation: spell `K-A-N` letter by letter (not "kan"). Speak `claude mcp add atlassian` as natural English ("claude m-c-p add atlassian"). Speak `/mcp` as "slash m-c-p". Speak the URL as "flowhunt dot io slash blog".
- Paragraph breaks correspond to scene boundaries; pause naturally between them.
- Mic: a flat-EQ tracking signal is fine; no broadcast compression.
- File format: deliver as a single mono WAV at 48 kHz.
- Part 1 is a reference summary only — don't read it on the recording.
- Word count: ~285 words; expected render ~2:06 at this voice's pace. If the audio needs to fit inside the 80 s video, trim accordingly or speed the audio in post.
