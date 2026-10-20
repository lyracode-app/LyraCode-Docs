# Preview and web access

Choose a service by its purpose, then verify its status and actual URL.

| Goal | Mechanism | What it serves |
| --- | --- | --- |
| View HTML/CSS/JS in the workspace | Mini server | Static files under its configured root |
| Run Vite, Node or another backend | PRoot / Termux command | The project's own server process |
| Use phone conversations on a computer | Web access | Existing phone chats, history, Agent settings and uploads |

## Static preview

1. Select a workspace containing `index.html`; use the [complete example](/en/examples/static-site) if needed.
2. Check the mini-server root, protocol, bind address and port. Start with local HTTP.
3. Open the reported URL. `0.0.0.0` is a bind address, not a browser destination.
4. Refresh after edits and check request and JavaScript-error logs.
5. Stop the service when finished, or confirm the listening scope is appropriate.

**Success:** the latest page loads, resources succeed and interactions work. For 404s, check the server root and relative resource paths. The mini server does not execute Node, Python or PHP backends; start the project's own process for those.

HTTPS requires a configured certificate and private key. Verify local HTTP first to separate certificate problems from file-serving problems.

## Project development server

Install the project's dependencies in the correct Linux/Termux directory, then use its documented command. Run persistently in background mode and keep the output path. Verify the phone-local port before adjusting listening addresses for LAN access.

If the port is occupied, stop a known previous instance or choose another port. A returned launch call is not a health check. Build output can also be previewed through the mini server.

## Access phone conversations from a computer

1. Configure Web access in Settings, including bind address, port and access code.
2. Start it and open the phone's reported LAN URL from a computer that can reach it.
3. Enter the access code and check the conversation list. Browser and phone share one controller and state.
4. Keep the phone app running; this service keeps the screen awake. Stop web access afterward.

Web access uses HTTP. Its code authenticates access but does not encrypt traffic; use a trusted network and avoid direct public exposure. `127.0.0.1` is phone-local only. Android local-network permission, AP isolation and firewalls can block cross-device connections.
