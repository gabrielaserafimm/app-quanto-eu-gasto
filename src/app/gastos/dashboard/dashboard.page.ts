import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Gasto } from '../gastos.model';
import { GastosService } from '../gastos.service';
import { MessageService } from 'src/app/services/message.service';
import  Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements 
OnInit, 
OnDestroy,
ViewWillEnter,
ViewDidEnter,
ViewWillLeave,
ViewDidLeave, 
AfterViewInit {

@ViewChild ('pieCanvas') private pieCanvas: ElementRef;
pieChart: any;

gastos: Gasto[] = [];
loading = false;
private graficoChart: Chart

constructor(
  private alertController: AlertController,
  private gastosService: GastosService,
  private messageService: MessageService,
  private ref: ChangeDetectorRef
) {
    this.gastos = [];
  }
  ngAfterViewInit() {
    this.graficoCharts();
  }

  ngOnInit() {
    this.ref.detectChanges();
    this.graficoCharts();
  }
  
  ionViewWillEnter(): void {
    this.listGastos();
    console.log('DashboardPage ionViewWillEnter');
  }
  
  ionViewDidEnter(): void {
    console.log('DashboardPage ionViewDidEnter');
  }
  
  ionViewWillLeave(): void {
    console.log('DashboardPage ionViewWillLeave');
  }
  
  ionViewDidLeave(): void {
    console.log('DashboardPage ionViewDidLeave');
  }
  
  ngOnDestroy(): void {
    console.log('DashboardPage ngOnDestroy');
  }
  
  listGastos(){
    this.loading = true;
    this.gastosService.getGastos().pipe(finalize(() => {
    this.loading = false;
    }))
    .subscribe(
      (gastos) => (this.gastos = gastos),
      () => 
      this.messageService.error('Erro ao buscar a lista de gastos', () => this.listGastos()
      )
    );
  }   
    
confirmRemove(gasto: Gasto) {
  this.alertController
  .create({
    header: 'Exclusão',
    message: `Você deseja excluir o gasto <b>${gasto.nome}</b>?`,
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
  this.loading = true;
  this.gastosService.remove(gasto.id).subscribe(
    () => {
      this.messageService.success(`O gasto ${gasto.nome} foi excluído com sucesso!`);
      this.listGastos();
    },
    () => { this.messageService.error('Erro ao excluir o gasto', () => this.remove(gasto));
    this.loading = false;
    });
  }

  graficoCharts(){        
    const gGastos = this.gastos.filter(gastos => gastos.valor > 0)
    const cores = [
      '#ffc409',
      '#eb445a',
      '#3dc2ff',
      '#92949c',
      '#2fdf75'
    ];
    
    let i = -1;    
    const gCores = gGastos.map(() => cores[(i = (i + 1) % cores.length)]);
    
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: gGastos.map(gastos => gastos.nome),
        datasets: [{
          data: gGastos.map(gastos => gastos.valor),
          backgroundColor: gCores,
          borderColor: gCores,
          borderWidth: 1
        }]
      },
      options: {}
    });
    this.pieChart.destroy();
  }    
}
  