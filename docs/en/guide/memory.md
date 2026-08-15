---
title: Memory & Instructions
---

# Chapter 19: Memory & Instructions — let the AI remember you and follow your rules

> Normal AI chat "forgets" every session: close the conversation and it no longer remembers who you are or what you like.
>
> **Memory** gives the AI a **long-term notebook**, which together with AGENTS.md project instructions keeps your preferences and rules across sessions.
>
> Reading time: about 10 minutes.

---

## 19.1 What is "memory"? — the AI's long-term notebook

- You tell it "write docs in Chinese", "create a TODO before starting tasks", "update the README changelog before pushing a plugin";
- It writes down these **explicit, durable** preferences;
- **In every future conversation**, it automatically looks up relevant entries and acts according to your habits.

::: tip How to make the AI remember something?
Just say: "Remember: from now on, write all code comments in Chinese." The AI saves it to memory.
:::

## 19.2 Memory usage essentials

- **What to store**: explicit preferences, working styles, communication habits (e.g. "reply in Simplified Chinese");
- **What NOT to store**: passwords/keys, temporary task states, one-off context (they leak or go stale);
- **On-demand injection**: the AI only uses memory relevant to the current task — it won't recite the whole notebook;
- **Always editable**: you can say "change the memory entry 'reply in Chinese' to 'reply in English'" or "delete that memory";
- **Management entry**: view and manage the AI's saved memory in **Settings → Memory**;
- **Privacy**: memory stays on your device and travels with backups (see [Chapter 20](/en/guide/backup)).

## 19.3 Who's in charge? — priority of instructions

```text
Your direct request > current conversation > project instruction files (AGENTS.md) > memory > examples
```

- Project instructions apply per directory tree: **deeper directories override shallower ones** (how to write AGENTS.md: [Chapter 12, 12.6](/en/guide/files#_12-6-project-instruction-files-agents-md-set-rules-for-the-ai));
- No instruction (including AGENTS.md and memory) **may demand**: leaking secrets, bypassing approvals, or unrelated external operations.

---

*End of chapter · Next: Backup & Migration — keep your data safe*
