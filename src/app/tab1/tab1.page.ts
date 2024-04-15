import { Component, OnInit, createComponent } from '@angular/core';
import { GithubService } from './service/tab1.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { AlertService } from '../core/services';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  username: string = '';
  retornoApi: any;

  constructor(
    private loadingController: LoadingController,
    private alertService: AlertService,
    private boredApi: GithubService,
    private http: HttpClient
  )
    {
    }

  traduziActivity(dados: any) {
    const url = `https://api.mymemory.translated.net/get?q=${dados.activity}&langpair=en|pt`; // Traduz de inglês para português

    return this.http.get(url).subscribe((response: any) => {
      if (response && response.responseData && response.responseData.translatedText) {
        this.retornoApi = dados;
        this.retornoApi.activity = response.responseData.translatedText;
        return true;
      }
      return true;
    });
  }

  async onSearch() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    console.log("Entrou");
    this.username = this.username ? this.username : '';
    const observable = this.boredApi.getUser(this.username);
    observable.subscribe(
      (dados) => {
        if (this.traduziActivity(dados)){
          loading.dismiss();
        } else {
          this.alertService.error('Erro ao tentar traduzir a API');
        };
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Erro ao tentar consumir a API');
      }
    );
  }
}
