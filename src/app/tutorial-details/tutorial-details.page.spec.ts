import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorialDetailsPage } from './tutorial-details.page';

describe('TutorialDetailsPage', () => {
  let component: TutorialDetailsPage;
  let fixture: ComponentFixture<TutorialDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
