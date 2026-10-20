# Extensions and Skill loading

Choose by purpose, then use the relevant API guide. Skills, external tools and pets have distinct inputs and lifecycles.

## Choose an extension

| Mechanism | Purpose | Entry | API guide |
| --- | --- | --- | --- |
| Skill | Procedures, checklists, conventions | `SKILL.md` and references | This page |
| MCP client/server | External tools or phone-tool exposure | HTTP(S), JSON-RPC | [MCP](/en/developer/mcp) |
| API 2 pet | Floating appearance, animation, feedback | ZIP and ES module | [Pet runtime](/en/developer/pet-runtime) |
| Built-in tool | Platform/application capability | Kotlin schema/Handler | [Tools](/en/developer/agent-tools) |

Each follows its execution policy. Skills add no system permission; pet scripts do not own host approvals. Local MCP separately skips per-call chat approvals, as documented in its guide.

## Skill package

```text
SKILL.md
references/checklist.md
scripts/optional-script.sh
```

Describe triggers, prerequisites, steps and acceptance criteria in `SKILL.md`. Keep long references in relative files. Packaged scripts still require an execution environment and tools.

## Import and management APIs

`data/settings/AppSettings.kt` provides these entries. Callers must handle Result failures:

| API | Contract |
| --- | --- |
| `importSkillFile(uri)` / `importSkillZip(uri)` | Import Android URI |
| `importSkillMarkdown(sourceName, skillText)` | Install nonempty Markdown |
| `importSkillRepository(repositoryUrl)` | Resolve/download supported repository/raw URLs |
| `importSkillZipBytes(sourceName, bytes)` | Install existing ZIP data |
| `installedSkills()` | List installed metadata |
| `setSkillEnabled(id, enabled)` / `updateSkillMeta(...)` | Enable/disable or edit metadata |
| `deleteSkill(id)` | Delete installed content |
| `listSkillFiles(id)` / `readSkillFile(id, path)` | Read by ID and relative path |

## Loading lifecycle

### Import

Resolve source → stage directory → validate entry, archive paths and size → metadata → final directory → enable. Remove temporary files on failure. Do not register success before download/validation.

### Request

`activeSkillsPrompt(forcedSkillIds)` provides available names/descriptions. The Agent reads relevant entries/references through `list_skill_files` and `read_skill_file`. Turn-selected IDs are retained by `OpenAiAgent.chat` and cleared in `finally`, without leaking to other requests.

### Execution

Actual tools execute procedures within their capability/path limits. Adapt unavailable desktop tools to Android/Termux. Successful import does not prove the procedure can run on-device.

## Import example

```kotlin
// Existing host settings/text; perform downloads/reads on appropriate dispatchers.
val skill = settings.importSkillMarkdown("project-review.md", markdown).getOrThrow()
val files = settings.listSkillFiles(skill.id).getOrThrow()
val entry = settings.readSkillFile(skill.id, "SKILL.md").getOrThrow()
```

See the [project review Skill](/en/examples/skill) for complete Markdown, checklist and ZIP. Verify metadata, enabled state, references, read-only execution and unmet dependencies, then check availability after updates/deletion.
