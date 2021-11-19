import { CursosService } from './../shared/cursos.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cursos } from '../shared/cursos.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  baseURL = 'https://localhost:44302/api/Cursoes';
  constructor(
    public service: CursosService,
    private toastr: ToastrService,
    private http: HttpClient,

  ) { }
  private _filtroLista: string = '';
  public cursosFiltrados: any = [];
  public cursos: any;

  public get filtroLista(): string {
    return this._filtroLista;

  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.cursosFiltrados = this.filtroLista ? this.filtrarCursos(this.filtroLista) : this.cursos;
  }

  autoDate(fs: Cursos) {
    //Metodo que garante que os campos de datas sejam preenchidos corretamente
    let data_ini = this.service.formData._Data_ini.substring(0, 10).split('/').reverse().join('-');
    let data_fin = this.service.formData._Data_fin.substring(0, 10).split('/').reverse().join('-');
    (<HTMLInputElement>document.querySelector('#validationServer02')).value = data_ini;
    (<HTMLInputElement>document.querySelector('#validationServer03')).value = data_fin;


    /* this.service.list.forEach((fs) =>{
      if (fs._Data_fin.substring(0,10)<data_atual.toString()) {
        alert ("Este curso ja foi realizado e, por isso, não pode ser excluído.");
        (<HTMLInputElement>document.querySelector('#Excluir')).disabled= true;

      }

    }) */


  }

  checkCursoPassado (){
    let data_fin = this.service.formData._Data_fin.substring(0, 10).split('/').reverse().join('-');
    var data_atual = new Date();
    data_atual = new Date(data_atual.getFullYear() + '-' + (data_atual.getMonth() + 1) + '-' + (data_atual.getDate() + 1));
    if (data_fin<data_atual.toString()){
      (<HTMLInputElement>document.querySelector('#Excluir')).disabled= true;
      alert ("Este curso ja foi realizado e, por isso, não pode ser excluído.");

    }
    else {
      this.onDeleteCurso(this.service.formData.cursoId);

    }

  }


  filtrarCursos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.cursos.filter((cursos: { descricao: string; _Data_ini: string; _Data_fin: string }) =>
      cursos.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      || cursos._Data_ini.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      || cursos._Data_fin.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
    //Só da para pesquisar pelo ano. Consertar isso
  }

  ngOnInit(): void {
    this.getCurso();
    this.service.refreshList();


  }
  getCurso() {
    this.http.get(this.baseURL).subscribe(response => {
      this.cursos = response; this.cursosFiltrados = this.cursos
    },
      error => { console.log(error) }
    )
  }

  populateForm(selectedRecord: Cursos) {
    this.service.formData = Object.assign({}, selectedRecord);


  }

  onDeleteCurso(id: number) {
    if (confirm('Tem certeza que deseja excluir este curso ?')) {
      this.service.deleteCurso(id).subscribe(res => {
        this.service.refreshList ();
        this.toastr.error("Curso excluído com sucesso.", "Cursos registrados");
        this.service.formData.cursoId = 0;
      }, err => { console.log(err) }
      )
    }
  }

}
