const URL_FETCH_CATEGORIES = 'https://api.chucknorris.io/jokes/categories'

const BASE_URL = 'https://api.chucknorris.io/jokes/'
const METHOD = 'GET'
const CONTENT_TYPE = 'application/json'
const MODE = 'cors'

var loader = document.getElementById('loader')
var root = document.getElementById('root')

var formSearch = document.getElementById('search-form')

function addJoke(joke){
    loader = ""
    root.innerHTML += `<div class="joke-box">
    <img id="avatar" src="${joke.icon_url}" alt="">
    <p id="joke">${joke.value}</p>
    </div>`
}

async function getJoke(category){
    loader.innerHTML = `<img src="assets/img/loader.gif" alt="loader" >`
    root.innerHTML = ""
    const joke = await getRandomJokeFromCategory(category)
    addJoke(joke)

}
async function getJoke(){
    loader.innerHTML = `<img src="assets/img/loader.gif" >`
    root.innerHTML = ""
    const joke = await getRandomJoke()
    addJoke(joke)
}

async function getJokeByQuery(query){
    try{
        const response = await fetch(`${BASE_URL}search?query=${query}`,{
            methood: METHOD,
            mode: MODE,
            headers:{
                'Content-Type': CONTENT_TYPE,
            }
        })
        return await response.json();
    }catch (error){
        console.log(error);
    }
}

async function getRandomJoke(){
    try{
        const response = await fetch(`${BASE_URL}random`,{
            methood: METHOD,
            mode: MODE,
            headers:{
                'Content-Type': CONTENT_TYPE,
            }
        })
        return await response.json();
    }catch (error){
        console.log(error);
    }
}

// busca de piada randomica apartir de uma categoria
async function getRandomJokeFromCategory(category){
    try{
        const response = await fetch(`${BASE_URL}random?category=${category}`,{
            methood: METHOD,
            mode: MODE,
            headers:{
                'Content-Type': CONTENT_TYPE,
            }
        })
        return await response.json();
    }catch(error){
        console.log(error);
    } 
}

async function getCategories(){
    try{
        const response = await fetch(`${BASE_URL}categories`,{
            methood: METHOD,
            mode: MODE,
            headers:{
                'Content-Type': CONTENT_TYPE,
            }
        })
        return categories = await response.json()
    }catch(error){
        console.log(error)
    }
}

async function builMenu(){
    try{
        let nav = document.getElementById('categories')
        let categories = await getCategories()
        
        categories.forEach(category => {
            let li = document.createElement('li')
            li.setAttribute('value',category)
            li.setAttribute('onclick',`getJoke('${category}')`)
            li.innerHTML = category
            nav.appendChild(li)
        });
        
    }catch(error){
        console.log(error)
    }
}

formSearch.addEventListener('submit',async function(e){
    e.preventDefault()
    loader.innerHTML = `<img src="assets/img/loader.gif" >`
    let query = document.getElementById('theme-input').value
    let jokes = await getJokeByQuery(query)
    jokes.result.forEach(joke => {
        addJoke(joke)
    })
})


builMenu()
getJoke()