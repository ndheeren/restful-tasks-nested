import { Component, OnInit  } from '@angular/core';

import { HttpService } from './http.service';
import { debug } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  tasks = [];
  showingAllTasks = true;
  taskIsSelected = false;
  selectedTask;
  newTask: any;
  taskToEdit: any;
  editingTask = false;
  
  constructor(private _httpService: HttpService){} // Inject the service into the root component
  
  ngOnInit(){
    this.newTask = { title: "", description: "" }
    this.getTasksFromService();
  }

  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks!", data);

      for (var key in data)
      {
        this.tasks.push(data[key]);
      }

      // console.log('What follows is this.tasks');
      // console.log(this.tasks);
    });
  }

  showAllTasks(): void {
    // based on getTasksFromService method

    this.tasks = []; // resetting it first
    this.showingAllTasks = true;

    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks!", data);

      for (var key in data)
      {
        this.tasks.push(data[key]);
      }

      // console.log('What follows is this.tasks');
      // console.log(this.tasks);
    });

  }

  showThisTask(taskId)
  {
    this.taskIsSelected = true;
    
    let observable = this._httpService.getTaskByID(taskId);
    observable.subscribe(data => 
      {
        console.log(`Got the task with ID of ${taskId}`, data);
        this.selectedTask = data;
      });
  }

  submitTaskAddition() {
    // Code to send off the form data (this.newTask) to the Service
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      // console.log(`The subscription portion of submitTaskAddition() has run.`);
      // console.log(data);
      
      this.newTask = { title: "", description: "" } // Reset this.newTask to a new, clean object.
      this.showAllTasks();
    });

    // observable.subscribe(data => console.log(data));
  }

  initiatePreliminaryTaskEdit(task)
  {
    this.taskToEdit = task;
    this.editingTask = true;
  }

  submitTaskEdit(id) {
    // Code to send off the form data (this.newTask) to the Service

    // var taskToEditFound = false;
    // for(var i = 0; i < this.tasks.length; i++)
    // {
    //   if (this.tasks[i]._id == id)
    //   {
    //     this.taskToEdit = this.tasks[i];
    //     taskToEditFound = true;
    //   }
    // }
    // if (!taskToEditFound)
    // {
    //   console.log('ERROR! NO TASK TO EDIT FOUND!');
    //   return;
    // }

    let observable = this._httpService.editTask(this.taskToEdit);
    observable.subscribe(data => {
      // console.log(`The subscription portion of the submitTaskEdit method has run.`);
      // console.log(data);
      
      this.taskToEdit = { title: "", description: "" }
      this.editingTask = false;

      this.showAllTasks();
    });

    // observable.subscribe(data => console.log(data));
  }

  submitTaskDeletion(task)
  {
    let observable = this._httpService.deleteTask(task._id);
    observable.subscribe(data => {
      console.log(`The subscription portion of the submitTaskDeletion method has run.`);
      console.log(data);

      this.showAllTasks();
    });
  }
}
