import * as OfflinePluginRuntime from 'offline-plugin/runtime';

/**
 * Angular bootstrapping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';
/**
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') {
  OfflinePluginRuntime.install({
    onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
    onUpdated: () => location.reload(),
  });
}

/**
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}
/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
bootloader(main);
