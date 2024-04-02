import { Component, Input } from '@angular/core';
import { PopulatedUser } from 'src/app/types/PopulatedUser';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent {
  @Input() likes: PopulatedUser[] = [];
}
