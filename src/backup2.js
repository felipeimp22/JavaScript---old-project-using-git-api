//1º passo -------------------------------------------------------------------------------------------------------
//OBS: adiciona o nome e tudo que ta no push porem dentro do console.log
class App{
    constructor(){ 
            this.repositories =[];
            this.formEl = document.getElementById('repo-form');
            this.registerHandlers();
    }
    registerHandlers(){ // arrow function que seria function(event){}
            this.formEl.onsubmit = event => this.addRepository(event)
    }
    addRepository(event){
            event.preventDefault(); // faz com que o form nao tenha haja naturalmente carregando a pagina
            this.repositories.push({
                    nome:'Cafe',
                    description:'cafe e chocolate',
                    avatar_url:'https://vozdamatasul.com.br/wp-content/uploads/2017/12/producao-de-cafe.jpg',
                    html_url:'https://github.com/felipeimp22' //informações que vao entrar na array
            });
            console.log(this.repositories);
    }  
}
mApp = new App();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//2º  transformar itens em js e render em tela OBS: ainda fixos.

class App{
    constructor(){ 
            this.repositories =[];
            this.formEl = document.getElementById('repo-form');
            this.listEl = document.getElementById('repo-list');
            this.registerHandlers();
    }
    registerHandlers(){ // arrow function que seria function(event){}
            this.formEl.onsubmit = event => this.addRepository(event)
    }
    addRepository(event){
            event.preventDefault(); // faz com que o form nao tenha haja naturalmente carregando a pagina
            this.repositories.push({
                    name:'Cafe',
                    description:'cafe e chocolate',
                    avatar_url:'https://vozdamatasul.com.br/wp-content/uploads/2017/12/producao-de-cafe.jpg',
                    html_url:'https://github.com/felipeimp22' //informações que vao entrar na array
                    
            });
            this.render();

            }
            render(){//aqui vai ser criado os elementos em tela que ira substituir no HTML
                    this.listEl.innerHTML = ""; // apaga toda a lista
                    this.repositories.forEach( repo =>{ //foreach serve para percorrer o array recebendo cada respositorio

                    let imgEl = document.createElement('img'); // let serve para ficar reconhecida apenas dentro do escopo
                    imgEl.setAttribute('src', repo.avatar_url);

                    let titleEl = document.createElement('strong');
                    titleEl.appendChild(document.createTextNode(repo.name));

                    let descriptionEl = document.createElement('p')
                    descriptionEl.appendChild(document.createTextNode(repo.description));

                    let linkEl = document.createElement('a');
                    linkEl.setAttribute('target', '_blank');
                    linkEl.appendChild(document.createTextNode('Acessar'));

                    let listItemEl = document.createElement('li');
                    listItemEl.appendChild(imgEl);
                    listItemEl.appendChild(titleEl);
                    listItemEl.appendChild(descriptionEl);
                    listItemEl.appendChild(linkEl);

                    this.listEl.appendChild(listItemEl);
            });
    }
} 

mApp = new App();
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PASSO 3  buscando informações na API.
import api from './api';
class App{
        constructor(){ 
                this.repositories = [];
                this.formEl = document.getElementById('repo-form');
                this.inputEl = document.querySelector('input[name=repository]');
                this.listEl = document.getElementById('repo-list');
               
                this.registerHandlers();
        }
        registerHandlers(){ // arrow function que seria function(event){}
                this.formEl.onsubmit = event => this.addRepository(event)
        }
        async addRepository(event){
                event.preventDefault(); // faz com que o form nao tenha haja naturalmente carregando a pagina

                const repoInput = this.inputEl.value;
                if (repoInput.length === 0)
                return;  // o return caso o valor do input seja 0 faz com que o mesmo pare de executar e nao execute enquanto nao tenha valor.

                const response = await api.get(`/repos/${repoInput}`);  // busca o valor do input  na api 
                const {name, description, html_url, ownew:{avatar_url}} = response.data;
                this.repositories.push({
                        name,
                        description,
                        avatar_url,
                        html_url //informações que vao entrar na array
                
                });
                this.inputEl.value = ''
                this.render();

                }
                render(){//aqui vai ser criado os elementos em tela que ira substituir no HTML
                        this.listEl.innerHTML = ""; // apaga toda a lista
                        this.repositories.forEach(repo =>{ //foreach serve para percorrer o array recebendo cada respositorio

                        let imgEl = document.createElement('img'); // let serve para ficar reconhecida apenas dentro do escopo
                        imgEl.setAttribute('src', repo.avatar_url);

                        let titleEl = document.createElement('strong');
                        titleEl.appendChild(document.createTextNode(repo.name));

                        let descriptionEl = document.createElement('p')
                        descriptionEl.appendChild(document.createTextNode(repo.description));

                        let linkEl = document.createElement('a');
                        linkEl.setAttribute('target', '_blank');
                        linkEl.appendChild(document.createTextNode('Acessar'));
                        

                        let listItemEl = document.createElement('li');
                        listItemEl.appendChild(imgEl);
                        listItemEl.appendChild(titleEl);
                        listItemEl.appendChild(descriptionEl);
                        listItemEl.appendChild(linkEl);
                                

                        this.listEl.appendChild(listItemEl);
                });
        }
}

