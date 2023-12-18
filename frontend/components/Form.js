import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';

const Form = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    selectedBatch: '',
    mobile: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, age, selectedBatch, mobile } = formData;

    // Basic validations
    if (!name.trim() || !age.trim() || !selectedBatch.trim() || !mobile.trim()) {
      setError('Please fill in all the fields.');
      return;
    }

    const ageValue = parseInt(age);
    if (isNaN(ageValue) || ageValue < 18 || ageValue > 65) {
      setError('Age should be between 18 and 65.');
      return;
    }

    const mobileRegex = /^[0-9]{10}$/; // Simple 10-digit mobile number validation
    if (!mobile.match(mobileRegex)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Form submitted successfully:', responseData);

        router.push('/profile');
      } else {
        console.error('Failed to submit form:', response.status);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setError('');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius={8}>
      <Text fontSize="xl" mb={4} textAlign="center">
        Yoga Class Admission Form
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <Input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Mobile</FormLabel>
            <Input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Preferred Batch</FormLabel>
            <Select
              name="selectedBatch"
              value={formData.selectedBatch}
              onChange={handleInputChange}
            >
              <option value="">Select Batch</option>
              <option value="6-7AM">6-7AM</option>
              <option value="7-8AM">7-8AM</option>
              <option value="8-9AM">8-9AM</option>
              <option value="5-6PM">5-6PM</option>
            </Select>
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </Stack>
      </form>

      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
};

export default Form;
