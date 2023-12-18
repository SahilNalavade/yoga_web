import React, { useState, useEffect } from 'react';

const completePayment = async (userDetails, paymentDetails) => {
  console.log(`Completing payment for user: ${userDetails.name}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Payment completed successfully.');
      resolve();
    }, 1000);
  });
};

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    selectedBatch: '', 
    mobile: '',
    paymentStatus: 'Pending', 
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch('/api/getFormData'); 
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error('Failed to fetch form data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);

  const handleBatchChange = (event) => {
    setFormData({ ...formData, selectedBatch: event.target.value });
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleLogout = () => {
    console.log('User logged out');

    window.location.href = '/registration';
  };

  const handleSaveClick = async () => {
    console.log('Changes saved'); 

    if (formData.selectedBatch !== formData.currentBatch) {
      scheduleBatchChange(formData.selectedBatch);
    }

    setEditMode(false);

    if (formData.paymentStatus === 'Pending') {
      await completePayment(formData, /* additional payment details if needed */);
      setFormData({ ...formData, paymentStatus: 'Completed' });
    }
  };

  const scheduleBatchChange = (newBatch) => {
    console.log(`Scheduling batch change for next month: ${newBatch}`);
  };

 // ...

const handlePaymentStatusToggle = async () => {
  if (formData.paymentStatus === 'Completed') {
    console.log('Payment is already completed.');
    return; 
  }

  const newPaymentStatus = formData.paymentStatus === 'Pending' ? 'Completed' : 'Pending';

  setFormData({ ...formData, paymentStatus: newPaymentStatus });

  if (newPaymentStatus === 'Completed') {
    try {
      await completePayment(formData /* additional payment details if needed */);
      console.log('Payment completed successfully.');
    } catch (error) {
      console.error('Error completing payment:', error);
    }
  }
};


  return (
    <div>
      <h2>Yoga Registration</h2>
      <ProfileInfo formData={formData} />
      <PaymentStatus
        paymentStatus={formData.paymentStatus}
        onToggle={handlePaymentStatusToggle}
      />
      <YogaBatches
        editMode={editMode}
        selectedBatch={formData.selectedBatch}
        onBatchChange={handleBatchChange}
      />
      {editMode ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const ProfileInfo = ({ formData }) => {
  const { name, age, selectedBatch, currentBatch, mobile } = formData;

  return (
    <div>
      <h3>Welcome to your profile</h3>
      <p>Name: {formData.name}</p>
      <p>Age: {formData.age}</p>
      <p>Mobile: {formData.mobile}</p>
      <p>Current Batch : {formData.selected_batch}</p>
    </div>
  );
};

const PaymentStatus = ({ paymentStatus, onToggle }) => {
  return (
    <div>
      <h3>Payment Status</h3>
      <p>Status: {paymentStatus}</p>
      <button onClick={onToggle}>Toggle Payment Status</button>
    </div>
  );
};

const YogaBatches = ({ editMode, selectedBatch, onBatchChange }) => {
  const yogaBatches = [
    { time: '06:00 am - 07:00 am' },
    { time: '07:00 am - 08:00 am' },
    { time: '08:00 am - 09:00 am' },
    { time: '05:00 pm - 06:00 pm' },
  ];

  return (
    <div>
      <h3>Yoga Batches</h3>
      {editMode && (
        <div>
          <label htmlFor="batchSelect">Select Batch for Next Month:</label>
          <select id="batchSelect" value={selectedBatch} onChange={onBatchChange}>
            {yogaBatches.map((batch, index) => (
              <option key={index} value={batch.time}>
                {batch.time}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
