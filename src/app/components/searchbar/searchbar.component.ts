import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  constructor(
    private nativeStorage: NativeStorage,
    private statusBar: StatusBar,
  ) { }

  ngOnInit() {
  }

  toggleDark() {
    var theme = document.children[0].getAttribute('theme');
    var newTheme = theme == 'light' ? 'dark' : 'light';
    document.children[0].setAttribute('theme', newTheme);
    if(newTheme == "dark"){
      var color = "#202124";
      this.statusBar.styleBlackOpaque();
    }
    else{
      var color = "#F5F5F5";
      this.statusBar.styleDefault();
    }
    this.statusBar.backgroundColorByHexString(color);
    this.nativeStorage.setItem('theme', newTheme);
  }

}
