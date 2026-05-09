const AccsesKey = "zL0_9QiXEOmSd1kJum3ZQZiZzpnpYQqd1S-yauUd9EU"

const SearchForm = document.getElementById('BoxForm')
const FormInput = document.getElementById('InputBox')
const SearchResult = document.getElementById('SearchResult')
const ShowMoreBTN = document.getElementById('ShowMore')
const Search = document.getElementById('InputBTN')

let keyword = ""
let page = 1;

async function SearchEngine() {

    keyword = FormInput.value.trim(); // .trim() removes accidental spaces

    if (keyword === "") {
        SearchResult.innerHTML = "<p>Please type something to search...</p>";
        ShowMoreBTN.style.display = "none";
        return; 
    }
    ShowMoreBTN.innerText = "Loading...";

    keyword = FormInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${AccsesKey}&per_page=12`;

    const response = await fetch(url)
    const data = await response.json()


    if(page === 1){
        SearchResult.innerHTML = ""
    }

    const Results = data.results;


    if(Results.length == 0) {
        SearchResult.innerHTML = "<p>Sorry, there is no image by this name.<br>Search somthing else.</p>";
        ShowMoreBTN.style.display = "none"
        return;
    }

    Results.map((result)=>{
        const image = document.createElement('img')
        image.src = result.urls.small;
        const imgA = document.createElement('a')
        imgA.href = result.links.html;
        imgA.target = "_blank";
        imgA.appendChild(image);
        SearchResult.appendChild(imgA);
    })
    ShowMoreBTN.style.display = "block"
    ShowMoreBTN.innerText = "Show More";
    if (Results.length < 12) {
        ShowMoreBTN.style.display = "none";
    } else {
        ShowMoreBTN.style.display = "block";
    }
}


SearchForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    page = 1
    SearchEngine()
})


ShowMoreBTN.addEventListener('click',()=>{
    page++
    SearchEngine()
})

Search.addEventListener('click',()=>{
    page = 1
    SearchEngine()
})