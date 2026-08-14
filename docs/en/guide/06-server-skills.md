---
title: Mini Server & Skills
---

# Chapter 6: Mini Server & Skills — run a website on your phone, teach the AI new skills

> This chapter covers two cool features: **① turning your phone into a mini web server** to preview pages you build; **② installing "skill packs" (Skills)** so the AI learns specific abilities.
>
> Reading time: about 20 minutes.

---

## 9. The built-in mini server

### 9.0 What is it? — in plain words

The mini server = **a small website server running on your phone**.

- Its "root directory" is **the current workspace** folder;
- Once started, you (or devices on your LAN) can visit pages on your phone through a browser;
- The most typical use: **preview the website / docs site / front-end project you're building** — see the effect immediately after each change.

### 9.1 How to use it: five steps

1. **Ask the AI to start it**: say "start the mini server on port 8080" (it calls the built-in tool, possibly with a confirmation popup);
2. **Get the address**: the AI returns the **local address** (e.g. `http://127.0.0.1:8080/`) and a **LAN address** (e.g. `http://192.168.x.x:8080/`);
3. **Open the preview**: open the address in your phone browser and see your site;
4. **Check logs when problems occur**: ask the AI to "look at the server logs" to diagnose 404s, load failures, JS errors;
5. **Stop it when done**: say "stop the mini server".

::: tip Beginner example
If the AI just made an `index.html` in your workspace, say:
"Start the mini server so I can preview index.html"
:::

### 9.2 Configuration at a glance (don't memorize, just understand)

| Setting | What it does | Safety note |
| --- | --- | --- |
| host | `127.0.0.1` = only this phone; `0.0.0.0` = LAN can access | Exposed = others can open your page |
| port | Server port (e.g. 8080) | Conflicts cause startup failure |
| username/password | Access password (Basic auth) | **No password = anyone can open** |
| protocol | HTTP or HTTPS | HTTP is plaintext — don't put sensitive stuff |
| TLS cert/key | Certificate for HTTPS | Self-signed certs warn in browsers |
| force_https | Redirect HTTP to HTTPS | Requires cert configured first |
| spa_fallback | Fall back to index.html for SPA routes | For Vue/React built sites |
| mdns | LAN discovery name | Easy to find from other devices |

### 9.3 Troubleshooting

- **404 (page not found)**: check the log's requested path; confirm the file exists and the case matches;
- **Auth failure**: check username/password match the settings;
- **JS errors**: the log records page script errors — fix the script first;
- **Changes not appearing**: browser cache — force refresh (clear cache / reload);
- **SPA refresh 404**: enable `spa_fallback`;
- **Previewing VitePress/Vite projects**: build static files first (`build`), then point the server at the output directory.

::: danger Safety red line
Before binding to `0.0.0.0`, tunneling or exposing to the public internet, **always check**: are there sensitive files in the served directory? Is a password set? Is HTTPS on? If not, stay on `127.0.0.1`.
:::

### 9.4 Beginner FAQ

**Q: Why can't other LAN devices open it?**
A: ① Is the server bound to `0.0.0.0` (`127.0.0.1` is local-only)? ② Are both devices on the same Wi-Fi? ③ Is your phone's firewall/router blocking it?

**Q: Startup failed / port in use?**
A: Use a different port (e.g. 8080 → 9000).

**Q: Can I host a production site with it?**
A: It's a local preview tool, not a production server. For production, use a cloud server.

---

## 10. Skills

### 10.0 What is this? — skill books for the AI

A **Skill** is a "skill pack" containing a manual (`SKILL.md`) and supporting files. Once installed, the AI **opens that manual** when a related task comes up and works by its instructions.

Analogy: the default AI is "a capable-but-generic intern"; a Skill is a **job training manual** — install the "novel writing" skill and it knows how to write novels according to your outline.

### 10.1 How to install a Skill (three ways)

1. **zip package**: import a skill pack file others sent you (e.g. `novel-skill.zip`);
2. **A single SKILL.md**: just one manual document — import the Markdown file;
3. **Git repository link**: paste a GitHub / Gitee / GitLab repository address.

> You can also **manually edit SKILL.md** in the app to create a skill from scratch.

### 10.2 What does SKILL.md look like? (standard structure)

```markdown
---
name: my-skill              # skill name
description: one sentence: what this skill does and when it triggers
---

# Instructions

(How the AI should act after reading this: steps, rules, output format, caveats)

## Reference files

- prompts/template.md
- scripts/process.py
```

**Two key points**:

- `name` and `description` decide **whether the AI loads it** — describe clearly "when to use this";
- The AI **reads SKILL.md first** to judge relevance, then **reads internal files as needed** — it doesn't load everything at once (saves tokens).

### 10.3 How to write a great Skill (advanced)

- Describe with "when the user wants to do X" phrasing to reduce false triggers;
- Put stable workflows (steps, formats, checklists) into SKILL.md so the AI doesn't rediscover them each time;
- Put large scripts/templates in sub-files; SKILL.md is just the index + how to call them;
- Note environment assumptions (some desktop/cloud tools may not exist on Android; the AI adapts);
- **Never put secrets in Skill files** (they get read along with the skill).

### 10.4 Enabling & managing

- Each Skill can be individually **enabled/disabled** — disabled skills aren't auto-loaded;
- Use the config manager to list, update and delete Skills;
- When packaging, keep the structure right: **SKILL.md at the root**, sub-files referenced by relative paths.

### 10.5 Beginner FAQ

**Q: Are Skills viruses? Any risk?**
A: A Skill is essentially text instructions + files. But **don't install Skills from unknown sources** — they might teach the AI dangerous operations. Only use trusted (official/well-known author) ones.

**Q: Will many Skills slow things down?**
A: The AI reads on demand, not everything at once. But vaguely described Skills may trigger accidentally — write clear descriptions.

**Q: Can a Skill replace my prompts?**
A: Yes. Once a routine is solidified into a Skill, just say "start" and the AI knows the whole flow.

---

*End of chapter · Next: Memory, Tasks & Backup — let the AI remember you, work on schedule, and keep your data safe*
