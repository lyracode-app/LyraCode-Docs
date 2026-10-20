# MCP 客户端

客户端连接让 Lyra Code 调用外部 MCP 服务的工具。若要让电脑调用手机工具，请看[MCP 服务端](/manual/mcp-server)。

## 添加服务器

### 地址与传输

在设置的 MCP 连接入口添加 HTTP(S) 端点，选择服务支持的 Streamable HTTP 或 SSE。应用内配置接受 URL；只有 `command` 和 `args` 的 stdio 配置不能直接在这里运行，需要由相应服务提供 HTTP 端点。

### 鉴权与 JSON

填写服务要求的密钥或 Header。每个配置只接受一个服务器，可使用单节点或仅包含一个成员的 `mcpServers`。多个服务器分别添加；不要把多服务器桌面配置原样粘贴。

```json
{
  "mcpServers": {
    "example": {
      "url": "https://mcp.example.com/mcp",
      "headers": { "Authorization": "Bearer REPLACE_ME" }
    }
  }
}
```

上方地址和令牌均为占位值。完整配置与可导入文件见[MCP 示例](/examples/mcp)。

## 获取工具并调用

1. 保存并启用服务器，执行连接/刷新工具。
2. 确认列表显示真实工具名与参数。
3. 在对话请求一次只读调用，核对来源服务器与返回结果。

连接成功只证明协议可达；业务工具仍可能缺权限或依赖。修改地址、Header 或传输后重新刷新，避免继续使用旧工具缓存。

## 常见错误

- **解析失败：** 检查 JSON、字符串 Header、单服务器约束；同时填 `url` 和 `baseUrl` 时必须一致。
- **401/403：** 检查认证方式、令牌权限与有效期。
- **工具列表为空：** 核对服务是否提供 tools 能力，检查协议与传输类型。
- **工具可见但调用失败：** 查看参数 schema 和[日志](/manual/logs)，不要猜测远程路径或 ID。

实现与协议测试入口见[MCP 开发说明](/developer/mcp)。
