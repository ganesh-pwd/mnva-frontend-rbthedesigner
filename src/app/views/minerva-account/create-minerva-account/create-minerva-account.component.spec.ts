import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMinervaAccountComponent } from './create-minerva-account.component';

describe('CreateMinervaAccountComponent', () => {
  let component: CreateMinervaAccountComponent;
  let fixture: ComponentFixture<CreateMinervaAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMinervaAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMinervaAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
