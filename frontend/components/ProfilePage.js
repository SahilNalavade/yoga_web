import React from 'react';

const ProfilePage = () => {
  return (
    <div>
      <h2>Yoga Registration</h2>
      <ProfileInfo />
      <PaymentStatus />
      <YogaBatches />
    </div>
  );
};

const ProfileInfo = () => {
  const username = 'abcd';

  return (
    <div>
      <h3>Welcome to your profile</h3>
      <p>Username: {username}</p>
    </div>
  );
};

const PaymentStatus = () => {
  const paymentStatus = 'Completed'; // Replace with actual payment status

  return (
    <div>
      <p>Payment Status: {paymentStatus}</p>
    </div>
  );
};

const YogaBatches = () => {
  const yogaBatches = [
    { time: '06:00 am - 07:00 am', amount: '₹ 500' },
    { time: '07:00 am - 08:00 am', amount: '₹ 500' },
    { time: '08:00 am - 09:00 am', amount: '₹ 500' },
    { time: '05:00 pm - 06:00 pm', amount: '₹ 500' },
  ];

  return (
    <div>
      <h3>Yoga Batches</h3>
      {yogaBatches.map((batch, index) => (
        <div key={index}>
          <p>Time: {batch.time}</p>
          <p>Amount: {batch.amount}</p>
          <button>Edit</button>
        </div>
      ))}
      <button>Logout</button>
    </div>
  );
};

export default ProfilePage;
