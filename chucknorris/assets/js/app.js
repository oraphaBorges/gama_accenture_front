const URL_FETCH_CATEGORIES = 'https://api.chucknorris.io/jokes/categories'

const BASE_URL = 'https://api.chucknorris.io/jokes/'
const METHOD = 'GET'
const CONTENT_TYPE = 'application/json'
const MODE = 'cors'


async function getJoke(category){
    const joke = await getRandomJokeFromCategory(category)

    let imgNode = document.getElementById('avatar')
    let jokeParagraph = document.getElementById("joke")

    imgNode.src = joke.icon_url
    jokeParagraph.innerHTML = joke.value

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
        const response = await fetch(`${BASE_URL}random?catgory=${category}`,{
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

