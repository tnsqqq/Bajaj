const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const OFFICIAL_EMAIL = "tanishk1347.be23@chitkara.edu.in";

// Input validation middleware
const validateRequest = (req, res, next) => {
  const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
  const requestKeys = Object.keys(req.body);

  if (requestKeys.length !== 1) {
    return res.status(400).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      error: "Request must contain exactly one key"
    });
  }

  const key = requestKeys[0];
  if (!validKeys.includes(key)) {
    return res.status(400).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      error: `Invalid key. Must be one of: ${validKeys.join(', ')}`
    });
  }

  next();
};

// Helper functions
function generateFibonacci(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("Input must be a non-negative integer");
  }

  if (n === 0) return [];
  if (n === 1) return [0];

  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}

function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function filterPrimes(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }

  return arr.filter(num => {
    if (!Number.isInteger(num)) {
      throw new Error("Array must contain only integers");
    }
    return isPrime(num);
  });
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function calculateHCF(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Input must be a non-empty array");
  }

  for (let num of arr) {
    if (!Number.isInteger(num) || num <= 0) {
      throw new Error("Array must contain only positive integers");
    }
  }

  return arr.reduce((acc, val) => gcd(acc, val));
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function calculateLCM(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Input must be a non-empty array");
  }

  for (let num of arr) {
    if (!Number.isInteger(num) || num <= 0) {
      throw new Error("Array must contain only positive integers");
    }
  }

  return arr.reduce((acc, val) => lcm(acc, val));
}

async function askAI(question) {
  if (typeof question !== 'string' || question.trim() === '') {
    throw new Error("Question must be a non-empty string");
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("AI API key not configured");
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: `Answer the following question with a single word or very short phrase (maximum 3 words): ${question}`
          }]
        }]
      }
    );

    const answer = response.data.candidates[0].content.parts[0].text.trim();
    // Extract first word or short phrase
    const words = answer.split(/\s+/);
    return words.length > 3 ? words.slice(0, 3).join(' ') : answer;

  } catch (error) {
    console.error('AI API Error:', error.response?.data || error.message);
    throw new Error("AI service unavailable");
  }
}

// POST /bfhl endpoint
app.post('/bfhl', validateRequest, async (req, res) => {
  try {
    const key = Object.keys(req.body)[0];
    const value = req.body[key];
    let data;

    switch (key) {
      case 'fibonacci':
        data = generateFibonacci(value);
        break;

      case 'prime':
        data = filterPrimes(value);
        break;

      case 'lcm':
        data = calculateLCM(value);
        break;

      case 'hcf':
        data = calculateHCF(value);
        break;

      case 'AI':
        data = await askAI(value);
        break;

      default:
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          error: "Invalid operation"
        });
    }

    res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: data
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      error: error.message
    });
  }
});

// GET /health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

// Root endpoint for testing
app.get('/', (req, res) => {
  res.status(200).json({
    is_success: true,
    message: "API is running",
    endpoints: {
      health: "GET /health",
      bfhl: "POST /bfhl"
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    official_email: OFFICIAL_EMAIL,
    error: "Endpoint not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    official_email: OFFICIAL_EMAIL,
    error: "Internal server error"
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
