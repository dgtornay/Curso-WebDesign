// Add new task
function insertListItem(task) {

  const newItem = document.createElement('li');
  newItem.classList.add('list__item-container');
  newItem.innerHTML = `<input type="checkbox"><p class="list__item">${task}</p><span>❌</span>`;

  const list = document.querySelector('ul');
  list.appendChild(newItem);

  markItemAsCompletedListener(newItem.querySelector('input[type="checkbox"]'));
  deleteItemListener(newItem.querySelector('span'));
};

// Add listeners
// Mark task as completed
function markItemAsCompletedListener (listItemCheckbox) {
  listItemCheckbox.addEventListener('change', function(event) {
    event.target.parentElement.querySelector('.list__item').classList.toggle('list__item-completed');
  });
};

// Delete task
function deleteItemListener (listItemX) {
  listItemX.addEventListener('click', function (event) {
    const item = event.target;
    item.parentElement.remove();
  });
};

// Startup
window.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const textInput = document.querySelector('input[type="text"]');
  const listItems = document.querySelectorAll('.list__item');

  form.addEventListener('submit', function (event) {
    if (textInput.value !== "") {
      insertListItem(textInput.value);
    }
    textInput.value = "";
    event.preventDefault(); 
  });

  // Add listeners
  listItems.forEach(function(listItem) {
    markItemAsCompletedListener(listItem.parentElement.querySelector('input'));
    deleteItemListener(listItem.parentElement.querySelector('span'));
  }); 
});