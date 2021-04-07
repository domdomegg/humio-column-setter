chrome.storage.sync.get({ fields: JSON.stringify(["@timestamp", "@rawstring"]) }, (data) => {
    // Inject preferences
    const s1 = document.createElement('script');
    s1.textContent = `_domdomegg_hcs_fields = ${data.fields};`;
    (document.head||document.documentElement).appendChild(s1);
    s1.remove();

    // Inject script to run in page context
    const s2 = document.createElement('script');
    s2.src = chrome.runtime.getURL('inject/script.js');
    s2.onload = s2.remove;
    (document.head || document.documentElement).appendChild(s2);
});