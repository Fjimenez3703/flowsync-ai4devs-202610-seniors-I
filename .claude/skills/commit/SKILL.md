---
name: commit
description: >
  Creates a conventional commit (tipo(scope): descripción) from currently
  staged changes. Use when the user runs /commit or asks to commit prepared changes.
disable-model-invocation: true
---

# /commit

## Goal

Create **one** conventional commit from what is already staged. Do not invent
unrelated changes. Do not push unless the user explicitly asks.

## Steps

### 1. Inspect staged work only

Run:

```bash
git status
git diff --cached
git log -5 --oneline
```

If nothing is staged, stop and tell the user to `git add` first. Do not stage
files yourself unless they clearly ask you to include specific paths.

### 2. Draft the message

Format (Conventional Commits):

```
tipo(scope): descripción breve en imperativo
```

- `tipo`: `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `chore` | `ci` | `build` | `perf`
- `scope`: optional area (`frontend`, `backend`, `harness`, `auth`, …)
- `descripción`: short, lowercase after the colon when possible, no trailing period
- Match the repo’s recent commit style when it is obvious from `git log`

If the diff is mixed (e.g. harness + feature), prefer the dominant intent, or
ask once whether to split into two commits.

### 3. Commit

Use a HEREDOC-style message (or equivalent on Windows) so formatting stays clean.
Never pass `--no-verify` unless the user requests it.
Never amend unless the user explicitly asks and the amend rules of the project allow it.

### 4. Confirm

Show `git status` after the commit and the final subject line.
