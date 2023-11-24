import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModerationComponent } from './edit-moderation.component';

describe('EditModerationComponent', () => {
  let component: EditModerationComponent;
  let fixture: ComponentFixture<EditModerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
