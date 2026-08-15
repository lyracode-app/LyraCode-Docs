---
title: Workflow Examples
---

# Chapter 24: Workflow Examples — 6 real-world scenarios, follow along and you'll learn

> We've covered the tools and concepts — this chapter ties them together: **6 complete real-world scenarios**, from requirement to delivery. Follow along once and you'll get it.
>
> Reading time: about 20 minutes.

---

## 24.1 Scenario 1: maintain an open-source plugin project on your phone

**Goal**: modify a GitHub plugin's code, test it, and push.

```text
1. Tell the AI: "The workspace is the plugin repo directory; list the current changes"
2. The AI creates a TODO: fix code → add tests → update README → push
3. Have the AI explore the existing code with search_files + read_file
4. Have the AI edit the logic precisely (edit_file), then run regression tests (run_command)
5. Have the AI update the README with a "changelog" entry
6. After you confirm, the AI runs git add / commit / push
7. The AI reports: what changed, test results, push status
```

**Beginner point**: you see an approval popup at every step; before pushing, have the AI show the exact commands it will run.

## 24.2 Scenario 2: write a novel chapter by chapter + progress tracking

**Goal**: write a novel with AI following an outline, and maintain a progress file.

```text
1. Put "writing-plan.json" and chapter text in the project folder; add an AGENTS.md defining word-count rules and naming
2. Each chapter: "Read the end of the previous chapter and the plan file, then write chapter 34, then update the plan file's completed count and word count"
3. Use memory to store settings (protagonist lifespan, volume structure, tone) so sessions stay consistent
4. Set a scheduled task that generates a progress summary weekly
```

**Beginner point**: AGENTS.md + memory + plan file work together, and the AI "remembers" the whole book's setup (see respectively [Chapter 12](/en/guide/files), [Chapter 19](/en/guide/memory), [Chapter 17](/en/guide/scheduled-tasks)).

## 24.3 Scenario 3: local website development & preview

**Goal**: build a website on your phone and preview it locally.

```text
1. Install node/npm in Termux (Chapter 2, 2.6)
2. Initialize a Vite/VitePress project in the workspace
3. Have the AI write code and build static output
4. Tell the AI: "start the mini server on port 8080"
5. Open the address in a browser; on issues, have the AI check server logs
6. Rebuild after changes; stop the server when done
```

**Beginner point**: the mini server's root is the current workspace — make sure the build output is inside the workspace before previewing (see [Chapter 16](/en/guide/mini-server)).

## 24.4 Scenario 4: email + cloud-drive automation

**Goal**: let the AI handle email and auto-backup.

```text
1. Configure IMAP/SMTP and WebDAV accounts (Chapter 14)
2. Ask the AI to "list unread emails → extract key info → draft replies"
3. Review the drafts in your mailbox and send manually (safer)
4. Download important attachments to quarantine, scan with antivirus first
5. Set a scheduled task: monthly auto export_backup to WebDAV
```

**Beginner point**: sending email needs separate confirmation; "draft first, send manually" is the safest habit.

## 24.5 Scenario 5: multi-Agent parallel research (sub-agents)

**Goal**: research two approaches in parallel and compare.

```text
1. Tell the AI: "Research the pros and cons of plan A and plan B separately"
2. The AI spawns two sub-agents, each producing: conclusion, sources, risks, recommendation
3. The main AI reviews both, cross-checks conflicts
4. It merges into a comparison document and writes it to the workspace
```

**Beginner point**: good for "independent, parallel" tasks; always review results — don't trust them blindly (sub-agent configuration: [Chapter 10](/en/guide/sub-agents)).

## 24.6 Scenario 6: the safety self-check before every execution

```text
□ What permission does this need? Is there a lower-privilege alternative?
□ Is the target path / server / account correct?
□ What will the command change? Can it be recovered (backup)?
□ Does it involve keys/privacy? Could it be logged or sent out?
□ Does the approval popup match what I expected?
```

**Beginner point**: making these 5 questions a habit beats any security setting (more security practices in [Chapter 22](/en/guide/security)).

---

*End of chapter · Next: Appendix — quick reference and glossary*
