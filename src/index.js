import './style.css';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import createProject from './project';
import createItem from './item';
import publishInterface from './publishInterface';
import createInterfaceManager from './interfaceManager';

const workspaceHtml = document.createElement('div');
workspaceHtml.id = 'workspace';
workspaceHtml.innerHTML = `
  <div class='project-info'>
    <div class='conteiner'>
    <h1 id='workspace__title'></h1>
    <button id='workspace__edit-button'><i class='fa-solid fa-pen-to-square fa-xl'></i></button>
    </div>
    <p id='workspace__description'></p>
  </div>
  <div id='content'></div>
  <div class='input-section'>
    <input id='item-input' placeholder='Add item'>
    <button id='add-item-button'>
      <i class='fa-solid fa-plus'></i>
    </button>
  </div>
`;

const menuHtml = document.createElement('div');
menuHtml.id = 'menu';
menuHtml.innerHTML = `
  <div id='menu__projects'></div>
  <div class='input-section'>
    <input id='project-input' placeholder='Add Project'>
    <button id='add-project-button'>
    <i class='fa-solid fa-plus'></i>
    </button>
  </div>
`;

const projectModal = document.createElement('div');
projectModal.id = 'project-modal-wrapper';
projectModal.classList.add('modal-wrapper');
projectModal.innerHTML = `
<div id='project-modal' class='modal'>
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
    <button id='project-modal-cancel'>Cancel</button>
  </div>
</div>
`;

const itemModal = document.createElement('div');
itemModal.id = 'item-modal-wrapper';
itemModal.classList.add('modal-wrapper');
itemModal.classList.add('show');
itemModal.innerHTML = `
<div id='item-modal' class='modal'>
  <div>
    <label for='item-modal-title'>Title:</label>
    <input id='item-modal-title' type='text'>
  </div>
  <div>
    <label for='item-modal-description'>Description:</label>
    <textarea id='item-modal-description'></textarea>
  </div>
  <div>
    <labe for='item-modal-priority'>Priority:</label>
    <input id='item-modal-priority' type='range' min='0' max='2'>
  </div>
  <div>
    <label for='item-modal-duedate'>Due-date:</label>
    <input id='item-modal-duedate' type='date'>
  </div>
  <div>
    <button id='item-modal-confirm'>Confirm</button>
    <button id='item-modal-cancel'>Cancel</button>
  </div>
</div>
`;

document.body.appendChild(menuHtml);
document.body.appendChild(workspaceHtml);
document.body.appendChild(itemModal);
document.body.appendChild(projectModal);

createInterfaceManager();

(() => {
  const projects = [createProject(), createProject('teste')];
  let currentProject = projects[0];

  currentProject.addTodo(createItem('teste'));
  currentProject.addTodo(createItem('marcos'));
  currentProject.addTodo(createItem('ir para academia'));

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

  function editItem(data) {
    const {
      itemIndex,
      title,
      description,
      priority,
      date,
    } = data;

    const item = currentProject.getItem(itemIndex);
    item.setTitle(title);
    item.setDescription(description);
    item.setPriority(priority);
    item.setDueDate(date);

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
  publishInterface.subscribe('edit-item', editItem);
  publishInterface.subscribe('remove-item', removeItem);
  publishInterface.subscribe('change-project', changeProject);
  publishInterface.subscribe('add-project', addNewProject);
  publishInterface.subscribe('edit-project', editProject);
  publishInterface.subscribe('remove-project', removeProject);
  publishInterface.subscribe('toggle-item', toggleItem);
})();
