import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LicenseComponent } from '../license/license.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }


  async openLicense() {
    function close() { modal.dismiss(); }
    const modal = await this.modalController.create({
      component: LicenseComponent,
      componentProps: { close: close }
    });
    return await modal.present();
  }


}
