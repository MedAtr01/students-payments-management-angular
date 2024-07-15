import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ActivateAccountComponent} from "./activate-account/activate-account.component";
import {StudentTemplateComponent} from "./student/student-template/student-template.component";
import {ProfileComponent} from "./student/profile/profile.component";
import {authenticationGuard} from "./guards/authentication.guard";
import {PaymentsComponent} from "./student/payments/payments.component";
import {DashboardComponent} from "./student/dashboard/dashboard.component";
import {AdminTemplateComponent} from "./admin/admin-template/admin-template.component";
import {authorizationGuard} from "./guards/authorization.guard";
import {AllPaymentsComponent} from "./admin/Allpayments/all-payments.component";
import {StudentsComponent} from "./admin/students/students.component";
import {StudentDetailsComponent} from "./admin/student-details/student-details.component";
import {StudentPaymentsComponent} from "./admin/student-payments/student-payments.component";
import {
  AddPaymentStudentDialogComponent
} from "./admin/add-payment-student-dialog/add-payment-student-dialog.component";
import {AdminDashboardComponent} from "./admin/admin-dashboard/admin-dashboard.component";
import {AdminProfileComponent} from "./admin/admin-profile/admin-profile.component";
import {FileViewerDialogComponent} from "./student/file-viewer-dialog/file-viewer-dialog.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", component: LoginComponent},
  {path: "activate-account", component: ActivateAccountComponent},
  {path: "register", component: RegisterComponent},


  {
    path: "student", component: StudentTemplateComponent, canActivate: [authenticationGuard], children: [
      {
        path: "", component: DashboardComponent
      },
      {path: "profile", component: ProfileComponent},
      {path: "payments", component: PaymentsComponent}
    ]
  },
  {
    path: "admin",
    component: AdminTemplateComponent,
    canActivate: [authorizationGuard], data: {role: 'ADMIN'},
    children: [
      {path: "all-payments", component: AllPaymentsComponent, data: {title: 'Payments'}},
      {path: "students", component: StudentsComponent, data: {title: 'Students'}},
      {
        path: 'student-details/:studentCode',
        component: StudentDetailsComponent,
        data: {title: "Student Details"}
      },
      {
        path: 'student-payments/:studentCode',
        component: StudentPaymentsComponent,
        data: {title: 'Student Payments'}
      },
      {path: 'add-payment-student/:code', component: AddPaymentStudentDialogComponent},
      {path: "", component: AdminDashboardComponent, data: {title: 'Dashboard'}},
      {path: "profile", component: AdminProfileComponent, data: {title: 'Settings'}},


    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
