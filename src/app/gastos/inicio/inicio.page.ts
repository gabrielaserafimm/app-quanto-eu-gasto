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
    private toastController: ToastController
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
      ()       => this.onFail('Erro ao buscar a lista de gastos', () => this.listGastos())
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
      () => this.onFail('Erro ao excluir o gasto', () => this.remove(gasto)));
  }
  
  async onFail(message: string, handler: () => void){
    const toast = await this.toastController.create({
      message,
      color: 'danger',
      position: 'top',
      buttons: [
        {
          icon: 'refresh-outline',
          side: 'start',
          handler: () => handler(),
        },
        { side: 'end', icon: 'close-outline' },
      ],
    });
    toast.present();
  }     
}
