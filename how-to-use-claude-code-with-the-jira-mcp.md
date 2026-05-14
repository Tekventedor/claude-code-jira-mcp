+++
title = "How to Use Claude Code with the Jira MCP"
linkbuilding = [ "claude code jira mcp", "jira mcp claude code", "jira mcp setup claude", "claude mcp add jira", "atlassian remote mcp server", "rovo mcp claude code", "jira ai agent", "claude code atlassian", "jira automation claude", "ai for jira sprint summary" ]
keywords = [ "claude code", "jira mcp", "atlassian remote mcp server", "rovo", "model context protocol", "ai for jira", "ai sprint summary", "jira automation" ]
description = "Connect Claude Code to the Atlassian Remote MCP server and let your terminal list real Jira projects, run JQL searches, and file the summary back as a new Jira issue. Step-by-step setup plus a working example."
image = "/images/blog/claude-code-jira-mcp-hero.png"
shortDescription = "A step-by-step guide to installing the Atlassian Remote MCP server with Claude Code, plus a worked example that turns a JQL search into a freshly created sprint-summary Jira issue."
tags = [ "Claude Code", "Jira", "MCP", "Model Context Protocol", "Atlassian", "Developer Tools", "AI Agents" ]
blog-categories = ["Automation and Workflows"]
showCTA = true
ctaHeading = "Run Your Jira Workflows From Claude Code"
ctaDescription = "Stop tab-hopping between Jira and your terminal. Wire the Atlassian Remote MCP server into Claude Code once and let your AI agent list projects, search issues, and file new ones without leaving the shell."
ctaPrimaryText = "Try Claude Code"
ctaPrimaryURL = "https://www.claude.com/product/claude-code"
ctaSecondaryText = "Read the Atlassian Docs"
ctaSecondaryURL = "https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/"
author = ""
date = "2026-05-14 09:00:00"
[[faq]]
question = "What is the Jira MCP and is it the same as Rovo?"
answer = "The product is officially called the Atlassian Remote MCP Server. People search for 'Jira MCP' because Jira is the most common entry point. It also covers Confluence on sites where Confluence is provisioned, and exposes Atlassian's Rovo Search as a tool. The server itself is not an AI; it is a connector that securely proxies your Atlassian data into any MCP-compatible AI client, including Claude Code."

[[faq]]
question = "Do I need a paid Atlassian plan to use the Jira MCP with Claude Code?"
answer = "No. The Atlassian Remote MCP Server is available to all Atlassian Cloud customers, including the free tier. Rate limits scale with plan, from 500 calls per hour on the free tier up to 10,000+ on higher tiers."

[[faq]]
question = "Does Claude Code see all my Jira data?"
answer = "Only what your signed-in Atlassian account can see. The MCP server operates inside the permission scope of the user who completed the OAuth flow. It also does not store or cache Jira content."

[[faq]]
question = "Can Claude Code write back to Jira, or is it read-only?"
answer = "Both. The server exposes write tools (`createJiraIssue`, `editJiraIssue`, `transitionJiraIssue`, `addCommentToJiraIssue`, and more). You authorize the broad Read / Search / Write scope groups during the OAuth handshake."

[[faq]]
question = "What if my Atlassian site does not have Confluence?"
answer = "The MCP still works, just with Jira-only scopes. The OAuth screen presents the same Read / Search / Write checkboxes regardless of which products are provisioned on the site; the resulting scopes only cover the products that exist. The worked example in this guide is Jira-only so it runs on any Atlassian Cloud site, free or paid."

[[faq]]
question = "What is the MCP server URL?"
answer = "`https://mcp.atlassian.com/v1/mcp/authv2`. The older `https://mcp.atlassian.com/v1/sse` endpoint is deprecated and stops working after 30 June 2026, so use the `authv2` URL for any new install."

[[faq]]
question = "Will it work alongside other MCP servers I already have?"
answer = "Yes. Claude Code's MCP support is additive; each server is independent. You can have Figma MCP, GitHub MCP, and the Atlassian Remote MCP Server installed at the same time, and Claude will pick tools across all of them as the task demands."


+++

## What Is the Jira MCP Server?

The product most people search for as the "Jira MCP" is the **Atlassian Remote MCP Server**. It is the official connector that exposes your Atlassian data to any AI client that speaks the Model Context Protocol, including Claude Code in your terminal.

The server itself is not an AI. It is a secure proxy that takes natural-language tool calls from your AI client, runs them inside the permission scope of your signed-in Atlassian account, and streams the data back. Atlassian's own Rovo AI product is a separate thing; the MCP server is what lets non-Atlassian clients reach into the same data.

For Claude Code running on Jira, that means an agent in your terminal can list every project you have access to, run arbitrary JQL searches, fetch full issue context, comment on existing issues, transition them through workflow states, and file brand-new issues. The flow this guide walks through ends with a freshly created "Sprint summary" issue containing a grouped digest of recently resolved tickets, all from a single prompt.

