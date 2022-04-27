import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { MessageService } from '../../services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { GastosService } from '../gastos.service';
import { ContaBancaria } from '../../conta-bancaria/conta-bancaria.model';
import { ContaBancariaService } from '../../conta-bancaria/conta-bancaria.service';

@Component({
  selector: 'app-renda-register',
  templateUrl: './renda-register.page.html',
  styleUrls: ['./renda-register.page.scss'],
})
export class RendaRegisterPage implements
    OnInit,
    OnDestroy,
    ViewWillEnter,
    ViewDidEnter,
    ViewWillLeave,
    ViewDidLeave
{
  form: FormGroup;
  contas: ContaBancaria[];

  constructor(
    private formBuilder: FormBuilder,
    private gastosService: GastosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private contaBancariaService: ContaBancariaService
  ) {}

  ngOnInit() {
    console.log('RendaRegisterPage ngOnInit');

    this.contaBancariaService.findAll().subscribe((contas) => this.contas = contas);
    
    this.form = this.formBuilder.group({
      id:[''],
      nomeRenda: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: [0.1, Validators.required],
      data: ['', Validators.required],
      contas: [[]],
    });

    const id = +this.activatedRoute.snapshot.params.id;    
    if(id){
      this.findByIdRenda(id);
    }
  }

  findByIdRenda(id: number){
    this.gastosService.findByIdRenda(id).subscribe(
      (renda) => {
        if (renda) {
          this.form.patchValue({
            ...renda,
          });
        }
      },
      () => this.messageService.error(`Erro ao buscar a renda com o código <b>${id}</b>`,() => this.findByIdRenda(id))
    );
  }
  ionViewWillEnter(): void {
    console.log('RendaRegisterPage ionViewWillEnter');
  }

  ionViewDidEnter(): void {
    console.log('RendaRegisterPage ionViewDidEnter');
  }

  ionViewWillLeave(): void {
    console.log('RendaRegisterPage ionViewWillLeave');
  }

  ionViewDidLeave(): void {
    console.log('RendaRegisterPage ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('RendaRegisterPage ngOnDestroy');
  }

  compareWith(o1: ContaBancaria, o2: ContaBancaria | ContaBancaria[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: ContaBancaria) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }

  salvarRenda() {
    const { nomeRenda } = this.form.value;
    this.gastosService.saveRenda(this.form.value).subscribe(
      () => this.router.navigate(['tabs/renda-list']),
      () =>
      this.messageService.error(`Erro ao salvar a nova renda <b>${nomeRenda}</b>`, () =>
        this.salvarRenda()
      )
    ); 
  }
}
