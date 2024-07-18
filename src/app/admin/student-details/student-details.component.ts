import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminRestControllerService} from "../../services/services/admin-rest-controller.service";
import {StudentDto} from "../../services/models/student-dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Payment} from "../../services/models/payment";
import {UpdateStudentInfo1$Params} from "../../services/fn/admin-rest-controller/update-student-info-1";
import {BehaviorSubject} from "rxjs";
import {
  UpdateStudentPasswordDialogComponent
} from "../update-student-password-dialog/update-student-password-dialog.component";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
  studentCode!: string
  student!: StudentDto;
  input!: any;
  url: any = '';
  updateGroup!: FormGroup;
  payments!: Array<Payment>;
  updateReqParams: UpdateStudentInfo1$Params = {
    username: '',
    code: '',
    program: '',
    fullName: '',
    email: ''

  };


  constructor(
    private adminService: AdminRestControllerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.studentCode = params.get('studentCode') || '';

    });
    this.updateGroup = this.fb.group({
      fullName: ['', Validators.required],
      studentCode: ['', Validators.required],
      program: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],

    });


    this.loadStudentDetails();


  }

  loadStudentDetails() {
    this.adminService.getStudentByCode({code: this.studentCode}).subscribe({
      next: response => {
        this.student = response;
        this.updateGroup.patchValue({
          fullName: this.student.fullName,
          studentCode: this.student.studentCode,
          program: this.student.program,
          email: this.student.user?.email,
          username: this.student.user?.username,

        });
        this.cdr.detectChanges();
      },
      error: err => {
        console.log(err);
      }
    })
  }


  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(UpdateStudentPasswordDialogComponent, {
      data: {username: this.student?.user?.username}
    });
  }

  updateInfo(): void {
    if (this.updateGroup.valid) {
      this.updateReqParams.fullName = this.updateGroup.get('fullName')?.value;
      this.updateReqParams.email = this.updateGroup.get('email')?.value;
      this.updateReqParams.program = this.updateGroup.get('program')?.value;
      this.updateReqParams.code = this.updateGroup.get('studentCode')?.value;
      this.updateReqParams.username = this.updateGroup.get('username')?.value;

      this.adminService.updateStudentInfo1(this.updateReqParams).subscribe({
        next: (response) => {
          this.snackBar.open('Student updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          })
      
        },
        error: (err) => {
          this.snackBar.open('Error updating student', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error updating student:', err);
        },
      });

    }
  }


  private studentSubject = new BehaviorSubject<{ studentCode: string }>({studentCode: ''});

  currentStudent = this.studentSubject.asObservable();

  setStudent(student: { studentCode: string }) {
    this.studentSubject.next(student);
  }


}
