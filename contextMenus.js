chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "runInkOnWiki",
    title: "Run Ink on Wiki",
    contexts: ["all"],
    documentUrlPatterns: ["https://wiki.hclcat.games/*"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "runInkOnWiki") {
    chrome.tabs.sendMessage(tab.id, { action: "runInkOnWiki" });
  }
});
