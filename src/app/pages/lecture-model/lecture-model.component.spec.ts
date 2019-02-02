import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureModelComponent } from './lecture-model.component';

describe('LectureModelComponent', () => {
  let component: LectureModelComponent;
  let fixture: ComponentFixture<LectureModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
