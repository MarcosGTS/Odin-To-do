function createItem(_title, _description, _dueDate, _priority) {
  let title = _title;
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

  return {
    setTitle,
    getTitle,
    isComplete,
    toggleCompletion,
  };
}

export default createItem;
