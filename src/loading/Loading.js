import React from 'react';
import gif from './spinner.gif';
import './Loading.module.css';

const Loading = () => {
  return (
    <div className='loading'>
      <img src={gif} alt='Loading....' />
    </div>
  );
};

export default Loading;
