import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPictureComponent } from './recent-picture.component';

describe('RecentPictureComponent', () => {
  let component: RecentPictureComponent;
  let fixture: ComponentFixture<RecentPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
