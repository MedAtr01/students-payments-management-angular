import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Payment} from "../../services/models/payment";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminRestControllerService} from "../../services/services/admin-rest-controller.service";
import {MatTableDataSource} from "@angular/material/table";
import {SearchService} from "../../services/search.service";
import {FileViewerDialogComponent} from "../../student/file-viewer-dialog/file-viewer-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {StudentRestControllerService} from "../../services/services/student-rest-controller.service";
import {PaymentDto} from "../../services/models/payment-dto";
import {SimpleStudentDto} from "../../services/models/simple-student-dto";
import {SharedService} from "../shared/shared.service";
import {AddPaymentStudentDialogComponent} from "../add-payment-student-dialog/add-payment-student-dialog.component";
import {DeletePaymentService} from "../../shared/delete-payment.service";

@Component({
  selector: 'app-student-payments',
  templateUrl: './student-payments.component.html',
  styleUrl: './student-payments.component.css'
})
export class StudentPaymentsComponent implements OnInit {
  dataSource: any;
  fullName: string = '';
  studentCode!: string;
  payments!: Array<PaymentDto>;
  simpleStudentDto!: SimpleStudentDto;
  public displayedColumns = [
    'paymentId',
    'paymentDate',
    'amount',
    'paymentStatus',
    'paymentType',
    'paymentFile',
    'validation',
    'actions'

  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.studentCode = params.get('studentCode') || '';

    });
    this.loadStudentPayments();
    this.searchService.searchQuery$.subscribe(query => {
      this.applyFilter(query);
    });
  }

  constructor(private router: Router,
              private sharedService: SharedService,
              private adminService: AdminRestControllerService,
              private route: ActivatedRoute, private searchService: SearchService,
              private studentService: StudentRestControllerService,
              private deletePaymentService: DeletePaymentService) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = (data: Payment, filter: string) => {
      const dataStr = `${data.paymentId} `.toLowerCase();
      return dataStr.includes(filter);
    };
  }

  loadStudentPayments() {


    this.adminService.getPaymentsByStudentCode({code: this.studentCode}).subscribe({
      next: response => {
        this.payments = response;
        this.simpleStudentDto = this.payments[0].simpleStudentDTO! || "";
        this.sharedService.payments = this.payments;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.log(err.errorMessage);
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateStatus(id: number, status: any) {
    this.sharedService.updateStatus(id, status, this);
  }

  openFile(paymentId: number) {
    this.studentService.getPaymentFile({paymentId}).subscribe({
      next: (blob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const content = reader.result as string;
          if (content.includes('JFIF') || content.includes('image')) {
            this.displayImage(blob);
          } else this.displayPdf(blob);
        }
        reader.readAsText(blob);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  readonly dialog = inject(MatDialog);

  private displayPdf(blob: Blob): void {
    const fileUrl = URL.createObjectURL(blob);
    const fileType = blob.type;
    this.dialog.open(FileViewerDialogComponent, {
      data: {fileUrl, fileType},
      panelClass: 'full-screen-dialogue',
      width: '100%',
      maxWidth: '100%',

    })

  }

  private displayImage(blob: Blob): void {
    const fileUrl = URL.createObjectURL(blob);
    const fileType = 'image';

    this.dialog.open(FileViewerDialogComponent, {

      data: {fileUrl, fileType}
    })

  }

  protected readonly FileViewerDialogComponent = FileViewerDialogComponent;

  openDialogue() {
    this.dialog.open(AddPaymentStudentDialogComponent, {
      data: {studentCode: this.studentCode}
    });
  }

  onDeletePayment(paymentId: number) {
    this.deletePaymentService.deletePayment(paymentId).subscribe({
      next: response => {
        this.loadStudentPayments();
      },
      error: err => {
        console.log(err);
      }
    })

  }
}
