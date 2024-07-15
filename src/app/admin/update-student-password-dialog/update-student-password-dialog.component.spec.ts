import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentPasswordDialogComponent } from './update-student-password-dialog.component';

describe('UpdateStudentPasswordDialogComponent', () => {
  let component: UpdateStudentPasswordDialogComponent;
  let fixture: ComponentFixture<UpdateStudentPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateStudentPasswordDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStudentPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
