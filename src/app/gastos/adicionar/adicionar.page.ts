import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { MessageService } from '../../services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
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
  loading = false;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private gastosService: GastosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
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
        this.findById(id);
      }
    }
    
    findById(id: number){
      this.loading = true;
      this.gastosService.findById(id).pipe(finalize(() => {
        this.loading = false;
      })
      ).subscribe((gasto) => {
        if (gasto) {
          this.form.patchValue({
            ...gasto,
          });
        }
      },
      () => this.messageService.error(`Erro ao buscar o gasto com o código <b>${id}</b>`,() => this.findById(id))
      );
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
      const { nome } = this.form.value;
      this.loading = true;
      
      this.gastosService.save(this.form.value).pipe(finalize(() => {
        this.loading = false;
      })
      )      
      .subscribe(
        () => {
          this.messageService.success(`O gasto ${nome} foi salvo sucesso!`);
          this.router.navigate(['tabs/inicio']);
        },
        () =>
        this.messageService.error(`Erro ao salvar o novo gasto <b>${nome}</b>`, () =>
        this.salvar()
        )
        ); 
      }
    }
    