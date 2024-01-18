import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPaymentListComponent } from './driver-payment-list.component';

describe('DriverPaymentListComponent', () => {
  let component: DriverPaymentListComponent;
  let fixture: ComponentFixture<DriverPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverPaymentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
