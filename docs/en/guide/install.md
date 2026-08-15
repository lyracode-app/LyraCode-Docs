---
title: Installation & Setup
---

# Chapter 2: Installation & Setup — install the app and enable the command channel

> This chapter covers **all the preparation from downloading to first use**: device requirements, downloading and installing, granting permissions, and the most critical part — the **Termux command channel**.
>
> Reading time: about 15 minutes. When you finish, you'll have Lyra Code installed and basically configured.

---

## 2.1 Device requirements

You need an Android device running **Android 8.0 (API 26) or later**. The app cannot run on devices below Android 8.0.

Also make sure the device has at least **200MB of free storage** and **400MB of free RAM**.

How to check your Android version:

```text
Open "Settings" → find "About phone" → look at the "Android version" line
```

---

## 2.2 Downloading the app

**What's an APK?** It's the installation file for Android apps, like a `.exe` on Windows.

<DownloadSection />

You can download the app from either of these official channels:

| Channel | Address |
| --- | --- |
| GitHub | <https://github.com/lyracode-app/Lyra-Code> |
| Gitee | <https://gitee.com/yukisoffd/lyra-code> |

::: warning Note
This app is **completely open source and free** — never trust paid channels offering installation packages. If you want to install a community-modified version or a derivative app, verify that the source is safe and trustworthy to avoid software containing malicious code. If in doubt, you can download the source code and build the package yourself (see [Build](/build)).
:::

::: warning Getting an "unknown source" warning when installing?
Android blocks apps from outside app stores by default. When you tap the APK, a popup will appear — tap **"Install anyway / Allow this source"**. This is normal: Lyra Code is downloaded from the official site.
:::

---

## 2.3 Installation blocked — what to do

The app **contains no malicious code**. If your installer reports a virus blocking the installation, **screenshot the details and report them to the developer**.

- **Devices sold in mainland China**: being told "no ICP filing (无备案)" is normal — just allow the installation.
- **Non-mainland devices**: Google will fully roll out its new sideloading policy starting in 2027. You may be blocked by Google Play Protect when installing this software, and will need to follow the advanced flow described on this page to install: <https://android-developers.googleblog.com/2026/03/android-developer-verification.html>

**Brief walkthrough:**

1. **Enable developer mode** in system settings.
2. Confirm you are not being coerced or induced to enable it: Google runs an environment check to make sure the process wasn't started maliciously.
3. **Restart the device and re-authenticate**: blocks remote control and monitoring behavior.
4. **Protective waiting period**: wait 24 hours, then authenticate with your device PIN or biometrics.
5. **Install the app**: once the steps above are done, you can install normally.

If Google changes its sideloading policy or flow later, this app will consider developer certification to simplify installation.

---

## 2.4 Installing via ADB

You can also **install directly with an ADB command**, which bypasses the system installer and works on both mainland and non-mainland devices:

```
adb install -r lyra-code.apk
```

---

## 2.5 First launch: permissions & storage

After installation, tap the Lyra Code icon on your home screen.

### 2.5.1 System permission requests

On first launch, Android will ask for **permissions**, usually two:

| Permission | What the popup says | Should you allow? | If you don't |
| --- | --- | --- | --- |
| Storage | "Allow Lyra Code to access photos and files?" | ✅ Yes | Can't read/save files; core features break |
| Notifications | "Allow Lyra Code to send notifications?" | ✅ Yes (recommended) | Scheduled tasks can't notify you |

> Tapped "Deny" by accident? No worries — you can re-enable anytime at `Settings → Apps → Lyra Code → Permissions`.

### 2.5.2 "All files access" permission (Android 11+)

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

**What if I don't grant it?** File browsing, copying, deleting and other bulk operations will be limited. If you only use AI chat and don't touch files, you can skip this for now and grant it later when needed.

---

## 2.6 Setting up Termux (so AI can run commands)

This is where beginners most often get stuck. Take it slowly.

