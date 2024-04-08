import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from './post.service';
import { Post } from './types/Post';

@Injectable({
    providedIn: 'root'
})
export class OwnerPostGuard implements CanActivate, OnInit, OnDestroy {
    reqId: string | null = null;
    post: Post | null = null;
    private routeIdSubscription: Subscription | undefined;
    private getPostSubscription: Subscription | undefined;

    constructor(private router: Router, private route: ActivatedRoute, private sPost: PostService) { }

    async ngOnInit(): Promise<void> {
        this.getRouteId();
        this.getPost();
    }
    ngOnDestroy(): void {
        this.routeIdSubscription?.unsubscribe();
        this.getPostSubscription?.unsubscribe();
    }
    
    async canActivate() {
        const currentUserId = localStorage.getItem('_id');
        if (!currentUserId || !this.reqId || !this.post) {
            this.router.navigate(['/home']);
            return false;
        }
        if(currentUserId !== this.post.owner._id){
            console.log('not owner')
            this.router.navigate(['/home']);
            return false;
        }
        return true;
    }
    getRouteId() {
        this.routeIdSubscription = this.route.params.subscribe(params => {
            this.reqId = params['id'];
        });
    }
    getPost() {
        if(this.reqId){
            this.getPostSubscription = this.sPost.getPostDetails(this.reqId).subscribe({
               next: (post) => {
                this.post = post;
               },
               error: (err) => {
                alert(err.error.errors.join('\n'));
                console.error(err);
               } 
            });
        }
    }
}
