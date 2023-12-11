import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux';

// import { createStore } from 'redux';

// const initialState = 0;


// const reducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INC':
//       return state + 1;
//     case 'DEC':
//       return state - 1;
//       case 'RND':
//         return state * action.payload
//     default:
//       return 0
//   }
// }

// const store = createStore(reducer)

// const update = () => {
// document.getElementById('counter').textContent= store.getState()
// }

// store.subscribe(() => {
//   update()
// })

// document.getElementById('inc').addEventListener('click', () => {
//   store.dispatch({ type: 'INC' })
// })
// document.getElementById('dec').addEventListener('click', () => {
//   store.dispatch({ type: 'DEC' })
// })
// document.getElementById('rnd').addEventListener('click', () => {
//   let random = Math.random()
//   store.dispatch({ type: 'RND', payload: random })
// })

let nextToDoId = 0;

const addTask = text => {
  return {
    type: 'ADD_TASK',
    text,
    id: nextToDoId++
  }
}


const removeTask = id => {
  return {
    type: 'REMOVE_TASK',
    id: parseInt(id, 10)
  }
}
const initialState = {
  todos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            completed: false,
          },
        ],
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        todos: state.todos.filter(task => task.id !== action.id),
      };
    default:
      return state;
  }
}
const store = createStore(reducer)

document.getElementById('addTaskBtn').addEventListener('click', () => {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    store.dispatch(addTask(taskText));
    taskInput.value = ''; // Очистка поля введення
  }
});

document.getElementById('taskList').addEventListener('click', (event) => {
  console.log(initialState)
  if (event.target.classList.contains('killTaskBtn')) {
    const taskID = event.target.parentElement.getAttribute('data-id');
    store.dispatch(removeTask(taskID));
  }
});

// Вміст функції render
const render = () => {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Очистка списку перед відображенням нового стану

  store.getState().todos.forEach(task => {
    const listItem = document.createElement('li');
    const killbtn = document.createElement('button');
    listItem.textContent = task.text;
    killbtn.textContent = 'Kill btn';
    killbtn.className = 'killTaskBtn';
    listItem.setAttribute('data-id', task.id);
    taskList.appendChild(listItem);
    listItem.appendChild(killbtn);
  });


};



store.subscribe(render); // Оновлення відображення при зміні стану

render(); // Першочергове відображення початкового стану



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
