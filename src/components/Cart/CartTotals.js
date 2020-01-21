import React from 'react';
import { Link } from 'react-router-dom';

export default function CartTotals(props) {
  const { value } = props;
  const { cart_subtotal, cart_tax, cart_total, clearCart } = value;

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-8 mt-2 ml-sm-5 ml-md-auto text-capitalize text-right'>
            <Link to='/'>
              <button
                className='btn btn-outline-danger text-uppercase mb-3 px-5'
                type='button'
                onClick={() => clearCart()}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className='text-title'>
                subtotal: <strong>$ {cart_subtotal}</strong>
              </span>
            </h5>
            <h5>
              <span className='text-title'>
                tax: <strong>$ {cart_tax}</strong>
              </span>
            </h5>
            <h5>
              <span className='text-title'>
                total: <strong>$ {cart_total}</strong>
              </span>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
