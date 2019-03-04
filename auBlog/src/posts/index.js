import { PostService } from '../common/services/post-service';
import { inject } from 'aurelia-framework';

@inject(PostService)
export class Index {
  constructor(PostService) {
    this.message = 'Hello world';
    this.postService = PostService;
  }

  attached() {
    this.error = '';
    this.postService
      .allPostPreviews()
      .then(data => {
        this.posts = data.posts;
      })
      .catch(error => {
        this.error = error.message;
      });
  }
}
