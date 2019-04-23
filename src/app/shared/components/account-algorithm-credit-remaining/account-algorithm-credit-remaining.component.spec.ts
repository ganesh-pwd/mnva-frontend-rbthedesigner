import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAlgorithmCreditRemainingComponent } from './account-algorithm-credit-remaining.component';

describe('AccountAlgorithmCreditRemainingComponent', () => {
  let component: AccountAlgorithmCreditRemainingComponent;
  let fixture: ComponentFixture<AccountAlgorithmCreditRemainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAlgorithmCreditRemainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAlgorithmCreditRemainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
