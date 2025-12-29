# Smart Home IoT Data Exploration & Preparation Project

## 📋 Project Summary (1-2 lines)

**A Flask-based web application for exploring and preparing smart home IoT sensor data, featuring data quality analysis, cleaning operations, and interactive visualizations to understand sensor patterns and energy consumption trends.**

---

## 🎯 Project Overview

This project is designed to help beginners understand **data exploration** and **data preparation** using simulated smart home IoT sensor data. It demonstrates how to work with real-world data that contains common issues like missing values, duplicates, and inconsistent formats.

### What is This Project About?

Imagine you have a smart home with sensors collecting data every hour about:
- **Temperature** - How hot or cold your home is
- **Humidity** - How much moisture is in the air
- **Energy Usage** - How much electricity you're using
- **Motion Detection** - Whether someone is moving around
- **Appliance Status** - Whether your appliances are ON or OFF

This project shows you how to:
1. **Explore** this data to understand what you have
2. **Identify** problems (missing values, duplicates)
3. **Prepare** the data by cleaning and organizing it
4. **Visualize** the data to find patterns and insights

---

## 🎓 Problem Statement

Smart homes generate massive amounts of sensor data every day. Before we can analyze this data to make intelligent decisions (like optimizing energy usage or improving comfort), we need to:

- **Explore** the raw data to understand what we have
- **Identify** data quality issues (missing values, duplicates, errors)
- **Prepare** the data by cleaning and transforming it
- **Extract** meaningful features (like peak usage hours, daily patterns)

This project demonstrates how to perform these tasks using Python, Pandas, and Flask in a beginner-friendly way.

---

## 🎯 Project Objectives

### Data Exploration Objectives
- ✅ View raw sensor data in tabular format
- ✅ Identify missing values and their patterns
- ✅ Understand data distribution and statistics
- ✅ Detect duplicate records

### Data Preparation Objectives
- ✅ Handle missing values using appropriate strategies
- ✅ Remove duplicate records
- ✅ Convert timestamps to proper datetime format
- ✅ Extract features (hour, day of week, peak usage)

---

## 📊 Dataset Description

Our simulated Smart Home IoT dataset contains **30 days** of hourly sensor readings with the following sensors:

| Sensor | Description | Unit | Range |
|--------|-------------|------|-------|
| **Temperature** | Room temperature | Celsius (°C) | 15-35°C |
| **Humidity** | Air humidity level | Percentage (%) | 30-90% |
| **Energy Usage** | Power consumption | Kilowatt-hours (kWh) | 0.1-3.5 kWh |
| **Motion Detection** | Presence detection | Binary (0/1) | 0 = No motion, 1 = Motion |
| **Appliance Status** | Device state | Text | ON/OFF |

### Data Characteristics
- **Total Records:** ~720 records (30 days × 24 hours)
- **Data Quality Issues:** 
  - ~5% missing values (simulating real-world data collection issues)
  - ~2% duplicate records
- **Time Period:** January 2024 (30 days)

---

## 🏗️ Project Architecture

```
smart-home-iot-project/
│
├── app.py                      # Main Flask application
├── generate_data.py            # Script to generate CSV sensor data
├── requirements.txt            # Python dependencies
├── README.md                   # This file
│
├── data/                       # Data directory
│   └── smart_home_sensor_data.csv  # Generated sensor data
│
├── templates/                  # HTML templates
│   ├── base.html              # Base template with navigation
│   ├── index.html             # Home page
│   ├── exploration.html       # Data exploration page
│   └── dashboard.html         # Dashboard with visualizations
│
└── static/                     # Static files (CSS, JS, images)
    └── style.css              # Custom CSS styles
```

---

## 🚀 Setup Instructions

### Prerequisites
- Python 3.8 or higher installed
- pip (Python package installer)

### Step 1: Install Python Dependencies

Open your command prompt (Windows) or terminal (Mac/Linux) and run:

```bash
pip install -r requirements.txt
```

This will install:
- **Flask** - Web framework for building the application
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing
- **Matplotlib** - Plotting library
- **Seaborn** - Statistical visualization

### Step 2: Generate Sensor Data

Run the data generation script to create the CSV file:

```bash
python generate_data.py
```

This will:
- Generate 30 days of simulated sensor data
- Save it to `data/smart_home_sensor_data.csv`
- Introduce realistic data quality issues (missing values, duplicates)

