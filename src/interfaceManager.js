import publishInterface from './publishInterface';

const createInterfaceManager = () => {
  const addItemButton = document.querySelector('#add-item-button');
  const addProjectButton = document.querySelector('#add-project-button');
  const removeProjectButton = document.querySelector('#remove-project-button');
  const content = document.querySelector('#content');
  const projectsContainer = document.querySelector('#projects-conteiner');

  function addNewProject() {
    const data = {
      title: 'came from inter manager',
    };
    publishInterface.publish('add-project', data);
  }

  function removeProject() {
    publishInterface.publish('remove-project');
  }

  function addNewItem() {
    const data = {
      title: 'came from interface manager',
      description: 'placeholder',
    };
    publishInterface.publish('add-item', data);
  }

  function removeItem(event) {
    const { target } = event;
    const itemNode = target.parentNode;
    const parent = itemNode.parentNode;
    const itemIndex = [...parent.children].indexOf(itemNode);

    publishInterface.publish('remove-item', itemIndex);
  }

  function renderItems(project) {
    function createItemNode(item) {
      const itemTemplate = document.createElement('div');

      itemTemplate.innerHTML = `
        <input type='checkbox' class='item-toggle'
          ${item.isComplete() ? 'checked' : ''}>
        <h3>${item.getTitle()}</h3>
        <button class="remove-btn">x</button>
      `;

      return itemTemplate;
    }

    project.getItems().forEach((item) => {
      const newItem = createItemNode(item);
      content.appendChild(newItem);
    });
  }

  function toggleItem(event) {
    const { target } = event;
    const itemNode = target.parentNode;
    const parent = itemNode.parentNode;
    const itemIndex = [...parent.children].indexOf(itemNode);

    publishInterface.publish('toggle-item', itemIndex);
  }

  function changeProject(event) {
    const { target } = event;
    const parent = target.parentNode;
    const index = [...parent.children].indexOf(target);

    publishInterface.publish('change-project', index);
  }

  function renderProjects(projects) {
    function createProjectButton(project) {
      const projectTemplate = document.createElement('button');
      projectTemplate.classList.add('project-tab');
      projectTemplate.innerText = project.getTitle();
      return projectTemplate;
    }

    projects.forEach((project) => {
      const projectNode = createProjectButton(project);
      projectsContainer.appendChild(projectNode);
    });
  }

  function bindEvents() {
    const closeBtns = [...content.querySelectorAll('.remove-btn')];
    const checkboxes = [...content.querySelectorAll('.item-toggle')];
    const projectBtns = [...projectsContainer.querySelectorAll('.project-tab')];

    closeBtns.forEach((btn) => btn.addEventListener('click', removeItem));
    projectBtns.forEach((btn) => btn.addEventListener('click', changeProject));
    checkboxes.forEach((item) => item.addEventListener('input', toggleItem));
  }

  function render(data) {
    const { currentProject, projects } = data;

    projectsContainer.innerHTML = '';
    content.innerHTML = '';

    renderItems(currentProject);
    renderProjects(projects);
    bindEvents();
  }

  addItemButton.addEventListener('click', addNewItem);
  addProjectButton.addEventListener('click', addNewProject);
  removeProjectButton.addEventListener('click', removeProject);
  publishInterface.subscribe('render', render);
};

export default createInterfaceManager;
