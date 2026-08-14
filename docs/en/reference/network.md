---
title: Download & Web
---

## download_file

Native HTTP/HTTPS downloads with redirects, headers, progress and integrity checks.

| Parameter | Notes |
| --- | --- |
| url | HTTP/HTTPS address |
| path | target path (workspace-relative or global path) |
| destination | workspace / global |
| headers | e.g. `Authorization: Bearer xxx` |
| sha256 | optional integrity check, fails on mismatch |
| timeout_seconds | download timeout |

::: tip
Prefer `download_file` over curl/wget - progress, redirects and verification built in.
:::

## web_search

Web search returning candidate titles/URLs/snippets. **Snippets are leads, not evidence.**

## read_web_page

Open a page and read the body.

::: warning
- prefer official docs and authoritative sources;
- never bypass a user-blocked page;
- switch sources or state the limitation for login walls / dynamic rendering / too-short pages.
:::

## mark_web_sources

Record the sources actually used and include links in the answer. Call it only when web content was used.

## Website blocklist

The blocklist in Settings stops AI from opening domains:

- exact match: `x.com` blocks only `x.com`; `www.x.com` must be added separately;
- wildcard: `*.x.com` blocks all subdomains;
- full block: add both `x.com` and `*.x.com`.