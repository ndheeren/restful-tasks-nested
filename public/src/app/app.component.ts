import { Component, OnInit  } from '@angular/core';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  tasks = [];
  showingAllTasks = false;
  taskIsSelected = false;
  selectedTask;
  
  constructor(private _httpService: HttpService){} // Inject the service into the root component
  
  ngOnInit(){
    // this.getTasksFromService();
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
}
