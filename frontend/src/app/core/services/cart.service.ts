import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification'; 
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartData = {
    products: [],
    total: 0,
  };

  cartDataObs$ = new BehaviorSubject(this.cartData);

  constructor(
    private _notification: NzNotificationService,
    private _api: ApiService
  ) {
    let localCartData = JSON.parse(localStorage.getItem('cart'));
    if (localCartData) this.cartData = localCartData;

    this.cartDataObs$.next(this.cartData);
  }

  submitCheckout(userId, cart) {
    return this._api.postTypeRequest('pedidos/create', {
      userId: userId,
      cart: cart,
    });
  }

  addProduct(params): void {
    const { id, price, quantidade, image, title, maxQuantidade } = params;
    const product = { id, price, quantidade, image, title, maxQuantidade };

    if (!this.isProductInCart(id)) {
      if (quantidade) this.cartData.products.push(product);
      else this.cartData.products.push({ ...product, quantidade: 1 });
    } else {
// copia o array, encontra o índice do item e atualiza
      let updatedProducts = [...this.cartData.products];
      let productIndex = updatedProducts.findIndex((prod) => prod.id == id);
      let product = updatedProducts[productIndex];

// se não houver quantidade, incrementa
      if (quantidade) {
        updatedProducts[productIndex] = {
          ...product,
          quantidade: quantidade,
        };
      } else {
        updatedProducts[productIndex] = {
          ...product,
          quantidade: product.quantidade + 1,
        };
      }

      console.log(updatedProducts);
      this.cartData.products = updatedProducts;
    }

    this.cartData.total = this.getCartTotal();
    this._notification.create(
      'sucesso',
      'Produto adicionado ao carrinho',
      `${title} foi adicionado com sucesso ao carrinho`
    );
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  updateCart(id: number, quantidade: number): void {
 // copia o array, encontra o índice do item e atualiza
    let updatedProducts = [...this.cartData.products];
    let productIndex = updatedProducts.findIndex((prod) => prod.id == id);

    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      quantidade: quantidade,
    };

    this.cartData.products = updatedProducts;
    this.cartData.total = this.getCartTotal();
    this.cartDataObs$.next({ ...this.cartData });
    console.log(this.cartData.products);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  removeProduct(id: number): void {
    let updatedProducts = this.cartData.products.filter(
      (prod) => prod.id !== id
    );
    this.cartData.products = updatedProducts;
    this.cartData.total = this.getCartTotal();
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));

    this._notification.create(
      'sucesso',
      'Removido com sucesso',
      'O item selecionado foi removido do carrinho com sucesso'
    );
  }

  clearCart(): void {
    this.cartData = {
      products: [],
      total: 0,
    };
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  getCartTotal(): number {
    let totalSom = 0;
    this.cartData.products.forEach(
      (prod) => (totalSom += prod.price * prod.quantidade)
    );

    return totalSom;
  }

  isProductInCart(id: number): boolean {
    return this.cartData.products.findIndex((prod) => prod.id === id) !== -1;
  }
}
