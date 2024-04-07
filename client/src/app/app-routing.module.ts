import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { NotAuthGuard } from './not-auth.guard';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OwnerPostGuard } from './owner-post.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'users', component: AllUsersComponent },
  { path: 'post/edit/:id', component: EditPostComponent, canActivate: [OwnerPostGuard]},
  { path: 'profile/edit/:id', component: EditProfileComponent},
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
