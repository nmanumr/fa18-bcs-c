import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  platforms;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platforms = this.platform.platforms();
    console.log(this.platforms);
    this.platform.ready().then(() => {
      this.nativeStorage.getItem('theme').then(
        theme => {
          if(theme == "dark"){
            var color = "#202124";
            this.statusBar.styleBlackOpaque();
            document.children[0].setAttribute('theme', "dark");
          }
          else{
            var color = "#F5F5F5";
            this.statusBar.styleDefault();
            document.children[0].setAttribute('theme', "light");
          }
          this.statusBar.backgroundColorByHexString(color);
          this.splashScreen.hide();
        },
        () => {
          this.nativeStorage.setItem('theme', "light");
          document.children[0].setAttribute('theme', "light");
          this.statusBar.styleDefault();
          this.statusBar.backgroundColorByHexString("#F5F5F5");
          this.splashScreen.hide();
        }
      );
    });
  }
}
