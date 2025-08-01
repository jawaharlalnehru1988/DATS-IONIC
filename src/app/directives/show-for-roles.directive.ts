import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { RoleBasedUIService } from '../services/role-based-ui.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appShowForRoles]',
  standalone: true
})
export class ShowForRolesDirective implements OnInit, OnDestroy {
  @Input() appShowForRoles: string[] = [];
  @Input() appShowForAuth: boolean = false; // Show only for authenticated users
  @Input() appHideForAuth: boolean = false; // Hide for authenticated users (show for guests)

  private subscription = new Subscription();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private roleBasedUIService: RoleBasedUIService
  ) {}

  ngOnInit() {
    this.updateView();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateView() {
    // If appShowForAuth is true, show only for authenticated users
    if (this.appShowForAuth) {
      this.subscription.add(
        this.roleBasedUIService.isUserAuthenticated().subscribe(isAuth => {
          this.toggleView(isAuth);
        })
      );
      return;
    }

    // If appHideForAuth is true, hide for authenticated users (show for guests)
    if (this.appHideForAuth) {
      this.subscription.add(
        this.roleBasedUIService.isUserAuthenticated().subscribe(isAuth => {
          this.toggleView(!isAuth);
        })
      );
      return;
    }

    // If roles are specified, check role-based access
    if (this.appShowForRoles.length > 0) {
      this.subscription.add(
        this.roleBasedUIService.hasAnyRole(this.appShowForRoles).subscribe(hasRole => {
          this.toggleView(hasRole);
        })
      );
      return;
    }

    // Default: show for everyone
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private toggleView(show: boolean) {
    if (show) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
