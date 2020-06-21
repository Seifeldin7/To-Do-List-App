import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input()
  todo: Todo;
  @ Output() checkEvent = new EventEmitter<{todoId: string, checked: boolean}>();
  checked: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.checked = !this.checked;
    console.log(this.checked);
    this.checkEvent.emit({todoId: this.todo.id, checked: this.checked});
  }
}
