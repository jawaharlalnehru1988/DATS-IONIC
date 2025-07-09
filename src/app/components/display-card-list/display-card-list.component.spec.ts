import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DisplayCardListComponent } from './display-card-list.component';
import { AudioItem, CardItem, InputData } from 'src/app/Utils/models';

describe('DisplayCardListComponent', () => {
  let component: DisplayCardListComponent;
  let fixture: ComponentFixture<DisplayCardListComponent>;

  // Mock data for testing
  const mockAudioData: AudioItem = {
    audioSrc: 'https://example.com/audio.mp3',
    imageSrc: 'https://example.com/image.jpg',
    auther: 'Test Author',
    title: 'Test Audio Title',
    _id: 'audio123'
  };

  const mockCardItem: CardItem = {
    img: 'https://example.com/card-image.jpg',
    title: 'Test Card Title',
    category: 'Test Category',
    desc: 'Test Description',
    audioData: mockAudioData,
    rating: '4.5',
    action: 'read',
    _id: 'card123'
  };

  const mockInputData: InputData = {
    categoryName: 'Test Category',
    cardItems: [mockCardItem]
  };

  const mockInputDataMultiple: InputData = {
    categoryName: 'Multiple Cards Category',
    cardItems: [
      mockCardItem,
      {
        ...mockCardItem,
        _id: 'card456',
        title: 'Second Card',
        desc: 'Second Description'
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCardListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayCardListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with default properties', () => {
      expect(component.inputData).toBeUndefined();
      expect(component.cardSelected).toBeDefined();
    });

    it('should accept inputData as input', () => {
      component.inputData = mockInputData;
      expect(component.inputData).toEqual(mockInputData);
    });
  });

  describe('Template Rendering', () => {
    beforeEach(() => {
      component.inputData = mockInputData;
      fixture.detectChanges();
    });

    it('should display category name', () => {
      const categoryElement = fixture.debugElement.query(By.css('h1'));
      expect(categoryElement.nativeElement.textContent.trim()).toBe(mockInputData.categoryName);
    });

    it('should render ion-grid, ion-row, and ion-col elements', () => {
      const gridElement = fixture.debugElement.query(By.css('ion-grid'));
      const rowElement = fixture.debugElement.query(By.css('ion-row'));
      const colElements = fixture.debugElement.queryAll(By.css('ion-col'));

      expect(gridElement).toBeTruthy();
      expect(rowElement).toBeTruthy();
      expect(colElements.length).toBe(mockInputData.cardItems.length);
    });

    it('should render correct number of cards', () => {
      const cardElements = fixture.debugElement.queryAll(By.css('.display-card'));
      expect(cardElements.length).toBe(mockInputData.cardItems.length);
    });

    it('should display card information correctly', () => {
      const cardElement = fixture.debugElement.query(By.css('.display-card'));
      const titleElement = cardElement.query(By.css('.display-card-title'));
      const descElement = cardElement.query(By.css('.display-card-desc'));
      const ratingElement = cardElement.query(By.css('.display-card-rating span'));
      const actionElement = cardElement.query(By.css('.display-price'));

      expect(titleElement.nativeElement.textContent.trim()).toBe(mockCardItem.title);
      expect(descElement.nativeElement.textContent.trim()).toBe(mockCardItem.desc);
      expect(ratingElement.nativeElement.textContent.trim()).toBe(mockCardItem.rating);
      expect(actionElement.nativeElement.textContent.trim()).toBe(mockCardItem.action);
    });

    it('should display card image with correct src and alt attributes', () => {
      const imageElement = fixture.debugElement.query(By.css('.display-card img'));
      
      expect(imageElement.nativeElement.src).toBe(mockCardItem.img);
      expect(imageElement.nativeElement.alt).toBe(mockCardItem.title);
    });

    it('should display star icon in rating section', () => {
      const starIcon = fixture.debugElement.query(By.css('.display-card-rating ion-icon[name="star"]'));
      expect(starIcon).toBeTruthy();
    });

    it('should display add button with add icon', () => {
      const addButton = fixture.debugElement.query(By.css('.add-btn'));
      const addIcon = addButton.query(By.css('ion-icon[name="add"]'));
      
      expect(addButton).toBeTruthy();
      expect(addIcon).toBeTruthy();
    });
  });

  describe('Multiple Cards Rendering', () => {
    beforeEach(() => {
      component.inputData = mockInputDataMultiple;
      fixture.detectChanges();
    });

    it('should render multiple cards correctly', () => {
      const cardElements = fixture.debugElement.queryAll(By.css('.display-card'));
      expect(cardElements.length).toBe(mockInputDataMultiple.cardItems.length);
    });

    it('should display different titles for different cards', () => {
      const titleElements = fixture.debugElement.queryAll(By.css('.display-card-title'));
      
      expect(titleElements[0].nativeElement.textContent.trim()).toBe(mockInputDataMultiple.cardItems[0].title);
      expect(titleElements[1].nativeElement.textContent.trim()).toBe(mockInputDataMultiple.cardItems[1].title);
    });
  });

  describe('Event Handling', () => {
    beforeEach(() => {
      component.inputData = mockInputData;
      fixture.detectChanges();
    });

    it('should emit cardSelected event when card is clicked', () => {
      spyOn(component.cardSelected, 'emit');
      
      const cardElement = fixture.debugElement.query(By.css('ion-col'));
      cardElement.triggerEventHandler('click', null);

      expect(component.cardSelected.emit).toHaveBeenCalledWith(mockCardItem);
    });

    it('should call onCardClick method when card is clicked', () => {
      spyOn(component, 'onCardClick');
      
      const cardElement = fixture.debugElement.query(By.css('ion-col'));
      cardElement.triggerEventHandler('click', null);

      expect(component.onCardClick).toHaveBeenCalledWith(mockCardItem);
    });

    it('should emit correct card data when specific card is clicked in multiple cards scenario', () => {
      component.inputData = mockInputDataMultiple;
      fixture.detectChanges();
      
      spyOn(component.cardSelected, 'emit');
      
      const cardElements = fixture.debugElement.queryAll(By.css('ion-col'));
      cardElements[1].triggerEventHandler('click', null);

      expect(component.cardSelected.emit).toHaveBeenCalledWith(mockInputDataMultiple.cardItems[1]);
    });
  });

  describe('Component Methods', () => {
    it('should have onCardClick method', () => {
      expect(component.onCardClick).toBeDefined();
      expect(typeof component.onCardClick).toBe('function');
    });

    it('should emit cardSelected event when onCardClick is called', () => {
      spyOn(component.cardSelected, 'emit');
      
      component.onCardClick(mockCardItem);

      expect(component.cardSelected.emit).toHaveBeenCalledWith(mockCardItem);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty cardItems array', () => {
      const emptyInputData: InputData = {
        categoryName: 'Empty Category',
        cardItems: []
      };
      
      component.inputData = emptyInputData;
      fixture.detectChanges();

      const categoryElement = fixture.debugElement.query(By.css('h1'));
      const cardElements = fixture.debugElement.queryAll(By.css('.display-card'));

      expect(categoryElement.nativeElement.textContent.trim()).toBe('Empty Category');
      expect(cardElements.length).toBe(0);
    });

    it('should handle undefined/null values gracefully', () => {
      const cardWithNullValues: CardItem = {
        img: '',
        title: '',
        category: '',
        desc: '',
        audioData: mockAudioData,
        rating: '',
        action: '',
        _id: ''
      };

      const inputDataWithNulls: InputData = {
        categoryName: '',
        cardItems: [cardWithNullValues]
      };

      component.inputData = inputDataWithNulls;
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });

  describe('CSS Classes', () => {
    beforeEach(() => {
      component.inputData = mockInputData;
      fixture.detectChanges();
    });

    it('should apply correct CSS classes to elements', () => {
      const containerElement = fixture.debugElement.query(By.css('.display-card-list'));
      const cardElement = fixture.debugElement.query(By.css('.display-card'));
      const titleElement = fixture.debugElement.query(By.css('.display-card-title'));
      const descElement = fixture.debugElement.query(By.css('.display-card-desc'));
      const footerElement = fixture.debugElement.query(By.css('.display-card-footer'));
      const ratingElement = fixture.debugElement.query(By.css('.display-card-rating'));
      const priceElement = fixture.debugElement.query(By.css('.display-price'));
      const addButtonElement = fixture.debugElement.query(By.css('.add-btn'));

      expect(containerElement).toBeTruthy();
      expect(cardElement).toBeTruthy();
      expect(titleElement).toBeTruthy();
      expect(descElement).toBeTruthy();
      expect(footerElement).toBeTruthy();
      expect(ratingElement).toBeTruthy();
      expect(priceElement).toBeTruthy();
      expect(addButtonElement).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      component.inputData = mockInputData;
      fixture.detectChanges();
    });

    it('should have proper alt text for images', () => {
      const imageElement = fixture.debugElement.query(By.css('.display-card img'));
      expect(imageElement.nativeElement.alt).toBe(mockCardItem.title);
    });

    it('should have clickable elements for keyboard navigation', () => {
      const cardElement = fixture.debugElement.query(By.css('ion-col'));
      expect(cardElement).toBeTruthy();
    });
  });
});
