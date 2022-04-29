import { Component, OnInit } from '@angular/core';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { ContaBancaria } from './conta-bancaria.model';
import { ContaBancariaService } from './conta-bancaria.service';
import { ContaBancariaDestaqueService } from './conta-bancaria-destaque.service';
import { MessageService } from 'src/app/services/message.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-conta-bancaria',
  templateUrl: './conta-bancaria.page.html',
  styleUrls: ['./conta-bancaria.page.scss'],
})
export class ContaBancariaPage implements 
OnInit,
ViewWillEnter {
  
  contaBancaria: ContaBancaria[];
  loading = false;
  
  constructor(
    private alertController: AlertController,
    private ContaBancariaService: ContaBancariaService,
    private ContaBancariaDestaqueService: ContaBancariaDestaqueService,
    private messageService: MessageService
  ) {
    this.contaBancaria = [];
  }
    
  ngOnInit() {
    console.log('ContaBancariaPage ngOnInit');
  }

  ionViewWillEnter(): void {
    this.loadContaBancaria();
    console.log('ContaBancariaPage ionViewWillEnter');
  }
  
  ionViewDidEnter(): void {
    console.log('ContaBancariaPage ionViewDidEnter');
  }
  
  ionViewWillLeave(): void {
    console.log('ContaBancariaPage ionViewWillLeave');
  }
  
  ionViewDidLeave(): void {
    console.log('ContaBancariaPage ionViewDidLeave');
  }
  
  ngOnDestroy(): void {
    console.log('ContaBancariaPage ngOnDestroy');
  }
    
  loadContaBancaria() {
    this.loading = true;
    this.ContaBancariaService.findAll()
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe((contaBancaria) => (this.contaBancaria = contaBancaria),
    () => 
      this.messageService.error('Erro ao buscar lista de contas bancárias', () =>
      this.loadContaBancaria()
    )
    );
  }  
    
  confirmRemoveConta(contaBancaria: ContaBancaria) {
    this.alertController
    .create({
      header: 'Exclusão',
      message: `Você deseja excluir a conta <b>${contaBancaria.nome}</b>?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.removeConta(contaBancaria),
        },
        {
          text: 'Não',
        },
      ],
    })
    .then((alert) => alert.present());
  }
    
  removeConta(contaBancaria: ContaBancaria) {
    this.loading = true;
    this.ContaBancariaService.removeConta(contaBancaria.id).subscribe(
      () => {
        this.messageService.success(`Excluído a conta bancária ${contaBancaria.nome} com sucesso!`);
        this.loadContaBancaria();
      },
      () => { 
        this.messageService.error('Erro ao excluir a conta bancária', () => this.removeConta(contaBancaria)
        );
        this.loading = false;
      }
    );
  } 
      
  addDestaque(contaBancaria: ContaBancaria) {
    this.ContaBancariaDestaqueService.add(contaBancaria); 
  }   
}
