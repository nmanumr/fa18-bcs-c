import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  constructor(
    private nativeStorage: NativeStorage
  ) { }

  ngOnInit() {
  }

  toggleDark() {
    var theme = document.children[0].getAttribute('theme');
    var newTheme = theme == 'light' ? 'dark' : 'light';
    document.children[0].setAttribute('theme', newTheme);
    localStorage['theme'] = newTheme;
    this.nativeStorage.setItem('theme', newTheme);
  }

}
