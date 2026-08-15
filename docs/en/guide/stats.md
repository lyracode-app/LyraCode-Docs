---
title: Usage Stats & Device Diagnostics
---

# Chapter 21: Usage Stats & Device Diagnostics — see your spending and check your phone

> This chapter covers two "viewing" features: **① usage statistics (your AI spending); ② device diagnostics (a health check for your phone)**.
>
> Reading time: about 10 minutes.

---

## 21.1 What is "usage statistics"? — see where your money goes

Talking to AI is billed by "tokens" (think of a token as a rough "word unit"). Usage statistics help you **see exactly what each cent was spent on**:

- Dimensions: conversation count, message count, **your input tokens**, **AI output tokens**;
- Even the AI's thinking (chain-of-thought), tool calls, file reads, command output and repeated context count;
- **Offline estimation**: no network, no data sent to third parties, pure local calculation;
- Views by **day / week / month / year / total / custom range**.

Enter via the **stats page** in the sidebar, which shows your token, conversation and model usage in this app.

## 21.2 What is usage statistics good for?

- **Cost analysis**: compare which model/prompt costs more, optimize your choice;
- **Find the "eater"**: see how much of the token budget went to tool calls and file reads in Agent tasks — if a task burns a lot, it's usually context bloat (e.g. asking the AI to re-read huge files repeatedly); optimize your prompts.

::: tip For beginners
No need to check daily. Look at it when you have cost anxiety or want to compare models.
:::

::: tip How do I clear the statistics?
Uninstall and reinstall! Remember to back up your data first (see [Chapter 20](/en/guide/backup)).
:::

## 21.3 Device diagnostics: a health check for your phone

Lyra Code can read your phone's information for troubleshooting:

| Feature | What you see | When to use |
| --- | --- | --- |
| Phone info page | Brand, model, Android version, CPU, memory, storage, screen, network, Bluetooth, battery | Curious about your phone's specs |
| Hardware check Agent | AI analyzes your phone info, diagnoses issues, compares hardware | Phone acting up — ask "what's wrong with my device?" |
| App list | Installed apps (package name, version, signature) | Find a specific app's full package name |

::: warning Note
These are for **troubleshooting and reasonable inference**, not **absolute proof** of device authenticity. For deeper system-level diagnosis, pair with Shizuku's `dumpsys` / `pm` commands (see [Chapter 13](/en/guide/commands)).
:::

## 21.4 Logs

- The **logs page** shows the execution status of some commands;
- Normally there's no need to look at it — just clear it occasionally.

## 21.5 Beginner FAQ

**Q: Are the usage numbers accurate?**
A: They're local estimates; there may be small differences from the provider's bill, but they're good enough for comparison and trend monitoring.

**Q: Will diagnostics leak my privacy?**
A: These are only read when you ask the AI to analyze; they stay local and are never uploaded automatically.

---

*End of chapter · Next: Security Practices — use it safely*
