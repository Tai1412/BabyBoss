import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BabyDetailPage } from '../profile/baby-detail/baby-detail.page';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { forkJoin } from 'rxjs';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
@Component({
  selector: 'app-baby-tracker',
  templateUrl: './baby-tracker.page.html',
  styleUrls: ['./baby-tracker.page.scss'],
})
export class BabyTrackerPage implements OnInit {
  public babyList: Array<any> = [];
  public babyId: any;
  public none: any;
  babyTrackerData1: any;
  babyTrackerData2: any;
  babyTrackerData3: any;
  babyTrackerData4: any;
  babyHealthPDF: Array<any> = [];
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: Storage,
    private route: ActivatedRoute,
    public file: File,
    public fileOpener: FileOpener,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.storage.get('babyDetail').then(val => {
      this.babyList = val
      console.log(this.babyList)
    })
    this.storage.get('babyId').then(val => {
      this.babyId = val
      console.log(this.babyId);
      if (this.babyId != null) {
        this.getBabyData();
        this.getBabyTrackerHealth1().then(data => {
          this.babyHealthPDF = data;
        })
      }
      else {
        this.none = null;
      }
    })

  }
  getBabyData() {
    this.getDataService().subscribe(res => {
      this.babyTrackerData1 = res[0];//health
      this.babyTrackerData2 = res[1];//sleep
      this.babyTrackerData3 = res[2];//diaper
      this.babyTrackerData4 = res[3];//feeding
    })
  }
  getBabyTrackerHealth() {
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyHealthRecord").snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    });
  }
  getBabyTrackerHealth1() {
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyHealthRecord").valueChanges().subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getBabyTrackerSleep() {
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babySleep").snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    });
  }
  getBabyTrackerDiaper() {
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyDiaper").snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    });
  }
  getBabyTrackerFeeding() {
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyFeeding").snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    });
  }
  getDataService() {
    let response1 = this.getBabyTrackerHealth();
    let response2 = this.getBabyTrackerSleep();
    let response3 = this.getBabyTrackerDiaper();
    let response4 = this.getBabyTrackerFeeding();
    return forkJoin([response1, response2, response3, response4]);
  }
  makePdf() {
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = {
      content: [
        {
          columns: [
            [
              { text: "BabyBoss Application", style: 'header' },
              { text: "Baby Health Record", style: 'sub_header' },
              { text: JSON.stringify((this.babyList), ['name', 'age', 'ageType', 'gender'], 1).replace(/[\[\]\{\}]+/g, "").replace(/[\[\]"]+/g, ""), style: 'BabyInformation' },
              { text: JSON.stringify((this.babyHealthPDF), ['healthRecord', 'time'], 1).replace(/[\[\]\{\}]+/g, "").replace(/[\[\]"]+/g, ""), style: 'content' },
            ]
          ]
        }
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 20,
          alignment: 'right'
        },
        sub_header: {
          fontSize: 18,
          alignment: 'right'
        },
        content: {
          fontSize: 16,
          alignment: 'center'
        },
        BabyInformation: {
          fontSize: 20,
          alignment: 'left'
        }
      },
      pageSize: 'A4',
      pageOrientation: 'portrait'
    };
    pdfmake.createPdf(docDefinition).getBuffer((buffer) => {
      let utf8 = new Uint8Array(buffer);
      let binaryArray = utf8.buffer;
      let blob = new Blob([<ArrayBuffer>binaryArray], { type: "application/pdf" });
      this.file.writeFile(this.file.dataDirectory, "MyBabyHealthRecord.pdf", blob, { replace: true }).then((fileEntry) => {
        this.fileOpener.open(this.file.dataDirectory + "MyBabyHealthRecord.pdf", "application/pdf");
      });
    });
  }


}
