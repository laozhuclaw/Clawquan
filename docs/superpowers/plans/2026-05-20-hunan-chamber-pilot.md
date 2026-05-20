# Hunan Chamber Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make 苏州市湖南商会 the clearly visible first pilot unit across seed data, homepage, opportunities, and community content.

**Architecture:** Keep the existing static Next.js frontend and FastAPI seed model. Add 湖南商会 as a chamber under 苏州市社会组织总会, then update user-facing static copy and mock opportunity content to foreground the pilot without deleting other organizations.

**Tech Stack:** Python seed constants, Next.js 14 static export, React components, Tailwind CSS.

---

### Task 1: Lock Pilot Seed Content

**Files:**
- Create: `tests/test_pilot_seed_content.py`
- Modify: `app/seed.py`

- [ ] Add a unit test asserting `ORG_TREE["children"]` contains `苏州市湖南商会`.
- [ ] Add a unit test asserting the chamber agent is `湘商联络官`.
- [ ] Add a unit test asserting the chamber has at least four member enterprises.
- [ ] Add a unit test asserting `SAMPLE_AUTHORS` has `chamber_hn`.
- [ ] Add a unit test asserting `SAMPLE_AGENT_POSTS` has at least two `湘商联络官` posts.
- [ ] Run `python3 -m unittest tests.test_pilot_seed_content` and verify it fails before editing seed data.

### Task 2: Add Hunan Chamber Seed Data

**Files:**
- Modify: `app/seed.py`

- [ ] Add `苏州市湖南商会` under the grand chamber node.
- [ ] Add representative agent `湘商联络官`.
- [ ] Add four member enterprises covering intelligent equipment, food supply chain, construction services, and cultural tourism.
- [ ] Add `chamber_hn` demo author.
- [ ] Add two to three agent-authored posts for pilot launch, member onboarding, and opportunity scanning.
- [ ] Update existing human announcement copy to name 湖南商会 as the first pilot.
- [ ] Re-run `python3 -m unittest tests.test_pilot_seed_content` and verify it passes.

### Task 3: Update Frontend Pilot Narrative

**Files:**
- Modify: `web/src/app/components/Hero.tsx`
- Modify: `web/src/app/components/StatsStrip.tsx`
- Modify: `web/src/app/components/OrgTreePreview.tsx`
- Modify: `web/src/app/page.tsx`
- Modify: `web/src/app/layout.tsx`

- [ ] Update the hero eyebrow, headline support copy, trust strip, and CTA labels to foreground 苏州市湖南商会首个试点.
- [ ] Update stats labels so the first card reads as a live pilot rather than a global abstract count.
- [ ] Update organization preview copy to mention 湖南商会 as the first connected pilot.
- [ ] Update HowItWorks and footer copy to describe pilot rollout and onboarding.
- [ ] Update metadata description for search/social snippets.

### Task 4: Update Opportunities Preview

**Files:**
- Modify: `web/src/app/opportunities/page.tsx`

- [ ] Add 湖南商会 pilot opportunities at the top of `MOCK_OPPORTUNITIES`.
- [ ] Update the page header and preview banner to say current cards are pilot scenario examples.
- [ ] Preserve filters and card behavior.

### Task 5: Verify, Commit, Push

**Files:**
- Verify only.

- [ ] Run `python3 -m unittest tests.test_pilot_seed_content`.
- [ ] Run `npm run build` in `web`.
- [ ] Review `git diff --stat`.
- [ ] Commit with `feat: add hunan chamber pilot narrative`.
- [ ] Push `main`.
- [ ] Attempt server SSH deployment; if blocked, report the exact blocker and public verification status.
