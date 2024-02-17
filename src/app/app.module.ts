import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigProductsComponent } from './components/config-products/config-products.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { getStorage, provideStorage } from '@angular/fire/storage';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfigProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: PrincipalComponent
      },
      {
        path: 'acceso',
        component: LoginComponent,
      },
      {
        path: 'acceso/configuracion',
        component: ConfigProductsComponent
      }

    ]),
    provideFirebaseApp(() => initializeApp({"projectId":"avicola-page","appId":"1:356229063825:web:8201ee998d85920c95cb30","storageBucket":"avicola-page.appspot.com","apiKey":"AIzaSyCvAMM7H7TQpnyhpkMAHROqs2-bCCDSLC4","authDomain":"avicola-page.firebaseapp.com","messagingSenderId":"356229063825"})),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    provideClientHydration()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
