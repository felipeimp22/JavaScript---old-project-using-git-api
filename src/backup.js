
    import api from './api';

    /* ApiReq = Api requisition
        El = elements exemple inputEl = inputElements
        Repo = repositories
    
    */
    class ApiReq{
        constructor(){
            
            this.repositories = [];
            this.formEl = document.getElementById('repo-form');
            this.inputEl = document.querySelector('input[name=repository]')
            this.listEl = document.getElementById('repo-list');
            this.registerHandlers();
        }
        registerHandlers(){
            this.formEl.onsubmit = (event) => this.addRepository(event);
            }
        
            //Loading while requisition works
            setLoading(loading = true){
                if(loading === true){
                    let loadingEl = document.createElement('span');
                    loadingEl.appendChild(document.createTextNode('carregando'));
                    loadingEl.setAttribute('id', 'loading');
                    this.formEl.appendChild(loadingEl);
                }else{
                    document.getElementById('loading').remove();
                }
            }
    
    async addRepository(event) {
        
        event.preventDefault();
    
        const repoInput = this.inputEl.value;
        // If you dont give some comand for sistem its stop
        if(repoInput.length === 0)
        return;
    
        this.setLoading();
        //doing requisition for Api
        try{
        const response = await api.get(`/repos/${repoInput}`);
        
        // API destructuring
        const {name, description, html_url, owner:{avatar_url}} = response.data;
    
        this.repositories.push({
            name,
            description,
            avatar_url,
            html_url
        });
    
        this.inputEl.value = '';
    
        this.render()
        }catch(error){
            alert('requisition error',error);
        }
        this.setLoading('false');
     }
    
     render(){
         this.listEl.innerHTML = "";
    
         this.repositories.forEach(repo =>{
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);
    
            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));
    
            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));
            
            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.appendChild(document.createTextNode('Acessar'));
            linkEl.setAttribute('href', repo.html_url);
    
            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);
    
                this.listEl.appendChild(listItemEl);
                
        });
       
     }
     
    }
    const mAPI = new ApiReq();
    

    /*Axios.get('https://jsonplaceholder.typicode.com/todos')
.then(Response =>{
    document.getElementById('oi').innerHTML =Response.data[0].title;
}).catch(error) */





/*function oi(){
    txt = {nome:"felipe", idade:21 };

    document.getElementById('bb').innerHTML = txt.idade;
}

oi();*/
