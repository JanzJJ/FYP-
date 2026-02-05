# 🚀 Vercel Deployment Guide - StayCare App

## Prerequisites
✅ All code pushed to GitHub  
✅ Vercel account created (free at vercel.com)  
✅ Environment variables ready  

---

## STEP 1: Push Code to GitHub

Make sure all your changes are committed and pushed:

```bash
cd /Users/nethmajanz/Desktop/FYP\ Nethma
git add .
git commit -m "Add Vercel configuration"
git push origin master
```

---

## STEP 2: Get Your Environment Variables

You'll need these from your Firebase and Gemini setup:

**From Firebase Console:**
1. Go to `firebase.google.com`
2. Select your project
3. Settings → Project Settings
4. Copy these values:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

**From Google AI Studio:**
1. Go to `aistudio.google.com/app/apikey`
2. Create API key for Gemini
3. Copy as `VITE_GEMINI_API_KEY`

**Backend URL:**
- If deploying backend separately: `https://your-backend-url.com`
- If using local: `http://localhost:5001`

---

## STEP 3: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard (Recommended for Beginners)

1. **Go to Vercel**
   - Visit `vercel.com`
   - Sign up/Login with GitHub

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Find your repository (e.g., `FYP Nethma`)
   - Click "Import"

3. **Configure Project**
   - **Project Name**: `staycare` (or your choice)
   - **Framework**: Vite (auto-detected)
   - **Root Directory**: `./` (root of your repo)
   - Click "Edit" next to "Build and Output Settings"
     - Build Command: `cd frontend && npm install && npm run build`
     - Output Directory: `frontend/dist`

4. **Add Environment Variables**
   - Scroll to "Environment Variables"
   - Add all variables from Step 2:
     ```
     VITE_GEMINI_API_KEY = your_key_here
     VITE_FIREBASE_API_KEY = your_key_here
     VITE_FIREBASE_AUTH_DOMAIN = your_domain_here
     ... (add all others)
     ```
   - Select Environment: "Production"

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 1-2 minutes)
   - You'll get a URL like `https://staycare.vercel.app`

---

### Option B: Using Vercel CLI (For Advanced Users)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Root**
   ```bash
   cd /Users/nethmajanz/Desktop/FYP\ Nethma
   vercel --prod
   ```

4. **Follow Prompts**
   - Link to existing project or create new one
   - Confirm build settings
   - Add environment variables when prompted

5. **View Live Site**
   ```bash
   vercel env pull
   ```

---

## STEP 4: Set Up Backend (Flask)

Your Flask backend needs separate hosting. Here are options:

### Option 1: Deploy to Render.com (Recommended - Free)

1. **Go to Render**
   - Visit `render.com`
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Connect GitHub repository
   - Select your FYP repo

3. **Configure**
   - **Name**: `staycare-backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && python app.py`
   - **Root Directory**: Leave blank

4. **Add Environment Variables**
   - Add any needed environment variables (if using)
   - Flask will run on port 5001

5. **Deploy**
   - Click "Deploy Web Service"
   - Wait for deployment (5-10 minutes)
   - Get URL like `https://staycare-backend.onrender.com`

### Option 2: Deploy to Railway.app

1. Go to `railway.app`
2. Connect GitHub account
3. Create new project from GitHub repo
4. Configure:
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && python app.py`
5. Deploy

### Option 3: Deploy to Heroku

1. Go to `heroku.com`
2. Create new app
3. Connect GitHub repo
4. Enable auto-deploys
5. Use Procfile (if needed)

---

## STEP 5: Update Backend URL in Frontend

Once backend is deployed, update the `VITE_BACKEND_URL`:

1. **In Vercel Dashboard**
   - Go to Settings → Environment Variables
   - Update `VITE_BACKEND_URL` to your backend URL
   - Example: `https://staycare-backend.onrender.com`

2. **Redeploy**
   - Make a small change to trigger redeploy, or
   - Use: `vercel --prod --force`

---

## STEP 6: Update CORS in Flask

Make sure your Flask backend allows requests from your Vercel frontend:

**In `backend/app.py`:**

```python
from flask_cors import CORS

CORS(app, resources={
    r"/predict": {
        "origins": ["https://staycare.vercel.app", "http://localhost:3000"]
    }
})
```

Or allow all origins (less secure):
```python
CORS(app)  # Already in your code
```

---

## STEP 7: Test Your Live Site

1. **Visit Your Frontend**
   - Go to `https://staycare.vercel.app` (or your Vercel URL)

2. **Test Features**
   - ✅ Login works
   - ✅ Upload images for disease detection
   - ✅ Location search works
   - ✅ Reports submit successfully

3. **Check Console Errors**
   - Open browser DevTools (F12)
   - Look at Console tab for errors
   - Common issues:
     - CORS errors → Update backend URL
     - API key errors → Check environment variables
     - 404 errors → Backend not accessible

---

## STEP 8: Custom Domain (Optional)

1. **Buy Domain** (Namecheap, GoDaddy, etc.)

2. **In Vercel Dashboard**
   - Go to Settings → Domains
   - Click "Add"
   - Enter your domain name
   - Follow DNS configuration instructions

3. **Point Domain to Vercel**
   - Update DNS records at your registrar
   - Vercel will provide DNS values

---

## Troubleshooting

### Build Fails
- Check build command: `cd frontend && npm install && npm run build`
- Check output directory: `frontend/dist`
- View build logs in Vercel dashboard

### Images Not Loading
- Check image URLs in code
- Ensure images are public URLs (not local paths)

### API Calls Failing
- Check `VITE_BACKEND_URL` environment variable
- Verify backend is running and accessible
- Check CORS configuration in Flask

### Firebase Auth Not Working
- Verify all Firebase environment variables are set
- Check Firebase console → Authentication → Authorized domains
- Add your Vercel domain to authorized domains

### Environment Variables Not Loading
- Redeploy after adding variables
- Check variable names (case-sensitive!)
- Ensure they start with `VITE_` prefix

---

## Performance Tips

1. **Enable Caching**
   - Already configured in `vercel.json`
   - API routes have no-cache headers

2. **Monitor Build Time**
   - Vercel dashboard shows build duration
   - Optimize if > 5 minutes

3. **Check Analytics**
   - Vercel provides free analytics
   - View in dashboard → Analytics

---

## Useful Commands

```bash
# Check Vercel status
vercel status

# View logs
vercel logs

# List all deployments
vercel list

# View environment variables
vercel env pull

# Force rebuild and redeploy
vercel --prod --force

# Remove a deployment
vercel remove [deployment-url]
```

---

## Summary

| Component | Hosted On | URL |
|-----------|-----------|-----|
| Frontend | Vercel | `https://staycare.vercel.app` |
| Backend | Render/Railway | `https://staycare-backend.onrender.com` |
| Database | Firebase | `console.firebase.google.com` |

---

## Final Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Frontend deployed and accessible
- [ ] Backend deployed separately
- [ ] Backend URL updated in frontend env variables
- [ ] CORS configured in Flask
- [ ] All features tested
- [ ] No console errors
- [ ] Custom domain (optional)

---

**Your app is now live on the internet! 🎉**

For more help: `vercel.com/docs`

