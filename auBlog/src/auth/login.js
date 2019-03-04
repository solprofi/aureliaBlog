import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService } from '../common/services/auth-service';

@inject(AuthService, Router, EventAggregator)
export class Login {
  constructor(AuthService, Router, EventAggregator) {
    this.authService = AuthService;
    this.router = Router;
    this.ea = EventAggregator;
  }

  activate() {
    this.error = null;
  }

  login() {
    this.error = null;
    this.authService
      .login(this.name)
      .then(data => {
        this.ea.publish('user', data.name);
        this.router.navigateToRoute('home');
      })
      .catch(error => {
        this.error = error.message;
      });
  }
}
