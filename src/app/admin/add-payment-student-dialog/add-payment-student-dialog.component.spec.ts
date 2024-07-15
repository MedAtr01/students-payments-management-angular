import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentStudentDialogComponent } from './add-payment-student-dialog.component';

describe('AddPaymentStudentDialogComponent', () => {
  let component: AddPaymentStudentDialogComponent;
  let fixture: ComponentFixture<AddPaymentStudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPaymentStudentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPaymentStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
