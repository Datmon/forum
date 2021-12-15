import React, { useState, useMemo, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getDatabase, ref, child, get, remove } from 'firebase/database';
import { SpinnerCircular } from 'spinners-react';
import { getAuth, signOut } from 'firebase/auth';
import { Routes, Route, Link, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';

import Button from '../../components/Button';
import Post from '../../components/Post';
import PostFilter from '../../components/UI/PostFilter';
import Modal from '../../components/Modal';
import CreatePost from '../../components/UI/CreatePost';
import withAuth from '../../hoc/withAuth';
import './styles/Posts.css';

function Posts() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({ sort: '', search: '' });
  const [visible, setVisible] = useState({ add: false, change: false });
  const [specialPost, setSpecialPost] = useState({});
  const [postInformation, setPostInformation] = useState([]); /* Массив всех постов */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `posts`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPostInformation(
            Object.entries(snapshot.val())
              .map((e) => e[1])
              .map((item, index) => ({
                ...Object.values(snapshot.val())[index],
                id: Object.keys(snapshot.val())[index],
              }))
          );
          setIsLoading(false);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const sortedPost = useMemo(() => {
    console.log('Function getSortedPost');
    if (filter.sort) {
      return [...postInformation].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return postInformation;
  }, [filter.sort, postInformation]);

  const sortAndSearchPosts = useMemo(() => {
    console.log('Function sortAndSearchPosts');
    return sortedPost.filter((post) =>
      post.name.toLowerCase().includes(filter.search.toLowerCase())
    );
  }, [filter.search, sortedPost]);

  const deletePost = (postId) => {
    console.log('Function deletePost');
    setPostInformation([...postInformation.filter((holePost) => holePost.id !== postId)]);
    const db = getDatabase();
    remove(ref(db, 'posts/' + postId));
  };

  const eventChangePost = (postId) => {
    setVisible({ ...visible, change: true });
    setSpecialPost(...postInformation.filter((holePost) => holePost.id === postId));
  };

  const onSignOut = () => {
    const auth = getAuth();
    console.log(auth);
    signOut(auth)
      .then(() => {
        //navigate('/');
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  return (
    <div className='App'>
      <div className='header'>
        <Button
          onClick={() => setVisible({ ...visible, add: true })}
          label='+ Создать пост'
          buttonType='create'
        />
        <div className='buttonSignOut'>
          <Button onClick={() => onSignOut()} label='Выйти из пользователя' buttonType='submit' />
        </div>
      </div>
      <PostFilter filter={filter} setFilter={setFilter} />
      {isLoading ? (
        <SpinnerCircular />
      ) : (
        <>
          {!sortAndSearchPosts.length ? (
            <h1>Посты не найдены</h1>
          ) : (
            <TransitionGroup>
              {sortAndSearchPosts.map((onePost) => (
                <CSSTransition key={onePost.id} timeout={500} classNames='post'>
                  <Post post={onePost} deletePost={deletePost} eventChangePost={eventChangePost} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}

          <CSSTransition
            in={visible.add}
            timeout={300}
            classNames='inputPost'
            onExited={() => setVisible({ ...visible, add: false })}
          >
            <Modal visible={visible} setVisible={setVisible} visibleParametr='add'>
              <h1 className='modalHeader'>Создать пост</h1>
              <CreatePost
                postInformation={postInformation}
                setPostInformation={setPostInformation}
                setVisible={setVisible}
              />
            </Modal>
          </CSSTransition>

          <CSSTransition
            in={visible.change}
            timeout={300}
            classNames='inputPost'
            onExited={() => setVisible({ ...visible, change: false })}
          >
            <Modal visible={visible} setVisible={setVisible} visibleParametr='change'>
              <h1 className='modalHeader'>Изменить пост</h1>
              <CreatePost
                postInformation={postInformation}
                setPostInformation={setPostInformation}
                setVisible={setVisible}
                setSpecialPost={setSpecialPost}
                specialPost={specialPost}
                visible={visible}
              />
            </Modal>
          </CSSTransition>
        </>
      )}
    </div>
  );
}

export default withAuth(Posts);
