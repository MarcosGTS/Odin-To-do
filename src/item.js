function createItem(_title, _description, _dueDate, _priority) {
  let title = _title;
  let description = _description;
  let complete = false;

  function isComplete() {
    return complete;
  }

  function toggleCompletion() {
    complete = !complete;
  }

  function setTitle(newTitle) {
    title = newTitle;
  }

  function getTitle() {
    return title;
  }

  function getDescription() {
    return description;
  }

  return {
    setTitle,
    getTitle,
    getDescription,
    isComplete,
    toggleCompletion,
  };
}

export default createItem;
