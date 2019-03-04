import { PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-framework';
import { PostService } from './common/services/post-service';
import { AuthService } from './common/services/auth-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(PostService, AuthService, EventAggregator)
export class App {
  constructor(PostService, AuthService, EventAggregator) {
    this.postService = PostService;
    this.authService = AuthService;
    this.ea = EventAggregator;
  }

  attached() {
    this.currentUser = this.authService.currentUser;
    this.subscription = this.ea.subscribe('user', user => {
      console.log('here', this.authService.currentUser);
      this.currentUser = this.authService.currentUser;
    });

    this.postService
      .allTags()
      .then(data => {
        this.tags = data.tags;
      })
      .catch(error => {
        this.error = error.message;
      });

    this.postService
      .allArchives()
      .then(data => {
        this.archives = data.archives;
      })
      .catch(error => {
        this.error = error.message;
      });
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "Romans's blog";
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts' },
      { route: 'post/:id', name: 'post-view', moduleId: PLATFORM.moduleName('posts/post'), title: 'View Post' },
      {
        route: 'tag/:tag',
        name: 'tag-view',
        moduleId: PLATFORM.moduleName('posts/tag-view'),
        title: 'View Posts By Tag'
      },
      {
        route: 'archive/:archive',
        name: 'archive-view',
        moduleId: PLATFORM.moduleName('posts/archive-view'),
        title: 'View Post By Asrchive'
      },
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('auth/login'), title: 'Login' }
    ]);
  }

  detached() {
    this.subscription.dispose();
  }

  logout() {
    this.authService
      .logout()
      .then(data => {
        this.ea.publish('user', null);
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}