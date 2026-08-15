---
title: Security Practices
---

# Chapter 22: Security Practices — use it safely

> This chapter is about **security habits**: permission control, credential management, network plaintext, and approval review. Problems? See [Chapter 23 "Troubleshooting"](/en/guide/troubleshooting).
>
> Reading time: about 15 minutes.

---

## 22.1 The first principle of security

> **Least privilege: give the AI only as much permission as it needs.**

No matter how smart the AI is, it's still a program — the more permission it has, the worse the fallout if something goes wrong. If you don't need it to touch Root, don't give it Root.

## 22.2 Least privilege (how to do it)

- **Disable tools you don't use**: in the Agent tools page, turn off what you don't need (e.g. turn off the Root tool if you never use Root);
- **Three tiers, on demand**: Termux → Shizuku → Root; never use a higher tier when a lower one suffices (see [Chapter 13](/en/guide/commands));
- **"All files access"**: grant it only when you need full-disk file management; don't give it by default.

## 22.3 Credentials & keys (your lifelines)

- API keys, SSH private keys, email app passwords, MCP tokens: **all stored only on your device**, and backups don't export them by default;
- **Don't paste private keys in plain text in conversations** and ask for them to be forwarded to third parties;
- Backups containing keys (full migration export) **must be encrypted and stored separately** (see [Chapter 20](/en/guide/backup)).

## 22.4 Network & plaintext (watch out for HTTP)

- HTTP transmits in plaintext = data can be seen by intermediaries. Keep this in mind for API / MCP / WebDAV / FTP / mini server over HTTP;
- **Before** public exposure, tunneling or LAN sharing: check the served directory, authentication, and HTTPS;
- **Web search blocklist**: add domains you don't trust; `*.x.com` blocks subdomains — add both `x.com` and `*.x.com` to block a site fully.

## 22.5 Commands & remote operations (review carefully)

::: warning High-risk operations
- Commands have no fixed whitelist — only obvious high-risk patterns are blocked (`rm -rf /`, writing system devices, formatting disks, etc.) — **when an approval popup appears, actually look at it**;
- Remote scripts, MCP services, Skills repositories, SSH commands: **you are responsible for trust decisions** — don't use anything from unknown sources;
- Attachments download into a **quarantine directory**; scan them with antivirus before opening;
- Only preview trusted local HTML (page scripts run with browser privileges).
:::

## 22.6 Approval popups: three questions before you tap OK

1. **What tool is being called and by whom?** Which path is being read/written, which command executed?
2. **Does this match what I asked?** Any extra action sneaking in?
3. **Is it sensitive?** Sending email, remote writes, deletion — form a double-confirmation habit.

> Spotted something suspicious? **Reject it** and tell the AI why ("I don't allow you to access this file").

## 22.7 Beginner security checklist

```text
□ Set a lock screen on your phone
□ API keys appear only in the provider console and the app
□ Don't install Skills/MCP/plugins from unknown sources
□ Backups with keys: encrypted storage, delete copies after use
□ Mini server bound to 127.0.0.1 unless LAN access is truly needed
□ Look at every approval popup before tapping
```

---

*End of chapter · Next: Troubleshooting — stay calm when things break*
