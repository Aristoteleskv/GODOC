import { Component, OnInit } from '@angular/core';
import { WebcamInitError, WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  title = 'camaraapp';

  // Hacer Toogle on/off
  public mostrarWebcam = true;
  public permitirCambioCamara = true;
  public multiplesCamarasDisponibles = false;
  public dispositivoId: string;
  public opcionesVideo: MediaTrackConstraints = {
    //width: {ideal: 1024};
    //height: {ideal: 576}
  }

  // Errores al iniciar la cámara
  public errors: WebcamInitError[] = [];

  // Ultima captura o foto
  public imagenWebcam: WebcamImage = null;

  // Cada Trigger para una nueva captura o foto
  public trigger: Subject<void> = new Subject<void>();

  // Cambiar a la siguiente o anterior cámara
  private siguienteWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  Users: any;

  constructor(
    private userService: UserService  ) {

  }
  // Update user fields with current details
  ngOnInit() {

    this.userService.getUser()
    .subscribe({
      next: (data) => {
          this.Users = data;
    },
      error: error => {
        return error;
      }
  });


  WebcamUtil.getAvailableVideoInputs()
  .then((mediaDevices: MediaDeviceInfo[]) => {
    this.multiplesCamarasDisponibles = mediaDevices && mediaDevices.length > 1;
  });
  }

  public triggerCaptura(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.mostrarWebcam = !this.mostrarWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOnDeviceId: boolean|string): void {
    this.siguienteWebcam.next(directionOnDeviceId);
  }

  public handleImage(imagenWebcam: WebcamImage): void {
    console.info('Imagen de la webcam recibida: ', imagenWebcam);
    this.imagenWebcam = imagenWebcam;
  }

  public cameraSwitched(dispositivoId: string): void {
    console.log('Dispositivo Actual: ' + dispositivoId);
    this.dispositivoId = dispositivoId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.siguienteWebcam.asObservable();
  }
}
