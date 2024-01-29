import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToAgentComponent } from './connect-to-agent.component';

describe('ConnectToAgentComponent', () => {
  let component: ConnectToAgentComponent;
  let fixture: ComponentFixture<ConnectToAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectToAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectToAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
