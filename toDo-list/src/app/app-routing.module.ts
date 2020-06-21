import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { SignInComponent } from "./components/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { AuthGuard } from "./components/auth/auth.guard";

const routes: Routes = [
  { path: "", component: SignUpComponent },
  { path: "login", component: SignInComponent },
  { path: "signup", component: SignUpComponent },
  { path: "todo", component: TodoListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
