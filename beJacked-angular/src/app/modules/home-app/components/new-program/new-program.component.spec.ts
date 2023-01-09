import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProgramComponent } from './new-program.component';

describe('NewprogramComponent', () => {
  let component: NewProgramComponent;
  let fixture: ComponentFixture<NewProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProgramComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
