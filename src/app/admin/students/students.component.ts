import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminRestControllerService} from '../../services/services/admin-rest-controller.service';
import {Router} from '@angular/router';
import {StudentDto} from '../../services/models/student-dto';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students!: Array<StudentDto>;
  dataSource: MatTableDataSource<StudentDto>;
  public displayedColumns = [
    'profile',
    'fullname',
    'studentCode',
    'program',
    'email',
    'payments',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminRestControllerService, private router: Router, private searchService: SearchService) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = (data: StudentDto, filter: string) => {
      const dataStr = `${data.fullName} ${data.studentCode} ${data.program} ${data.user?.email}`.toLowerCase();
      return dataStr.includes(filter);
    };
  }

  ngOnInit(): void {
    this.loadStudents();
    this.searchService.searchQuery$.subscribe(query => {
      this.applyFilter(query);
    });
  }

  loadStudents() {
    this.adminService.getStudents().subscribe({
      next: response => {
        this.students = response;
        this.dataSource.data = this.students;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.log(err.error.businessErrorDescription);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleStudentPayments(studentCode: string) {
    this.router.navigate([`admin/student-payments`, studentCode]);


  }

  handleStudentDetails(studentCode: string) {
    this.router.navigate([`admin/student-details`, studentCode]);

  }
}
