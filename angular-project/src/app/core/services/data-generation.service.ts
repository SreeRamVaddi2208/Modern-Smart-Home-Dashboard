import { Injectable } from '@angular/core';
import { SensorRecord } from '../../models/sensor-data.model';

/**
 * Data Generation Service
 * Generates simulated smart home IoT sensor data
 */
@Injectable({
  providedIn: 'root'
})
export class DataGenerationService {
  private readonly seed = 42;

  /**
   * Generate simulated smart home sensor data
   * @param numDays Number of days of data to generate
   * @param recordsPerDay Number of records per day (default: 24 for hourly)
   * @returns Array of sensor records
   */
  generateSmartHomeData(numDays: number = 30, recordsPerDay: number = 24): SensorRecord[] {
    const totalRecords = numDays * recordsPerDay;
    const records: SensorRecord[] = [];
    
    // Initialize random seed for reproducibility
    this.seedRandom(this.seed);
    
    const startDate = new Date(2024, 0, 1, 0, 0, 0);
    
    for (let i = 0; i < totalRecords; i++) {
      const timestamp = new Date(startDate.getTime() + i * 60 * 60 * 1000); // Add hours
      const hour = i % 24;
      
      // Generate temperature (daily cycle: warmer during day, cooler at night)
      const dailyCycle = 20 + 8 * Math.sin((hour - 6) * Math.PI / 12);
      const temperature = Math.max(15, Math.min(35, dailyCycle + this.randomNormal(0, 2)));
      
      // Generate humidity (inverse relationship with temperature)
      const humidity = Math.max(30, Math.min(90, 60 - (temperature - 20) * 1.5 + this.randomNormal(0, 5)));
      
      // Generate energy usage (higher during day)
      const energyUsage = hour >= 6 && hour <= 22
        ? Math.max(0.1, 2.5 + this.randomNormal(0, 0.5))
        : Math.max(0.1, 0.8 + this.randomNormal(0, 0.3));
      
      // Generate motion detection (more likely during day)
      const motionProb = (hour >= 7 && hour <= 22) ? 0.4 : 0.1;
      const motionDetected = Math.random() < motionProb ? 1 : 0;
      
      // Generate appliance status (correlated with energy usage)
      const applianceProb = energyUsage > 2.0 ? 0.8 : 0.3;
      const applianceStatus = Math.random() < applianceProb ? 'ON' : 'OFF';
      
      records.push({
        timestamp,
        temperature,
        humidity,
        energyUsage,
        motionDetected,
        applianceStatus
      });
    }
    
    // Introduce missing values (~5% of data)
    const missingIndices = this.getRandomIndices(totalRecords, Math.floor(totalRecords * 0.05));
    missingIndices.forEach(index => {
      const field = ['temperature', 'humidity', 'energyUsage'][Math.floor(Math.random() * 3)];
      (records[index] as any)[field] = null;
    });
    
    // Introduce duplicates (~2% of data)
    const duplicateIndices = this.getRandomIndices(totalRecords, Math.floor(totalRecords * 0.02));
    const duplicates = duplicateIndices.map(index => ({ ...records[index] }));
    records.push(...duplicates);
    
    // Shuffle records
    return this.shuffleArray(records);
  }
  
  /**
   * Generate random indices without replacement
   */
  private getRandomIndices(max: number, count: number): number[] {
    const indices: number[] = [];
    while (indices.length < count) {
      const index = Math.floor(Math.random() * max);
      if (!indices.includes(index)) {
        indices.push(index);
      }
    }
    return indices;
  }
  
  /**
   * Shuffle array using Fisher-Yates algorithm
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  /**
   * Generate random number with normal distribution (Box-Muller transform)
   */
  private randomNormal(mean: number, stdDev: number): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z0 * stdDev + mean;
  }
  
  /**
   * Seed random number generator (simple LCG)
   */
  private seedRandom(seed: number): void {
    // Simple seed for reproducibility
    let value = seed;
    for (let i = 0; i < 10; i++) {
      value = (value * 9301 + 49297) % 233280;
      Math.random = () => {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
      };
    }
  }
}



