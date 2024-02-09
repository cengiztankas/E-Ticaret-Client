import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { SocialAuthServiceConfig, SocialLoginModule ,GoogleSigninButtonModule} from '@abacritt/angularx-social-login';
import {
    GoogleLoginProvider,
    FacebookLoginProvider
  } from '@abacritt/angularx-social-login';
import { LoginComponent } from './ui/components/auth/login/login.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorHandlerIntercepterService } from './services/common/erorrHandler/http-error-handler-intercepter.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DynamicLoadComponentDirective
    ],
    // providers: [{provide:"baseUrl",useValue:"https://localhost:7228/api",multi:true}],
    providers: [
        {provide:"baseUrl",useValue:"https://localhost:7228/api",multi:true},
        {provide:"baseSignalRUrl",useValue:"https://localhost:7228/",multi:true},
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                    "196474109263-dfjpiufvik7mtb7ptn15989sic2e8tf5.apps.googleusercontent.com"
                  )
                },
                {
                  id: FacebookLoginProvider.PROVIDER_ID,
                  provider: new FacebookLoginProvider("181086961728197")
                }
              ],
              onError: (err) => {
                console.error(err);
              }
            } as SocialAuthServiceConfig,
          },
        {provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerIntercepterService,multi:true}
    ],
    bootstrap: [AppComponent],
    imports: [
        ReactiveFormsModule,
        RouterLink,
        BrowserModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
        AppRoutingModule,
        AdminModule,
        UiModule,
        NgxSpinnerModule,
        HttpClientModule,
        SocialLoginModule,GoogleSigninButtonModule ,
        JwtModule.forRoot({
            config:{
                tokenGetter:()=>localStorage.getItem("accessToken"),
                allowedDomains:["localhost:7228"] //token ı hangi api ye göndereeceğimizi belirtiyoruz.
            }
        })
    ]
})
export class AppModule {
 }
