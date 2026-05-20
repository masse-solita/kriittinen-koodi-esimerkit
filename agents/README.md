# Agentic Development with Security Built-In

This directory contains skills for a secure development agent powered by GitHub Copilot coding agent.

## Architecture

A **single agent** (defined in `.github/copilot-instructions.md`) orchestrates multiple **skills** in sequence:

```
Feature Request (issue)
        │
        ▼
┌─────────────────┐
│  Spec Writer    │ → Technical specification (issue comment)
│     (skill)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Threat Modeller │ → threat-model.md (repo root)
│     (skill)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Implementer    │ → Code changes (PR)
│     (skill)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Security Reviewer│ → Security assessment (PR comment)
│     (skill)     │
└─────────────────┘
```

## Skills

| Skill | File | Input | Output |
|-------|------|-------|--------|
| Spec Writer | [`skills/spec-writer.md`](skills/spec-writer.md) | Feature request (issue) | Technical spec (issue comment) |
| Threat Modeller | [`skills/threat-modeller.md`](skills/threat-modeller.md) | Technical spec | `threat-model.md` in repo root |
| Implementer | [`skills/implementer.md`](skills/implementer.md) | Spec + threat model | Code (pull request) |
| Security Reviewer | [`skills/security-reviewer.md`](skills/security-reviewer.md) | Code changes (PR) | Security assessment (PR comment) |
| Dependency Review | [`skills/dependency-review.md`](skills/dependency-review.md) | Project dependencies | Vulnerability summary |

## Usage

1. Create a GitHub issue with a feature request.
2. Assign **@copilot** to the issue.
3. The agent reads `.github/copilot-instructions.md` and executes all skills in sequence automatically.

## Demo Scenario

Adding a `POST /frequencies` endpoint for creating new radio frequency licence entries, with input validation and security controls built in from the start.
