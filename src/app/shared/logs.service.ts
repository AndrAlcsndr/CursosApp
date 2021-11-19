import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logs } from './logs.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  _emitirCursoCriado = new EventEmitter<Logs>();

  constructor(private http: HttpClient) { }
  readonly baseUrl = 'https://localhost:44302/api/Logs';
  formLog: Logs = new Logs();
  listlogs: Logs[];

  postLog() {
    this._emitirCursoCriado.emit(this.formLog);
    return this.http.post(this.baseUrl, this.formLog);

  }

  putLog() {
    return this.http.put(`${this.baseUrl}/${this.formLog.logId}`, this.formLog);

  }

  deleteLog(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);

  }
  refreshList() {
    this.http.get(this.baseUrl).subscribe((res: any) => {

      this.listlogs = res as Logs[];
    }
      /* .then(res => this.list = res as Cursos[]); */
    )
  }
    /* refreshList () {
      this.http.get (this.baseUrl)
      .toPromise ()
      .then(res => this.list = res as Cursos[]);
    } */
}
