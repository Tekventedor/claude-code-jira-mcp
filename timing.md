# Scene timing — claude-code-jira-mcp

**Total**: ~80.8 s · 30 fps · 2425 frames · 1920 × 1080.

Maps each beat of `voiceover.md` Part 2 (the flowing read) to the scene it sits over, with the exact frame range so the VO can be timed precisely against the rendered video. `voiceover.md` Part 1 has the plain-English narrative for each scene — read that first to align with the video.

| # | id              | scene name                          | range        | dur     | maps to VO line |
|---|-----------------|--------------------------------------|--------------|---------|-----------------|
| 1 | s01-pivot       | Pivot                                | 0–90         | 3.0 s   | *"Claude Code now connects directly to your Atlassian workspace."* |
| 2 | s02-explainer   | Project codes                        | 90–330       | 8.0 s   | *"Quick vocabulary check… K-A-N, for Kanban template…"* |
| 3 | s03-demo        | Demo (bug triage, 2x)                | 330–570      | 8.0 s   | *"One prompt. Claude opens the project…"* |
| 4 | s04-arch        | Architecture (fork to 2 MCPs)        | 570–730      | ~5.3 s  | *"Your prompt becomes a tool call. … Atlassian's directly, or FlowHunt as a bridge."* |
| 5 | s05-cc-direct   | Claude Code direct to Atlassian      | 730–1015     | 9.5 s   | *"The direct path is the simplest. … the connection goes live."* |
| 6 | s06-fh-oauth    | FlowHunt Token-Auth integration      | 1015–1300    | 9.5 s   | *"The FlowHunt path is point-and-click. … approve the connection."* |
| 7 | s07-fh-mcp      | MCP Server config + Connect JSON     | 1300–1585    | 9.5 s   | *"Inside FlowHunt… thirty-four tools… ready-to-use client configuration."* |
| 8 | s08-fh-bridge   | Same MCP, both sides (paste anim)    | 1585–1915    | 11.0 s  | *"The same configuration works in two places… Both surfaces talk to the same server."* |
| 9 | s09-fh-usage    | FlowHunt agent in action             | 1915–2185    | 9.0 s   | *"Once connected, the agent reads your workspace…"* |
| 10| s10-cta         | CTA                                  | 2185–2425    | 8.0 s   | *"The complete setup guide is on the FlowHunt blog…"* |

## Reading cadence

Target ~171 WPM end-to-end. Cadence varies by beat:
- Pivot, project-codes, demo: light and quick.
- Architecture: tight and technical (the scene runs at 1.5x).
- Claude Code direct + FlowHunt setup beats: step-by-step, slightly slower.
- MCP-server-config + bridge: steady and informative.
- Usage: observational, match the chat-scroll pacing.
- CTA: soft trail-off.

## Sync hits

Lines that should land on a specific visual moment:
- `K-A-N` lands as the KAN project pill highlights (Scene 2).
- `directly` lands as the top connector reaches the Atlassian MCP node (Scene 4).
- `or FlowHunt as a bridge` lands as the bottom connector reaches the FlowHunt MCP node (Scene 4).
- `the connection goes live` lands as the OAuth Accept button settles into its slow pulse (Scene 5).
- `approve the connection` lands as the **Integrate Atlassian** button click flash fires (Scene 6).
- `thirty-four tools` lands as the capabilities list scrolls past (Scene 7).
- `ready-to-use client configuration` lands as the JSON card appears in the Connect tab (Scene 7).
- `Both surfaces talk to the same server` lands as both caption pills sit visible side by side (Scene 8).
- The closing `Confluence` lands as the gradient CTA button pulses (Scene 10).
