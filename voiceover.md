# Voice-over script — claude-code-jira-mcp

**Total runtime**: ~80.8 s · 10 scenes · 2425 frames. Per-scene frame ranges live in `timing.md`.

**Speaker pace**: ~140 WPM (measured from ElevenLabs voice `sB7vwSCyX0tQmU24cW2C` rendering the prior 285-word script in 2:02). At that pace, ~188 words fit in 80.8 s. This script is **~180 words** to leave headroom for breath beats.

This file has two parts:

- **Part 1 — Scene narrative** (plain English summary of *what is said* over each scene). Read this first to align with the video before you record.
- **Part 2 — Flowing read with stage directions** (the actual recording script). Stage directions in `[brackets]` are reader cues only; they don't get spoken.

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

Target ~140 WPM. Read like a presenter explaining a product. Stage directions in `[brackets]` are reader cues — they don't get spoken. Speak `K-A-N` letter by letter. Speak the URL as "flowhunt dot io slash blog".

[calm, clear] Claude Code now connects directly to your Atlassian workspace. [slight pause]

[light, explanatory] Every Jira project has a short code. [emphasize, spell out] Ours is K-A-N, [release] for Kanban template. Yours can be anything. [pause]

[slightly quicker] One prompt. Claude opens your project, finds an unassigned bug, and files a fix task linked to it. [brief pause]

[tight, technical] Your prompt becomes a tool call — sent to one of two MCP endpoints. [emphasize] Atlassian directly, or FlowHunt as a bridge. [no extra pause]

[matter-of-fact] The direct route is one terminal command. Approve the OAuth scopes in the browser, and you're connected. [pause]

[guided, step-by-step] The FlowHunt route is point-and-click. Open Integrations, paste your Atlassian domain, email, and API token, and [slight emphasis] Integrate. [pause]

[steady, informative] Inside FlowHunt, that integration powers a Jira MCP server with [emphasize] thirty-four tools. Save it, switch to Connect, and copy the client configuration. [pause]

[balanced, clear contrast] One configuration, two places. Paste it into Claude Code, or into a FlowHunt agent's MCP Client field. [resolve] Both talk to the same server. [pause]

[observational] Once wired, the agent reads your workspace — [light emphasis sequence] create, search, update, transition, and comment on Jira issues. [pause]

[soft, closing tone] The complete setup guide is on the FlowHunt blog, with worked examples for Jira and Confluence. [trail off]

---

## Total word count

~180 words across ~80.8 s. At ~140 WPM that's ~77 seconds of speech + room for the bracketed pauses to breathe.

## Recording notes

- Voice: presenter tone. The viewer should feel they are being explained to, not sold to.
- Pronunciation: spell `K-A-N` letter by letter (not "kan"). Speak the URL as "flowhunt dot io slash blog". Speak `/mcp` (if it's read) as "slash m-c-p".
- Mic: a flat-EQ tracking signal is fine; no broadcast compression.
- Cuts: the video has no music bed; pauses are silent, so leave a half-beat of breath at each `[pause]`.
- File format: deliver as a single mono WAV at 48 kHz.
- The bracketed directions in Part 2 are reader cues, not spoken text. Part 1 is a reference summary only — don't read it on the recording.
- Re-rendering with the same ElevenLabs voice should land at or under 80 s without changes.
