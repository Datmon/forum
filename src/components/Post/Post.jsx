import React from 'react';
import styles from './Post.module.css';
import Button from '../Button';

function Post({ post, deletePost, eventChangePost }) {
  return (
    <div className={styles.mainPost}>
      <div className={styles.postName}>{post.name}</div>
      <div className={styles.content}>{post.decsription}</div>
      <div className={styles.bottomContent}>
        <Button label='Изменить' buttonType='change' onClick={() => eventChangePost(post.id)}>
          <img src={require('../../img/wrench.png').default} alt='change' width='25' />
        </Button>
        <Button label='Удалить' buttonType='delete' onClick={() => deletePost(post.id)}>
          <img src={require('../../img/garbage.png').default} alt='garbage' width='25' />
        </Button>
      </div>
    </div>
  );
}

export default Post;
