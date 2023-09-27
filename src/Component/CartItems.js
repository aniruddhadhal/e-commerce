import React from "react";
import Cart from "./Cart";
import styled from "styled-components";
import { useSelector } from "react-redux";

const PriceDetail = styled.div`
  width: 45%;
  height: fit-content;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

export default function ShoppingCart() {
  const cartItems = useSelector((state) => state.cart);
  const totalItems = useSelector((state) => state.totalCart);
  const totalPrice = cartItems.reduce((total, item) => {
    return (total += item.price * item.qty);
  }, 0);
  const totalDiscount = cartItems.reduce((total, item) => {
    return (total += (item.price * item.qty * item.discountPercentage) / 100);
  }, 0);

  if (cartItems.length === 0)
    return <h1 className="text-center mt-5">Your cart is empty</h1>;

  return (
    <div className="container-sm d-flex flex-column flex-lg-row mt-4 gap-3">
      <div className="d-flex flex-column gap-3">
        {cartItems.map((item) => (
          <Cart item={item} key={item.id} />
        ))}
      </div>
      {/* Price summary section */}
      <PriceDetail className="bg-white p-5 d-flex flex-column gap-2">
        <span className="fs-5 pb-2 fw-bold">Price Details</span>

        <div className="d-flex justify-content-between">
          <span>Price({totalItems} item)</span>
          <span>{totalPrice}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Discount</span>
          <span>{Math.floor(totalDiscount)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="">Delivery Charges</span>
          <span className="text-success">Free</span>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <h5>Total Amount</h5>
          <span>{totalPrice - Math.floor(totalDiscount)}</span>
        </div>
      </PriceDetail>
    </div>
  );
}
