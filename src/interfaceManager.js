import publishInterface from './publishInterface';

const createInterfaceManager = () => {
  const menu = document.querySelector('#menu');
  const addProjectButton = menu.querySelector('#add-project-button');
  const projectInput = menu.querySelector('#project-input');
  const projectsContainer = menu.querySelector('#menu__projects');

  const workspace = document.querySelector('#workspace');
  const projectTitle = workspace.querySelector('#workspace__title');
  const projectDescription = workspace.querySelector('#workspace__description');
  const itemInput = workspace.querySelector('#item-input');
  const addItemButton = workspace.querySelector('#add-item-button');
  const displayProjectModalBtn = workspace.querySelector('#workspace__edit-button');

  const projectModalWrapper = document.querySelector('#project-modal-wrapper');
  const projectModal = document.querySelector('#project-modal');
  const projectModalTitle = projectModal.querySelector('#project-modal-title');
  const projectMotalDescription = projectModal.querySelector('#project-modal-description');
  const projectModalEditBtn = projectModal.querySelector('#project-modal-confirm');
  const projectModalCancelBtn = projectModal.querySelector('#project-modal-cancel');

  const itemModalWrapper = document.querySelector('#item-modal-wrapper');
  const itemModal = document.querySelector('#item-modal');
  const itemModalTitle = itemModal.querySelector('#item-modal-title');
  const itemModalDescription = itemModal.querySelector('#item-modal-description');
  const itemModalPriority = itemModal.querySelector('#item-modal-priority');
  const itemModalDate = itemModal.querySelector('#item-modal-duedate');
  const itemModalEditBtn = itemModal.querySelector('#item-modal-confirm');
  const itemModalCancelBtn = itemModal.querySelector('#item-modal-cancel');

  const content = workspace.querySelector('#content');

  function getRelativeIndex(node, id = 'content') {
    const parent = node.parentNode;
    if (!parent) return -1;
    if (parent.id === id) {
      return [...parent.children].indexOf(node);
    }
    return getRelativeIndex(parent, id);
  }

  function showModal(modalWrapper) {
    modalWrapper.classList.add('show');
  }

  function hiddeModal(modalWrapper, event) {
    if (event) event.preventDefault();
    modalWrapper.classList.remove('show');
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
    const itemIndex = getRelativeIndex(target);

    publishInterface.publish('remove-item', itemIndex);
  }

  function toggleItem(event) {
    const { target } = event;
    const itemIndex = getRelativeIndex(target);

    publishInterface.publish('toggle-item', itemIndex);
  }

  function editItem(event) {
    if (itemModal.checkValidity()) {
      event.preventDefault();
      const itemIndex = itemModal.dataset.index;
      const title = itemModalTitle.value;
      const description = itemModalDescription.value;
      const priority = itemModalPriority.value;
      const date = itemModalDate.value;

      const data = {
        itemIndex,
        title,
        description,
        priority,
        date,
      };
      publishInterface.publish('edit-item', data);
      hiddeModal(itemModalWrapper);
    }
  }
  function loadItemModal(item, index) {
    itemModal.dataset.index = index;
    itemModalTitle.value = item.getTitle();
    itemModalDescription.value = item.getDescription();
    itemModalPriority.value = item.getPriority();
    itemModalDate.value = item.getDuedate();
  }

  function renderItems(project) {
    function createItemNode(item, index) {
      const itemTemplate = document.createElement('div');
      itemTemplate.classList.add('list-item');

      itemTemplate.innerHTML = `
        <input type='radio' class='item-state' name='list-item' id='item-${index}'>
        <label for=item-${index} class='item-content priority-${item.getPriority()}'>
          <div class='item-resume'>
            <button class='item-toggle' data-checked='${item.isComplete()}'></button>
            <h3 class='item-title'>${item.getTitle()}</h3>
            <div class='item-button-section'>
              <button class='edit-btn'><i class='fa-solid fa-pen-to-square fa-xl'></i></button>
              <button class="remove-btn"><i class='fa-solid fa-xmark fa-xl'></i></button>
            </div>
          </div>
          <div class='item-more-info'>
          ${item.getFormatedDate() ? `<div class='item-date'>${item.getFormatedDate()}</div>` : ''}
          ${item.getDescription() ? `<p class='item-description'>${item.getDescription()}</div>` : ''}
          </div>
        </label>
      `;
      return itemTemplate;
    }

    project.getItems().forEach((item, index) => {
      const newItem = createItemNode(item, index);
      content.appendChild(newItem);
    });
  }

  function addNewProject() {
    const title = projectInput.value;
    const data = {
      title,
      description: 'Algum texto descrevendo o projeto',
    };
    publishInterface.publish('add-project', data);
    projectInput.value = '';
  }

  function removeProject(event) {
    const { target } = event;
    const itemIndex = getRelativeIndex(target, 'menu__projects');
    publishInterface.publish('remove-project', itemIndex);
  }

  function changeProject(event) {
    const { target } = event;
    const itemIndex = getRelativeIndex(target, 'menu__projects');

    publishInterface.publish('change-project', itemIndex);
  }

  function loadProjectModal(project) {
    // modal appear
    projectModalTitle.value = project.getTitle();
    projectMotalDescription.value = project.getDescription();
  }

  function editProject(event) {
    if (projectModal.checkValidity()) {
      event.preventDefault();
      const title = projectModalTitle.value;
      const description = projectMotalDescription.value;
      const data = {
        title,
        description,
      };
      publishInterface.publish('edit-project', data);

      hiddeModal(projectModalWrapper);
    }
  }

  function renderProjects(crrProject, projects) {
    function createProjectButton(project) {
      const projectTemplate = document.createElement('div');
      projectTemplate.classList.add('project-tab');

      projectTemplate.innerHTML = `
        <span class='project-tab-title'>${project.getTitle()}</span>
        <button class='project-tab-remove'>
         <i class='fa-solid fa-xmark'></i>
        </button>
      `;

      if (crrProject === project) {
        projectTemplate.classList.add('selected');
      }
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

  function bindEvents({ currentProject }) {
    const itemRemoveBtns = [...content.querySelectorAll('.remove-btn')];
    const itemEditBtns = [...content.querySelectorAll('.edit-btn')];
    const checkboxes = [...content.querySelectorAll('.item-toggle')];
    const projectBtns = [...projectsContainer.querySelectorAll('.project-tab')];
    const projectTabRemoveBtns = [...projectsContainer.querySelectorAll('.project-tab-remove')];

    displayProjectModalBtn.addEventListener('click', () => loadProjectModal(currentProject));
    itemRemoveBtns.forEach((btn) => btn.addEventListener('click', removeItem));
    checkboxes.forEach((item) => item.addEventListener('click', toggleItem));
    projectBtns.forEach((btn) => btn.addEventListener('click', changeProject));
    projectTabRemoveBtns.forEach((btn) => btn.addEventListener('click', removeProject));
    itemEditBtns.forEach((btn) => btn.addEventListener('click', () => showModal(itemModalWrapper)));

    currentProject.getItems().forEach((item, index) => {
      const button = itemEditBtns[index];
      button.addEventListener('click', () => loadItemModal(item, index));
    });
  }

  function render(data) {
    const { currentProject, projects } = data;

    projectsContainer.innerHTML = '';
    content.innerHTML = '';

    renderWorkspace(currentProject);
    renderItems(currentProject);

    renderProjects(currentProject, projects);
    bindEvents({ currentProject });
  }

  function cleanField(event, exception) {
    const { target } = event;
    if (event.relatedTarget !== exception) target.value = '';
  }

  function callFuncWithKeyboard(event, callback) {
    if (event.key === 'Enter') callback();
  }

  publishInterface.subscribe('render', render);

  itemInput.addEventListener('focusout', (e) => cleanField(e, addItemButton));
  projectInput.addEventListener('focusout', (e) => cleanField(e, addProjectButton));

  addItemButton.addEventListener('click', addNewItem);
  itemModalEditBtn.addEventListener('click', editItem);
  addProjectButton.addEventListener('click', addNewProject);
  projectModalEditBtn.addEventListener('click', editProject);

  itemModalCancelBtn.addEventListener('click', (e) => hiddeModal(itemModalWrapper, e));

  displayProjectModalBtn.addEventListener('click', () => showModal(projectModalWrapper));
  projectModalCancelBtn.addEventListener('click', (e) => hiddeModal(projectModalWrapper, e));

  workspace.addEventListener('keydown', (e) => callFuncWithKeyboard(e, addNewItem));
  menu.addEventListener('keydown', (e) => callFuncWithKeyboard(e, addNewProject));
};

export default createInterfaceManager;
