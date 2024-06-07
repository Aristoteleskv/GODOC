import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  role_to_add = null;
  all_roles: any = {};
  user: any = {};
  roles: any = {};
  user_id = null;
  newuser = false;
  submit_data = {
    id: null,
    email: null,
    username: null,
    role: null,
    permissions: [],
  };
  password = "";
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.roleService.getAllRoles().subscribe((data) => {
      this.all_roles = data;
      console.log(data);
      this.userService.getAllRoles().subscribe((data) => {
        this.roles = data;
        this.route.params.subscribe({
          next: params => {
            const id = params["id"];
            if (id) {
              this.newuser = false;
              this.user_id = id;
              this.userService.getAllUsers().subscribe({
                next: data => {
                  this.user = data.filter((user) => user.user_id == id)[0];
                  this.submit_data = {
                    id,
                    email: this.user.email,
                    username: this.user.username,
                    role: this.user.role_id,
                    permissions: Array.from(
                      new Set(
                        this.all_roles.all_roles.filter(
                          (role) => role.name == this.user.role
                        )[0].permissions
                      )
                    ),
                  };
                  console.log(this.submit_data);
                  console.log(data);
                },
                error: err => {
                }
              });
            } else {
              this.newuser = true;
            }
          },
          error: err => {
        }
      });
      });
    });
  }

  rolechangehanlder() {
    this.submit_data.permissions = Array.from(
      new Set(
        this.all_roles.all_roles.filter(
          (role) => role.id == this.submit_data.role
        )[0].permissions
      )
    );
  }

  handlepermission(permission, status) {
    console.log(permission, status);
    if (!status)
      this.submit_data.permissions = this.submit_data.permissions.filter(
        (per) => per != permission
      );
    else this.submit_data.permissions.push(permission);
    console.log(this.submit_data);
  }

  submit() {
    if (this.newuser)
      this.userService
        .save({
          ...this.submit_data,
          password: this.password,
        })
        .subscribe(
          (data) => alert(data),
          (error) => alert("User Already Registered")
        );
    else
      this.userService.save(this.submit_data).subscribe(
        (data) => alert(data),
        (error) => alert("User Already Registered")
      );
  }

  deleteRole() {
    if (this.submit_data.role == 1) {
      alert("Can't Delete Admin Role");
      return;
    }
    var r = confirm("Are You Sure Want to Delete!");
    if (r == true) {
      this.roleService.DeleteRole(this.submit_data.role).subscribe(
        (data) => {
          alert(data);
          this.ngOnInit();
        },
        (error) => alert("Delete Failed")
      );
    }
  }

  AddRole() {
    this.role_to_add = null;
    document.getElementById("role_add_modal").style.display = "block";
  }

  closeModal() {
    this.role_to_add = null;
    document.getElementById("role_add_modal").style.display = "none";
  }

  addRoleSubmit() {
    if (!this.role_to_add) {
      alert("Role Required");
      return;
    }
    this.roleService
      .create({
        name: this.role_to_add,
      })
      .subscribe(
        (data) => {
          this.closeModal();
          alert(data);
          this.ngOnInit();
        },
        (error) => alert("Add Role Failed")
      );
  }
}

