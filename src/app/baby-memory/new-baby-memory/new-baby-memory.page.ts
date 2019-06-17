import { Component, OnInit } from '@angular/core';
import { BabyServiceService } from 'src/app/services/baby-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase/app';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-baby-memory',
  templateUrl: './new-baby-memory.page.html',
  styleUrls: ['./new-baby-memory.page.scss'],
})
export class NewBabyMemoryPage implements OnInit {
  baby_memory_form: FormGroup;
  public babyId: any;
  validation_messages = {
    'title': [
      { type: 'required', message: 'Title is required' },
    ],
  };
  public myPhoto: string = null;
  constructor(
    private camera: Camera,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public router:Router,
    private storage: Storage,
    public toastCtrl: ToastController,
    private loadingCtrl:LoadingController,



  ) { }

  ngOnInit() {
    this.baby_memory_form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
    this.storage.get('babyId').then(val => {
      this.babyId = val
    })
  }
  takeBabyMemoryPicture() {
    const optionsGallery: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,//will correct view
      allowEdit: true,
      targetWidth: 400,
      targetHeight: 400,
    }

    this.camera.getPicture(optionsGallery).then((data) => {
      this.myPhoto = 'data:image/jpeg;base64,' + data;
    }, (err) => {
      // Handle error
      console.log(err)
    })
  }
  takePhotoBabyMemoryPicture() {
    const optionsGallery: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,//will correct view
      allowEdit: true,
      targetWidth: 400,
      targetHeight: 400,
    }

    this.camera.getPicture(optionsGallery).then((data) => {
      this.myPhoto = 'data:image/jpeg;base64,' + data;
    }, (err) => {
      // Handle error
      console.log(err)
    })
  }
  // upload() {
  //   let currentUser = this.afAuth.auth.currentUser;
  //   let storageRef = firebase.storage().ref();
  //   // Create a name for fileName
  //   const fileName = Math.floor(Date.now() / 1000);

  //   // Create a reference to 'images/tfileName.jpg'
  //   const imageRef = storageRef.child(`images/${currentUser.uid}/${fileName}.jpg`);

  //   imageRef.putString(this.myPhoto, firebase.storage.StringFormat.DATA_URL).then(()=> {
  //     imageRef.getDownloadURL().then(url => {
  //       this.afs.collection('User').doc(currentUser.uid).collection('images').add({
  //         imageUrl:url        
  //       })

  //     })
  //   });

  // }
  createBabyMemory(value) {
    this.showLoading("Proccessing...");
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("images").add({
        title: value.title,
        imageUrl: this.myPhoto//from takeBabyMemoryPicture
      })        
      .then(
          res => {
            //       if(this.myPhoto!=null){
            //         const storageRef=firebase.storage().ref();
            //         // Create a name for fileName
            // const fileName = Math.floor(Date.now() / 1000);

            // // Create a reference to 'images/tfileName.jpg'
            // const imageRef = storageRef.child(`images/${currentUser.uid}/${fileName}.jpg`);
            // return imageRef.putString(this.myPhoto, firebase.storage.StringFormat.DATA_URL).then(()=> {
            //   imageRef.getDownloadURL().then(url => {
            //     this.myPhoto=url
            //   })
            // });
            //       }
            this.loadingCtrl.dismiss();
            this.router.navigate(["/tabs/baby-memory"]);
            this.showToast("Added Successfully")
            resolve(res)
          },
          error => {
            reject(error)
          }
        )
    })
  }
  // onSubmit(value){
  //   let currentUser=this.afAuth.auth.currentUser;
  //   if(this.myPhoto){
  //     let storageRef = firebase.storage().ref();
  //   // Create a name for fileName
  //   const fileName = Math.floor(Date.now() / 1000);

  //   // Create a reference to 'images/tfileName.jpg'
  //   const imageRef = storageRef.child(`images/${currentUser.uid}/${fileName}.jpg`);

  //   imageRef.putString(this.myPhoto, firebase.storage.StringFormat.DATA_URL).then(()=> {
  //     imageRef.getDownloadURL().then(url => {
  //       this.image=url
  //     })
  //   });
  // }
  // else{
  //   this.image=""
  // }
  // let data={
  //   title:value.title,
  //   imageUrl:this.image,
  // }
  // this.createBabyMemory(data).then(res=>{
  //   console.log(res)
  // })
  // }
  async showToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async showLoading(message){
    const loading = await this.loadingCtrl.create({
      message: message,
      spinner:'dots',
    });
    loading.present();
  }
}
