import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-baby-memory-detail',
  templateUrl: './baby-memory-detail.page.html',
  styleUrls: ['./baby-memory-detail.page.scss'],
})
export class BabyMemoryDetailPage implements OnInit {
  public memoryId:string = this.route.snapshot.paramMap.get('id');
  memory:any;
  myPhoto:string=null;
  baby_memory_form: FormGroup;
  public babyId:any;
  public babyList:Array<any>=[];
  validation_messages = {
    'title': [
        { type: 'required', message: 'Title is required' },
      ],
    };
  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private route:ActivatedRoute,
    public router:Router,
    private camera:Camera,
    private storage: Storage,
    private toastCtrl:ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl:LoadingController,

  ) { 
    
    this.baby_memory_form = new FormGroup({
      title:new FormControl('',Validators.required),
    });
  }

  ngOnInit() {
    this.storage.get('babyId').then(val => {
      this.babyId = val
      this.memory=this.getBabyMemoryDetail(this.memoryId).subscribe(data=>{
        this.memory=data;
        this.updateBabyMemoryDetail(this.memory.title);
        console.log("data",this.memory.title)
      });
    })
    this.storage.get("babyDetail").then(val=>{
      this.babyList=val;
    })
  }
  takeBabyMemoryPicture() {
    const optionsGallery: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      allowEdit:true,
      targetWidth:400,
      targetHeight:400,
    }

    this.camera.getPicture(optionsGallery).then((imageData) => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
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
  deleteBabyMemory(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("images").doc(this.memoryId).delete()
      .then((res) => 
      {
        resolve(res);
      })
      .catch((err)=>{
         reject(err)
      });
    })
  }
  delete()
  {
    this.showConfirm();
  }
  getBabyMemoryDetail(memoryId: string) {
    let currentUser=this.afAuth.auth.currentUser;
    return this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("images").doc(memoryId).valueChanges();
  }
  updateBabyMemory(value){
    this.showLoading("Proccessing...");
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      console.log(this.myPhoto);
    //   if(this.myPhoto){
    //     let storageRef = firebase.storage().ref();
    //   // Create a name for fileName
    //   const fileName = Math.floor(Date.now() / 1000);
  
    //   // Create a reference to 'images/tfileName.jpg'
    //   const imageRef = storageRef.child(`images/${currentUser.uid}/${fileName}.jpg`);
  
    //   imageRef.putString(this.myPhoto, firebase.storage.StringFormat.DATA_URL).then(()=> {
    //     imageRef.getDownloadURL().then(url => {
    //       this.myPhoto=url
    //     })
    //   });
    // }
    if(this.myPhoto==null){
      this.myPhoto=this.memory.imageUrl
    }
    this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("images").doc(this.memoryId).update({
        title:value.title,
        imageUrl:this.myPhoto,
      })
      .then((res) => 
      {
        this.loadingCtrl.dismiss();
        this.router.navigate(['/tabs/baby-memory']); 
        this.showToast("Updated Successfully")
        resolve(res)
      })
      .catch((err)=>{
         reject(err)
      });
    })
  }
  updateBabyMemoryDetail(title) {
    this.baby_memory_form.patchValue({
      title: title,
    })
  }

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
  async showConfirm(){
    const confirm = await this.alertCtrl.create({
      header: 'Confirm',
      subHeader: 'Do you want to delete ?',
      message:'Its will be permanently deleted',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',//if yes run delete memory
          handler: () => {
            this.showLoading("Proccessing....")
            this.deleteBabyMemory()
            .then((res) =>{
                this.loadingCtrl.dismiss()
                this.showToast("Your baby-memory has been deleted");
                this.router.navigate(['/tabs/baby-memory']);     

               })
             .catch((err) =>{
                console.log(err)
             });
          }
        }
      ]
    });
    confirm.present();
  }
}
