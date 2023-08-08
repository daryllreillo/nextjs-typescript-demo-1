'use client';
import { useRef, useContext, useState } from 'react';
import useSWRMutation from 'swr/mutation';

import styles from './NewTodoForm.module.css';
import { TodoContext } from '@/app/_components/context/TodoContext';
import Button from '@/app/_components/UI/Button';

// async function postTodo(url: string, { arg }: { arg: { todoText: string } }) {
//   const res = await fetch(url, { method: 'POST', body: JSON.stringify(arg), headers: { 'Content-Type': 'application/json' } });
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to post data');
//   }
//   return res.json();
// }

const NewTodoForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValidInput, setIsValidInput] = useState(false);
  const context = useContext(TodoContext);
  // const { trigger, isMutating } = useSWRMutation('http://localhost:3000/api', postTodo);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const inputText = inputRef.current!.value;
    if (inputText.trim().length === 0) {
      inputRef.current!.value = '';
      // throw an error
      return;
    }

    // trigger({ todoText: inputRef.current!.value });
    context!.saveTodo(null, inputText);
    inputRef.current!.value = '';
    inputRef.current!.focus();
    setIsValidInput(false);
    return;
  };

  const buttonClass = isValidInput ? styles.validInput : styles.invalidInput;

  const inputChangeHandler = () => {
    if (inputRef.current!.value === '') setIsValidInput(false);
    else setIsValidInput(true);
  };

  return (
    <>
      <form className={styles.newTodoForm} onSubmit={submitHandler}>
        <label htmlFor="text"></label>
        <input id="text" type="text" ref={inputRef} placeholder="Type item text" autoComplete="off" onChange={inputChangeHandler} />
        <Button type="submit" className={buttonClass} disabled={false}>
          Add to List
        </Button>
      </form>
      <p className={styles.note}>(Maximum 5 items)</p>
    </>
  );
};

export default NewTodoForm;
