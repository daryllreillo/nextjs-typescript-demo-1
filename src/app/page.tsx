import styles from './page.module.css';
import TodoList from '@/app/_components/app_comp/TodoList';
import NewTodoForm from '@/app/_components/app_comp/NewTodoForm';
import StackList from './_components/projectInfo/StackList';
import ProjectLinks from './_components/projectInfo/ProjectLinks';

export default async function Home() {
  return (
    <main className={styles.main}>
      <div>
        <section className={styles.projectAppSection}>
          <h2>A Simple To Do List</h2>
          <NewTodoForm />
          <TodoList />
        </section>

        <section className={styles.projectInfoSection}>
          <StackList />
          <ProjectLinks />
        </section>
      </div>
    </main>
  );
}
