import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "./services/token/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private tokenService: TokenService) {
  }

  ngOnInit(): void {
   
  }

  title = 'ui-angular';

}
