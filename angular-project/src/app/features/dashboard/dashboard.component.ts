import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGenerationService } from '../../core/services/data-generation.service';
import { DataProcessingService } from '../../core/services/data-processing.service';
import { CleanedSensorRecord, DataInsights, ChartData, DataPreparationSummary } from '../../models/sensor-data.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

/**
 * Dashboard Component
 * Displays cleaned data visualizations and insights
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  cleanedData: CleanedSensorRecord[] = [];
  insights: DataInsights = {};
  chartData: ChartData = {};
  preparationSummary: DataPreparationSummary | null = null;
  isLoading: boolean = true;

  private temperatureChart?: Chart;
  private hourlyEnergyChart?: Chart;
  private dailyEnergyChart?: Chart;

  constructor(
    private dataGenerationService: DataGenerationService,
    private dataProcessingService: DataProcessingService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    // Charts will be created after data loads
  }

  loadData(): void {
    this.isLoading = true;
    
    // Generate raw data
    const rawData = this.dataGenerationService.generateSmartHomeData(30, 24);
    
    // Prepare data
    const { cleaned, summary } = this.dataProcessingService.prepareData(rawData);
    this.cleanedData = cleaned;
    this.preparationSummary = summary;
    
    // Generate insights
    this.insights = this.dataProcessingService.generateInsights(cleaned);
    
    // Generate chart data
    this.chartData = this.dataProcessingService.generateChartData(cleaned);
    
    this.isLoading = false;
    
    // Create charts after data is loaded
    setTimeout(() => {
      this.createCharts();
    }, 100);
  }

  createCharts(): void {
    if (this.chartData.temperature) {
      this.createTemperatureChart();
    }
    if (this.chartData.hourlyEnergy) {
      this.createHourlyEnergyChart();
    }
    if (this.chartData.dailyEnergy) {
      this.createDailyEnergyChart();
    }
  }

  private createTemperatureChart(): void {
    const canvas = document.getElementById('temperatureChart') as HTMLCanvasElement;
    if (!canvas) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.chartData.temperature!.timestamps,
        datasets: [{
          label: 'Temperature (°C)',
          data: this.chartData.temperature!.values,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4,
          pointRadius: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          },
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 45
            }
          }
        }
      }
    };

    this.temperatureChart = new Chart(canvas, config);
  }

  private createHourlyEnergyChart(): void {
    const canvas = document.getElementById('hourlyEnergyChart') as HTMLCanvasElement;
    if (!canvas) return;

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.chartData.hourlyEnergy!.hours.map(h => `${h}:00`),
        datasets: [{
          label: 'Average Energy Usage (kWh)',
          data: this.chartData.hourlyEnergy!.values,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Energy Usage (kWh)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Hour of Day'
            }
          }
        }
      }
    };

    this.hourlyEnergyChart = new Chart(canvas, config);
  }

  private createDailyEnergyChart(): void {
    const canvas = document.getElementById('dailyEnergyChart') as HTMLCanvasElement;
    if (!canvas) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.chartData.dailyEnergy!.days,
        datasets: [{
          label: 'Average Energy Usage (kWh)',
          data: this.chartData.dailyEnergy!.values,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Energy Usage (kWh)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Day of Week'
            }
          }
        }
      }
    };

    this.dailyEnergyChart = new Chart(canvas, config);
  }
}





