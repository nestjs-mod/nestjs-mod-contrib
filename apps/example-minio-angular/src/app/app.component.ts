import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { FilesClientService, PresignedUrls } from './files-client.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [FilesClientService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  fileName$ = new Subject<string>();
  file?: File;
  presignedUrls?: PresignedUrls;
  outPresignedUrls$ = new Subject<PresignedUrls>();

  constructor(private readonly filesClientService: FilesClientService) {}

  onFileSelected(event) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName$.next(this.file.name);
      this.filesClientService
        .getImagesPresignedUrl(this.file)
        .pipe(tap((presignedUrls) => (this.presignedUrls = presignedUrls)))
        .subscribe();
    }
  }

  onFileUpload() {
    if (this.file && this.presignedUrls) {
      this.filesClientService
        .uploadFile({ file: this.file, presignedUrls: this.presignedUrls })
        .pipe(
          tap((presignedUrls) => this.outPresignedUrls$.next(presignedUrls))
        )
        .subscribe();
    }
  }
}
