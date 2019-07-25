import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {EvenimentePage} from "../pages/evenimente/evenimente";
import {CartProvider} from "../providers/cart/cartprovider";
import {AngularFirestore} from "@angular/fire/firestore";
import {Storage} from "@ionic/storage";
import {RezervariPage} from "../pages/rezervari/rezervari";
import {MeniulZileiPage} from "../pages/meniul-zilei/meniul-zilei";
import {SignInPage} from "../pages/sign-in/sign-in";
import {FcmProvider} from "../providers/fcm/fcm";

declare let FCMPlugin;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string= 'HomePage';
  pages: Array<{title: string, component: any}>;
  pages2: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public cartService: CartProvider,
              private afs: AngularFirestore,
              public storage: Storage,
              public fcm: FcmProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.initializeApp();
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.initializeApp();

    this.pages = [
      { title: 'Acasa', component: HomePage },
      // { title: 'Comenzile Mele', component: MyOrdersPage },
      // { title: 'Contul meu', component: SignInPage},
      // { title: 'Despre Sanziana', component: AboutSanzianaPage},
      // { title: 'GDPR', component: ConfidentPage},
      { title: 'Evenimente', component: EvenimentePage},


    ];

    this.pages2 = {
      // ordersPage: MyOrdersPage,
      homePage: HomePage,
      meniulZilei: MeniulZileiPage,
      evenimente: EvenimentePage,
      rezervari: RezervariPage,
      contulmeuPage: SignInPage
      // aboutSanziana: AboutSanzianaPage,
      // confident: ConfidentPage
    }
  }

  initializeApp() {
    // this.storage.ready().then(() => {
    //   console.log('Storage readyyyyy');
    // });

    this.fcm.getToken()


    this.afs.doc('Settings/Shipping').ref.get()
        .then((querySnapshot) => {
          let shipping = JSON.parse(JSON.stringify(querySnapshot.data()));
          this.storage.set('limit', shipping.limit);
          this.storage.set('telDispecerat', shipping.phone);
          console.log(shipping.limit)
        });

    //
    // this.platform.ready().then(() => {
    //
    //   if(typeof(FCMPlugin) !== "undefined") {
    //     let self  = this;
    //     FCMPlugin.getToken(function (t) {
    //
    //       self.storage.set('token', t);
    //       // alert(t);
    //       // return this.storage.set('token', t);
    //
    //     }, function (e) {
    //       console.log("Uh-Oh!\n" + e);
    //     });
    //   }


      // if (typeof FCMPlugin != 'undefined') {
      //   FCMPlugin.getToken(
      //     (t) => {
      //       return this.storage.set('token', t);
      //       // alert(t);
      //     },
      //     (e) => {
      //       console.log(e);
      //     }
      //   );
      // }

      // FCMPlugin.onNotification(
      //   (data) => {
      //    alert(data);
      //   },
      //   (e) => {
      //     console.log(e);
      //   }
      // );
      //
      // FCMPlugin.getToken(function(token){
      //   alert(token);
      // });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //
      // this.statusBar.styleDefault();
      // // this.splashScreen.hide();
      // this.clearCart();


    // });
  }

  clearCart(){
    this.cartService.removeAllCartItems();
  }


}

