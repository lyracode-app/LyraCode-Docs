---
title: MCP
---

# Chapter 15: MCP — plug in external tools

> MCP (Model Context Protocol) is a standard protocol for letting the AI connect to external tools/data sources. Think of it as **plugging a USB stick or attaching a sensor to the AI**.
>
> Reading time: about 10 minutes.

---

## 15.1 What is MCP?

MCP is a **standard protocol** for the AI to connect external tools/data sources. With it, the AI is no longer limited to built-in tools — it can also call third-party professional tools (e.g. database queries, weather queries).

Lyra Code supports both roles:

- **MCP client**: the AI connects to MCP servers provided by others and uses their tools;
- **MCP server**: Lyra Code's own Agent tools are exposed for other MCP clients to use.

## 15.2 As a client (the AI connects to others' tools)

- You can add local or remote MCP servers on the **MCP server page**:
  - **SSE or HTTP** connections supported;
  - Remote MCP servers (Streamable HTTP or SSE) supported;
- MCP tools run on **external servers** and **do not automatically get access to your phone's files** — every call needs your approval;
- Configuration needs the server address and any required Token/auth info;
- After adding, you can see the new MCP tools on the **AI Agent tools page** — they carry an **MCP prefix**, easy to recognize.

## 15.3 As a server (expose Lyra Code's abilities to others)

- You can **enable the MCP server** here, exposing the app's current Agent tools for other MCP clients on the local network and beyond;
- Custom port and optional auth key supported;
- ⚠️ **Exposing to the LAN = other devices can access it** — you must set an auth key; exposing to the public internet is riskier and should be avoided unless necessary.

> If you find this app's native tools great but prefer chatting and working in other Agent software, use this feature to provide your tools to those apps.

## 15.4 Security notes

- MCP tools run on external servers — before calling one, confirm its source is trustworthy;
- MCP tools **don't automatically get access to your phone's files** — every call needs your approval;
- Always set an auth key before exposing the MCP server; don't expose it to the public internet unless necessary;
- **You are responsible for trust decisions** about remote MCP services — don't use anything from unknown sources (more security practices in [Chapter 22](/en/guide/security)).

---

*End of chapter · Next: Mini Server — run a website on your phone*
