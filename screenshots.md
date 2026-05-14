# Screenshots index — claude-code-jira-mcp

The blog now relies on three SVGs for its visuals (hero, snapshot-vs-rendered comparison, worked-example flow diagram). Only one real screenshot is referenced inline in the body, because nothing else has a worth-doing-honestly visual a hand-drawn SVG can't recreate cleanly. Save it in `~/Desktop/claude-code-jira-mcp/`.

| # | Filename | What it shows | Blog section |
|---|----------|---------------|--------------|
| 1 | `claude-code-jira-mcp-oauth.png` | Atlassian's OAuth 2.1 consent screen during `claude mcp add`, showing the three Read / Search / Write permission groups against the picked Atlassian site | Setting Up → Authorize via OAuth |

You already have a usable capture of this screen in `~/Desktop/claude-code-jira-mcp-flowhunt/Screenshot 2026-05-14 at 18.27.21.png`. If you want to use it as-is, just copy it under the canonical name:

```bash
cp "~/Desktop/claude-code-jira-mcp-flowhunt/Screenshot 2026-05-14 at 18.27.21.png" \
   ~/Desktop/claude-code-jira-mcp/claude-code-jira-mcp-oauth.png
```

Before publishing: blur or crop out the small "HP" account avatar in the top-right of that capture if you do not want your initials visible.

## SVG assets (not screenshots)

- `claude-code-jira-mcp-hero.svg` — blog header. Hugo will render it as-is, or convert to raster with `rsvg-convert -w 1920 claude-code-jira-mcp-hero.svg > claude-code-jira-mcp-hero.png` if needed.
- `claude-code-jira-mcp-snapshot-vs-rendered.svg` — dual-pane: raw JQL JSON → the new Jira issue rendered in the browser.
- `claude-code-jira-mcp-flow-diagram.svg` — three-step pipeline showing `getVisibleJiraProjects → searchJiraIssuesUsingJql → createJiraIssue` with the real test-run values (project `KAN`, issue `KAN-3`, new issue `KAN-4`).

## Raw demo captures kept for rendervid reference (not used by the blog)

Everything in `~/Desktop/claude-code-jira-mcp-flowhunt/` (the 16 screenshots + the Kapture screen recording) stays where it is. The blog does not reference any of it. They are reference material for the rendervid promo, where the terminal UI and the Jira issue page will be recreated frame-by-frame as motion graphics. Do not delete those files yet.
