import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SwatterComponent } from './swatter/swatter.component';
import { ScreenSizeMessageComponent } from './screen-size-message/screen-size-message.component';

@NgModule({
  declarations: [
    AppComponent,
    SwatterComponent,
    ScreenSizeMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
