# Sidebar files and dual panes

Files in the sidebar opens a separate file manager for organizing device files, copying or moving between directories and opening the editor. Agent project access is determined separately by the [workspace](/en/manual/workspaces).

## Open Files

Grant the file access requested by the page and refresh the directory. All files access, legacy storage permissions and system directory grants are distinct. Some Android directories remain restricted even with permission.

## Use two panes

### Browse and select

Each pane can open a different directory. Activate the intended pane, check its path and select files. Verify the selected count before a batch action.

### Copy and move

Put source files in one pane and the destination directory in the other. Copy retains the source; move changes its location. Refresh both panes and open the destination file to verify results. Inspect name conflicts and permission errors before retrying.

### File menus

Depending on type, menus offer rename, properties, open with, extraction, HTML preview and deletion. Check paths before deleting or performing batch actions. Use version control for project history.

## PRoot and privileged access

The file page offers a PRoot instance entry. Check the Linux ID before editing environment files. For project work, select that instance's project workspace.

Privileged access can test Root or Shizuku Shell. Available access depends on actual authorization and test results, rather than the switch alone.

## Open and edit

Open text in the [code editor](/en/manual/editor), or use the available preview/open-with action for other files. See [project previews](/en/manual/local-services) for HTML. Browsing a directory does not select it as the Agent workspace.

## Practice and diagnose

Copy a test file between panes, verify its content, then rename or delete the copy. For failures, check destination write access, free space and Android restrictions. If the Agent cannot find it, check the conversation workspace and relative path.
