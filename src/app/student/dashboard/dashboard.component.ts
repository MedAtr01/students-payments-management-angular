import {Component, OnInit} from '@angular/core';
import {PaymentsComponent} from "../payments/payments.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {

  }

  protected readonly PaymentsComponent = PaymentsComponent;
}
