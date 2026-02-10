# Chitkara University Qualifier 1 - REST API

A production-ready REST API implementation for the Chitkara University 2026 qualifier assignment.

## 🚀 Features

- ✅ POST `/bfhl` - Supports fibonacci, prime, lcm, hcf, and AI operations
- ✅ GET `/health` - Health check endpoint
- ✅ Robust input validation
- ✅ Graceful error handling
- ✅ Proper HTTP status codes
- ✅ AI integration with Google Gemini
- ✅ Security guardrails

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

## 🔧 Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd chitkara-qualifier-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

### 4. Update your email

Open `server.js` and replace the placeholder email:
```javascript
const OFFICIAL_EMAIL = "your.email@chitkara.edu.in";
```

### 5. Run locally

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:3000/health
```

### Fibonacci
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'
```

### Prime Numbers
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2,4,7,9,11]}'
```

### LCM
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [12,18,24]}'
```

### HCF
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [24,36,60]}'
```

### AI Query
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital city of Maharashtra?"}'
```

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `GEMINI_API_KEY` in Environment Variables

**OR** deploy via Vercel Dashboard:
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables
5. Deploy

### Option 2: Render

1. Go to https://render.com
2. Click "New Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `GEMINI_API_KEY`: Your API key
6. Click "Create Web Service"

### Option 3: Railway

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables in the Variables tab:
   - `GEMINI_API_KEY`: Your API key
5. Deploy

### Option 4: ngrok (Testing Only)

```bash
# Start your local server
npm start

# In another terminal
ngrok http 3000
```

⚠️ **Note**: ngrok URLs expire and require the server to keep running

## 📁 Project Structure

```
.
├── server.js           # Main application file
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🔑 Getting Google Gemini API Key

1. Visit https://aistudio.google.com
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key in your project
5. Copy the key and add it to `.env`

## 📝 API Documentation

### POST /bfhl

**Request Format:**
```json
{
  "<key>": <value>
}
```

Where key is one of: `fibonacci`, `prime`, `lcm`, `hcf`, `AI`

**Success Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": <result>
}
```

**Error Response:**
```json
{
  "is_success": false,
  "official_email": "your.email@chitkara.edu.in",
  "error": "Error message"
}
```

### GET /health

**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in"
}
```

## 🛡️ Security Features

- Input validation for all endpoints
- Type checking for all operations
- Error handling without exposing internals
- Environment variable protection
- No hardcoded credentials

## ⚠️ Error Handling

The API handles various error cases:
- Invalid input types
- Out of range values
- Missing required fields
- Multiple keys in request
- Invalid operation keys
- AI API failures
- Server errors

## 📊 Evaluation Criteria Coverage

✅ Strict API response structure  
✅ Correct HTTP status codes (200, 400, 404, 500)  
✅ Robust input validation  
✅ Graceful error handling (no crashes)  
✅ Security guardrails  
✅ Public accessibility  
✅ Boundary condition handling  
✅ Structure consistency  

## 🤝 Contributing

This is a qualifier assignment project. For questions, contact via Chitkara University channels.

## 📄 License

This project is created for educational purposes as part of Chitkara University Qualifier 1.

## 📧 Contact

Replace with your Chitkara email in `server.js` before deployment.

---

**Important**: Remember to:
1. Replace the email in `server.js`
2. Add your Gemini API key to `.env`
3. Keep your `.env` file secure and never commit it
4. Make your GitHub repository public
5. Test all endpoints before submission
