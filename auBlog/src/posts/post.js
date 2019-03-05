import { inject } from 'aurelia-framework';
import { PostService } from '../common/services/post-service';
import { AuthService } from '../common/services/auth-service';

@inject(PostService, AuthService)
export class Post {
  constructor(PostService, AuthService) {
    this.postService = PostService;
    this.authService = AuthService;
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
