import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OwnerProfileGuard implements CanActivate, OnInit, OnDestroy {
    reqId: string | null = null;
    private routeIdSubscription: Subscription | undefined;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.getRouteId();
    }
    ngOnDestroy(): void {
        this.routeIdSubscription?.unsubscribe();
    }
    
    canActivate() {
        const currentUserId = localStorage.getItem('_id');
        if (!currentUserId || !this.reqId || currentUserId != this.reqId) {
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
}
