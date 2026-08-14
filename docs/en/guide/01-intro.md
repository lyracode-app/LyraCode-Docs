---
title: Introduction & Setup
---

# Chapter 1: What is Lyra Code? How do I install it? (Beginner's Guide)

> This chapter is for **complete beginners**. If you've never heard of "APK", "API key" or "terminal" before, that's totally fine — we'll explain every term from scratch, show you what you'll see on screen, and tell you what to do when something goes wrong.
>
> Reading time: about 15 minutes. When you finish, you'll have Lyra Code installed and configured.

---

## 0. Before we start: 5 minutes to learn a few words

These words appear again and again in this documentation. Learn them once and nothing will confuse you later.

### 0.1 What is an "AI model"?

An AI model (also called a large language model, or LLM) is like a **"super brain" living on a remote server**.

- It doesn't live on your phone — it runs on someone else's servers;
- Your phone sends it a question, and it sends back an answer;
- Common models include OpenAI's GPT series, Anthropic's Claude series, Google's Gemini series, and others like DeepSeek or Moonshot (Kimi).

**Key point**: Lyra Code itself **does not include a model**. You choose a model provider, connect your phone to its servers, and then you can chat. How to connect is covered in Chapter 2.

### 0.2 What is an "API key"?

An API key is a **"pass card" issued by your model provider**, and it looks something like this:

```
sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

- It proves that "this phone is being used by me (a paying customer)";
- You sign up on the provider's website, top up some credit, and generate your own API key there;
- **An API key is money and identity. Never post it online or share it in chat groups.** If it leaks, other people can spend your credit.

### 0.3 What is an "Agent"?

An Agent is an AI that **doesn't just answer — it takes action for you**.

- A normal chat app: you ask → it answers.
- An Agent (Lyra Code): you say "unzip the downloaded file and sort the images into a folder" → it plans the steps, reads your files, performs the operations — and asks for your permission before every step.

### 0.4 What are "commands / terminal / shell"?

- **Command**: a line of text instructions, like `ls` (list files) or `git push` (upload code);
- **Terminal**: the window where you type commands;
- **Shell**: the program that translates and executes commands;
- **Termux**: a terminal app for Android — basically a command-line window on your phone.

In Lyra Code, the AI can use Termux to run commands for you (install software, run scripts, manage files). This is one of its core powers — see section 5 below.

### 0.5 What is a "workspace"?

The workspace is **a dedicated folder**. Lyra Code's AI is only allowed to read and write files inside this folder by default, so it can't mess with the rest of your phone.

- Default workspace: `/storage/emulated/0/Lyra` (a `Lyra` folder at the root of your phone storage);
- Put your projects and drafts there.

### 0.6 Termux, Shizuku and Root — what's the difference?

| Name | What it is | Privilege level | When you need it |
| --- | --- | --- | --- |
| Termux | A terminal app on your phone | Normal app | Running commands, scripts, installing software (**almost everyone needs this**) |
| Shizuku | A service that borrows system debug privileges | Higher (ADB level) | Advanced stuff like querying system info, batch-managing apps |
| Root | Full "jailbroken" super-user access to your phone | Highest | Very rare cases like modifying system files |

::: tip For beginners
You only need to set up **Termux**. Ignore Shizuku and Root until you actually need them.
:::

---

## 1. So what exactly IS Lyra Code?

In one sentence:

> **Lyra Code is an Android app that combines a local AI assistant, a file manager, a code editor and a universal toolbox.**

Three things make it special:

### 1.1 Local-first (your data stays in your hands)

- Your model keys, conversations, files and account passwords **are all stored on your phone**;
- Unlike some apps, it does not upload your chats to its own servers for "relay";
- Your privacy stays between you and your model provider.

### 1.2 Agentic (AI can do things, but only after you approve)

- AI can read your files, edit your code, run commands and connect to remote servers;
- But **every risky action pops up a confirmation dialog waiting for your approval**;
- If you don't approve, it can't change anything. That's "controlled".

### 1.3 Extensible (build it like LEGO)

- **Skills**: install "skill packs" so AI learns specific abilities (writing novels, analyzing data, etc.);
- **MCP**: a standard way to connect external tools and data sources;
- **Scheduled tasks**: let AI do something for you automatically every day.

---

## 2. Is Lyra Code right for me?

### ✅ Good for you if…

- You want to write code, edit files and run scripts on your phone;
- You handle email, cloud drives or FTP servers a lot, and want AI to do the legwork;
- You're a writer or creator who wants AI help with writing, organizing and progress tracking;
- You want to experience "AI working autonomously but fully under your control".

### ❌ Not great if…

- You just want a chatbot for casual chat (a normal AI chat app is simpler);
- Your phone runs Android 7 or older (it won't work);
- You don't want to learn anything new and even permission pop-ups annoy you.

---

## 3. What can it do? (Capability overview)

| Capability | Plain explanation | Example |
| --- | --- | --- |
| Model access | Connect multiple AI providers | Chat with Kimi, write code with Claude, switch anytime |
| Agent tools | AI reads/writes files, runs commands, searches the web | "Find all the TODOs in this project" |
| Files & code | File manager + code editor | Unzip archives, edit code, preview web pages |
| Remote | SSH / email / cloud drive / FTP | "Download the logs from my server" |
| Mini server | Run a web server on your phone | Preview the website you're building |
| Scheduled tasks | AI works on a schedule | Generate a writing progress summary every day at 22:00 |
| Backup | One-tap backup/restore | Export a full backup before switching phones |

---

## 4. Installation, step by step

### 4.1 Step 1: Check that your phone qualifies

**Minimum requirement: Android 8.0 (API 26) or later.**

How to check your Android version:

```text
Open "Settings" → find "About phone" → look at the "Android version" line
```

- **Android 8.0 or later** (the vast majority of phones) → continue;
- Older → unfortunately this phone can't run it.

### 4.2 Step 2: Download the APK

**What's an APK?** It's the installation file for Android apps, like a `.exe` on Windows.

Two official download sources (pick either):

1. **GitHub Releases**: go to `https://github.com/lyracode-app/Lyra-Code/releases`, find the latest version, download the `.apk`;
2. **Gitee**: if GitHub is slow in your region, use the Gitee mirror of the same project.

