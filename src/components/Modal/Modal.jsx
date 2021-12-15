import React from 'react';
import styles from './Modal.module.css';

function Modal({children, visible, setVisible, visibleParametr}) {
  const rootClasses = [styles.modal];

  if (visible[visibleParametr]) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible({...visible, [visibleParametr]: false})}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
