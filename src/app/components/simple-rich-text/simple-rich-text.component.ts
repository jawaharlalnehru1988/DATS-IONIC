import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-rich-text',
  templateUrl: './simple-rich-text.component.html',
  styleUrls: ['./simple-rich-text.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class SimpleRichTextComponent implements AfterViewInit {
  @ViewChild('editableDiv') editableDiv!: ElementRef;
  
  @Input() initialContent: string = '';
  @Input() placeholder: string = 'Paste content from Word, Google Docs, or type here...';
  @Input() minHeight: string = '200px';
  
  @Output() contentChanged = new EventEmitter<string>();
  
  private lastEmittedContent: string = '';

  ngAfterViewInit() {
    if (this.editableDiv && this.editableDiv.nativeElement) {
      // Set initial content if provided
      if (this.initialContent) {
        this.editableDiv.nativeElement.innerHTML = this.initialContent;
      }
      
      // Add paste event listener to clean up pasted content
      this.editableDiv.nativeElement.addEventListener('paste', (e: ClipboardEvent) => {
        e.preventDefault();
        
        // Get clipboard data
        const text = e.clipboardData?.getData('text/html') || e.clipboardData?.getData('text/plain') || '';
        
        // Clean the pasted content
        const cleanedContent = this.cleanPastedContent(text);
        
        // Insert at cursor position
        document.execCommand('insertHTML', false, cleanedContent);
        
        // Emit change
        this.emitContentChange();
      });

      // Add input event listener to detect changes
      this.editableDiv.nativeElement.addEventListener('input', () => {
        this.emitContentChange();
      });

      // Set focus styles
      this.editableDiv.nativeElement.addEventListener('focus', () => {
        this.editableDiv.nativeElement.classList.add('focused');
      });

      this.editableDiv.nativeElement.addEventListener('blur', () => {
        this.editableDiv.nativeElement.classList.remove('focused');
      });
    }
  }
  
  // This method cleans the pasted content to keep only simple HTML formatting
  private cleanPastedContent(html: string): string {
    // If plain text, just return it
    if (!html.includes('<')) {
      return html;
    }

    // Create a temporary div to manipulate the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove unwanted tags and attributes
    this.cleanNode(tempDiv);
    
    return tempDiv.innerHTML;
  }
  
  private cleanNode(node: Node): void {
    // If it's a text node, leave it as is
    if (node.nodeType === 3) {
      return;
    }
    
    // If it's an element node
    if (node.nodeType === 1) {
      const element = node as HTMLElement;
      
      // List of allowed tags - expanded to include more Google Docs elements
      const allowedTags = [
        'P', 'DIV', 'BR', 'STRONG', 'B', 'EM', 'I', 'U', 'UL', 'OL', 'LI', 
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'SUB', 'SUP', 
        'TABLE', 'TR', 'TD', 'TH', 'THEAD', 'TBODY', 'BLOCKQUOTE'
      ];
      
      // For span elements, check if they contain only formatting that should be preserved
      // If not on allowed list and not a span with styles, remove the element
      if (!allowedTags.includes(element.tagName) || 
          (element.tagName === 'SPAN' && !this.hasImportantStyles(element))) {
        // Replace with its content
        while (element.firstChild) {
          node.parentNode?.insertBefore(element.firstChild, element);
        }
        node.parentNode?.removeChild(element);
        return;
      }
      
      // Expanded list of allowed styles
      const allowedStyles = [
        // Text formatting
        'font-weight', 'font-style', 'text-decoration', 'font-size', 'font-family',
        // Text alignment
        'text-align', 'text-indent', 'text-transform',
        // Spacing
        'line-height', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom',
        // Colors
        'color', 'background-color',
        // Display and position related
        'vertical-align',
        // Border styles
        'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
        'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
        'border-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
        'border-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
        'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius',
        // Padding styles - to maintain space between content and borders
        'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
        // Box model
        'box-sizing'
      ];
      
      const stylesToKeep: Record<string, string> = {};
      
      if (element.style && element.style.length) {
        // Iterate through all styles in the element
        for (let i = 0; i < element.style.length; i++) {
          const propertyName = element.style[i];
          if (allowedStyles.includes(propertyName)) {
            const value = element.style.getPropertyValue(propertyName);
            if (value) {
              stylesToKeep[propertyName] = value;
            }
          }
        }
      }
      
      // Preserve certain attributes that control formatting
      const classAttr = element.getAttribute('class');
      const alignAttr = element.getAttribute('align');
      const widthAttr = element.getAttribute('width');
      const heightAttr = element.getAttribute('height');
      const borderAttr = element.getAttribute('border');
      const cellspacingAttr = element.getAttribute('cellspacing');
      const cellpaddingAttr = element.getAttribute('cellpadding');
      const frameborderAttr = element.getAttribute('frameborder');
      const styleAttr = element.getAttribute('style');
      
      // Remove all attributes
      while (element.attributes.length > 0) {
        element.removeAttribute(element.attributes[0].name);
      }
      
      // Add back allowed styles
      let styleValue = '';
      if (Object.keys(stylesToKeep).length > 0) {
        Object.entries(stylesToKeep).forEach(([prop, val]) => {
          styleValue += `${prop}:${val};`;
        });
        element.setAttribute('style', styleValue);
      } 
      // If the element had a style attribute with padding and our preserved styles don't have padding
      else if (styleAttr && 
          (styleAttr.includes('padding') || 
           styleAttr.includes('border'))) {
        element.setAttribute('style', styleAttr);
      }
      
      // Restore important attributes
      if (classAttr && this.isFormattingClass(classAttr)) {
        element.setAttribute('class', classAttr);
      }
      if (alignAttr) {
        element.setAttribute('align', alignAttr);
      }
      if (widthAttr) {
        element.setAttribute('width', widthAttr);
      }
      if (heightAttr) {
        element.setAttribute('height', heightAttr);
      }
      if (borderAttr) {
        element.setAttribute('border', borderAttr);
      }
      if (cellspacingAttr) {
        element.setAttribute('cellspacing', cellspacingAttr);
      }
      if (cellpaddingAttr) {
        element.setAttribute('cellpadding', cellpaddingAttr);
      }
      if (frameborderAttr) {
        element.setAttribute('frameborder', frameborderAttr);
      }
      
      // Clean child nodes
      Array.from(element.childNodes).forEach(child => {
        this.cleanNode(child);
      });
    }
  }
  
  // Helper method to check if an element has important styles that should be preserved
  private hasImportantStyles(element: HTMLElement): boolean {
    if (!element.style || element.style.length === 0) {
      return false;
    }
    
    const importantStyleProps = [
      'font-weight', 'font-style', 'text-decoration', 'font-size',
      'font-family', 'text-align', 'color', 'background-color',
      'border', 'border-width', 'border-style', 'border-color', 'border-radius',
      'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'
    ];
    
    for (let i = 0; i < element.style.length; i++) {
      if (importantStyleProps.includes(element.style[i])) {
        return true;
      }
    }
    
    return false;
  }
  
  // Helper to check if a class is likely related to formatting
  private isFormattingClass(className: string): boolean {
    // Classes that often indicate formatting in Google Docs and other platforms
    const formattingKeywords = [
      'align', 'font', 'text', 'heading', 'indent', 'margin', 
      'list', 'bullet', 'numbered', 'bold', 'italic', 'underline',
      'border', 'outline', 'frame', 'cell', 'table', 'box',
      'padding', 'space', 'inset', 'gutter', 'gap'
    ];
    
    return formattingKeywords.some(keyword => className.toLowerCase().includes(keyword));
  }
  
  private emitContentChange(): void {
    if (this.editableDiv) {
      const currentContent = this.editableDiv.nativeElement.innerHTML;
      
      // Only emit if content has changed
      if (this.lastEmittedContent !== currentContent) {
        this.lastEmittedContent = currentContent;
        this.contentChanged.emit(currentContent);
      }
    }
  }

  // Public method to get the content
  getContent(): string {
    return this.editableDiv ? this.editableDiv.nativeElement.innerHTML : '';
  }

  // Public method to set the content
  setContent(html: string): void {
    if (this.editableDiv) {
      this.editableDiv.nativeElement.innerHTML = html;
      this.emitContentChange();
    }
  }

  // Public method to clear the content
  clearContent(): void {
    if (this.editableDiv) {
      this.editableDiv.nativeElement.innerHTML = '';
      this.emitContentChange();
    }
  }
}
