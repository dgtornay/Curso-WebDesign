// Add new task
function insertTask(task, isCompleted = false, isStoraged = false) {

  // Add in DOM
  const newItem = document.createElement('li');
  newItem.classList.add('list__item-container');
  newItem.innerHTML = `<input type="checkbox"><p class="list__item">${task}</p><span>❌</span>`;
  const list = document.querySelector('ul');
  list.appendChild(newItem);

  if (isCompleted) {
    newItem.querySelector('.list__item').classList.add('list__item-completed');
  }

  // Add in local storage
  if (!isStoraged) {
    const newElement = {'task':task, 'completed':isCompleted};
    saveElement(newElement);
  }

  // Add listeners to new task
  markTaskAsCompletedListener(newItem.querySelector('input[type="checkbox"]'));
  deleteTaskListener(newItem.querySelector('span'));
}

// Mark task as completed
function markTaskAsCompletedListener (listItemCheckbox) {
  listItemCheckbox.addEventListener('change', function(event) {
    event.target.parentElement.querySelector('.list__item').classList.toggle('list__item-completed');
  });
}

// Delete task
function deleteTaskListener (listItemX) {
  listItemX.addEventListener('click', function (event) {
    const item = event.target;
    item.parentElement.remove();

    // Remove from storage
    const taskText = item.parentElement.querySelector('.list__item').textContent;
    const filteredElements = getElements().filter(element => element.task !== taskText);
    localStorage.setItem('storageElements',JSON.stringify(filteredElements));
  });
}

// Save elements in storage
function saveElement(newElement) {
  const elements = getElements();
  elements.push(newElement);
  localStorage.setItem('storageElements',JSON.stringify(elements));
}

// Get elements from storage
function getElements() {
  return JSON.parse(localStorage.getItem('storageElements'));
}

// Startup
window.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const textInput = document.querySelector('input[type="text"]');
  const listItems = document.querySelectorAll('.list__item');

  if (!getElements()) {
    const savedElements = [];
    localStorage.setItem('storageElements',JSON.stringify(savedElements));
  } else {
    const savedElements = getElements();
    savedElements.forEach(function(element) {
      insertTask(element.task, element.completed, true);
    });
  };

  form.addEventListener('submit', function (event) {
    if (textInput.value !== "") {
      insertTask(textInput.value);
    }
    textInput.value = "";
    event.preventDefault(); 
  });

  // Add listeners to items
  listItems.forEach(function(listItem) {
    markTaskAsCompletedListener(listItem.parentElement.querySelector('input'));
    deleteTaskListener(listItem.parentElement.querySelector('span'));
  }); 
});