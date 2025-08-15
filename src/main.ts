import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideClientHydration(withEventReplay())
  ],
});
