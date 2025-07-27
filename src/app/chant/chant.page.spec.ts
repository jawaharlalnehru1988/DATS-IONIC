import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChantPage } from './chant.page';

describe('ChantPage', () => {
  let component: ChantPage;
  let fixture: ComponentFixture<ChantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
