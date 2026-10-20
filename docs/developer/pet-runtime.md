# 桌宠模块与生命周期钩子

API 2 桌宠是导入包中的 ES module，由应用 WebView 宿主管理。包声明、资源加载、事件与清理应一起设计。

## 包结构

```text
manifest.json
config.toml
scripts/main.js
images/...
```

`manifest.json` 指定 `apiVersion: 2`、唯一 ID、名称、版本、作者与 `entry`；配置文件和 `controls` 按需加入。`PetArchive.kt` 校验并解包，`DevicePetStore.kt` 管理导入与存储，`PetWebRuntime.kt` 和 `assets/desktop-pet/runtime.js` 负责运行。

## 生命周期顺序

1. 宿主准备清单、包文件表与根节点，建立 API。
2. 动态 import 清单入口，校验默认导出的三个函数。
3. `await mount(api)` 完成后标记已挂载。
4. 分发挂载期间排队的事件，继续接收宿主的配置与状态；渲染必须响应更新。
5. `pagehide` 或宿主 dispose 触发 `unmount(api)`，清理宿主登记资源与监听器。

挂载前队列有上限，不要依赖每个早期事件都保存。`mount` 读取到的配置不一定是最终状态，需响应 `config` 事件。`unmount` 应在重复清理、部分初始化或异步尚未完成时仍安全。

## 钩子接口与最小示例

```js
let node;
let unsubscribe;

export default {
  mount(api) {
    node = document.createElement('div');
    node.textContent = 'Ready';
    api.root.append(node);
    unsubscribe = api.on(({ type }) => {
      if (type === 'tap') node?.animate(
        [{ opacity: 0.5 }, { opacity: 1 }], { duration: 150 }
      );
    });
  },
  onEvent(type, data, api) {
    if (type === 'state' && node) node.textContent = data.state;
    if (type === 'config' && node) {
      node.style.color = api.config.color || '#ffffff';
    }
  },
  unmount() {
    unsubscribe?.();
    unsubscribe = undefined;
    node?.getAnimations().forEach(animation => animation.cancel());
    node?.remove();
    node = undefined;
  }
};
```

默认导出必须同时提供 `mount`、`onEvent`、`unmount`；`onEvent(type, data, api)` 与 `api.on(callback)` 的参数格式不同。后者返回取消订阅函数。不要同时在两处重复处理同一状态而导致动画启动两次。

## 宿主 API

| API | 用途与约束 |
| --- | --- |
| `root`、`manifest` | 挂载容器与清单 |
| `config`、`state` | 当前冻结的配置/状态快照，不能直接修改 |
| `asset(path)` | 校验包文件路径后返回资源 URL |
| `files(directory)` | 列出包内文件，可用于帧序列 |
| `json(path)` | 读取包内 JSON |
| `createSprite(parent)` | 图像与序列播放；保留 stop/destroy 路径 |
| `audio(path, options)` | 包内音频，受宿主声音与音量配置约束 |
| `on(callback)` | 监听事件并取得取消订阅函数 |
| `emit(type, data)` | 向宿主发送受支持事件，由宿主校验处理 |

资源应通过包接口访问，不能使用在线模块/npm 导入。TOML 仅支持宿主定义的标量子集；在 `controls` 声明希望让用户调整的字段。

## 错误与清理

导入校验通过不代表 JS 挂载成功。运行时异常会报告并显示降级反馈；长任务应避免阻塞 WebView。自己创建的计时器、`requestAnimationFrame`、观察器和全局监听需在卸载时停止；宿主资源自动清理不能替代脚本自身管理。

宿主拥有窗口拖动、点击识别、设备能力与审批，脚本只负责渲染和受支持事件反馈，不增加 Shell 或任意网络能力。

## 示例与验证

可导入且无外部资源的[状态球示例](/examples/pet)包含完整清单、配置和脚本。验证挂载、初始配置、状态更新、点击、配置修改、重复卸载与资源清理；再在设备上导入检查 WebView 和悬浮窗。归档校验回归入口为 `PetArchiveTest`，更完整的原生事件说明见应用仓库 `docs/DESKTOP_PET_SCRIPTING_ZH.md`。
