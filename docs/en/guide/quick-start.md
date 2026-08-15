---
title: Quick Start
---

# Quick Start

This guide walks you through configuring your first API provider in Lyra Code and completing your first conversation.

## 1. Open the sidebar

After installing and opening the app, the page you see is the chat page. Now:

- **Swipe from left to right**, or
- Tap the **top-left corner** of the chat page to open the sidebar

In the sidebar, find the **Settings** option with the **gear icon**.

## 2. Enter model services

In the Settings page, the second entry from the top is **Model Services**. Tap it to enter the model services page.

## 3. Choose a model provider

On the model services page, tap the **`+` button in the top-right corner** to open the provider selection page. Here you can pick a **preset model provider**.

## 4. Get an API key

Using a preset provider requires that provider's API key. The app has built-in jump links — you can tap the provider's link right inside the app to go straight to its official website or console page. Then follow the provider's instructions to get an API key (not covered in this guide).

::: danger Security reminder
Treat your API key like your WeChat/Alipay payment password — **never share it**. Your API key and passwords are **encrypted and stored locally**; they are never uploaded to Lyra Code's servers.

(The built-in jump links exist so you don't accidentally land on pirated sites carrying the Silver Fox virus when searching on your own.)
:::

## 5. Complete the provider configuration

Once you have the API key:

1. Tap the preset provider to enter its **configuration page**.
2. Paste your API key.
3. Tap **Refresh model list** below.
4. Select the model you want to use and **add it to the enabled models list**.
5. Tap **Save**.

The provider configuration is complete.

## 6. Switch providers and models

Back on the chat page, tap the **`+` button at the bottom-right of the input box** to open the **bottom action panel**. Here you can select your provider and model, and switch anytime during later conversations.

## 7. Send your first greeting

Say "Hello"!

## Possible issues

### 1. My provider is not in the preset list

You can choose a **custom provider**. You'll need to get the API key, API format, base URL and other configuration from the provider's website yourself, fill them into the config, then continue with the same steps as above.

### 2. Cannot fetch the model list / cannot connect

- Some providers don't support fetching the model list — you can **fill in models manually**.
- If you can't connect, check the API key, base URL and path for typos, and whether your local network can reach the provider's API server.

### 3. No selectable model in the chat

99% of the time it's because you forgot to **add the model to the enabled models list** — re-check step 5 above.

### 4. Other chat errors

The causes are complex; try copying the error message into another AI. Failed conversations show the specific failure reason on the page.
