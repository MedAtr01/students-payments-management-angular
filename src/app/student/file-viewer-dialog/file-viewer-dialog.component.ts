import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-file-viewer-dialog',
  templateUrl: './file-viewer-dialog.component.html',
  styleUrls: ['./file-viewer-dialog.component.css']
})
export class FileViewerDialogComponent {
  safeFileUrl: SafeResourceUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    fileUrl: string,
    fileType: string
  }, private sanitizer: DomSanitizer) {
    this.safeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.fileUrl);
  }
}
