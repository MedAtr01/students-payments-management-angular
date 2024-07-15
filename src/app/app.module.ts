import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {LoginComponent} from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {RegisterComponent} from './register/register.component';
import {ActivateAccountComponent} from './activate-account/activate-account.component';
import {CodeInputModule} from "angular-code-input";
import {StudentTemplateComponent} from './student/student-template/student-template.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {ProfileComponent} from './student/profile/profile.component';
import {AuthInterceptor} from "./interceptor/auth-interceptor.interceptor";
import {TokenService} from "./services/token/token.service";
import {NgOptimizedImage} from "@angular/common";
import {UpdatePasswordDialogComponent} from './student/update-password-dialog/update-password-dialog.component';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {PaymentsComponent} from './student/payments/payments.component';
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {PaymentDialogComponent} from './student/payment-dialog/payment-dialog.component';
import {MatOption, MatSelect} from "@angular/material/select";
import {FileViewerDialogComponent} from './student/file-viewer-dialog/file-viewer-dialog.component';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatTabLink} from "@angular/material/tabs";
import {DashboardComponent} from './student/dashboard/dashboard.component';
import {AdminTemplateComponent} from './admin/admin-template/admin-template.component';
import {AllPaymentsComponent} from "./admin/Allpayments/all-payments.component";
import {StudentsComponent} from './admin/students/students.component';
import {SearchBoxComponent} from './shared/search-box/search-box.component';
import {StudentDetailsComponent} from './admin/student-details/student-details.component';
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {StudentPaymentsComponent} from './admin/student-payments/student-payments.component';
import {MatProgressBar, MatProgressBarModule} from "@angular/material/progress-bar";
import {
  AddPaymentStudentDialogComponent
} from './admin/add-payment-student-dialog/add-payment-student-dialog.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {BaseChartDirective} from "ng2-charts";
import {Chart, registerables} from 'chart.js';
import {AdminProfileComponent} from './admin/admin-profile/admin-profile.component';
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {MatBadge} from "@angular/material/badge";
import {MatTooltip} from "@angular/material/tooltip";
import { UpdateStudentPasswordDialogComponent } from './admin/update-student-password-dialog/update-student-password-dialog.component';

Chart.register(...registerables);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    StudentTemplateComponent,
    ProfileComponent,
    UpdatePasswordDialogComponent,
    PaymentsComponent,
    PaymentDialogComponent,
    FileViewerDialogComponent,
    DashboardComponent,
    AdminTemplateComponent,
    AllPaymentsComponent,
    StudentsComponent,
    SearchBoxComponent,
    StudentDetailsComponent,
    StudentPaymentsComponent,
    AddPaymentStudentDialogComponent,
    AdminDashboardComponent,
    AdminProfileComponent,
    UpdateStudentPasswordDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconButton,
    MatButtonModule,
    CodeInputModule,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    FormsModule,
    NgOptimizedImage,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatDialogModule,
    MatDividerModule,
    MatTableModule,
    MatSort,
    MatPaginator,
    MatSortHeader,
    MatSelect,
    MatOption,
    MatToolbarModule,
    MatTabLink,
    MatAccordion,
    MatExpansionModule,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatProgressBarModule,
    BaseChartDirective,
    MatMenuModule,
    MatBadge,
    MatTooltip,


  ],
  providers: [HttpClient, provideAnimationsAsync(), TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
