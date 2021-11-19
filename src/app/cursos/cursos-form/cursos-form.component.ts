import { CursosService } from './../../shared/cursos.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cursos } from 'src/app/shared/cursos.model';
import { ThisReceiver } from '@angular/compiler';
import { LogsService } from '../../shared/logs.service';
import { Logs } from 'src/app/shared/logs.model';



@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  constructor(
    public service: CursosService,
    private toastr: ToastrService,
    public refresh: CursosService,
    public log: LogsService
    ) { }
  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.cursoId == 0) {
      this.insertRecordCurso(form);
     /*  this.insertRecordLog (); */
      this.service.refreshList();
      /* this.log.refreshList(); */

    }

    else {
      this.updateRecordCurso(form);
      /* this.updateRecordLog (); */
      this.service.refreshList();
      /* this.log.refreshList(); */

    }

  }


  check() {
    //Função que checa as condições estabelecidades com relação às datas

    let data1 = (<HTMLInputElement>document.getElementById('validationServer02')).value;
    let data2 = (<HTMLInputElement>document.getElementById('validationServer03')).value;
    let descricao = (<HTMLInputElement>document.getElementById('validationServer01')).value;


    this.service.list.forEach((fs) => {
      if (descricao.toLocaleLowerCase() == fs.descricao.toLocaleLowerCase() && this.service.formData.cursoId == 0) {

        alert("Erro: Curso já cadastrado!");
        (<HTMLInputElement>document.querySelector('#submit')).disabled = true;
        (<HTMLInputElement>document.getElementById("#validationServer02")).className = "is-invalid";

      }

      if (data1 == fs._Data_ini.substring(0, 10) && this.service.formData.cursoId == 0) {

        /* <---- curso_1 -----> */
        /* <-------------curso2-----> */

        /* Em casos de inicios iguais */
        alert("Existe(m) curso(s) planejados(s) dentro do período informado. (Primeiro caso)");
        (<HTMLInputElement>document.querySelector('#submit')).disabled = true;
        (<HTMLInputElement>document.getElementById("#validationServer02")).className = "is-invalid";


      } else if (data1 > fs._Data_ini.substring(0, 10) && data1 < fs._Data_fin.substring(0, 10) && data2 >= fs._Data_fin && this.service.formData.cursoId == 0) {

        alert("Existe(m) curso(s) planejado(s) dentro do período informado. (Segundo caso)");
        (<HTMLInputElement>document.querySelector('#submit')).disabled = true;
        (<HTMLInputElement>document.getElementById("#validationServer02")).className = "is-invalid";
        /* <---- curso1 --------> */
        /*     <-----curso2---------> */
        /*  Em casos em que o curso 2 começa ainda dentro do período do curso 1*/


      } else if (data1 < fs._Data_fin.substring(0, 10) && data1 >= fs._Data_ini.substring(0, 10) && this.service.formData.cursoId == 0) {

        alert("Existe(m) curso(s) planejado(s) dentro do período informado. (Terceiro caso)");
        (<HTMLInputElement>document.querySelector('#submit')).disabled = true;
        (<HTMLInputElement>document.getElementById("#validationServer02")).className = "is-invalid";
        /*      <---- curso1 --------> */
        /*<-----curso2---------> */
        /*  Em casos em que o curso 1 começa ainda dentro do período do curso 2*/



      } else if (data1 < fs._Data_ini.substring(0, 10) && data2 > fs._Data_ini.substring(0, 10) && this.service.formData.cursoId == 0) {

        /*<-------curso1-------> */
        /*  <------curso2---->  */
        /* Em casos em que um novo curso for cadastrado em um período completamente abrangente ao outro */
        alert("Existe(m) curso(s) planejado(s) dentro do período informado. (Quarto caso)");
        (<HTMLInputElement>document.querySelector('#submit')).disabled = true;
        (<HTMLInputElement>document.getElementById("#validationServer02")).className = "is-invalid";


      }

    });
  }
  updateRecordLog () {
    this.log.putLog().subscribe
    (
      res => {
        this.log.formLog = new Logs();
        this.log.formLog.user = 1;
        let data_inc = new Date ();
        data_inc = new Date(data_inc.getFullYear() + '-' + (data_inc.getMonth() + 1) + '-' + (data_inc.getDate() + 1));
        console.log (data_inc.toString());
        /* this.log.formLog.dtInclusao = data_inc.toString(); */
        this.log.refreshList();
        console.log ("Relatório gerado.");
      },
      err => {console.log(err)}
    )
  }



  insertRecordLog () {
    this.log.postLog().subscribe
    (
      res => {
        this.log.formLog = new Logs();
        this.log.formLog.user = 1;
        let data_inc = new Date ();
        data_inc = new Date(data_inc.getFullYear() + '-' + (data_inc.getMonth() + 1) + '-' + (data_inc.getDate() + 1));
        console.log (data_inc.toString());
     /*    this.log.formLog.dtInclusao = data_inc.toString();
        this.log.refreshList();
        console.log ("Relatório gerado."); */
      },
      err => {console.log(err)}
    )
  }

  insertRecordCurso(form: NgForm) {
    this.service.postCurso().subscribe
    (
        res => {
          this.resetForm(form);
          this.service.refreshList();
          this.toastr.success('Curso criado com sucesso.',
            'Plataforma de cursos')
        },
        err => { console.log(err) }
      )
    this.service.refreshList();
  }

  updateRecordCurso(form: NgForm) {
    this.service.putCurso().subscribe
      (
        res => {
          this.resetForm(form);
          this.service.refreshList();
          this.toastr.success('Curso editado com sucesso', 'Plataforma de cursos')
        },
        err => { console.log(err); }
      );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Cursos();
  }


}
