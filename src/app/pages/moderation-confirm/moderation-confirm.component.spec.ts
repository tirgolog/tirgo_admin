import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationConfirmComponent } from './moderation-confirm.component';

describe('ModerationConfirmComponent', () => {
  let component: ModerationConfirmComponent;
  let fixture: ComponentFixture<ModerationConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModerationConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModerationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
