import createProject from './project';
import createItem from './item';
import publishInterface from './publishInterface';
import createInterfaceManager from './intefaceManager';

const contentHtml = document.createElement('div');
contentHtml.id = 'content';

const menuHtml = document.createElement('div');
menuHtml.id = 'menu';

const projectsHtml = document.createElement('div');
projectsHtml.id = 'projects-conteiner';

const addProjectButtonHtml = document.createElement('button');
addProjectButtonHtml.id = 'add-project-button';
addProjectButtonHtml.innerText = 'Add project';

const removeProjectButtonHtml = document.createElement('button');
removeProjectButtonHtml.id = 'remove-project-button';
removeProjectButtonHtml.innerText = 'remove project';

const addItemButtonHtml = document.createElement('button');
addItemButtonHtml.id = 'add-item-button';
addItemButtonHtml.innerHTML = 'Add item';

document.body.appendChild(menuHtml);
menuHtml.appendChild(addProjectButtonHtml);
menuHtml.appendChild(removeProjectButtonHtml);
menuHtml.appendChild(projectsHtml);

document.body.appendChild(addItemButtonHtml);
document.body.appendChild(contentHtml);

createInterfaceManager();

(() => {
  const projects = [createProject(), createProject('teste')];
  let currentProject = projects[0];

  publishInterface.publish('render', { currentProject, projects });

  function addNewProject(data) {
    const { title } = data;
    const newProject = createProject(title);
    projects.push(newProject);

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
    currentProject.addTodo(newItem);
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
})();
