import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  faBoxes,
  faTruckRampBox,
  faTruckPlane,
  faAnchor,
  faEarthAmericas,
  faPeopleGroup,
  faTableList,
  faUsersGear,
  faTruckFast,
  faCartFlatbed,
  faCubes,
  faShop,
  faRoute,
  faFileCircleExclamation
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public userName!: any;
  clock = '';
  clockHandle: any;
  url: string = '';

  faPackageTypes = faBoxes;
  faShipments = faTruckRampBox;
  faLogisticOper = faTruckPlane;
  faEmbarcations = faAnchor;
  faCountries = faEarthAmericas;
  facustomers = faPeopleGroup;
  faList = faTableList;
  fausers = faUsersGear;
  faTruck = faTruckFast;
  faServicesTypes = faCartFlatbed;
  faCubes = faCubes;
  faShop = faShop;
  faRoute = faRoute
  faOrderStat = faFileCircleExclamation;

  @Output() isActiveChange!: EventEmitter<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authenticationService: AuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.userName = this.authenticationService.getUserNameValue;
  }

  ngOnInit() {
    this.clockHandle = setInterval(() => {
      this.clock = new Date().toLocaleString();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  expand(event: boolean) {
    if (event) {
      this.url = this.router.url;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
