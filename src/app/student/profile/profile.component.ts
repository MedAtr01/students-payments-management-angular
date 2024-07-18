import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudentRestControllerService} from '../../services/services/student-rest-controller.service';
import {TokenService} from '../../services/token/token.service';
import {UpdateStudentInfo$Params} from '../../services/fn/student-rest-controller/update-student-info';
import {Router} from "@angular/router";
import {UpdatePasswordDialogComponent} from "../update-password-dialog/update-password-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {ProfileUploadService} from "../services/profile-upload.service";
import {StudentDataService} from "../services/student-data.service";
import {StudentDto} from "../../services/models/student-dto";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  input!: any;
  url: any = '';
  updateGroup!: FormGroup;
  profileGroup!: FormGroup;
  profile!: any;
  student!: StudentDto;
  progress: { percentage: number } = {percentage: 0};

  selectedFiles!: FileList;

  updateReqParams: UpdateStudentInfo$Params = {
    username: '',
    studentCode: '',
    program: '',
    fullName: '',
    email: ''

  };


  constructor(
    private studentDataService: StudentDataService,
    private fb: FormBuilder,
    private studentService: StudentRestControllerService,
    private uploadService: ProfileUploadService,
    private tokenService: TokenService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
  }

  token: string = this.tokenService.getToken();

  ngOnInit(): void {
    this.loadStudentInfo();
    if (this.tokenService.isTokenExpired(this.token)) {
      this.tokenService.setToken('');
      this.router.navigateByUrl('/login');
    }

    this.updateGroup = this.fb.group({
      fullName: ['', Validators.required],
      studentCode: ['', Validators.required],
      program: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],

    });
    this.profileGroup = this.fb.group({
      profile: ''
    });
    this.studentDataService.currentStudent.subscribe(student => {
      if (student) {
        this.student = student;
        this.updateGroup.patchValue({
          fullName: this.student.fullName,
          studentCode: this.student.studentCode,
          program: this.student.program,
          email: this.student.user?.email,
          username: this.student.user?.username,
        });
        this.cdr.detectChanges();
      } else {
        this.loadStudentInfo();
      }
    });

  }

  loadStudentInfo() {
    this.studentDataService.loadStudent().subscribe(student => {
      if (student) {
        this.student = student;
        this.updateGroup?.patchValue({
          fullName: this.student.fullName,
          studentCode: this.student.studentCode,
          program: this.student.program,
          email: this.student.user?.email,
          username: this.student.user?.username,
        });
      }
    });
  }


  onSelectFile(event: any) {
    this.input = event.target as HTMLInputElement;

    if (this.input?.files && this.input.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(this.input.files[0]);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.url = e.target?.result;
        return this.url;

      }

    }
  }


  updateInfo(): void {
    if (this.updateGroup.valid) {
      this.updateReqParams.fullName = this.updateGroup.get('fullName')?.value;
      this.updateReqParams.email = this.updateGroup.get('email')?.value;
      this.updateReqParams.program = this.updateGroup.get('program')?.value;
      this.updateReqParams.studentCode = this.updateGroup.get('studentCode')?.value;
      this.updateReqParams.username = this.updateGroup.get('username')?.value;


      this.studentService.updateStudentInfo(this.updateReqParams).subscribe({
        next: (response) => {
          if (this.updateReqParams.username != this.student.user?.username) {
            alert("updating username require re-authentication ");
            this.tokenService.clearToken();
            this.router.navigate(['/login']);

          }
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

  public delete(): void {
    this.url = null;


  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(UpdatePasswordDialogComponent);
  }


  updateProfile() {

    this.progress.percentage = 0;
    const currentFileUpload = this.input.files[0];
    this.uploadService.pushFileToStorage(currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total!);
        } else if (event instanceof HttpResponse) {
          this.snackBar.open('Profile updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          })
        }
        this.selectedFiles = undefined!;
      }
    );
  }


}
