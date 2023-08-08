'use client';
import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';

import styles from './TodoItem.module.css';
import { TodoContext } from '@/app/_components/context/TodoContext';

const TodoItem: React.FC<{
  id: string;
  text: string;
  nodeRef: RefObject<HTMLDivElement> | undefined;
}> = ({ id, text, nodeRef }) => {
  const context = useContext(TodoContext);
  const rmvBtnRef = useRef<HTMLButtonElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const cnEditBtnRef = useRef<HTMLButtonElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>(text);
  const [wasEditCancelled, setWasEditCancelled] = useState<boolean>(true);

  const todoItemClickHandler = () => {
    setTodoText(context!.getTodoText(id));
    setEditMode(() => true);
  };

  const rmvBtnClkHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    liRef.current!.innerHTML = '❌❌❌❌❌';
    context!.removeTodo(id);
  };

  const cnEditBtnClkHandler = () => {
    setWasEditCancelled(() => true);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setWasEditCancelled(() => true);
      setTimeout(() => {
        setEditMode(false);
      }, 180);
    }
  };

  const mouseEnterHandler = () => {
    rmvBtnRef.current!.classList.remove(styles.buttonInvisible);
    rmvBtnRef.current!.classList.add(styles.buttonVisible);
  };

  const mouseLeaveHandler = () => {
    rmvBtnRef.current!.classList.remove(styles.buttonVisible);
    rmvBtnRef.current!.classList.add(styles.buttonInvisible);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const submitUpdateHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setTimeout(() => {
      setEditMode(false);
    }, 180);
  };

  const editInputBlurHandler = () => {
    // Do not remove this setTimeout call!!
    // It ensures that the useEffect state captures
    // the correct state before editMode state update
    setTimeout(() => {
      setEditMode(false);
    }, 180);
  };

  useEffect(() => {
    // console.log(`${text}`, wasEditCancelled);
    if (editMode === true) {
      // auto-focus on TodoItem input when clicked
      editInputRef.current!.focus();
    } else {
      if (!wasEditCancelled) {
        // submits the update if the Cancel Edit button is not clicked
        context.updateTodo(id, todoText);
        if (todoText.length !== 0) liRef.current!.innerHTML = todoText;
        else liRef.current!.innerHTML = '❌❌❌❌❌';
      }
    }
    // reset state
    setWasEditCancelled(false);
  }, [editMode]);

  return (
    <>
      {editMode ? (
        <form className={styles.editLiForm} onSubmit={submitUpdateHandler}>
          <input
            ref={editInputRef}
            value={todoText}
            type="text"
            autoComplete="off"
            onChange={inputChangeHandler}
            onKeyDownCapture={keyDownHandler}
            onBlur={editInputBlurHandler}
          />
          <button className={styles.sbEditButton} type="submit" id={'sbEditBtn'}>
            ✅
          </button>
          <button className={styles.cnEditButton} ref={cnEditBtnRef} id={'cnEditBtn'} onClick={cnEditBtnClkHandler}>
            🛑
          </button>
          <Tooltip anchorSelect={'#sbEditBtn'} place="top">
            Submit edit
          </Tooltip>
          <Tooltip anchorSelect={'#cnEditBtn'} place="top">
            Cancel edit
          </Tooltip>
        </form>
      ) : (
        <div
          className={styles.listItem}
          id={'item'}
          ref={nodeRef}
          onClick={todoItemClickHandler}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <li className={styles.liElem} ref={liRef}>
            {text}
          </li>
          <button className={`${styles.buttonInvisible} ${styles.removBtn}`} ref={rmvBtnRef} onClick={rmvBtnClkHandler} id={'rmvBtn'}>
            ❌
          </button>
          <Tooltip anchorSelect={'#item'} place="left">
            Click to edit
          </Tooltip>
          <Tooltip anchorSelect={'#rmvBtn'} place="top">
            Remove item
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default TodoItem;
