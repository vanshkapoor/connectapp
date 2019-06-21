import React from 'react';
import spinner from './spinner6.gif';

export default ()=> {
    return (
      <div>
        <img src={spinner}
        style = {{width:'350px', margin:'auto', display:'block'}}
        alt="loading ...."
        />
      </div>
    );
};


