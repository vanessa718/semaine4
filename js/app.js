console.log("hello");
// you will also have to setup the referring domains on your marvel developer portal
var PRIV_KEY = "";
var PUBLIC_KEY = "";

function getMarvelResponse() {

  // you need a new ts every request                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  
  // the api deals a lot in ids rather than just the strings you want to use
  //var characterId = '1009718'; // wolverine                                                                             


  var url = 'http://gateway.marvel.com:80/v1/public/comics?format=comic';

  console.log(url);
  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    //characters: characterId
  })

  .done(function( response ) {
   console.log(response.data)
   var results = response.data.results;
   var resultsLen = results.length;
   var output = '<ul>'; 


//=====je demande de récupérer via get/ajax les infos de mon fichier users.mst 
//           en lui donnant le chemin==== 
   $.get('template/users.mst',function(template){
//=====je "parse" au format de Mustache====
    Mustache.parse(template)
//====je fais une var rendu et demande à Mustache de rendre les 
//          résultats ici de ma var results puisque var results = response.data.results    
    var rendered = Mustache.render(template,{results:results})
//====.append me rend les résultats(rendu) grâce à la <div id="target">====    
    $('#target').append(rendered)
	})





     // for(var i=0; i<resultsLen; i++){
     //   if(results[i].images.length > 0) {
     //     var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
     //     output += '<li><img src="' + imgPath + '"><br>'+results[i].title+'</li>';
     //   }
     // }  
     // output += '</ul>'
     // $('#results').append(output);
 });

}
getMarvelResponse();


//var template = $('#template').html()
//Mustache.parse(template)
//var rendered = Mustache.render(template, {info : [{name:"Allan", job: "formateur"},{name:"Jordan", job: "formateur"},{name:"Thomas", job: "formateur"},]})
//$("#target").html(rendered);