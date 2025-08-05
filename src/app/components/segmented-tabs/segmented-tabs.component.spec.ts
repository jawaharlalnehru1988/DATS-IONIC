import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SegmentedTabsComponent } from './segmented-tabs.component';

describe('SegmentedTabsComponent', () => {
  let component: SegmentedTabsComponent;
  let fixture: ComponentFixture<SegmentedTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SegmentedTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentedTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
