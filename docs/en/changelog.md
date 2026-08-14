---
title: Changelog
---

## 2026-08-14 · Beginner-friendly guide rewrite

- All 10 Chinese guides rewritten in a step-by-step, beginner-first style: concept primers, detailed walkthroughs, common mistakes and FAQs;
- Each chapter now has an intro, expected reading time, beginner tips, pitfalls and an FAQ section;
- Chapter 1 adds a concept primer (AI models / API Key / Agent / Workspace / Termux, etc.);
- Chapter 10 adds a learning path and a full glossary;
- Facts remain based on the official README (Lyra Code 3.6.0) and built-in tool contracts.

## 2026-08-14 · Language switcher (简体中文 / English)

- English version merged into the docs site: a "语言 / Language" navbar dropdown switches between Simplified Chinese and English from any page;
- fixed structural errors in the en locale block of the site config (missing themeConfig nesting, stray token) — local build verified.

## 2026-08-14 · v1.0.0 Documentation site launch

- VitePress-based official documentation site: home + 10 guides + tool reference + changelog;
- covers: setup, Agent tool system, file & code editing, command execution, remote integrations, mini server, Skills, memory & sub-agents, scheduled tasks, backup & migration, usage statistics, security practices, troubleshooting and advanced workflows;
- local search (Chinese tokenization + Chinese UI);
- official interface screenshots;
- GitHub Actions builds and deploys GitHub Pages automatically (push to main).

## Planned

- [ ] Generate tool reference from source
- [ ] Optional Algolia search
