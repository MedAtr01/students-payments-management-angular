import {Component, OnInit} from '@angular/core';
import {AdminTemplateComponent} from "../admin-template/admin-template.component";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit {
  constructor(private admin: AdminTemplateComponent) {
  }

  ngOnInit(): void {
  }


}
