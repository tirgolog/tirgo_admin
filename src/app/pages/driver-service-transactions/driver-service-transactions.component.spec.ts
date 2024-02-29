import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverServiceTransactionsComponent } from './driver-service-transactions.component';

describe('DriverServiceTransactionsComponent', () => {
  let component: DriverServiceTransactionsComponent;
  let fixture: ComponentFixture<DriverServiceTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverServiceTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverServiceTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
