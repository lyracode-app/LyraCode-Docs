---
title: Multimodal & Rendering
---

# Chapter 6: Multimodal & Rendering — let the AI "see" images and use Markdown in chat

> This chapter is about the "content" side of chat: **① images & media (multimodal); ② Markdown, code and formula rendering**.
>
> Reading time: about 8 minutes.

---

## 6.1 Images & media: let the AI "see"

- **Send images to AI**: upload or take photos, with **crop, rotate, pen annotations and mosaic annotations** (mark the key point, then ask);
- **View AI's images**: thumbnails, preview, save for images/videos returned by the AI (you can **save to your device**);
- Attachments reach the AI as multimodal content or extracted text — depends on whether your current model supports vision (if not, ask it to describe the text content instead).

> Fun beginner idea: "Take a photo of the back of your router and ask the AI what the admin address on it says." (Requires a vision-capable model.)

::: warning Note
Messages can attach **multimodal files like images**, but the model you choose must support multimodal input, otherwise an error is returned. **Document files (PDF, Word, etc.) are not supported yet.**
:::

## 6.2 Rendering abilities: tricks in chat

- **Markdown**: bold, lists, tables all render;
- **Syntax highlighting**: code blocks are auto-colored;
- **Math formulas**: LaTeX renders locally (e.g. `$E=mc^2$`);
- **Inline images**: image links/Data URLs from the AI preview directly.

## 6.3 Multimodal FAQ

**Q: Why does the AI say "I can't see this image"?**
A: Your current model doesn't support vision input. Switch to a vision-capable model (GPT-4o, Gemini, Claude series, etc.) — see [Chapter 8, 8.5](/en/guide/models#_8-5-switching-providers).

**Q: How do I save images output by the AI?**
A: Multimodal files returned by the AI support preview and saving — you can **save them to your device**.

---

*End of chapter · Next: Personalization & Themes — dress up the app to your liking*
