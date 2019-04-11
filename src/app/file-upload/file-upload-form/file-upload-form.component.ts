import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RequestOptions,
  Request,
  RequestMethod,
  Headers,
  RequestOptionsArgs,
  ResponseContentType
} from '@angular/http';
import { Http, Response } from '@angular/http';
import { UploadResponse } from 'src/app/file-upload/file-upload-form/upload-response';
import { map } from 'rxjs/operators';

@Component({
  selector: 'file-upload-form',
  templateUrl: './file-upload-form.component.html',
  styleUrls: ['./file-upload-form.component.css']
})
export class FileUploadFormComponent implements OnInit {
  fileName: string;
  formData: FormData = new FormData();
  textExtractData: UploadResponse[] ;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  attachFile(event) {
    this.formData = new FormData();
    this.fileName = '';
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const file: File = fileList[i];
        this.formData.append('file', file, file.name);
        if (this.fileName === '') {
          this.fileName = file.name;
        } else {
          this.fileName = this.fileName + ', ' + file.name;
        }
      }
    }
  }

  uploadFile() {
      this.uploadAttachments(this.formData)
      .subscribe(
        data => {
          if (data['success'] === 'true') {
            console.log('success') ;
            this.processAttachment(data).subscribe(extractData => this.textExtractData = extractData) ;
          } else {
               // Error
          }
        },
        error => {
          console.log(error) ;
        }
      );
  }


  uploadAttachments(formData): Observable<any> {
    const url = 'http://uslt20050:8090/HackathonWeb/awsclient ';
    const headers = new Headers();
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.http.post(url, formData, options).pipe(map(response => {
      if (response.status === 204) {
        console.log('Response is undefined.') ;
        return undefined;
      } else {
        console.log(response.json()) ;
        return response.json();
      }
    }
    ));
  }

  processAttachment(data): Observable<UploadResponse[]> {
    const url = 'http://textractservice-dev.us-east-1.elasticbeanstalk.com/api/textract/extract-s3data';
    const headers = new Headers();
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.http.post(url, data, options).pipe(map(response => {
      if (response.status === 204) {
        console.log('Response is undefined.') ;
        return undefined;
      } else {
        console.log('Response is.' + response.json()) ;
        return response.json();
      }
    }
    ));
  }

  hasData(): boolean {
    if (this.textExtractData) { return true; }
    return false ;
  }
}
