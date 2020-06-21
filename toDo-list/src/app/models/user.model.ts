import { Todo } from './todo.model'
export interface User {
    handle: string;
    email: string;
    password: string;
    todos: Todo[];
}