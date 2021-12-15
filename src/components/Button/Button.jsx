import React from 'react';
import styles from './Button.module.css';

function Button({ children, label, onClick, buttonType }) {
  const selectStyleType = () => {
    switch (buttonType) {
      case 'submit':
        return styles.submit;
      case 'delete':
        return styles.delete;
      case 'create':
        return styles.create;
      case 'change':
        return styles.change;
      default:
        return;
    }
  };

  return (
    <button className={selectStyleType()} onClick={onClick}>
      {children}
      <span className={styles.labelButton}>{label}</span>
    </button>
  );
}

export default Button;
