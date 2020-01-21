import React, { useState, useEffect, useRef } from 'react';

import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

function ProductProvider(props) {
  const [products, set_products] = useState([]);
  const [detail_product, set_detail_product] = useState(detailProduct);
  const [cart, set_cart] = useState([]);
  const [modal_open, set_modal_open] = useState(false);
  const [modal_product, set_modal_product] = useState(detailProduct);
  const [cart_subtotal, set_cart_subtotal] = useState(0);
  const [cart_tax, set_cart_tax] = useState(0);
  const [cart_total, set_cart_total] = useState(0);

  const prevProductsRef = useRef(products);
  const prevCartRef = useRef(cart);

  useEffect(() => {
    setProducts();
  }, []);

  useEffect(() => {
    if (prevProductsRef.current !== products) {
      const addTotals = () => {
        let subTotal = 0;
        cart.forEach(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        set_cart_total(total);
        set_cart_tax(tax);
        set_cart_subtotal(subTotal);
      };
      addTotals();
    }
  }, [cart, products]);

  useEffect(() => {
    if (prevCartRef.current !== cart) {
      if (cart.length === 0) {
        setProducts();
        set_cart_total(0);
        set_cart_tax(0);
        set_cart_subtotal(0);
      } else {
        const addTotals = () => {
          let subTotal = 0;
          cart.forEach(item => (subTotal += item.total));
          const tempTax = subTotal * 0.1;
          const tax = parseFloat(tempTax.toFixed(2));
          const total = subTotal + tax;
          set_cart_total(total);
          set_cart_tax(tax);
          set_cart_subtotal(subTotal);
        };
        addTotals();
      }
    }
  }, [cart]);

  const setProducts = () => {
    let productsTmp = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      productsTmp = [...productsTmp, singleItem];
      set_products(productsTmp);
    });
  };

  const getItem = id => {
    const product = products.find(item => item.id === id);
    return product;
  };

  const handleDetail = id => {
    const product = getItem(id);
    set_detail_product(product);
  };

  const addToCart = id => {
    let tmpProducts = [...products];
    const index = tmpProducts.indexOf(getItem(id));
    const product = tmpProducts[index];
    product.inCart = true;
    product.count = 1;
    product.total = product.price;
    set_products(tmpProducts);
    set_cart([...cart, product]);
  };

  const openModal = id => {
    const product = getItem(id);
    set_modal_product(product);
    set_modal_open(true);
  };

  const closeModal = () => {
    set_modal_open(false);
  };

  const increment = id => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count += 1;
    product.total = product.count * product.price;
    set_cart(tempCart);
  };

  const decrement = id => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count -= 1;
    if (product.count === 0) {
      removeItem(id);
    } else {
      product.total = product.count * product.price;
      set_cart(tempCart);
    }
  };

  const removeItem = id => {
    let tempProducts = [...products];
    let tempCart = [...cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(getItem(id));
    const tempItem = tempProducts[index];
    tempItem.inCart = false;
    tempItem.count = 0;
    tempItem.total = 0;
    set_products(tempProducts);
    set_cart(tempCart);
  };

  const clearCart = () => {
    set_cart([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        detail_product,
        handleDetail,
        cart,
        modal_open,
        modal_product,
        addToCart,
        openModal,
        closeModal,
        cart_subtotal,
        cart_tax,
        cart_total,
        increment,
        decrement,
        removeItem,
        clearCart
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
