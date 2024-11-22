import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { first } from 'rxjs/operators';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with user not authenticated', (done) => {
    service.isLoggedIn.pipe(first()).subscribe(isAuthenticated => {
      expect(isAuthenticated).toBeFalse();
      done();
    });
  });

  describe('login', () => {
    it('should authenticate with correct credentials', (done) => {
      service.login('user', 'password').subscribe(success => {
        expect(success).toBeTrue();
        
        service.isLoggedIn.pipe(first()).subscribe(isAuthenticated => {
          expect(isAuthenticated).toBeTrue();
          done();
        });
      });
    });

    it('should reject incorrect username', (done) => {
      service.login('wronguser', 'password').subscribe(success => {
        expect(success).toBeFalse();
        
        service.isLoggedIn.pipe(first()).subscribe(isAuthenticated => {
          expect(isAuthenticated).toBeFalse();
          done();
        });
      });
    });

    it('should reject incorrect password', (done) => {
      service.login('user', 'wrongpassword').subscribe(success => {
        expect(success).toBeFalse();
        
        service.isLoggedIn.pipe(first()).subscribe(isAuthenticated => {
          expect(isAuthenticated).toBeFalse();
          done();
        });
      });
    });
  });

  describe('logout', () => {
    it('should set authenticated state to false', (done) => {
      service.login('user', 'password').subscribe(() => {

        service.logout();
        
        service.isLoggedIn.pipe(first()).subscribe(isAuthenticated => {
          expect(isAuthenticated).toBeFalse();
          done();
        });
      });
    });
  });
});