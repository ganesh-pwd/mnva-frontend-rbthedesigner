import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMentionRemainingComponent } from './account-mention-remaining.component';

describe('AccountMentionRemainingComponent', () => {
  let component: AccountMentionRemainingComponent;
  let fixture: ComponentFixture<AccountMentionRemainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMentionRemainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMentionRemainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
