# Scene-structure alternatives (saved 2026-05-15)

The video currently uses **Option 1** (chosen on 2026-05-15). The other two were the runner-ups — keep them on file in case the chosen structure feels too long / too thin after watching the rendered output.

## Option 1 (CHOSEN) — 4-scene FlowHunt-bridged rewrite

Eight scenes total, ~70 s. Replaces scenes 5+6, adds scene 7.

| # | scene | content |
|---|---|---|
| 5 | FlowHunt OAuth integration | Integrations page → Atlassian consent screen ("FlowHunt is requesting access") → success toast. |
| 6 | MCP Server config + Connect JSON | "Server name" modal with 34 Jira tools, name "Jira", save → Connect tab reveals the `mcp.flowhunt.io/<id>` JSON. |
| 7 | Two paths from one JSON | LEFT: Claude Code terminal `claude mcp add jira --transport streamable_http https://mcp.flowhunt.io/...` → connected. RIGHT: FlowHunt agent Configure Tool > MCP Client dialog with the same JSON pasted in. |
| 8 | FlowHunt agent in action | Existing scroll scene, kept; tweaked so it reads as both made-up ticket data AND the capability list (a real Jira response and a "what can I do" intro stacked into one scroll). |

## Option 2 — Compressed (~62 s)

Folds MCP server config + Connect JSON + Local Claude Code install into ONE scene. Tighter, fewer scenes to follow. Loses the "JSON is the bridge" beat — viewer has less time to read the config card. Right call if the rendered video feels too long.

| # | scene | content |
|---|---|---|
| 5 | FlowHunt OAuth integration | Same as Option 1. |
| 6 | One-shot setup + local install | MCP Server config on the left → JSON config → terminal `claude mcp add jira …` on the right. All in one scene. |
| 7 | FlowHunt agent in action | Same as Option 1 Scene 8. |

## Option 3 — Expanded detail (~78 s)

Keeps Local + Online as **separate** full scenes — best for a longer-form blog video where viewers have patience for both ends of the bridge.

| # | scene | content |
|---|---|---|
| 5 | FlowHunt OAuth integration | Same as Option 1. |
| 6 | MCP Server config + Connect JSON | Same as Option 1 Scene 6. |
| 7 | Local install (Claude Code) | Full Claude Code terminal: `claude mcp add jira …` + `claude mcp list` + `/mcp` listing + a short "ask for tickets" interaction. |
| 8 | Online use (FlowHunt agent) | Configure Tool > MCP Client dialog inside an agent, then the chat scroll showing the agent's response. |
| 9 | (CTA) | Existing. |

## How to switch later

Both alternatives are sketched above; ask Claude to "switch to Option 2 / 3 from ALTERNATIVES.md" and it'll do the diff against current scene set.
