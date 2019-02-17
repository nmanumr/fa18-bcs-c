import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  platforms;
  updateAvailable = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private swUpdate: SwUpdate,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  async showUpdate() {
    const alert = await this.alertController.create({
      header: 'Update Available',
      message: 'A new update is available. Do you want to update?',
      buttons: [{
        text: 'Not now',
        role: 'cancel',
      }, {
        text: 'Update',
        handler: () => location.reload()
      }]
    });

    alert.present();
  }

  initializeApp() {

    // get current plateform
    this.platforms = this.platform.platforms();

    // when plateform is ready
    this.platform.ready().then(() => {
      this.showUpdate();

      // check for service worker updates
      this.swUpdate.available.subscribe(event => {
        this.showUpdate();
      });
      this.swUpdate.checkForUpdate();

      // set last user theme
      this.nativeStorage.getItem('theme').then(
        theme => {
          if (theme == "dark") {
            var color = "#202124";
            this.statusBar.styleBlackOpaque();
            document.children[0].setAttribute('theme', "dark");
          }
          else {
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
