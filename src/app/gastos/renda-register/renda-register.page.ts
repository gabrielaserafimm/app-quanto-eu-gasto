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

  constructor(
    private formBuilder: FormBuilder,
    private gastosService: GastosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    console.log('RendaRegisterPage ngOnInit');
    this.form = this.formBuilder.group({
      id:[''],
      nomeRenda: ['', Validators.required],
      descricao: ['', Validators.required],
      metod_pag: ['Cartão de Crédito',Validators.required],
      valor: [0.1, Validators.required],
      data: ['', Validators.required],
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
