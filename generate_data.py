"""
Smart Home IoT Sensor Data Generator

This script generates simulated smart home sensor data and saves it to a CSV file.
The data includes:
- Temperature (in Celsius)
- Humidity (percentage)
- Energy Usage (in kWh)
- Motion Detection (boolean)
- Appliance Status (ON/OFF)
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import os

def generate_smart_home_data(num_days=30, records_per_day=24):
    """
    Generate simulated smart home sensor data
    
    Parameters:
    - num_days: Number of days of data to generate (default: 30)
    - records_per_day: Number of records per day (default: 24, one per hour)
    
    Returns:
    - pandas DataFrame with sensor data
    """
    
    # Calculate total number of records
    total_records = num_days * records_per_day
    
    # Generate timestamps (hourly intervals)
    start_date = datetime(2024, 1, 1, 0, 0, 0)
    timestamps = [start_date + timedelta(hours=i) for i in range(total_records)]
    
    # Initialize random seed for reproducibility
    np.random.seed(42)
    
    # Generate temperature data (varies by hour and day, with some randomness)
    # Base temperature varies by hour (colder at night, warmer during day)
    base_temp = []
    for i in range(total_records):
        hour = i % 24
        # Simulate daily temperature cycle (colder at night, warmer during day)
        daily_cycle = 20 + 8 * np.sin((hour - 6) * np.pi / 12)  # Peaks around 2 PM
        # Add some random variation
        temp = daily_cycle + np.random.normal(0, 2)
        base_temp.append(max(15, min(35, temp)))  # Keep between 15-35°C
    
    # Generate humidity data (inverse relationship with temperature, with randomness)
    humidity = []
    for temp in base_temp:
        # Humidity tends to be higher when temperature is lower
        base_humidity = 60 - (temp - 20) * 1.5 + np.random.normal(0, 5)
        humidity.append(max(30, min(90, base_humidity)))  # Keep between 30-90%
    
    # Generate energy usage data (higher during day, lower at night)
    energy_usage = []
    for i in range(total_records):
        hour = i % 24
        # Higher energy usage during day (6 AM - 10 PM)
        if 6 <= hour <= 22:
            base_energy = 2.5 + np.random.normal(0, 0.5)
        else:
            base_energy = 0.8 + np.random.normal(0, 0.3)
        energy_usage.append(max(0.1, base_energy))  # Keep positive
    
    # Generate motion detection (more likely during day, less at night)
    motion_detected = []
    for i in range(total_records):
        hour = i % 24
        # Higher probability of motion during day
        if 7 <= hour <= 22:
            prob = 0.4  # 40% chance during day
        else:
            prob = 0.1  # 10% chance at night
        motion_detected.append(1 if np.random.random() < prob else 0)
    
    # Generate appliance status (correlated with energy usage)
    appliance_status = []
    for energy in energy_usage:
        # Appliances more likely to be ON when energy usage is high
        if energy > 2.0:
            prob = 0.8  # 80% chance if high energy
        else:
            prob = 0.3  # 30% chance if low energy
        appliance_status.append('ON' if np.random.random() < prob else 'OFF')
    
    # Introduce some missing values (5% of data) to simulate real-world data issues
    missing_indices = np.random.choice(total_records, size=int(total_records * 0.05), replace=False)
    
    # Create DataFrame
    data = {
        'timestamp': timestamps,
        'temperature': base_temp,
        'humidity': humidity,
        'energy_usage': energy_usage,
        'motion_detected': motion_detected,
        'appliance_status': appliance_status
    }
    
    df = pd.DataFrame(data)
    
    # Introduce missing values randomly
    for col in ['temperature', 'humidity', 'energy_usage']:
        missing_col_indices = np.random.choice(missing_indices, size=len(missing_indices)//3, replace=False)
        df.loc[missing_col_indices, col] = np.nan
    
    # Introduce some duplicates (2% of data)
    duplicate_indices = np.random.choice(total_records, size=int(total_records * 0.02), replace=False)
    duplicate_rows = df.loc[duplicate_indices].copy()
    df = pd.concat([df, duplicate_rows], ignore_index=True)
    
    # Shuffle the dataframe to mix duplicates
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    
    return df

def main():
    """Main function to generate and save data"""
    print("Generating Smart Home IoT Sensor Data...")
    print("This may take a few seconds...")
    
    # Generate 30 days of hourly data (720 records)
    df = generate_smart_home_data(num_days=30, records_per_day=24)
    
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    # Save to CSV
    output_file = 'data/smart_home_sensor_data.csv'
    df.to_csv(output_file, index=False)
    
    print(f"\n✓ Data generated successfully!")
    print(f"✓ Saved to: {output_file}")
    print(f"✓ Total records: {len(df)}")
    print(f"✓ Columns: {', '.join(df.columns)}")
    print(f"✓ Missing values: {df.isnull().sum().sum()}")
    print(f"✓ Duplicates: {df.duplicated().sum()}")
    print("\nYou can now run the Flask app with: py app.py")

if __name__ == '__main__':
    main()

