import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from '../environments/environment';
import { ErroService } from "./topspin/services";

@Injectable()
export class ApplicationErrorHandler implements ErrorHandler {

    constructor(private injector: Injector,
                private erroService: ErroService){}

    handleError(error: any) {
        if (!environment.production) {
            console.log(error);
        }
        switch (error.status) {
            case 400:
                let json = JSON.parse(error._body);
                this.erroService.setErroGlobal(error.mensagem, 
                                               error.status, 
                                               error.dada, 
                                               error.causa, 
                                               error.path, 
                                               error.stackTrace)

                this.erroService.setMensagem(json.msgs)
                this.erroService.setStatus(json.status)
                this.erroService.setData(json.date)
                this.erroService.setCausa(json.causa)
                this.erroService.setPath(json.path)
                this.erroService.setStackTrace(json.stackTrace)

                this.injector.get(Router).navigate(['/erro-global'])
                break;
            case 401:
                //Direcionar para uma página de erro.

                this.injector.get(Router).navigate(['/login'])
                break;
            case 404:
                //Direcionar para uma página de erro.
                this.injector.get(Router).navigate(['/erro-global'])
                break;
        }
        //handleError(error)
    }

}