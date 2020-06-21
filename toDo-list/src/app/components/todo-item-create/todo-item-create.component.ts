import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-todo-item-create',
  templateUrl: './todo-item-create.component.html',
  styleUrls: ['./todo-item-create.component.css']
})
export class TodoItemCreateComponent implements OnInit {
  constructor(private todoService: TodoService) { }
  @ Output() todoAddedEvent = new EventEmitter<{title: string, content: string}>();
  @ Output() cancelEvent = new EventEmitter<boolean>();
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.todoAddedEvent.emit({title:form.value.title, content:form.value.content});
    form.resetForm();
    
  }

  onCancel() {
    this.cancelEvent.emit(false);
  }
  
}
