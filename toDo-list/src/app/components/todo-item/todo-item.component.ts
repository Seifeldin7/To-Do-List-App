import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo.model';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input()
  todo: Todo;
  @ Output() checkEvent = new EventEmitter<{todoId: string, checked: boolean}>();
  isChecked: boolean;
  checked:boolean;
  constructor() { }

  ngOnInit() {
    this.isChecked = this.todo.checked;
  }

  onChange() {
    this.checkEvent.emit({todoId: this.todo.id, checked: this.isChecked});
  }
}
