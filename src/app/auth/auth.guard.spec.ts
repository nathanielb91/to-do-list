import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { authGuard } from './auth.guard';
import { BehaviorSubject } from 'rxjs';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let authStateSubject: BehaviorSubject<boolean>;

  beforeEach(() => {
    authStateSubject = new BehaviorSubject<boolean>(false);

    authService = jasmine.createSpyObj('AuthService', [], {
      isLoggedIn: authStateSubject.asObservable()
    });
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('should allow access when user is authenticated', (done) => {
    authStateSubject.next(true);

    TestBed.runInInjectionContext(() => {
      const guard = authGuard();
      guard.subscribe(canActivate => {
        expect(canActivate).toBeTrue();
        expect(router.navigate).not.toHaveBeenCalled();
        done();
      });
    });
  });

  it('should redirect to login and deny access when user is not authenticated', (done) => {
    authStateSubject.next(false);

    TestBed.runInInjectionContext(() => {
      const guard = authGuard();
      guard.subscribe(canActivate => {
        expect(canActivate).toBeFalse();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
        done();
      });
    });
  });

  describe('Route navigation', () => {
    it('should navigate to login exactly once when unauthorized', (done) => {
      authStateSubject.next(false);

      TestBed.runInInjectionContext(() => {
        const guard = authGuard();
        guard.subscribe(() => {
          expect(router.navigate).toHaveBeenCalledTimes(1);
          expect(router.navigate).toHaveBeenCalledWith(['/login']);
          done();
        });
      });
    });
  });
});
