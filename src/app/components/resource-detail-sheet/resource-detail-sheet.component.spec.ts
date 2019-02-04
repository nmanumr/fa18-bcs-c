import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDetailSheetComponent } from './resource-detail-sheet.component';

describe('ResourceDetailSheetComponent', () => {
  let component: ResourceDetailSheetComponent;
  let fixture: ComponentFixture<ResourceDetailSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceDetailSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDetailSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
