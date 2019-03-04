import { inject } from 'aurelia-framework';
import { PostService } from '../common/services/post-service';

@inject(PostService)
export class Post {
  constructor(PostService) {
    this.message = 'Hello world';
    this.postService = PostService;
  }

  activate(params) {
    this.error = '';
    this.postService
      .find(params.id)
      .then(data => {
        this.post = data.post;
      })
      .catch(error => {
        this.error = error.message;
      });
  }
}
