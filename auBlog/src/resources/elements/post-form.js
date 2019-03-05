import { bindable } from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';

import { PostService } from '../../common/services/post-service';

@inject(PostService)
export class PostForm {
  @bindable post;
  @bindable title;

  constructor(PostService) {
    this.postService = PostService;
  }

  addTag() {
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }

  attached() {
    this.postService
      .allTags()
      .then(data => {
        this.allTags = data.tags;
      })
      .catch(error => {
        this.error = error;
      });
  }

  valueChanged(newValue, oldValue) {}

  submit() {}
}
