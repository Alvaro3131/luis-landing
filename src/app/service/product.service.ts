import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class productService {


  constructor(private firesotre:Firestore) { }

  addProduct(product:any) {
    const productRef= collection(this.firesotre,'products')
    return addDoc(productRef,product)
  }

  getProducts(): Observable<any[]>{
    const productRef= collection(this.firesotre,'products')
    return collectionData(productRef,{idField:'id'}) as Observable<any[]>
  }
  getPrincipalImages(): Observable<any[]>{
    const productRef= collection(this.firesotre,'images')
    return collectionData(productRef,{idField:'id'}) as Observable<any[]>
  }
  getRecomendations(): Observable<any[]>{
    const productRef= collection(this.firesotre,'recommendation')
    return collectionData(productRef,{idField:'id'}) as Observable<any[]>
  }

  deleteProduct(id:string){
    const productDocRef= doc(this.firesotre,'products/'+id);
    return deleteDoc(productDocRef);
  }

  editProduct(id:string,data:any){
    const productDocRef= doc(this.firesotre,'products/'+id);
    return updateDoc(productDocRef, { name: data.name, price: data.price, imageUrl: data.imageUrl, order:data.order});
  }
  editImage(id:string,data:any){
    const productDocRef= doc(this.firesotre,'images/'+id);
    return updateDoc(productDocRef, { name: data.name,  url_image: data.url_image, order:data.order});
  }
  editRecomendation(data:any){
    const productDocRef= doc(this.firesotre,'recommendation/'+data.id);
    delete data.id;
    return updateDoc(productDocRef, { ...data});
  }
}
