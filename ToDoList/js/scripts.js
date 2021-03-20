function insertListItem(task) {

  const newItem = document.createElement('div');
  newItem.classList.add('list__item-container');
  newItem.innerHTML = `<li class="list__item">${task}</li><span>X</span>`;

  const list = document.querySelector('ul');
  list.appendChild(newItem)

  markItemAsCompletedListener(newItem.querySelector('li'));
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
    insertListItem(textInput.value);
    textInput.value = "";
    event.preventDefault();
  });

  listItems.forEach(function(listItem) {
    markItemAsCompletedListener(listItem);
    deleteItemListener(listItem.parentElement.querySelector('span'));
  }); 
});