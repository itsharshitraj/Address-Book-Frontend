import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    importProvidersFrom(ReactiveFormsModule) // Must be here
  ]
};
