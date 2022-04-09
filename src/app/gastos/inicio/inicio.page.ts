import { Component,OnDestroy, OnInit } from '@angular/core';
import {
AlertController, 
ToastController,
ViewDidEnter, 
ViewDidLeave, 
ViewWillEnter,
ViewWillLeave,
} from '@ionic/angular';
import { Gasto, MetodoPagamento, Mes } from '../gastos.model';
import { MessageService } from 'src/app/services/message.service';
import { GastosService } from '../gastos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements
OnInit, 
OnDestroy,
ViewWillEnter,
ViewDidEnter,
ViewWillLeave,
ViewDidLeave {

  gastos: Gasto[];

  constructor(
    private alertController: AlertController,
    private gastosService: GastosService,
    private messageService: MessageService
  ) {
    this.gastos = [];
  }
  
  ngOnInit() {
    console.log('InicioPage ngOnInit');
  }

  ionViewWillEnter(): void {
    this.listGastos();
    console.log('InicioPage ionViewWillEnter');
  }

  ionViewDidEnter(): void {
    console.log('InicioPage ionViewDidEnter');
  }

  ionViewWillLeave(): void {
    console.log('InicioPage ionViewWillLeave');
  }

  ionViewDidLeave(): void {
    console.log('InicioPage ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('InicioPage ngOnDestroy');
  }

  listGastos(){
    this.gastosService.getGastos().subscribe(
      (gastos) => this.gastos = gastos,
      () => this.messageService.error('Erro ao buscar a lista de gastos', () => this.listGastos())
    );
  }  

  confirmRemove(gasto: Gasto) {
    this.alertController
      .create({
        header: 'Exclusão',
        message: `Você deseja excluir o gasto ${gasto.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.remove(gasto),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alert) => alert.present());
  }

  remove(gasto: Gasto) {
    this.gastosService.remove(gasto.id)
      .subscribe(
      () => {
        this.listGastos();
      },
      () => this.messageService.error('Erro ao excluir o gasto', () => this.remove(gasto)));
  }   
}
