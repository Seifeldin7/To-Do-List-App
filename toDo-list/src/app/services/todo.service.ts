import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosUpdated = new Subject<Todo[]>();

  constructor(private http:HttpClient) { }

  getTodoUpdateListener() {
    return this.todosUpdated.asObservable();
  }

  addTodotoUser(title: string, content: string, userId: string) {
    const todo: Todo = { id: null, title: title, content: content, checked: false };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/todos/" + userId, todo)
      .subscribe(responseData => {
        this.todos.push(todo);
        this.todosUpdated.next([...this.todos]);
      });
  }
  
  getUserTodos(userId: string) {
    return this.http
    .get<any>(
      "http://localhost:3000/api/todos/" + userId
    )
    .pipe(
      map(res => {
        return {
          todos: res.map(todo => {
            return {
              title: todo.title,
              content: todo.content,
              id: todo._id,
              checked:todo.checked
            };
          }),
        };
      })
    )
    .subscribe(res => {
      this.todos = res.todos;
      this.todosUpdated.next([...this.todos]);
    });
  }

  checkTodo(checked: boolean, todoId:string, userId: string) {
    const update = {todoId: todoId, checked: checked};
    console.log(update.checked);
    this.http
      .put<{ message: string }>("http://localhost:3000/api/todos/"+userId+"/" + todoId, update)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
  
}
