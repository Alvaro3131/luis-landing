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

  deleteProduct(id:string){
    const productDocRef= doc(this.firesotre,'products/'+id);
    return deleteDoc(productDocRef);
  }

  editProduct(id:string,data:any){
    const productDocRef= doc(this.firesotre,'products/'+id);
    return updateDoc(productDocRef, { name: data.name, price: data.price, imageUrl: data.imageUrl, order:data.order});
  }
}
