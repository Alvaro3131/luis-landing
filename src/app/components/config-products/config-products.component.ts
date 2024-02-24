import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import AOS from 'aos';
import { productService } from '../../service/product.service';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { error } from 'console';
import { last, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-config-products',
  templateUrl: `./config-products.component.html`,
  styleUrl: './config-products.component.css',
})
export class ConfigProductsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  @ViewChild('fileInput2') fileInput2: ElementRef | undefined;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private productService:productService, private storage:Storage) {}
 async ngOnInit() {
  await this.productService.getRecomendations().subscribe((data) => {
    this.recomendations= data;
    const compararPorOrder = (a: any, b: any) => {
      return a.order - b.order;
    };
    this.recomendations.sort(compararPorOrder);
    this.formRecomendation.patchValue(this.recomendations);
    console.log(this.formRecomendation.value);
  });
   await this.productService.getPrincipalImages().subscribe((data) => {
    this.images= data;
    const compararPorOrder = (a: any, b: any) => {
      return a.order - b.order;
    };
    this.images.sort(compararPorOrder);
   });
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      const compararPorOrder = (a: any, b: any) => {
        return a.order - b.order;
      };
      this.products.sort(compararPorOrder);

// El array 'personas' ahora está ordenado por la propiedad 'order'



      // Verificar si la plataforma es el navegador antes de inicializar AOS
      if (isPlatformBrowser(this.platformId)) {
        // Inicializar AOS después de recibir los productos
        AOS.init({ once: true, duration: 3000 });
      }
    });
  }
  formProduct=new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    order: new FormControl('', [Validators.required]),
    imageUrl: new FormControl(''),
  });
  formImage=new FormGroup({
    id: new FormControl(''),
    url_image: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    order: new FormControl('', [Validators.required]),
  });
  formRecomendation=new FormArray([
    new FormGroup({
      day:new FormControl(''),
      description: new FormControl(''),
      id: new FormControl(''),
      isVisible: new FormControl(''),
      order: new FormControl(''),
      url:new FormControl(''),
    }),
    new FormGroup({
      day:new FormControl(''),
      description: new FormControl(''),
      id: new FormControl(''),
      isVisible: new FormControl(''),
      order: new FormControl(''),
      url:new FormControl(''),
    }),
    new FormGroup({
      day:new FormControl(''),
      description: new FormControl(''),
      id: new FormControl(''),
      isVisible: new FormControl(''),
      order: new FormControl(''),
      url:new FormControl(''),
    }),
    new FormGroup({
      day:new FormControl(''),
      description: new FormControl(''),
      id: new FormControl(''),
      isVisible: new FormControl(''),
      order: new FormControl(''),
      url:new FormControl(''),
    }),
    new FormGroup({
      day:new FormControl(''),
      description: new FormControl(''),
      id: new FormControl(''),
      isVisible: new FormControl(''),
      order: new FormControl(''),
      url:new FormControl(''),
    }),
    new FormGroup({
      day:new FormControl(''),
      description: new FormControl(''),
      id: new FormControl(''),
      isVisible: new FormControl(''),
      order: new FormControl(''),
      url:new FormControl(''),
    }),
    new FormGroup({
      day:new FormControl(''),
      description: new FormControl(''),
      id: new FormControl(''),
      isVisible: new FormControl(''),
      order: new FormControl(''),
      url:new FormControl(''),
    }),
  ]);
  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }
  validateValue=false;
  activeLoader=false;
  products:any[]=[]
  images:any[]=[]
  recomendations:any[]=[]
  imageUrl: string | undefined;
