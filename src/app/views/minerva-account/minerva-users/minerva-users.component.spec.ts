import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinervaUsersComponent } from './minerva-users.component';

describe('MinervaUsersComponent', () => {
  let component: MinervaUsersComponent;
  let fixture: ComponentFixture<MinervaUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinervaUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinervaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
