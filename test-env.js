// Simple test script to check environment variables and API URL
console.log("=== Credenza Frontend Authentication Test ===");

// Check environment variables
console.log("Environment Variables:");
console.log(`API URL: ${process.env.NEXT_PUBLIC_API_URL || 'not set'}`);
console.log(`Token Expiry: ${process.env.NEXT_PUBLIC_TOKEN_EXPIRY || 'not set'}`);

// Log API paths for manual verification
console.log("\nAPI Endpoints for Manual Testing:");
const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
console.log(`- Register: ${baseApiUrl}/auth/register (POST)`);
console.log(`- Login: ${baseApiUrl}/auth/login (POST)`);
console.log(`- Current User: ${baseApiUrl}/auth/me (GET)`);
console.log(`- Logout: ${baseApiUrl}/auth/logout (POST)`);
console.log(`- Refresh Token: ${baseApiUrl}/auth/refresh (POST)`);

console.log("\n=== Test Complete ===");
