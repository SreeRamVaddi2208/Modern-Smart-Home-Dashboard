# Project Architecture & Explanation

## 🏗️ Project Structure

```
modern-smart-home-dashboard/
│
├── app.py                      # Main Flask application
│   ├── Routes: /, /exploration, /dashboard, /api/data
│   ├── Data loading functions
│   ├── Data preparation functions
│   └── Summary generation
│
├── generate_data.py            # Data generation script
│   ├── Generates 30 days of sensor data
│   ├── Introduces missing values (~5%)
│   ├── Introduces duplicates (~2%)
│   └── Saves to CSV file
│
├── requirements.txt            # Python dependencies
│
├── README.md                   # Complete project documentation
├── SETUP_GUIDE.md              # Step-by-step setup instructions
├── VIVA_PREPARATION.md         # Viva questions and answers
├── PROJECT_ARCHITECTURE.md     # This file
│
├── data/                       # Data directory
│   └── smart_home_sensor_data.csv  # Generated sensor data
│
├── templates/                  # HTML templates
│   ├── base.html              # Base template with navigation
│   ├── index.html             # Home page
│   ├── exploration.html       # Data exploration page
│   └── dashboard.html         # Dashboard with charts
│
└── static/                     # Static files (CSS, JS, images)
    └── (empty - using CDN for Bootstrap and Chart.js)
```

---

## 🔄 Data Flow

```
1. Data Generation
   generate_data.py → Creates CSV file → data/smart_home_sensor_data.csv

2. Data Loading
   app.py → load_data() → Reads CSV → Returns pandas DataFrame

3. Data Exploration
   /exploration route → Shows raw data → Identifies issues → Displays statistics

4. Data Preparation
   /dashboard route → prepare_data() → Cleans data → Extracts features

5. Visualization
   /dashboard route → Generates insights → Creates charts → Displays in browser
```

---

## 📊 Application Flow

### Home Page (/)
- **Purpose:** Introduction and overview
- **Content:** Project description, problem statement, objectives, dataset info
- **Template:** `index.html`

### Data Exploration Page (/exploration)
- **Purpose:** Explore raw data and identify issues
- **Features:**
  - Summary statistics cards
  - Missing values table
  - Data types table
  - Numeric summary statistics
  - Sample data table (first 100 records)
- **Template:** `exploration.html`

### Dashboard Page (/dashboard)
- **Purpose:** View cleaned data and visualizations
- **Features:**
  - Data preparation summary
  - Key insights cards
  - Interactive charts (temperature, energy usage)
  - Peak usage analysis
- **Template:** `dashboard.html`

---

## 🧩 Key Functions Explained

### In `app.py`:

#### `load_data()`
- **Purpose:** Load CSV file into pandas DataFrame
- **Returns:** DataFrame or None if file not found
- **Why:** Centralized data loading, easy to modify data source

#### `prepare_data(df)`
- **Purpose:** Clean and prepare data for analysis
- **Steps:**
  1. Handle missing values (fill with median)
  2. Remove duplicates
  3. Convert timestamps
  4. Extract features (hour, day, peak usage)
- **Returns:** Cleaned DataFrame and count of duplicates removed
- **Why:** Separates cleaning logic from display logic

#### `get_data_summary(df)`
- **Purpose:** Generate summary statistics
- **Returns:** Dictionary with counts, missing values, data types, numeric summaries
- **Why:** Pre-calculates statistics for efficient display

### In `generate_data.py`:

#### `generate_smart_home_data(num_days, records_per_day)`
- **Purpose:** Create realistic sensor data
- **Features:**
  - Simulates daily temperature cycles
  - Creates correlated data (humidity vs temperature)
  - Introduces realistic data quality issues
- **Returns:** pandas DataFrame
- **Why:** Generates test data that mimics real-world IoT sensors

---

## 🎨 Frontend Architecture

### Base Template (`base.html`)
- **Purpose:** Common layout for all pages
- **Includes:**
  - Navigation bar
  - Bootstrap CSS (from CDN)
  - Chart.js library (from CDN)
  - Font Awesome icons (from CDN)
  - Common styling

