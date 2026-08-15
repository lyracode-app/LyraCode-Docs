---
title: Models & Providers
---

# Chapter 8: Models & Providers — connect an AI provider

> This chapter completes the **most critical step: connecting an AI provider**. Once configured, you can really start talking to the AI.
>
> Reading time: about 15 minutes.

---

## 8.1 First, three words

- **Provider**: the company/platform that offers AI models — OpenAI, DeepSeek, Moonshot (Kimi), Google…
- **Model**: a specific "brain version" from a provider, e.g. `gpt-4o`, `deepseek-chat`, `kimi-k2`;
- **Base URL**: the provider's server address (a web link). **With official providers you usually don't need to fill this in** (the app has built-in defaults); you only need it for third-party gateways or self-hosted servers.

## 8.2 Which provider types does Lyra Code support?

| Protocol | What it means | Common providers |
| --- | --- | --- |
| OpenAI-compatible API | The industry standard; most providers support it | OpenAI, DeepSeek, Moonshot, local Ollama/vLLM… |
| Anthropic Messages API | Claude-specific interface | Anthropic (Claude series) |
| Gemini GenerateContent API | Google-specific interface | Google (Gemini series) |

**Beginner advice**: start with an "OpenAI-compatible" domestic provider (like DeepSeek or Moonshot) — cheap, stable and network-friendly.

## 8.3 Adding a provider, step by step

1. Open **Settings** → find **"Model providers"** (or a similar entry);
2. Tap **"Add / New"**;
3. Fill in the fields (see 8.4);
4. Save, then back in the chat, **select the new provider and model in the bottom action panel**;
5. Send "Hello" to test.

**If you get a reply, the setup is complete.** Errors? See 8.6 below.

::: tip Preset providers and custom providers
- **Preset model providers**: the app has built-in jump links for common providers — you can tap a provider's link right inside the app to go straight to its official website or console page, and follow the provider's instructions to get an API key.
- **Custom providers**: when your provider isn't in the preset list, get the API key, API format, base URL and other configuration from the provider's website yourself, then fill them into the config.

(The built-in jump links exist so you don't accidentally land on pirated sites carrying the Silver Fox virus when searching on your own.)
:::

::: danger Security reminder
Treat your API key like your WeChat/Alipay payment password — **never share it**. Your API key and passwords are **encrypted and stored locally**; they are never uploaded to Lyra Code's servers.
:::

## 8.4 What does each field mean?

| Field | What to enter | Example | Beginner tip |
| --- | --- | --- | --- |
| Provider name | Any label you can recognize | `MyDeepSeek` | Helps distinguish multiple providers |
| API key | The key from the provider console | `sk-xxxx...` | **Stored locally; never leak it** |
| Base URL | Provider server address | `https://api.deepseek.com` | Leave empty for official providers |
| Default model | The model name you want | `deepseek-chat` | Use the exact name from the provider docs; if the model list can't be fetched, **fill it in manually** and add it to the **enabled models** list |
| Custom system prompt | Set AI's persona/rules | "You are a rigorous Chinese editor" | Save multiple presets, switch anytime |
| Reasoning depth | Thinking intensity for reasoning models (o/R series) | Low/Medium/High | Not needed for non-reasoning models |

## 8.5 Switching providers

- The **action panel** at the bottom of the chat page switches **provider / model / prompt** with one tap;
- **Compare**: ask the same question on model A, switch to model B, ask again — compare which answer is better;
- **Per scenario**: one prompt for coding ("You are a senior Kotlin engineer"), another for writing ("You are a novelist") — switching prompts changes the AI's behavior;
- **Self-hosted**: if you run Ollama / vLLM / LM Studio on your own PC, they speak the OpenAI-compatible protocol — put your LAN address in Base URL (e.g. `http://192.168.1.5:11434/v1`) — free, and data never leaves your network.

## 8.6 Beginner FAQ

**Q: It keeps erroring / spinning after adding?**
A: Check in order: ① Is the API key complete (no stray spaces)? ② Is the provider/model name correct? ③ Can your network reach the provider? ④ Is Base URL right (leave empty for official providers)?

**Q: Cannot fetch the model list / cannot connect?**
A: Some providers don't support fetching the model list — you can **fill in models manually**. If you can't connect, check the API key, base URL and path for typos, and whether your local network can reach the provider's API server.

**Q: No selectable model in the chat?**
A: 99% of the time it's because you forgot to **add the model to the enabled models list** — re-check 8.4 above.

**Q: 401 / authentication failed?**
A: The API key is invalid or expired. Generate a new one in the provider console and replace it.

**Q: "Insufficient balance"?**
A: Your account is out of credit. Top up at the provider's website (a few dollars lasts a long time).

**Q: Which provider is cheapest?**
A: Prices change often; compare OpenAI-compatible domestic platforms, or measure yourself with [Chapter 21 "Usage Stats & Device Diagnostics"](/en/guide/stats).

**Q: Can I add multiple providers at once?**
A: Yes, unlimited. Switching is just one tap at the bottom of the chat page.

**Q: Other chat errors?**
A: The causes are complex; try copying the error message into another AI. Failed conversations show the specific failure reason on the page.

---

*End of chapter · Next: Advanced Model Settings — extra model roles and advanced parameters*
