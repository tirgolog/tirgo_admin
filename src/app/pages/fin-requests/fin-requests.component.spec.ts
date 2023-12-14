import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinRequestsComponent } from './fin-requests.component';

describe('FinRequestsComponent', () => {
  let component: FinRequestsComponent;
  let fixture: ComponentFixture<FinRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
