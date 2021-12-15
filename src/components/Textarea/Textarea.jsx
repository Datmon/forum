import React from 'react';
import styles from './Textarea.module.scss'

function Textarea({ placeholder, onChange, value }) {
  return (
    <textarea
      className={styles.postDescription}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    ></textarea>
  );
}

export default Textarea;
