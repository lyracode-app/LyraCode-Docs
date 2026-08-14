---
title: Mini Server & Skills
---

## 9. Built-in Mini Server

The mini server is a built-in HTTP/HTTPS static file server rooted at the **current workspace**, used to preview and debug local websites, documentation sites and generated frontend projects.

### 9.1 Workflow

1. Ask AI to start it: `manage_mini_server(action=start)` with an optional port and host;
2. Get the address: `get_mini_server_status` returns the local URL and LAN URLs;
3. Preview and debug in a browser;
4. On issues, check `read_mini_server_logs` for connections, resource loading, 404s, auth failures and JS errors;
5. Stop it when done: `manage_mini_server(action=stop)`.

### 9.2 Options

| Option | Description | Security note |
| --- | --- | --- |
| host | `127.0.0.1` device-only; `0.0.0.0` exposes to LAN/port mapping | exposed once on the LAN |
| port | listening port | - |
| username/password | Basic auth | empty password = no auth |
| protocol | HTTP or HTTPS | HTTP is plaintext |
| TLS cert/key | PEM chain or keystore | self-signed certs aren't trusted by browsers |
| force_https | redirect HTTP to HTTPS | needs a cert first |
| spa_fallback | fall back to index.html for SPAs | good for Vue/React builds |
| mdns | LAN discovery name | - |

### 9.3 Debugging tips

- **404 / failed assets**: check the requested path in the logs; verify the file exists and casing matches;
- **auth failures**: check username/password against Basic Auth;
- **JS errors**: the log records page JavaScript errors - fix syntax/path issues first;
- **changes not applied**: static servers may cache - hard refresh (Ctrl+F5 / clear cache);
- **SPA route 404**: enable spa_fallback;
- **VitePress/Vite preview**: build the static output into the workspace first, then serve that directory.

::: danger
Before binding to `0.0.0.0`, tunneling or going public, check whether the served directory contains sensitive files, whether a password is set, and whether HTTPS is enabled.
:::

## 10. Skills Packages

Skills are optional "capability packages" for the Agent. A Skill contains a `SKILL.md` description and companion resources, so the Agent follows the instructions for related tasks.

### 10.1 Three import methods

1. **zip package**: import from a file (e.g. `novel-skill.zip`);
2. **a single SKILL.md**: import the Markdown file directly;
3. **Git repo link**: import from GitHub / Gitee / GitLab repositories.

You can also **edit SKILL.md manually** in the app to create a Skill.

### 10.2 Standard SKILL.md structure

```markdown
---
name: my-skill
description: One sentence on what this skill does and when it triggers
---

# Instructions

（How the Agent should act after reading this: steps, rules, output format, caveats）

## Reference files

- prompts/template.md
- scripts/process.py

```

Key points:

- `name` / `description` decide whether the Agent loads it - write the trigger scenarios clearly;
- the Agent reads SKILL.md first to judge relevance and **reads internal files on demand** to avoid context bloat;
- when a task strongly matches a Skill, the Agent calls `list_skill_files` / `read_skill_file` to read its contents.

### 10.3 Writing a good Skill

- phrase the description as "when the user wants to do X" to reduce false triggers;
- put stable processes (steps, formats, checklists) into SKILL.md to avoid repeated dialogue;
- keep large scripts/templates in sub-files and reference them;
- note environment assumptions (desktop/cloud tools may not exist on Android; the Agent will adapt);
- never put secrets in Skill files.

### 10.4 Enabling & management

- Skills can be enabled/disabled individually; disabled ones are no longer injected;
- you can list, update and delete Skills through the configuration manager;
- when packaging a Skill, keep SKILL.md at the root and reference sub-files with relative paths.

---