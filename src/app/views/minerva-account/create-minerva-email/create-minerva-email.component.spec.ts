import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMinervaEmailComponent } from './create-minerva-email.component';

describe('CreateMinervaEmailComponent', () => {
  let component: CreateMinervaEmailComponent;
  let fixture: ComponentFixture<CreateMinervaEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMinervaEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMinervaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
