import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTransactionDriverAgentComponent } from './history-transaction-driver-agent.component';

describe('HistoryTransactionDriverAgentComponent', () => {
  let component: HistoryTransactionDriverAgentComponent;
  let fixture: ComponentFixture<HistoryTransactionDriverAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTransactionDriverAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTransactionDriverAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
