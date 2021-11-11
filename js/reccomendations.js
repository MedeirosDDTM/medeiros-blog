function shuffleArray(array) {
    var indice_atual = array.length, valor_temporario, indice_aleatorio;

    while (0 !== indice_atual) {

        indice_aleatorio = Math.floor(Math.random() * indice_atual);
        indice_atual -= 1;

        valor_temporario = array[indice_atual];
        array[indice_atual] = array[indice_aleatorio];
        array[indice_aleatorio] = valor_temporario;
    }

    return array;
}

fetch('../../index.json').then(res=>res.json()).then(json=>loadFeed(json));
function loadFeed(json) {
    const relateContainerOutput = [];
    const postReadingOutput = [];
    const currentTitle = document.querySelector('#post-header h1').innerText;
    const filteredArray = json.filter(i=>i.title!==currentTitle);
    const shuffledArray = shuffleArray(filteredArray);
    for (let item of shuffledArray.slice(0, 8)) {
        relateContainerOutput.push(`
        <a href="${item.permalink}">${item.title}</a>
    `)}
    for (let item of shuffledArray.slice(8, 12)) {
        postReadingOutput.push(`
        <div class="card">
            <a href="${item.permalink}"><img src="${item.permalink}imgs/thumb.jpg" /></a><br/>
            <div class="caption">
                <a href="${item.permalink}">${item.title}</a><br/>
            </div>
        </div>
    `)}
    document.getElementById('related-container').innerHTML = relateContainerOutput.join('<hr/>');
    document.getElementById('posts-list').innerHTML = postReadingOutput.join('');            
}