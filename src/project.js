function createProject(initTitle, initDescription) {
  let title = initTitle || 'Default';
  let description = initDescription || '';
  const items = [];

  function getTitle() {
    return title;
  }

  function setTitle(newTitle) {
    title = newTitle || title;
  }

  function getDescription() {
    return description || '';
  }

  function setDescription(newDescription) {
    description = newDescription || description;
  }

  function addTodo(newTodo) {
    items.push(newTodo);
  }

  function removeTodo(index) {
    return items.splice(index, 1);
  }

  function getItem(index) {
    return items[index];
  }

  function getItems() {
    return [...items];
  }

  function getComplition() {
    /* Return value of complition ranging between (0 - 1) */

    if (items.length === 0) return 1;
    return items.reduce((total, item) => total + item.isComplete(), 0) / items.length;
  }

  return {
    addTodo,
    removeTodo,
    getItem,
    getItems,
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getComplition,
  };
}

export default createProject;
