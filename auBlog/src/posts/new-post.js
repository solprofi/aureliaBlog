import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { PostService } from '../common/services/post-service';

@inject(PostService, Router)
export class NewPost {
  constructor(PostService, Router) {
    this.postService = PostService;
    this.router = Router;
  }

  createPost() {
    console.log('here');
    this.postService
      .create(this.post)
      .then(data => {
        this.router.navigateToRoute('post-view', { id: data.slug });
      })
      .catch(error => {
        this.error = error;
      });
  }
}
