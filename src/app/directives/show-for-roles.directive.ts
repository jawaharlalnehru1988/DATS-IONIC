import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appShowForRoles]',
  standalone: true
})
export class ShowForRolesDirective implements OnInit {
  @Input() appShowForRoles: string[] = [];
  @Input() appShowForAuth: boolean = false;
  @Input() appHideForAuth: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    // Auth and Role-based UI restrictions removed - always show content
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
