import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private injector: Injector){
        super()
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        console.log('Error handler em execução!!!')
        if (errorResponse instanceof HttpErrorResponse) {
            console.log('Entrou!!!')
            const message = errorResponse.error.message
            console.log('Erro: ', errorResponse.status)
            switch (errorResponse.status) {
                case 401:
                    //Direcionar para uma página de erro.  
                    this.injector.get(Router).navigate(['/login'])
                    break;
                case 403:
                    //Direcionar para uma página de erro.
                    this.injector.get(Router).navigate(['/dashboard'])
                    break;
                case 404:
                    //Direcionar para uma página de erro.
                    console.log('404 em execução!!!')
                    this.injector.get(Router).navigate(['/dashboard'])
                    break;
            }
        }
        super.handleError(errorResponse)
    }

}