import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StudentRestControllerService} from "../../services/services/student-rest-controller.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {PaymentDialogComponent} from "../payment-dialog/payment-dialog.component";
import {FileViewerDialogComponent} from "../file-viewer-dialog/file-viewer-dialog.component";
import {Payment} from "../../services/models/payment";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'

})
export class PaymentsComponent implements OnInit, AfterViewInit {

  title: string = 'Payments';
  payments: Payment[] = [];
  dataSource: any;
  pendingPayments: number = 0;
  totalPayments: number = 0;
  validatedPayments: number = 0;
  rejectedPayments: number = 0;
  public displayedColumns = [
    'paymentId',
    'paymentDate',
    'amount',
    'paymentStatus',
    'paymentType',
    'paymentFile',


  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('fileContainer', {static: false}) fileContainer!: ElementRef;
  @ViewChild('fileModal') fileModal!: TemplateRef<any>;


  constructor(private studentService: StudentRestControllerService, private dialog: MatDialog,) {
  }


  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.studentService.getStudentPayments().subscribe({
      next: (value) => {
        this.payments = value as Array<any>;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.calculateStatistics();
      },

      error: ({err}: { err: any }) => {
        console.error({err: err});
      },
    });

  }

  calculateStatistics() {
    this.totalPayments = this.payments.length;
    this.validatedPayments = this.payments.filter(p => p.paymentStatus === 'VALIDATED').length;
    this.rejectedPayments = this.payments.filter(p => p.paymentStatus === 'REJECTED').length;
    this.pendingPayments = this.totalPayments - (this.validatedPayments + this.rejectedPayments);
  }

  openDialogue() {
    const dialogRef = this.dialog.open(PaymentDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPayments();
      }
    });
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

}

