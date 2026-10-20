# 创建并预览静态网页

目标：把一个完整 HTML 文件放进工作区，通过微型服务器验证文件、网络与 JavaScript。无需 Node、Termux 或 Linux。

## 准备文件

下载[静态网页 ZIP](/examples/static-site.zip)，解压后将 `index.html` 放入一个空工作区。也可复制下面的完整文件：

<<< ../public/examples/static-site/index.html

## 启动与验收

1. 选择包含 `index.html` 的工作区，在微型服务器设置中核对根目录。
2. 使用本机 HTTP 地址启动，打开状态中报告的 URL。
3. 页面应显示 `Hello, Lyra Code!` 和初始 `Count: 0`。
4. 点击按钮三次，应显示 `Count: 3`；刷新后恢复为 0。
5. 查看日志，确认页面请求成功，且没有相关 JavaScript 错误。

这组步骤分别验证了文件来源、脚本运行和刷新行为。计数保存在内存中，未使用数据库或本地存储。

## 让 AI 做一次小改动

> 在当前工作区的 index.html 中增加一个“重置”按钮，将计数设为 0。保留原按钮，使用原生 JavaScript，不安装依赖。修改后读回相关代码，展示 Diff，并列出我需要在浏览器执行的验证步骤。

验收应包含“计数三次 → 重置为 0 → 再点击变成 1 → 刷新恢复 0”。如果页面未更新，先核对工作区、服务目录和刷新；连接失败按[本地服务](/manual/local-services)排查。
