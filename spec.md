# claude-code-jira-mcp — scene spec

**Total**: ~46.3 s · 30 fps · 1390 frames · 1920 × 1080 · FlowHunt palette · Inter + JetBrains Mono.

Scenes are contiguous; no cross-scene cuts inside a scene's `endFrame`. FlowHunt watermark on every scene via `scene()` builder. No em dashes in copy.

| # | id | name | range | dur | role |
|---|---|---|---|---|---|
| 1 | s1-pivot | Pivot | 0–90 | 3.0 s | Title card. "Claude Code reads Jira." |
| 2 | s2-demo | Demo | 90–570 | 16.0 s | Bug-triage flow in plain English (paced for non-tech viewers) |
| 3 | s3-arch | Architecture | 570–730 | ~5.3 s | Pipeline diagram (1.5x speed) |
| 4 | s4-install | Install | 730–910 | 6.0 s | The `claude mcp add` one-liner + OAuth flash |
| 5 | s5-snapshot | Snapshot magic | 910–1150 | 8.0 s | "What is a KAN?" hierarchy + tool surface |
| 6 | s6-cta | CTA | 1150–1390 | 8.0 s | FlowHunt logo + blog title + button + URL |

## Scene 1 — Pivot (0–90)

Background `#FFFFFF`. Watermark below.

- **0–20** Headline fades in centred at y=480: `Claude Code reads ` (`#111928`) `Jira.` (gradient `linear-gradient(90deg,#0084FF,#1A56DB)`), font Inter 108px / weight 800 / letter-spacing −2.
- **22–44** Underline draws under `Jira.` left→right, gradient bar 8px tall.
- **30–52** Subtitle fades in 40 px below: "Atlassian data, straight from your terminal." Inter 30px / 500 / `#6B7280`.
- **70–90** Hold + scene-out via fade (default 18 f).

## Scene 2 — Demo (90–450, scene-local frames 0–360)

Left pane (x 40 → 940): the user's Claude Code terminal. Right pane (x 980 → 1880): an animated Jira "issue" card preview that lights up at the end.

- **0–30** Terminal window slides in from x=40 with fade. Window chrome (red/yellow/green dots, title `claude · atlassian MCP`).
- **34–80** Prompt types in (typewriter cadence ~16 chars/s): the exact string from `demo-walkthrough.md` Step 4.
- **84–120** Tool call line types in: `⏺ atlassian(getVisibleJiraProjects)` then result `⎿ 2 projects · picked KAN`. Real values from the demo: KAN, SAM1.
- **128–180** Second tool: `⏺ atlassian(searchJiraIssuesUsingJql)` with the JQL string in monospace; result `⎿ 1 issue · KAN-3 Subtask 2.1 (unassigned)`.
- **190–250** Third tool: `⏺ atlassian(createJiraIssue)` with the field set summary on its own indented lines; result `⎿ ✓ KAN-4 Sprint summary 2026-05-14` in green, then the URL `flowhunt.atlassian.net/browse/KAN-4` underlined in cyan.
- **80–360** Right pane: a Jira-styled issue card starts as a faint skeleton at frame 80, gains a `KAN-3` row at frame 140 (matching the search result), then morphs at frame 240 into a new card titled "Sprint summary 2026-05-14" with `KAN-4` key visible. This card stays at full opacity from 260 to scene end.
- **330–360** Single narrator pill, bottom centre: "Read · Search · Write. One prompt."

## Scene 3 — Architecture (450–690, scene-local 0–240)

Pipeline diagram, 3 horizontally-laid nodes connected by gradient arrows.

- **0–25** Nodes fade in left to right with `easeBack`:
  1. **You** (terminal icon, label "Your prompt") at x=300
  2. **Claude Code** (small `>_` mark) at x=760
  3. **atlassian MCP** (FH-blue card with the official Atlassian "A" mark) at x=1220
  4. **Jira** (rounded blue rectangle with the Jira J swirl) at x=1620
- **30–80** Forward arrows draw between each pair (`#0084FF`, dasharray draw-in).
- **90–140** Return arrows draw underneath (`#475569`, dasharray draw-in). Pulse a small "data" dot that loops left→right→left along the top forward path and bottom return path through scene end.
- **150–200** Three labels fade above the forward arrows: "prompt", "tool call", "Jira API". Three labels fade below the return arrows: "tool result", "JSON response", "issue data".
- **210–240** Hold, then scene-out.

## Scene 4 — Install (690–870, scene-local 0–180)

A single full-bleed terminal with the install one-liner. Then a brief OAuth flash.

- **0–20** Terminal window fades in centred (1280 × 360 panel).
- **24–80** Prompt `$ ` types in, then the literal command: `claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp/authv2` (mono 22 px, syntax-coloured: `claude` `#22D3EE`, `mcp add` `#A78BFA`, flags `#FBBF24`, url `#22D3EE` underlined).
- **86–110** Result line fades in: `✓ Added MCP server "atlassian" (http, OAuth 2.1)` (`#22C55E`).
- **120–160** A small browser chrome card slides up from the bottom-right showing the Atlassian OAuth consent screen at 50 % scale: "Read · Search · Write" rows. The card highlights "Accept" with a green pulse at frame 150.
- **160–180** Hold, then scene-out.

## Scene 5 — Snapshot magic (870–1110, scene-local 0–240)

The "before → after" payoff. Left half: the raw JQL result JSON (from the comparison SVG). Right half: the rendered Jira issue page for KAN-4.

- **0–25** Left pane fades in (dark terminal, JQL JSON, real KAN-3 entry visible).
- **30–55** Right pane fades in (white Jira chrome, URL bar `flowhunt.atlassian.net/browse/KAN-4`, page header "Sprint summary 2026-05-14", description block with Unassigned heading + KAN-3 line).
- **70–110** A travelling highlight rectangle moves from the KAN-3 entry in the left JSON across the gap and snaps onto the KAN-3 reference inside the new issue's description on the right. Communicates: same data, two forms.
- **130–180** Stamp animates in over both panes: "From query to tracked issue." Inter 56 px gradient.
- **190–240** Hold, then scene-out.

## Scene 6 — CTA (1110–1350, scene-local 0–240)

End card. FlowHunt logo + blog title + button + URL.

- **0–22** FH gradient mark + "FlowHunt" wordmark fade in centred, y=320.
- **24–40** Thin divider expands underneath, 200 px → 200 px wide.
- **38–60** Blog title fades in below: "How to Use Claude Code with " (`#111928`) "the Jira MCP" (gradient).
- **52–74** Subtitle "A complete setup guide" (`#6B7280`).
- **66–88** Pill CTA button fades in + scales from 0.9: gradient pill, "Read the guide →", arrow nudges right by 3 px on a sine.
- **100–124** URL `flowhunt.io/blog` fades in below.
- **224–240** Scene-out via fade (default 26 f duration).

## Constraints recap

- `output.duration * fps == 1390`. Verify on every build.
- Watermark layer at y=994, height 50, on every scene.
- No real screenshots embedded; recreate Jira chrome inline with `React.createElement` so it can be animated.
- Source of truth: edit `build.mjs`, run `node build.mjs`, click Load in the playground.
