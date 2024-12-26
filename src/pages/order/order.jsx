import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import OrderItem from "../../components/orderItem/orderItem.jsx";
import OrderSummary from "../../components/orderSummary/orderSummary.jsx";
import Modal from "../../components/modal/Modal";

import "./order.css"; // 引入特定样式文件

const Order = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 从 localStorage 获取购物车数据并同步到 state
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // 更新购物车数量
  const handleQuantityChange = (id, delta) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      .filter(item => item.quantity > 0); // 过滤掉数量为 0 的项目

    // 合并同类项
    const mergedCart = updatedCart.reduce((acc, currentItem) => {
      const index = acc.findIndex(item => item.id === currentItem.id && item.nights === currentItem.nights);
      if (index !== -1) {
        // 项目已存在，合并数量
        acc[index].quantity += currentItem.quantity;
      } else {
        // 项目不存在，添加新的项
        acc.push(currentItem);
      }
      return acc;
    }, []);

    setCart(mergedCart); // 更新状态
    localStorage.setItem("cart", JSON.stringify(mergedCart)); // 同步更新 localStorage
  };

  // 计算总金额
  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity * item.nights,
      0
    );

    const tax = subtotal * 0.1; // 税费为总金额的 10%
    const shipping = 0; // 假设运费为 0

    // 保留两位小数
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
    // 清空购物车数据
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
