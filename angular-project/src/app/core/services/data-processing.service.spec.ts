import { TestBed } from '@angular/core/testing';
import { DataProcessingService } from './data-processing.service';
import { SensorRecord } from '../../models/sensor-data.model';

describe('DataProcessingService', () => {
  let service: DataProcessingService;
  let sampleData: SensorRecord[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataProcessingService);
    
    sampleData = [
      {
        timestamp: new Date('2024-01-01T00:00:00'),
        temperature: 20,
        humidity: 60,
        energyUsage: 1.5,
        motionDetected: 0,
        applianceStatus: 'OFF'
      },
      {
        timestamp: new Date('2024-01-01T01:00:00'),
        temperature: null,
        humidity: 65,
        energyUsage: 1.2,
        motionDetected: 0,
        applianceStatus: 'OFF'
      }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should prepare data and remove duplicates', () => {
    const duplicates = [...sampleData, ...sampleData];
    const result = service.prepareData(duplicates);
    expect(result.summary.duplicatesRemoved).toBeGreaterThan(0);
  });

  it('should fill missing values', () => {
    const result = service.prepareData(sampleData);
    const hasNull = result.cleaned.some(r => r.temperature === null);
    expect(hasNull).toBe(false);
  });

  it('should generate summary', () => {
    const summary = service.generateSummary(sampleData);
    expect(summary.totalRecords).toBe(sampleData.length);
    expect(summary).toHaveProperty('missingValues');
    expect(summary).toHaveProperty('numericSummary');
  });
});





