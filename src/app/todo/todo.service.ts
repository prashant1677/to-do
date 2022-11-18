import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';    ///!! api call using HttpClient
import { Task } from '../../../backend/models/tasks';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/todo";


@Injectable({
    providedIn: 'root'
})
export class TodoDataService {

    constructor(private http: HttpClient) { }

    // url = 'http://localhost:3000';
    // url = ' http://todo-env-1.eba-zi4dtm8j.ap-south-1.elasticbeanstalk.com';

    getTasks():Observable<Task> {
      const userId = localStorage['userId'];
        // console.log("Todo service localstorage ::",localStorage['userId']);
        console.log("Todo service  userId::",userId);
        return this.http.get<Task>(BACKEND_URL+'/fetchTasks'+'?userId='+userId);
      }
    
    saveTask(t:any):Observable<Task>{
      const userId = localStorage['userId'];
      console.log("in saveTask service",t);
        return this.http.post<Task>(BACKEND_URL+'/saveTask'+'?userId='+userId,t)
    }

    addBucket(b:any):Observable<Task>{
      const userId = localStorage['userId'];
      console.log("in addBucket service",b);
        return this.http.post<any>(BACKEND_URL+'/addBucket'+'?userId='+userId,b)
    }

    deleteBucket(b:any):Observable<Task>{
      const userId = localStorage['userId'];
      console.log("in delete Bucket service",b);
        return this.http.post<any>(BACKEND_URL+'/deleteBucket'+'?userId='+userId,b)
    }

    deleteTask(taskId:string):Observable<Task>{
      const userId = localStorage['userId'];
      console.log("in deleteTask service",taskId);
        return this.http.post<Task>(BACKEND_URL+'/deleteTask'+'?userId='+userId,{taskId:taskId})
    }

    swapTask(t:any):Observable<Task>{
      const userId = localStorage['userId'];
      console.log("in swapTask service::",t.taskId +"--"+t.statusCode+" src="+t.srcOrderArray+" dst="+t.dstOrderArray);
        return this.http.post<Task>(BACKEND_URL+'/swapTask'+'?userId='+userId,t)
    }


}


// import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";
// import { Router } from "@angular/router";

// import { Task } from "../../../backend/models/tasks";

// @Injectable({ providedIn: "root" })
// export class PostsService {
//   private posts: Task[] = [];
//   private postsUpdated = new Subject<Task[]>();

//   constructor(private http: HttpClient, private router: Router) {}

// //   getPosts() {
// //     this.http
// //       .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
// //       .pipe(
// //         map(postData => {
// //           return postData.posts.map(post => {
// //             return {
// //               title: post.title,
// //               content: post.content,
// //               id: post._id
// //             };
// //           });
// //         })
// //       )
// //       .subscribe(transformedPosts => {
// //         this.posts = transformedPosts;
// //         this.postsUpdated.next([...this.posts]);
// //       });
// //   }

// //   getPostUpdateListener() {
// //     return this.postsUpdated.asObservable();
// //   }

// //   getPost(id: string) {
// //     return this.http.get<{ _id: string; title: string; content: string }>(
// //       "http://localhost:3000/api/posts/" + id
// //     );
// //   }

// //   addPost(title: string, content: string) {
// //     const post: Post = { id: null, title: title, content: content };
// //     this.http
// //       .post<{ message: string; postId: string }>(
// //         "http://localhost:3000/api/posts",
// //         post
// //       )
// //       .subscribe(responseData => {
// //         const id = responseData.postId;
// //         post.id = id;
// //         this.posts.push(post);
// //         this.postsUpdated.next([...this.posts]);
// //         this.router.navigate(["/"]);
// //       });
// //   }

// //   updatePost(id: string, title: string, content: string) {
// //     const post: Post = { id: id, title: title, content: content };
// //     this.http
// //       .put("http://localhost:3000/api/posts/" + id, post)
// //       .subscribe(response => {
// //         const updatedPosts = [...this.posts];
// //         const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
// //         updatedPosts[oldPostIndex] = post;
// //         this.posts = updatedPosts;
// //         this.postsUpdated.next([...this.posts]);
// //         this.router.navigate(["/"]);
// //       });
// //   }

// //   deletePost(postId: string) {
// //     this.http
// //       .delete("http://localhost:3000/api/posts/" + postId)
// //       .subscribe(() => {
// //         const updatedPosts = this.posts.filter(post => post.id !== postId);
// //         this.posts = updatedPosts;
// //         this.postsUpdated.next([...this.posts]);
// //       });
// //   }
// }
