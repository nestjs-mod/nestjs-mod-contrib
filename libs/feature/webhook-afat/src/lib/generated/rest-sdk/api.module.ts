import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { WebhookRestClientConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class WebhookRestClientApiModule {
    public static forRoot(configurationFactory: () => WebhookRestClientConfiguration): ModuleWithProviders<WebhookRestClientApiModule> {
        return {
            ngModule: WebhookRestClientApiModule,
            providers: [ { provide: WebhookRestClientConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: WebhookRestClientApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('WebhookRestClientApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
