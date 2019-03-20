import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from '../environments/environment';
import { ErroService } from "./topspin/services/erro.service";

@Injectable()
export class ApplicationErrorHandler implements ErrorHandler {

    constructor(private injector: Injector,
                private erroService: ErroService){}

    handleError(error: any) {
        console.log('Error handler em execução!!!')
        console.log("Status code: ", error.status);
        if (!environment.production) {
            console.log(error);
            console.log(error.status);
        }
        switch (error.status) {
            case 400:
                alert("Erro 400.")
                //this.erroService.setErroGlobal("mensagem...", error.status, "data...", 
                //                               "causa...", "path...", "stackTrace...")
                //this.erroService.setMensagem("Mensagem.....")
                //this.erroService.setStatus("Status.....")
                alert("Carregou o serviço...")
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