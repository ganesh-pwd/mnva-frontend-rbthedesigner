import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataboxItemConnectivityComponent } from './databox-item-connectivity.component';

describe('DataboxItemConnectivityComponent', () => {
  let component: DataboxItemConnectivityComponent;
  let fixture: ComponentFixture<DataboxItemConnectivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataboxItemConnectivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataboxItemConnectivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
