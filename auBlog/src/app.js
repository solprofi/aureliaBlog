import { PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as toastr from 'toastr';

import { PostService } from './common/services/post-service';
import { AuthService } from './common/services/auth-service';
import { AuthorizeStep } from './pipeline-steps/authorize-step';

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
      this.currentUser = this.authService.currentUser;
    });

    this.updateSidebar();
    this.postSubscription = this.ea.subscribe('post-updated', updatedAt => {
      this.updateSidebar();
    });

    this.notificationSubscription = this.ea.subscribe('notification', notification => {
      toastr[notification.type](notification.message);
    });
  }

  publishNotification(type, message) {
    this.ea.publish('notification', {
      type,
      message
    });
  }

  updateSidebar() {
    this.postService
      .allTags()
      .then(data => {
        this.tags = data.tags;
      })
      .catch(error => {
        this.publishNotification('error', error.message);
      });

    this.postService
      .allArchives()
      .then(data => {
        this.archives = data.archives;
      })
      .catch(error => {
        this.publishNotification('error', error.message);
      });
  }

  configureRouter(config, router) {
    this.router = router;

    config.title = "Romans's blog";
    config.addAuthorizeStep(AuthorizeStep);

    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts' },
      { route: 'post/:id', name: 'post-view', moduleId: PLATFORM.moduleName('posts/post'), title: 'View Post' },
      {
        route: 'post/:id/edit',
        name: 'post-edit',
        moduleId: PLATFORM.moduleName('posts/edit-post'),
        title: 'Edit Post',
        settings: { auth: true }
      },
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
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('auth/login'), title: 'Login' },
      { route: 'signup', name: 'signup', moduleId: PLATFORM.moduleName('auth/signup'), title: 'Sign up' },
      {
        route: 'create-post',
        name: 'create-post',
        moduleId: PLATFORM.moduleName('posts/new-post'),
        title: 'Create Post',
        settings: { auth: true }
      }
    ]);
  }

  detached() {
    this.subscription.dispose();
    this.postSubscription.dispose();
    this.notificationSubscription.dispose();
  }

  logout() {
    this.authService
      .logout()
      .then(data => {
        this.ea.publish('user', null);
        this.publishNotification('success', 'Logged out successfully');
        this.router.navigateToRoute('home');
      })
      .catch(error => {
        this.publishNotification('error', error.message);
      });
  }
}
