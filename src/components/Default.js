import React from 'react';

export default function Default(props) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-10 mx-auto text-title text-uppercase py-5'>
          <h1 className='display-3 text-center'>404</h1>
          <h1>error</h1>
          <h2>page not found</h2>
          <h3>
            Requested URL{' '}
            <span className='text-danger'>{props.location.pathname}</span> was
            not found
          </h3>
        </div>
      </div>
    </div>
  );
}
