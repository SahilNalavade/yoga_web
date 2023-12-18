import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';

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
    editStatus: '',
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
      await completePayment(formData /* additional payment details if needed */);
      setFormData({ ...formData, paymentStatus: 'Completed' });
    }
  };

  const scheduleBatchChange = (newBatch) => {
    console.log(`Scheduling batch change for next month: ${newBatch}`);
  };

  const handlePaymentStatusToggle = async () => {
    if (formData.paymentStatus === 'Completed') {
      console.log('Payment is already completed.');
      return;
    }

    const newPaymentStatus =
      formData.paymentStatus === 'Pending' ? 'Completed' : 'Pending';

    setFormData({ ...formData, paymentStatus: newPaymentStatus });

    if (newPaymentStatus === 'Completed') {
      try {
        await completePayment(
          formData /* additional payment details if needed */
        );
        console.log('Payment completed successfully.');
      } catch (error) {
        console.error('Error completing payment:', error);
      }
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius={8}>
      <Text fontSize="xl" mb={4} textAlign="center">
        Yoga Registration
      </Text>
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
        <Button colorScheme="teal" onClick={handleSaveClick} mt={4}>
          Save
        </Button>
      ) : (
        <Button colorScheme="blue" onClick={handleEditClick} mt={4}>
          Edit
        </Button>
      )}
      <Button colorScheme="red" onClick={handleLogout} mt={4}>
        Logout
      </Button>
    </Box>
  );
};

const ProfileInfo = ({ formData }) => {
  const { name, age, mobile, selectedBatch, currentBatch } = formData;

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Welcome to your profile
      </Text>
      <Text>Name: {name}</Text>
      <Text>Age: {age}</Text>
      <Text>Mobile: {mobile}</Text>
      <Text>Current Batch: {currentBatch}</Text>
    </Box>
  );
};

const PaymentStatus = ({ paymentStatus, onToggle }) => {
  return (
    <Box mt={4}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Payment Status
      </Text>
      <Text>Status: {paymentStatus}</Text>
      <Button colorScheme="purple" onClick={onToggle} mt={2}>
        Toggle Payment Status
      </Button>
    </Box>
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
    <Box mt={4}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Yoga Batches
      </Text>
      {editMode && (
        <FormControl>
          <FormLabel>Select Batch for Next Month:</FormLabel>
          <Select
            id="batchSelect"
            value={selectedBatch}
            onChange={onBatchChange}
          >
            {yogaBatches.map((batch, index) => (
              <option key={index} value={batch.time}>
                {batch.time}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default ProfilePage;
