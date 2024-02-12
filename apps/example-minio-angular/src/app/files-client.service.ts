import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class PresignedUrls {
  uploadUrl!: string;
  downloadUrl!: string;
}

@Injectable()
export class FilesClientService {
  filesApiUrl = 'http://localhost:3006';

  constructor(private readonly httpClient: HttpClient) {}

  getImagesPresignedUrl(file: File) {
    return this.httpClient.get<PresignedUrls>(`${this.filesApiUrl}/api/images-presigned-url`, {
      params: { ext: this.getFileExt(file) },
    });
  }

  getFileExt(file: File) {
    return (file?.type?.split('/')[1]?.charAt(0).toUpperCase() + file?.type?.split('/')[1]?.slice(1)).toLowerCase();
  }

  uploadFile({ file, presignedUrls }: { file: File; presignedUrls: PresignedUrls }) {
    return new Observable<PresignedUrls>((observer) => {
      if (presignedUrls.uploadUrl) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', presignedUrls.uploadUrl);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              observer.next(presignedUrls);
              observer.complete();
            } else {
              observer.error(new Error('Error in upload file'));
            }
          }
        };
        xhr.send(file);
      } else {
        observer.next(presignedUrls);
        observer.complete();
      }
    });
  }
}
