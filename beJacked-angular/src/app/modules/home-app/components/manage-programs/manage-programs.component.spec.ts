import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProgramsComponent } from './manage-programs.component';

describe('ManageprogramsComponent', () => {
  let component: ManageProgramsComponent;
  let fixture: ComponentFixture<ManageProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageProgramsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
