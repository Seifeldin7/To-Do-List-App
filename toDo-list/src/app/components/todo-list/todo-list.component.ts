import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  private todos: Todo[] = [];
  private todoupdateSub: Subscription;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  userId: string;
  isLoading = false;
  @Input()
  addBtnPressed: Boolean = false;
  constructor(private todoService: TodoService, 
    private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    console.log(this.userId)
    this.todoService.getUserTodos(this.userId);
    this.todoupdateSub= this.todoService.getTodoUpdateListener().subscribe((todos) => {
      this.isLoading = false;
      this.todos = todos;
      console.log(this.todos)
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

    
  }
  onChildAdd($event) {
    console.log($event.title, $event.content, this.userId)
    this.todoService.addTodotoUser($event.title, $event.content, this.userId);
    this.addBtnPressed = false;
  }
  ngOnDestroy() {
    this.todoupdateSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  onParentAdd() {
    this.addBtnPressed = true;
  }
  onCancel($event) {
    this.addBtnPressed = $event;
  }
  onCheck($event) {
    console.log($event.todoId)
    this.todoService.checkTodo($event.checked, $event.todoId, this.userId);
  }
  onClickLogOut() {
    this.authService.logout();
  }
}
