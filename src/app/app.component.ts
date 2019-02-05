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
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.nativeStorage.getItem('theme').then(
        theme => {
          document.children[0].setAttribute('theme', theme);
          var color = (theme == "light" ? "#F5F5F5" : "#202124");
          (color == "dark") && this.statusBar.styleBlackOpaque();
          this.statusBar.backgroundColorByHexString(color);
          this.splashScreen.hide();
        },
        () => {
          this.nativeStorage.setItem('theme', "light");
          this.statusBar.backgroundColorByHexString("#F5F5F5");
          this.splashScreen.hide();
        }
      );
    });
  }
}
