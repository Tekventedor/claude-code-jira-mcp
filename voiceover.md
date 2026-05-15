# Voice-over script — claude-code-jira-mcp

**Total runtime**: ~42.3 s. Target ~190 WPM conversational. Read with energy, slightly faster than natural; the cuts are tight.

Each scene block lists: frame range · scene id · timing budget · approximate word count · narration. Pauses are implicit at every period; em-dashes are a beat. Speak `KAN-3` as "Kan three" (not "Kan dash three"). Speak the URL as "flowhunt dot io slash blog".

---

## Scene 1 — Pivot · frames 0–90 · 3.0 s · ~9 words

> Claude Code talks to Atlassian. Through one connector.

Hard cut into the demo.

## Scene 2 — Demo · frames 90–450 · 12.0 s · ~40 words

> You paste one prompt. Claude finds your Jira project. Runs the JQL to spot an open bug with no owner — KAN three. Then files a triage task — KAN four — blocking the bug so it can't slip the sprint. Three tool calls. One prompt.

Land "KAN four" exactly as `createJiraIssue` resolves on screen (~frame 230).

## Scene 3 — Architecture · frames 450–610 · ~5.3 s · ~16 words

> The whole loop. Your prompt to Claude Code. Claude Code to Atlassian. Atlassian back with real data.

Tight read — scene runs at 1.5x. Don't pause between beats.

## Scene 4 — Install · frames 610–790 · 6.0 s · ~19 words

> One command sets it up. `claude mcp add atlassian`. OAuth in the browser. And you're connected. Free tier included.

Read the command flat, matching the on-screen typewriter cadence.

## Scene 5 — KAN, explained · frames 790–1030 · 8.0 s · ~26 words

> Quick decoder. `KAN` is your project key — every Jira project has one. `KAN-3`, `KAN-4` — those are issue keys inside it. Learn the key. The MCP unlocks everything else.

Land "Learn the key" right when the bottom ribbon of tool categories fans in.

## Scene 6 — CTA · frames 1030–1270 · 8.0 s · ~25 words

> Read the full setup guide at flowhunt dot io slash blog. Claude Code plus the Atlassian MCP server. Your terminal. Your tickets.

Trail off softly. Last line lands as the gradient button pulses.

---

## Total word count

~132 words across ~42.3 s. Comfortable at 187 WPM. If you slow down to 170 WPM, drop the "Free tier included." line in Scene 4 to fit.

## Recording notes

- Voice: dry, slightly fast, no upspeak. Mirror Anthropic's house tone, not a marketing read.
- Mic: a flat-EQ tracking signal is fine; no broadcast compression.
- Cuts: the video has no music bed; pauses are silent, so don't over-perform "energy" between lines.
- File format: deliver as a single mono WAV at 48 kHz or one stem per scene if you want to drop lines individually.
