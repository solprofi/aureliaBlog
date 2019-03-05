import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

import { PostService } from '../common/services/post-service';
import { AuthService } from '../common/services/auth-service';

@inject(PostService, AuthService, EventAggregator, Router)
export class Post {
  constructor(PostService, AuthService, EventAggregator, Router) {
    this.postService = PostService;
    this.authService = AuthService;
    this.ea = EventAggregator;
    this.router = Router;
  }

  activate(params) {
    this.error = '';
    this.postService
      .find(params.id)
      .then(data => {
        this.post = data.post;
      })
      .catch(error => {
        this.ea.publish('notification', {
          type: 'error',
          message: error.message
        });

        this.router.navigateToRoute('home');
      });
  }
}
