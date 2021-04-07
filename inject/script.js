const fn = () => {
    // Preferences injected to global variable in injector.js
    /** @type {string[]} */
    const fields = _domdomegg_hcs_fields;

    if (!Array.isArray(fields) || fields.some(f => typeof f !== "string") || fields.length == 0) {
        throw new Error('Invalid preferences');
    }

    // Do nothing if the correct selection is already set
    if (new URLSearchParams(window.location.search).has('columns')) {
        const cols = new URLSearchParams(window.location.search).get('columns').split(',').map(x => x.slice(0, x.lastIndexOf('::')));
        if (fields.every((id, i) => id == cols[i])) {
            console.log('Desired columns already set');
            return;
        }
    }

    const elmEntryPoint = document.querySelector('.event-list-fields-tab__table--added td:last-of-type button').elmFs.click;

    /** @param {string} id */
    const deactivate = (id) => {
        console.log('Deactivating ' + id);
        elmEntryPoint.q.a.g[0].a.a = id;
        elmEntryPoint.q.a.g[0].a.$ = 7;
        elmEntryPoint({ stopPropagation: () => { } });
    }

    /** @param {string} id */
    const activate = (id) => {
        console.log('Activating ' + id);
        elmEntryPoint.q.a.g[0].a.a = id;
        elmEntryPoint.q.a.g[0].a.$ = 6;
        elmEntryPoint({ stopPropagation: () => { } });
    }

    activate(fields[0]);

    const activated = [...document.getElementsByClassName('event-list-fields-tab__table--added')[0].getElementsByClassName('group')].map(x => x.id.slice(0, -4));
    for (const id of activated) {
        if (id != fields[0]) {
            deactivate(id);
        }
    }

    for (const id of fields.slice(1)) {
        activate(id);
    }
}

const isSearchPage = (href) => /https?:\/\/cloud\.humio\.com\/.*\/search(\?.*)?/.test(href);

let previousUrl = '', checkForSearchPageLoadInterval;
const checkForPageChange = () => {
    if (previousUrl != window.location.href) {
        previousUrl = window.location.href;
        if (isSearchPage(previousUrl)) {
            if (!checkForSearchPageLoadInterval) {
                checkForSearchPageLoadInterval = setInterval(() => {
                    if (!!document.getElementsByClassName('event-list-fields-tab__table--available')[0]) {
                        clearInterval(checkForSearchPageLoadInterval);
                        fn();
                    }
                }, 250);
            }
        } else if (checkForSearchPageLoadInterval) {
            clearInterval(checkForSearchPageLoadInterval);
            checkForSearchPageLoadInterval = undefined;
        }
    }
};

const checkForPageChangeInterval = setInterval(checkForPageChange, 500);
checkForPageChange();