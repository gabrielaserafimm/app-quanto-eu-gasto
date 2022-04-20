import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ContaBancaria } from './conta-bancaria.model';
import { ContaBancariaService } from './conta-bancaria.service';

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
    private ContaBancariaService: ContaBancariaService
  ) {}

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
  async add() {
    const alert = await this.alertController.create({
      header: 'Cadastro de Conta Bancária',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome',
        },
        {
          name: 'conta',
          placeholder: 'Conta',
        },
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