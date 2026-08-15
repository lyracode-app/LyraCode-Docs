---
title: Skills
---

# Chapter 18: Skills — teach the AI new skills

> A **Skill** is a "skill pack" containing a manual (`SKILL.md`) and supporting files. Once installed, the AI **opens that manual** when a related task comes up and works by its instructions.
>
> Reading time: about 15 minutes.

---

## 18.1 What is this? — skill books for the AI

Analogy: the default AI is "a capable-but-generic intern"; a Skill is a **job training manual** — install the "novel writing" skill and it knows how to write novels according to your outline.

- Each Skill has its own `name` and `description`, which decide **whether the AI loads it**;
- The AI **reads SKILL.md first** to judge relevance, then **reads internal files as needed** — it doesn't load everything at once (saves tokens).

## 18.2 How to install a Skill (three ways)

1. **zip package**: import a skill pack file others sent you (e.g. `novel-skill.zip`);
2. **A single SKILL.md**: just one manual document — import the Markdown file;
3. **Git repository link**: paste a GitHub / Gitee / GitLab repository address.

> You can also **manually edit SKILL.md** in the app to create a skill from scratch. Very large skill packs may be rejected by the app.

## 18.3 What does SKILL.md look like? (standard structure)

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

## 18.4 How to write a great Skill (advanced)

- Describe with "when the user wants to do X" phrasing to reduce false triggers;
- Put stable workflows (steps, formats, checklists) into SKILL.md so the AI doesn't rediscover them each time;
- Put large scripts/templates in sub-files; SKILL.md is just the index + how to call them;
- Note environment assumptions (some desktop/cloud tools may not exist on Android; the AI adapts);
- **Never put secrets in Skill files** (they get read along with the skill).

## 18.5 Enabling & managing

- Each Skill can be individually **enabled/disabled** — disabled skills aren't auto-loaded;
- Use the config manager to list, update and delete Skills;
- When packaging, keep the structure right: **SKILL.md at the root**, sub-files referenced by relative paths;
- Typing `/` at the start of the input box also steers the AI to read a specified Skill.

## 18.6 Beginner FAQ

**Q: Are Skills viruses? Any risk?**
A: A Skill is essentially text instructions + files. But **don't install Skills from unknown sources** — they might teach the AI dangerous operations. Only use trusted (official/well-known author) ones.

**Q: Will many Skills slow things down?**
A: The AI reads on demand, not everything at once. But vaguely described Skills may trigger accidentally — write clear descriptions.

**Q: Can a Skill replace my prompts?**
A: Yes. Once a routine is solidified into a Skill, just say "start" and the AI knows the whole flow.

---

*End of chapter · Next: Memory & Instructions — let the AI remember you and follow your rules*
