import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { 
  IonButton, 
  IonIcon, 
  IonPopover, 
  IonContent,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonLabel,
  IonItem
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  text, 
  construct, 
  createOutline,
  colorPalette,
  textOutline,
  chevronBack,
  chevronForward,
  reorderThreeOutline,
  resize,
  chevronDown,
  listOutline,
  list,
  reorderTwo
} from 'ionicons/icons';

interface FontStyle {
  name: string;
  value: string;
}

interface FontSize {
  name: string;
  value: string;
}

interface LineHeight {
  name: string;
  value: string;
}

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonIcon,
    IonPopover,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonLabel,
    IonItem
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true
    }
  ]
})
export class RichTextEditorComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = 'Enter your text here...';
  @Input() height: string = '200px';
  @Input() disabled: boolean = false;
  
  @Output() contentChanged = new EventEmitter<string>();
  
  @ViewChild('editor', { static: true }) editor!: ElementRef<HTMLDivElement>;
  @ViewChild('colorPopover', { static: false }) colorPopover!: IonPopover;
  @ViewChild('backgroundColorPopover', { static: false }) backgroundColorPopover!: IonPopover;
  
  content: string = '';
  isColorPopoverOpen = false;
  isBackgroundColorPopoverOpen = false;
  
  // Font styles available
  fontStyles: FontStyle[] = [
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Times New Roman', value: 'Times New Roman, serif' },
    { name: 'Helvetica', value: 'Helvetica, sans-serif' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
    { name: 'Courier New', value: 'Courier New, monospace' },
    { name: 'Impact', value: 'Impact, sans-serif' },
    { name: 'Comic Sans MS', value: 'Comic Sans MS, cursive' }
  ];
  
  // Font sizes available
  fontSizes: FontSize[] = [
    { name: '8px', value: '1' },
    { name: '10px', value: '2' },
    { name: '12px', value: '3' },
    { name: '14px', value: '4' },
    { name: '18px', value: '5' },
    { name: '24px', value: '6' },
    { name: '32px', value: '7' }
  ];
  
  // Line heights available
  lineHeights: LineHeight[] = [
    { name: '1.0x', value: '1.0' },
    { name: '1.2x', value: '1.2' },
    { name: '1.5x', value: '1.5' },
    { name: '1.8x', value: '1.8' },
    { name: '2.0x', value: '2.0' }
  ];
  
  // Color palette
  colors: string[] = [
    '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
    '#FF0000', '#FF6600', '#FFCC00', '#33FF00', '#00FFCC', '#0066FF',
    '#6600FF', '#FF0099', '#FF3366', '#FF6699', '#FFCCCC', '#FFE6E6',
    '#800000', '#FF8000', '#FFFF00', '#80FF00', '#00FFFF', '#0080FF',
    '#8000FF', '#FF0080', '#804040', '#FF8040', '#FFFF40', '#80FF40'
  ];
  
  selectedFontStyle: string = 'Arial, sans-serif';
  selectedFontSize: string = '3';
  selectedLineHeight: string = '1.5';
  
  // Custom color picker values
  customTextColor: string = '#000000';
  customBackgroundColor: string = '#ffff00';
  
  // Selection preservation
  private savedSelection: Range | null = null;
  
  // Command state cache to prevent ExpressionChangedAfterItHasBeenCheckedError
  private commandStateCache = new Map<string, boolean>();
  private lastCacheUpdate = 0;
  private cacheExpiry = 100; // Cache expires after 100ms
  
  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};
  
  constructor(private cdr: ChangeDetectorRef) {
    addIcons({listOutline,list,textOutline,colorPalette,chevronBack,reorderThreeOutline,chevronForward,reorderTwo,text,construct,createOutline,resize,chevronDown});
  }
  
  ngOnInit() {
    // Initialize editor
  }
  
  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.content = value || '';
    if (this.editor && this.editor.nativeElement) {
      this.editor.nativeElement.innerHTML = this.content;
    }
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.editor && this.editor.nativeElement) {
      this.editor.nativeElement.contentEditable = !isDisabled ? 'true' : 'false';
    }
  }
  
  // Editor event handlers
  onEditorInput(): void {
    this.content = this.editor.nativeElement.innerHTML;
    this.onChange(this.content);
    this.contentChanged.emit(this.content);
  }
  
  onEditorBlur(): void {
    this.onTouched();
  }
  
  onEditorFocus(): void {
    // Handle focus if needed
  }
  
  // Force refresh of toolbar button states
  refreshToolbarState(): void {
    // Clear command state cache to ensure fresh state detection
    this.clearCommandStateCache();
    
    // This method can be called to trigger Angular change detection
    // for the toolbar button states
    if (this.editor && this.editor.nativeElement) {
      this.saveSelection();
    }
  }
  
  // Enhanced selection preservation methods
  saveSelection(): void {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      // Only save if the selection is within our editor
      if (this.editor && this.editor.nativeElement.contains(range.commonAncestorContainer)) {
        this.savedSelection = range.cloneRange();
        // Clear command state cache when selection changes
        this.clearCommandStateCache();
      }
    }
  }
  
  restoreSelection(): boolean {
    if (this.savedSelection) {
      const selection = window.getSelection();
      if (selection) {
        try {
          selection.removeAllRanges();
          selection.addRange(this.savedSelection);
          return true;
        } catch (e) {
          // Selection might be invalid, clear it
          this.savedSelection = null;
          return false;
        }
      }
    }
    return false;
  }
  
  // Enhanced exec command that preserves selection
  execCommand(command: string, value?: string): void {
    if (this.disabled) return;
    
    // Restore selection before executing command
    this.restoreSelection();
    document.execCommand(command, false, value);
    this.onEditorInput(); // Update content after command
    this.editor.nativeElement.focus(); // Keep focus on editor
  }
  
  // Text formatting with enhanced toggle functionality
  toggleBold(): void {
    this.execCommand('bold');
    // Clear cache and force change detection
    this.clearCommandStateCache();
    setTimeout(() => {
      this.refreshToolbarState();
      this.cdr.detectChanges();
    }, 10);
  }
  
  toggleItalic(): void {
    this.execCommand('italic');
    // Clear cache and force change detection
    this.clearCommandStateCache();
    setTimeout(() => {
      this.refreshToolbarState();
      this.cdr.detectChanges();
    }, 10);
  }
  
  toggleUnderline(): void {
    this.execCommand('underline');
    // Clear cache and force change detection
    this.clearCommandStateCache();
    setTimeout(() => {
      this.refreshToolbarState();
      this.cdr.detectChanges();
    }, 10);
  }
  
  toggleSubscript(): void {
    this.execCommand('subscript');
    this.clearCommandStateCache();
    setTimeout(() => this.cdr.detectChanges(), 10);
  }
  
  toggleSuperscript(): void {
    this.execCommand('superscript');
    this.clearCommandStateCache();
    setTimeout(() => this.cdr.detectChanges(), 10);
  }
  
  // List formatting
  toggleBulletList(): void {
    this.execCommand('insertUnorderedList');
    this.clearCommandStateCache();
    setTimeout(() => this.cdr.detectChanges(), 10);
  }
  
  toggleNumberedList(): void {
    this.execCommand('insertOrderedList');
    this.clearCommandStateCache();
    setTimeout(() => this.cdr.detectChanges(), 10);
  }
  
  // Alignment
  alignLeft(): void {
    this.execCommand('justifyLeft');
    this.clearCommandStateCache();
    setTimeout(() => this.cdr.detectChanges(), 10);
  }
  
  alignCenter(): void {
    this.execCommand('justifyCenter');
    this.clearCommandStateCache();
    setTimeout(() => this.cdr.detectChanges(), 10);
  }
  
  alignRight(): void {
    this.execCommand('justifyRight');
    this.clearCommandStateCache();
    setTimeout(() => this.cdr.detectChanges(), 10);
  }
  
  justifyText(): void {
    this.execCommand('justifyFull');
    this.clearCommandStateCache();
    setTimeout(() => this.cdr.detectChanges(), 10);
  }
  
  // Enhanced font styling with fallback for when selection is lost
  changeFontFamily(fontFamily: string): void {
    this.selectedFontStyle = fontFamily;
    
    // Focus the editor first to ensure commands work
    this.editor.nativeElement.focus();
    
    // Try to restore selection and execute command
    if (!this.restoreSelection()) {
      // If no selection exists, select all content or create one
      this.selectAllOrCreateSelection();
    }
    
    this.execCommand('fontName', fontFamily);
  }
  
  changeFontSize(size: string): void {
    this.selectedFontSize = size;
    
    // Focus the editor first to ensure commands work
    this.editor.nativeElement.focus();
    
    // Try to restore selection and execute command
    if (!this.restoreSelection()) {
      // If no selection exists, select all content or create one
      this.selectAllOrCreateSelection();
    }
    
    this.execCommand('fontSize', size);
  }
  
  // New line height method
  changeLineHeight(height: string): void {
    this.selectedLineHeight = height;
    
    // Focus the editor first
    this.editor.nativeElement.focus();
    
    // Apply line height to the editor content
    if (!this.restoreSelection()) {
      this.selectAllOrCreateSelection();
    }
    
    // Apply line height using CSS style
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      
      if (selectedText.length > 0) {
        // Wrap selected text with span having line-height
        const span = document.createElement('span');
        span.style.lineHeight = height;
        try {
          range.surroundContents(span);
        } catch (e) {
          // If surroundContents fails, use insertHTML
          span.innerHTML = selectedText;
          range.deleteContents();
          range.insertNode(span);
        }
      } else {
        // Apply to entire editor content
        this.editor.nativeElement.style.lineHeight = height;
      }
    }
    
    this.onEditorInput();
  }
  
  // Helper method to create a selection when none exists
  private selectAllOrCreateSelection(): void {
    const selection = window.getSelection();
    const range = document.createRange();
    
    if (this.editor.nativeElement.textContent && this.editor.nativeElement.textContent.trim().length > 0) {
      // If there's content, select all of it
      range.selectNodeContents(this.editor.nativeElement);
    } else {
      // If empty, position cursor at the start
      range.setStart(this.editor.nativeElement, 0);
      range.setEnd(this.editor.nativeElement, 0);
    }
    
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      this.savedSelection = range.cloneRange();
    }
  }
  
  // Enhanced color handling
  changeTextColor(color: string): void {
    // Focus the editor first
    this.editor.nativeElement.focus();
    
    // Try to restore selection, if that fails, select all or create selection
    if (!this.restoreSelection()) {
      this.selectAllOrCreateSelection();
    }
    
    this.execCommand('foreColor', color);
    this.isColorPopoverOpen = false;
  }
  
  changeBackgroundColor(color: string): void {
    // Focus the editor first
    this.editor.nativeElement.focus();
    
    // Try to restore selection, if that fails, select all or create selection
    if (!this.restoreSelection()) {
      this.selectAllOrCreateSelection();
    }
    
    this.execCommand('backColor', color);
    this.isBackgroundColorPopoverOpen = false;
  }
  
  // Custom color picker methods
  onCustomTextColorChange(event: any): void {
    const color = event.detail.value;
    this.customTextColor = color;
    this.changeTextColor(color);
  }
  
  onCustomBackgroundColorChange(event: any): void {
    const color = event.detail.value;
    this.customBackgroundColor = color;
    this.changeBackgroundColor(color);
  }
  
  // Popover handlers with selection preservation
  openColorPopover(): void {
    this.saveSelection(); // Save selection before opening popover
    this.isColorPopoverOpen = true;
  }
  
  closeColorPopover(): void {
    this.isColorPopoverOpen = false;
  }
  
  openBackgroundColorPopover(): void {
    this.saveSelection(); // Save selection before opening popover
    this.isBackgroundColorPopoverOpen = true;
  }
  
  closeBackgroundColorPopover(): void {
    this.isBackgroundColorPopoverOpen = false;
  }
  
  // Utility methods
  isCommandActive(command: string): boolean {
    try {
      // Check if we have a cached value that's still valid
      const now = Date.now();
      if (now - this.lastCacheUpdate < this.cacheExpiry && this.commandStateCache.has(command)) {
        return this.commandStateCache.get(command) || false;
      }
      
      // Get fresh state and cache it
      const state = document.queryCommandState(command);
      this.commandStateCache.set(command, state);
      this.lastCacheUpdate = now;
      
      return state;
    } catch (e) {
      // Fallback for browsers that don't support queryCommandState
      return false;
    }
  }
  
  // Clear command state cache when needed
  private clearCommandStateCache(): void {
    this.commandStateCache.clear();
    this.lastCacheUpdate = 0;
  }
  
  getPlainTextContent(): string {
    return this.editor.nativeElement.textContent || '';
  }
  
  getHtmlContent(): string {
    return this.editor.nativeElement.innerHTML || '';
  }
  
  clearContent(): void {
    this.editor.nativeElement.innerHTML = '';
    this.content = '';
    this.onChange(this.content);
    this.contentChanged.emit(this.content);
  }
  
  insertText(text: string): void {
    this.execCommand('insertText', text);
  }
}
