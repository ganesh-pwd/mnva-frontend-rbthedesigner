import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataboxItemSettingsComponent } from './databox-item-settings.component';

describe('DataboxItemSettingsComponent', () => {
  let component: DataboxItemSettingsComponent;
  let fixture: ComponentFixture<DataboxItemSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataboxItemSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataboxItemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
