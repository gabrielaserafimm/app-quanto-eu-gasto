import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { GastosService } from '../gastos.service';
import { Gasto, Mes, MetodoPagamento } from '../gastos.model';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements
    OnInit,
    OnDestroy,
    ViewWillEnter,
    ViewDidEnter,
    ViewWillLeave,
    ViewDidLeave
{
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gastosService: GastosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('AdicionarPage ngOnInit');
    this.form = this.formBuilder.group({
      id:[''],
      nome: ['', Validators.required],
      metod_pag: ['Cartão de Crédito',Validators.required],
      valor: [0.1, Validators.required],
      data: ['', Validators.required],
      mes: ['Novembro', Validators.required],
    });

    const id = +this.activatedRoute.snapshot.params.id;    
    if(id){
     this.gastosService.findById(id).subscribe((gasto) =>{
        if(gasto){
        this.form.patchValue({
          ...gasto,
        });
      }
    });
  }
}
ionViewWillEnter(): void {
  console.log('AdicionarPage ionViewWillEnter');
}

ionViewDidEnter(): void {
  console.log('AdicionarPage ionViewDidEnter');
}

ionViewWillLeave(): void {
  console.log('AdicionarPage ionViewWillLeave');
}

ionViewDidLeave(): void {
  console.log('AdicionarPage ionViewDidLeave');
}

ngOnDestroy(): void {
  console.log('AdicionarPage ngOnDestroy');
}
  salvar() {
    this.gastosService.save(this.form.value).subscribe(() => this.router.navigate(['adicionar']));
    this.router.navigate(['/tabs/inicio']);
  } 
}
