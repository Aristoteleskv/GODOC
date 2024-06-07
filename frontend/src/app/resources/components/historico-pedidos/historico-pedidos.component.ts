import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/authentication/auth.service';
import { ApiService } from '../../../core/services/api/api.service';
import { ProductService } from '../../../core/services/product.service';
 
@Component({
  selector: 'app-historico-pedidos',
  templateUrl: './historico-pedidos.component.html',
  styleUrls: ['./historico-pedidos.component.scss']
})
export class HistoricoPedidosComponent implements OnInit {
  listOfData: any[] = [
    {
      key: '1',
      name: 'Matutadidi',
      age: 32,
      address: 'Luanda',
    },
    {
      key: '2',
      name: 'Kivova',
      age: 42,
      address: 'Kilamba',
    },
    {
      key: '3',
      name: 'Aristoteles',
      age: 32,
      address: 'Golf',
    },
  ];
  user: any;
  pedidos: any[] = [];
  error = '';
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _product: ProductService
  ) {
    this.user = this._auth.getUser();
  }

  ngOnInit(): void {
    this._api.getTypeRequest(`pedidos/?userId=${this.user.user_id}`).subscribe(
      (res: any) => {
        console.log(res);
        res.data.forEach((item) => {
          this._product
            .getSingleProduct(item.product_id)
            .subscribe((product) => {
              console.log(product);
              this.pedidos.push({ ...product, ...item });
            });
        });
        // let uniqueProductsArray = Array.from(
        //   new Set(res.data.map((p) => p.product_id))
        // );
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }
}
