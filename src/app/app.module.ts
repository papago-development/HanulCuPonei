import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ProduseCategoriePage} from "../pages/produse-categorie/produse-categorie";
import {ProduseCategoriePageModule} from "../pages/produse-categorie/produse-categorie.module";
import {AngularFireModule} from "@angular/fire";
import { environment } from "../environments/environment"
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {HomeModule} from "../pages/home/home.module";
import {EvenimentePage} from "../pages/evenimente/evenimente";
import {EvenimentePageModule} from "../pages/evenimente/evenimente.module";
import {SocialSharing} from "@ionic-native/social-sharing";
import {CartProvider} from "../providers/cart/cartprovider";
import {CartPage} from "../pages/cart/cart";
import {CartPageModule} from "../pages/cart/cart.module";
import {ModalGdprPage} from "../pages/modal-gdpr/modal-gdpr";
import {ModalGdprPageModule} from "../pages/modal-gdpr/modal-gdpr.module";
import {AddressEntryPageModule} from "../pages/address-entry/address-entry.module";
import {AddressEntryPage} from "../pages/address-entry/address-entry";
import {NativeGeocoder} from "@ionic-native/native-geocoder";
import {Geolocation} from "@ionic-native/geolocation";
import {SMS} from "@ionic-native/sms";
import {RezervariPageModule} from "../pages/rezervari/rezervari.module";
import {RezervariPage} from "../pages/rezervari/rezervari";
import {MeniulZileiPageModule} from "../pages/meniul-zilei/meniul-zilei.module";
import {MeniulZileiPage} from "../pages/meniul-zilei/meniul-zilei";
import {SignInPage} from "../pages/sign-in/sign-in";
import {SignInPageModule} from "../pages/sign-in/sign-in.module";
import {ComponentsModule} from "../components/components.module";
import {Facebook} from "@ionic-native/facebook";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import AuthProvider = firebase.auth.AuthProvider;
import {AngularFireAuthModule} from "@angular/fire/auth";
import { FacebookServiceProvider } from '../providers/facebook-service/facebook-service';
import { FcmProvider } from '../providers/fcm/fcm';
import {Firebase} from "@ionic-native/firebase";

@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // EvenimentePage
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ProduseCategoriePageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AngularFirestoreModule,
    HomeModule,
    ComponentsModule,
    EvenimentePageModule,
    CartPageModule,
    ModalGdprPageModule,
    AddressEntryPageModule,
    RezervariPageModule,
    MeniulZileiPageModule,
    SignInPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProduseCategoriePage,
    EvenimentePage,
    CartPage,
    ModalGdprPage,
    AddressEntryPage,
    RezervariPage,
    MeniulZileiPage,
    SignInPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    CartProvider,
    Storage,
    Geolocation,
    NativeGeocoder,
    SMS,
    Firebase,
    FcmProvider,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    FacebookServiceProvider,
    FcmProvider
  ]
})
export class AppModule {}
