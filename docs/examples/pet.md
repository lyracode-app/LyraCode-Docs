# 编写 API 2 桌宠

目标：用完整的本地模块实现一个状态球，不依赖外部图片、网络或构建步骤。下载[可导入 ZIP](/examples/status-orb.zip)，在设备交互的桌宠设置中导入。

## 目录与清单

```text
manifest.json
config.toml
scripts/main.js
```

<<< ../public/examples/status-orb/manifest.json

`apiVersion`、`id`、`name`、`version`、`author` 和 `.js` 入口必填。包内只应有一个清单；资源路径相对包根，不使用绝对路径或 `..`。

<<< ../public/examples/status-orb/config.toml

TOML 使用宿主支持的标量子集。自定义颜色通过清单 `controls` 声明，优先级为默认值 → 包配置 → 本机保存的个人参数。

## 模块生命周期

<<< ../public/examples/status-orb/scripts/main.js

`mount` 创建渲染节点，`onEvent` 处理 config、state 和 tap，`unmount` 取消动画并移除节点。宿主处理点击、长按和拖动；不要依赖脚本 DOM 点击来执行系统操作。

## 设备验收

1. 导入 ZIP，应显示 `Ready` 状态球，长按能进入设置。
2. 修改颜色，球的颜色应更新；重新选择后个人参数仍按应用规则保存。
3. 发起任务，状态随任务变化，例如 Thinking、Working、Waiting 或 Done。
4. 点击应有短暂缩放反馈；切换到默认桌宠再切回，节点不应重复。
5. 完成后按需移除示例；导入失败时保留错误与当前包，检查唯一清单、入口及语法。

脚本无法任意联网或执行 Shell。需要动画资源时，通过 `api.asset()` 或精灵接口加载包内文件，并在卸载时清理计时器与音频。更完整的协议见应用仓库 [API 2 指南](https://github.com/lyracode-app/Lyra-Code/blob/main/docs/DESKTOP_PET_SCRIPTING_ZH.md)。
