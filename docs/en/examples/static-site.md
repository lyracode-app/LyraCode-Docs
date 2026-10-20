# Preview a static site

Goal: place a complete HTML file in the workspace and verify files, requests and JavaScript through the mini server. Node, Termux and Linux are unnecessary.

## Files

Download the [static-site ZIP](/examples/static-site.zip), extract it and place `index.html` in an empty workspace, or copy the complete source:

<<< ../../public/examples/static-site/index.html

## Run and verify

1. Select the directory containing `index.html` and check the mini-server root.
2. Start local HTTP and open the reported URL.
3. Confirm `Hello, Lyra Code!` and initial `Count: 0`.
4. Click three times to get `Count: 3`; refreshing should reset it to 0.
5. Check successful page requests and absence of related JavaScript errors.

These checks establish file origin, script execution and refresh behavior. State is in memory, without a database or local storage.

## Ask for a small change

> Add a Reset button to index.html in the current workspace that sets the count to 0. Keep the existing button, use plain JavaScript and install no dependencies. Read back the relevant code, show the diff and list browser acceptance steps.

Verify count three times → reset to 0 → click once to 1 → refresh to 0. If content is stale, check workspace, server root and refresh. For connectivity problems, see [Local services](/en/manual/local-services).