## Why Use It With Claude Code

- **Real Jira data, not screenshots.** Claude Code calls tools and gets structured responses (issue fields, JQL result lists). No vision model trying to parse a screenshot of a board.
- **Read, search, and write in one prompt.** Pull issues, group them, and file a tracking issue summarising them, in a single agent turn.
- **Scoped to your permissions.** Whatever you can see in your browser, Claude Code can see. Whatever you cannot, it cannot.
- **No engineering needed.** One `claude mcp add` line and one OAuth approval. No bespoke API client, no token rotation.

## Prerequisites

Before you start, make sure you have:

- An **Atlassian Cloud** account with at least one Jira site provisioned. Free tier is fine; this won't work on self-hosted or Data Center. Sign up at <https://www.atlassian.com/software/jira/free> if you do not already have one.
- A **verified email** on that account. Unverified accounts can sign in but the OAuth handshake will reject them.
- **Claude Code** installed and signed in. Running `claude` in your terminal should drop you into an agent session.
- Permission, on the Atlassian side, to read and write in the project you want to touch.
- A modern browser available for the one-time OAuth approval, signed into the same Atlassian account in that browser.
- At least two or three recently resolved issues in your project so the JQL search in the worked example has something to return. If you are starting from a fresh site, file a few sample issues and mark them as Done before continuing.

## Setting Up the Atlassian Remote MCP Server

Connecting Claude Code to your Atlassian instance is one command and one browser approval.

### Add the MCP server

Open your terminal and run:

```bash
claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp/authv2
```

This registers a new MCP server named `atlassian` that Claude Code connects to over HTTP at Atlassian's hosted endpoint.

One thing to watch: if a `claude` session was already running when you ran the `mcp add` command, exit that session and start a new one. The MCP server registry is loaded at session start.

### Authorize via OAuth

Start a fresh Claude Code session:

```bash
mkdir -p ~/Desktop/jira-mcp-demo
cd ~/Desktop/jira-mcp-demo
claude
```

The first time Claude Code reaches for any Atlassian tool, it opens a browser to Atlassian's OAuth 2.1 consent screen. Pick the Atlassian site you want to expose, and approve the three permission groups: **Read**, **Search**, **Write**.

{{< lazyimg src="claude-code-jira-mcp-oauth.png" alt="Atlassian's OAuth consent screen during the Claude Code MCP authorization, showing the three Read, Search, and Write permission groups" >}}

A note on these scopes: the consent screen does not let you toggle individual products (Jira vs Confluence vs Bitbucket). It grants the same Read / Search / Write blanket across whatever Atlassian products are provisioned on the site you picked. A Jira-only site gives you Jira scopes; a site that also has Confluence gives you Confluence scopes from the same boxes. If a tool call later returns a 404, the most common cause is that the product backing that tool simply is not on this site.

The MCP server runs inside your account's permission boundary from that point on. You can revoke the grant at any time from your Atlassian account's connected apps page.

### Verify the connection

Inside the running Claude Code session, type `/mcp`. You should see `atlassian` listed as `connected`, with around twenty tools available across Jira reads, Jira writes, Jira searches, plus the Atlassian-wide search and fetch helpers. The expected confirmation looks like `Authentication successful. Connected to atlassian.`

## Worked Example: Sprint Summary As a New Jira Issue

The most useful flow is one prompt that mixes read, search, and write entirely inside Jira. Here we ask Claude Code to find recently resolved issues in your project, group them, and file the summary as a new tracking issue.

Paste this prompt into the running session:

```
I want a sprint summary captured as a tracking issue. Use the Atlassian MCP to:

1. List the Jira projects I have access to and pick the one I most likely use day to day.
2. In that project, search for issues resolved in the last 14 days. Use JQL:
   project = <KEY> AND resolved >= -14d ORDER BY resolved DESC
3. Group the results by assignee. For each assignee, list the issue key, summary, and resolution date.
4. Create a new Jira issue in that same project, type Task, summary "Sprint summary <today's date>". Put the grouped summary in the description, with one heading per assignee.

Show me what you find at each step before creating the issue.
```

Claude Code chains three tools to satisfy this. The diagram below shows the same flow end-to-end, with the real values from our test run on a Jira free-tier site (`flowhunt.atlassian.net`, project `KAN`).

{{< lazyimg src="claude-code-jira-mcp-flow-diagram.svg" alt="Diagram showing the three Atlassian MCP tool calls Claude Code chains for the sprint-summary prompt: getVisibleJiraProjects picks the KAN project, searchJiraIssuesUsingJql returns the resolved issues, createJiraIssue files KAN-4 Sprint summary 2026-05-14" >}}

### Step 1. List projects (`getVisibleJiraProjects`)

The first tool call enumerates every Jira project the signed-in user can access. Claude picks the most likely candidate based on activity, or asks if it cannot decide.

In our test run, two projects showed up: **KAN** (the team's actual project) and **SAM1** (Atlassian's built-in "Example Fitness and Health Goals" sample that ships with new sites). Claude correctly skipped the sample and picked **KAN** as the day-to-day project.

