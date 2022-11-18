import {Component, Inject, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent {
  bucketId:string;
  taskId:string;
  taskName:string;

  formGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {bucketId:string, taskId:string, taskName:string},
    private dialogRef: MatDialogRef<AddEditComponent>,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    console.log("Data got on init::",this.data);
    this.taskName = this.data.taskName ? this.data.taskName : null;
    this.bucketId = this.data.bucketId;
    this.taskId = this.data.taskId? this.data.taskId : null;

    this.formGroup = this.formBuilder.group({ 
      taskName: [this.taskName  ? this.taskName : '', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.formGroup.value, this.bucketId);
    // this.formGroup.value.bucketId=this.bucketId
    let form={bucketId: this.bucketId, taskId: this.taskId, taskName:this.formGroup.value.taskName};
    console.log("on submit form::",form);
    this.dialogRef.close(form);
  }

}
