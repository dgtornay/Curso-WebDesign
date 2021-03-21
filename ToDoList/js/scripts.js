function insertListItem(task) {

  const newItem = document.createElement('li');
  newItem.classList.add('list__item-container');
  newItem.innerHTML = `<p class="list__item">${task}</p><span></span>`;

  const list = document.querySelector('ul');
  list.appendChild(newItem);

  markItemAsCompletedListener(newItem);
  deleteItemListener(newItem.querySelector('span'));
};

function markItemAsCompletedListener (listItem) {
  listItem.addEventListener('click', function(event) {
    const element = event.target;
    element.classList.toggle('list__item-completed');
})};

function deleteItemListener (listItemX) {
  listItemX.addEventListener('click', function (event) {
    const item = event.target;
    item.parentElement.remove();
})};

window.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#todo__form');
  const textInput = document.querySelector('input[type="text"]');
  const listItems = document.querySelectorAll('.list__item');

  form.addEventListener('submit', function (event) {
    if (textInput.value !== "") {
      insertListItem(textInput.value);
    }
    textInput.value = "";
    event.preventDefault();
  });

  listItems.forEach(function(listItem) {
    markItemAsCompletedListener(listItem);
    deleteItemListener(listItem.parentElement.querySelector('span'));
  }); 
});