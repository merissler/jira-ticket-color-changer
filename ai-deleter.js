function unwrap(el) {
    var parent = el.parentNode;
    while (el.firstChild) {
        parent.insertBefore(el.firstChild, el);
    }
    parent.removeChild(el);
}

function onAcronym(el) {
    unwrap(el);
}

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
                if (node.classList.contains("acronym-highlight")) {
                    onAcronym(node);
                }

                var list = node.querySelectorAll(".acronym-highlight");
                list.forEach(function (item) {
                    onAcronym(item);
                });
            }
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// In case some are already on page:
document.querySelectorAll(".acronym-highlight").forEach(function (item) {
    onAcronym(item);
});
