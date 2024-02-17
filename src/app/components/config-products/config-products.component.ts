import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import AOS from 'aos';
import { productService } from '../../service/product.service';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { error } from 'console';

@Component({
  selector: 'app-config-products',
  templateUrl: `./config-products.component.html`,
  styleUrl: './config-products.component.css',
})
export class ConfigProductsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private productService:productService, private storage:Storage) {}
  ngOnInit() {
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
  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }
  validateValue=false;
  activeLoader=false;
  products:any[]=[]
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
  this.imageUrl='';
  this.fileInput!.nativeElement.value = '';
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
async save(){
  this.activeLoader=true;
  if(this.isEditable==false){
    this.saveImage().then(async (res)=>{
      const url=await res;
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
closeModal() {
  this.modal = false;
  const modal = document.getElementById('default-modal');
  const body = document.querySelector('body');

  // Add Tailwind classes for modal visibility and overflow
  modal!.classList.add('hidden');
  modal!.classList.remove('flex');
  body!.classList.remove('overflow-hidden');
  this.reset();
}
 }
