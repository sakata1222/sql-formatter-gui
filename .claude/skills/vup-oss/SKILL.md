---
name: vup-oss
description: Bumps every OSS dependency in this project (both dependencies and devDependencies) to its latest version with pnpm, then runs the unit and Playwright e2e suites to check nothing broke. If sql-formatter or another core package changed behavior in a way e2e/app.spec.ts doesn't catch, adds a new test case for it. Use this whenever the user says "vup", "version up", "bump OSS", "update dependencies/packages", or asks to bring this project's dependencies up to date.
---

# VUP OSS

"VUP" here means bumping every package in `package.json` (dependencies + devDependencies) to its true latest version, matching this project's past sweeps (e.g. `6fe3490 chore: vup and specify pnpm version`, the string of `sql-formatter` bumps across `15.6.x` → `15.8.x`). Unlike Dependabot's one-package-at-a-time patch PRs, this is a manual, all-at-once sweep including major versions.

The reason this needs more than `pnpm update` is `sql-formatter`: it's the actual product this app wraps, so a version bump can silently change formatting output. The safety net is the Playwright suite in `e2e/app.spec.ts`, which drives the real UI in a browser — so it's the thing that would notice a changed keyword casing, indentation rule, or new dialect quirk. Other packages (react, bulma, vite, eslint, typescript, playwright itself...) matter too, but mostly for "does it still build and run," which the unit tests and e2e suite's first test ("loads cleanly with no console or page errors") already cover.

## Steps

1. **See what's outdated.** Run `pnpm outdated` to list every package's current vs. latest version. Note which ones are jumping a major version — those are the likeliest to change behavior, and worth extra attention in step 5.

2. **Bump everything.** Run `pnpm update --latest`, which updates every package in `dependencies` and `devDependencies` to its actual latest release (not just within the existing `^`-range) and rewrites `package.json` + `pnpm-lock.yaml`. Follow with `pnpm install` to make sure the lockfile is settled.

3. **Run the fast checks first.** `pnpm lint` and `pnpm test` (vitest unit tests) catch build/type/lint breakage from tooling bumps quickly, before spending time on the slower browser-driven e2e suite.

4. **Run the e2e suite.** `pnpm test:e2e`. `playwright.config.ts` already builds and serves the app itself (`webServer.command: "pnpm build && pnpm serve"`), so this is self-contained — no need to start a dev server manually first.

5. **Decide whether the suite actually covered the bump:**
   - **If a test fails**, look at the diff first. If it's a formatting-related package (`sql-formatter` above all) producing different output than the hardcoded `FORMATTED_SQL` / `MINIFIED_SQL` constants in `e2e/app.spec.ts`, that's expected drift — update the constants to the new correct output. But treat the failure as a signal, not just a fix: it means formatting behavior changed in a way the existing fixture happened to expose. Add a **second, targeted test case** built around whatever specifically changed (e.g. a JOIN, a CTE, a particular keyword, a comment style) so a future bump would still catch a regression in that area even on inputs that don't touch the original `RAW_SQL` fixture.
   - **If everything passes**, don't assume that means full coverage. Cross-check the major-version-jump list from step 1 against what `e2e/app.spec.ts` actually exercises — right now that's one basic `SELECT` statement. If a package central to the app's behavior (`sql-formatter` especially) jumped a major version, consider whether it plausibly touches SQL constructs nothing here tests (subqueries, CTEs, multiple statements, comments, a specific SQL dialect). If there's concrete reason to suspect a gap — a changelog entry, release notes, or just "this is the core dependency and jumped a major version" — add a test for it even though nothing failed.
   - Don't add a test case for every dependency bump reflexively — only when there's a real reason to think a code path changed. The point is keeping `e2e/app.spec.ts` a meaningful regression suite, not padding it.

6. **Leave everything staged, don't commit.** The end state should be modified `package.json` / `pnpm-lock.yaml`, and (if applicable) an updated or added test in `e2e/app.spec.ts` — ready for review, not committed or pushed. Summarize for the user: what got bumped (call out major-version jumps specifically), what passed/failed, and what test changes were made and why.

## Style notes for new e2e cases

Match the existing conventions in `e2e/app.spec.ts`: plain `test('description', async ({ page }) => {...})` blocks, named `UPPER_SNAKE_CASE` constants at the top for SQL fixtures that get reused within a test, and asserting against `page.getByPlaceholder('Please input SQL')` / `.formatted-area textarea` / `.minified-area textarea` the same way the current tests do.
