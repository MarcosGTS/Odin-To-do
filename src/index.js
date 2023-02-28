import createProject from './project';
import createItem from './item';
import publishInterface from './publishInterface';
import createInterfaceManager from './intefaceManager';

const contentHtml = document.createElement('div');
contentHtml.id = 'content';
const addButtonHtml = document.createElement('button');
addButtonHtml.id = 'add-button';
addButtonHtml.innerHTML = 'Add item';

document.body.appendChild(addButtonHtml);
document.body.appendChild(contentHtml);

createInterfaceManager();

const project = createProject();

(() => {
  function addNewItem() {
    const newItem = createItem('test');
    project.addTodo(newItem);
    publishInterface.publish('render', project);
  }

  publishInterface.subscribe('add-item', addNewItem);
})();
