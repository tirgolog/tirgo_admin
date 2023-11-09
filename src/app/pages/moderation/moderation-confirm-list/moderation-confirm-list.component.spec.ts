import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationConfirmListComponent } from './moderation-confirm-list.component';

describe('ModerationConfirmListComponent', () => {
  let component: ModerationConfirmListComponent;
  let fixture: ComponentFixture<ModerationConfirmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModerationConfirmListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModerationConfirmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
