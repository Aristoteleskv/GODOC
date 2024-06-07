class File { constructor(file) {
    this.title= file.title; this.url = file.url;
    this.sharedWith = []; // Array de objetos { email: String, permission: 'view' I 'edit' }
    }
    
  // Adicionar destinatario com permissao 
  share(email, permission) {
this.sharedWith.push({ email, permission});
}
}
