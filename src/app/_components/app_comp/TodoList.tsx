'use client';
import { useContext, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './TodoList.module.css';
import TodoItem from '@/app/_components/app_comp/TodoItem';
import { TodoContext } from '@/app/_components/context/TodoContext';
import { Todo } from '@/app/_models/todoModel';

const TodoList: React.FC = () => {
  const context = useContext(TodoContext);
  const noticePRef = useRef<HTMLParagraphElement>(null);

  const listItemsClassNames = {
    enter: styles.listItemEntering,
    enterDone: styles.listItemEntered,
    exit: styles.listItemExiting,
    exitDone: styles.listItemExited,
  };

  const noticeClassNames = {
    enter: styles.noticeEntering,
    enterDone: styles.noticeEntered,
    exit: styles.noticeExiting,
    exitDone: styles.noticeExited,
  };

  return (
    <div className={styles.todoList}>
      {/* <p>Click any item to remove from list.</p> */}
      <CSSTransition
        nodeRef={noticePRef}
        in={context.items.length < 1}
        key={'notice'}
        timeout={{ enter: 400, exit: 0 }}
        classNames={noticeClassNames}
        unmountOnExit
        mountOnEnter
      >
        <>
          <span className={styles.noitemsNotice} ref={noticePRef}>
            {/* Below line breaks are needed.
            Using CSS margin or flexbox somehow "borks" the CSStransition. */}
            <br />
            <br />
            <br />
            <br />
            {context.isLoading ? 'Loading data...' : '🎉No more things to do! 🎉'}
          </span>
        </>
      </CSSTransition>
      <TransitionGroup component="ul">
        {context.items.map((item: Todo) => {
          return (
            <CSSTransition nodeRef={item.nodeRef} key={item.id!.toString()} timeout={250} classNames={listItemsClassNames} unmountOnExit mountOnEnter>
              <TodoItem key={item.id!.toString()} id={item.id!} text={item.text} nodeRef={item.nodeRef} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default TodoList;
