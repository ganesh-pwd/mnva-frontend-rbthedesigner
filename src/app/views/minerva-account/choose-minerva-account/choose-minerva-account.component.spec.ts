import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMinervaAccountComponent } from './choose-minerva-account.component';

describe('ChooseMinervaAccountComponent', () => {
  let component: ChooseMinervaAccountComponent;
  let fixture: ComponentFixture<ChooseMinervaAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseMinervaAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMinervaAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
