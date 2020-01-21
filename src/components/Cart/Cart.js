import React, { useContext } from 'react';

import { ProductContext } from '../../context';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from './CartTotals';

export default function Cart() {
  const value = useContext(ProductContext);
  const { cart } = value;

  return (
    <section>
      {cart.length > 0 ? (
        <>
          <Title name='your' title='cart'>
            Hello from Cart
          </Title>
          <CartColumns />
          <CartList value={value} />
          <CartTotals value={value} />
        </>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
}
