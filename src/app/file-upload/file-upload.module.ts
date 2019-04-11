import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadFormComponent } from './file-upload-form/file-upload-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FileUploadFormComponent
  ],
  declarations: [FileUploadFormComponent]
})
export class FileUploadModule { }
