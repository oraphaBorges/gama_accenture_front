(function(){
    var flickerKey = 'a79dbdd1d24bbdf97f202f74ff0b63ec'
    var flickerBaseURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key='
    var sufixURL = 'q'

    function getPhotos(searchTerm){
        var URL = `${flickerBaseURL}${flickerKey}&text=${searchTerm}`

        return(
            fetch(URL)
                .then(response => response.json())
                .then(data => data.photos.photo)
        )
    }
    
    var app = document.querySelector('#app')
    var searchForm = app.querySelector('.search-form')
    var searchTerm = app.querySelector('.search-input')
    var results = app.querySelector('#results')
    
    function creatFlickrThumb(photoData){
        var link = document.createElement('a')
        link.setAttribute('href',photoData.large)
        link.setAttribute('target','_blank')    
        
        var image = document.createElement('img')
        image.setAttribute('src',photoData.thumb)
        image.setAttribute('alt',photoData.title)

        link.appendChild(image)
        return link
    }

    searchForm.addEventListener('submit', function(e){
        e.preventDefault()
        var filter = searchTerm.value;
        results.innerHTML = `<h2>Carregando... ${filter}</h2>`

        getPhotos(filter)
            .then(function(result){
                results.innerText = ''
                result.forEach(function(photo){
                    var url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
                    var thumbnail = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sufixURL}.jpg`

                    var item = creatFlickrThumb({
                        thumb:thumbnail,
                        large:url,
                        title:photo.title
                    })
                    results.appendChild(item)
                })
            })
    })

}())