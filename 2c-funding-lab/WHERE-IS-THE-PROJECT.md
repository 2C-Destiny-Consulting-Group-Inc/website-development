# How to Find the 2c-funding-lab Project Folder

## 📍 Location of the Project

The **2c-funding-lab** folder is located inside the **website-development** repository.

### Full Path Structure:

```
website-development/           ← Main repository folder
└── 2c-funding-lab/           ← YOU ARE HERE! This is the project folder
    ├── backend/              ← Backend API code
    ├── frontend/             ← Frontend website code
    ├── GETTING-STARTED.md    ← Beginner's setup guide
    ├── README.md             ← Main documentation
    ├── start-easy.sh         ← Mac/Linux start script
    └── start-easy.bat        ← Windows start script
```

---

## 🔍 How to Find It

### Method 1: Check Where You Cloned the Repository

When you cloned this repository from GitHub, it created a folder on your computer. The project is inside that folder.

**Common locations:**

**On Windows:**
- `C:\Users\YourUsername\Documents\website-development\2c-funding-lab`
- `C:\Users\YourUsername\Desktop\website-development\2c-funding-lab`
- `C:\Users\YourUsername\Downloads\website-development\2c-funding-lab`

**On Mac:**
- `/Users/YourUsername/Documents/website-development/2c-funding-lab`
- `/Users/YourUsername/Desktop/website-development/2c-funding-lab`
- `/Users/YourUsername/Downloads/website-development/2c-funding-lab`

**On Linux:**
- `/home/YourUsername/Documents/website-development/2c-funding-lab`
- `/home/YourUsername/Desktop/website-development/2c-funding-lab`
- `/home/YourUsername/Downloads/website-development/2c-funding-lab`

### Method 2: Use File Explorer or Finder

**On Windows (File Explorer):**
1. Press `Windows Key + E` to open File Explorer
2. Look in the left sidebar for common locations (Documents, Desktop, Downloads)
3. Search for a folder named "website-development"
4. Open it and look for "2c-funding-lab" folder inside

**On Mac (Finder):**
1. Press `Cmd + Space` and type "Finder", press Enter
2. Look in the sidebar for common locations (Documents, Desktop, Downloads)
3. Search for a folder named "website-development"
4. Open it and look for "2c-funding-lab" folder inside

**On Linux:**
1. Open your file manager
2. Look in common locations (Documents, Desktop, Downloads)
3. Search for a folder named "website-development"
4. Open it and look for "2c-funding-lab" folder inside

### Method 3: Search Your Computer

**On Windows:**
1. Press `Windows Key`
2. Type: `website-development`
3. Look for a folder with that name in the results

**On Mac:**
1. Press `Cmd + Space` (opens Spotlight)
2. Type: `website-development`
3. Look for a folder with that name in the results

**On Linux:**
1. Open your file manager
2. Use the search function (usually Ctrl+F)
3. Type: `website-development`

---

## ✅ How to Verify You Found It

Once you think you've found the right folder, check if it contains these files:

```
2c-funding-lab/
├── backend/              ← Folder with Python files
├── frontend/             ← Folder with JavaScript/TypeScript files
├── GETTING-STARTED.md    ← This file exists
├── start-easy.sh         ← This file exists
└── start-easy.bat        ← This file exists
```

If you see these items, **you found it!** ✅

---

## 📝 How to Navigate to It in Terminal/Command Prompt

Once you know where the folder is, you need to navigate to it using your terminal.

### On Windows (Command Prompt or PowerShell):

```bash
# Example if it's in Documents:
cd C:\Users\YourUsername\Documents\website-development\2c-funding-lab

# Example if it's on Desktop:
cd C:\Users\YourUsername\Desktop\website-development\2c-funding-lab
```

### On Mac/Linux (Terminal):

```bash
# Example if it's in Documents:
cd ~/Documents/website-development/2c-funding-lab

# Example if it's on Desktop:
cd ~/Desktop/website-development/2c-funding-lab
```

### Quick Tip: Drag and Drop Method

Instead of typing the path:

1. Type `cd ` (with a space after cd)
2. Drag the **2c-funding-lab** folder from your file explorer/finder into the terminal window
3. The full path will appear automatically!
4. Press Enter

---

## 🚨 Still Can't Find It?

### Option A: Clone the Repository Again

If you can't find the folder, you might not have cloned the repository yet. Here's how:

1. **Open Terminal/Command Prompt**

2. **Navigate to where you want to store the project:**
   ```bash
   # Go to Documents folder
   cd Documents
   ```

3. **Clone the repository:**
   ```bash
   git clone https://github.com/2C-Destiny-Consulting-Group-Inc/website-development.git
   ```

4. **Navigate into the project:**
   ```bash
   cd website-development/2c-funding-lab
   ```

### Option B: Download the Repository as a ZIP

If you don't have Git installed:

1. Go to: https://github.com/2C-Destiny-Consulting-Group-Inc/website-development
2. Click the green "Code" button
3. Click "Download ZIP"
4. Extract the ZIP file to your Documents or Desktop folder
5. Open the extracted folder
6. Look for the "2c-funding-lab" folder inside

---

## ▶️ Next Steps (After You Find the Folder)

Once you've found the folder and navigated to it in your terminal:

1. **Verify you're in the right place:**
   ```bash
   # Windows
   dir
   
   # Mac/Linux
   ls
   ```
   
   You should see: `backend`, `frontend`, `start-easy.sh`, etc.

2. **Run the easy start script:**
   
   **On Windows:**
   ```bash
   start-easy.bat
   ```
   
   **On Mac/Linux:**
   ```bash
   ./start-easy.sh
   ```

3. **Open your browser to:**
   ```
   http://localhost:3000
   ```

---

## 📞 Need More Help?

If you're still stuck, please provide:
- Your operating system (Windows, Mac, or Linux)
- Where you downloaded/cloned the repository
- A screenshot of your file explorer showing the folders you see

This will help troubleshoot the issue!
