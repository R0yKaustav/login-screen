import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { CGIAlertComponent } from './cgi-alert/cgi-alert.component';
import { CGIAlertDirective } from './cgi-alert/cgi-alert.directive';
/**
 * Alert Container component.
 *
 * TODO: How to use component and examples.
 */
@Component({
  selector: 'cgi-alert-container',
  templateUrl: './cgi-alert-container.component.html',
})
export class CGIAlertContainerComponent implements OnChanges {
  /** Array to store alerts inputted from parent */
  @Input()
  alerts = [];

  /** Event Emitter to invoke parent when an action is preformed */
  @Output()
  action = new EventEmitter<any>();

  /** Reference to Alert Directive */
  @ViewChild(CGIAlertDirective, { static: true })
  cgiAlertHost: CGIAlertDirective;

  /**
   * Constructor for Alert Container Directive
   * @param componentFactoryResolver Factory Resolver for dynamic components
   */
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  /**
   * Life cycle hook for when the component is first initiated and when there are changes to the component's input.
   */
  ngOnChanges() {
    this.cgiAlertHost.viewContainerRef.clear();
    this.getAlerts();
  }

  /** Load an alert into the container */
  loadAlert(alert) {
    const alertItem = alert;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      alertItem.component,
    );

    const viewContainerRef = this.cgiAlertHost.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as CGIAlertComponent).data = alertItem.data;
    (componentRef.instance as CGIAlertComponent).action.subscribe((e) => {
      this.removeAlert(alertItem);
    });
  }

  /** Remove an alert in the container */
  removeAlert(alertItem) {
    const alertIndex = this.alerts.indexOf(alertItem);

    if (alertIndex !== -1) {
      this.cgiAlertHost.viewContainerRef.remove(alertIndex);
      this.alerts.splice(alertIndex, 1);
      this.action.emit(alertItem);
    }
  }

  /** Get alerts being passed in from parent */
  getAlerts() {
    for (const alert of this.alerts) {
      this.loadAlert(alert);
    }
  }
}


describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'login-screen'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('login-screen');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('login-screen app is running!');
  });
});
