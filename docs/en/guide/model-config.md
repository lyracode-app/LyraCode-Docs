---
title: Advanced Model Settings
---

# Chapter 9: Advanced Model Settings — extra model roles and advanced parameters

> For the basic chat-model configuration, follow [Quick Start](/en/guide/quick-start). This chapter guides you through configuring **extra-function models** and the **advanced configuration** of chat models.
>
> Reading time: about 8 minutes.

---

## 9.1 Extra-function models

### 9.1.1 Topic summary model

After you send the first message in a new conversation, the app uses that message as the conversation title. You can pick a model for summarizing titles in **Settings → Extra-function models → Topic summary model**.

### 9.1.2 Conversation history compression model

After many turns, a single conversation window accumulates more and more context, which causes:

- Growing token consumption
- Slower responses
- Errors when exceeding API limits

You can set a history-compression model in **Settings → Extra-function models → Conversation history compression model** to compress the context.

## 9.2 Advanced configuration

Advanced configuration needs to follow the **API documentation** of the provider you use. Different providers may differ in:

- Base URL
- Path
- Responses API support

::: tip Note
- Some providers don't support fetching the model list — in that case, fill in the model name manually.
- If you use a custom provider, confirm yourself whether its API is compatible with OpenAI Chat Completions, Anthropic Messages API, or Gemini GenerateContent API.
:::

---

*End of chapter · Next: Sub-Agent Orchestration — let multiple AI avatars work in parallel*
