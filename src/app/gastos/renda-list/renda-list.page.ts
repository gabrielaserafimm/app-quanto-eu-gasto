import { Component,OnDestroy, OnInit } from '@angular/core';
import {
AlertController, 
ToastController,
ViewDidEnter, 
ViewDidLeave, 
ViewWillEnter,
ViewWillLeave,
} from '@ionic/angular';
import { Renda } from '../gastos.model';
import { MessageService } from 'src/app/services/message.service';
import { GastosService } from '../gastos.service';

@Component({
  selector: 'app-renda-list',
  templateUrl: './renda-list.page.html',
  styleUrls: ['./renda-list.page.scss'],
})
export class RendaListPage implements
OnInit, 
OnDestroy,
ViewWillEnter,
ViewDidEnter,
ViewWillLeave,
ViewDidLeave {

  rendas: Renda[];
  loading = false;

  constructor(
    private alertController: AlertController,
    private gastosService: GastosService,
    private messageService: MessageService
  ) {
    this.rendas = [];
  }
  
  ngOnInit() {
    console.log('RendaListPage ngOnInit');
  }

  ionViewWillEnter(): void {
    this.listRendas();
    console.log('RendaListPage ionViewWillEnter');
  }

  ionViewDidEnter(): void {
    console.log('RendaListPage ionViewDidEnter');
  }

  ionViewWillLeave(): void {
    console.log('RendaListPage ionViewWillLeave');
  }

  ionViewDidLeave(): void {
    console.log('RendaListPage ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('RendaListPage ngOnDestroy');
  }

  listRendas(){
    this.loading = true;
    this.gastosService.getRendas().subscribe(
      (rendas) => {
        this.rendas = rendas
        this.loading = false;
      },
      () => {
        this.messageService.error('Erro ao buscar a lista de rendas', () => this.listRendas())
        this.loading = false;
      }
    );
  }  

  confirmRemoveRenda(renda: Renda) {
    this.alertController
      .create({
        header: 'Exclusão',
        message: `Você deseja excluir a renda <b>${renda.nomeRenda}</b>?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.removeRenda(renda),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alert) => alert.present());
  }

  removeRenda(renda: Renda) {
    this.gastosService.removeRenda(renda.id)
      .subscribe(
      () => {
        this.listRendas();
      },
      () => this.messageService.error('Erro ao excluir a renda', () => this.removeRenda(renda)));
  }   
}
