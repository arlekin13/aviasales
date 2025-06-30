import React from 'react';

import Logo from '../assets/Logo.svg';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="logo" className={styles.logo} />
    </header>
  );
}
