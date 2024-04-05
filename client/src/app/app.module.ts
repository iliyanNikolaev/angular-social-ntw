import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { authInterceptorProvider } from './auth.interceptor';
import { ScrollDirective } from './scroll.directive';
import { FormsModule } from '@angular/forms';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AllUsersComponent,
    LoginComponent,
    RegisterComponent,
    PostDetailsComponent,
    ScrollDirective,
    EditPostComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    authInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
