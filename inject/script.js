const fn = () => {
    if (!Array.isArray(wanted) || wanted.length == 0) {
        throw new Error('Invalid preferences');
    }

    // Do nothing if the correct selection is already set
    if (new URLSearchParams(window.location.search).has('columns')) {
        cols = new URLSearchParams(window.location.search).get('columns').split(',').map(x => x.slice(0, x.lastIndexOf('::')));
        if (Array.isArray(wanted) && wanted.every((id, i) => id == cols[i])) {
            console.log('Desired columns already set');
            return;
        }
    }

    elmEntryPoint = document.getElementsByClassName('event-list-fields-tab__table--added')[0].getElementsByClassName('event-list-fields-tab__button')[0].elmFs.click;

    deactivate = (id) => {
        console.log('Deactivating ' + id);
        elmEntryPoint.q.a.a.a.a = id;
        elmEntryPoint.q.a.a.a.$ = 7;
        elmEntryPoint({ stopPropagation: () => { } });
    }

    activate = (id) => {
        console.log('Activating ' + id);
        elmEntryPoint.q.a.a.a.a = id;
        elmEntryPoint.q.a.a.a.$ = 6;
        elmEntryPoint({ stopPropagation: () => { } });
    }

    activate(wanted[0]);

    activated = [...document.getElementsByClassName('event-list-fields-tab__table--added')[0].getElementsByClassName('event-list-fields-tab__field-row')].map(x => x.id.slice(0, -4));
    for (id of activated) {
        if (id != wanted[0]) {
            deactivate(id);
        }
    }

    for (id of wanted.slice(1)) {
        activate(id);
    }
}

const interval = setInterval(() => {
    if (!!document.getElementsByClassName('event-list-fields-tab__table--available')[0]) {
        clearInterval(interval);
        fn();
    }
}, 50);