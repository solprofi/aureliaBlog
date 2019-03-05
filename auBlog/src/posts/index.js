import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import { PostService } from '../common/services/post-service';

@inject(PostService, EventAggregator)
export class Index {
  constructor(PostService, EventAggregator) {
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  attached() {
    this.postService
      .allPostPreviews()
      .then(data => {
        this.posts = data.posts;
      })
      .catch(error => {
        this.ea.publish('notification', {
          type: 'error',
          message: error.message
        });
      });
  }
}
