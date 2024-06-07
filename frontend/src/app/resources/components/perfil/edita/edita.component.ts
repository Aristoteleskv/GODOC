import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { TransferItem, TransferSelectChange, TransferChange } from 'ng-zorro-antd/transfer';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edita',
  templateUrl: './edita.component.html',
  styleUrls: ['./edita.component.scss']
})
export class EditaComponent implements OnInit {
  user = [
    {
      key: 'fullName',
      label: 'Full name',
      value: '',
      type: 'text',
    },
    {
      key: 'email',
      label: 'Email address',
      value: '',
      type: 'email',
    },
    {
      key: 'password',
      label: 'Password',
      value: '',
      type: 'password',
    },
    {
      key: 'confirmPassword',
      label: 'Confirm password',
      value: '',
      type: 'password',
    },
  ];

  previewImage: string | undefined = '';
  previewVisible = false;


  userId = null;
uid: any;
permissions: string[];
Users: any;
currentUser: any;
list: TransferItem[];
disabled: BooleanInput;
alertVisible: any;
alertType: "error"|"success"|"info"|"warning";
alertMessage: string|TemplateRef<void>;
loading: BooleanInput;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private authService: AuthService,
    private _api: ApiService,
    private userService: UserService,
    private storageService: TokenStorageService,
  ) { this.userService.getUser()
    .subscribe(
      {
        next: (data) => {
          if (data && Object.keys(data).length !== 0) {
            this.uid = data; // Agora 'currentUser' terá os dados do usuário, como 'nome', 'username', etc.
          this.getUserProfile(this.uid.username);
        }
      },
        error: error => {
          return error;
        }
    });


      // this.router.navigateByUrl('/login');
     }

  role_to_add = null;
  all_roles: any = {};
  users: any = {};
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

// Get user details from DB
getUserProfile(username: any) {
  this.permissions = this.authService.getCurrentUserPermissions();

  this.userService.getUserProfile(username).subscribe({
    next: (data: any) => {
    console.log(data);
    this.Users = data;
  },
    error: (error: any) => {
      return error;
    }
});
}
  ngOnInit() {
    if (!this.storageService.getCurrentUserPermissions().includes("user-show"))
      this.router.navigateByUrl("/");

    this.roleService.getAllRoles().subscribe((data) => {
      this.all_roles = data;
      this.userService.getAllRoles().subscribe((data) => {
        this.roles = data;
        console.log(data);
        this.route.params.subscribe((params) => {
          const id = params["id"];
          if (id) {
            this.newuser = false;
            this.user_id = id;
            this.userService.getAllUsers().subscribe((data) => {
              this.users = data;
              this.submit_data = {
                id,
                email: this.users.email,
                username: this.users.username,
                role: this.users.role_id,
                permissions: Array.from(
                  new Set(
                    this.all_roles.all_roles.filter(
                      (role) => role.name == this.users.role
                    )[0].permissions
                  )
                ),
              };
            });
          } else {
            this.newuser = true;
          }
        });
      });
    });
    
    const { user_id, full_name, email,username } = this.storageService.getUser();
    this.user_id = user_id;
    this.user[0].value = full_name;
    this.user[1].value = email;
    this.user[2].value = username;
    this.currentUser = this.storageService.getUser();


    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 4 === 0,
        tag: ['cat', 'dog', 'bird'][i % 3],
        checked: false
      });
    }

    [2, 3].forEach(idx => (this.list[idx].direction = 'right'));

  }

  canUpdate(): boolean {
    return this.user.filter((field) => field.value.length > 0).length !== 4
      ? true
      : false;
  }

  // Submit data to be updated
  onSubmit(): void {
    this.alertVisible = false;
    if (this.user[2].value !== this.user[3].value) {
      this.alertType = 'error';
      this.alertMessage = 'Passwords do not match';
      this.alertVisible = true;
    } else {
      this.loading = true;
      this._api
        .putTypeRequest(`users/${this.user_id}`, {
          fullName: this.user[0].value,
          email: this.user[1].value,
          password: this.user[2].value,
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            this.alertMessage = res.message;
            this.alertType = 'success';
            this.alertVisible = true;
            this.loading = false;
            const oldDetails = this.storageService.getUser();
            this.storageService.setUser({
              ...oldDetails,
              full_name: this.user[0].value,
              email: this.user[1].value,
            });
            this.user[2].value = '';
            this.user[3].value = '';
            // window.location.reload();
          },
          (err: any) => {
            console.log(err);
            this.alertMessage = err.error.message;
            this.alertVisible = true;
            this.alertType = 'error';
            this.loading = false;
          }
        );
    }



  }



  tags = ['DIR', 'Tag 2', 'Tag 3'];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  search(ret: {}): void {
    console.log('nzSearchChange', ret);
  }

  select(ret: TransferSelectChange): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: TransferChange): void {
    console.log('nzChange', ret);
    const listKeys = ret.list.map(l => l['key']);
    const hasOwnKey = (e: TransferItem): boolean => e.hasOwnProperty('key');
    this.list = this.list.map(e => {
      if (listKeys.includes(e['key']) && hasOwnKey(e)) {
        if (ret.to === 'left') {
          delete e.hide;
        } else if (ret.to === 'right') {
          e.hide = false;
        }
      }
      return e;
    });
  }

  changePage(event: any, e: any) { }

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
