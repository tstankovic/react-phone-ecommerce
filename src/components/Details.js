import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ProductContext } from '../context';
import { ButtonContainer } from './Button';

export default function Details() {
  const value = useContext(ProductContext);
  const { id, title, price, company, img, info, inCart } = value.detail_product;

  return (
    <div className='container py-5'>
      <div className='row'>
        <div className='col-10 mx-auto text-center text-slanted text-blue my-5'>
          <h1>{title}</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-10 mx-auto col-md-6 my-3'>
          <img src={img} className='img-fluid' alt='product-img' />
        </div>
        <div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>
          <h2>model : {title}</h2>
          <h4 className='text-title text-uppercase text-muted mt-3 mb-2'>
            made by: <span className='text-uppercase'>{company}</span>
          </h4>
          <h4 className='text-blue'>
            <strong>
              price: <span>$</span> {price}
            </strong>
          </h4>
          <p className='capitalize font-weignt-bold mt-3 mb-0'>
            some info about product:
          </p>
          <p className='text-muted lead'>{info}</p>
          <div>
            <Link to='/'>
              <ButtonContainer>back to products</ButtonContainer>
            </Link>
            <ButtonContainer
              cart
              disabled={inCart}
              onClick={() => {
                value.addToCart(id);
                value.openModal(id);
              }}
            >
              {inCart ? 'inCart' : 'add to cart'}
            </ButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
