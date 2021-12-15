import React from 'react';
import Select from '../Select';
import Input from '../Input';
import styles from './PostFilter.module.scss';

function PostFilter({ filter, setFilter }) {
  return (
    <div className={styles.header}>
      <div className={styles.select}>
        <img src={require('../../img/list.png').default} alt='garbage' width='25' />
        <Select
          defaultValue='Сортировка'
          value={filter.sort}
          onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
          options={[
            { name: 'по умолчанию', value: '' },
            { name: 'по имени', value: 'name' },
            { name: 'по описанию', value: 'decsription' },
          ]}
          label='Сортировка: '
        />
      </div>
      <div className={styles.search}>
        <img src={require('../../img/magnifying-glass.png').default} alt='garbage' width='25' />
        <Input
          inputType='searchText'
          placeholder='Поиск...'
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
      </div>
    </div>
  );
}

export default PostFilter;
