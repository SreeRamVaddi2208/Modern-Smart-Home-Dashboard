/**
 * Sensor Data Models
 * Defines TypeScript interfaces for Smart Home IoT sensor data
 */

export interface SensorRecord {
  timestamp: Date | string;
  temperature: number | null;
  humidity: number | null;
  energyUsage: number | null;
  motionDetected: number;
  applianceStatus: 'ON' | 'OFF';
}

export interface CleanedSensorRecord extends SensorRecord {
  hour?: number;
  dayOfWeek?: number;
  dayName?: string;
  isPeakHour?: boolean;
}

export interface DataSummary {
  totalRecords: number;
  totalColumns: number;
  missingValues: { [key: string]: number };
  dataTypes: { [key: string]: string };
  numericSummary: { [key: string]: NumericStats };
}

export interface NumericStats {
  count: number;
  mean: number;
  std: number;
  min: number;
  '25%': number;
  '50%': number;
  '75%': number;
  max: number;
}

export interface DataInsights {
  avgTemperature?: number;
  minTemperature?: number;
  maxTemperature?: number;
  avgHumidity?: number;
  totalEnergy?: number;
  avgEnergy?: number;
  peakHour?: number;
  motionDetections?: number;
  motionPercentage?: number;
  appliancesOn?: number;
  applianceOnPercentage?: number;
}

export interface ChartData {
  temperature?: {
    timestamps: string[];
    values: number[];
  };
  hourlyEnergy?: {
    hours: number[];
    values: number[];
  };
  dailyEnergy?: {
    days: string[];
    values: number[];
  };
}

export interface DataPreparationSummary {
  duplicatesRemoved: number;
  totalRecords: number;
  missingValuesFilled: number;
}





