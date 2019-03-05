import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import { PostService } from '../common/services/post-service';

@inject(PostService, EventAggregator)
export class ArchiveView {
  constructor(PostService, EventAggregator) {
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  activate(params) {
    this.archive = params.archive;
    this.postService
      .postsByArchive(this.archive)
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
