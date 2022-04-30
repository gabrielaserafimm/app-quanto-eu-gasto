import { Component, OnInit } from '@angular/core';
import { GastosService } from '../gastos.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  labelGastos = [];
  gastos = [];
  dados = [];
  total = 0;
  i = 0;
  pieChart: any;

  constructor(
    private gastosService: GastosService ) {}

  async ngOnInit() {
    await this.getPieCharts();
  }

  async getPieCharts() {    
    
    this.gastosService.findAll().subscribe(async response => {
      this.gastos = response;
      response.forEach(gasto => {
        this.labelGastos.push(gasto.nome.split(" ")[0])
      });

    let dadosGrafico = [];
    this.gastosService.findAll().subscribe(response => {
      this.gastos.forEach(gasto => {dadosGrafico.push(gasto.valor)})

      this.dados = dadosGrafico;

      for (
        var i = 0, 
        total = 0; i < this.dados.length;
        this.total += this.dados[i++]
      );

      const ctx = <HTMLCanvasElement>document.getElementById('pieCanvas');
      const chartData = {
        labels: this.labelGastos,
          datasets: [{
            label: 'Gasto X Valor',
            data: this.dados,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
            borderColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
            borderWidth: 1
          }]
        };
        this.pieChart = new Chart(ctx.getContext('2d'), {
          type: 'bar',
          data: chartData
        });
    });
  });    
  };

}