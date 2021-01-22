import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router'
import { UsersService } from '../../services/users.service'
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'ws-app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup
  namePatern = `^[a-zA-Z\\s\\']{1,32}$`
  department: any = {}
  departmentName = ''
  toastSuccess: any
  rolesList: any = []
  public userRoles: Set<string> = new Set()

  constructor(private router: Router, private activeRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private usersSvc: UsersService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.department = this.activeRoute.snapshot.data.department.data
        this.departmentName = this.department ? this.department.deptName : ''
        this.rolesList = this.department.rolesInfo
      }
    })
    this.createUserForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl(''),
      roles: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
  }

  onSubmit(form: any) {

    this.usersSvc.createUser(form.value).subscribe(res => {
      // let user
      // const deptRole = this.department.rolesInfo.filter((role: { roleName: string }) => role.roleName === 'MEMBER')[0]
      this.openSnackbar(res.data)
      if (res) {
        const req = {
          departments: [
            'igot',
            'istm',
            'iGOT',
            'NPA',
            'NACIN',
            'LSNAA',
            'ISTM',
          ],
        }
        if (req.departments.indexOf(this.department.deptName) === -1) {
          req.departments.push(this.department.deptName)
        }

        this.usersSvc.onSearchUserByEmail(form.value.email, req).subscribe(data => {
          // user = data[0]
          const userreq = {
            personalDetails: {
                firstname: data[0].first_name,
                surname: data[0].last_name,
                primaryEmail: data[0].email,
            },
            professionalDetails: [
                {
                    name: data[0].department_name,
                },
            ],
          }

          this.usersSvc.createUserById(data[0].wid, userreq).subscribe(userdata => {
            if (userdata) {
              const dreq = {
                userId: data[0] ? data[0].wid : null,
                deptId: this.department ? this.department.id : null,
                // deptRoleId: deptRole ? deptRole.deptRoleId : null,
                roles: form.value.roles,
                isActive: true,
                isBlocked: false,
              }
              this.usersSvc.addUserToDepartment(dreq).subscribe(dres => {
                if (dres) {
                  this.createUserForm.reset({ fname: '', lname: '', email: '', department: this.departmentName, roles: '' })
                  this.router.navigate(['/app/home/users'])
                }
              })
            }
          })
        })
      }
    },                                             (err: { error: string }) => {
      this.openSnackbar(err.error.split(':')[1])
    })
  }

  private openSnackbar(primaryMsg: string, duration: number = 5000) {
    this.snackBar.open(primaryMsg, 'X', {
      duration,
    })
  }

  modifyUserRoles(role: string) {
    if (this.userRoles.has(role)) {
      this.userRoles.delete(role)
    } else {
      this.userRoles.add(role)
    }
  }
}
