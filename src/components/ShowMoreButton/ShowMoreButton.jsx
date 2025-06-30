import React from 'react';
import styles from './ShowMoreButton.module.scss';

function ShowMoreButton({ onClick }) {
  return (
    <button className={styles['show-more-button']} onClick={onClick}>
      Показать еще 5 билетов!
    </button>
  );
}
export default ShowMoreButton;
