import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public userName!: any;
  clock=""
  clockHandle:any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
     private authenticationService: AuthService,
     private router: Router) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
      this.userName = this.authenticationService.getUserNameValue;
    }


    ngOnInit(){
      this.clockHandle = setInterval(()=>{
        this.clock = new Date().toLocaleString();
      },1000);
    }


    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }


}
