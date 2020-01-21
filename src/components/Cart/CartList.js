import React from 'react';

import CartItem from './CartItem';

export default function CartList(props) {
  const { value } = props;
  const { cart } = value;

  return (
    <div className='container-fluid'>
      {cart.map(item => (
        <CartItem key={item.id} item={item} value={value} />
      ))}
    </div>
  );
}
