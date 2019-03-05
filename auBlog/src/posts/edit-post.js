import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';

import { PostService } from '../common/services/post-service';

@inject(PostService, Router, EventAggregator)
export class Edit {
  constructor(PostService, Router, EventAggregator) {
    this.postService = PostService;
    this.router = Router;
    this.ea = EventAggregator;
  }

  editPost() {
    this.postService
      .create(this.post)
      .then(data => {
        this.ea.publish('post-updated', Date());
        this.router.navigateToRoute('post-view', { id: data.slug });
      })
      .catch(error => {
        this.error = error;
      });
  }

  activate(params) {
    this.postService
      .find(params.id)
      .then(data => {
        this.post = data.post;
      })
      .catch(error => {
        this.error = error;
      });

    this.title = 'Edit Post';
  }
}
