import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit , Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormsModule } from '@angular/forms';
import { Task } from '../../../backend/models/tasks';
import { TodoDataService } from './todo.service';         ///!! api call from this service
import { AuthService } from '../account/auth.service'
import {MatDialog} from '@angular/material/dialog';
// import { DialogComponent } from '../dialog/dialog.component';
import { AddEditComponent } from './add-edit/add-edit.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  // todoForm: FormGroup;
  taskId: string = '';
  // currentTask: Task = { id: '-1', name: '', statusCode: 0 };
  // newTasks: Task[] = [];
  // inProgressTasks: Task[] = [];
  // doneTasks: Task[] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;
  taskList: any;
  newTaskTxtBox=false;
  addBucketForm: FormGroup;

  constructor(private fb: FormBuilder, public todoDataService: TodoDataService, private authService: AuthService, public dialog: MatDialog) {
    console.log("Constructor called");

    // this.todoForm = this.fb.group({   //configuring the form fb formbuilder for validations 
    //   txtBoxName: ['', Validators.required],   // '' -- blank value on page load 
    //   // txtBoxDesc: ['', Validators.required, , Validators.minLength(3)]   // '' -- blank value on page load 
    // })

    this.addBucketForm = this.fb.group({   //configuring the form fb formbuilder for validations 
      bucketName: ['', Validators.required]   // '' -- blank value on page load 
    })


    this.fetchTodoList();
    const authToken = this.authService.getToken();
    // if(authToken == undefined){
      
    // }
  }

  ngOnInit(): void { }


  openAddEditDialog(bucketId:string, taskId:string, taskName:string) {
    console.log("open add edit diaglog BID::",bucketId);
    this.dialog.open(AddEditComponent, {
      data: {
        bucketId: bucketId,
        // edit:false
        taskId:taskId ? taskId:null,
        taskName:taskName ? taskName: null
      }
    })
    .afterClosed()
    .subscribe(newTodoData => this.saveTask(newTodoData) );
  };


  fetchTodoList() {     ///!!api call
    this.todoDataService.getTasks()
      .subscribe((data: any) => {
        this.taskList=data.taskList;
        console.log("Response data::", data);
      });
  }


  showAdd( bucketId){
    console.log("showing::","newTaskForm"+bucketId);
    // this.newTaskTxtBox = true;
    // document.getElementById("newTaskForm"+bucketId).hidden=false;
    document.getElementById("newTaskForm"+bucketId).style.display="block";
  }

  hideAdd( bucketId){
    console.log("hiding::","newTaskForm"+bucketId);
    // this.newTaskTxtBox = false;
    // document.getElementById("newTaskForm"+bucketId).hidden=true;
    document.getElementById("newTaskForm"+bucketId).style.display="none";
    // document.getElementById("newTaskTxtBox"+id).style.display="none";


  }

  onEdit(i: number, task: Task) {
    console.log("in editTask::");  //+"name::"+todoForm.value.txtBoxName);
    // this.todoForm.controls['txtBoxName'].setValue(task.name);
    // this.todoForm.controls['txtBoxDesc'].setValue(task.description);
    // this.updateIndex = i;
    this.isEditEnabled = true;
    this.taskId = task.id;

  }


  saveTask(todoForm:any) {
    console.log("in saveTask::", todoForm); 
    this.todoDataService.saveTask({ bucketId:todoForm.bucketId, taskId: todoForm.taskId || '-1', name: todoForm.taskName})
    .subscribe(
      (res: any) => {
        console.log("Task saved::" + res.data + res.data.name);
        if (res.message == "Success") {
          // this.isEditEnabled = false;
          // this.todoForm.reset();
          this.fetchTodoList();
        }
      });
  }


  addBucket(){
    if(this.addBucketForm.invalid) return;
    this.todoDataService.addBucket({ bucketName:this.addBucketForm.value.bucketName}).subscribe(

      (res: any) => {
        console.log("Bucket saved::" + res);
        this.fetchTodoList();
        this.addBucketForm.reset();
      })
  }

  deleteBucket(bucketId){
    this.todoDataService.deleteBucket({bucketId:bucketId}).subscribe(
      (res:any)=>{
        console.log("Bucket deleted");
        this.fetchTodoList();

      }
    )

  }


  deleteTask( task: Task) {
    console.log("in deleteTask::", { taskId: task.id});
    this.todoDataService.deleteTask(task.id).subscribe(
      (res: any) => {
        this.fetchTodoList();
        if (res.message === "Success") {
          console.log("Data deleted Successfully...");
        }
      }
    );
  }

  // swap(src: string, srcIdx: number, dst: string, dstIdx: number) {
  //   var statusCode!: number;
  //   var srcOrderArray: string[]=[];
  //   var dstOrderArray: string[]=[];

  //   if (src == "cdk-drop-list-0") {
  //     this.taskId = this.newTasks[srcIdx].id;
  //     this.newTasks.forEach(task => {
  //       srcOrderArray.push(task.name);
  //       // console.log(srcOrderArray);
  //     });
  //   }
  //   else if (src == "cdk-drop-list-1") {
  //     this.taskId = this.inProgressTasks[srcIdx].id;
  //     this.inProgressTasks.forEach(task => {
  //       srcOrderArray.push(task.name);
  //       // console.log(srcOrderArray);
  //     });
  //   }
  //   else if (src == "cdk-drop-list-2") {
  //     this.taskId = this.doneTasks[srcIdx].id;
  //     this.doneTasks.forEach(task => {
  //       srcOrderArray.push(task.name);
  //       // console.log(srcOrderArray);
  //     });
  //   }

  //   if (dst == "cdk-drop-list-0") {
  //     statusCode = 0;
  //     this.newTasks.forEach(task => {
  //       dstOrderArray.push(task.name);
  //       // console.log(dstOrderArray);
  //     });
  //   }
  //   else if (dst == "cdk-drop-list-1") {
  //     statusCode = 1;
  //     this.inProgressTasks.forEach(task => {
  //       dstOrderArray.push(task.name);
  //       // console.log(dstOrderArray);
  //     });
  //   }
  //   else if (dst == "cdk-drop-list-2") {
  //     statusCode = 2;
  //     this.doneTasks.forEach(task => {
  //       dstOrderArray.push(task.name);
  //       // console.log(dstOrderArray);
  //     });
  //   }
    
  //   // console.log("src id array::",srcOrderArray);
  //   // console.log("src id array::",srcOrderArray);
  //   console.log("step 2:: taskId-", this.taskId+" statusCode::"+statusCode);

  //   this.todoDataService.swapTask({ taskId: this.taskId, statusCode: statusCode, srcOrderArray:srcOrderArray.splice(srcIdx,1), dstOrderArray:dstOrderArray.splice(dstIdx,0,this.taskId) }).subscribe(
  //     (res: any) => {
  //       console.log("Step 3 Task saved - res data::" + res.message);
  //       if (res.message == "Success") {
  //         console.log("step 5 - fetching");
  //         this.fetchTodoList();
  //         console.log("step 7 - fetched");

  //       }
  //       else {
  //         console.log("step 4");
  //       }

  //     }
  //   );
  // }
  // drop(event: CdkDragDrop<Task[]>, localList: any) {
  //   console.log("drag--", localList);
  //   console.log(" original list::" + this.inProgressTasks);
  //   var task: Task;
  //   var src = event.previousContainer.id; //source list id
  //   var srcIdx = event.previousIndex; //source index
  //   var dst = event.container.id; //destination list id
  //   var dstIdx = event.currentIndex;  //destination index

  //   // this.swap(src, srcIdx, dst, dstIdx);
  //   // this.todoDataService.saveTask({ id: this.currentTask.id}).subscribe(
  //   // this.todoDataService.saveTask({ id: this.currentTask.id , name: this.todoForm.value.txtBoxName, description: this.todoForm.value.txtBoxDesc, statusCode: this.currentTask.statusCode}).subscribe(


  //   if (event.previousContainer === event.container) {
  //     console.log("in if - step 1");
  //     this.swap(src, srcIdx, dst, dstIdx);
  //     console.log("step 8");
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //     console.log("step 9");

  //   } else {
  //     console.log("in else - step 1");
  //     this.swap(src, srcIdx, dst, dstIdx);
  //     console.log("step 8");

  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //     console.log("step 9");

  //   }
  // }

}
