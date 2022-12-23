import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAppComponent } from './home-app.component';

describe('HomeAppComponent', () => {
  let component: HomeAppComponent;
  let fixture: ComponentFixture<HomeAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
