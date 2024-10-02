

const searchYamlUrl = '/search.yml';
const indexYamlUrl = '/index.yml';

function bindResults(results){
  var tbody = document.getElementById('tbody');
  while (tbody.rows.length > 0) {
    tbody.deleteRow(0);
  }

  if (results.length) {
    results.forEach(result => {
    
      var row = tbody.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = `<a href=${result.url}>${result.title}</a>`;
      cell3.innerHTML = result.date;
      if (result.tags){
        result.tags.forEach(tag=>{
          cell2.innerHTML +=   `<span class="badge rounded-pill text-bg-warning">${tag}</span>`;
        });
      }
      
      

    });
  }
}

function performSearch(query) {
  fetch(searchYamlUrl)
    .then(response => response.text())
    .then(yamlText => {
      const posts = jsyaml.load(yamlText).posts;
      const results = posts.filter(post => {
        
            return post.content.toLowerCase().includes(query.toLowerCase()) ||
            post.title.toLowerCase().includes(query.toLowerCase());
                  
          });

          bindResults(results);

     
    });
}

const search_box = document.getElementById('search-box');
if (search_box){
  fetch(searchYamlUrl)
  .then(response => response.text())
  .then(yamlText => {
    var tbody = document.getElementById('tbody');
    const posts = jsyaml.load(yamlText).posts;
   
    bindResults(posts);

    
  })


  document.getElementById('search-box').addEventListener('input', function() {
    const query = this.value;
    performSearch(query);
  });
}
