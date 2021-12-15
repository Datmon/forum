import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { Routes, Route, Link, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import styles from './Auth.module.css';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSingIn, setisSingIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();
  const onSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (error.code === false) {
          setisSingIn(true);
          clearInputs();
        }
        // ..
      });
  };

  const clearInputs = () => {
    setPassword('');
    setisSingIn('');
  };

  const onSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('sigdned in');
        navigate('/posts');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      navigate('/posts');
      console.log(user.uid);
    } else {
      setIsLoading(false);
    }
  });
  if (isLoading) {
    return (
      <div>
        <SpinnerCircular />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {!isSingIn ? (
        <div className={styles.auth}>
          <h1>Регистрация</h1>
          <div className={styles.inputs}>
            <Input
              placeholder='E-mail'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              inputType='textInput'
              name='email'
            />
          </div>
          <div className={styles.inputs}>
            <Input
              placeholder='Пароль'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              inputType='textInput'
              name='password'
            />
          </div>
          <div className={styles.button}>
            <Button label='Зарегистрироваться' onClick={onSignUp} buttonType='submit' />
          </div>
          <span className={styles.span} onClick={() => setisSingIn(true)}> Уже зарегестрированы?</span>
        </div>
      ) : (
        <div className={styles.auth}>
          <h1>Авторизация</h1>
          <div className={styles.inputs}>
            <Input
              placeholder='E-mail'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              inputType='textInput'
              name='email'
            />
          </div>
          <div className={styles.inputs}>
            <Input
              placeholder='Пароль'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              inputType='textInput'
              name='password'
            />
          </div>
          <div className={styles.button}>
            <Button label='Войти' onClick={onSignIn} buttonType='submit' />
          </div>
          <span className={styles.span} onClick={() => setisSingIn(false)}> Регистрация</span>
        </div>
      )}
    </div>
  );
};

export default Auth;
