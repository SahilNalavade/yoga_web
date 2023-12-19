import React, { useState } from 'react';
import CompletePayment from './CompletePayment';

const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    try {
      // Replace these with your actual user and payment details
      const userDetails = { name: 'John Doe', email: 'john@example.com' };
      const paymentDetails = { amount: 50, currency: 'USD', cardNumber: '**** **** **** ****' };

      // Call the mock CompletePayment function
      const response = await CompletePayment(userDetails, paymentDetails);

      // Update the payment status based on the response
      setPaymentStatus(response.status);

      // If payment is successful, send data to the backend
      if (response.status === 'success') {
        const backendUrl = 'http://localhost:3001/submitForm';
        const backendResponse = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: userDetails,
            payment: { ...paymentDetails, message: 'Payment successful! Thank you for your purchase.' }, // Include the success message
          }),
        });

        if (backendResponse.ok) {
          const backendData = await backendResponse.json();
          console.log('Form submitted successfully:', backendData);
        } else {
          console.error('Failed to submit form to backend:', backendResponse.status);
        }
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus('error');
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={handlePayment}>Make Payment</button>
      {paymentStatus !== null && (
        <div>
          {paymentStatus === 'success' ? (
            <p>Payment successful! Thank you for your purchase.</p>
          ) : paymentStatus === 'error' ? (
            <p>Oops! Something went wrong with the payment. Please try again.</p>
          ) : (
            <p>Waiting for payment confirmation...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Payment;