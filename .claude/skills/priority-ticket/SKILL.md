---
name: priority-ticket
description: >
  Fetches the highest-priority Jira ticket assigned to the current user in
  "Por hacer", summarizes acceptance criteria, enters plan mode with an
  implementation proposal, and on plan approval moves the ticket to "En curso".
  Use when the user runs /priority-ticket or asks to pick up their top To Do ticket.
disable-model-invocation: true
---

# /priority-ticket

## Goal

Pick up the single highest-priority ticket assigned to the current user that is
still in **Por hacer**, summarize it, propose an implementation plan in
**plan mode**, and only after the user approves the plan move it to **En curso**.

## Project defaults (this repo)

- Jira Cloud site: `https://fjimenez3703.atlassian.net`
- Project key: `LA` (LIDR - Academy)
- Use the **atlassian** MCP tools already configured in this project.

If the MCP is unavailable, stop and tell the user to run `/mcp` and authenticate.

## Steps

### 1. Identify the current user

Resolve the authenticated Atlassian account (display name / accountId) via MCP
(`atlassianUserInfo` or equivalent). You need it for the assignee filter.

### 2. Find the priority ticket

Search with JQL (adapt field names if the site uses different status names):

```
assignee = currentUser()
AND project = LA
AND status = "Por hacer"
ORDER BY priority DESC, updated DESC
```

Take **only the first** issue. If there are none, stop and say so — do not invent
a ticket and do not pull from other statuses.

### 3. Load full details

Fetch the issue (description, acceptance criteria, comments if useful). Prefer
the real issue body over summaries from memory.

### 4. Summarize for the user

Before planning, show a short briefing:

- Key and summary
- Priority
- Acceptance criteria (bullet list; quote from the ticket)
- Gaps / ambiguities you notice (e.g. API fields the ticket does not mention)

### 5. Enter plan mode — do not implement yet

Switch to **plan mode** (or ask the user to enable it if you cannot). Propose a
concrete implementation plan:

- Files / areas likely to change
- Steps in order
- How you will verify each acceptance criterion
- Open questions that block a good plan

**Do not write or edit product code in this skill run.** The plan is the
deliverable until the user approves.

### 6. On plan approval only — move to «En curso»

When the user explicitly approves the plan:

1. Transition the issue to **En curso** (look up available transitions first;
   do not guess transition IDs).
2. Confirm the new status in the chat.
3. Stop. Implementation happens in a later turn / after the user asks to apply
   the plan — not inside this skill unless they clearly ask in the same message.

If the user rejects or revises the plan, stay in plan mode, update the plan, and
**do not** transition the ticket.

## Hard rules

- Same ticket, same assignee, status **Por hacer** only.
- Never transition before plan approval.
- Never edit application code while executing this skill.
- Prefer reading backend validators/routes over inventing API contracts.