### 2.6.1 Why do I need Termux?

Lyra Code's "run commands" ability works through another app called **Termux**. **Without Termux, the AI cannot run any commands** (no installing software, no scripts, no Git).

### 2.6.2 Install Termux

- Install from **F-Droid** (Termux's officially recommended store), or download from the official site `https://termux.dev`;
- Open Termux once after installing and let it finish its first-time setup (you'll see a command-line window — that's normal).

### 2.6.3 Enable "allow external apps"

In Termux, type this line (you can copy-paste it) and press Enter:

```bash
mkdir -p ~/.termux && (grep -qxF 'allow-external-apps=true' ~/.termux/termux.properties || echo 'allow-external-apps=true' >> ~/.termux/termux.properties) && termux-reload-settings
```

**This command does three things** (you don't need to understand it, just run it):
1. Creates Termux's config directory;
2. Writes `allow-external-apps=true` (lets other apps call Termux);
3. Reloads settings so it takes effect.

### 2.6.4 Install the basic packages (recommended)

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

### 2.6.5 Back in Lyra Code: turn on the Termux permission

1. Open Lyra Code → go to **Settings** (bottom-right / sidebar);
2. Find **"Termux permission"** (or similar);
3. Turn it **on** (approve the authorization popup).

::: danger Common mistake
**If this switch is off, the AI's `run_command` tool is automatically disabled** — you'll ask it to run a command and it will say "command execution unavailable". Go back through this section's three steps: is Termux installed? Is `allow-external-apps=true` set? Is the switch in Settings on?
:::

### 2.6.6 Verify the setup

Back in the chat, tell the AI:

> Run the command `echo hello` so I can test if commands work

If everything is fine, the AI will run it and return `hello`. Congratulations — the command channel is open!

---

## 2.7 Settings overview (beginner version)

Open Settings and you'll see these options. **Most can stay at their defaults**, but you should know what they do:

| Setting | What it does | Beginner advice |
| --- | --- | --- |
| Model providers | Add/manage your AI providers, API keys and models | **Required** (detailed in [Chapter 8](/en/guide/models)) |
| System prompt | Set AI's "persona" and rules | Leave for now |
| Termux permission | On/off for the command channel | **Turn on** (see 2.6) |
| Web search blocklist | Block domains you don't want AI to open | Leave for now |
| Agent tool switches | Enable/disable AI tools one by one | Leave for now |
| Theme / font / refresh rate | Display preferences | Up to you |
| Cache & storage | See how much space the app uses | Leave for now |
| App permissions | View system-granted permissions; tap to jump to the system permission page | As needed |
| Backup | Export/import your data | Do one backup after setup |

---

## 2.8 Six common beginner mistakes

1. **Asking AI to run commands without installing Termux** → "command unavailable". Configure per 2.6.
2. **Not granting storage permission** → file operations fail. Re-enable in system settings.
3. **Wrong or missing API key** → AI keeps erroring or spinning. Check provider config (see [Chapter 8](/en/guide/models)).
4. **Can't find your storage path** → remember the default workspace is `/storage/emulated/0/Lyra`, not the storage root itself.
5. **Posting your API key in groups/online** → immediately revoke it in the provider console and generate a new one.
6. **Tapping "Deny" on every popup** → many permissions are hard to find later; allow first, disable later if unwanted.

---

## 2.9 Installation FAQ

**Q: Getting an "unknown source" warning when installing?**
A: That's normal. Tap "Install anyway / Allow this source" (see 2.2).

**Q: The installer reports a virus/risk?**
A: The app contains no malicious code. If blocked, screenshot and report to the developer; on mainland devices, "no ICP filing" feedback is normal (see 2.3).

**Q: The downloaded APK won't install when opened?**
A: First confirm your system is Android 8.0 or later; then confirm "unknown sources" is allowed. If it still fails, try ADB installation (see 2.4).

---

*End of chapter · Next: Quick Start — configure your first model provider and send your first greeting*
