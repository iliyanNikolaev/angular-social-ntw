import { Component, Input } from '@angular/core';
import { PopulatedComment } from 'src/app/types/PopulatedComment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
 @Input() comments: PopulatedComment[] = [];
}
