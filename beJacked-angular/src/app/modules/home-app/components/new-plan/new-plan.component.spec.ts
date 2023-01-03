import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlanComponent } from './new-plan.component';

describe('NewPlanComponent', () => {
  let component: NewPlanComponent;
  let fixture: ComponentFixture<NewPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
