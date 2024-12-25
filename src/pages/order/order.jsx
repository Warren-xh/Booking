import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import OrderItem from "../../components/orderItem/orderItem.jsx";
import OrderSummary from "../../components/orderSummary/orderSummary.jsx";
import Modal from "../../components/modal/Modal"; // 引入Modal组件

import "./order.css"; // 页面相关样式

const Order = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      hotel: "Downtown Luxury Hotel",
      roomType: "Deluxe Room",
      pricePerNight: 150,
      quantity: 1,
      checkInDate: "2025-01-01",
      checkOutDate: "2025-01-07",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      hotel: "Seaside Resort",
      roomType: "Ocean View Suite",
      pricePerNight: 250,
      quantity: 1,
      checkInDate: "2025-01-01",
      checkOutDate: "2025-01-07",
      image: "https://via.placeholder.com/80",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // 控制Modal的开关

  const handleQuantityChange = (id, delta) => {
    const updatedRooms = rooms.map((room) =>
      room.id === id
        ? { ...room, quantity: Math.max(1, room.quantity + delta) }
        : room
    );
    setRooms(updatedRooms);
  };

  const calculateTotal = () => {
    const subtotal = rooms.reduce(
      (sum, room) =>
        sum +
        room.pricePerNight *
          room.quantity *
          (new Date(room.checkOutDate) - new Date(room.checkInDate)) /
            (1000 * 60 * 60 * 24),
      0
    );
    const tax = subtotal * 0.1; // 10% 税费
    const shipping = 0; // 免费配送
    const grandTotal = subtotal + tax + shipping;
    return { subtotal, tax, shipping, grandTotal };
  };

  const { subtotal, tax, shipping, grandTotal } = calculateTotal();

  // 点击“Proceed to Payment”按钮时打开Modal
  const handleProceedToPayment = () => {
    setIsModalOpen(true); // 打开Modal
  };

  // 关闭Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 确认付款
  const handleConfirmPayment = () => {
    alert("Proceeding to Payment...");
    setIsModalOpen(false); // 关闭Modal
    // 可以在此处进行跳转到支付页面的逻辑
    // history.push('/payment');
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="orderContainer">
        <h1 className="orderTitle">Your Booking Summary</h1>
        <div className="orderItems">
          <h2 className="orderSubTitle">Hotels in your cart</h2>
          {rooms.map((room) => (
            <OrderItem
              key={room.id}
              room={room}
              onQuantityChange={handleQuantityChange}
            />
          ))}
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
        <MailList />
        <Footer />
      </div>

      {/* Modal 弹窗 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
};

export default Order;
