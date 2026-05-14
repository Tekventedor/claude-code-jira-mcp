# Voice-over script — claude-code-jira-mcp

**Total runtime**: 45 s. Target ~190 WPM conversational. Read with energy, slightly faster than natural; the cuts are tight.

Each scene block lists: frame range · scene id · timing budget · approximate word count · narration. Pauses are implicit at every period; em-dashes are a beat. Speak `KAN-3` as "Kan three" (not "Kan dash three"). Speak the URL as "flowhunt dot io slash blog".

---

## Scene 1 — Pivot · frames 0–90 · 3.0 s · ~9 words

> Claude Code talks to Atlassian. Through one connector.

Hard cut into the demo.

## Scene 2 — Demo · frames 90–450 · 12.0 s · ~38 words

> You paste one prompt. Claude finds your Jira project. Runs your JQL. Pulls back the issue resolved this sprint — KAN three. Then files a new tracking issue — KAN four — with the summary already written. Three tool calls. One prompt.

Land "KAN four" exactly as `createJiraIssue` resolves on screen (~frame 230).

## Scene 3 — Architecture · frames 450–690 · 8.0 s · ~25 words

> That's the whole loop. Your prompt goes to Claude Code. Claude Code calls the Atlassian MCP server. Atlassian answers with your real data. No tabs. No copy-paste.

Time the last two beats to the node entries.

## Scene 4 — Install · frames 690–870 · 6.0 s · ~19 words

> One command sets it up. `claude mcp add atlassian`. OAuth in the browser. And you're connected. Free tier included.

Read the command flat, matching the on-screen typewriter cadence.

## Scene 5 — Snapshot magic · frames 870–1110 · 8.0 s · ~25 words

> On the left, raw JQL output. On the right, the same data turned into a tracked Atlassian issue Claude just filed. Same source. Same data. New container.

Hit "new container" right when the right-pane Jira card settles.

## Scene 6 — CTA · frames 1110–1350 · 8.0 s · ~25 words

> Read the full setup guide at flowhunt dot io slash blog. Claude Code plus the Atlassian MCP server. Your terminal. Your tickets.

Trail off softly. Last line lands as the gradient button pulses.

---

## Total word count

~141 words across 45 s. Comfortable at 188 WPM. If you slow down to 170 WPM, drop the "Free tier included." line in Scene 4 and the "No copy-paste." line in Scene 3 to fit.

## Recording notes

- Voice: dry, slightly fast, no upspeak. Mirror Anthropic's house tone, not a marketing read.
- Mic: a flat-EQ tracking signal is fine; no broadcast compression.
- Cuts: the video has no music bed; pauses are silent, so don't over-perform "energy" between lines.
- File format: deliver as a single mono WAV at 48 kHz or one stem per scene if you want to drop lines individually.
