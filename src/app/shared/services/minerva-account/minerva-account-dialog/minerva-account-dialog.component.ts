import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MinervaAccountService } from '../minerva-account-service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-minerva-account-dialog',
  templateUrl: './minerva-account-dialog.component.html',
  styleUrls: ['./minerva-account-dialog.component.scss']
})
export class MinervaAccountDialogComponent implements OnInit, OnDestroy {
  private reqSubs: Subscription;
  private deleteSubs: Subscription;

  public userForm: FormGroup;
  public deleteInput: string = '';

  constructor(public dialogRef: MatDialogRef<MinervaAccountDialogComponent>,
    public dialog: MatDialog, public snackBar: MatSnackBar,
    private minervaAccountService: MinervaAccountService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.userFormGroupBuilder();
  }

  ngOnDestroy() {
    if (this.reqSubs) this.reqSubs.unsubscribe();
    if (this.deleteSubs) this.deleteSubs.unsubscribe();
  }

  // build queryForm
  userFormGroupBuilder() {
    this.userForm = this.formBuilder.group({
      'name': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'role': ['Administrator', Validators.compose([Validators.required])]
    });

    this.editUserForm();
  }


  editUserForm(){
    // set form value of user
    this.userForm.setValue({
      'name': this.data.details.name || '',
      'email': this.data.details.email || '',
      'role': this.data.details.user_type || 'Administrator'
    });
  }


  // add new user as pending
  addNewUser() {
    const body = {
      'name': this.userForm.get('name').value,
      'email': this.userForm.get('email').value,
      'role' : this.userForm.get('role').value
    }

    this.reqSubs = this.minervaAccountService
    .addNewUser(body)
    .subscribe(result => {
      this.dialogRef.close(false);
    });
  }

  // edit user account
  editUser() {
    const body = {
      'name': this.userForm.get('name').value,
      'email': this.userForm.get('email').value,
      'role' : this.userForm.get('role').value
    }

    this.reqSubs = this.minervaAccountService
    .editUser(body, this.data.details._id)
    .subscribe(result => {
      this.dialogRef.close(false);
    });
  }


  // delete user
  deleteUser() {
    this.deleteSubs = this.minervaAccountService
    .deleteUser(this.data.details._id, this.deleteInput)
    .subscribe(result => {
      this.dialogRef.close(false);
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
