

const searchYamlUrl = '/search.yml';
const indexYamlUrl = '/index.yml';

function bindResults(results){
  var tbody = document.getElementById('posts');
  
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
            let ul_element = document.createElement('ul');
            ul_element.className="function-list";

            result.tags.forEach(tag=>{
                let il_element = document.createElement('li');
                let a_element  = document.createElement('a');
                a_element.textContent = tag;
                a_element.href="#";
                il_element.appendChild(a_element);
                ul_element.appendChild(il_element);
                //il_element.className="list-group-item";
                //         ul_element.appendChild(section_element);
            //   <ul class="function-list">

            //   {%for tag in post.tags%}
            //   {%if tag and tag !=""%}
            //   <li>
            //     <a href="#">{{tag}}</a>
            //   </li>
            //   {%endif%}
            //   {%endfor%}
            // </ul>
             // cell2.innerHTML +=   `<ul class="function-list">`;
            });
            cell2.appendChild(ul_element);
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
let sections = [];

// if (search_box){
//   fetch(searchYamlUrl)
//   .then(response => response.text())
//   .then(yamlText => {
//     var tbody = document.getElementById('tbody');
//     const posts = jsyaml.load(yamlText).posts;
//     bindResults(posts);

//     posts.forEach(result => {
//       let section = result.section;
//           if (section){
//             if (!sections.includes(section)){
//               sections.push(section);
//             }
            
//           }
    
//     });
    
//     let ul_element = document.getElementById('sections');

//       sections.forEach(section=>{
//         const section_element = document.createElement('li');
//         section_element.textContent = section;
//         section_element.className="list-group-item";
//         ul_element.appendChild(section_element);
//       });

//   })


//   document.getElementById('search-box').addEventListener('input', function() {
//     const query = this.value;
//     performSearch(query);
//   });
// }
