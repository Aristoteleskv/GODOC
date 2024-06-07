import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  content?: any;
  users: any;
  permissions: string[];
  constructor(
    private userService: UserService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.permissions = this.authService.getCurrentUserPermissions();
        console.log(this.permissions);
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.users = data

      },
      error: err => {
    }
  });
  }

  remove(id) {
    if (id === this.authService.getUser().user_id) {
      alert("You Cannot Remove Your self");
      return;
    }
    var r = confirm("Are You Sure Want to Delete!");
    if (r == true) {
      this.userService.DeleteUser(id).subscribe((data) => {
        this.users = this.users.filter((user) => user.user_id !== id);
        alert(data);
      });
    }
  }

  edit(id) {
    this.router.navigate(["users/" + id]);
  }
  ngOnIniwt(): void {
    this.userService.Getall().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }

}
