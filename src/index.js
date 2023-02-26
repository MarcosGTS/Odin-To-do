import createProject from './project';
import createItem from './item';
import createInterfaceManager from './intefaceManager';

const contentHtml = document.createElement('div');
contentHtml.id = 'content';
const addButtonHtml = document.createElement('button');
addButtonHtml.id = 'add-button';

document.body.appendChild(contentHtml);
document.body.appendChild(addButtonHtml);

const interfaceManager = createInterfaceManager();
const project = createProject();

(() => {
  const addButton = document.querySelector('#add-button');

  function addNewItem() {
    const newItem = createItem('test');
    project.addTodo(newItem);

    interfaceManager.publish('render', project);
  }

  function bindEvents() {
    addButton.addEventListener('click', addNewItem);
  }

  bindEvents();
})();
