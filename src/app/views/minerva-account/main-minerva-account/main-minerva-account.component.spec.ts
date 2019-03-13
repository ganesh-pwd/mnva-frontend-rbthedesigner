import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMinervaAccountComponent } from './main-minerva-account.component';

describe('MainMinervaAccountComponent', () => {
  let component: MainMinervaAccountComponent;
  let fixture: ComponentFixture<MainMinervaAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMinervaAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMinervaAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
