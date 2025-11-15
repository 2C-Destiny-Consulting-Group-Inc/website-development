# Getting Started with 2C Funding Lab - Complete Beginner's Guide

This guide will walk you through setting up and running the 2C Funding Lab application step by step.

## What You'll Need

Before starting, you need to install these programs on your computer:

### 1. Install Python (for the backend)

**Windows:**
1. Go to https://www.python.org/downloads/
2. Click "Download Python 3.12" (or latest version)
3. Run the installer
4. ✅ **IMPORTANT:** Check the box "Add Python to PATH" before clicking Install
5. Click "Install Now"
6. Wait for installation to complete

**Mac:**
1. Open Terminal (press Cmd+Space, type "terminal", press Enter)
2. Install Homebrew if you don't have it:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Install Python:
   ```bash
   brew install python3
   ```

**Linux:**
```bash
sudo apt update
sudo apt install python3 python3-pip
```

### 2. Install Node.js (for the frontend)

**Windows:**
1. Go to https://nodejs.org/
2. Download the LTS version (recommended for most users)
3. Run the installer
4. Click "Next" through all steps (default settings are fine)
5. Wait for installation to complete

**Mac:**
```bash
brew install node
```

**Linux:**
```bash
sudo apt update
sudo apt install nodejs npm
```

### 3. Verify Installations

Open your terminal/command prompt and run these commands to verify:

```bash
python3 --version
```
You should see something like: `Python 3.12.x`

```bash
node --version
```
You should see something like: `v20.x.x`

```bash
npm --version
```
You should see something like: `10.x.x`

If any of these commands fail, you need to restart your terminal or computer after installation.

---

## Step-by-Step Setup Instructions

### Step 1: Navigate to the Project

Open your terminal/command prompt and navigate to where you cloned this repository.

**On Windows (using Command Prompt or PowerShell):**
```bash
cd C:\path\to\website-development\2c-funding-lab
```

**On Mac/Linux:**
```bash
cd ~/path/to/website-development/2c-funding-lab
```

**Tip:** You can drag and drop the folder into the terminal to get the full path.

---

### Step 2: Set Up the Backend

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
   
   This will take a minute or two. You'll see packages being downloaded and installed.
   
   **If you get an error:** Try using `pip3` instead:
   ```bash
   pip3 install -r requirements.txt
   ```

3. **Verify the installation worked:**
   ```bash
   python3 main.py
   ```
   
   You should see output like:
   ```
   INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
   INFO:     Started server process
   INFO:     Application startup complete.
   ```
   
   **✅ SUCCESS!** Your backend is running!
   
4. **Test that the backend works:**
   - Open your web browser
   - Go to: http://localhost:8000
   - You should see a JSON message with API information
   
5. **Stop the backend for now:**
   - Go back to your terminal
   - Press `Ctrl+C` (or `Cmd+C` on Mac)

---

### Step 3: Set Up the Frontend

1. **Open a NEW terminal/command prompt window** (keep the first one open!)

2. **Navigate to the frontend folder:**
   ```bash
   cd path/to/website-development/2c-funding-lab/frontend
   ```

3. **Install Node.js dependencies:**
   ```bash
   npm install
   ```
   
   This will take several minutes the first time. You'll see a progress bar.
   Wait until it says "added XXX packages" and returns to the command prompt.

4. **Build the frontend:**
   ```bash
   npm run build
   ```
   
   This ensures everything compiles correctly. You should see:
   ```
   ✓ Compiled successfully
   ```

---

### Step 4: Run Both Backend and Frontend Together

Now you'll run both parts of the application at the same time.

#### Terminal/Window #1 - Backend

```bash
cd path/to/website-development/2c-funding-lab/backend
python3 main.py
```

Keep this window open and running. You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

#### Terminal/Window #2 - Frontend

```bash
cd path/to/website-development/2c-funding-lab/frontend
npm run dev
```

Keep this window open too. You should see:
```
▲ Next.js 14.2.33
- Local:        http://localhost:3000
✓ Ready in XXXms
```

---

### Step 5: View the Application

1. **Open your web browser** (Chrome, Firefox, Safari, or Edge)

2. **Go to:** http://localhost:3000

3. **You should see the 2C Funding Lab interface!**
   - The page will display funding opportunities in cards
   - Each card shows the title, amount, deadline, and eligibility
   - You can click "Apply Now" or "Learn More" buttons

---

## Troubleshooting Common Issues

### Issue: "Command not found: python3"
**Solution:** Try using `python` instead of `python3`, or reinstall Python and make sure to check "Add to PATH"

### Issue: "Command not found: npm"
**Solution:** Reinstall Node.js and restart your terminal/computer

### Issue: "Port 8000 is already in use"
**Solution:** 
- Another program is using port 8000
- Find and close the other program, or
- Stop any previous backend processes with `Ctrl+C`

### Issue: "Port 3000 is already in use"
**Solution:** 
- Another application is using port 3000
- Stop it or change Next.js port:
  ```bash
  npm run dev -- -p 3001
  ```
  Then visit http://localhost:3001

### Issue: "Failed to fetch funding opportunities"
**Solution:** 
- Make sure the backend (Terminal #1) is still running
- Check that you see "Uvicorn running on http://0.0.0.0:8000"
- If not, restart the backend

### Issue: npm install fails
**Solution:**
- Delete the `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Make sure you have a stable internet connection

---

## Stopping the Application

When you're done:

1. **Stop the Frontend (Terminal #2):**
   - Press `Ctrl+C` (or `Cmd+C` on Mac)
   - Wait for it to shut down

2. **Stop the Backend (Terminal #1):**
   - Press `Ctrl+C` (or `Cmd+C` on Mac)
   - Wait for it to shut down

---

## Quick Reference - Commands Summary

**Start Backend:**
```bash
cd 2c-funding-lab/backend
python3 main.py
```

**Start Frontend (in a separate terminal):**
```bash
cd 2c-funding-lab/frontend
npm run dev
```

**Visit Application:**
```
http://localhost:3000
```

---

## Need More Help?

If you're still having issues:

1. Make sure both terminals are still running (don't close them!)
2. Check that you can access http://localhost:8000 (backend) and http://localhost:3000 (frontend) separately
3. Look at the terminal output for error messages
4. Restart your computer and try the steps again
5. Check that your internet connection is working (needed for initial setup)

---

## What Each Part Does

- **Backend (port 8000):** Provides the data about funding opportunities via an API
- **Frontend (port 3000):** Displays the user interface in your web browser
- Both need to run together for the application to work properly
