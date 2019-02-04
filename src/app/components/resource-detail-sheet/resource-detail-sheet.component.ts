import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-resource-detail-sheet',
  templateUrl: './resource-detail-sheet.component.html',
  styleUrls: ['./resource-detail-sheet.component.scss']
})
export class ResourceDetailSheetComponent implements OnInit {

  res;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ResourceDetailSheetComponent>,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.res = this.dataService.selectedResource;
    
  }

}
