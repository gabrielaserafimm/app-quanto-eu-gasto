import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ContaBancaria } from './conta-bancaria.model';
import { ContaBancariaService } from './conta-bancaria.service';
import { ContaBancariaDestaqueService } from './conta-bancaria-destaque.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-conta-bancaria',
  templateUrl: './conta-bancaria.page.html',
  styleUrls: ['./conta-bancaria.page.scss'],
})
export class ContaBancariaPage implements OnInit {
  
  contaBancaria: ContaBancaria[];
  loading = false;
  
  constructor(
    private alertController: AlertController,
    private ContaBancariaService: ContaBancariaService,
    private ContaBancariaDestaqueService: ContaBancariaDestaqueService,
    private messageService: MessageService,
  ) {
    this.contaBancaria = [];
  }
    
  ngOnInit() {
    this.loadContaBancaria();
  }
    
  loadContaBancaria() {
    this.loading = true;
    this.ContaBancariaService.findAll().subscribe((contaBancaria) => {
      console.log(contaBancaria);
      this.loading = false;
      this.contaBancaria = contaBancaria;
    });
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
    this.ContaBancariaService.removeConta(contaBancaria.id)
    .subscribe(
      () => {
        this.loadContaBancaria();
      },
      () => this.messageService.error('Erro ao excluir a conta', () => this.removeConta(contaBancaria))
    );
  } 
      
  addDestaque(contaBancaria: ContaBancaria) {
    this.ContaBancariaDestaqueService.add(contaBancaria); 
  }

  async add() {
    const alert = await this.alertController.create({
      cssClass: 'secondary',
      header: 'Cadastro de Conta Bancária',      
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome',
        },        
        {
          name: 'cpf',
          placeholder: 'CPF',
        },
        {
          name: 'banco',
          placeholder: 'Banco',
        },        
        {
          name: 'agencia',
          placeholder: 'Agência',
        },
        {
          name: 'conta',
          placeholder: 'Conta',
        }
      ],
      buttons: [
        {
          text: 'Salvar',
          handler: (value) => {
            this.loading = true;
            this.ContaBancariaService.save(value).subscribe(() => this.loadContaBancaria());
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
    alert.present();      
  }    
}
