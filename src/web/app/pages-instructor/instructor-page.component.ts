import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { AuthInfo, NotificationTargetUser } from '../../types/api-output';

/**
 * Base skeleton for instructor pages.
 */
@Component({
  selector: 'tm-instructor-page',
  templateUrl: './instructor-page.component.html',
})
export class InstructorPageComponent implements OnInit {

  user: string = '';
  isInstructor: boolean = false;
  isStudent: boolean = false;
  isAdmin: boolean = false;
  isMaintainer: boolean = false;
  navItems: any[] = [
    {
      url: '/web/instructor',
      display: 'Home',
    },
    {
      url: '/web/instructor/courses',
      display: 'Courses',
    },
    {
      url: '/web/instructor/sessions',
      display: 'Sessions',
    },
    {
      url: '/web/instructor/students',
      display: 'Students',
    },
    {
      url: '/web/instructor/search',
      display: 'Search',
    },
    {
      url: '/web/instructor/notifications',
      display: 'Notifications',
    },
    {
      url: '/web/instructor/help',
      display: 'Help',
    },
  ];
  isFetchingAuthDetails: boolean = false;
  notificationTargetUser: NotificationTargetUser = NotificationTargetUser.INSTRUCTOR;

  private backendUrl: string = environment.backendUrl;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.isFetchingAuthDetails = true;
    this.route.queryParams.subscribe((queryParams: any) => {
      this.authService.getAuthUser(queryParams.user).subscribe((res: AuthInfo) => {
        if (res.user) {
          this.user = res.user.id;
          if (res.masquerade) {
            this.user += ' (M)';
          }
          this.isInstructor = res.user.isInstructor;
          this.isStudent = res.user.isStudent;
          this.isAdmin = res.user.isAdmin;
          this.isMaintainer = res.user.isMaintainer;
        } else {
          window.location.href = `${this.backendUrl}${res.instructorLoginUrl}`;
        }
        this.isFetchingAuthDetails = false;
      }, () => {
        this.isInstructor = false;
        this.isStudent = false;
        this.isAdmin = false;
        this.isMaintainer = false;
        this.isFetchingAuthDetails = false;
      });
    });
  }

}
