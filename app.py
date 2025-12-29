"""
Smart Home IoT Data Exploration & Preparation Flask Application

This is the main Flask application file that handles:
- Routing (home page, data exploration, dashboard)
- Data loading and processing
- Serving HTML templates
"""

from flask import Flask, render_template, jsonify
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import os
import json

# Initialize Flask app
app = Flask(__name__)

# Configuration
DATA_FILE = 'data/smart_home_sensor_data.csv'

def load_data():
    """Load the CSV data file into a pandas DataFrame"""
    if os.path.exists(DATA_FILE):
        df = pd.read_csv(DATA_FILE)
        # Convert timestamp to datetime if it exists
        if 'timestamp' in df.columns:
            df['timestamp'] = pd.to_datetime(df['timestamp'])
        return df
    return None

def prepare_data(df):
    """
    Data Preparation Function
    This function handles:
    1. Missing values
    2. Duplicates
    3. Timestamp conversion
    4. Feature extraction (hour, day, peak usage)
    """
    # Create a copy to avoid modifying original
    df_clean = df.copy()
    
    # 1. Handle missing values - fill with median for numeric columns
    numeric_cols = df_clean.select_dtypes(include=[np.number]).columns
    for col in numeric_cols:
        if df_clean[col].isnull().sum() > 0:
            df_clean[col].fillna(df_clean[col].median(), inplace=True)
    
    # 2. Remove duplicates
    initial_count = len(df_clean)
    df_clean = df_clean.drop_duplicates()
    duplicates_removed = initial_count - len(df_clean)
    
    # 3. Timestamp conversion and feature extraction
    if 'timestamp' in df_clean.columns:
        df_clean['timestamp'] = pd.to_datetime(df_clean['timestamp'])
        
        # Extract hour of day (0-23)
        df_clean['hour'] = df_clean['timestamp'].dt.hour
        
        # Extract day of week (Monday=0, Sunday=6)
        df_clean['day_of_week'] = df_clean['timestamp'].dt.dayofweek
        
        # Extract day name
        df_clean['day_name'] = df_clean['timestamp'].dt.day_name()
        
        # Identify peak usage hours (hours with energy usage > 75th percentile)
        if 'energy_usage' in df_clean.columns:
            energy_threshold = df_clean['energy_usage'].quantile(0.75)
            df_clean['is_peak_hour'] = df_clean['energy_usage'] > energy_threshold
    
    return df_clean, duplicates_removed

def get_data_summary(df):
    """Generate summary statistics for the dataset"""
    summary = {
        'total_records': len(df),
        'total_columns': len(df.columns),
        'missing_values': df.isnull().sum().to_dict(),
        'data_types': df.dtypes.astype(str).to_dict(),
        'numeric_summary': {}
    }
    
    # Get summary statistics for numeric columns
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    if len(numeric_cols) > 0:
        summary['numeric_summary'] = df[numeric_cols].describe().to_dict()
    
    return summary

@app.route('/')
def home():
    """Home page route - displays project overview"""
    return render_template('index.html')

@app.route('/exploration')
def exploration():
    """Data exploration page - shows raw data and summaries"""
    df = load_data()
    
    if df is None:
        return render_template('exploration.html', 
                             error="Data file not found. Please run generate_data.py first.")
    
    # Get first 100 rows for display
    sample_data = df.head(100).to_dict('records')
    
    # Get summary statistics
    summary = get_data_summary(df)
    
    # Count missing values
    missing_count = df.isnull().sum().sum()
    
    # Count duplicates
    duplicate_count = df.duplicated().sum()
    
    return render_template('exploration.html',
                         sample_data=sample_data,
                         summary=summary,
                         missing_count=missing_count,
                         duplicate_count=duplicate_count,
                         total_records=len(df),
                         columns=list(df.columns))

@app.route('/dashboard')
def dashboard():
    try:
        # Load the data (using the existing load_data and prepare_data functions)
        df_raw = load_data()
        
        if df_raw is None:
             return render_template('dashboard.html', 
                                  error="Data file not found. Please generate data first.", 
                                  insights={}, 
                                  chart_data={}, 
                                  duplicates_removed=0, 
                                  total_records=0)
                                  
        # Clean the data
        df, duplicates_removed = prepare_data(df_raw)
        
        # Calculate insights
        insights = {
            'avg_temperature': round(df['temperature'].mean(), 1),
            'min_temperature': round(df['temperature'].min(), 1),
            'max_temperature': round(df['temperature'].max(), 1),
            'avg_humidity': round(df['humidity'].mean(), 1),
            'total_energy': round(df['energy_usage'].sum(), 2),
            'avg_energy': round(df['energy_usage'].mean(), 2),
            'motion_detections': int(df['motion_detected'].sum()),
            'motion_percentage': round((df['motion_detected'].sum() / len(df)) * 100, 1),
            'peak_hour': int(df.groupby('hour')['energy_usage'].mean().idxmax()),
            'appliances_on': int((df['appliance_status'] == 'ON').sum()),
            'appliance_on_percentage': round(((df['appliance_status'] == 'ON').sum() / len(df)) * 100, 1)
        }
        
        # Prepare chart data - IMPORTANT: Convert to lists!
        chart_data = {
            'temperature': {
                'timestamps': df['timestamp'].dt.strftime('%Y-%m-%d %H:%M').tolist()[:100],  # First 100 points
                'values': df['temperature'].tolist()[:100]  # Use .tolist() to convert to list
            },
            'hourly_energy': {
                'hours': df.groupby('hour')['energy_usage'].mean().index.tolist(),  # Convert index to list
                'values': df.groupby('hour')['energy_usage'].mean().tolist()  # Convert values to list
            },
            'daily_energy': {
                'days': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                'values': df.groupby('day_of_week')['energy_usage'].mean().tolist()  # Convert to list
            }
        }
        
        return render_template('dashboard.html', 
                             insights=insights, 
                             chart_data=chart_data, 
                             duplicates_removed=duplicates_removed, 
                             total_records=len(df), 
                             error=None)
    
    except Exception as e:
        return render_template('dashboard.html', 
                             error=f"An error occurred: {str(e)}", 
                             insights={}, 
                             chart_data={}, 
                             duplicates_removed=0, 
                             total_records=0)

@app.route('/api/data')
def api_data():
    """API endpoint to get raw data as JSON"""
    df = load_data()
    if df is None:
        return jsonify({'error': 'Data not found'}), 404
    
    # Return first 1000 records as JSON
    return jsonify(df.head(1000).to_dict('records'))

if __name__ == '__main__':
    # Check if data file exists
    if not os.path.exists(DATA_FILE):
        print(f"Warning: {DATA_FILE} not found. Please run generate_data.py first.")
    
    # Run the Flask app
    app.run(debug=True, host='127.0.0.1', port=5000)

