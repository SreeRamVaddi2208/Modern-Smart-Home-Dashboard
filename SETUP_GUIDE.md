# Step-by-Step Setup Guide

## For Complete Beginners

This guide will walk you through setting up and running the Smart Home IoT Data Exploration project from scratch.

---

## Step 1: Check Python Installation

### Windows:
1. Open Command Prompt (Press `Win + R`, type `cmd`, press Enter)
2. Type: `py --version`
3. You should see something like: `Python 3.8.0` or higher

**If Python is not installed:**
- Download from: https://www.python.org/downloads/
- During installation, check "Add Python to PATH"

### Mac/Linux:
1. Open Terminal
2. Type: `python3 --version`
3. You should see Python version 3.8 or higher

---

## Step 2: Navigate to Project Folder

### Windows:
```bash
cd C:\Users\darsh\Downloads\modern-smart-home-dashboard
```

### Mac/Linux:
```bash
cd ~/Downloads/modern-smart-home-dashboard
```

---

## Step 3: Install Required Packages

### Windows:
```bash
pip install -r requirements.txt
```

### Mac/Linux:
```bash
pip3 install -r requirements.txt
```

**What this does:** Installs Flask, Pandas, NumPy, Matplotlib, and Seaborn - all the tools we need.

**Expected output:** You'll see packages being downloaded and installed. Wait until it says "Successfully installed..."

---

## Step 4: Generate the Sensor Data

### Windows:
```bash
python generate_data.py
```

### Mac/Linux:
```bash
python3 generate_data.py
```

**What this does:** Creates a CSV file with 30 days of simulated smart home sensor data.

**Expected output:**
```
Generating Smart Home IoT Sensor Data...
This may take a few seconds...

✓ Data generated successfully!
✓ Saved to: data/smart_home_sensor_data.csv
✓ Total records: 720
...
```

**Check:** Look in the `data` folder - you should see `smart_home_sensor_data.csv`

---

## Step 5: Start the Flask Application

### Windows:
```bash
py app.py
```

### Mac/Linux:
```bash
python3 app.py
```

**What this does:** Starts the web server on your computer.

**Expected output:**
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

**Important:** Keep this window open! The server is running.

---

## Step 6: Open in Web Browser

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Type in the address bar: `http://127.0.0.1:5000`
3. Press Enter

**You should see:** The home page of the Smart Home IoT Data Explorer!

---

## Step 7: Explore the Application

### Home Page
- Read the project overview
- Understand the problem statement
- Learn about the sensors

### Data Exploration Page
- Click "Data Exploration" in the navigation menu
- See raw data, missing values, statistics
- Understand data quality issues

### Dashboard Page
- Click "Dashboard" in the navigation menu
- View cleaned data visualizations
- See insights and patterns

---

## Common Issues and Solutions

### Issue 1: "python is not recognized"
**Solution:** Use `python3` instead of `python` (Mac/Linux), or reinstall Python with "Add to PATH" checked (Windows)

### Issue 2: "pip is not recognized"
**Solution:** Use `pip3` instead of `pip` (Mac/Linux), or install pip separately

### Issue 3: "ModuleNotFoundError"
**Solution:** Make sure you ran `pip install -r requirements.txt` successfully

### Issue 4: "Data file not found"
**Solution:** Run `python generate_data.py` first (or `python3 generate_data.py`)

### Issue 5: "Port 5000 already in use"
**Solution:** 
1. Close other applications using port 5000
2. Or change the port in `app.py` (last line) to `app.run(debug=True, port=5001)`
3. Then access at `http://127.0.0.1:5001`

---

## Stopping the Application

1. Go back to the Command Prompt/Terminal window
2. Press `CTRL + C` (Windows) or `CMD + C` (Mac)
3. The server will stop

---

## Running the Project Again

Next time you want to run the project:

1. Navigate to project folder
2. Run: `python app.py` (or `python3 app.py`)
3. Open browser to `http://127.0.0.1:5000`

**Note:** You don't need to regenerate data or reinstall packages unless you delete the `data` folder or `requirements.txt` changes.

---

## Project Structure Check

Your project folder should look like this:

```
modern-smart-home-dashboard/
├── app.py
├── generate_data.py
├── requirements.txt
├── README.md
├── SETUP_GUIDE.md
├── data/
│   └── smart_home_sensor_data.csv
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── exploration.html
│   └── dashboard.html
└── static/
```

---

## Need Help?

1. Check the README.md for detailed explanations
2. Review error messages carefully
3. Ensure all steps were completed in order
4. Verify Python version is 3.8 or higher

---

**You're all set! Happy exploring! 🎉**

