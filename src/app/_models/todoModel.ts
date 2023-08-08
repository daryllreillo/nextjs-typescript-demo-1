import { RefObject, createRef } from 'react';

export class Todo {
  id: string;
  date: Date;
  nodeRef: RefObject<HTMLDivElement>;
  text: string;

  constructor(todoText: string, id?: string | undefined | null) {
    this.id = id || 'TLUSR12345_'+ Math.floor(Math.random() * Math.pow(10, 9)).toString();
    this.date = new Date();
    this.nodeRef = createRef();
    this.text = todoText;
  }
}
// the Todo class can be used an Interface and a Type Alias

export type TodoContextType = {
  items: Todo[];
  getTodoText: (id: string) => string;
  saveTodo: (id: null | string, text: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  isLoading: boolean;
};
