import createProject from './project';
import createItem from './item';

function decodedItem(itemJson) {
  const {
    title,
    description,
    dueDate,
    priority,
    complete,
  } = itemJson;

  return createItem(title, description, priority, dueDate, complete);
}

function decodeProject(projectJson) {
  const { title, description, items } = projectJson;
  const decodedProject = createProject(title, description);
  const decodedItems = items.map((item) => decodedItem(item));

  decodedItems.forEach((item) => decodedProject.addTodo(item));

  return decodedProject;
}

function loadProjects() {
  const projects = localStorage.getItem('projects') || [];
  const decodedProjects = JSON.parse(projects).map((project) => decodeProject(project));

  return decodedProjects;
}

function codeItem(item) {
  const codedItem = {
    title: item.getTitle(),
    description: item.getDescription(),
    dueDate: item.getDuedate(),
    priority: item.getPriority(),
    complete: item.isComplete(),
  };

  return codedItem;
}

function codeProject(project) {
  const codedItems = project.getItems().map((item) => codeItem(item));
  const codedProject = {
    title: project.getTitle(),
    description: project.getDescription(),
    items: codedItems,
  };

  return codedProject;
}

function saveProjects(projects) {
  const projectsJson = projects.map((project) => codeProject(project));
  localStorage.setItem('projects', JSON.stringify(projectsJson));
}

export { loadProjects, saveProjects };