### Page Templates
- **Inherit from:** `base.html`
- **Use:** Jinja2 templating for dynamic content
- **Charts:** Chart.js for interactive visualizations

---

## 🔧 Technology Stack

### Backend
- **Flask:** Web framework
- **Pandas:** Data manipulation
- **NumPy:** Numerical operations

### Frontend
- **Bootstrap 5:** CSS framework (from CDN)
- **Chart.js:** Chart library (from CDN)
- **Font Awesome:** Icons (from CDN)
- **Jinja2:** Template engine (built into Flask)

### Data Format
- **CSV:** Comma-separated values file
- **JSON:** API responses

---

## 📈 Data Processing Pipeline

```
Raw CSV Data
    ↓
Load into Pandas DataFrame
    ↓
Data Exploration:
  - View raw data
  - Count missing values
  - Identify duplicates
  - Calculate statistics
    ↓
Data Preparation:
  - Fill missing values (median)
  - Remove duplicates
  - Convert timestamps
  - Extract features
    ↓
Cleaned DataFrame
    ↓
Generate Insights:
  - Calculate averages
  - Find peak hours
  - Group by time periods
    ↓
Visualization:
  - Create charts
  - Display in dashboard
```

---

## 🎯 Key Design Decisions

### Why Flask?
- Lightweight and beginner-friendly
- Easy local development
- Good for small to medium projects
- Excellent documentation

### Why Pandas?
- Industry standard for data manipulation
- Easy CSV reading/writing
- Powerful data cleaning functions
- Great for data exploration

### Why Median for Missing Values?
- More robust to outliers than mean
- Preserves data distribution better
- Simple and effective for numeric data

### Why Simulated Data?
- No need for real IoT hardware
- Controlled data quality issues
- Reproducible results
- Perfect for learning

### Why Chart.js?
- Easy to use
- Interactive charts
- No server-side rendering needed
- Works well with Flask templates

---

## 🔐 Security Considerations

**Note:** This is a local-only application for educational purposes.

- No user authentication (not needed for local use)
- No database (uses CSV files)
- No external API calls (all data is local)
- Debug mode enabled (for development only)

**For production:**
- Disable debug mode
- Add authentication if needed
- Use proper database
- Implement input validation

---

## 🚀 Performance Considerations

- **Data Sampling:** Charts use sampled data (every 10th record) for performance
- **Limited Records:** Dashboard shows first 1000 records via API
- **Client-Side Rendering:** Charts rendered in browser (reduces server load)
- **Static Assets:** Using CDN for libraries (faster loading)

---

## 📝 Code Organization Principles

1. **Separation of Concerns:**
   - Data generation separate from application
   - Data loading separate from processing
   - Templates separate from logic

2. **Reusability:**
   - Functions can be called multiple times
   - Templates inherit from base
   - Summary functions reusable

3. **Maintainability:**
   - Clear function names
   - Comments explaining why
   - Organized file structure

4. **Beginner-Friendly:**
   - Simple, readable code
   - Clear variable names
   - Step-by-step comments

---

## 🎓 Learning Outcomes

After working with this project, you understand:

1. **Flask Basics:**
   - Routes and views
   - Templates and Jinja2
   - Request handling

2. **Data Science:**
   - Data exploration techniques
   - Data cleaning methods
   - Feature extraction

3. **Web Development:**
   - HTML/CSS/JavaScript basics
   - Chart visualization
   - Responsive design

4. **Python:**
   - Pandas operations
   - NumPy usage
   - File I/O

---

## 🔮 Extension Ideas

1. **Add More Sensors:** Light levels, air quality, water usage
2. **Real-Time Updates:** WebSocket for live data
3. **User Authentication:** Login system
4. **Data Export:** Download cleaned CSV
5. **Advanced Charts:** Heatmaps, correlation matrices
6. **Data Filtering:** Filter by date range or sensor
7. **Alerts:** Notify on unusual patterns
8. **Database:** Store data in SQLite or PostgreSQL

---

**This architecture supports a complete, educational data exploration and preparation project!**

