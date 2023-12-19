import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import Payment from './PaymentBatch';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    selectedatch: '',
    mobile: '',
    editMode: false,

  });
  
  

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const yogaBatches = [
    { time: '06:00 am - 07:00 am' },
    { time: '07:00 am - 08:00 am' },
    { time: '08:00 am - 09:00 am' },
    { time: '05:00 pm - 06:00 pm' },
  ];

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch('/api/getFormData');
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          setError(`Failed to fetch form data: ${response.status}`);
        }
      } catch (error) {
        setError(`Error fetching form data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  
  const handleLogout = () => {
    console.log('User logged out');
    window.location.href = '/registration';
  };


  

  

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius={8}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      
      {!loading && !error && (
        <>
    
          <Text fontSize="xl" mb={4} textAlign="center">
            Yoga Registration
          </Text>
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Welcome to your profile
            </Text>
            <Text>Name: {formData.name}</Text>
            <Text>Age: {formData.age}</Text>
            <Text>Mobile: {formData.mobile}</Text>
            <Text>Current Batch: {formData.selected_batch}</Text>
          </Box>
         
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Yoga Batches
            </Text>
          
          </Box>
          <Payment />
        
          <Button colorScheme="red" onClick={handleLogout} mt={4}>
            Logout
          </Button>

        </>
      )}
    </Box>
  );
};

export default ProfilePage;

