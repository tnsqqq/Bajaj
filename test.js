// test.js - Test script for all API endpoints
const axios = require('axios');

const BASE_URL = process.env.API_URL || 'http://localhost:3000';

const tests = [
  {
    name: 'Health Check',
    method: 'GET',
    endpoint: '/health',
    expectedStatus: 200
  },
  {
    name: 'Fibonacci - Valid',
    method: 'POST',
    endpoint: '/bfhl',
    data: { fibonacci: 7 },
    expectedStatus: 200
  },
  {
    name: 'Fibonacci - Zero',
    method: 'POST',
    endpoint: '/bfhl',
    data: { fibonacci: 0 },
    expectedStatus: 200
  },
  {
    name: 'Prime Numbers - Valid',
    method: 'POST',
    endpoint: '/bfhl',
    data: { prime: [2, 4, 7, 9, 11] },
    expectedStatus: 200
  },
  {
    name: 'Prime Numbers - Empty Array',
    method: 'POST',
    endpoint: '/bfhl',
    data: { prime: [] },
    expectedStatus: 200
  },
  {
    name: 'LCM - Valid',
    method: 'POST',
    endpoint: '/bfhl',
    data: { lcm: [12, 18, 24] },
    expectedStatus: 200
  },
  {
    name: 'HCF - Valid',
    method: 'POST',
    endpoint: '/bfhl',
    data: { hcf: [24, 36, 60] },
    expectedStatus: 200
  },
  {
    name: 'AI - Valid Question',
    method: 'POST',
    endpoint: '/bfhl',
    data: { AI: "What is the capital city of Maharashtra?" },
    expectedStatus: 200
  },
  {
    name: 'Invalid - Multiple Keys',
    method: 'POST',
    endpoint: '/bfhl',
    data: { fibonacci: 5, prime: [2, 3] },
    expectedStatus: 400
  },
  {
    name: 'Invalid - No Keys',
    method: 'POST',
    endpoint: '/bfhl',
    data: {},
    expectedStatus: 400
  },
  {
    name: 'Invalid - Unknown Key',
    method: 'POST',
    endpoint: '/bfhl',
    data: { unknown: 123 },
    expectedStatus: 400
  },
  {
    name: '404 - Invalid Endpoint',
    method: 'GET',
    endpoint: '/invalid',
    expectedStatus: 404
  }
];

async function runTests() {
  console.log(`\n🧪 Testing API at: ${BASE_URL}\n`);
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const config = {
        method: test.method,
        url: `${BASE_URL}${test.endpoint}`,
        validateStatus: () => true // Don't throw on any status
      };
      
      if (test.data) {
        config.data = test.data;
        config.headers = { 'Content-Type': 'application/json' };
      }
      
      const response = await axios(config);
      
      const statusMatch = response.status === test.expectedStatus;
      const hasIsSuccess = response.data.hasOwnProperty('is_success');
      const hasEmail = response.data.hasOwnProperty('official_email');
      
      if (statusMatch && hasIsSuccess && hasEmail) {
        console.log(`✅ PASS: ${test.name}`);
        console.log(`   Status: ${response.status}, Data:`, JSON.stringify(response.data).substring(0, 100));
        passed++;
      } else {
        console.log(`❌ FAIL: ${test.name}`);
        console.log(`   Expected Status: ${test.expectedStatus}, Got: ${response.status}`);
        console.log(`   Response:`, response.data);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ERROR: ${test.name}`);
      console.log(`   ${error.message}`);
      failed++;
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${tests.length} tests\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
