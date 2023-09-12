import { Component,OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskobj:Task=new Task();
  taskArr:Task[]=[];

  

   constructor(private curdservice:CrudService){

   }
   
   addTaskvalue:string='';
   editTaskvalue:string='';

  ngOnInit():void{
    this.editTaskvalue='';
    this.addTaskvalue='';
   this.taskobj=new Task();
   this.taskArr=[];
   this.getAllTask();
  }
  getAllTask() {
    this.curdservice.getAllTask().subscribe(res=>{
     this.taskArr = res;
    },err=>{
      alert("Unable to get the list");
    })
  }

  addTask(){
    this.taskobj.task_name=this.addTaskvalue;
    this.curdservice.addTask(this.taskobj).subscribe(res=>{
     this.ngOnInit();
     this.addTaskvalue='';
    },err=>{
      alert("Not able to add");
    })
  }

  editTask(){
    this.taskobj.task_name=this.editTaskvalue
   this.curdservice.editTask(this.taskobj).subscribe(res=>{
     this.ngOnInit();
   },err=>{
    alert("Unable to edit the Task")
   })
  }

  deleteTask(etask:Task){
   this.curdservice.deleteTask(etask).subscribe(res=>{
this.ngOnInit();
   },err=>{
    alert("Not able to delete this Task")
   })
  }

  call(etask:Task){
    this.taskobj=etask;
    this.editTaskvalue=etask.task_name;
  }
}
