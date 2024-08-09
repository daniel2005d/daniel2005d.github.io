

const searchYamlUrl = '/search.yml';
  
function performSearch(query) {
  fetch(searchYamlUrl)
    .then(response => response.text())
    .then(yamlText => {
      const posts = jsyaml.load(yamlText).posts;
      const results = posts.filter(post => {
        
            return post.content.toLowerCase().includes(query.toLowerCase()) ||
                  post.title.toLowerCase().includes(query.toLowerCase());
                  
          });

      var tbody = document.getElementById('tbody');
      //var rows = table.querySelectorAll('#results tbody tr');
      while (tbody.rows.length > 0) {
        tbody.deleteRow(0);
      }

      if (results.length) {
        results.forEach(result => {

          var row = tbody.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          cell1.innerHTML = `<a href=${result.url}>${result.title}</a>`;
          
          result.tags.forEach(tag=>{
            cell2.innerHTML +=   `<span class="badge rounded-pill text-bg-warning">${tag}</span>`;
          });
          

        });
      }

      //const resultsContainer = document.getElementById('results');
     // resultsContainer.innerHTML = '';

      // if (results.length) {
      //   results.forEach(result => {
      //     const resultElement = document.createElement('div');
      //     resultElement.innerHTML = `<a href="${result.url}"><h2>${result.title}</h2></a><p>${result.content.substring(0, 150)}...</p>`;
      //     resultsContainer.appendChild(resultElement);
      //   });
      // } else {
      //   resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
      // }
    });
}

const search_box = document.getElementById('search-box');
if (search_box){
  document.getElementById('search-box').addEventListener('input', function() {
    const query = this.value;
    performSearch(query);
  });
}
