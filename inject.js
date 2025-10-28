var lastRightClickedCodeBlockText = "";

chrome.runtime?.onMessage?.addListener((message, sender, sendResponse) => {
    const text = lastRightClickedCodeBlockText;
    if (message.action === "runInkOnWiki" && text) {
        const url = `https://gyc.hclcat.games/ink/preview/index.html?story=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
        lastRightClickedCodeBlockText = "";
    }
});

document.addEventListener("contextmenu", (event) => {
    const target = event.target;
    const codeBlock = findAncestorWithClass(target, "code-block with-line-numbers");
    if (codeBlock) {
        const text = codeBlock.innerText.trim();
        lastRightClickedCodeBlockText = text;
    }
});

function findAncestorWithClass(element, className) {
    while (element && element !== document.body) {
        if (element.classList && element.classList.contains("code-block") && element.classList.contains("with-line-numbers")) {
            return element;
        }
        element = element.parentElement;
    }
    return null;
}
