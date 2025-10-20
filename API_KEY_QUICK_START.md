# 📝 QUICK START: Add Your Groq API Key

## ⚡ 3 Simple Steps

### 1️⃣ Open the file: `.env.local`
Location: `data-structures-app\.env.local`

### 2️⃣ Paste your API key after the `=` sign:

```env
REACT_APP_GROQ_API_KEY=gsk_paste_your_key_here
```

**Example (with fake key):**
```env
REACT_APP_GROQ_API_KEY=gsk_1234567890abcdefghijklmnopqrstuvwxyz
REACT_APP_GROQ_MODEL=llama-3.3-70b-versatile
```

### 3️⃣ Restart your server:

```bash
# Press Ctrl+C to stop the current server
# Then restart:
npm start
```

## ✅ That's it! 

The AI features will now work automatically.

---

## 🔍 Where to Find Your Groq API Key

1. Go to: **https://console.groq.com/**
2. Click **"API Keys"** in the sidebar
3. Click **"Create API Key"**
4. Copy the key (starts with `gsk_`)
5. Paste it in `.env.local` as shown above

---

## 🆘 Need Help?

**Can't find .env.local?**
- Look in: `data-structures-app\.env.local`
- If it doesn't exist, create it and copy the template from `.env.example`

**Server not picking up the key?**
- Make sure you **restarted** the server (Ctrl+C then `npm start`)
- Make sure there are **no spaces** around the `=` sign
- Make sure the key starts with **REACT_APP_**

**Still not working?**
- Check the browser console (F12) for error messages
- Verify your key is active at https://console.groq.com/

---

## 📂 File Structure

```
DataStructures/
└── data-structures-app/
    ├── .env.local          ← 🔑 ADD YOUR KEY HERE
    ├── .env.example        ← Template (don't edit)
    └── src/
        └── services/
            └── groqService.js  ← Uses your key
```

**Remember:** Never commit `.env.local` to Git! It's already in `.gitignore` for safety.
