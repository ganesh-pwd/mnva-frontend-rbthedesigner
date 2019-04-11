import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionsCreditComponent } from './mentions-credit.component';

describe('MentionsCreditComponent', () => {
  let component: MentionsCreditComponent;
  let fixture: ComponentFixture<MentionsCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentionsCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionsCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
