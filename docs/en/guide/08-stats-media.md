---
title: Stats, Diagnostics & Media
---

## 14. Usage Statistics & Device Diagnostics

### 14.1 Usage statistics

- counts: conversations, messages, user-input tokens, AI-output tokens;
- reasoning, tool context, file reads, command output and repeated context are all counted;
- **offline token estimation** - no network dependency, data never leaves the device;
- views: day / week / month / year / total, plus historical date ranges.

Use cases:

- compare token consumption across models/prompts to optimize cost;
- see the share of tool calls and file reads in Agent tasks to find "context bloat".

### 14.2 Device diagnostics

- **Device info page**: manufacturer, model, Android version, CPU/hardware, ABI, memory, storage, display, network, Bluetooth, battery;
- **Hardware-check Agent**: device diagnosis, troubleshooting and hardware comparison (via `get_device_hardware_info`);
- **App list**: recognize installed apps (`list_installed_apps` with package/version/signature).

Notes:

- these are for troubleshooting and reasonable inference, not definitive proof of device authenticity;
- combine with Shizuku `dumpsys` / `pm` for system-level issues.

## 15. Multimodal, Theme & Rendering

### 15.1 Images & media

- image upload and camera capture with crop, rotate, brush annotation and mosaic annotation;
- thumbnails, full preview and save for user/AI images and videos;
- preview and save for AI-returned base64 media, remote URLs and local media files;
- attachments arrive as multimodal content or extracted text, depending on the model's capability.

### 15.2 Rendering

- Markdown, tables, syntax-highlighted code blocks;
- LaTeX math (JLaTeXMath rendered locally);
- media Data URLs.

### 15.3 Theme & display

| Setting | Notes |
| --- | --- |
| Theme mode | light / dark / system |
| Material You | dynamic color; colors only, layout unchanged |
| Font size | live preview; system-following or a wider custom range |
| Refresh rate | system smart / 30 / 60 / 90 / 120 Hz; the effective rate depends on device and Android policy |

---