import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDataboxesComponent } from './main-databoxes.component';

describe('MainDataboxesComponent', () => {
  let component: MainDataboxesComponent;
  let fixture: ComponentFixture<MainDataboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDataboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDataboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
