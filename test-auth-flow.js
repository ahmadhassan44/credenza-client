// Test script to verify authentication flow integration
const { authApi } = require('./services/api');

async function testAuthFlow() {
  console.log('=== Testing Credenza Authentication Flow ===');
  console.log(`API URL: ${process.env.NEXT_PUBLIC_API_URL}`);
  
  // Test registration
  try {
    console.log('\n1. Testing User Registration...');
    const testUser = {
      email: `test_${Date.now()}@example.com`,
      password: 'Password123!',
      firstName: 'Test',
      lastName: 'User'
    };
    
    console.log(`Registering user: ${testUser.email}`);
    const registerResponse = await authApi.register(testUser);
    console.log('Registration successful!');
    console.log('Access token received:', !!registerResponse.accessToken);
    console.log('User data received:', !!registerResponse.user);
  } catch (error) {
    console.error('Registration test failed:', error?.response?.data?.message || error.message);
  }
  
  // Test login
  try {
    console.log('\n2. Testing User Login...');
    const loginResponse = await authApi.login({
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('Login successful!');
    console.log('Access token received:', !!loginResponse.accessToken);
    console.log('User data received:', !!loginResponse.user);
    
    // Store tokens for next test
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', loginResponse.accessToken);
      localStorage.setItem('refreshToken', loginResponse.refreshToken);
    }
  } catch (error) {
    console.error('Login test failed:', error?.response?.data?.message || error.message);
  }
  
  // Test getting current user
  try {
    console.log('\n3. Testing Get Current User...');
    const userData = await authApi.getCurrentUser();
    console.log('Get current user successful!');
    console.log('User ID:', userData.id);
    console.log('User email:', userData.email);
    console.log('User role:', userData.role);
  } catch (error) {
    console.error('Get current user test failed:', error?.response?.data?.message || error.message);
  }
  
  // Test logout
  try {
    console.log('\n4. Testing Logout...');
    const logoutResponse = await authApi.logout();
    console.log('Logout successful!');
    console.log('Response:', logoutResponse);
    
    // Clear tokens
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  } catch (error) {
    console.error('Logout test failed:', error?.response?.data?.message || error.message);
  }
  
  console.log('\n=== Authentication Flow Test Complete ===');
}

// Run the tests
testAuthFlow().catch(error => {
  console.error('Test suite error:', error);
});
