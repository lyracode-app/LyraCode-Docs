---
title: Introduction & Concepts
---

# Chapter 1: Introduction & Concepts — what is Lyra Code?

> This chapter is for **complete beginners who are new to Lyra Code**. If you've never heard of "APK", "API key" or "terminal" before, that's totally fine — we'll start from zero and explain every term, one by one.
>
> Reading time: about 10 minutes.

---

## 1.1 Core concepts: spend 5 minutes to understand a few words

These words appear again and again throughout this documentation. Spend a few minutes getting familiar, and nothing will confuse you later.

### 1.1.1 What is an "AI model"?

An AI model (also called a large language model, or LLM) is like a **"super brain" living on a remote server**.

- It doesn't live on your phone — it runs on someone else's servers;
- Your phone sends it a question, and it sends back an answer;
- Common models include OpenAI's GPT series, Anthropic's Claude series, Google's Gemini series, and Chinese ones like DeepSeek or Moonshot (Kimi).

**Key point**: Lyra Code itself **does not include a model**. You need to choose a model provider and connect your phone to its servers before you can chat. How to connect is covered in [Chapter 8 "Models & Providers"](/en/guide/models).

### 1.1.2 What is an "API key"?

An API key is a **"pass card" issued by your model provider**, and it looks something like this:

```
sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

- It proves that "this phone is being used by me (a paying customer)";
- You sign up on the provider's website, top up some credit, and generate your own API key there;
- **An API key is money and identity. Never post it online or share it in chat groups.** If it leaks, other people can spend your credit.

### 1.1.3 What is an "Agent"?

An Agent means the AI **doesn't just answer you — it takes action for you**.

A normal chat app: you ask → it answers.

An Agent (Lyra Code): you say "unzip the downloaded archive and sort the images inside into my gallery folder" → it plans the steps by itself, reads the files, performs the operations — and asks for your permission before every step.

### 1.1.4 What are "commands / terminal / shell"?

- **Command**: a line of text instructions, like `ls` (list files) or `git push` (upload code);
- **Terminal**: the window where you type commands;
- **Shell**: the program that translates and executes commands;
- **Termux**: a terminal app for Android — basically a command-line window on your phone.

In Lyra Code, the AI can use Termux to run commands for you (install software, run scripts, manage files). Configuration is covered in [Chapter 2 "Installation & Setup"](/en/guide/install).

### 1.1.5 What is a "workspace"?

The workspace is **a dedicated folder**. Lyra Code's AI is only allowed to read and write files inside this folder by default, so it can't mess with the rest of your phone.

- Default workspace: `/storage/emulated/0/Lyra` (a `Lyra` folder at the root of your phone storage);
- Put your project folders, writing drafts and so on here.

### 1.1.6 Termux, Shizuku and Root — what's the difference?

| Name | What it is | Privilege level | When you need it |
| --- | --- | --- | --- |
| Termux | A terminal app on your phone | Normal app | Running commands, scripts, installing software (**almost everyone needs this**) |
| Shizuku | A service that borrows system debug privileges | Higher (ADB level) | Advanced stuff like querying system info, batch-managing apps |
| Root | Full "jailbroken" super-user access to your phone | Highest | Very rare cases like modifying system files |

::: tip For beginners
You only need to set up **Termux** first. Ignore Shizuku and Root until you actually need them — you can come back and learn when the time comes (see [Chapter 13 "Running Commands"](/en/guide/commands)).
:::

---

## 1.2 So what exactly IS Lyra Code?

In one sentence:

> **Lyra Code is an Android app that combines a local AI assistant, a file manager, a code editor and a universal toolbox.**

Three things make it special:

### 1.2.1 Local-first (your data stays in your hands)

- Your model keys, conversations, files and account passwords **are all stored on your phone**;
- Unlike some apps, it does not upload your chats to its own servers for "relay";
- Your privacy stays between you and your model provider.

### 1.2.2 Agentic (AI can do things, but only after you approve)

- AI can read your files, edit your code, run commands and connect to remote servers;
- But **every risky action pops up a confirmation dialog waiting for your approval**;
- If you don't approve, it can't change anything. That's "controlled".

### 1.2.3 Extensible (build it like LEGO)

- **Skills**: install "skill packs" so the AI learns specific abilities ([Chapter 18](/en/guide/skills));
- **MCP**: a standard way to connect external tools and data sources ([Chapter 15](/en/guide/mcp));
- **Scheduled tasks**: let the AI do something for you automatically every day ([Chapter 17](/en/guide/scheduled-tasks)).

---

## 1.3 Is Lyra Code right for me?

### ✅ Good for you if…

- You want to write code, edit files and run scripts on your phone;
- You handle email, cloud drives or FTP servers a lot, and want AI to do the legwork;
- You're a writer or creator who wants AI help with writing, organizing and progress tracking;
- You want to experience "AI working autonomously but fully under your control".

### ❌ Not great if…

- You just want a chatbot for casual chat (a normal AI chat app is simpler);
- Your phone runs Android 8.0 or older (it won't run);
- You don't want to learn anything new and even approving permission pop-ups annoys you.

---

## 1.4 What can it do? (capability overview)

| Capability | Plain explanation | Example | Details |
| --- | --- | --- | --- |
| Model access | Connect multiple AI providers | Chat with Kimi, write code with Claude, switch anytime | Chapter 8 |
| Interface & chat | Four main screens, conversation operations and management | Create branches, archive conversations, chat with images | Chapters 3–7 |
| Agent tools | AI reads/writes files, runs commands, searches the web | "Find all the TODOs in this project" | Chapter 11 |
| Files & code | File manager + code editor | Unzip archives, edit code, preview web pages | Chapters 12–13 |
| Remote integration | SSH / email / cloud drive / FTP / MCP | "Download the logs from my server" | Chapters 14–15 |
| Mini server | Run a web server on your phone | Preview the website you're building | Chapter 16 |
| Scheduled tasks | AI works on a schedule | Generate a writing progress summary every day at 22:00 | Chapter 17 |
| Skills / memory | Install skills, let AI remember your habits | Install a "novel writing" skill pack | Chapters 18–19 |
| Backup | One-tap backup/restore | Export a full backup before switching phones | Chapter 20 |
| Stats & diagnostics | See token spending, check phone health | Compare which model costs less | Chapter 21 |

---

## 1.5 FAQ

**Q: Is Lyra Code free?**
A: The app itself is free and open source. You pay the **model provider** (usage-based billing, usually very cheap).

**Q: Do I really need an API key?**
A: Yes. Models run on provider servers and need a key to be called. Free tiers are tiny or nonexistent — top up a small amount (a few dollars lasts a long time).

**Q: Can I skip Termux?**
A: You can, but the AI loses command execution and many advanced features won't work. It's recommended — configuration is in [Chapter 2, 2.6](/en/guide/install#_2-6-setting-up-termux-so-ai-can-run-commands).

**Q: How do I move to a new phone?**
A: Use Backup: export on the old phone → import on the new one (see [Chapter 20 "Backup & Migration"](/en/guide/backup)).

**Q: My phone is laggy — is it Lyra Code's fault?**
A: AI runs in the cloud; your phone doesn't run big models locally, so it shouldn't lag. Slowness is usually network or background tasks.

---

## 1.6 What to learn next

- [Chapter 2: Installation & Setup](/en/guide/install) — install the app on your phone and enable the Termux command channel (must read)
- [Quick Start](/en/guide/quick-start) — configure your first model provider and send your first greeting
- [Chapter 3: Interface Overview](/en/guide/interface) — get to know the app's four main areas

---

*End of chapter · Next: Installation & Setup — install the app and enable the command channel*
