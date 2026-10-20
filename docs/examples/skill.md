# 编写可导入的 Skill

目标：把“先检查项目再提出修改方案”的流程变成可复用 Skill。下载[完整项目检查 Skill ZIP](/examples/project-review.zip)，导入前可以解压检查。

## 包结构

```text
SKILL.md
references/
  checklist.md
```

入口包含名称、触发说明和流程，清单通过相对路径引用：

<<< ../public/examples/project-review/SKILL.md

<<< ../public/examples/project-review/references/checklist.md

## 导入和验证

1. 在 Skills 页面导入 ZIP 并启用，核对显示名称与说明。
2. 选择一个测试工作区，在对话中选用该 Skill，发送“检查当前项目，给出最小修改方案；本轮只读”。
3. 检查记录中是否读取 `SKILL.md` 和 `references/checklist.md`。
4. 报告应包含当前行为、证据、拟修改文件、验收方式与未确定事项；工作区不应发生写入。

应用会先提供 Skill 元信息，正文需按需读取。看见名称不等于已执行流程；应核对工具记录与报告。

## 改成自己的流程

修改触发说明和检查表，使它们对应你的任务。需要命令或脚本时，写清运行环境、依赖和验证，不假设导入 Skill 就会自动安装工具或执行脚本。

示例将检查阶段设为只读；用户已授权后续实现时，完成检查后应按既有授权继续，不重复索要批准。Skill 规则不能扩大用户授权或系统能力。
