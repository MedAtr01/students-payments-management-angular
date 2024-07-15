import {ChangeDetectorRef, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {StudentRestControllerService} from '../../services/services/student-rest-controller.service';
import {TokenService} from '../../services/token/token.service';
import {catchError, tap} from 'rxjs/operators';
import {StudentDto} from "../../services/models/student-dto";

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  private studentSource = new BehaviorSubject<StudentDto | null>(null);
  currentStudent = this.studentSource.asObservable();

  constructor(
    private studentService: StudentRestControllerService,
    private tokenService: TokenService,
  ) {
    this.loadStudent().subscribe();
  }

  loadStudent(): Observable<StudentDto | null> {
    if (this.studentSource.value) {
      return of(this.studentSource.value);
    } else {
      const token = this.tokenService.getToken();
      return this.studentService.getStudentByUser(token).pipe(
        tap(student => this.studentSource.next(student)),
        catchError((error) => {
          console.error('Error loading student data:', error);
          return of(null);
        })
      );

    }

  }

  changeStudent(student: StudentDto) {
    this.studentSource.next(student);
  }
}
