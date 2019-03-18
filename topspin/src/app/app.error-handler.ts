import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from '../environments/environment';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private injector: Injector){
        super()
    }

    handleError(error: any) {
        console.log('Error handler em execução!!!')
        if (!environment.production) {
            console.error(error);
        }
        const httpErrorCode = error.status;
        console.log("Status error: ", httpErrorCode)
        
        //const message = errorResponse.error.message
        //console.log('Erro: ', errorResponse.status)
        switch (error.status) {
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
        super.handleError(error)
    }

}