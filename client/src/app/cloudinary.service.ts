import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dwq3ysahj/image/upload';
  private cloudinaryUploadPreset = 'wunldj1y';

  constructor(private http: HttpClient) { }

  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', this.cloudinaryUploadPreset);

    return this.http.post<any>(this.cloudinaryUploadUrl, formData).pipe(
      map(response => response.url)
    );
  }
}
