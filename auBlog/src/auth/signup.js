import { inject } from 'aurelia-framework';
import { AuthService } from '../common/services/auth-service';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(AuthService, EventAggregator, Router)
export class Signup {
  constructor(AuthService, EventAggregator, Router) {
    this.authService = AuthService;
    this.ea = EventAggregator;
    this.router = Router;
  }

  signup() {
    this.authService
      .signup(this.name)
      .then(user => {
        this.ea.publish('user', user.name);
        this.router.navigateToRoute('home');
      })
      .catch(error => {
        this.ea.publish('notification', {
          type: 'error',
          message: error.message
        });
      });
  }
}
