import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import Input from '../Input';
import Button from '../Button';
import styles from './styles.module.scss';
import Textarea from '../Textarea';

function CreatePost({ postInformation, setPostInformation, specialPost, setVisible }) {
  const [postName, setPostName] = useState(''); /* Переменная имени поста */
  const [postDecription, setPostDescription] = useState(''); /* Переменная контента поста */

  const addNewPost = (e) => {
    console.log('Function addNewPost');
    e.preventDefault(); /* У кнопок по умолчанию тип subbmit - обновляет страницу. Меняет дефотное событие на () */
    if (postName) {
      const newPost = {
        id: new Date(),
        name: postName,
        decsription: postDecription,
      };
      setPostInformation([...postInformation, newPost]);
      setPostName('');
      setPostDescription('');
      setVisible({});

      const db = getDatabase();
      set(ref(db, 'posts/' + newPost.id), newPost);
    }
  };

  const changePost = (e) => {
    e.preventDefault();
    setPostInformation(
      postInformation.map((item) => {
        if (item.id === specialPost.id) {
          return { ...item, name: postName, decsription: postDecription };
        }
        return item;
      })
    );
    const newPost = {
      id: specialPost.id,
      name: postName,
      decsription: postDecription,
    };
    setPostName('');
    setPostDescription('');
    setVisible({});

    const db = getDatabase();
    set(ref(db, 'posts/' + newPost.id), newPost);
  };

  useEffect(() => {
    if (specialPost) {
      setPostName(specialPost.name);
      setPostDescription(specialPost.decsription);
    }
  }, [specialPost]);

  return (
    <div className={styles.inputPost}>
      <Input
        inputType='postName'
        placeholder='Название поста'
        value={postName}
        onChange={(e) => setPostName(e.target.value)}
      />
      <Textarea
        placeholder='Описание поста'
        value={postDecription}
        onChange={(e) => setPostDescription(e.target.value)}
      />
      <div className={styles.button}>
        <Button
          label='Отправить'
          onClick={specialPost ? changePost : addNewPost}
          buttonType='submit'
        />
      </div>
    </div>
  );
}

export default CreatePost;
