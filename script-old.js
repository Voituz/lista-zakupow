const form = document.querySelector('.add');
const formInput = document.querySelector('form input');
const positions = document.querySelector('h2 span');
const searchArea = document.querySelector('input.search');
const ul = document.querySelector('ul.list');
let number = 0;
let storage = [];

// add positions + remove + check
const addPosition = function (e) {
    // e.preventDefault();
    if (formInput.value === '') return;
    // const li = document.createElement('li');
    // li.textContent = formInput.value + ' ';
    // ul.appendChild(li);
    // li.style.textDecoration = 'none'
    storage.push(formInput.value);
    formInput.value = '';
    positions.textContent = ++number;
    localStorage.setItem('storage', storage);
    localStorage.setItem('number', number);
    // window.location.reload();


    //     // create removeBtn
    //     const removeBtn = document.createElement('button');
    //     removeBtn.textContent = ' X ';
    //     li.appendChild(removeBtn);
    //     removeBtn.addEventListener('click', remove);

    //     // check positions111
    //     const liList = document.querySelectorAll('li');
    // liList.forEach(li => {
    //     const checkPosition = function () {
    //         if (li.style.textDecoration == 'none') {
    //             li.style.textDecoration = 'line-through';
    //             li.style.backgroundColor = 'rgba(66, 88, 57, 0.363)'
    //         } else {
    //             li.style.textDecoration = 'none';
    //             li.style.backgroundColor = 'rgba(87, 255, 21, 0.363)'
    //         }
    //     }
    //     li.addEventListener('click', checkPosition);
    // })
}

// local storage
function retrieveLocalStorage() {
    if (storage.length === 0 && localStorage.length != 0) {
        storage = localStorage.getItem('storage').split(',');
        number = localStorage.getItem('number');
    }
}
retrieveLocalStorage();

function listRendering() {
    storage.forEach(txt => {
        const li = document.createElement('li');
        li.innerHTML = txt + '<button> X </button>';
        li.style.textDecoration = 'none';
        ul.appendChild(li);
    })
    positions.textContent = number;
    // console.log(ul);
}
listRendering();

// check items
const liList = document.querySelectorAll('li');
liList.forEach(li => {
    const checkPosition = function () {
        if (li.style.textDecoration == 'none') {
            li.style.textDecoration = 'line-through';
            li.style.backgroundColor = 'rgba(66, 88, 57, 0.363)'
        } else {
            li.style.textDecoration = 'none';
            li.style.backgroundColor = 'rgba(87, 255, 21, 0.363)'
        }
    }
    li.addEventListener('click', checkPosition);
})
console.log(storage);


//remove positions
const remove = function (e) {
    e.target.parentNode.remove();
    positions.textContent = --number;
    let index;
   
    // index = storage.indexOf(item); 
        console.log(e.target.parentNode.textContent);
    
    storage.splice(index, 1)
    localStorage.setItem('number', number);
    console.log(storage);
}

const removeBtns = document.querySelectorAll('li button');
removeBtns.forEach(btn => {
    btn.addEventListener('click', remove);
})
// console.log(removeBtns);

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

// window.onbeforeunload = function(event)
//     {
//         return confirm("blabla");
//     };

form.addEventListener('submit', addPosition);
searchArea.addEventListener('keyup', searchItems);