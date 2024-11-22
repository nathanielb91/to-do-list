import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let isLoggedInSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isLoggedInSubject = new BehaviorSubject<boolean>(false);

    authService = jasmine.createSpyObj('AuthService', ['logout'], {
      isLoggedIn: isLoggedInSubject
    });
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        AppComponent
      ],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isLoggedIn as false', () => {
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should update isLoggedIn when auth status changes', () => {
    expect(component.isLoggedIn).toBeFalse();

    isLoggedInSubject.next(true);
    fixture.detectChanges();
    expect(component.isLoggedIn).toBeTrue();

    isLoggedInSubject.next(false);
    fixture.detectChanges();
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should show the menu when logged in', () => {
    isLoggedInSubject.next(true);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('[data-testid="menuBtn"]'));
    expect(button).not.toBeNull();
  });

  it('should hide the menu when logged out', () => {
    isLoggedInSubject.next(false);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('[data-testid="menuBtn"]'));
    expect(button).toBeNull();
  });
});