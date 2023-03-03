import publishInterface from './publishInterface';

const createInterfaceManager = () => {
  const addProjectButton = document.querySelector('#add-project-button');
  const removeProjectButton = document.querySelector('#remove-project-button');

  const workspace = document.querySelector('#workspace');
  const projectTitle = workspace.querySelector('#workspace__title');
  const projectDescription = workspace.querySelector('#workspace__description');
  const itemInput = workspace.querySelector('#item-input');
  const addItemButton = workspace.querySelector('#add-item-button');

  const content = workspace.querySelector('#content');
  const projectsContainer = document.querySelector('#menu__projects');

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
    const title = itemInput.value;
    const data = {
      title,
      description: 'placeholder',
    };

    publishInterface.publish('add-item', data);

    itemInput.value = '';
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
      itemTemplate.classList.add('list-item');

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

  function renderWorkspace(project) {
    projectTitle.innerText = project.getTitle();
    projectDescription.innerText = project.getDescription();
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

    renderWorkspace(currentProject);
    renderItems(currentProject);

    renderProjects(projects);
    bindEvents();
  }

  function addItemWithKeyboard(event, key) {
    const chosenKey = key || 'Enter';
    if (event.key === chosenKey) addNewItem();
  }

  addItemButton.addEventListener('click', addNewItem);
  addProjectButton.addEventListener('click', addNewProject);
  removeProjectButton.addEventListener('click', removeProject);
  publishInterface.subscribe('render', render);

  workspace.addEventListener('keydown', addItemWithKeyboard);
};

export default createInterfaceManager;
