# 扩展方式与 Skill 加载

先按目标选择扩展机制，再阅读对应接口页。Skill、外部工具与桌宠拥有不同的输入和生命周期。

## 选择扩展机制

| 方式 | 适合目标 | 入口 | 详细接口 |
| --- | --- | --- | --- |
| Skill | 流程、检查清单和项目约定 | `SKILL.md` 与参考文件 | 本页 |
| MCP 客户端/服务端 | 外部业务工具或开放手机工具 | HTTP(S)、JSON-RPC | [MCP](/developer/mcp) |
| API 2 桌宠 | 悬浮外观、动画和状态反馈 | ZIP、ES module | [桌宠运行时](/developer/pet-runtime) |
| 内置工具 | 平台或应用能力 | Kotlin schema/Handler | [工具接入](/developer/agent-tools) |

这些方式分别使用已有执行策略；Skill 不增加系统权限，桌宠脚本不接管宿主审批。本机 MCP 服务端有独立的跳过逐次审批行为，按对应章节处理。

## Skill 包结构

```text
SKILL.md
references/checklist.md
scripts/optional-script.sh
```

`SKILL.md` 描述何时使用、需要什么条件、如何操作及如何验收。长材料放相对路径参考文件。脚本只是包文件，运行仍需要明确环境与工具。

## 导入与管理接口

`data/settings/AppSettings.kt` 提供以下入口，返回 Result 的接口由调用方展示错误：

| 接口 | 契约 |
| --- | --- |
| `importSkillFile(uri)` / `importSkillZip(uri)` | 从 Android URI 导入 |
| `importSkillMarkdown(sourceName, skillText)` | 安装非空 Markdown |
| `importSkillRepository(repositoryUrl)` | 解析支持的仓库或原始地址并下载 |
| `importSkillZipBytes(sourceName, bytes)` | 安装已有 ZIP 数据 |
| `installedSkills()` | 枚举已安装元信息 |
| `setSkillEnabled(id, enabled)` / `updateSkillMeta(...)` | 启停或调整元信息 |
| `deleteSkill(id)` | 删除安装内容 |
| `listSkillFiles(id)` / `readSkillFile(id, path)` | 按 ID/相对路径读取包内容 |

## 加载生命周期

### 导入阶段

解析来源 → 临时目录 → 非空入口/归档路径及大小检查 → 元信息 → 移入正式安装目录 → 启用。失败时清理临时文件。不要跳过路径校验或在下载未完成时登记成功。

### 请求阶段

`activeSkillsPrompt(forcedSkillIds)` 提供可用 Skill 的名称/说明。Agent 按需调用 `list_skill_files`、`read_skill_file`，从入口读取相关参考。显式本轮选择的 ID 经 `OpenAiAgent.chat` 保存，并在 `finally` 清理，不能泄漏到其他请求。

### 执行阶段

流程仍通过真实工具执行，遵守工具能力与路径范围。Android/Termux 不具备的桌面工具需要适配；导入成功不能证明流程在手机可执行。

## 导入示例

```kotlin
// settings 与 Markdown 文本由已有宿主提供，下载/读取在适当调度器执行。
val skill = settings.importSkillMarkdown("project-review.md", markdown).getOrThrow()
val files = settings.listSkillFiles(skill.id).getOrThrow()
val entry = settings.readSkillFile(skill.id, "SKILL.md").getOrThrow()
```

完整 Markdown、清单与 ZIP 见[项目检查 Skill](/examples/skill)。检查名称、启用状态、参考相对路径、只读任务和无法满足的依赖；更新或删除后再验证下一轮可用列表。
