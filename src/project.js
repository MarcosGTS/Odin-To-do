function createProject(title, description) {
  const items = [];

  function getTitle() {
    return title || 'Default';
  }

  function getDescription() {
    return description || '';
  }

  function addTodo(newTodo) {
    items.push(newTodo);
  }

  function getItems() {
    return [...items];
  }

  function getComplition() {
    /* Return value of complition ranging between (0 - 1) */

    if (items.length === 0) return 1;
    return items.reduce((total, item) => total + item.isComlete(), 0) / items.length;
  }

  return {
    addTodo,
    getItems,
    getTitle,
    getDescription,
    getComplition,
  };
}

export default createProject;
