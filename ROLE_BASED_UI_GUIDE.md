# Role-Based UI System Documentation

## Overview

This Ionic Angular application implements a comprehensive role-based UI system that allows different content and features to be shown based on user authentication status and roles. The app features a beautiful landing dashboard page with a scrolling marquee and encourages visitors to explore all sections. Unlike traditional route-based protection, this system allows public access to the app while conditionally showing UI elements based on user privileges.

## Landing Page Features

### 🏠 **Dashboard as Default Page**
- **Landing URL**: The dashboard (`/dashboard`) is now the default route for all visitors
- **Marquee Banner**: Scrolling "Hare Krishna" maha-mantra that moves from right to left infinitely
- **Hero Section**: Personalized welcome based on authentication status
- **Feature Cards**: Beautiful, clickable cards that encourage exploration of different app sections

### 🎨 **Engaging UI Elements**
- **Theme Integration**: Fully integrated with the existing theme system (`theme-models.scss`)
- **Animated Cards**: Hover effects and smooth transitions on feature cards
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Role-Based Content**: Different content shown based on user roles and authentication

## Key Features

### 1. Public Access by Default
- All users can access the application and most routes
- Authentication is optional for basic functionality
- Enhanced features available for authenticated users

### 2. Role-Based UI Elements
- UI components show/hide based on user roles
- Smooth transitions and animations
- Real-time updates when authentication state changes

### 3. Supported User Roles
- **Guest**: Unauthenticated users (public access)
- **Devotee**: Regular authenticated users
- **Premium**: Premium subscription users
- **Admin**: Administrative users with full access

## Implementation Components

### 1. AuthService (`src/app/services/auth.service.ts`)
Core authentication service with:
- JWT token management
- User state management with RxJS
- Secure localStorage handling
- Error handling and recovery

```typescript
// Key observables
this.authService.isAuthenticated$  // Boolean authentication state
this.authService.currentUser$      // Current user data
```

### 2. RoleBasedUIService (`src/app/services/role-based-ui.service.ts`)
Service for UI-level permission checks:

```typescript
// Usage examples
this.roleService.canShowAdminFeatures()     // Admin-only features
this.roleService.canShowDevoteeFeatures()   // Devotee + Admin features
this.roleService.canShowPremiumFeatures()   // Premium + Admin features
this.roleService.isUserAuthenticated()      // Authentication check
this.roleService.hasRole('admin')           // Specific role check
this.roleService.hasAnyRole(['devotee', 'premium']) // Multiple role check
```

### 3. ShowForRolesDirective (`src/app/directives/show-for-roles.directive.ts`)
Structural directive for template-based role checking:

```html
<!-- Show only for authenticated users -->
<div *appShowForAuth>
  Welcome back, user!
</div>

<!-- Show only for guests (non-authenticated) -->
<div *appHideForAuth>
  Please sign in to access premium features
</div>

<!-- Show for specific roles -->
<button *appShowForRoles="['admin']">Admin Panel</button>
<button *appShowForRoles="['devotee', 'admin']">Devotee Features</button>
<button *appShowForRoles="['premium', 'admin']">Premium Content</button>
```

## Usage Examples

### Basic Template Usage

```html
<!-- Authentication-based visibility -->
<ion-card *appShowForAuth>
  <ion-card-header>
    <ion-card-title>Welcome Back!</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    You are logged in as: {{ userRole$ | async }}
  </ion-card-content>
</ion-card>

<!-- Guest-only content -->
<ion-card *appHideForAuth>
  <ion-card-header>
    <ion-card-title>Join Our Community</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    <ion-button routerLink="/register">Sign Up</ion-button>
  </ion-card-content>
</ion-card>

<!-- Role-specific buttons -->
<ion-button *appShowForRoles="['admin']" color="danger">
  <ion-icon name="settings" slot="start"></ion-icon>
  Admin Settings
</ion-button>

<ion-button *appShowForRoles="['devotee', 'admin']" color="tertiary">
  <ion-icon name="heart" slot="start"></ion-icon>
  Devotee Features
</ion-button>
```

### Component Integration

