# Claude Code + Jira MCP — Demo walkthrough

Follow these steps top to bottom. Every command, every screenshot, in order. Filenames in the screenshot instructions must match exactly so the blog markdown's `{{< lazyimg >}}` references resolve.

All screenshots go in `~/Desktop/claude-code-jira-mcp/`.

---

## 0. Prerequisite — an active, verified Atlassian Cloud account with Jira

The MCP server only works against a live Atlassian Cloud site that has Jira provisioned. If you do not already have one, set one up first or the OAuth step in section 2 will return scopes the worked example cannot use.

1. Open <https://www.atlassian.com/software/jira/free> and sign up. Free tier is fine for everything in this walkthrough.
2. Verify the email Atlassian sends you. Unverified accounts can sign in but the OAuth handshake the MCP uses will reject them.
3. Sign in to <https://id.atlassian.com> and confirm you can see at least one Jira site (the free signup auto-provisions `your-team.atlassian.net`).
4. Make sure you are logged in to Atlassian in the same browser you will use for the OAuth step in section 2.
5. Inside Jira, make sure your site has at least one project with two or three issues resolved recently. If you are starting from a brand-new site, create a project with a few sample issues (`Create issue` → mark them as Done) so step 4's JQL search has data to return.

> Screenshot the Jira site landing page once you are signed in, save as `claude-code-jira-mcp-account.png`.

Only continue once steps 1–5 are done.

## 1. Install the Atlassian Remote MCP server in Claude Code

Open Terminal. Quit any existing `claude` session first.

Paste:

```bash
claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp/authv2
```

You should see confirmation that the `atlassian` MCP server was added.

> Screenshot now → save as `claude-code-jira-mcp-add.png`

## 2. Authorize via OAuth

Start a new Claude Code session in any directory:

```bash
mkdir -p ~/Desktop/jira-mcp-demo
cd ~/Desktop/jira-mcp-demo
claude
```

The first time you use any Atlassian tool, Claude Code opens a browser to Atlassian's OAuth 2.1 consent screen. Pick the Atlassian site (e.g. `your-team.atlassian.net`) and approve the three permission groups the screen presents: **Read**, **Search**, **Write**. The scopes you actually get are determined by what products are provisioned on the chosen site — Jira-only sites give Jira scopes, sites with Confluence also installed give Confluence scopes from the same checkbox set.

> Screenshot the OAuth consent screen → save as `claude-code-jira-mcp-oauth.png`

After you Accept, the browser tab can be closed. The terminal session is now authenticated against that site.

## 3. Verify the connection

In the running Claude Code session, type:

```
/mcp
```

You should see `atlassian` listed as `connected`. The tool list will include `searchJiraIssuesUsingJql`, `getJiraIssue`, `getVisibleJiraProjects`, `createJiraIssue`, and roughly fifteen others.

> Screenshot the `/mcp` output → save as `claude-code-jira-mcp-mcp-check.png`

## 4. Worked example — sprint summary as a new Jira issue

This single prompt exercises three tools in sequence: list projects → search by JQL → create a new tracking issue. It's the demo the blog walks through, and it works on any Jira-only Atlassian site.

Paste this prompt into the running Claude Code session **exactly as written**:

```
I want a sprint summary captured as a tracking issue. Use the Atlassian MCP to:

1. List the Jira projects I have access to and pick the one I most likely use day to day (ask me if it's not obvious).
2. In that project, search for issues resolved in the last 14 days. Use JQL:
   project = <KEY> AND resolved >= -14d ORDER BY resolved DESC
3. Group the results by assignee. For each assignee, list the issue key, summary, and resolution date.
4. Create a new Jira issue in that same project, type Task, summary "Sprint summary <today's date>". Put the grouped summary in the description, with one heading per assignee.

Show me what you find at each step before creating the issue.
```

> Screenshot the **first tool call** (`getVisibleJiraProjects`) and its result → save as `claude-code-jira-mcp-projects.png`
>
> Screenshot the **second tool call** (`searchJiraIssuesUsingJql`) and the JQL result list → save as `claude-code-jira-mcp-search.png`
>
> Screenshot Claude's **grouped summary** (step 3 output, before the issue is created) → save as `claude-code-jira-mcp-summary.png`
>
> Screenshot the **third tool call** (`createJiraIssue`) and the confirmation including the new issue's key and URL → save as `claude-code-jira-mcp-create.png`

Then open the issue URL in your browser to confirm the new issue actually exists with the grouped description rendered.

> Screenshot the rendered Jira issue page → save as `claude-code-jira-mcp-result.png`

## 5. (Optional) Verify a read tool individually

In the same session, paste:

```
Fetch issue <ONE OF THE KEYS YOU SAW EARLIER> and tell me its full description and current status.
```

This exercises `getJiraIssue` directly without other tools in the chain — useful for the blog's "Other Tools Worth Knowing" section.

> Screenshot the result → save as `claude-code-jira-mcp-getissue.png`

## 6. What to paste back to me

When the walkthrough is complete, paste back into the chat:

1. **The project key** you picked (e.g. `KAN`)
2. **The JQL query** Claude actually ran (in case it differs from the prompt above)
3. **Two or three real issue keys + summaries** from the search results — if your project only has one resolved issue right now, just paste that one and tell me; I'll keep the blog honest about it
4. **The newly-created issue's key + URL** (e.g. `KAN-145` at `flowhunt.atlassian.net/browse/KAN-145`)
5. **The tool-call JSON or text** Claude Code printed for the first `searchJiraIssuesUsingJql` call (inputs + outputs, just the structure)
6. **Anything unexpected** — error messages, scope-denied moments, tools that returned 404, missing products on your site

I'll find-and-replace every `<...>` placeholder in `how-to-use-claude-code-with-the-jira-mcp.md` with these real strings, then start the rendervid video.

## 7. Cleanup (do this only when you're done with the demo)

```bash
claude mcp remove atlassian
```

If you do not want the test "Sprint summary" issue to stick around in your project, open it in Jira and delete it (or transition it to Done). Real artifacts in real projects are easy to forget about.