file:any;
onFileSelected(event: any): void {
   this.file = event.target.files[0];
  if (this.file && this.file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageUrl = e.target?.result as string;
    };
    reader.readAsDataURL(this.file);
  } else {
    // Handle invalid file type
    console.error('Invalid file type. Please select an image.');
  }
}
async saveImage(): Promise<string> {
  try {
    const imagRef = ref(this.storage,'images/' + this.file.name);
    await uploadBytes(imagRef, this.file);

    // La imagen se ha cargado con éxito, ahora obtenemos la URL de descarga
    const downloadURL = await getDownloadURL(imagRef);

    // Devolver la URL de descarga como un string
    return downloadURL;
  } catch (error) {
    console.error(error);
    // Manejar el error según tus necesidades, podrías lanzar una excepción o devolver un mensaje de error, por ejemplo.
    return 'Error al cargar la imagen';
  }
}
reset(){
  this.formProduct.reset();
  this.formImage.reset();
  this.imageUrl='';
  this.fileInput!.nativeElement.value = '';
  this.fileInput2!.nativeElement.value = '';
  this.file=null;
}
modal = false;
isEditable=false;
openModal(action:string, product?:any) {
  if(action==='edit'){
    this.formProduct.patchValue(product);
    this.imageUrl=product.imageUrl;
    this.isEditable=true;
  }else{
    this.isEditable=false;
  }
  this.modal = true;
  const modal = document.getElementById('default-modal');
  const body = document.querySelector('body');

  // Add Tailwind classes for modal visibility and overflow
  modal!.classList.remove('hidden');
  modal!.classList.add('flex');
  body!.classList.add('overflow-hidden');

}
async saveFormImage(){
  this.activeLoader=true;
  console.log(this.formImage.value);
  if(this.file){
    this.saveImage().then(async (res)=>{
      const url=await res;
      console.log(url);
      this.formImage.get('url_image')?.setValue(url); // Fix: Set the value of imageUrl to url
      const id:string=this.formImage.get('id')?.value || '';
      this.editImage(id);
    });
}else{
  const id:string=this.formImage.get('id')?.value || '';
  this.editImage(id);
}
}

async save(){
  this.activeLoader=true;
  if(this.isEditable==false){
    this.saveImage().then(async (res)=>{
      const url= res;
      this.formProduct.get('imageUrl')?.setValue(url); // Fix: Set the value of imageUrl to url
      const response= await this.productService.addProduct(this.formProduct.value);
      if(response){
        this.activeLoader=false;
        this.file=null
       this.closeModal();
      }
    });
  }else if(this.isEditable==true){
    if(this.file){
      this.saveImage().then(async (res)=>{
        const url=await res;
        this.formProduct.get('imageUrl')?.setValue(url); // Fix: Set the value of imageUrl to url
        const id:string=this.formProduct.get('id')?.value || '';
        this.editProduct(id);
      });
  }else{
    const id:string=this.formProduct.get('id')?.value || '';
    this.editProduct(id);
  }
}
}
async saveRecomendation(index:number){
  const reponse = await this.productService.editRecomendation(this.formRecomendation.value[index]);
}
openModalImage(image:any){
  this.modal = true;
  this.formImage.patchValue(image);
  this.imageUrl=image.url_image;
  const modal = document.getElementById('modal-image');
  const body = document.querySelector('body');

  // Add Tailwind classes for modal visibility and overflow
  modal!.classList.remove('hidden');
  modal!.classList.add('flex');
  body!.classList.add('overflow-hidden');
}
async deleteProduct(id:string){
 const response=await this.productService.deleteProduct(id);
  if(response !== undefined && response !== null){
    console.log('eliminado');
  }
}
async editProduct(id:string){
  const response=await this.productService.editProduct(id,this.formProduct.value);
  console.log(response);
   if(response == undefined){
      this.activeLoader=false;
    this.closeModal();
   }
 }
 async editImage(id:string){
  const response=await this.productService.editImage(id,this.formImage.value);
   if(response == undefined){
      this.activeLoader=false;
    this.closeModalImage();
   }
 }
closeModal() {
  this.modal = false;
  const modal = document.getElementById('default-modal');
  const body = document.querySelector('body');
  modal!.classList.add('hidden');
  modal!.classList.remove('flex');
  body!.classList.remove('overflow-hidden');
  this.reset();
}
closeModalImage() {
  this.modal = false;
  const modal = document.getElementById('modal-image');
  const body = document.querySelector('body');
  modal!.classList.add('hidden');
  modal!.classList.remove('flex');
  body!.classList.remove('overflow-hidden');
  this.reset();
}
 }
