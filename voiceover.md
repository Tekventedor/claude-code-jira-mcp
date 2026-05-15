# Voice-over script — claude-code-jira-mcp

**Total runtime**: ~69.3 s. Target ~165 WPM informational. Read like a presenter explaining a product, not a punchy ad. Full sentences, complete thoughts. The visuals are deliberately sparse so the narration carries the substance.

Each scene block lists: frame range · scene id · timing budget · approximate word count · narration. Pauses are implicit at every period; commas are a half-beat. Speak `KAN-3` as "Kan three" (not "Kan dash three"). Speak the URL as "flowhunt dot io slash blog".

---

## Scene 1 — Pivot · frames 0–90 · 3.0 s · ~9 words

> Claude Code now connects directly to your Atlassian workspace.

A simple, declarative opening line. Hold the period; let the gradient on "Jira." land before the cut.

## Scene 2 — Project codes · frames 90–330 · 8.0 s · ~24 words

> Quick vocabulary check. Every Jira project has a short code. Ours is K-A-N because we used a Kanban template, but your team's code could be anything.

Spell "K-A-N" out so non-technical viewers register that it's a code, not a word. Land "K-A-N" exactly as the KAN pill highlights on screen.

## Scene 3 — Demo · frames 330–570 · 8.0 s · ~22 words

> One prompt. Claude opens the project, finds an open bug nobody owns, and files a tracked fix task linked to that bug.

The scene runs at 2x so each step is brief — keep the read tight and conversational, matching the typewriter cadence.

## Scene 4 — Architecture · frames 570–730 · ~5.3 s · ~21 words

> Under the hood, every prompt takes a single round trip. Claude Code forwards your request to the Atlassian MCP server, which returns live data.

Tight read — the scene runs at 1.5x. Match the cadence of the node fade-ins; don't pause between beats.

## Scene 5 — FlowHunt + Atlassian OAuth · frames 730–1015 · 9.5 s · ~34 words

> Setup begins in FlowHunt. Open the Integrations page, click Atlassian, and Atlassian's own consent screen appears asking whether you'll let FlowHunt manage your Jira and Confluence on your behalf.

Land "manage your Jira and Confluence on your behalf" as the Accept button on the consent screen settles into its slow pulse.

## Scene 6 — MCP Server config and Connect JSON · frames 1015–1300 · 9.5 s · ~38 words

> Inside FlowHunt, the Atlassian integration exposes a Jira MCP Server with thirty-four tools, from creating issues to running JQL searches. Name it, save it, and FlowHunt hands back a ready-to-use MCP client configuration.

Pace the read so "thirty-four tools" lands as the capabilities list scrolls past. "Ready-to-use MCP client configuration" lands as the JSON card appears.

## Scene 7 — One JSON, two surfaces · frames 1300–1570 · 9.0 s · ~34 words

> The same configuration works two ways. Drop it into Claude Code with a single command, or paste it into a FlowHunt agent's MCP Client field. Both surfaces talk to the same server.

Land "both surfaces talk to the same server" as the two caption pills "Local: Claude Code" and "Online: FlowHunt agent" fade in side by side.

## Scene 8 — Agent in action · frames 1570–1840 · 9.0 s · ~38 words

> Once connected, the agent reads your real workspace. Here it pulls seventeen open tickets across two projects, then explains the rest of what it can do: create, search, update, transition, and comment on Jira issues.

Pace this with the scroll: the ticket list lands at the top, then the capability list scrolls into view below it.

## Scene 9 — CTA · frames 1840–2080 · 8.0 s · ~26 words

> The complete step-by-step setup guide is on the FlowHunt blog. It walks through the install command, the OAuth consent screen, and worked examples for both Jira and Confluence.

Trail off softly. The final line should land as the gradient button pulses.

---

## Total word count

~198 words across ~60.3 s. Comfortable at 197 WPM. Read flat — no upspeak, no hyped energy.

## Recording notes

- Voice: presenter tone. The viewer should feel they are being explained to, not sold to.
- Mic: a flat-EQ tracking signal is fine; no broadcast compression.
- Cuts: the video has no music bed; pauses are silent, so leave a half-beat of breath between scenes.
- File format: deliver as a single mono WAV at 48 kHz, or one stem per scene if you want to drop lines individually.
