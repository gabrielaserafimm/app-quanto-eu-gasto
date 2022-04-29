import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { ContaBancariaDestaqueService } from '../conta-bancaria-destaque.service';
import { ContaBancaria } from '../conta-bancaria.model';

@Component({
  selector: 'app-conta-bancaria-destaque',
  templateUrl: './conta-bancaria-destaque.page.html',
  styleUrls: ['./conta-bancaria-destaque.page.scss'],
})
export class ContaBancariaDestaquePage implements 
OnInit,
ViewWillEnter {

  loading = false;
  contaBancaria: ContaBancaria[];

  constructor(private contaBancariaDestaque: ContaBancariaDestaqueService) {}

  ngOnInit() {
    this.loadDestaque();
  }

  ionViewWillEnter(): void {
    this.loadDestaque();
    console.log('ContaBancariaDestaquePage ionViewWillEnter');
  }

  loadDestaque(){
    this.loading = true;
    this.contaBancariaDestaque.getDestaques().subscribe((contaBancaria) => {
      this.contaBancaria = contaBancaria;
      this.loading = false;
    });
  }

  remove(contaBancaria: ContaBancaria) {
    this.contaBancariaDestaque.remove(contaBancaria);
    this.loadDestaque();
  }
}
