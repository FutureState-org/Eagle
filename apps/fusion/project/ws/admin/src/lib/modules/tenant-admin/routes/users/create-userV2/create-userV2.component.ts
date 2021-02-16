import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { MatSnackBar } from '@angular/material'
import { TenantAdminService } from '../../../tenant-admin.service'
import { UserAutocompleteService } from '../../../../../../../../../../library/ws-widget/collection/src/lib/_common/user-autocomplete/user-autocomplete.service'
import { SystemRolesManagementService } from '../../system-roles-management/system-roles-management.service'
import { IManageUser } from '../../system-roles-management/system-roles-management.model'

@Component({
  selector: 'ws-admin-create-user',
  templateUrl: './create-userV2.component.html',
  styleUrls: ['./create-userV2.component.scss'],
})
export class CreateUserV2Component implements OnInit, OnDestroy {
  createUserForm: FormGroup
  unseenCtrl!: FormControl
  unseenCtrlSub!: Subscription
  uploadSaveData = false
  fetching = false
  departments = []
  @ViewChild('toastSuccess', { static: true }) toastSuccess!: ElementRef<any>
  @ViewChild('toastError', { static: true }) toastError!: ElementRef<any>

  constructor(
    private snackBar: MatSnackBar,
    private tenantAdminSvc: TenantAdminService,
    private userAutocompleteSvc: UserAutocompleteService,
    public rolesSvc: SystemRolesManagementService,
  ) {
    this.createUserForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      // mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', []),
    })
  }

  ngOnInit() {
    // this.unseenCtrlSub = this.createUserForm.valueChanges.subscribe(value => {
    //   console.log('ngOnInit - value', value);
    // })
    this.getUserDepartments()
  }

  updateRole(email: string) {
    this.userAutocompleteSvc.fetchAutoComplete(email).subscribe(d => {
      if (d[0] && d[0].wid) {
        const addBody: IManageUser = {
          users: [d[0].wid],
          operation: 'add',
          roles: ['content-creator'],
        }
        this.rolesSvc.manageUser(addBody).then(() => {
        }).catch(() => {
        })
      }
    })
  }

  ngOnDestroy() {
    if (this.unseenCtrlSub && !this.unseenCtrlSub.closed) {
      this.unseenCtrlSub.unsubscribe()
    }
  }

  onSubmit(form: any) {
    this.uploadSaveData = true
    this.tenantAdminSvc.createUser(form.value).subscribe(
      () => {

        if (form.value.email) {
          this.updateRole(form.value.email)
        }

        form.reset()
        this.uploadSaveData = false
        this.openSnackbar(this.toastSuccess.nativeElement.value)
      },
      err => {
        this.openSnackbar(err.error.split(':')[1])
        this.uploadSaveData = false
      })
  }

  private openSnackbar(primaryMsg: string, duration: number = 5000) {
    this.snackBar.open(primaryMsg, 'X', {
      duration,
    })
  }

  getUserDepartments() {
    this.fetching = true
    this.tenantAdminSvc.getUserDepartments().then((res: any) => {
      this.fetching = false
      this.departments = res
    })
      .catch(() => { })
      .finally(() => {
        this.fetching = false
      })
  }
}