mApp = new App();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 4º  utilizando o Try e catch e fazendo  mensagem de carregamento


import api from './api';
const api2 = require('./api')
class App{
        constructor(){ 
                this.repositories = [];
                this.formEl = document.getElementById('repo-form');
                this.inputEl = document.querySelector('input[name=repository]');
                this.listEl = document.getElementById('repo-list');
               
                this.registerHandlers();
        }
        registerHandlers(){ // arrow function que seria function(event){}
                this.formEl.onsubmit = event => this.addRepository(event)
        }
                setLoading(loading = true){
                        if(loading === true){
                                let loadingEl = document.createElement('span');
                                loadingEl.appendChild(document.createTextNode('carregando'));
                                loadingEl.setAttribute('id', 'loading');
                                
                                this.formEl.appendChild(loadingEl);
                        }else{
                                document.getElementById('loading').remove(); // quando o loading atingir o false, ele e retirado
                        }
                }
        async addRepository(event){
                event.preventDefault(); // faz com que o form nao tenha haja naturalmente carregando a pagina
                
                const repoInput = this.inputEl.value;
                if (repoInput.length === 0)
                return;  // o return caso o valor do input seja 0 faz com que o mesmo pare de executar e nao execute enquanto nao tenha valor.

                this.setLoading(); // colocando a função do loading e la em baixo tirar a infromação depois de carregado
                try{
                const response = await api.get(`/repos/${repoInput}`);  // busca o valor do input  na api 
                const {name, description, html_url, owner:{avatar_url}} = response.data;
                this.repositories.push({
                        name,
                        description,
                        avatar_url,
                        html_url //informações que vao entrar na array
                
                });
                this.inputEl.value = ''
                this.render();
                }catch(error){
                        alert('o repositorio nao existe!');
                }
                this.setLoading(false); // tirando o loading da tela

                }
                render(){//aqui vai ser criado os elementos em tela que ira substituir no HTML
                        this.listEl.innerHTML = ""; // apaga toda a lista
                        this.repositories.forEach(repo =>{ //foreach serve para percorrer o array recebendo cada respositorio

                        let imgEl = document.createElement('img'); // let serve para ficar reconhecida apenas dentro do escopo
                        imgEl.setAttribute('src', repo.avatar_url);

                        let titleEl = document.createElement('strong');
                        titleEl.appendChild(document.createTextNode(repo.name));

                        let descriptionEl = document.createElement('p')
                        descriptionEl.appendChild(document.createTextNode(repo.description));

                        let linkEl = document.createElement('a');
                        linkEl.setAttribute('target', '_blank');
                        linkEl.appendChild(document.createTextNode('Acessar'));
                        

                        let listItemEl = document.createElement('li');
                        listItemEl.appendChild(imgEl);
                        listItemEl.appendChild(titleEl);
                        listItemEl.appendChild(descriptionEl);
                        listItemEl.appendChild(linkEl);
                                

                        this.listEl.appendChild(listItemEl);
                });
        }
}

const mApp = new App();