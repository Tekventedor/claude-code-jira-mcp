# Voice-over script — claude-code-jira-mcp

**Total runtime**: ~80.8 s · 10 scenes · 2425 frames. Per-scene frame ranges live in `timing.md`.

**Speaker pace**: ~136 WPM (measured from ElevenLabs voice "Jon — Natural Authority", id `sB7vwSCyX0tQmU24cW2C`, rendering the prior 285-word script in 2:06). At that pace, 80.8 s ≈ 183 words. This script is **~180 words** to leave a touch of headroom.

This file has two parts:

- **Part 1 — Scene narrative** (plain English summary of *what is said* over each scene). Read this first to align with the video before you record.
- **Part 2 — Flowing read** (the actual recording script). Plain prose, one paragraph per scene, in order.

---

## Part 1 — Scene narrative

| # | Scene | Spoken about |
|---|---|---|
| 1 | Pivot | Claude Code now connects directly to your Atlassian workspace. |
| 2 | Project codes | Every Jira project has a short code. Ours is `KAN` because we used a Kanban template. |
| 3 | Demo (bug triage) | One prompt. Claude opens the project, finds an unassigned bug, and files a fix task linked to it. |
| 4 | Architecture | The prompt becomes a tool call sent to one of two MCP endpoints — Atlassian directly, or FlowHunt as a bridge. |
| 5 | Claude Code direct path | The direct route is one terminal command, then approve the OAuth scopes. |
| 6 | FlowHunt Token-Auth | The FlowHunt route is point-and-click. Open Integrations, paste your Atlassian domain, email, and API token. |
| 7 | MCP server config + Connect JSON | Inside FlowHunt, the integration powers a Jira MCP server with thirty-four tools. Switch to Connect and copy the client configuration. |
| 8 | Same MCP, both sides | One configuration, two places. Paste it into Claude Code, or into a FlowHunt agent's MCP Client field. |
| 9 | FlowHunt agent in action | Once wired, the agent reads your workspace — create, search, update, transition, comment. |
| 10 | CTA | The complete setup guide is on the FlowHunt blog. |

---

## Part 2 — Flowing read

Claude Code now connects directly to your Atlassian workspace.

Every Jira project has a short code. Ours is K-A-N, for Kanban template. Yours can be anything.

One prompt. Claude opens your project, finds an unassigned bug, and files a fix task linked to it.

Your prompt becomes a tool call — sent to one of two MCP endpoints. Atlassian directly, or FlowHunt as a bridge.

The direct route is one terminal command. Approve the OAuth scopes in the browser, and you're connected.

The FlowHunt route is point-and-click. Open Integrations, paste your Atlassian domain, email, and API token, and Integrate.

Inside FlowHunt, that integration powers a Jira MCP server with thirty-four tools. Save it, switch to Connect, and copy the client configuration.

One configuration, two places. Paste it into Claude Code, or into a FlowHunt agent's MCP Client field. Both talk to the same server.

Once wired, the agent reads your workspace — create, search, update, transition, and comment on Jira issues.

The complete setup guide is on the FlowHunt blog, with worked examples for Jira and Confluence.

---

## Total word count

~180 words across ~80.8 s at ~136 WPM ≈ 79 seconds of speech, leaving ~2 seconds of natural pause across the read.

## Recording notes

- Voice: Jon — Natural Authority (Agent / Assistant). Calm, natural American.
- Pronunciation: spell `K-A-N` letter by letter (not "kan"). Speak the URL as "flowhunt dot io slash blog".
- Paragraph breaks correspond to scene boundaries; pause naturally between them.
- Mic: a flat-EQ tracking signal is fine; no broadcast compression.
- File format: deliver as a single mono WAV at 48 kHz.
- Part 1 is a reference summary only — don't read it on the recording.
- Re-rendering with the same ElevenLabs voice should land at or under 80 s without further changes.
