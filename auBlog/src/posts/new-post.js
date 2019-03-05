import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';

import { PostService } from '../common/services/post-service';

@inject(PostService, Router, EventAggregator)
export class NewPost {
  constructor(PostService, Router, EventAggregator) {
    this.postService = PostService;
    this.router = Router;
    this.ea = EventAggregator;
  }

  createPost() {
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

  attached() {
    this.post = {
      title: '',
      body: '',
      tags: []
    };

    this.title = 'Create Post';
  }
}
