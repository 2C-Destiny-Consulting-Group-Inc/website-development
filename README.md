# website-development

## Option 1: Use the Automated Script (Easiest!)

Generate the Launch Kit assets (press announcement, outreach emails, social snippets, and funding one-pager) with the bundled Python script.

### On Windows

1. Open Command Prompt or PowerShell.
2. Navigate to your clone of this project:
   ```
   cd C:\path\to\website-development\2c-funding-lab
   ```
3. (Recommended) Create and activate a virtual environment:
   ```
   py -3 -m venv .venv
   .\.venv\Scripts\activate
   ```
4. Install the required libraries:
   ```
   pip install python-docx reportlab
   ```
5. Run the script:
   ```
   py launch_kit.py
   ```
6. The generated files will appear inside the `launch-kit-output` folder in the project root. Each run overwrites the previous files, so archive them elsewhere if you need historical copies.

> If you prefer WSL or macOS/Linux, the same steps apply; just use your platform’s command to activate the virtual environment (`source .venv/bin/activate`) and run `python launch_kit.py`.