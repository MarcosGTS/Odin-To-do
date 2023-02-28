const publishInterface = (() => {
  const publications = {};

  function subscribe(eventName, callback) {
    if (!publications[eventName]) {
      publications[eventName] = [];
    }

    publications[eventName].push(callback);
  }

  function publish(eventName, data) {
    const subscribers = publications[eventName];
    if (!subscribers) return;

    subscribers.forEach((subscriber) => subscriber(data));
  }

  return {
    publish,
    subscribe,
  };
})();

export default publishInterface;
