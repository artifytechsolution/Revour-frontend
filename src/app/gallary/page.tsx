"use client";
import React from "react";

const RazorpayPayment = () => {
  const makePayment = async () => {
    const payButton = document.getElementById("payButton");
    payButton.disabled = true;

    try {
      const response = await fetch("http://localhost:8000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotel_id: "1f859e1d-21b7-43ec-adb8-4aee38f7c86f",
          check_in_datetime: "2025-07-26T10:00:00",
          check_out_datetime: "2025-07-26T16:00:00",
          days: "2",
          item_id: "abf9b881-3026-44f7-8113-0fa6d2fe9523",
          total_amount: "2000",
          booking_type: "HOTEL",
          amount: 9000,
          order_type: "HOTEL",
          user_id: "4b2c3de9-5803-463e-83c3-309bb4c552e8",
          currency: "INR",
          tax_amount: 0,
        }),
      });

      const order = await response.json();
      console.log("Order response:", order);

      if (order.error) {
        alert(order.error);
        return;
      }

      const options = {
        key: order.data.key,
        amount: order.data.amount,
        currency: order.data.currency,
        order_id: order.data.order_id,
        name: "Your Company",
        description: `Purchase for ${order.data.order_type}`,
        handler: async function (response) {
          try {
            const verify = await fetch("http://localhost:8000/order/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...response,
                bill_id: order.data.bill_id,
              }),
            });

            const result = await verify.json();
            console.log("Verification result:", result);
            alert(result.message || result.error);
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#28a745",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment");
    } finally {
      payButton.disabled = false;
    }
  };

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1>Make a Payment</h1>
        <button id="payButton" style={styles.button} onClick={makePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    backgroundColor: "#f4f4f4",
  },
  container: {
    textAlign: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default RazorpayPayment;
