(() => {
  "use strict";

  const Key = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
  };

  const isEnterEvent = (evt, callback) => {
    if (evt.code === Key.ENTER) {
      callback(evt);
    }
  };

  const isEscapeEvent = (evt, callback) => {
    if (evt.code === Key.ESCAPE) {
      callback(evt);
    }
  };

  const clearElementContents = (element) => {
    element.innerHTML = '';
  };

  const showElement = (element) => {
    element.classList.remove('hidden');
  };

  const hideElement = (element) => {
    element.classList.add('hidden');
  };

  window.utils = {
    isEnterEvent,
    isEscapeEvent,
    clearElementContents,
    showElement,
    hideElement,
  };
})();
