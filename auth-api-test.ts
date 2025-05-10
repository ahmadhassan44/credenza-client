// This is a simple HTTP test script to check if the auth API is accessible
// Run this using "npx ts-node auth-api-test.ts"

import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

const testAuthApi = async () => {
  console.log('===== CREDENZA AUTH API TEST =====');
  console.log(`Testing API at: ${API_URL}`);

  try {
    // Test if API is accessible
    console.log('\n1. Testing API accessibility...');
    const healthResponse = await axios.get(`${API_URL}/health`, { 
      timeout: 5000 
    }).catch(e => {
      if (e.code === 'ECONNREFUSED') {
        throw new Error('API server is not running. Please start your API server.');
      }
      throw e;
    });
    
    console.log('API connection successful!');
    if (healthResponse?.data) {
      console.log('Health check response:', healthResponse.data);
    }

    // Test login with sample credentials
    console.log('\n2. Testing login API...');
    try {
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: 'test@example.com',
        password: 'password123'
      });
      
      console.log('Login API responded successfully!');
      console.log('Status:', loginResponse.status);
      console.log('Has access token:', !!loginResponse.data.accessToken);
      console.log('Has user data:', !!loginResponse.data.user);
      
      // Save token for next tests
      const token = loginResponse.data.accessToken;
      
      // Test get current user endpoint
      console.log('\n3. Testing get current user API...');
      const userResponse = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Get current user API responded successfully!');
      console.log('User data:', userResponse.data);
      
      // Test logout endpoint
      console.log('\n4. Testing logout API...');
      const logoutResponse = await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Logout API responded successfully!');
      console.log('Response:', logoutResponse.data);
      
    } catch (error) {
      console.error('Auth API test failed:', error.response?.data || error.message);
      console.log('\nThe API responded, but the authentication endpoints failed.');
      console.log('This could be due to:');
      console.log('1. Wrong credentials in the test script');
      console.log('2. Auth endpoints not fully implemented on the API');
      console.log('3. Different API structure than expected');
    }
    
  } catch (error) {
    console.error('API TEST ERROR:', error.message);
  }
  
  console.log('\n===== AUTH API TEST COMPLETE =====');
};

// Run the test
testAuthApi();
