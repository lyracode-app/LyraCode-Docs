---
title: Stats, Diagnostics & Media
---

# Chapter 8: Stats, Diagnostics & Media — see your usage, play with images and themes

> This chapter covers three lighter topics: **① usage statistics (your AI spending); ② device diagnostics (a health check for your phone); ③ images, media and theme display**.
>
> Reading time: about 15 minutes.

---

## 14. Usage statistics & device diagnostics

### 14.0 What is "usage statistics"? — see where your money goes

Talking to AI is billed by "tokens" (think of a token as a rough "word unit"). Usage statistics help you **see exactly what each cent was spent on**:

- Dimensions: conversation count, message count, **your input tokens**, **AI output tokens**;
- Even the AI's thinking (chain-of-thought), tool calls, file reads, command output and repeated context count;
- **Offline estimation**: no network, no data sent to third parties, pure local calculation;
- Views by **day / week / month / year / total / custom range**.

### 14.1 What is usage statistics good for?

- **Cost analysis**: compare which model/prompt costs more, optimize your choice;
- **Find the "eater"**: see how much of the token budget went to tool calls and file reads — if a task burns a lot, it's usually context bloat (e.g. asking the AI to re-read huge files repeatedly); optimize your prompts.

::: tip For beginners
No need to check daily. Look at it when you have cost anxiety or want to compare models.
:::

### 14.2 Device diagnostics: a health check for your phone

Lyra Code can read your phone's information for troubleshooting:

| Feature | What you see | When to use |
| --- | --- | --- |
| Phone info page | Brand, model, Android version, CPU, memory, storage, screen, network, Bluetooth, battery | Curious about your phone's specs |
| Hardware check Agent | AI analyzes your phone info, diagnoses issues, compares hardware | Phone acting up — ask "what's wrong with my device?" |
| App list | Installed apps (package name, version, signature) | Find a specific app's package name |

::: warning Note
These are for **troubleshooting and reasonable inference**, not **absolute proof** of device authenticity. For deeper system-level diagnosis, pair with Shizuku's `dumpsys` / `pm` commands (see Chapter 4).
:::

---

## 15. Multimodal, themes & rendering

### 15.1 Images & media: let the AI "see"

- **Send images to AI**: upload or take photos, with **crop, rotate, pen annotations and mosaic annotations** (mark the key point, then ask);
- **View AI's images**: thumbnails, preview, save for images/videos returned by the AI;
- Attachments reach the AI as multimodal content or extracted text — depends on whether your current model supports vision (if not, ask it to describe the text content instead).

> Fun beginner idea: "Take a photo of the back of your router and ask the AI what the admin address on it says." (Requires a vision-capable model.)

### 15.2 Rendering abilities: tricks in chat

- **Markdown**: bold, lists, tables all render;
- **Syntax highlighting**: code blocks are auto-colored;
- **Math formulas**: LaTeX renders locally (e.g. `$E=mc^2$`);
- **Inline images**: image links/Data URLs from the AI preview directly.

### 15.3 Theme & display settings

| Setting | What it does | Beginner advice |
| --- | --- | --- |
| Theme mode | Light / Dark / Follow system | "Follow system" is easiest |
| Material You | Dynamic color (colors only, layout untouched) | Turn on if you like it |
| Font size | Live preview; follow system or customize | Whatever is comfortable for your eyes |
| Refresh rate | Smart / 30 / 60 / 90 / 120 Hz | Default "smart" is fine; hardware decides the rest |

### 15.4 Beginner FAQ

**Q: Why does the AI say "I can't see this image"?**
A: Your current model doesn't support vision input. Switch to a vision-capable model (GPT-4o, Gemini, Claude series, etc.).

**Q: Are the usage numbers accurate?**
A: They're local estimates; there may be small differences from the provider's bill, but they're good enough for comparison and trend monitoring.

**Q: Will diagnostics leak my privacy?**
A: These are only read when you ask the AI to analyze; they stay local and are never uploaded automatically.

---

*End of chapter · Next: Security & Troubleshooting — use it safely, stay calm when things break*
