import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContaBancariaDestaquePage } from './conta-bancaria-destaque.page';

describe('ContaBancariaDestaquePage', () => {
  let component: ContaBancariaDestaquePage;
  let fixture: ComponentFixture<ContaBancariaDestaquePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaBancariaDestaquePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContaBancariaDestaquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
