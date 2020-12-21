import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'ws-app-create-mdo',
  templateUrl: './create-mdo.component.html',
  styleUrls: ['./create-mdo.component.scss'],
})
export class CreateMdoComponent implements OnInit {
  userMgmtData: any = []
  fracData: any = []
  contentForm: any
  data: any = []
  imageTypes = ['.png', '.jpg', '.jpeg', '.jtif', '.tiff']
  tabledata: any = []
  constructor() { }

  ngOnInit() {

    this.tabledata = {
      columns: [
        { displayName: 'Full name', key: 'fullName' },
        { displayName: 'Email', key: 'email' },
        { displayName: 'Mobile number', key: 'position' },
      ],
      needCheckBox: false,
      needHash: false,
      sortColumn: '',
      sortState: 'asc',
    }
    this.contentForm = new FormGroup({
      name: new FormControl(),
      subTitle: new FormControl(),
    })
    this.userMgmtData = [{
      name: 'Create Users',
      key: 'Create Users',
      checked: false,
      enabled: true,
    },
    {
      name: 'Activate Users',
      key: 'Activate Users',
      checked: true,
      enabled: true,
    },
    {
      name: 'Add/Remove Users',
      key: 'Add/Remove Users',
      checked: true,
      enabled: true,
    },
    {
      name: 'Block Users',
      key: 'Block Users',
      checked: false,
      enabled: true,
    },
    {
      name: 'Approve fields',
      key: 'Approve fields',
      checked: true,
      enabled: true,
    }]

    this.fracData = [{
      name: 'Competencies',
      key: 'competencies',
      checked: true,
      enabled: true,
    },
    {
      name: 'Postions',
      key: 'postions',
      checked: false,
      enabled: true,
    },
    {
      name: 'Roles',
      key: 'roles',
      checked: true,
      enabled: true,
    },
    {
      name: 'Knowledge resources',
      key: 'knowledge resources',
      checked: false,
      enabled: true,
    },
    {
      name: 'Question bank',
      key: 'question bank',
      checked: true,
      enabled: true,
    }]
  }
  checkCondition() {
    return true
  }
  showError() {

  }
  uploadAppIcon() {

  }
  openPopup() {

  }
}