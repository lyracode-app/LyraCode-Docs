---
title: Interface & Models
---

# Chapter 2: Tour the interface and set up your first AI model

> This chapter teaches you to read Lyra Code's interface and, most importantly, **connect an AI provider** — the key step. Once that's done, you can really start talking to AI.
>
> Reading time: about 15 minutes.

---

## 3. Interface overview: what's in the app?

When you open Lyra Code, there are **four main areas**, switchable via the bottom navigation bar.

### 3.1 AI chat (your main battlefield)

This is where you'll spend 90% of your time — the window for talking to the AI.

**What you'll see:**

- **The conversation area on top**: your messages and the AI's replies;
- **The input box at the bottom**: type here, press Enter to send;
- **The action panel at the very bottom**: quick buttons to switch **provider / model / system prompt** (see section 4).

**A good first sentence:**

> Hello! Introduce yourself and tell me what you can help me with.

The AI will reply with a self-introduction. Congratulations — you've just gone end-to-end.

### 3.2 Dual-pane file manager (your file warehouse)

Open the file manager and you'll see **two windows side by side** (that's why it's called "dual-pane"), both defaulting to the phone's storage root `/storage/emulated/0`.

- **Independent navigation**: pick a folder in the left pane, another in the right, for easy comparison;
- **Cross-directory operations**: **copy/move** files from left to right, rename, delete, unzip;
- **Web preview**: **long-press** a `.html` / `.htm` file to preview it in a browser (handy for testing your own pages).

::: tip For beginners
File manager operations are real — **deleting is irreversible** (unless there's a `.bak` backup). **Double-check the path before operating**, and when unsure, ask the AI first.
:::

### 3.3 Code editor (Sora Editor)

Open a text/code file and you're in the editor:

- **Line numbers** on the left, handy for locating;
- **Syntax highlighting**: code is auto-colored (keywords one color, strings another) so it's easier to read;
- **In-file search**: find keywords in the current file;
- **Go to line**: jump straight to a line number;
- **Word wrap**: long lines don't overflow the screen;
- **Auto backup**: **before modifying a file, it automatically creates a `.bak` backup in the same directory** (e.g. `main.kt` → `main.kt.bak`). If an edit goes wrong, you can restore from the backup — your safety net. Don't delete it.

> If a file isn't UTF-8 encoded, the editor warns you — that's a normal notice.

### 3.4 Agent tools page (AI's toolbox)

This lists all the tools the AI **can use** (read files, run commands, send email…) and an on/off switch for each.

- Beginners: **keep everything on by default**;
- Later, turn off tools you don't trust (e.g., if you never want AI touching Root, disable the Root tool).

Interface preview (screenshots from the official README):

| AI Chat | Settings | Agent Tools |
| --- | --- | --- |
| ![AI Chat](/img/chat.png) | ![Settings](/img/set.png) | ![Agent Tools](/img/agent.png) |

### 3.5 The AI sidebar inside the editor (edit code while chatting with AI)

In the code editor, **swipe from right to left** to open a dedicated AI sidebar. How it differs from the main chat:

- The AI **automatically knows the file you have open** and answers/edits that file directly — no need to describe the path;
- You can add project folders so the AI understands the whole project;
- The AI's edits are **replayed visually** in the document — you can see exactly what changed (green = added, red = removed).

**This is the smoothest "look at code while AI edits" workflow** — more precise than describing paths in the global chat.

### 3.6 Quick start in three steps (full version)

1. **Connect a model**: add an AI provider in Settings (how to fill it in — section 4 below);
2. **Create a workspace**: via the file manager (or ask the AI) create your project folder under `/storage/emulated/0/Lyra`;
3. **Start chatting**: try "list the workspace contents", "create a TODO", "edit this file" — and watch how it pops up a confirmation before every step. That's the Agent way.

---

## 4. Models & multiple providers (the most important section)

### 4.0 First, three words

- **Provider**: the company/platform that offers AI models — OpenAI, DeepSeek, Moonshot (Kimi), Google…
- **Model**: a specific "brain version" from a provider, e.g. `gpt-4o`, `deepseek-chat`, `kimi-k2`;
- **Base URL**: the provider's server address (a web link). **With official providers you usually don't need to fill this in** (the app has built-in defaults); you only need it for third-party gateways or self-hosted servers.

### 4.1 Which provider types does Lyra Code support?

| Protocol | What it means | Common providers |
| --- | --- | --- |
| OpenAI-compatible API | The industry standard; most providers support it | OpenAI, DeepSeek, Moonshot, local Ollama/vLLM… |
| Anthropic Messages API | Claude-specific interface | Anthropic (Claude series) |
| Gemini GenerateContent API | Google-specific interface | Google (Gemini series) |

**Beginner advice**: start with an "OpenAI-compatible" provider (like DeepSeek or Moonshot) — cheap, stable and network-friendly.

### 4.2 Adding a provider, step by step

1. Open **Settings** → find **"Model providers"**;
2. Tap **"Add / New"**;
3. Fill in the fields (see 4.3);
4. Save, then back in the chat, **select the new provider and model in the bottom action panel**;
5. Send "Hello" to test.

**If you get a reply, the setup is complete.** Errors? See 4.5.

### 4.3 What does each field mean?

| Field | What to enter | Example | Beginner tip |
| --- | --- | --- | --- |
| Provider name | Any label you can recognize | `MyDeepSeek` | Helps distinguish multiple providers |
| API key | The key from the provider console | `sk-xxxx...` | **Stored locally; never leak it** |
| Base URL | Provider server address | `https://api.deepseek.com` | Leave empty for official providers |
| Default model | The model name you want | `deepseek-chat` | Use the exact name from the provider docs |
| Custom system prompt | Set AI's persona/rules | "You are a rigorous Chinese editor" | Save multiple presets, switch anytime |
| Reasoning depth | Thinking intensity for reasoning models (o/R series) | Low/Medium/High | Not needed for non-reasoning models |

### 4.4 Switching tips

- The **action panel** at the bottom of the chat switches **provider / model / prompt** with one tap;
- **Compare**: ask the same question on model A, switch to model B, ask again — compare answers;
- **Per scenario**: one prompt for coding ("You are a senior Kotlin engineer"), another for writing ("You are a novelist") — switching prompts changes the AI's behavior;
- **Self-hosted**: if you run Ollama / vLLM / LM Studio on your own PC, they speak the OpenAI-compatible protocol — put your LAN address in Base URL (e.g. `http://192.168.1.5:11434/v1`) — free, and data never leaves your network.

### 4.5 Beginner FAQ

**Q: It keeps erroring / spinning after adding?**
A: Check in order: ① Is the API key complete (no stray spaces)? ② Is the provider/model name correct? ③ Can your network reach the provider? ④ Is Base URL right (leave empty for official providers)?

**Q: 401 / authentication failed?**
A: The API key is invalid or expired. Generate a new one in the provider console and replace it.

**Q: "Insufficient balance"?**
A: Your account is out of credit. Top up at the provider's website (a few dollars lasts a long time).

**Q: Which provider is cheapest?**
A: Prices change often; compare OpenAI-compatible providers, or use the usage statistics in Chapter 8 to measure.

**Q: Can I add multiple providers at once?**
A: Yes, unlimited. Switching is just one tap in the action panel.

---

*End of chapter · Next: Agent Tools — the "hands" the AI can use*
