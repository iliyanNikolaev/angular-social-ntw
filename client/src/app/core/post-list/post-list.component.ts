import { Component, Input } from '@angular/core';
import { Post } from 'src/app/types/Post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
})
export class PostListComponent {
  @Input() posts: Post[] = []
}
