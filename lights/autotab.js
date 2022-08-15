// https://stackoverflow.com/a/72358089

const tabs = document.querySelector('#nav-tab').querySelectorAll('button[data-bs-toggle="tab"]');

tabs.forEach(tab => {
  tab.addEventListener('shown.bs.tab', (event) => {
    const { target } = event;
    const { id: targetId } = target;

    saveTabId(targetId);
  });
});

const saveTabId = (selector) => {
  localStorage.setItem('activeTabId', selector);
};

const getTabId = () => {
  const activeTabId = localStorage.getItem('activeTabId');

  // if local storage item is null, show default tab
  if (!activeTabId) return;

  // call 'show' function
  const someTabTriggerEl = document.querySelector(`#${activeTabId}`)
  const tab = new bootstrap.Tab(someTabTriggerEl);

  tab.show();
};

getTabId();
