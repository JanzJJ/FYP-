# Render Backend Deployment Guide

## Prerequisites
- Render account (free tier available at https://render.com)
- GitHub repository with your code (already set up)

## Step-by-Step Deployment

### 1. Create a Web Service on Render

1. Go to https://render.com and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Select **"Deploy an existing repository"**
4. Connect your GitHub account and select **`JanzJJ/FYPNethma`**
5. Choose the **`master`** branch

### 2. Configure the Web Service

Fill in the deployment settings:

| Setting | Value |
|---------|-------|
| **Name** | `fyp-nethma-backend` |
| **Environment** | `Python 3` |
| **Region** | `North Carolina (US)` (or closest to you) |
| **Branch** | `master` |
| **Build Command** | `pip install -r backend/requirements.txt` |
| **Start Command** | `gunicorn backend.app:app` |

### 3. Add Environment Variables (Optional)

If you need custom variables, go to **Environment** tab and add:
- `UPLOAD_FOLDER=/tmp/uploads` (for ephemeral file storage)
- `PYTHONUNBUFFERED=1` (for better logging)

### 4. Deploy

- Click **"Deploy Web Service"**
- Render will automatically build and deploy
- Wait 3-5 minutes for deployment to complete
- Once deployed, you'll get a URL like: `https://fyp-nethma-backend.onrender.com`

### 5. Update Frontend Configuration

Once you have your Render backend URL:

1. Create a `.env.local` file in the `frontend/` directory:
```bash
VITE_API_BASE_URL=https://fyp-nethma-backend.onrender.com
```

2. Or update `frontend/config/api.ts` manually:
```typescript
export const API_BASE_URL = 'https://fyp-nethma-backend.onrender.com';
```

3. Commit and push:
```bash
git add . && git commit -m "Update backend URL for Render" && git push
```

4. Vercel will automatically redeploy with the new URL

### 6. Test the Deployment

- Visit `https://fyp-nethma-backend.onrender.com/health`
- You should see: `{"status":"healthy"}`

### Important Notes

⚠️ **Cold Starts**: Free Render instances go to sleep after inactivity. The first request may take 30-60 seconds.

✅ **Persistent Models**: The model file (`backend/model/dog_skin_disease_model.h5`) is included in your repo and will be deployed automatically.

✅ **File Uploads**: Temporary uploads are stored in `/tmp/` which is ephemeral (cleaned up after each request).

## Troubleshooting

### Build Fails
- Check if `backend/requirements.txt` has all dependencies
- Ensure `runtime.txt` specifies Python 3.10.13

### Model Not Loading
- Verify model file path in `backend/app.py`
- Check if model file is in `backend/model/dog_skin_disease_model.h5`

### CORS Errors
- The backend has CORS enabled, but verify frontend URL is correct

### Service Times Out
- TensorFlow models can be large. Increase Start Command timeout in Render settings if needed.

## Next Steps

Once backend is deployed:
1. Redeploy frontend to use the new backend URL
2. Test the complete flow: report → upload image → prediction
3. Monitor logs in Render dashboard for any errors

