import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty initial form values', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
    expect(component.errorMessage).toBe('');
  });

  it('should update username and password on input', () => {
    const usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;

    usernameInput.value = 'user';
    usernameInput.dispatchEvent(new Event('input'));
    
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.username).toBe('user');
    expect(component.password).toBe('password');
  });

  it('should navigate to todo page on successful login', () => {
    authService.login.and.returnValue(of(true));

    component.username = 'user';
    component.password = 'password';

    component.login();

    expect(authService.login).toHaveBeenCalledWith('user', 'password');
    expect(router.navigate).toHaveBeenCalledWith(['/todo']);
    expect(component.errorMessage).toBe('');
  });

  it('should show error message on failed login', () => {
    authService.login.and.returnValue(of(false));

    component.username = 'wronguser';
    component.password = 'wrongpass';

    component.login();

    expect(authService.login).toHaveBeenCalledWith('wronguser', 'wrongpass');
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Invalid username or password');
  });
});