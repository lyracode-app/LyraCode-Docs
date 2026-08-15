---
title: Mini Server
---

# Chapter 16: Mini Server — run a website on your phone

> The mini server = **a small website server running on your phone**. The most typical use: **preview the website / docs site / front-end project you're building** — see the effect immediately after each change.
>
> Reading time: about 10 minutes.

---

## 16.1 What is it? — in plain words

- Its "root directory" is **the current workspace** folder;
- Once started, you (or devices on your LAN) can visit pages on your phone through a browser;
- Used for debugging html / javascript / css website projects, with LAN access supported.

## 16.2 How to use it: five steps

1. **Ask the AI to start it**: say "start the mini server on port 8080" (it calls the built-in tool, possibly with a confirmation popup);
2. **Get the address**: the AI returns the **local address** (e.g. `http://127.0.0.1:8080/`) and a **LAN address** (e.g. `http://192.168.x.x:8080/`);
3. **Open the preview**: open the address in your phone browser and see your site;
4. **Check logs when problems occur**: ask the AI to "look at the server logs" to diagnose 404s, load failures, JS errors;
5. **Stop it when done**: say "stop the mini server".

::: tip Beginner example
If the AI just made an `index.html` in your workspace, say:
"Start the mini server so I can preview index.html"
:::

::: tip Note
For complex websites, have the AI configure the environment and start the server in Termux instead (see [Chapter 13 "Running Commands"](/en/guide/commands)).
:::

## 16.3 Configuration at a glance (don't memorize, just understand)

| Setting | What it does | Safety note |
| --- | --- | --- |
| host | `127.0.0.1` = only this phone; `0.0.0.0` = LAN can access | Exposed = others can open your page |
| port | Server port (e.g. 8080) | Conflicts cause startup failure |
| username/password | Access password (Basic auth) | **No password = anyone can open** |
| protocol | HTTP or HTTPS | HTTP is plaintext — don't put sensitive stuff |
| TLS cert/key | Certificate for HTTPS | Self-signed certs warn in browsers |
| force_https | Redirect HTTP to HTTPS | Requires cert configured first |
| spa_fallback | Fall back to index.html for SPA routes (Vue/React) | Good for front-end projects |
| mdns | LAN discovery name | Easy to find from other devices |

## 16.4 Troubleshooting

- **404 (page not found)**: check the log's requested path; confirm the file exists and the case matches;
- **Auth failure**: check username/password match the settings;
- **JS errors**: the log records page script errors — fix the script first;
- **Changes not appearing**: browser cache — force refresh (clear cache / reload);
- **SPA refresh 404**: enable `spa_fallback`;
- **Previewing VitePress/Vite projects**: build static files first (`build`), then point the server at the output directory.

::: danger Safety red line
Before binding to `0.0.0.0`, tunneling or exposing to the public internet, **always check**: are there sensitive files in the served directory? Is a password set? Is HTTPS on? If not, stay on `127.0.0.1`.
:::

## 16.5 Beginner FAQ

**Q: Why can't other LAN devices open it?**
A: ① Is the server bound to `0.0.0.0` (`127.0.0.1` is local-only)? ② Are both devices on the same Wi-Fi? ③ Is your phone's firewall/router blocking it?

**Q: Startup failed / port in use?**
A: Use a different port (e.g. 8080 → 9000).

**Q: Can I host a production site with it?**
A: It's a local preview tool, not a production server. For production, use a cloud server.

---

*End of chapter · Next: Scheduled & Background Tasks — let the AI work on schedule*
