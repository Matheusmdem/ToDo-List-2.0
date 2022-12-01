import styles from './Header.module.css'

import fogueteLogo from '../assets/rocket.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={fogueteLogo} alt="logo-tipo foguete" />
      <strong>
        <span>to</span>
        <span>do</span>
      </strong>
    </header>
  )
}