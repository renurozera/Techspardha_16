  $(document).ready(function () {
     var url = "";
     $.getJSON("/events/username",function(user){
       //alert(result.uname);
       if(user.uname == "gawds"){
         url = "/events";
       }
       else{
         url = "/events/currentUser";
       }
       generateEvents(url);
     });
   });

   function generateEvents(url){
     $.getJSON(url, function( data ) {
       var tr;
       for (var i=0; i<data.length; i++){
         tr = $('<tr/>');
         var eventId = data[i]._id;
         tr.append("<td>" + data[i].nameOfEvent + "</td>");
         console.log(data[i].description.length);
         if(data[i].description.length < 20){
           tr.append("<td>" + data[i].description + '<br/><button  class="showMore" onclick="getDescription('+ data[i]._id+')" data-toggle="modal" data-target="#descModel">Show</button>'+"</td>");
         }
         else{
           var str = data[i].description.substring(10,15);
           console.log(str);
           tr.append("<td>" + str + '<br/><button style="font-size:15px,font-family:verdana" class="showMore" onclick="getDescription('+ data[i]._id+')" data-toggle="modal" data-target="#descModel">Show</button>'+"</td>");
         }
         if(data[i].rules.length < 20){
           tr.append("<td>" + data[i].rules + '<br/><button class="showMore" onclick="getRules('+ data[i]._id+')" data-toggle="modal" data-target="#descModel">Show</button>'+"</td>");
         }
         else{
           var strg = data[i].rules.substring(10,15);
           tr.append("<td>" + strg + '<br/><button class="showMore" onclick="getRules('+ data[i]._id+')" data-toggle="modal" data-target="#descModel">Show</button>'+"</td>");
         }
       // .append("<td>"+ data[i].rules +"</td>")
       tr.append("<td>" + data[i].dateOfEvent + "</td>");
       tr.append("<td>" + data[i].timeOfEvent + "</td>");
       tr.append("<td>" + data[i].venue + "</td>");
       tr.append("<td>" + data[i].coordinator_1 + "</td>");
       tr.append("<td>" + data[i].coordinator_2 + "</td>");
       tr.append("<td>" + data[i].phoneno_1 + "</td>");
       tr.append("<td>" + data[i].phoneno_2 + "</td>");
       tr.append("<td>" + data[i].category+ "</td>");
       tr.append("<td>" + data[i].reference_url + "</td>");
     // tr.append("<td>" + '<a href="/events/updateEvent/' + data[i].nameOfEvent + '"class="btn btn-primary" data-toggle="modal" role="button"> Update </a>'          + "</td>");
      tr.append("<td>"+'<button type="button" onclick="play( ' + data[i]._id +')" class="btn alter-but" data-toggle="modal" data-target="#myModal">Update</button>'+"</td>");
     //console.log("<td>"+'<button type="button" onclick="play('+ data[i]._id +')" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Update</button>'+"</td>");
     // tr.append("<td>" + '<a href="/events/deleteEvent/' + data[i].nameOfEvent + '"class="btn btn-primary" role="button"><span class="glyphicon glyphicon-minus">Delete</a>' + "</td>");
      tr.append("<td>"+'<button type="button" onclick="deleteEvent('+ data[i]._id +')" class="btn alter-but">Delete</button>');
      $('#events').append(tr);
    }
  });
  }


  function play(eventId){
    //alert(eventId);
    $(document).ready(function(){
      var url = '/events/searchEvent/'+eventId;
    //alert(url);
      $.getJSON( url, function( data ) {
        console.log(data);
        document.getElementById("originalEventName").value = data.nameOfEvent;
        document.getElementById("nameOfEvent").value = data.nameOfEvent;
        tinyMCE.get('description').setContent(data.description);
        tinyMCE.get('rules').setContent(data.rules);
        document.getElementById("timeOfEvent").value = data.timeOfEvent;
        document.getElementById("dateOfEvent").value = data.dateOfEvent;
        document.getElementById("coordinator_1").value = data.coordinator_1;
        document.getElementById("coordinator_2").value = data.coordinator_2;
        document.getElementById("phoneno_1").value = data.phoneno_1;
        document.getElementById("phoneno_2").value = data.phoneno_2;
        document.getElementById("reference_url").value = data.reference_url;
        document.getElementById("venue").value = data.venue;
        document.getElementById("originalEventName").value = data.nameOfEvent;
        document.getElementById("category").value = data.category;
        console.log(data.category);
      });
    });
  }

  function getDescription(eventId,task){
    $(document).ready(function(){
      var url = '/events/searchEvent/'+eventId;
      $.getJSON( url, function( data ) {
        document.getElementById("descText").innerHTML=data.description;
      });
    });
  }

  function getRules(eventId){
    $(document).ready(function(){
      var url = '/events/searchEvent/'+eventId;
      $.getJSON( url, function( data ) {
        console.log(data.rules);
        document.getElementById("descText").innerHTML = data.rules;
      });
    });
  }

  function deleteEvent(eventId){
    var confirm = prompt("Are you sure(Y/N)");
    if(confirm == "Y"){
      window.location="/events/deleteEventById/"+eventId;
    }
    else{
      res.render("dashboard");
    }
  }
