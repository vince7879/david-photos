import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBackendComponent } from './nav-backend.component';

describe('NavBackendComponent', () => {
  let component: NavBackendComponent;
  let fixture: ComponentFixture<NavBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
