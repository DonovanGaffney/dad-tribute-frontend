import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import {InMemoryScrollingOptions, provideRouter, withInMemoryScrolling} from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled', // Optional: enables scrolling to anchors based on fragment identifiers
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling(scrollConfig)),
    provideHttpClient()
  ]
};
