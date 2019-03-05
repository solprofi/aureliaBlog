import { bindable } from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';

import { PostService } from '../../common/services/post-service';

@inject(PostService, ValidationControllerFactory)
export class PostForm {
  @bindable post;
  @bindable title;

  constructor(PostService, ValidationControllerFactory) {
    this.postService = PostService;
    this.controller = ValidationControllerFactory.createForCurrentScope();
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

  postChanged(newValue, oldValue) {
    if (this.post) {
      validationMessages['required'] = `U must enter a \${$displayName}`;

      ValidationRules.ensure('title')
        .displayName('Title')
        .required()
        .minLength(5)
        .ensure('body')
        .displayName('Body')
        .required()
        .on(this.post);

      this.controller.validate();
    }
  }

  submit() {}
}
