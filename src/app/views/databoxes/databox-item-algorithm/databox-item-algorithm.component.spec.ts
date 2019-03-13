import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataboxItemAlgorithmComponent } from './databox-item-algorithm.component';

describe('DataboxItemAlgorithmComponent', () => {
  let component: DataboxItemAlgorithmComponent;
  let fixture: ComponentFixture<DataboxItemAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataboxItemAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataboxItemAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
