import { TestBed } from '@angular/core/testing';
import { DataGenerationService } from './data-generation.service';

describe('DataGenerationService', () => {
  let service: DataGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate sensor data', () => {
    const data = service.generateSmartHomeData(1, 24);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('timestamp');
    expect(data[0]).toHaveProperty('temperature');
    expect(data[0]).toHaveProperty('humidity');
    expect(data[0]).toHaveProperty('energyUsage');
    expect(data[0]).toHaveProperty('motionDetected');
    expect(data[0]).toHaveProperty('applianceStatus');
  });

  it('should generate correct number of records', () => {
    const data = service.generateSmartHomeData(7, 24);
    expect(data.length).toBeGreaterThanOrEqual(168); // 7 days * 24 hours
  });
});





