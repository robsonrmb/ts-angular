import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from '../environments/environment';
import { ErroService } from "./topspin/services";

@Injectable()
export class ApplicationErrorHandler implements ErrorHandler {

    constructor(private injector: Injector,
                private erroService: ErroService){}

    handleError(error: any) {
        console.log('Error handler em execução!!!')
        console.log("Status code: ", error.status);
        console.log("Stack Trace: ", error.stackTrace)
        if (!environment.production) {
            console.log(error);
        }
        switch (error.status) {
            case 400:
                alert("Erro 400.")
                this.erroService.setErroGlobal(error.mensagem, 
                                               error.status, 
                                               error.dada, 
                                               error.causa, 
                                               error.path, 
                                               error.stackTrace)

                this.erroService.setMensagem("Mensagem.....")
                this.erroService.setStatus("Status.....")
                this.erroService.setData("Data.....")
                this.erroService.setCausa("Causa.....")
                this.erroService.setPath("Path.....")
                this.erroService.setStackTrace("Stack Trace.....")
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