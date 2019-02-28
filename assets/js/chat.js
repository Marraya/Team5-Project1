firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var db = firebase.database();
      var currentProperty = localStorage.getItem("prop");
      
      db.ref('addresses/'+currentProperty+'/chat/group').on("child_added", function(data){
          //Set Local Variables
          var message = data.child("message").val();
          var date = data.child("date").val();
          var sender = data.child("uid").val();
          var time = data.child("time").val();
          var who;
          var getCurrentDate = new Date;
          day = getCurrentDate.getDate();
          month = getCurrentDate.getMonth() + 1;										
          year = getCurrentDate.getFullYear();
          var newDate = [day, month, year].join('/');
          var title = document.getElementById("chatTitle");
          db.ref('addresses/'+currentProperty+'/firstLine').once("value", function(snapshot){
              title.innerHTML = "<i class='fas fa-home' style='font-size:150%;margin-right:10px'></i>Group chat with all persons involved with " + capitalLetter(snapshot.val());
          });
          
          if(sender == user.uid){who = 'boxCurrent currentUser';}
          else
          {who = 'boxOther otherUser';}
          
          if(date == newDate){date = 'Today'}
          
          db.ref('users/'+sender+'/firstName').on('value', function(data){
              var name = data.val();
              if(who == 'boxCurrent currentUser'){
                  var messageD = "<div id='userMessageDisplay' style='width:100%;text-align:end;'><span class='message-data-time'>"+time+",  "+date+"    </span><span id='userName'>"+name+"</span><div id='hello' class='"+who+"' style= height:100%;'>"+message+"</div></div>";
              $('#displayBox').append(messageD);
              }
              else{
                  var messageD = "<div id='userMessageDisplay' style='width:100%;'><span class='message-name'>"+name+"</span><span class='message-data-time'>    "+time+",  "+date+"</span><div id='hello' class='"+who+"' style='width:70%; height:100%;'>"+message+"</div></div>";
              $('#displayBox').append(messageD);
              }
          });
      });
      
      db.ref('addresses/'+currentProperty+'/tenant').orderByKey().once("value", function(snapshot){
          snapshot.forEach(function(child){
            var key = child.key;
            console.log(key);
            db.ref('users/'+key+'/firstName').once("value", function(data){
                var first = data.val();
                var appendFirst = "<li style='padding: 5px 10px 0 10px; height:75px;'><i class='fas fa-user-circle' style='font-size:400%; float:left;color:#6a6c75;'></i><div class='about' style='height:100%;padding: 10px 0 0 70px;'><div id='append2"+key+"' class='profileName' style='color:#fff;'>"+first;
                $('#peopleList').append(appendFirst);
  
            });
            db.ref('users/'+key+'/lastName').once("value", function(data){
                var last = data.val();
                var appendLast = " "+last+"</div>"
                $('#append2'+key).append(appendLast);
            });
            db.ref('users/'+key+'/onlineStatus').once("value", function(data){
                var onlineStatus = data.val();
                console.log(onlineStatus);
                if(onlineStatus == 'Online'){
                var appendStatus = "<div class='status' style='color:#a8aac3;'><i class='fa fa-circle' online style='color:#86BB71; margin-right:10px;font-size:80%;border:1px solid #fff;border-radius:50%;'></i>Online</div></div></li>"
                $('#append2'+key).append(appendStatus);
                }
                else{
                    appendStatus = "<div class='status' style='color:#a8aac3;'><i class='fa fa-circle offline' style='color:#E38968;margin-right:10px;font-size:80%;border:1px solid #fff;border-radius:50%;'></i>Offline</div></div></li>"
                    $('#append2'+key).append(appendStatus);
                }
            });
          });
      });
      
    } else {
      // No user is signed in.
      location = 'index.html'
    }
  });
  
  function sendMessage(){
      var theDiv = document.getElementById('displayBox');
      var message = document.getElementById("messageInput").value;
      var currentProperty = localStorage.getItem("prop");
      var user = firebase.auth().currentUser;
      //date
      var date = new Date;
      day = date.getDate();
      month = date.getMonth() + 1;										
      year = date.getFullYear();
      var newDate = [day, month, year].join('/');
      var db = firebase.database();
      //time
      hours = date.getHours(); // => 9
      mins = date.getMinutes(); // =>  30
      var time = [hours, mins].join(':');
      console.log(time);
      
      var messageDetails = {
          "uid": user.uid,
          "message": message,
          "date": newDate,
          "time": time
          }
          
      if(message == ''){
          document.getElementById("messageInput").style.border = '1px solid red';
      }
      else{
          db.ref('addresses/'+currentProperty+'/chat/group').push(messageDetails).then(function(){
              document.getElementById("messageInput").value = '';
              theDiv.scrollTop = '99999';
          });
      }
  }