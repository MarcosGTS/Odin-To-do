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
  <div id='content'></div>
  <div>
    <input id='item-input'>
    <button id='add-item-button'>Add Item</button>
  </div>
`;

const menuHtml = document.createElement('div');
menuHtml.id = 'menu';

const projectsHtml = document.createElement('div');
projectsHtml.id = 'menu__projects';

const addProjectButtonHtml = document.createElement('button');
addProjectButtonHtml.id = 'add-project-button';
addProjectButtonHtml.innerText = 'Add project';

const removeProjectButtonHtml = document.createElement('button');
removeProjectButtonHtml.id = 'remove-project-button';
removeProjectButtonHtml.innerText = 'remove project';

document.body.appendChild(menuHtml);
menuHtml.appendChild(addProjectButtonHtml);
menuHtml.appendChild(removeProjectButtonHtml);
menuHtml.appendChild(projectsHtml);

document.body.appendChild(workspaceHtml);

createInterfaceManager();

(() => {
  const projects = [createProject(), createProject('teste')];
  let currentProject = projects[0];

  publishInterface.publish('render', { currentProject, projects });

  function addNewProject(data) {
    const { title } = data;
    const newProject = createProject(title);

    if (title) projects.push(newProject);

    publishInterface.publish('render', { currentProject, projects });
  }

  function removeProject() {
    const currentProjectIndex = projects.indexOf(currentProject);
    projects.splice(currentProjectIndex, 1);

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
  publishInterface.subscribe('remove-project', removeProject);
  publishInterface.subscribe('toggle-item', toggleItem);
})();
