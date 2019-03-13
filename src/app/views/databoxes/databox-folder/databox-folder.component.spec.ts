import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataboxFolderComponent } from './databox-folder.component';

describe('DataboxFolderComponent', () => {
  let component: DataboxFolderComponent;
  let fixture: ComponentFixture<DataboxFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataboxFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataboxFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
