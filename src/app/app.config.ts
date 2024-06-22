import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient} from "@angular/common/http";
import {ConfigService} from "./services/config.service";
import {lastValueFrom} from "rxjs";
import {provideNativeDateAdapter} from "@angular/material/core";

export function initializeConfig(configService: ConfigService){
  return async (): Promise<any> => {
    return lastValueFrom(configService.loadConfig());
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      deps: [ConfigService],
      multi: true
    },
    provideNativeDateAdapter()
  ]
};
