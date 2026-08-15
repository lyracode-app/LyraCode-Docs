---
title: Sub-Agent Orchestration
---

# Chapter 10: Sub-Agent Orchestration — let multiple AI avatars work in parallel

> Sub-agents let you set up several additional models that assist the main model as **sub-agents**.
>
> Reading time: about 10 minutes.

---

## 10.1 What are sub-agents?

When a task contains **at least two independent** sub-tasks, the AI can dispatch "clones" (sub-agents) to work in parallel, e.g.:

- Research two technical approaches at the same time;
- Review two pieces of code at the same time;
- Design two candidate solutions and compare them.

**Principles:**

- Simple answers, reading known files, single edits, and **dependent sequential steps** are NOT suitable for sub-agents;
- Sub-agent results **need review** — never treat them as final conclusions directly;
- Sub-agents have limited powers: no commands, no shared-storage changes, no out-of-scope writes.

> Beginners don't need to manage this — when a task truly suits parallel work, the AI decides whether to spawn clones on its own.

## 10.2 Configuring sub-agents

Configure sub-agents in the **Settings page**. For each sub-agent you can choose:

- The model it uses
- Its provider
- A system prompt (defining the sub-agent's role and responsibilities)

## 10.3 Using them in chat

Once configured, open the **bottom action panel** on the chat page to enable or disable sub-agents.

## 10.4 How they work

- When you give a complex copy task, the main model can **distribute sub-tasks to sub-agents**.
- Multiple sub-agents can process different sub-tasks in parallel, and the main model then aggregates the results, helping finish the overall task faster.

::: tip Note
Giving different sub-agents different roles and models lets each do its own job — e.g. one sub-agent handles code review while another handles documentation.
:::

---

*End of chapter · Next: Agent Tools — the "hands" the AI can use*