::: warning "Unknown sources" warning when installing?
Android blocks apps from outside app stores by default. When you tap the APK, a popup will appear — tap **"Install anyway / Allow this source"**. This is normal for apps downloaded from official websites.
:::

### 4.3 Step 3: What you'll see on first launch

After installation, tap the Lyra Code icon on your home screen.

On first launch, Android will ask for **permissions**, usually two:

| Permission | What the popup says | Should you allow? | If you don't |
| --- | --- | --- | --- |
| Storage | "Allow Lyra Code to access photos and files?" | ✅ Yes | Can't read/save files; core features break |
| Notifications | "Allow Lyra Code to send notifications?" | ✅ Yes (recommended) | Scheduled tasks can't notify you |

> Tapped "Deny" by accident? No worries — you can re-enable anytime at `Settings → Apps → Lyra Code → Permissions`.

### 4.4 Step 4: Grant "All files access" to the file manager (Android 11+)

Lyra Code has a built-in dual-pane file manager that browses `/storage/emulated/0` (your phone's storage root). **On Android 11 and later**, you need to grant "manage all files" separately:

```text
Settings → Apps → Lyra Code → Permissions → All files access → Allow
```

::: tip Brand-specific paths may differ
Xiaomi/Redmi: Settings → App settings → Manage apps → Lyra Code → Permissions → All files access
Huawei/Honor: Settings → Apps → App management → Lyra Code → Permissions → All files access
OPPO/vivo: Settings → App management → Lyra Code → Permissions → Storage & files → All files access
Samsung: Settings → Apps → Lyra Code → Permissions → Files and media → Allow managing all files
:::

**What if I don't grant it?** File browsing, copying, deleting and other bulk operations will be limited. If you only use AI chat, you can skip this for now.

---

## 5. Setting up Termux (so AI can run commands)

This is where beginners most often get stuck. Take it slowly.

### 5.1 Why do I need Termux?

Lyra Code's "run commands" ability works through another app called **Termux**. **Without Termux, the AI cannot run any commands** (no installing software, no scripts, no Git).

### 5.2 Install Termux

- Install from **F-Droid** (Termux's officially recommended store), or download from the official site `https://termux.dev`;
- Open Termux once after installing and let it finish its first-time setup (you'll see a command-line window — that's normal).

### 5.3 Enable "allow external apps"

In Termux, type this line (you can copy-paste it) and press Enter:

```bash
mkdir -p ~/.termux && (grep -qxF 'allow-external-apps=true' ~/.termux/termux.properties || echo 'allow-external-apps=true' >> ~/.termux/termux.properties) && termux-reload-settings
```

**This command does three things** (you don't need to understand it, just run it):
1. Creates Termux's config directory;
2. Writes `allow-external-apps=true` (lets other apps call Termux);
3. Reloads settings so it takes effect.

### 5.4 Install the basic packages (recommended)

In Termux, type this line and press Enter (the first run downloads a few hundred MB — be patient):

```bash
pkg update && pkg install git openssh python nodejs-lts ripgrep file
```

| Package | What it's for |
| --- | --- |
| git | Version control (download/push projects from GitHub) |
| openssh | SSH remote connections |
| python | Run Python scripts |
| nodejs-lts | Run JavaScript/Node.js projects |
| ripgrep | Fast content search |
| file | Check file types |

> If you see `pkg: command not found`, Termux hasn't finished initializing. Close and reopen Termux once, or run `pkg update`.

### 5.5 Back in Lyra Code: turn on the Termux permission

1. Open Lyra Code → go to **Settings**;
2. Find **"Termux permission"** (or similar);
3. Turn it **on** (approve the authorization popup).

::: danger Common mistake
**If this switch is off, the AI's `run_command` tool is automatically disabled** — you'll ask it to run a command and it will say "command execution unavailable". Go back through this section: is Termux installed? Is `allow-external-apps=true` set? Is the switch on?
:::

### 5.6 Verify the setup

Back in the chat, tell the AI:

> Run the command `echo hello` so I can test if commands work

If everything is fine, the AI will run it and return `hello`. Congratulations — the command channel is open!

---

## 6. Settings explained (beginner version)

Open Settings and you'll see these options. **Most can stay at their defaults**, but you should know what they do:

| Setting | What it does | Beginner advice |
| --- | --- | --- |
| Model providers | Add/manage your AI providers, API keys and models | **Required** (Chapter 2) |
| System prompt | Set AI's "persona" and rules | Leave for now |
| Termux permission | On/off for the command channel | **Turn on** (see 5.5) |
| Web search blocklist | Block domains you don't want AI to open | Leave for now |
| Agent tool switches | Enable/disable AI tools one by one | Leave for now |
| Theme / font / refresh rate | Display preferences | Up to you |
| Backup | Export/import your data | Do one backup after setup |

---

## 7. Six common beginner mistakes

1. **Asking AI to run commands without installing Termux** → "command unavailable". Fix per section 5.
2. **Not granting storage permission** → file operations fail. Re-enable in system settings.
3. **Wrong or missing API key** → AI keeps erroring or spinning. Check provider config (Chapter 2).
4. **Can't find your storage path** → remember the default workspace is `/storage/emulated/0/Lyra`, not the storage root itself.
5. **Posting your API key in groups/online** → immediately revoke it in the provider console and generate a new one.
6. **Tapping "Deny" on every popup** → many permissions are hard to find later; allow first, disable later if unwanted.

---

## 8. FAQ

**Q: Is Lyra Code free?**
A: The app itself is free and open source. You pay the **model provider** (usage-based billing, usually very cheap).

**Q: Do I really need an API key?**
A: Yes. Models run on provider servers and need a key to be called. Free tiers are tiny or nonexistent — top up a small amount (a few dollars lasts a long time).

**Q: Can I skip Termux?**
A: You can, but the AI loses command execution, and many advanced features won't work. Install it.

**Q: How do I move to a new phone?**
A: Use Backup: export on the old phone → import on the new one (see Chapter 7, section 13).

**Q: My phone is laggy — is it Lyra Code's fault?**
A: AI runs in the cloud; your phone doesn't run big models locally, so it shouldn't lag. Slowness is usually network or background tasks.

---

## 9. What to learn next

- Chapter 2: **Interface & Models** — tour the app and set up your first model provider
- Chapter 3: **Agent Tools** — what "hands" the AI has
- Chapter 5: **Remote Integrations** — connect servers and email

---

*End of chapter · Next: Interface & Models*
