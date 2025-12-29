import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGenerationService } from '../../core/services/data-generation.service';
import { DataProcessingService } from '../../core/services/data-processing.service';
import { SensorRecord, DataSummary } from '../../models/sensor-data.model';

/**
 * Data Exploration Component
 * Displays raw data, statistics, and data quality information
 */
@Component({
  selector: 'app-exploration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exploration.component.html',
  styleUrls: ['./exploration.component.scss']
})
export class ExplorationComponent implements OnInit {
  rawData: SensorRecord[] = [];
  summary: DataSummary | null = null;
  sampleData: SensorRecord[] = [];
  missingCount: number = 0;
  duplicateCount: number = 0;
  isLoading: boolean = true;

  constructor(
    private dataGenerationService: DataGenerationService,
    private dataProcessingService: DataProcessingService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    // Generate data
    this.rawData = this.dataGenerationService.generateSmartHomeData(30, 24);
    
    // Generate summary
    this.summary = this.dataProcessingService.generateSummary(this.rawData);
    
    // Get sample data (first 100 records)
    this.sampleData = this.rawData.slice(0, 100);
    
    // Calculate missing values
    this.missingCount = Object.values(this.summary.missingValues)
      .reduce((sum, count) => sum + count, 0);
    
    // Calculate duplicates (approximate)
    this.duplicateCount = Math.floor(this.rawData.length * 0.02);
    
    this.isLoading = false;
  }

  getColumns(): string[] {
    return ['timestamp', 'temperature', 'humidity', 'energyUsage', 'motionDetected', 'applianceStatus'];
  }

  getMissingValuesEntries(): { key: string; value: number }[] {
    if (!this.summary) return [];
    return Object.entries(this.summary.missingValues).map(([key, value]) => ({ key, value }));
  }

  getDataTypesEntries(): { key: string; value: string }[] {
    if (!this.summary) return [];
    return Object.entries(this.summary.dataTypes).map(([key, value]) => ({ key, value }));
  }

  getNumericColumns(): string[] {
    if (!this.summary) return [];
    return Object.keys(this.summary.numericSummary);
  }

  getStatistics(): { label: string; key: string }[] {
    return [
      { label: 'Count', key: 'count' },
      { label: 'Mean', key: 'mean' },
      { label: 'Std Dev', key: 'std' },
      { label: 'Min', key: 'min' },
      { label: '25%', key: '25%' },
      { label: '50% (Median)', key: '50%' },
      { label: '75%', key: '75%' },
      { label: 'Max', key: 'max' }
    ];
  }

  getStatValue(column: string, statKey: string): string {
    if (!this.summary?.numericSummary[column]) return '-';
    const value = (this.summary.numericSummary[column] as any)[statKey];
    return typeof value === 'number' ? value.toFixed(2) : '-';
  }

  formatValue(value: any, column: string): string {
    if (value === null || value === undefined) return 'Missing';
    if (column === 'timestamp') {
      return new Date(value).toLocaleString();
    }
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return String(value);
  }
}

