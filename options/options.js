function save() {
    const fields = document.getElementById('fields').value.split(',');

    const statusElem = document.getElementById('status');
    statusElem.textContent = 'Saving...';

    chrome.storage.sync.set({ fields: JSON.stringify(fields) }, () => {
        statusElem.textContent = 'Options saved.';
        setTimeout(() => {
            statusElem.textContent = '';
        }, 2000);
    });
}

const reset = () => {
    document.getElementById('fields').value = '@timestamp,@rawstring';
    save();
}

const restore = () => {
    chrome.storage.sync.get({ fields: JSON.stringify(["@timestamp", "@rawstring"]) }, (data) => {
        document.getElementById('fields').value = JSON.parse(data.fields).join(',');
    });
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);
document.getElementById('reset').addEventListener('click', reset);