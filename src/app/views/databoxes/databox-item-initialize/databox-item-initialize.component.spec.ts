import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataboxItemInitializeComponent } from './databox-item-initialize.component';

describe('DataboxItemInitializeComponent', () => {
  let component: DataboxItemInitializeComponent;
  let fixture: ComponentFixture<DataboxItemInitializeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataboxItemInitializeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataboxItemInitializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
