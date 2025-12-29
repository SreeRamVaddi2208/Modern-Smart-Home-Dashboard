import { Injectable } from '@angular/core';
import { SensorRecord, CleanedSensorRecord, DataSummary, DataInsights, ChartData, DataPreparationSummary } from '../../models/sensor-data.model';

/**
 * Data Processing Service
 * Handles data exploration and preparation operations
 */
@Injectable({
  providedIn: 'root'
})
export class DataProcessingService {
  
  /**
   * Prepare data: handle missing values, remove duplicates, extract features
   */
  prepareData(records: SensorRecord[]): { cleaned: CleanedSensorRecord[], summary: DataPreparationSummary } {
    let cleaned = [...records] as CleanedSensorRecord[];
    const initialCount = cleaned.length;
    
    // 1. Remove duplicates
    cleaned = this.removeDuplicates(cleaned);
    const duplicatesRemoved = initialCount - cleaned.length;
    
    // 2. Handle missing values (fill with median)
    const missingValuesFilled = this.fillMissingValues(cleaned);
    
    // 3. Extract features from timestamps
    cleaned = this.extractFeatures(cleaned);
    
    return {
      cleaned,
      summary: {
        duplicatesRemoved,
        totalRecords: cleaned.length,
        missingValuesFilled
      }
    };
  }
  
  /**
   * Remove duplicate records
   */
  private removeDuplicates(records: SensorRecord[]): CleanedSensorRecord[] {
    const seen = new Set<string>();
    return records.filter(record => {
      const key = JSON.stringify(record);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    }) as CleanedSensorRecord[];
  }
  
  /**
   * Fill missing values with median for numeric columns
   */
  private fillMissingValues(records: CleanedSensorRecord[]): number {
    let filled = 0;
    const numericFields: (keyof CleanedSensorRecord)[] = ['temperature', 'humidity', 'energyUsage'];
    
    numericFields.forEach(field => {
      const values = records
        .map(r => r[field])
        .filter((v): v is number => v !== null && typeof v === 'number');
      
      if (values.length === 0) return;
      
      const median = this.calculateMedian(values);
      const missing = records.filter(r => r[field] === null);
      
      missing.forEach(record => {
        (record as any)[field] = median;
        filled++;
      });
    });
    
    return filled;
  }
  
  /**
   * Calculate median of numeric array
   */
  private calculateMedian(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }
  
  /**
   * Extract features from timestamps
   */
  private extractFeatures(records: CleanedSensorRecord[]): CleanedSensorRecord[] {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return records.map(record => {
      const timestamp = typeof record.timestamp === 'string' 
        ? new Date(record.timestamp) 
        : record.timestamp;
      
      const hour = timestamp.getHours();
      const dayOfWeek = timestamp.getDay();
      const dayName = dayNames[dayOfWeek];
      
      // Calculate energy threshold for peak hours
      const energyValues = records
        .map(r => r.energyUsage)
        .filter((v): v is number => v !== null && typeof v === 'number');
      const threshold = this.calculatePercentile(energyValues, 0.75);
      const isPeakHour = (record.energyUsage ?? 0) > threshold;
      
      return {
        ...record,
        hour,
        dayOfWeek,
        dayName,
        isPeakHour
      };
    });
  }
  
