import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Observable} from "rxjs/Rx";

/*
  Generated class for the CardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const CART_KEY = 'cartItems';
const CART_QTY = 'cartItemsQty';

@Injectable()
export class CartProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello CardProvider Provider');
  }

  addToCart(product) {
    return this.getCartItems().then(result => {
      if (result) {
        result.push(product);
        console.log('cartul este ', result);
        return this.storage.set(CART_KEY, result);

        // if (!this.containsObject(product, result)) {
        //   result.push(product);
        //   console.log('cartul este ', result);
        //   return this.storage.set(CART_KEY, result);
        // } else {
        //   let index = result.findIndex(x => x.product_id == product.product_id);
        //   let prevQuantity = parseInt(result[index].count);
        //   product.count = (prevQuantity + product.count);
        //   let currentPrice = (parseFloat(product.totalPrice) * product.count);
        //   product.totalPrice =currentPrice;
        //   result.splice(index, 1);
        //   result.push(product);
        //   console.log('cartul este ', result);
        //   return this.storage.set(CART_KEY, result);
        // }

      } else {
        return this.storage.set(CART_KEY, [product]);
      }
    })
  }

  containsObject(obj, list): boolean {
    if (!list.length) {
      return false;
    }

    if (obj == null) {
      return false;
    }
    var i;
    for (i = 0; i < list.length; i++) {
      if ( JSON.stringify(list[i]) === JSON.stringify(obj) ) {
        return true;
      }
    }
    return false;
  }

  removeFromCart(i) {
    return (this.getCartItems().then(result => {
      if (result) {
        // var productIndex = result.indexOf(product);
        result.splice(i, 1);
        return this.storage.set(CART_KEY, result);
      }
    }))
  }

  removeAllCartItems() {
    return this.storage.remove(CART_KEY).then(res => {
      return res;
    });
  }

  incrementQtyCartProduct(i){
    return (this.getCartItems().then(result => {
      if (result) {
        // var productIndex = result.indexOf(product);
        result[i]['count']++;
        result[i]['pretMeniu'] = result[i]['count'] * result[i]['pretUnitarMeniu'];
        return this.storage.set(CART_KEY, result);
      }
    }))
  }

  decrementQtyCartProduct(i){
    return (this.getCartItems().then(result => {
      if (result) {
        if (result[i]['count'] > 1) {
          // var productIndex = result.indexOf(product);
          result[i]['count']--;
          result[i]['pretMeniu'] = result[i]['count'] * result[i]['pretUnitarMeniu'];
        }
        return this.storage.set(CART_KEY, result);
      }
    }))
  }

  getCartItems() {
    return this.storage.get(CART_KEY).then(val => {return val});
  }

  // getTotal():number{
  //   this.storage.get(CART_KEY).then(
  //
  //     data => {
  //
  //       let total = 0;
  //       for (let i = 0; i < data.length; i++) {
  //         total = total + (data[i].totalMeniu);
  //       }
  //       return total;}
  //     );
  //
  // }



  areProductsInShoppingCart(){
    this.getCartItems().then(result => {
      if (result) {
        return ( result.length > 0 ?   true : false ) ;
      }
      else {
        return false;
      }
    });
  }

  getProductsItemsInShoppingCart(){
    this.getCartItems().then(result => {
      return this.storage.set(CART_QTY, result);

    });

    return this.storage.get(CART_KEY).then(val => {return val.length});
  }

  // getCartTotal(): number{
  //   this.getCartItems().then( result => {
  //
  //     let total = 0;
  //     if (result){
  //       for (let i = 0; i < result.length; i++) {
  //                 total = total + (result[i]['pretMeniu']);
  //               }
  //       return total;
  //        }
  //
  //        else{
  //       return 0;
  //     }
  //
  //
  //   })
  // }
}
