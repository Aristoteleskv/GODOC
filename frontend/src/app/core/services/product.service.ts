import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Produtos, Produto, Categoria } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl;
  private urll = environment.apiUrll;
  private urli = environment.categoriaUrl;

  constructor(private http: HttpClient, private _api: ApiService) { }

  getAllProducts(limitOfResults = 9, page): Observable<Produtos> {
    return this.http.get<Produtos>(this.urll, {
      params: {
        limit: limitOfResults.toString(),
        page: page,
      },
    });
  }

  getSingleProduct(id: string|number): Observable<any> {
    console.log(id);
    return this._api.getTypeRequest('products/' + id);
  }

  registo(product: Produto): Observable<Produtos> {
    return this._api.postTypeRequest('products/registo', {
      usersid: product.usersid,
      title: product.title,
      description: product.description,
      short_desc: product.short_desc,
      quantidade:  product.quantidade,
      cat_id: product.cat_id,
      price: product.price,
      image: product.image,
    });
  }

  //modificar product
  update(product: Produto): Observable<Produto> {
    const url = `${this.urll}/${product.id}`;
    return this.http.put<Produto>(url, product);
  }
  //modificar product
  editar(id: number, product: Produto): Observable<Produto> {
    const url = `${this.urli}/${product.id}`;
    return this.http.put<Produto>(url, product);
  }

  //eliminar product
  deleteproduct(id: number): Observable<Produto> {
    const url = `${this.urll}/${id}`;
    return this.http.delete<Produto>(url);
  }


//categoria
  //ler categoria
  read(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urli);
  }

  //modificar categoria
  edit(id: number, product: Produto): Observable<Produto> {
    const url = `${this.urli}/${product.id}`;
    return this.http.put<Produto>(url, product);
  }

  //eliminar categoria
  deletecategoria(id: number): Observable<Produto> {
    const url = `${this.urli}/${id}`;
    return this.http.delete<Produto>(url);
  }
}
