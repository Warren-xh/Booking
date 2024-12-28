import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import OrderItem from "../../components/orderItem/orderItem.jsx";
import OrderSummary from "../../components/orderSummary/orderSummary.jsx";
import Modal from "../../components/modal/Modal";

import "./order.css"; 

const Order = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      .filter(item => item.quantity > 0); 

    const mergedCart = updatedCart.reduce((acc, currentItem) => {
      const index = acc.findIndex(item => item.id === currentItem.id && item.nights === currentItem.nights);
      if (index !== -1) {
        acc[index].quantity += currentItem.quantity;
      } else {
        acc.push(currentItem);
      }
      return acc;
    }, []);

    setCart(mergedCart); 
    localStorage.setItem("cart", JSON.stringify(mergedCart)); 
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity * item.nights,
      0
    );

    const tax = subtotal * 0.1; 
    const shipping = 0; 

    const formattedSubtotal = subtotal.toFixed(2);
    const formattedTax = tax.toFixed(2);
    const formattedGrandTotal = (parseFloat(formattedSubtotal) + parseFloat(formattedTax) + shipping).toFixed(2);

    return {
      subtotal: formattedSubtotal,
      tax: formattedTax,
      shipping: shipping.toFixed(2),
      grandTotal: formattedGrandTotal
    };
  };

  const { subtotal, tax, shipping, grandTotal } = calculateTotal();

  const handleProceedToPayment = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmPayment = () => {
    alert("Proceeding to Payment...");
    localStorage.removeItem("cart");  // 清除 localStorage 中的购物车数据
    setCart([]);  // 更新状态，清空页面上的购物车

    setIsModalOpen(false);
    // 这里可以执行重定向到支付页面的逻辑
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="orderContainer">
        <div className="orderWrapper">
          <h1 className="orderTitle">Your Booking Summary</h1>
          <div className="orderItems">
            <h2 className="orderSubTitle">Hotels in your cart</h2>
            {cart.length > 0 ? (
              cart.map((item) => (
                <OrderItem
                  key={item.id}
                  room={item}
                  onQuantityChange={handleQuantityChange}
                />
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <OrderSummary
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            grandTotal={grandTotal}
          />
          <div className="orderActions">
            <button className="orderButton" onClick={handleProceedToPayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
};

export default Order;
