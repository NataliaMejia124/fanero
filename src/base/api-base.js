import { AppConfig } from "../common/appConfig";
import toastr from 'toastr'


//clase base para las peticiones HTTP
export class ApiBase {

    //Token temporal que genera el backend
    token = '';

    //Url base del endpoint (ya está validado el ambiente que usará)
    baseUrl = AppConfig.API_URL;

    //Simplemente concatena la url base con la especifica 
    createUrlFromRoot(relativeUrl) {
        return `${this.baseUrl}/${relativeUrl}`;
    }

    //Retorna un objeto con los headers
    getHeaders() {
        return {
            'Accept': 'application/json; odata=verbose',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${this.token}` || ''
        };
    }

    //Maneja los estados http retornados en las peticiones 
    //aun no se ha validado que debe hacer cada caso
    handleError(error) {
        if (error.status) {
            switch (error.status) {
                case 400:
                    toastr.error("Bad request", "Algo está mal con la petición");
                    throw new Error("400")
                case 401:
                    //Cerrar sesión
                    throw new Error("401")
                case 404:
                    toastr.error("", "Datos incorrectos");
                    throw new Error("400")
                case 412:
                    //Precondition failed
                    throw new Error("412")
                case 500:
                    toastr.error(error.statusText)
                    throw new Error("500")
            }
        } else {
            toastr.error("System down")
        }
    }

    //Obtiene el token temporal 
    async getApiToken() {
        let url = this.createUrlFromRoot('AuthToken');
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    Key: AppConfig.KEY,
                    ApiKey: AppConfig.API_KEY
                })
            })
            this.handleError(response);
            response = await response.json();
            this.token = response.apiTkn;
            return response;
        } catch (e) {
            //this.handleError(e);
        }
    }

    //genera una petición post
    async post(urlFromRoot, request) {
        //Obtiene el token
        await this.getApiToken();
        let url = this.createUrlFromRoot(urlFromRoot);
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(request)
            })
            this.handleError(response);
            return await response.json();
        } catch (error) {
            //this.handleError(error);
        }
    }

    //genera una petición get
    async get(urlFromRoot) {
        await this.getApiToken();
        let url = this.createUrlFromRoot(urlFromRoot);
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: this.getHeaders()
            })
            this.handleError(response);
            return await response.json();
        } catch (error) {
            //this.handleError(error);
        }
    }

    //TODO: falta agregar PUT y DELETE (son iguales al post)

}
