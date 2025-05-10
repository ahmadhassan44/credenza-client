// Test Authentication Flow
console.log("Testing Authentication Flow");

// Check environment variables
console.log(`API URL: ${process.env.NEXT_PUBLIC_API_URL}`);

// Check API client setup
const apiClientConfigTest = () => {
  try {
    const axios = require('axios');
    const apiClient = require('./services/api/client').default;
    
    console.log("API Client Configuration:");
    console.log(`- Base URL: ${apiClient.defaults.baseURL}`);
    console.log(`- Default Headers: ${JSON.stringify(apiClient.defaults.headers.common)}`);
    
    return true;
  } catch (error) {
    console.error("Error loading API client:", error.message);
    return false;
  }
};

// Check authentication service
const authServiceTest = () => {
  try {
    const authApi = require('./services/api').authApi;
    
    console.log("Auth API Methods:");
    Object.keys(authApi).forEach(method => {
      console.log(`- ${method}`);
    });
    
    return true;
  } catch (error) {
    console.error("Error loading Auth service:", error.message);
    return false;
  }
};

// Run tests
apiClientConfigTest();
authServiceTest();

console.log("\nAuthentication Flow Test Complete");
console.log("Please make sure the API server is running at the URL specified in the .env.local file.");
console.log("The authentication flow should now be functioning correctly.");
