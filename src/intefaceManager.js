const createInterfaceManager = () => {
  const content = document.querySelector('#content');
  const publications = {};

  function render(project) {
    content.innerHTML = '';
    console.log(project);
    project.getItems().forEach((item) => {
      const itemTemplate = document.createElement('div');
      itemTemplate.innerHTML = `
        <h3>${item.getTitle()}</h3>
      `;
      content.appendChild(itemTemplate);
    });
  }

  function subscribe(eventName, callback) {
    if (!publications[eventName]) {
      publications[eventName] = [];
    }

    publications[eventName].push(callback);
  }

  function publish(eventName, data) {
    const subscribers = publications[eventName];
    if (!subscribers) return;

    subscribers.forEach((subscriber) => subscriber(data));
  }

  subscribe('render', render);

  return {
    publish,
    subscribe,
  };
};

export default createInterfaceManager;
