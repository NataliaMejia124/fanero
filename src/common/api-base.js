import { AppConfig } from "../common/appConfig";


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
            if (error.status == 401) {
                //Cerrar sesión
                throw new Error("401")
            } else if (error.status == 412) {
                //Precondition failed
                throw new Error("412")
            }
        } else {
            throw new Error("System down")
            //System down
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
            this.handleError(e);
        }
    }

    //genera una petición post
    async post(urlFromRoot, request) {
        //Obtiene el token
        let token = await this.getApiToken();
        let url = this.createUrlFromRoot(urlFromRoot);
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(request)
            })

            return await response.json();
        } catch (error) {
            this.handleError(error);
        }
    }

    //genera una petición get
    async get(urlFromRoot) {
        let token = await this.getApiToken();
        let url = this.createUrlFromRoot(urlFromRoot);
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: this.getHeaders()
            })

            return await response.json();
        } catch (error) {
            this.handleError(error);
        }
    }

    //TODO: falta agregar PUT y DELETE (son iguales al post)

}
