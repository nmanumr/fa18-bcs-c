import { Component, OnInit, Input } from '@angular/core';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ToastController } from '@ionic/angular';
import { MatBottomSheet } from '@angular/material';
import { ResourceDetailSheetComponent } from 'src/app/components/resource-detail-sheet/resource-detail-sheet.component';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {

  @Input() subject;
  @Input() close;

  

  constructor(
    private downloader: Downloader,
    private file: File,
    private fileOpener: FileOpener,
    private toastController: ToastController,
    private bottomSheet: MatBottomSheet,
    public dataService: DataService 
  ) { }

  ngOnInit() { }

  isAvailable(res) {
    return this.file.checkFile(
      this.file.externalDataDirectory + "Class Resources/", `${res.id}.${res.type}`
    )
  }

  openFile(res) {
    this.isAvailable(res).then(() => {
      this.fileOpener.open(`${this.file.externalDataDirectory}Class Resources/${res.id}.${res.type}`,
        this.dataService.getMimeType(res.type)
      ).catch(err => alert("Error: " + err.message));
    }).catch(() => {
      this.downloadRes(res).then(data => {
        this.fileOpener.open(`${this.file.externalDataDirectory}Class Resources/${res.id}.${res.type}`,
          this.dataService.getMimeType(res.type)
        ).catch(err => alert("Error: " + err.message));
      }).catch(err => alert("Error: " + err.message));
    });
  }

  showInfo(res){
    this.dataService.selectedResource = res;
    this.bottomSheet.open(ResourceDetailSheetComponent);
  }

  downloadRes(res) {
    var request: DownloadRequest = {
      uri: res.download,
      title: res.name,
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Class Resources',
        subPath: `${res.id}.${res.type}`
      }
    };
    var downloader = this.downloader.download(request);
    this.toastController.create({
      message: 'Downloading...',
      duration: 2000
    }).then(
      toast=>toast.present()
    );
    return downloader;
  }

}
