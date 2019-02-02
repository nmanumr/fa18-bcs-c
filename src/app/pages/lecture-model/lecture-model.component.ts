import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-lecture-model',
  templateUrl: './lecture-model.component.html',
  styleUrls: ['./lecture-model.component.scss']
})
export class LectureModelComponent implements OnInit {

  @Input() lecture: any;

  constructor(public navParams: NavParams) {}

  ngOnInit() {}

}
