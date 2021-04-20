//TODO: importar .env si es que se debe usar 
export class AppConfig {    

    //____________Start App Config
    static ENVIRONMENTS = {
        PRODUCTION : 0,
        DEVELOPMENT : 1,
        QA : 2
    }

    //Set environment 
    static API_ENVIRONMENT = this.ENVIRONMENTS.DEVELOPMENT;

    //Esto debería ir en .env?
    static KEY = "5ruZbbcSkA8nXd6ddxfgvbd4Ur4YGsXX";
    static API_KEY = "rmmQ5jtTB9Up5ZqR34s5NcqkV8U4EHMyuFq57ThuYjvaLnanTDKTBWqVQnRH4Urh7VwFZHKL5vatC5vW2XsJ7rC7MVsDC5WT9zNAG4uxjcXZHYVfqBZJXD7XRwwT8jt6";
    
    //Registrar todas las url para los diferentes ambientes.
    static apiUrls = (() =>  {
        let urls = {};
        // Cambiar y agregar las url cuando se tengan los demás ambientes 
        urls[this.ENVIRONMENTS.DEVELOPMENT] = 'https://faneroapi.azurewebsites.net/api';
        urls[this.ENVIRONMENTS.QA] = 'https://faneroapi.azurewebsites.net/api'; 
        return urls;
    })();

    //Establecer el ambiente para iniciar la app
    static API_URL = this.apiUrls[this.API_ENVIRONMENT];
}

