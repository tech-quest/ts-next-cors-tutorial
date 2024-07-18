import Link from 'next/link';
import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

export const DefaultLayout = ({ children }: Props) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.logo}>Logo</div>
        <nav>
          <ul className={styles.menu}>
            <li>
              <Link href="#" className={styles.link}>
                メニュー1
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.link}>
                メニュー2
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.copyright}>
          Copyright © All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};
