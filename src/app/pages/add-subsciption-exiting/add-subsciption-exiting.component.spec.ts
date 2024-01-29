import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubsciptionExitingComponent } from './add-subsciption-exiting.component';

describe('AddSubsciptionExitingComponent', () => {
  let component: AddSubsciptionExitingComponent;
  let fixture: ComponentFixture<AddSubsciptionExitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubsciptionExitingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubsciptionExitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