**Expected Output:**
```
Generating Smart Home IoT Sensor Data...
This may take a few seconds...

✓ Data generated successfully!
✓ Saved to: data/smart_home_sensor_data.csv
✓ Total records: 720
✓ Columns: timestamp, temperature, humidity, energy_usage, motion_detected, appliance_status
✓ Missing values: 36
✓ Duplicates: 14

You can now run the Flask app with: python app.py
```

### Step 3: Start the Flask Application

Run the Flask app:

```bash
python app.py
```

**Expected Output:**
```
Warning: data/smart_home_sensor_data.csv not found. Please run generate_data.py first.
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

### Step 4: Open in Browser

Open your web browser and navigate to:

```
http://127.0.0.1:5000
```

You should see the home page of the Smart Home IoT Data Explorer!

---

## 📱 Using the Application

### Home Page (`/`)
- **Project Overview:** Learn about the project
- **Problem Statement:** Understand why data exploration is important
- **Dataset Description:** See what sensors we're working with
- **Quick Start Guide:** Step-by-step instructions

### Data Exploration Page (`/exploration`)
- **Summary Statistics:** Total records, columns, missing values, duplicates
- **Data Quality Summary:** Missing values and data types by column
- **Numeric Summary:** Mean, median, min, max for numeric columns
- **Sample Data Table:** First 100 records with highlighted missing values

### Dashboard Page (`/dashboard`)
- **Data Preparation Summary:** Shows what cleaning was done
- **Key Insights:** Average temperature, humidity, energy usage, motion detections
- **Interactive Charts:**
  - Temperature over time (line chart)
  - Energy usage by hour (bar chart)
  - Energy usage by day of week (area chart)
- **Peak Usage Analysis:** Identifies hours with highest energy consumption

---

## 🔍 Data Exploration Steps Explained

### 1. Viewing Raw Data
We start by looking at the actual data to see what we're working with. This helps us understand the structure and spot obvious issues.

**Why?** You can't fix what you don't understand. Viewing raw data gives you context.

### 2. Identifying Missing Values
Missing values are gaps in our data. We count how many are missing in each column to understand data completeness.

**Why?** Missing values can cause errors in analysis. We need to know where they are before fixing them.

### 3. Understanding Data Distribution
We calculate statistics (mean, median, min, max) to understand how values are distributed across the dataset.

**Why?** This helps us spot outliers (unusual values) and understand normal ranges.

### 4. Finding Duplicates
Duplicate records are exact copies that can skew our analysis. We identify and count them for removal.

**Why?** Duplicates can make patterns appear stronger than they actually are.

---

## 🧹 Data Preparation Steps Explained

### 1. Handling Missing Values
**Method:** Fill missing numeric values with the **median** (middle value) of that column.

**Why Median?** The median is less affected by extreme values (outliers) than the mean, making it more robust.

**Example:** If we have temperatures [20, 22, NaN, 24, 25], the median is 23, so we fill NaN with 23.

### 2. Removing Duplicates
**Method:** Identify and remove exact duplicate rows.

**Why?** Duplicates can bias our analysis and waste computational resources.

### 3. Timestamp Conversion
**Method:** Convert timestamp strings to proper datetime format.

**Why?** This allows us to extract time-based features like hour, day, month.

**Example:** "2024-01-01 14:30:00" → datetime object → extract hour = 14

### 4. Feature Extraction
**New Features Created:**
- **hour:** Hour of day (0-23) - extracted from timestamp
- **day_of_week:** Day number (0=Monday, 6=Sunday)
- **day_name:** Day name (Monday, Tuesday, etc.)
- **is_peak_hour:** Boolean indicating high energy usage hours

**Why?** These features help us find patterns like "energy usage is highest at 2 PM" or "weekends use more energy."

---

## 📈 Key Insights from the Dashboard

After data preparation, you can discover insights like:

- **Peak Energy Hours:** Which hours of the day consume the most energy
- **Daily Patterns:** How energy usage varies throughout the day
- **Weekly Patterns:** Differences between weekdays and weekends
- **Temperature Trends:** Daily temperature cycles
- **Motion Patterns:** When motion is most frequently detected

---

## ✅ Advantages of This Project

1. **Beginner-Friendly:** Clear explanations and step-by-step guidance
2. **Stand-Alone:** No cloud services or external APIs required
3. **Realistic Data:** Simulates real-world data quality issues
4. **Interactive:** Web-based interface for easy exploration
5. **Educational:** Explains both "what" and "why" for each step
6. **Complete:** Includes data generation, exploration, preparation, and visualization

---

## ⚠️ Limitations

1. **Simulated Data:** Uses generated data, not real IoT sensors
2. **Local Only:** Runs only on your computer, not accessible online
3. **Basic Cleaning:** Uses simple strategies (median imputation) - real projects may need more sophisticated methods
4. **No Machine Learning:** Focuses only on exploration and preparation, not prediction
5. **Limited Scale:** Designed for small datasets (~1000 records)

---

## 🔮 Future Enhancements

1. **Real-Time Data:** Connect to actual IoT sensors or APIs
2. **Advanced Cleaning:** Implement more sophisticated missing value strategies
3. **Data Export:** Allow users to download cleaned data as CSV
4. **More Visualizations:** Add correlation heatmaps, distribution plots
5. **Filtering:** Allow users to filter data by date range or sensor type
6. **Anomaly Detection:** Identify unusual patterns or outliers
7. **Data Validation:** Add rules to validate data quality
8. **Machine Learning:** Add predictive models (energy forecasting, anomaly detection)

---

## 🎤 Viva-Ready Explanations

### What is this project about?
"This project demonstrates data exploration and preparation techniques using simulated smart home IoT sensor data. It's a Flask web application that allows users to explore raw sensor data, identify data quality issues like missing values and duplicates, clean the data, and visualize insights through interactive charts."

### Why did you choose this topic?
"Smart homes generate large amounts of sensor data, and before we can analyze this data for insights, we need to explore and prepare it. This project teaches fundamental data science skills that are essential for any data analysis project."

### What technologies did you use?
"I used Python as the programming language, Flask for the web framework, Pandas for data manipulation, NumPy for numerical operations, and Chart.js for interactive visualizations in the browser."

### What challenges did you face?
"Some challenges included handling missing values appropriately, creating meaningful visualizations, and ensuring the data generation script produces realistic patterns. I solved these by researching best practices for data imputation and using median values for numeric columns."

### What did you learn?
"I learned how to work with real-world data that has quality issues, how to use Flask to create web applications, how to visualize data effectively, and the importance of data preparation before analysis."

---

## 📚 Key Concepts Explained

### Data Exploration
The process of understanding your data by examining it, calculating statistics, and identifying patterns or issues.

### Data Preparation (Data Cleaning)
The process of fixing data quality issues like missing values, duplicates, and inconsistent formats to make data ready for analysis.

### Missing Values
Gaps in data where values were not recorded. Can be caused by sensor failures, network issues, or human error.

### Feature Extraction
Creating new columns from existing data. For example, extracting the hour from a timestamp to analyze patterns by time of day.

### Median vs Mean
- **Mean:** Average value (sum of all values ÷ count)
- **Median:** Middle value when sorted (less affected by outliers)

---

## 🐛 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'flask'"
**Solution:** Install dependencies: `pip install -r requirements.txt`

### Issue: "Data file not found"
**Solution:** Run `python generate_data.py` first to generate the CSV file

### Issue: Charts not displaying
**Solution:** Check browser console for errors. Ensure internet connection for Chart.js CDN

### Issue: Port 5000 already in use
**Solution:** Change port in `app.py` last line: `app.run(debug=True, port=5001)`

---

## 📝 Project Files Description

- **app.py:** Main Flask application with routes and data processing logic
- **generate_data.py:** Script to generate realistic sensor data with quality issues
- **requirements.txt:** List of Python packages needed
- **templates/:** HTML templates for web pages
- **data/:** Directory containing the generated CSV file

---

## 🎓 Learning Outcomes

After completing this project, you should understand:

1. ✅ How to explore raw data and identify quality issues
2. ✅ How to handle missing values and duplicates
3. ✅ How to extract features from timestamps
4. ✅ How to create a Flask web application
5. ✅ How to visualize data using charts
6. ✅ How to prepare data for analysis

---

## 📞 Support

If you encounter any issues:
1. Check the Troubleshooting section above
2. Verify all dependencies are installed
3. Ensure Python 3.8+ is installed
4. Make sure you've generated the data file first

---

## 📄 License

This is an educational project for university coursework.

---

## 👨‍💻 Author

Created for university course project - Smart Home IoT Data Exploration & Preparation

---

**Happy Learning! 🚀**
