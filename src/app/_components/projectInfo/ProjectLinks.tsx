import Link from 'next/link';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { SlSocialGithub } from 'react-icons/sl';
import { SiGithub } from 'react-icons/si';
import logo from '@/app/_icons/favicon-16x16.png';

import styles from './ProjectLinks.module.css';

const ProjectLinks: React.FC = () => {
  return (
    <div className={styles.projectLinks}>
      <Link href="https://github.com/daryllreillo" target="_blank">
        <span className={styles.stackTextBottom}>made by: </span>
        <span className={styles.stackTextBottom}>@daryllreillo</span>
        <span className={styles.miniLogo}>
          <Image src={logo} alt="logo of dog" />
        </span>
        <SlSocialGithub className={styles.myGithubLink} />
        <FiExternalLink />
      </Link>
      <br />
      <Link href="https://github.com/daryllreillo/nextjs-typescript-demo-1" target="_blank">
        <span>github project repo</span>
        <SiGithub className={styles.myGithubLink} />
        <FiExternalLink />
      </Link>
    </div >
  );
};

export default ProjectLinks;
