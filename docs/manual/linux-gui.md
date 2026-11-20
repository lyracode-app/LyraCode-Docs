# Linux 图形环境与桌面

目标：在 PRoot Linux 里运行 X11 桌面或单个图形程序，并在应用内操作、截图，必要时以悬浮窗预览。命令行环境本身见 [PRoot、Termux 与命令](/manual/commands)。

## 打开桌面

1. 先在「设置 → PRoot Linux」中启用一个环境。
2. 点该环境行右侧的桌面图标。
3. 在「预设 / 最近使用」中选择 LXDE、Xfce、LXQt、Openbox，或历史命令、自定义命令。
4. 连接成功后工具栏自动收起，右上角小按钮可重新展开。

每个环境独立记住上次的桌面命令、分辨率、帧率和最近 8 条命令，不需要每次重新填写。全屏页面会横屏并隐藏系统栏，工具栏以浮层显示，展开时不挤压画面。

桌面本身不在应用内安装。应用提供的是原生 X server、XKB 数据、认证 cookie 和会话外壳；发行版、桌面环境和窗口管理器由你在 rootfs 内准备。

## 安装最小依赖

首次使用先让 AI 调用 `linux_gui(action="guide")` 取得该环境的安装与排错规范，再用 `proot_command` 按实际缺失项安装。Debian 与 Ubuntu 的 LXDE 组合例如：

```sh
apt update
apt-get install -y --no-install-recommends x11-utils dbus-x11 fonts-dejavu-core lxde-core lxterminal
```

只预览单个程序时，装 `openbox` 加上该程序自己的运行库即可。其他发行版使用各自的包名，不要把某个发行版的仓库混进另一个发行版。

依赖 systemd、显示管理器、系统总线或登录管理器的桌面需要你在 rootfs 内自行准备。这类组件不属于本功能的支持范围，启动失败时应改用不依赖它们的桌面或窗口管理器。

## 显示后端

`display_backend` 决定画面如何进入 Android：

| 取值 | 行为 |
| --- | --- |
| `auto` | 优先内置 X.Org/Lorie DDX，启动失败时才切到 VNC |
| `native` | 只使用内置服务器，失败时直接返回错误 |
| `vnc` | 使用可选的 TigerVNC 备用管线 |

默认路径把根窗口像素以 AHardwareBuffer → EGLImage → SurfaceView 交给界面，常规显示不做压缩、不做 RFB 解码，也不读回 CPU；只有主动截图时才读回帧。备用路径是 guest 内的 TigerVNC 经私有 Unix socket 传输 RFB。

自动回退发生在桌面命令执行之前，因此命令只会执行一次。会话状态中的 `display_backend.backend`、`transport`、`fallback_reason` 和 `ahb_frames` 用于判断实际走了哪条路径，排错时先读这些字段，再决定是否需要安装 VNC 组件。

X11 的 TCP 端口被禁用，guest 通过 `/tmp/.X11-unix` 下的 socket 和会话自己的 Xauthority 连接。不要改成 `-ac`、`xhost +` 或修改认证脚本。

## 会话、容量与生命周期

- 一个 Linux 会话对应一个 Android 桌面 Surface，会话内的窗口排列由 Linux 的窗口管理器负责。
- 不同环境、同一环境的不同 display 都是独立会话。最多 4 个并发会话，合并桌面面积上限 16,588,800 像素，单个桌面最大 3840×2160。
- 返回后桌面继续运行。前台服务通知提供返回入口和「停止全部桌面」。
- 关闭单个会话会终止它的 PRoot supervisor 及其子进程。
- 在设置中禁用或删除环境会先关闭它的图形会话。
- 应用进程被系统终止后，图形会话不再恢复，需要重新打开。

如果启动日志提示 display 已被占用，通常是上次的 X server 残留。在对应 Linux 环境里清理，或重启应用运行环境后重试。

## 触控、键鼠与输入法

