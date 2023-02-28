import publishInterface from './publishInterface';

const createInterfaceManager = () => {
  const addButton = document.querySelector('#add-button');
  const content = document.querySelector('#content');

  function addNewItem() {
    const data = {
      title: 'came from interface manager',
      description: 'placeholder',
    };
    publishInterface.publish('add-item', data);
  }

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
    addButton.addEventListener('click', addNewItem);
  }

  bindEvents();

  publishInterface.subscribe('render', render);
};

export default createInterfaceManager;
