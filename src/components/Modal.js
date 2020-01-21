import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ProductContext } from '../context';
import { ButtonContainer } from './Button';

export default function Modal() {
  const value = useContext(ProductContext);
  const { modal_open, closeModal } = value;
  const { img, title, price } = value.modal_product;

  if (!modal_open) {
    return null;
  }

  return (
    <ModalContainer>
      <div className='container'>
        <div className='row'>
          <div
            id='modal'
            className='col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-4'
          >
            <h5>Item added to the cart!</h5>
            <img src={img} className='img-fluid' alt='product' />
            <h5>{title}</h5>
            <h5 className='text-muted'>price: $ {price}</h5>
            <Link to='/'>
              <ButtonContainer onClick={() => closeModal()}>
                continue shopping
              </ButtonContainer>
            </Link>
            <Link to='/cart'>
              <ButtonContainer cart onClick={() => closeModal()}>
                go to cart
              </ButtonContainer>
            </Link>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  #modal {
    background: var(--mainWhite);
  }
`;
