function createItem(initTitle, initDescription, initPriority, initDueDate) {
  let title = initTitle;
  let description = initDescription;
  let dueDate = initDueDate;
  let priority = initPriority;
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

  function setDescription(newDescription) {
    description = newDescription;
  }

  function getDuedate() {
    return dueDate;
  }

  function setDueDate(newDuedate) {
    // TO-DO: check valid date
    dueDate = newDuedate;
  }

  function getPriority() {
    return priority;
  }

  function setPriority(newPriority) {
    // TO-DO check valid priority range;
    priority = newPriority;
  }

  return {
    setTitle,
    getTitle,
    setDescription,
    getDescription,
    setDueDate,
    getDuedate,
    setPriority,
    getPriority,
    isComplete,
    toggleCompletion,
  };
}

export default createItem;
