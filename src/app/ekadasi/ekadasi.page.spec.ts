import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EkadasiPage } from './ekadasi.page';

describe('EkadasiPage', () => {
  let component: EkadasiPage;
  let fixture: ComponentFixture<EkadasiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EkadasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
