import { Pipe, PipeTransform } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform {

  transform(timestamp: string): Observable<string> {
    return interval(9000).pipe( 
      startWith(0), 
      map(() => this.calculateTimeAgo(timestamp))
    );
  }

  private calculateTimeAgo(timestamp: string): string {
    const date: Date = new Date(timestamp);
    const now: Date = new Date();
    const diff: number = now.getTime() - date.getTime();

    const seconds: number = Math.floor(diff / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    if (days > 7) {
      return date.toDateString();
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  }
}
