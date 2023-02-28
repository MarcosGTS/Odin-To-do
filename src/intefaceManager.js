import publishInterface from './publishInterface';

const createInterfaceManager = () => {
  const addButton = document.querySelector('#add-button');
  const content = document.querySelector('#content');

  function render(project) {
    content.innerHTML = '';
    project.getItems().forEach((item) => {
      const itemTemplate = document.createElement('div');
      itemTemplate.innerHTML = `
        <h3>${item.getTitle()}</h3>
      `;
      content.appendChild(itemTemplate);
    });
  }

  function bindEvents() {
    addButton.addEventListener('click', () => publishInterface.publish('add-item'));
  }

  bindEvents();

  publishInterface.subscribe('render', render);
};

export default createInterfaceManager;
