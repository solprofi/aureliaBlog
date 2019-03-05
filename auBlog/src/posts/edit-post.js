import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';

import { PostService } from '../common/services/post-service';
import { AuthService } from '../common/services/auth-service';

@inject(PostService, Router, EventAggregator, AuthService)
export class Edit {
  constructor(PostService, Router, EventAggregator, AuthService) {
    this.postService = PostService;
    this.router = Router;
    this.ea = EventAggregator;
    this.authService = AuthService;
  }

  editPost() {
    this.postService
      .create(this.post)
      .then(data => {
        this.ea.publish('post-updated', Date());
        this.router.navigateToRoute('post-view', { id: data.slug });
      })
      .catch(error => {
        this.ea.publish('notification', {
          type: 'error',
          message: error.message
        });
      });
  }

  activate(params) {
    this.postService
      .find(params.id)
      .then(data => {
        if (this.authService.currentUser !== data.post.author) {
          this.router.navigateToRoute('home');
        }
        this.post = data.post;
      })
      .catch(error => {
        this.ea.publish('notification', {
          type: 'error',
          message: error.message
        });

        this.router.navigateToRoute('home');
      });

    this.title = 'Edit Post';
  }
}
