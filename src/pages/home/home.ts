import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController} from 'ionic-angular';
import {ProduseCategoriePage} from "../produse-categorie/produse-categorie";
import {AngularFirestore} from "@angular/fire/firestore";
import {CartPage} from "../cart/cart";
import {Storage} from "@ionic/storage";
import {CartProvider} from "../../providers/cart/cartprovider";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public comandaDeInca : number = 0;
  public images: Array<any>;
  public categorii: any[] = [];
  public cartQty: number;
  public cartProducts: any[] =[];

  constructor(public navCtrl: NavController,
              private db: AngularFirestore,
              public menuController: MenuController,
              public cartService: CartProvider,
              public storage: Storage) {


    this.menuController.enable(true, 'yourMenuId');
    this.getCategories().then((cat) => this.categorii = cat);
    this.getCartProducts();
    this.calculeazaCartQty();

    this.images = [{"url":"https://firebasestorage.googleapis.com/v0/b/hanul-cu-ponei.appspot.com/o/Categorii%2Fcategorie1-400x400.jpg?alt=media&token=5f67b03b-6d1b-4601-b967-47431764f1d7", "label":" Ciorbe"},
                   {"url":"https://firebasestorage.googleapis.com/v0/b/sanziana-71537.appspot.com/o/meniuri%2Fbeverage-breakfast-brunch-1385748.jpg?alt=media&token=1738e9fc-1a00-4ed2-99e5-bb2d8a08568e", "label": "Fel Principal"},
                    {"url": "https://firebasestorage.googleapis.com/v0/b/sanziana-71537.appspot.com/o/meniuri%2Fbeverage-breakfast-brunch-1385748.jpg?alt=media&token=1738e9fc-1a00-4ed2-99e5-bb2d8a08568e" , "label" : "Garnituri"},
                   { "url":"https://firebasestorage.googleapis.com/v0/b/sanziana-71537.appspot.com/o/meniuri%2Fbeverage-breakfast-brunch-1385748.jpg?alt=media&token=1738e9fc-1a00-4ed2-99e5-bb2d8a08568e", "label":"Desert"}
      ]
  }

  getCategories() : Promise<any>{
    return new Promise((resolve,reject) =>{
      let categoriesRef = this.db.collection('Categorii');
      var categorii = categoriesRef.ref.get().then(
        (querySnapshot) => {
          let arr = [];
          querySnapshot.forEach(function (doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id
            console.log(obj);
            arr.push(obj);
          });
          if (arr.length > 0) {
            console.log("Document data:", arr);
            resolve(arr);
          } else {
            console.log("No such document!");
            resolve(null);
          }
        }
      ).catch((error: any) => {
        reject(error);
      });
    });
  }

  categorieClick(categorie){
    this.navCtrl.push(ProduseCategoriePage, {
      item: categorie
    });
  }

  openShoppingCart(){
    this.navCtrl.push(CartPage);
  }

  calculeazaCartQty(){
    console.log('**************************');
    this.storage.get('cartItems').then(data =>
    {
      if (data)
      {
        console.log('Dataaaaaaaa',data);
        if (data.length > 0){
          console.log('******************inside calculeaza', data)
          let total = 0;

          for (let i = 0; i < data.length; i++) {
            total = total + (data[i].count);
          }
          this.cartQty = total;
          console.log('cartQty', total);
        }
        else{
          this.cartQty = 0
        }
      }
      else{
        this.cartQty = 0;
      }
    })
  }

  calculeazaCartTotal(){
    console.log('**************************');
    this.storage.get('cartItems').then(data =>
    {
      if (data)
      {
        console.log('Dataaaaaaaa',data);
        if (data.length > 0){
          console.log('******************inside calculeaza', data)
          let total = 0;

          for (let i = 0; i < data.length; i++) {
            total = total + (data[i].pret);
          }
          this.cartQty = total;
          console.log('cartTotal', total);
        }
        else{
          this.cartQty = 0
        }
      }
      else{
        this.cartQty = 0;
      }
    })
  }

  ionViewWillEnter() {
    // this.calculeazaCartQty();

    this.calculeazaCartTotal();
  }

  getCartProducts() {
    return this.cartService.getCartItems().then(res => {
      this.cartProducts = res || [];
      console.log('cartul', res || [])
    });
  }





}