### Step 2. Search issues (`searchJiraIssuesUsingJql`)

Claude builds the JQL string and runs it through the search tool. The result is a structured list of issues with key, summary, status, assignee, and resolved date.

The JQL Claude ran:

```jql
project = KAN AND resolved >= -14d ORDER BY resolved DESC
```

In our test project the search returned a single issue:

```
KAN-3  ·  Subtask 2.1  ·  Unassigned  ·  resolved 2026-05-14
```

One issue is a thin demo, but it is honest output for a fresh project. On a busier team you would see dozens, grouped across multiple assignees; the prompt scales without changing.

### Step 3. Group + summarize in chat

Before writing anything back to Jira, Claude groups the search results by assignee in the terminal so you can sanity-check the data. With a single unassigned issue this collapses to one heading; with a real backlog it produces one heading per teammate, each containing their resolved issues.

### Step 4. Create the tracking issue (`createJiraIssue`)

Once you confirm the grouped view, Claude calls `createJiraIssue` with the field set you gave it (project, type, summary, description). The tool returns the new issue's key and the URL Atlassian assigned it.

In our run that came back as **KAN-4** at `https://flowhunt.atlassian.net/browse/KAN-4`, in **To Do**, of type **Task**, with the grouped digest pasted into the description. The diagram above shows the same handoff visually: each tool feeds its output into the prompt context that the next tool reads from.

The result is a real Jira issue you can transition, comment on, link to a retro, or share in standup, identical to anything else in your workflow. The only thing unusual about it is that you did not click `Create` once.

## Other Tools Worth Knowing

The Atlassian Remote MCP Server exposes a lot more than the three above. The full surface as of writing, grouped by capability:

- **Jira reads**: `getJiraIssue`, `getJiraIssueRemoteIssueLinks`, `getJiraIssueTypeMetaWithFields`, `getJiraProjectIssueTypesMetadata`, `getIssueLinkTypes`, `getTransitionsForJiraIssue`, `getVisibleJiraProjects`, `lookupJiraAccountId`
- **Jira writes**: `addCommentToJiraIssue`, `addWorklogToJiraIssue`, `createJiraIssue`, `editJiraIssue`, `transitionJiraIssue`
- **Jira search**: `searchJiraIssuesUsingJql`
- **Confluence (when provisioned on the site)**: `getConfluencePage`, `getConfluenceSpaces`, `createConfluencePage`, `updateConfluencePage`, `searchConfluenceUsingCql`, plus comment-level reads and writes
- **Atlassian-wide**: `searchAtlassian` (natural language across the site), `fetchAtlassian` (retrieve by Atlassian Resource Identifier)

Single-call tools like `getJiraIssue` are useful for narrow lookups; the search tool is how you build flexible workflows on top.

## Troubleshooting

**OAuth screen never appears.** The first Atlassian tool call has to be triggered inside an interactive `claude` session, not piped through. If the browser does not open, run `claude mcp list` to confirm `atlassian` is registered, then explicitly prompt it: `Use the atlassian MCP to list my Jira projects`.

**`/mcp` shows `atlassian` as failed.** Usually means the session was already running when you added the server. Exit (`Ctrl-D`) and run `claude` again. The registry is read at startup.

**Confluence tool returns 404 or "not reachable on this site".** Your Atlassian site does not have Confluence provisioned. The MCP only exposes tools backed by products that are actually installed on the site you chose during OAuth. If you need Confluence, provision it on the site in your Atlassian admin console; otherwise stick to Jira-only flows like the worked example above.

**"Permission denied" on a tool call.** The signed-in account does not have permission for the project. The MCP enforces the same scopes as the Jira UI; widening Claude Code's access means widening the user's access in Atlassian.

**Rate-limit errors.** Free-tier Atlassian Cloud caps at 500 calls/hour. A single agent prompt can easily fire ten tool calls when it loops. If you are hitting the cap, narrow your prompts (give a project key directly so Claude does not need to list projects) or upgrade your plan.

**The deprecated `/v1/sse` endpoint.** Atlassian's old SSE-transport URL still works at the time of writing but is sunsetting on 30 June 2026. New installs should use `https://mcp.atlassian.com/v1/mcp/authv2`, which is HTTP-transport with OAuth 2.1.

## Wrapping Up

The Atlassian Remote MCP Server collapses what used to be three tabs and a copy-paste loop into a single Claude Code prompt. The setup is one `mcp add` line and one OAuth approval; the payoff is every Jira action your account can already do, accessible to your agent without you opening a browser. If your site has Confluence too, the same connector lights up Confluence reads and writes from the same OAuth grant.

If you want to go further, build prompts that chain reads from one Jira tool into writes from another, like pulling all open bugs assigned to a teammate, summarising them, then transitioning a triage ticket through its workflow. Claude Code will pick the right tools from the twenty-plus the server exposes; you just describe the outcome.
