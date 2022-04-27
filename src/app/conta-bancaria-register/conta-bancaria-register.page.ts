import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ContaBancaria } from '../conta-bancaria/conta-bancaria.model';
import { ContaBancariaService } from '../conta-bancaria/conta-bancaria.service';
import { GastosService } from '../gastos/gastos.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-conta-bancaria-register',
  templateUrl: './conta-bancaria-register.page.html',
  styleUrls: ['./conta-bancaria-register.page.scss'],
})
export class ContaBancariaRegisterPage implements
OnInit,
OnDestroy,
ViewWillEnter,
ViewDidEnter,
ViewWillLeave,
ViewDidLeave
{
form: FormGroup;
loading = false;

constructor(
private formBuilder: FormBuilder,
private gastosService: GastosService,
private router: Router,
private activatedRoute: ActivatedRoute,
private messageService: MessageService,
private contaBancariaService: ContaBancariaService
) {}

ngOnInit() {
console.log('ContaBancariaRegisterPage ngOnInit');

  this.form = this.formBuilder.group({
    id:[''],
    nomeConta: ['', Validators.required],
    cpf: ['', Validators.required], 
    banco: ['', Validators.required],       
    agencia: ['', Validators.required],
    conta: ['', Validators.required],

  });

  const id = +this.activatedRoute.snapshot.params.id;    
  if(id){
    this.findById(id);
  }
}

findById(id: number){
this.contaBancariaService.findById(id).subscribe(
  (conta) => {
    if (conta) {
      this.form.patchValue({
        ...conta,
      });
    }
  },
  () => this.messageService.error(`Erro ao buscar a conta bancária com o código <b>${id}</b>`,() => this.findById(id))
);

}
ionViewWillEnter(): void {
console.log('ContaBancariaRegisterPage ionViewWillEnter');
}

ionViewDidEnter(): void {
console.log('ContaBancariaRegisterPage ionViewDidEnter');
}

ionViewWillLeave(): void {
console.log('ContaBancariaRegisterPage ionViewWillLeave');
}

ionViewDidLeave(): void {
console.log('ContaBancariaRegisterPage ionViewDidLeave');
}

ngOnDestroy(): void {
console.log('ContaBancariaRegisterPage ngOnDestroy');
}

salvarConta() {
  const { nomeConta } = this.form.value;
  this.loading = true;
  
  this.contaBancariaService.save(this.form.value).pipe(finalize(() => {
    this.loading = false;
  })
  )      
  .subscribe(
    () => {
      this.messageService.success(`A conta bancária ${nomeConta} foi salvo sucesso!`);
      this.router.navigate(['tabs/conta-bancaria']);
    },
    () =>
    this.messageService.error(`Erro ao salvar a nova conta bancária <b>${nomeConta}</b>`, () =>
    this.salvarConta()
    )
    ); 
  }
}