```typescript
import { Component, OnInit } from '@angular/core';
import { RoleBasedUIService } from '../services/role-based-ui.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-example',
  templateUrl: './example.page.html',
  imports: [ShowForRolesDirective] // Import the directive
})
export class ExamplePage implements OnInit {
  
  isAuthenticated$: Observable<boolean>;
  userRole$: Observable<string | null>;
  canShowAdminFeatures$: Observable<boolean>;

  constructor(private roleService: RoleBasedUIService) {
    this.isAuthenticated$ = this.roleService.isUserAuthenticated();
    this.userRole$ = this.roleService.getCurrentUserRole();
    this.canShowAdminFeatures$ = this.roleService.canShowAdminFeatures();
  }

  ngOnInit() {}
  
  // Example method with role checking
  async performAction() {
    const canEdit = await this.roleService.canEditContent().toPromise();
    if (canEdit) {
      // Perform action
      console.log('User can edit content');
    } else {
      console.log('User cannot edit content');
    }
  }
}
```

## Dashboard Example

The `DashboardPage` provides a comprehensive example of role-based UI implementation:

- **Public Section**: Available to all users
- **Guest Section**: Only shown to non-authenticated users
- **Devotee Section**: Available to devotees and admins
- **Premium Section**: Available to premium users and admins
- **Admin Section**: Only available to admin users
- **User Info Section**: Shows authenticated user details

## Menu System

The app component menu automatically adapts based on authentication state:

- **Guests**: See login/register options
- **Authenticated Users**: See user info and logout option
- **All Users**: Have access to main navigation

## Best Practices

### 1. Always Use Observables
```typescript
// Good - Reactive approach
isAuthenticated$ = this.roleService.isUserAuthenticated();

// Avoid - Snapshot approach (won't update reactively)
isAuthenticated = this.roleService.isUserAuthenticated().pipe(take(1));
```

### 2. Import the Directive
```typescript
@Component({
  imports: [ShowForRolesDirective] // Always import in standalone components
})
```

### 3. Handle Loading States
```html
<div *appShowForAuth>
  <ng-container *ngIf="userRole$ | async as role; else loading">
    <p>Your role: {{ role }}</p>
  </ng-container>
  <ng-template #loading>
    <ion-spinner></ion-spinner>
  </ng-template>
</div>
```

### 4. Combine Multiple Conditions
```html
<!-- Complex role checking -->
<ion-button 
  *appShowForRoles="['admin', 'moderator']"
  [disabled]="!(canEditContent$ | async)">
  Edit Content
</ion-button>
```

## Security Considerations

⚠️ **Important**: This system provides UI-level security only. Always implement proper backend validation and authorization for sensitive operations.

### Frontend Security
- UI elements are hidden but HTML is still accessible
- Use for user experience, not security enforcement
- Always validate permissions on the backend

### Backend Integration
```typescript
// Example API call with role checking
async deleteItem(itemId: string) {
  const canDelete = await this.roleService.canDeleteContent().toPromise();
  if (!canDelete) {
    throw new Error('Insufficient permissions');
  }
  
  // Make API call - backend should also validate permissions
  return this.http.delete(`/api/items/${itemId}`).toPromise();
}
```

## Troubleshooting

### Common Issues

1. **Directive not working**: Ensure `ShowForRolesDirective` is imported in component
2. **No reactive updates**: Use observables with async pipe, not subscriptions in templates
3. **Flash of content**: Add loading states for role-dependent content
4. **Authentication state not updating**: Check if `AuthService.checkAuthState()` is called on app init

### Debugging

```typescript
// Add to component constructor for debugging
constructor(private roleService: RoleBasedUIService) {
  this.roleService.isUserAuthenticated().subscribe(auth => 
    console.log('Auth state:', auth)
  );
  this.roleService.getCurrentUserRole().subscribe(role => 
    console.log('User role:', role)
  );
}
```

## Testing

Test different authentication states:

1. **Guest User**: Access `/dashboard` without logging in
2. **Devotee**: Register with role 'devotee' and check available features
3. **Premium**: Login with role 'premium' and verify premium content
4. **Admin**: Login with role 'admin' and confirm all features are visible

## Future Enhancements

- Multiple roles per user
- Permission-based system (beyond roles)
- Dynamic role assignment
- Role hierarchy system
- Time-based access controls

---

This role-based UI system provides a flexible foundation for managing user access while maintaining public accessibility to your Ionic application.
