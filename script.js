const form = document.querySelector('.add');
const positions = document.querySelector('h2 span');
const searchArea = document.querySelector('input.search');
const ul = document.querySelector('ul.list');
let number = 0;

// add positions + remove + check
const addPosition = function (e) {
    e.preventDefault();
    const formInput = document.querySelector('form input');
    if (formInput.value === '') return;
    const li = document.createElement('li');
    li.textContent = formInput.value + ' ';
    ul.appendChild(li);
    li.style.textDecoration = 'none'
    formInput.value = '';
    positions.textContent = ++number;

    // create removeBtn
    const removeBtn = document.createElement('button');
    removeBtn.textContent = ' X ';
    li.appendChild(removeBtn);

    //remove positions
    const remove = function (e) {
        e.target.parentNode.remove();
        positions.textContent = --number;
    }
    removeBtn.addEventListener('click', remove);

    // check positions
    const checkPosition = function () {
        if (li.style.textDecoration == 'none') {
            li.style.textDecoration = 'line-through';
            li.style.backgroundColor = 'rgba(66, 88, 57, 0.363)'
        } else {
            li.style.textDecoration = 'none';
            li.style.backgroundColor = 'rgba(87, 255, 21, 0.363)'
        }
        console.log(li.style.textDecoration);
    }
    li.addEventListener('click', checkPosition);
}

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

form.addEventListener('submit', addPosition);
searchArea.addEventListener('keyup', searchItems);