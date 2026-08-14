---
title: Interface & Models
---

## 3. Interface Overview

### 3.1 Four main areas

1. **AI chat**: the main workspace for interacting with the Agent; the action panel at the bottom switches providers, models and prompts quickly.
2. **Dual-pane file manager**: defaults to `/storage/emulated/0`, with two independently navigable panes for copying and moving files between directories; long-press `.html`/`.htm` files to preview them in a browser.
3. **Code editor (Sora Editor)**: line numbers, TextMate syntax highlighting, in-file search, go-to-line, word wrap; UTF-8 decoding warnings; automatic same-directory `.bak` backups before overwrites.
4. **Agent tools**: view and manage the currently available tool set and configuration.

Interface preview (screenshots from the official README):

| AI Chat | Settings | Agent Tools |
| --- | --- | --- |
| ![AI Chat](/img/chat.png) | ![Settings](/img/set.png) | ![Agent Tools](/img/agent.png) |

### 3.2 Editor AI sidebar

Swipe **right** in the editor to open the dedicated AI sidebar:

- the current file path is passed to AI silently, so it can answer or edit that file directly;
- add project working directories to give AI project context;
- approvals and tool output stay visible inside the editor;
- AI edits are replayed visually in the open document for easy review.

### 3.3 Quick start in three steps

1. Add a model provider in Settings (OpenAI-compatible / Anthropic / Gemini);
2. Create a workspace (e.g. `/storage/emulated/0/Lyra`) via the file manager or AI;
3. Ask AI to "list the workspace", "create a TODO", or "edit a file" and watch the approval flow.

## 4. Models & Multiple Providers

### 4.1 Supported protocols

| Protocol | Notes |
| --- | --- |
| OpenAI Chat Completions-compatible | Most compatible gateways (OpenAI, DeepSeek, Moonshot, local Ollama/vLLM, ...) |
| Anthropic Messages API | Claude series |
| Gemini GenerateContent API | Google Gemini series |

### 4.2 Configuration fields

- **Provider name**: custom label for identification;
- **API key**: stored locally; not exported in backups by default (unless you choose a full migration backup);
- **Base URL**: self-hosted gateway or proxy; HTTP is supported with a plaintext warning;
- **Default model**: common model names;
- **Custom system prompts**: multiple presets;
- **Reasoning depth**: reasoning-effort preset for reasoning models (o-series / R-series).

### 4.3 Switching tips

The action panel at the bottom of the chat supports **one-tap switching of provider / model / prompt**:

- when comparing model outputs on one task, switch models and keep the conversation;
- keep separate system prompts for coding / writing / translation / diagnostics, and switch prompts to change the Agent's behavior baseline;
- for self-hosted deployments (Ollama / vLLM / LM Studio), use the OpenAI-compatible protocol and put the LAN or local address in Base URL.

---