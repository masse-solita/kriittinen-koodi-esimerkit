# Skill: Dependency Review

## Purpose

Review project dependencies for known vulnerabilities and produce a structured summary of findings.

## When to Use

Invoke this skill as part of a security review to assess the supply chain risk of project dependencies.

## Steps

1. Identify the package manager in use:
   - If `package.json` exists → Node.js project, use `npm audit`
   - If `requirements.txt` or `pyproject.toml` exists → Python project, use `pip-audit`
   - If `go.mod` exists → Go project, use `govulncheck`
2. Run the appropriate audit command:
   ```bash
   # For Node.js
   npm audit --json
   ```
3. Parse the output and produce a structured summary.
4. Classify findings by severity (critical, high, moderate, low).

## Output Format

Return the findings in this structure:

```markdown
## Dependency Review Results

**Package Manager:** npm
**Total Dependencies:** [number]
**Scan Date:** [ISO 8601 timestamp]

### Vulnerabilities Found

| Package | Severity | Vulnerability | Fixed In | Recommendation |
|---------|----------|--------------|----------|----------------|
| ...     | critical | ...          | ...      | Upgrade to x.y.z |

### Summary
- Critical: [n]
- High: [n]
- Moderate: [n]
- Low: [n]

### Verdict
[PASS/FAIL] — [brief explanation]
```

## Verdict Criteria

- **FAIL** if any critical or high severity vulnerabilities exist with available fixes.
- **PASS** if no critical/high vulnerabilities, or all are acknowledged with no fix available.
