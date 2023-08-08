import { SiNextdotjs, SiTypescript, SiReact, SiCssmodules, SiNodedotjs, SiMongodb } from 'react-icons/si';

import styles from './StackList.module.css';

const StackList: React.FC = () => {
  return (
    <>
      <h2>Project stack utilized:</h2>
      <ul>
        <li>
          <SiNextdotjs className={styles.icon} />
          <span className={styles.stackText}>Next.js App Router</span>
        </li>
        <li>
          <SiReact className={styles.icon} />
          <span className={styles.stackText}>React</span>
        </li>
        <li>
          <span>
            <SiTypescript className={styles.icon} />
          </span>
          <span className={styles.stackText}>TypeScript</span>
        </li>
        <li>
          <SiCssmodules className={styles.icon} />
          <span className={styles.stackText}>CSS Modules</span>
        </li>
        <li>
          <SiReact className={styles.icon} />
          <span className={styles.stackText}>React Transition Group</span>
        </li>
        <li>
          <SiNodedotjs className={styles.icon} />
          <span className={styles.stackText}>Node.js </span>
        </li>
        <li>
          <SiMongodb className={styles.icon} />
          <span className={styles.stackText}>MongoDB </span>
        </li>
      </ul>
    </>
  );
};

export default StackList;
