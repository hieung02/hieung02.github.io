
// $(document).ready(function(){
//   // <!-- Script to Activate the Carousel -->        
//   $('.carousel').carousel({
//   interval: 5000 //changes the speed
//   });
// });

// setInterval( function (){
    
//     let quotebox = document.getElementById('quote');
//     let req = new XMLHttpRequest();

//     req.open('GET',"https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", true);
//     req.withCredentials = true;
//     req.onload = function(){
//         if(req.status >= 200 && req.status < 400){
//             var data = JSON.parse(req.responseText);
//             renderQuote(quotebox, data);
//         }   
//     };
//     req.send();
// }, 5000);


// function renderQuote(quotebox, quote){
//   quotebox.innerHTML = '';
//   quote = quote[0].content + '~' + quote[0].title;
//   quotebox.insertAdjacentHTML('afterbegin', quote);
// }

   



