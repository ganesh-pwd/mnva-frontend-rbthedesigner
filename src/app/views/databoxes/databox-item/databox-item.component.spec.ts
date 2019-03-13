import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataboxItemComponent } from './databox-item.component';

describe('DataboxItemComponent', () => {
  let component: DataboxItemComponent;
  let fixture: ComponentFixture<DataboxItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataboxItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataboxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