- 轻点为左键，长按为右键，拖动为左键拖拽，双指滚动。
- 支持带滚轮的 USB 或蓝牙鼠标、物理键盘及其修饰键。
- 桌面区域内隐藏 Android 系统指针，按帧缓冲比例绘制 Linux 游标。
- 输入法在确认候选词后发送 Unicode keysym，并处理退格与回车。
- 焦点丢失或切换会话时释放按下的按键与鼠标按钮，避免拖拽状态被带到其他界面。
- 少数系统按键与快捷键由 Android 保留，无法转发给 Linux。

文字显示依赖 Linux 侧字体。装好覆盖目标文字的字体后文字才会正常，安装命令中已包含 DejaVu 作为基础字体。

会话音频经 PulseAudio 或 PipeWire 输出到 Android 的音频通道，需要 guest 内至少有一套可用的音频服务。

## 让 AI 预览应用或开悬浮窗

AI 侧的入口是 `linux_gui`，动作包括 `guide`、`list`、`start`、`status`、`show`、`hide`、`stop`、`screenshot` 和 `request_overlay_permission`。参数与审批规则见[工具与参数速查](/reference/tools)。

```json
{"action":"start","linux_id":"debian","app_command":"cd /workspace/demo && python3 main.py","mode":"overlay","width":1024,"height":768,"fps":30}
```

- `app_command` 由应用自动加上 Openbox 和会话 D-Bus 后启动，你记住的桌面命令不受影响；Openbox 与项目所需的 GUI 库仍需提前安装。
- 悬浮模式使用 Android 的「显示在其他应用上层」权限。缺少权限时工具会打开系统授权页，授权后重试即可。
- 悬浮窗可拖动标题栏、拖动右下角调整大小、最小化、弹出输入法、全屏打开或关闭会话。
- `hide` 只隐藏浮窗，会话继续运行；`stop` 终止会话。
- 后台 AI 发起悬浮预览时，会先显示真实预览窗口再启动前台服务，以满足 Android 15 及更高版本的可见性要求；任一步失败都会停止本次新会话。

`start` 返回 `starting` 时用 `status` 继续检查，直到会话进入 `connected` 且 `has_frame=true`，才能认为画面已就绪。

## 截图

截图按钮和 `screenshot` 直接保存 Linux 帧缓冲，因此画面里不会出现 Android 工具栏，也不需要在 Linux 内安装截图工具。Android 10 及更高版本保存到 `Pictures/LyraCode`，旧版本保存到应用的外部图片目录，工具返回实际 URI 或路径。

## 在已有桌面上再启动程序

从同一环境的其他终端启动 X11 程序时，需要与会话一致的 `DISPLAY` 与 `XAUTHORITY`。使用会话日志顶部的两行环境变量，或 `status` 返回的 `environment_exports`：

```sh
export DISPLAY=:100
export XAUTHORITY=/path/to/session/Xauthority
gtk4-demo
```

不要把 Xauthority cookie 的内容贴进对话或截图。每次会话的 display 与 cookie 相互独立，不能跨会话复用。

**成功标志：** 桌面出现可操作的窗口管理器界面，能打开终端并运行 `xdpyinfo`；截图保存成功且画面中只有 Linux 桌面。

## 常见问题

- **启动即失败或黑屏：** 先调用 `linux_gui(action="guide")` 核对依赖，再读 `fallback_reason` 和会话日志。
- **提示 display 已被占用：** 清理上一轮的 X server 残留，或重启对应环境。
- **窗口出现但文字是方块：** 在 guest 内安装覆盖这些字符的字体。
- **悬浮窗不出现：** 检查「显示在其他应用上层」权限，或改为全屏模式。
- **音频没有声音：** 确认 guest 内 PulseAudio 或 PipeWire 可用，并检查应用没有被静音。
- **应用被系统回收后桌面消失：** 图形会话不随进程恢复，重新打开即可。
