import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LanguagePage } from './language.page';

describe('LanguagePage', () => {
  let component: LanguagePage;
  let fixture: ComponentFixture<LanguagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagePage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
