import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import OrderItem from "../../components/orderItem/orderItem.jsx";
import OrderSummary from "../../components/orderSummary/orderSummary.jsx";
import Modal from "../../components/modal/Modal";

import "./order.css"; 

const Order = () => {
  // State to hold the cart items
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load saved cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

   // Handle quantity change for a specific cart item
  const handleQuantityChange = (id, delta) => {
    // Update quantity and filter out items with quantity <= 0
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      // Filter out items with quantity 0 or less
      .filter(item => item.quantity > 0); 

    // Merge cart items with the same id and nights
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

  // Calculate subtotal, tax, shipping, and grand total for the cart
  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity * item.nights,
      0
    );

    const tax = subtotal * 0.1; 
    const shipping = 0; 

    // Format the values to two decimal places
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
    localStorage.removeItem("cart");  // Remove cart from localStorage
    setCart([]);  // Remove cart from localStorage

    setIsModalOpen(false);
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
