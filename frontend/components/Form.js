import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
    <div>
      <h2>Yoga Class Admission Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Mobile:
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Preferred Batch:
          <select
            name="selectedBatch"
            value={formData.selectedBatch}
            onChange={handleInputChange}
          >
            <option value="">Select Batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Form;
