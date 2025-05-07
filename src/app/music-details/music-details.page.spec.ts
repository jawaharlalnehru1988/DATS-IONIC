import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicDetailsPage } from './music-details.page';

describe('MusicDetailsPage', () => {
  let component: MusicDetailsPage;
  let fixture: ComponentFixture<MusicDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
