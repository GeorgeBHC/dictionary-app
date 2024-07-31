document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            if (data.title) {
                resultsDiv.innerHTML = `<p>No results found for "${query}".</p>`;
            } else {
                data[0].meanings.forEach(meaning => {
                    const card = document.createElement('div');
                    card.className = 'card mb-3';
                    card.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${data[0].word}</h5>
                            <p class="card-text">${meaning.partOfSpeech}: ${meaning.definitions[0].definition}</p>
                        </div>
                    `;
                    resultsDiv.appendChild(card);
                });
            }
        })
        .catch(error => console.error('Error:', error));
});



