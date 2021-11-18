import { Injectable, EventEmitter } from '@angular/core';
import { Cursos } from './cursos.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  _emitirCursoCriado = new EventEmitter <Cursos> ();

  constructor(private http: HttpClient) { }
  readonly baseUrl = 'https://localhost:44302/api/Cursoes';
  formData: Cursos = new Cursos ();
  list: Cursos[];

  postCurso () {
    this._emitirCursoCriado.emit (this.formData);
    return this.http.post(this.baseUrl, this.formData);

  }

  putCurso () {
    return this.http.put(`${this.baseUrl}/${this.formData.cursoId}`, this.formData);

  }

  deleteCurso (id: number) {
    return this.http.delete (`${this.baseUrl}/${id}`);

  }

  refreshList () {
    this.http.get (this.baseUrl)
    .toPromise ()
    .then(res => this.list = res as Cursos[]);
  }

}
