import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private transfer: FileTransfer, 
    private file: File, private androidPermissions: AndroidPermissions, 
    private toastCtrl: ToastController) { }

  readonly fileTransfer: FileTransferObject = this.transfer.create();

  download() {
    this.askPermission();

    const transfer = this.transfer.create();
    const url = encodeURI('https://devdactic.com/html/5-simple-hacks-LBT.pdf');
    transfer.download(url, this.file.externalRootDirectory + 'myFile.pdf').then(entry => {
      this.presentToast();
    }, (error) => {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("download error code" + error.code);
    });
  }

  askPermission() {
    const permission = this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE;
    this.androidPermissions.checkPermission(permission).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(permission)
    );
    
    this.androidPermissions.requestPermission(permission);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Finished downloading',
      duration: 10000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
