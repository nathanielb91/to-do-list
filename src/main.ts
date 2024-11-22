import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

  const providers = [
    {
      provide: 'MATERIAL_SANITY_CHECKS',
      useValue: {
        doctype: true,
        theme: true,
        version: true,
        typography: false,
      },
    },
  ];

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));

