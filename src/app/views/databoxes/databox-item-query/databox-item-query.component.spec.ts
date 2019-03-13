import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataboxItemQueryComponent } from './databox-item-query.component';

describe('DataboxItemQueryComponent', () => {
  let component: DataboxItemQueryComponent;
  let fixture: ComponentFixture<DataboxItemQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataboxItemQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataboxItemQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