  /**
   * Calculate percentile
   */
  private calculatePercentile(values: number[], percentile: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * percentile) - 1;
    return sorted[Math.max(0, index)];
  }
  
  /**
   * Generate data summary statistics
   */
  generateSummary(records: SensorRecord[]): DataSummary {
    const numericFields = ['temperature', 'humidity', 'energyUsage'];
    const missingValues: { [key: string]: number } = {};
    const dataTypes: { [key: string]: string } = {};
    const numericSummary: { [key: string]: any } = {};
    
    // Calculate missing values
    ['timestamp', 'temperature', 'humidity', 'energyUsage', 'motionDetected', 'applianceStatus'].forEach(field => {
      missingValues[field] = records.filter(r => (r as any)[field] === null || (r as any)[field] === undefined).length;
      dataTypes[field] = typeof (records[0] as any)[field];
    });
    
    // Calculate numeric statistics
    numericFields.forEach(field => {
      const values = records
        .map(r => (r as any)[field])
        .filter((v): v is number => v !== null && typeof v === 'number');
      
      if (values.length > 0) {
        const sorted = [...values].sort((a, b) => a - b);
        numericSummary[field] = {
          count: values.length,
          mean: values.reduce((a, b) => a + b, 0) / values.length,
          std: this.calculateStdDev(values),
          min: sorted[0],
          '25%': this.calculatePercentile(sorted, 0.25),
          '50%': this.calculatePercentile(sorted, 0.5),
          '75%': this.calculatePercentile(sorted, 0.75),
          max: sorted[sorted.length - 1]
        };
      }
    });
    
    return {
      totalRecords: records.length,
      totalColumns: 6,
      missingValues,
      dataTypes,
      numericSummary
    };
  }
  
  /**
   * Calculate standard deviation
   */
  private calculateStdDev(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
    const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
    return Math.sqrt(avgSquaredDiff);
  }
  
  /**
   * Generate insights from cleaned data
   */
  generateInsights(cleaned: CleanedSensorRecord[]): DataInsights {
    const insights: DataInsights = {};
    
    const temperatures = cleaned.map(r => r.temperature).filter((v): v is number => v !== null);
    if (temperatures.length > 0) {
      insights.avgTemperature = this.round(temperatures.reduce((a, b) => a + b, 0) / temperatures.length, 2);
      insights.minTemperature = this.round(Math.min(...temperatures), 2);
      insights.maxTemperature = this.round(Math.max(...temperatures), 2);
    }
    
    const humidities = cleaned.map(r => r.humidity).filter((v): v is number => v !== null);
    if (humidities.length > 0) {
      insights.avgHumidity = this.round(humidities.reduce((a, b) => a + b, 0) / humidities.length, 2);
    }
    
    const energies = cleaned.map(r => r.energyUsage).filter((v): v is number => v !== null);
    if (energies.length > 0) {
      insights.totalEnergy = this.round(energies.reduce((a, b) => a + b, 0), 2);
      insights.avgEnergy = this.round(insights.totalEnergy / energies.length, 2);
    }
    
    if (cleaned.some(r => r.hour !== undefined)) {
      const hourlyEnergy = this.groupByHour(cleaned);
      insights.peakHour = Object.entries(hourlyEnergy)
        .reduce((a, b) => hourlyEnergy[a[0]] > hourlyEnergy[b[0]] ? a : b)[0];
    }
    
    const motionCount = cleaned.filter(r => r.motionDetected === 1).length;
    insights.motionDetections = motionCount;
    insights.motionPercentage = this.round((motionCount / cleaned.length) * 100, 2);
    
    const appliancesOn = cleaned.filter(r => r.applianceStatus === 'ON').length;
    insights.appliancesOn = appliancesOn;
    insights.applianceOnPercentage = this.round((appliancesOn / cleaned.length) * 100, 2);
    
    return insights;
  }
  
  /**
   * Group energy usage by hour
   */
  private groupByHour(cleaned: CleanedSensorRecord[]): { [hour: string]: number } {
    const hourly: { [hour: string]: { sum: number; count: number } } = {};
    
    cleaned.forEach(record => {
      if (record.hour !== undefined && record.energyUsage !== null) {
        const hour = record.hour.toString();
        if (!hourly[hour]) {
          hourly[hour] = { sum: 0, count: 0 };
        }
        hourly[hour].sum += record.energyUsage;
        hourly[hour].count++;
      }
    });
    
    const result: { [hour: string]: number } = {};
    Object.keys(hourly).forEach(hour => {
      result[hour] = hourly[hour].sum / hourly[hour].count;
    });
    
    return result;
  }
  
  /**
   * Generate chart data for visualizations
   */
  generateChartData(cleaned: CleanedSensorRecord[]): ChartData {
    const chartData: ChartData = {};
    
    // Temperature over time (sample every 10th record)
    const tempSample = cleaned.filter((_, i) => i % 10 === 0);
    if (tempSample.length > 0) {
      chartData.temperature = {
        timestamps: tempSample.map(r => {
          const ts = typeof r.timestamp === 'string' ? new Date(r.timestamp) : r.timestamp;
          return ts.toISOString().slice(0, 16).replace('T', ' ');
        }),
        values: tempSample.map(r => r.temperature ?? 0)
      };
    }
    
    // Energy usage by hour
    if (cleaned.some(r => r.hour !== undefined)) {
      const hourlyEnergy = this.groupByHour(cleaned);
      chartData.hourlyEnergy = {
        hours: Object.keys(hourlyEnergy).map(h => parseInt(h)).sort((a, b) => a - b),
        values: Object.keys(hourlyEnergy).sort((a, b) => parseInt(a) - parseInt(b)).map(h => hourlyEnergy[h])
      };
    }
    
    // Energy usage by day of week
    if (cleaned.some(r => r.dayName !== undefined)) {
      const dailyEnergy: { [day: string]: { sum: number; count: number } } = {};
      cleaned.forEach(record => {
        if (record.dayName && record.energyUsage !== null) {
          if (!dailyEnergy[record.dayName]) {
            dailyEnergy[record.dayName] = { sum: 0, count: 0 };
          }
          dailyEnergy[record.dayName].sum += record.energyUsage;
          dailyEnergy[record.dayName].count++;
        }
      });
      
      const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      chartData.dailyEnergy = {
        days: dayOrder.filter(day => dailyEnergy[day]),
        values: dayOrder.filter(day => dailyEnergy[day]).map(day => dailyEnergy[day].sum / dailyEnergy[day].count)
      };
    }
    
    return chartData;
  }
  
  /**
   * Round number to specified decimal places
   */
  private round(value: number, decimals: number): number {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
}



