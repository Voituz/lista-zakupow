// HTML elements
const form = document.querySelector('.add');
const formInput = document.querySelector('form input');
const positions = document.querySelector('h2 span');
const searchArea = document.querySelector('input.search');
const resetBtn = document.querySelector('.reset');
const ul = document.querySelector('ul.list');

// classes
const checked = 'checked';
const unchecked = 'unchecked';

// variables
let number = 0;
let id;
let listLi;

// retrieve from localStorage and render
function loadList(arr) {
  arr.forEach(function (item) {
    addItem(item.name, item.id, item.done, item.trash);
  });
}

let count = localStorage.getItem('count');
let data = localStorage.getItem('liItem');
if (data) {
  listLi = JSON.parse(data);
  id = listLi.length;
  loadList(listLi);
  number = count;
  positions.textContent = count;
} else {
  listLi = [];
  id = 0;
}

// function to create li
function addItem(itemValue, id, done, trash) {
  if (trash) {
    return;
  }

  const doneItem = done ? checked : unchecked;

  const item = `<li class="item ${doneItem}" job="complete" id="${id}">${itemValue}<button job="delete" id="${id}"> X </button></li>`;

  const position = 'beforeend';

  ul.insertAdjacentHTML(position, item);
}

// add li 
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const itemValue = formInput.value;

  if (itemValue) {
    addItem(itemValue, id, false, false);

    listLi.push({
      name: itemValue,
      id: id,
      done: false,
      trash: false
    });

    positions.textContent = ++number;
    localStorage.setItem('liItem', JSON.stringify(listLi));
    localStorage.setItem('count', number);
    id++;
    
  }
  formInput.value = '';
});

// function check 
function checkItem(element) {
  element.classList.toggle(checked);
  element.classList.toggle(unchecked);

  listLi[element.id].done = listLi[element.id].done ? false : true;
};

// function remove
function removeItem(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  listLi[element.id].trash = true;
  positions.textContent = --number;
  localStorage.setItem('count', number);
};

// check and remove li items
ul.addEventListener('click', function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == 'complete') {
    checkItem(element);
  } else if (elementJob == 'delete') {
    removeItem(element);
  };

  
  localStorage.setItem('count', number);
  localStorage.setItem('liItem', JSON.stringify(listLi));
  console.log(elementJob);
});

// clear everything
resetBtn.addEventListener('click', function() {
  localStorage.clear();
  location.reload();
})

// search items
const searchItems = function (e) {
  const find = e.target.value.toLowerCase();
  const liItems = ul.getElementsByTagName('li');
  Array.from(liItems).forEach(function (li) {
      const txt = li.textContent;
      if (txt.toLowerCase().indexOf(find) != -1) {
          li.style.display = 'block';
      } else {
          li.style.display = 'none';
      }
  })
}
searchArea.addEventListener('keyup', searchItems);