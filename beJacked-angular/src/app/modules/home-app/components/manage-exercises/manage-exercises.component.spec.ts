import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExercisesComponent } from './manage-exercises.component';

describe('ManageExercisesComponent', () => {
  let component: ManageExercisesComponent;
  let fixture: ComponentFixture<ManageExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExercisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
