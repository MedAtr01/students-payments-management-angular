import {Component, OnInit} from '@angular/core';
import {AdminRestControllerService} from '../../services/services/admin-rest-controller.service';
import {ChartConfiguration, ChartOptions} from 'chart.js';
import {PaymentDto} from "../../services/models/payment-dto";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalPayments: number = 0;
  validatedPayments: number = 0;
  rejectedPayments: number = 0;
  pendingPayments: number = 0;
  paymentsByProgram: { [program: string]: number } = {};
  revenueByProgram: { [program: string]: number } = {};
  programPaymentPercentage: { [program: string]: number } = {};
  programs: string[] = [];
  payments: PaymentDto[] = [];

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [
    {
      data: [],
      label: 'Payments by Program',
      backgroundColor: 'rgba(182,75,117,0.74)',
      borderColor: 'rgba(194,65,116,0.68)'
    }
  ];
  public barChartLegend = true;
  public barChartPlugins = [];

  public doughnutChartLabels: string[] = ['Validated Payments', 'Rejected Payments', 'Pending Payments'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {
      data: [],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 205, 86, 0.6)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
      borderWidth: 1
    }
  ];
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: true
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLabels: string[] = [];
  public lineChartDatasets: ChartConfiguration<'line'>['data']['datasets'] = [
    {
      data: [],
      label: 'Revenue by Program',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      // borderColor: 'rgba(75, 192, 192, 1)',
      fill: 'origin',
    }
  ];
  public lineChartLegend = true;
  public lineChartPlugins = [];

  constructor(private adminService: AdminRestControllerService) {
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  private loadPayments() {
    this.adminService.getPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.calculateStatistics();
        this.setupCharts();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private calculateStatistics() {
    this.totalPayments = this.payments.length;
    this.validatedPayments = this.payments.filter(p => p.paymentStatus === 'VALIDATED').length;
    this.rejectedPayments = this.payments.filter(p => p.paymentStatus === 'REJECTED').length;
    this.pendingPayments = this.totalPayments - (this.validatedPayments + this.rejectedPayments);

    this.payments.forEach(payment => {
      const program = payment?.simpleStudentDTO?.program?.toUpperCase();
      if (program) {
        if (!this.paymentsByProgram[program]) {
          this.paymentsByProgram[program] = 0;
        }
        if (!this.revenueByProgram[program]) {
          this.revenueByProgram[program] = 0;
        }
        this.paymentsByProgram[program]++;
        this.revenueByProgram[program] += payment.amount || 0;
      } else {
        console.warn(`Payment with ID ${payment.paymentId} has an undefined program`);
      }
    });

    this.programs = Object.keys(this.paymentsByProgram);
    this.programs.forEach(program => {
      this.programPaymentPercentage[program] = (this.paymentsByProgram[program] * 100) / this.totalPayments;
    });


  }

  private setupCharts() {

    this.barChartLabels = this.programs;
    this.barChartDatasets[0].data = this.programs.map(program => this.programPaymentPercentage[program]);


    this.doughnutChartDatasets[0].data = [this.validatedPayments, this.rejectedPayments, this.pendingPayments];


    this.lineChartLabels = this.programs;
    this.lineChartDatasets[0].data = this.programs.map(program => this.revenueByProgram[program]);

    
  }

}
