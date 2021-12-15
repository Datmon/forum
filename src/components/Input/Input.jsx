import React from 'react'
import styles from './Input.module.scss'

function Input({placeholder, onChange, value, inputType, name}) {
  const getClassName = () => {
    switch(inputType){
      case 'postName': return styles.postName;  
      case 'searchText': return styles.searchText;
      case 'textInput': return styles.textInput;
      default: return;
    }
  }  
  return (
    <input className={getClassName()} type={name} placeholder={placeholder} onChange={onChange} value={value} name={name}/>
  )
}

export default Input