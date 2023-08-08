'use client';
import { createContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { createRef } from 'react';

import { Todo, TodoContextType } from '@/app/_models/todoModel';

let initContextData = true;

export const TodoContext = createContext<TodoContextType>({
  items: [],
  getTodoText: id => '',
  saveTodo: text => {},
  removeTodo: id => {},
  updateTodo: (id, text) => {},
  isLoading: false,
});

// Load initial Todo list
// const initTodoList = ['Smile', 'Meditate', 'Walk your dog', 'Exercise', 'Eat healthy'];
async function getTodoList(url: string) {
  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data from db');
  }
  return res.json();
}

async function postTodoItem(url: string, { arg }: { arg: { todoItem: Todo; new: boolean } }) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to POST / UPDATE data');
  }
  return res.json();
}

async function deleteTodoItem(url: string, { arg }: { arg: { id: string } }) {
  const res = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(arg),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to DELETE data');
  }
  return res.json();
}

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Todo[]>([]);
  const { data, isLoading } = useSWR(`${process.env.DOMAIN}/api`, getTodoList);
  const { trigger: postTrigger, isMutating: postIsMutating } = useSWRMutation(`${process.env.DOMAIN}/api`, postTodoItem);
  const { trigger: deleteTrigger, isMutating: deleteIsMutating } = useSWRMutation(`${process.env.DOMAIN}/api`, deleteTodoItem);

  const getTodoText = (id: string) => {
    const todoItem = items.find(item => item.id === id);
    return todoItem ? todoItem.text : '';
  };

  const saveTodo = (id: string | null | undefined, text: string) => {
    const newTodo: Todo = new Todo(text.trim(), id);
    // console.log(newTodo);
    setItems(prevTodoList => {
      if (prevTodoList.length < 5) {
        return [newTodo, ...prevTodoList];
      } else {
        // if Todo list items are > 10, pop the last item
        const toBeDeleted = prevTodoList.pop();
        deleteTrigger({ id: toBeDeleted!.id });
        return [newTodo, ...prevTodoList];
      }
    });
    postTrigger({ todoItem: newTodo, new: true });
  };

  const removeTodo = (id: string) => {
    setItems(prevTodoList => {
      return [...prevTodoList].filter(item => item.id !== id);
    });
    deleteTrigger({ id: id });
  };

  const updateTodo = (id: string, updateText: string) => {
    setItems(prevTodoList => {
      if (updateText.length < 1) {
        deleteTrigger({ id: id });
        return [...prevTodoList].filter(item => item.id !== id);
      } else {
        const index = prevTodoList.findIndex(todo => todo.id === id);
        if (index !== -1) {
          prevTodoList[index].text = updateText.trim();
          let todoItem: Todo = prevTodoList[index];
          todoItem.nodeRef = createRef();
          postTrigger({ todoItem: todoItem, new: false });
        }
        return [...prevTodoList];
      }
    });
  };

  useEffect(() => {
    // console.log(' USEEFFECT: initContextData: ', initContextData, 'data', data, 'isLoading', isLoading);

    // initial load only
    if (initContextData && !isLoading && data) {
      setItems(() => {
        return data.map((item: Todo) => {
          return new Todo(item.text, item.id);
        });
      });
      initContextData = false;
    }
  }, [initContextData, data, isLoading]);

  return <TodoContext.Provider value={{ items, getTodoText, saveTodo, removeTodo, updateTodo, isLoading }}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
