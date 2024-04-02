import { Component, Input } from '@angular/core';
import { Post } from 'src/app/types/Post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {
  @Input() post: Post = {} as Post;
}
