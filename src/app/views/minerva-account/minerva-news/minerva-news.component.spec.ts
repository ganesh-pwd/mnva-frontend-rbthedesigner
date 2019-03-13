import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinervaNewsComponent } from './minerva-news.component';

describe('MinervaNewsComponent', () => {
  let component: MinervaNewsComponent;
  let fixture: ComponentFixture<MinervaNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinervaNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinervaNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
