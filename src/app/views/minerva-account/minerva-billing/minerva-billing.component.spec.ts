import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinervaBillingComponent } from './minerva-billing.component';

describe('MinervaBillingComponent', () => {
  let component: MinervaBillingComponent;
  let fixture: ComponentFixture<MinervaBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinervaBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinervaBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
