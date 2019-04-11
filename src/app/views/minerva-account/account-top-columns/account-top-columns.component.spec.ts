import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTopColumnsComponent } from './account-top-columns.component';

describe('AccountTopColumnsComponent', () => {
  let component: AccountTopColumnsComponent;
  let fixture: ComponentFixture<AccountTopColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTopColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTopColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
