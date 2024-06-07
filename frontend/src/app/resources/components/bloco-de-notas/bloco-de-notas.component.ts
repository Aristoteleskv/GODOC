import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Task } from '../interfaces/task.interface';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-bloco-de-notas',
  templateUrl: './bloco-de-notas.component.html',
  styleUrl: './bloco-de-notas.component.scss'
})
export class BlocoDeNotasComponent implements OnInit {
  public tasks: any[] = [];
  public myForm = this.fb.group({
    name: ['', Validators.required],
    cor: ['', Validators.required],
  });
  public editTaskValue: string = '';
  public editTaskValueCor: string = '';
  isVisible = false;
  constructor(private socketService: NotificationService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.socketService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      console.info( this.tasks);
    });
    this.socketService.listen();
  }

  public getTasks(): void {
    this.socketService.getTasks().subscribe((data: any) => {
      this.tasks.push(data);
    });
  }
  public createTask(): void {
    this.socketService.createTask(this.myForm.value.name, this.myForm.value.cor  as string);
    this.myForm.reset();
  }
  public deleteTask(id: string): void {
    this.socketService.deleteTask(id);
  }
  public completeTask(id: string): void {
    this.socketService.completeTask(id)
  }
  public call(task: Task) {
    this.editTaskValue = task.name;
    this.editTaskValueCor =  task.cor;
  }
  public updateTask(id: string, newName: string, newcor: string) {
    this.editTaskValue = newName,
    this.editTaskValueCor =  newcor
    this.socketService.updateTask(id, newName, newcor)
  }



 
// Função para abrir o modal do arquivo específico
Updat(note): void {
  // Adiciona a propriedade 'isVisible' ao objeto 'file', se ela não existir
  if (note.isVisible === undefined) {
    note.isVisible = false;
  } else {
    note.isVisible = !note.isVisible; // Alterna a visibilidade
  }
}

// Função para fechar o modal do arquivo específico
handOk(note: { isVisible: boolean; }): void {
  if (note.isVisible !== undefined) {
    note.isVisible = false;
  }
}

// Função para fechar o modal do arquivo específico
handCancel(note: { isVisible: boolean; }): void {
  if (note.isVisible !== undefined) {
    note.isVisible = false;
  }
}

  
}

