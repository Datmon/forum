import React from 'react';
import styles from './Select.module.scss';

function Select({ options, defaultValue, onChange, value, label }) {
  return (
    <label>
      {label}
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
