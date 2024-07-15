import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Payment} from "../../services/models/payment";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {AdminRestControllerService} from "../../services/services/admin-rest-controller.service";
import {FileViewerDialogComponent} from "../../student/file-viewer-dialog/file-viewer-dialog.component";
import {SearchService} from "../../services/search.service";
import {SharedService} from "../shared/shared.service";
import {AddPaymentStudentDialogComponent} from "../add-payment-student-dialog/add-payment-student-dialog.component";
import {DeletePaymentService} from "../../shared/delete-payment.service";

@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrl: './all-payments.component.css'
})
export class AllPaymentsComponent implements OnInit, AfterViewInit {
  title: string = 'Payments';
  payments: Payment[] = [];
  dataSource: any;
  loading: boolean = false;
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
    'validation',
    'actions'


  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('fileContainer', {static: false}) fileContainer!: ElementRef;
  @ViewChild('fileModal') fileModal!: TemplateRef<any>;

  constructor(private adminService: AdminRestControllerService,
              private dialog: MatDialog,
              private searchService: SearchService,
              private sharedService: SharedService,
              private deletePaymentService: DeletePaymentService) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = (data: Payment, filter: string) => {
      const dataStr = `${data.paymentId} `.toLowerCase();
      return dataStr.includes(filter);
    };
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.loadPayments();
    this.searchService.searchQuery$.subscribe(query => {
      this.applyFilter(query);
    });
  }

  private loadPayments() {
    this.adminService.getPayments().subscribe({
      next: (value) => {
        this.payments = value as Array<any>;
        this.sharedService.payments = value;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.calculateStatistics();
      },

      error: err => {
        console.error(err);
      },
    });
  }

  calculateStatistics() {
    this.totalPayments = this.payments.length;
    this.validatedPayments = this.payments.filter(p => p.paymentStatus === 'VALIDATED').length;
    this.rejectedPayments = this.payments.filter(p => p.paymentStatus === 'REJECTED').length;
  }

  openDialogue() {
    const dialogRef = this.dialog.open(AddPaymentStudentDialogComponent, {
      data: {}

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPayments();
      }
    });
  }


  openFile(paymentId: number) {
    this.adminService.getPaymentFile_1$Pdf({paymentId}).subscribe({
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

    })
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

  updateStatus(id: number, status: any) {
    this.sharedService.updateStatus(id, status, this);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onDeletePayment(paymentId: number) {
    this.deletePaymentService.deletePayment(paymentId).subscribe({
      next: () => {
        this.loadPayments();
      },
      error: err => {
        console.log(err);
      }
    })

  }
}
