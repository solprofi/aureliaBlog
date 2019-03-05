import { inject } from 'aurelia-framework';
import { PostService } from '../common/services/post-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(PostService, EventAggregator)
export class TagView {
  constructor(PostService, EventAggregator) {
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  activate(params) {
    this.tag = params.tag;
    this.postService
      .postsByTag(this.tag)
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
