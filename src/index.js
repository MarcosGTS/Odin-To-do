import './style.css';

import createProject from './project';
import createItem from './item';
import publishInterface from './publishInterface';
import createInterfaceManager from './interfaceManager';

const workspaceHtml = document.createElement('div');
workspaceHtml.id = 'workspace';
workspaceHtml.innerHTML = `
  <h1 id='workspace__title'></h1>
  <p id='workspace__description'></p>
  <button id='workspace__edit-button'>Edit</button>
  <div id='content'></div>
  <div>
    <input id='item-input'>
    <button id='add-item-button'>Add Item</button>
  </div>
`;

const menuHtml = document.createElement('div');
menuHtml.id = 'menu';
menuHtml.innerHTML = `
  <div id='menu__projects'></div>
  <div>
    <input id='project-input'>
    <button id='add-project-button'>Add Project</button>
  </div>
  <button>Add projects</button>
`;

const projectEditModal = document.createElement('form');
projectEditModal.id = 'project-modal';
projectEditModal.classList.add('modal');
projectEditModal.innerHTML = `
  <div>
    <label for='project-modal-title'>Title:</label>
    <input id='project-modal-title' type='text'>
  </div>
  <div>
    <label for='project-modal-description'>Description:</label>
    <textarea id='project-modal-description'></textarea>
  </div>
  <div>
    <button id='project-modal-confirm'>Confirm</button>
    <button>Cancel</button>
  </div>
`;

const itemEditModal = document.createElement('form');
itemEditModal.id = 'item-modal';
itemEditModal.classList.add('modal');
itemEditModal.innerHTML = `
  <div>
    <label for='item-modal-title'>Title:</label>
    <input id='item-modal-title' type='text'>
  </div>
  <div>
    <label for='item-modal-description'>Description:</label>
    <textarea id='item-modal-description'></textarea>
  </div>
  <div>
    <input type='range' min='0' max='3'>
  </div>
  <div>
    <input type='date'>
  </div>
`;

document.body.appendChild(menuHtml);
document.body.appendChild(workspaceHtml);
document.body.appendChild(projectEditModal);

createInterfaceManager();

(() => {
  const projects = [createProject(), createProject('teste')];
  let currentProject = projects[0];

  publishInterface.publish('render', { currentProject, projects });

  function addNewProject(data) {
    const { title, description } = data;
    const newProject = createProject(title, description);

    if (title) projects.push(newProject);

    publishInterface.publish('render', { currentProject, projects });
  }

  function editProject({ title, description }) {
    currentProject.setTitle(title);
    currentProject.setDescription(description);

    publishInterface.publish('render', { currentProject, projects });
  }

  function removeProject(projectIndex) {
    projects.splice(projectIndex, 1);
    publishInterface.publish('render', { currentProject, projects });
  }

  function addNewItem(data) {
    const { title, description } = data;
    const newItem = createItem(title, description);

    if (title) currentProject.addTodo(newItem);
    publishInterface.publish('render', { currentProject, projects });
  }

  function toggleItem(data) {
    const targetItem = currentProject.getItem(data);
    targetItem.toggleCompletion();
    publishInterface.publish('render', { currentProject, projects });
  }

  function removeItem(data) {
    currentProject.removeTodo(data);
    publishInterface.publish('render', { currentProject, projects });
  }

  function changeProject(data) {
    currentProject = projects[data] || currentProject;
    publishInterface.publish('render', { currentProject, projects });
  }

  publishInterface.subscribe('add-item', addNewItem);
  publishInterface.subscribe('remove-item', removeItem);
  publishInterface.subscribe('change-project', changeProject);
  publishInterface.subscribe('add-project', addNewProject);
  publishInterface.subscribe('edit-project', editProject);
  publishInterface.subscribe('remove-project', removeProject);
  publishInterface.subscribe('toggle-item', toggleItem);
})();
