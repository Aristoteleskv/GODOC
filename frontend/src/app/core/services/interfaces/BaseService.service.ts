import { Inject, Injectable, OnDestroy } from "@angular/core";
import InterfaceService from "./Interface.service";
import { Subscription, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ApiService } from "../api/api.service";

@Injectable({
    providedIn: 'root',
})
export class BaseService implements InterfaceService, OnDestroy {

    private sub!: Subscription;
    public base: string = "";
    constructor(
        public httpApi: ApiService,
        @Inject('BASE_URL') public url: string
    ) {
        this.base = `${environment.api_url_by_version}${this.url}`;
    }

    listarUm(id: any): Observable<any> {
        return this.httpApi
            .get(`${this.base}/${id}`)
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                map((response: any): any => {
                    return response.object;
                })
            );
    }

    listar(options: any): Observable<any> {
        return this.httpApi
            .get(this.base, options)
            .pipe(
                debounceTime(500),
                map((response: any): any => {
                    return response.object;
                })
            );
    }

    listarTodos(options: any): Observable<any> {
        return this.httpApi
            .get(this.base, options)
            .pipe(
                debounceTime(500),
                map((response: any): any => {
                    return response.object;
                })
            );
    }
 

    registar(formulario: any): Observable<any> {
        return this.httpApi
            .post(this.base, formulario)
            .pipe(
                debounceTime(500),
                map((response: any): any => {
                    return response.object;
                })
            );
    }

    editar(formulario: any, id: any): Observable<any> {
        return this.httpApi
            .put(`${this.base}/${id}`, formulario)
            .pipe(
                debounceTime(500),
                map((response: any): any => {
                    return response.object;
                })
            );
    }

    eliminar(id: any): Observable<any> {
        return this.httpApi
            .delete(`${this.base}/${id}`)
            .pipe(
                debounceTime(500),
                map((response: any): Object => {
                    return Object(response).object;
                })
            );
    }

    ngOnDestroy() {
        this.sub!.unsubscribe();
    }
}
