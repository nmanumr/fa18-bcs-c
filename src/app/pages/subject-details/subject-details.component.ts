import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {

  @Input() subject;
  @Input() close;

  iconspath = "../../../assets/file-icons/";

  fileIcons = {
    'pptx': 'ppt',
    'ppt': 'ppt',
    'xls': 'xls',
    'xlsx': 'xls',
    'doc': 'doc',
    'docx': 'doc',
    'zip': 'zip',
    'rar': 'zip',
    'pdf': 'pdf',
  }

  constructor() { }

  ngOnInit() {

  }

  getIcon(type) {
    return this.iconspath + (this.fileIcons[type] ? this.fileIcons[type] : 'file') + '.svg';
  }

  downloadRes(res) {
  }

}
