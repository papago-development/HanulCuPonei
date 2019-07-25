import {NgModule} from '@angular/core';
import {HomePage} from "./home";
import {IonicPageModule} from "ionic-angular";
// import {IonicImageLoader} from "ionic-image-loader";


@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage)]
})


export class HomeModule {

}
