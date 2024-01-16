import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDriverSubscriptionComponent } from './add-driver-subscription.component';

describe('AddDriverSubscriptionComponent', () => {
  let component: AddDriverSubscriptionComponent;
  let fixture: ComponentFixture<AddDriverSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDriverSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDriverSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
