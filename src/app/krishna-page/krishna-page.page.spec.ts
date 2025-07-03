import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KrishnaPagePage } from './krishna-page.page';

describe('KrishnaPagePage', () => {
  let component: KrishnaPagePage;
  let fixture: ComponentFixture<KrishnaPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KrishnaPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
