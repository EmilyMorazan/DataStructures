# 🔑 Groq API Setup Guide

## How to Add Your Groq API Key

### Step 1: Get Your Groq API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy your new API key (it starts with `gsk_...`)

### Step 2: Add the API Key to Your Project

**Option 1: Using .env.local file (Recommended)**

1. Open the file: `data-structures-app/.env.local`
2. Replace the empty value with your actual API key:

```env
REACT_APP_GROQ_API_KEY=gsk_your_actual_api_key_here
REACT_APP_GROQ_MODEL=llama-3.3-70b-versatile
```

3. Save the file
4. Restart your development server:

```bash
npm start
```

**Option 2: Using Environment Variables (Alternative)**

Set environment variables in PowerShell:

```powershell
$env:REACT_APP_GROQ_API_KEY="gsk_your_actual_api_key_here"
$env:REACT_APP_GROQ_MODEL="llama-3.3-70b-versatile"
npm start
```

### Step 3: Verify API Key is Working

The AI features will automatically activate when a valid API key is detected. You'll see:
- 🤖 AI Assistant button in the Data Structures page
- Intelligent hints and explanations
- Context-aware help for operations

### Available Groq Models

You can change the model in your `.env.local` file:

```env
# Fast and efficient (Recommended)
REACT_APP_GROQ_MODEL=llama-3.3-70b-versatile

# Very fast, good for simple tasks
REACT_APP_GROQ_MODEL=llama-3.1-8b-instant

# Powerful for complex reasoning
REACT_APP_GROQ_MODEL=mixtral-8x7b-32768

# Good balance of speed and quality
REACT_APP_GROQ_MODEL=gemma2-9b-it
```

### Security Best Practices

✅ **DO:**
- Keep your API key in `.env.local` (already in .gitignore)
- Never commit `.env.local` to version control
- Rotate your API key if accidentally exposed
- Use environment-specific keys (dev vs prod)

❌ **DON'T:**
- Hard-code API keys in source files
- Share your API key in screenshots or documentation
- Commit `.env.local` to GitHub

### Troubleshooting

**Problem: "Groq API key not configured" error**
- Solution: Make sure `.env.local` exists and contains your key
- Solution: Restart the development server after adding the key

**Problem: API calls failing**
- Solution: Check your API key is valid at [Groq Console](https://console.groq.com/)
- Solution: Verify you have API credits/quota remaining
- Solution: Check the browser console for detailed error messages

**Problem: Environment variable not loading**
- Solution: Environment variables must start with `REACT_APP_` in React
- Solution: Restart the dev server completely (Ctrl+C then `npm start`)
- Solution: Clear browser cache and refresh

### API Usage & Limits

Groq offers generous free tier limits:
- **Rate Limit:** Varies by model (check Groq docs)
- **Context Window:** Up to 32K tokens depending on model
- **Response Time:** Typically < 1 second (Groq is very fast!)

Monitor your usage at: https://console.groq.com/usage

### File Locations

```
data-structures-app/
├── .env.local              ← Add your API key here
├── .env.example            ← Template file (don't edit)
├── src/
│   └── services/
│       └── groqService.js  ← API service logic
```

### Need Help?

- 📖 [Groq Documentation](https://console.groq.com/docs)
- 💬 [Groq Discord Community](https://discord.gg/groq)
- 🐛 Check browser DevTools Console for error messages

---

## Quick Start Commands

```bash
# Navigate to project
cd data-structures-app

# Install dependencies (if not done)
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

Your API key is now configured! The AI tutor features will automatically activate. 🎉
