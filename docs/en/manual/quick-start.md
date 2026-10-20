# Your first task

Verify the complete model → tool → workspace → result flow with a text file. You need the installed app, a working model API and an empty test directory. Termux, Linux and Root are unnecessary for this task.

## 1. Connect a model

Add a provider in Settings with its endpoint, API key and matching protocol. Enter an exact supported model ID and select it in the conversation. See [Models](/en/manual/models) for configuration details.

Ask for a short greeting. Once text works, confirm that the model supports tool calls and the app's file tools are enabled. Keep API keys out of ordinary messages.

## 2. Select a workspace

Create a conversation and choose an empty workspace such as `LyraDemo` in shared storage. Confirm access in Android's directory picker. A PRoot-internal directory requires a created and enabled Linux environment first.

> List the root of the current workspace without changing anything. Confirm whether the selected workspace is available.

**Success:** an actual directory tool call returns an empty directory or the expected files. A text claim that the directory is selected is insufficient.

## 3. Create and read back a file

> Create hello.txt in the current workspace containing Hello, Lyra Code! with a trailing newline. Read it back, verify the contents and report its relative path.

If approval is requested, verify the target is `hello.txt` before allowing it. Check the tool records and open the file in the file manager. Review the diff to confirm this is the only addition.

**Success:** the write completes, a subsequent read returns the expected text, and the file manager opens the same file.

## 4. Edit the file

> Replace Hello, Lyra Code! in hello.txt with My first verified task. Read it back and show the diff.

Confirm that only this line changed. For missing tools, paths or failed requests, use [Troubleshooting](/en/reference/troubleshooting) to identify the cause before increasing permissions.

Continue with the [static-site example](/en/examples/static-site), or configure [PRoot / Termux](/en/manual/commands) when you need dependencies, tests or a development server.
