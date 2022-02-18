async function getData(){
    const response = await fetch('http://api.nobelprize.org/v1/prize.json');
    const data = await response.json();
    return data;
}
const data = getData();
const content=document.querySelector('.content');
data.then(data=>{
    console.log(data);
    console.log(data.prizes);
    data.prizes.forEach(prize=>{
      const year=prize.year;
      const category=prize.category;
      const Motivation=prize.laureates[0].motivation;
      const laureates=prize.laureates;
      const li=document.createElement('li');
      li.innerHTML=`<h3>${year}</h3>
      <h4>${category}</h4>
      <h4>${Motivation}</h4>
      <ul>
      ${laureates.map(laureate=>{
          return `<li>${laureate.firstname} ${laureate.surname}</li>`
      }).join('')}
      </ul>`;
      content.appendChild(li);
      });
  });
  const filter=document.querySelector('.filter');
  const year=document.createElement('select');
  year.innerHTML=`<option value="">Select Year</option>`;
  for(let i=1900;i<=2018;i++){
      year.innerHTML+=`<option value="${i}">${i}</option>`;
  }
  const category=document.createElement('select');
  category.innerHTML=`<option value="">Select Category</option>`;
  const Categorys=[];
  data.then(data=>{
      data.prizes.forEach(prize=>{
          if(!Categorys.includes(prize.category)){
              Categorys.push(prize.category);
              category.innerHTML+=`<option value="${prize.category}">${prize.category}</option>`;
          }
      });
  });   
  filter.appendChild(year);
  filter.appendChild(category);
  year.addEventListener('change',()=>{
      const selectedYear=year.value;
      const selectedCategory=category.value;
      content.innerHTML='';
      data.then(data=>{
          data.prizes.forEach(prize=>{
              if(prize.year==selectedYear||selectedYear==''){
                  const year=prize.year;
                  const category=prize.category;
                  const Motivation=prize.laureates[0].motivation;
                  const laureates=prize.laureates;
                  const li=document.createElement('li');
                  li.innerHTML=`<h3>${year}</h3>
                  <h4>${category}</h4>
                  <h4>${Motivation}</h4>
                  <ul>
                  ${laureates.map(laureate=>{
                      return `<li>${laureate.firstname} ${laureate.surname}</li>`
                  }).join('')}
                  </ul>`;
                  content.appendChild(li);
              }
              
          });
      });
  });
  category.addEventListener('change',()=>{
      const selectedYear=year.value;
      const selectedCategory=category.value;
      content.innerHTML='';
      data.then(data=>{
          data.prizes.forEach(prize=>{
              if(prize.category==selectedCategory||selectedCategory==''){
                  const year=prize.year;
                  const category=prize.category;
                  const Motivation=prize.laureates[0].motivation;
                  const laureates=prize.laureates;
                  const li=document.createElement('li');
                  li.innerHTML=`<h3>${year}</h3>
                  <h4>${category}</h4>
                  <h4>${Motivation}</h4>
                  <ul>
                  ${laureates.map(laureate=>{
                      return `<li>${laureate.firstname} ${laureate.surname}</li>`
                  }).join('')}
                  </ul>`;
                  content.appendChild(li);
              }
              
          });
      });
  });