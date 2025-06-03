import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { FilesRestClientConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class FilesRestClientApiModule {
    public static forRoot(configurationFactory: () => FilesRestClientConfiguration): ModuleWithProviders<FilesRestClientApiModule> {
        return {
            ngModule: FilesRestClientApiModule,
            providers: [ { provide: FilesRestClientConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: FilesRestClientApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('FilesRestClientApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
