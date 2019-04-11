import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinervaNotificationsComponent } from './minerva-notifications.component';

describe('MinervaNotificationsComponent', () => {
  let component: MinervaNotificationsComponent;
  let fixture: ComponentFixture<MinervaNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinervaNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinervaNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
