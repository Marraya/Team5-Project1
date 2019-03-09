$(document).ready(function(){
  // $(".blur").click(function() {
  //   $(this).toggleClass( "full" );
  // });
/* 1. Visualizing things on Hover - See next part for action on click */
  $('.blur').on('mouseover', function(){
    var onMug = parseInt($(this).attr('data-rank'));// The mug currently mouse on
    var container = $(this).parent();
    if( container.hasClass("saved")) { } else {
    container.addClass("img" + onMug);
    console.log("data-rank");
    }
  });

  $('.blur').on('mouseleave', function(){
    var onMug = parseInt($(this).attr('data-rank'));// The mug currently mouse on
    var container = $(this).parent();
    if( container.hasClass("saved")) { } else {
      container.removeClass("img" + onMug);
    }

  });

  $('.blur').on('click', function(){
    var onMug = parseInt($(this).attr('data-rank'));// The mug currently mouse on
    var container = $(this).parent();
   
    if( container.hasClass("saved")) { 
      container.removeClass("saved img1 img2 img3 img4 img5");

    } else {
      container
        .addClass("saved")
        .addClass("img"+onMug);
    }
    
       var ratingValue = parseInt($(this).last().attr('data-rank'));
       var msg = "";
       if (ratingValue >= 1) {
           msg = "Thanks! You rated this " + ratingValue + " stars.";
           console.log(ratingValue,"ratingValue");
       }
      //  else {
      //      msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
      //  }
       responseMessage(msg);
    return false;
    
  });
  
      });

  function responseMessage(msg) {
    $('.success-box').fadeIn(200);  
    $('.success-box div.text-message').html("<span>" + msg + "</span>");
  }




    // Now highlight all the stars that's not after the current hovered star
  //   $(this).parent().children('img.blur').each(function(e){
  //     // console.log(e);
  //     if (e < onMug) {
  //       $(this).addClass('full');
  //       return false;
  //     }
  //     else {
  //       $(this).removeClass('full');
  //     }
  //   });
  // });
 
  // }).on('mouseout', function(){
  //   $(this).parent().children('.blur').each(function(e){
  //     $(this).removeClass('full');
  //   });

  

   /* 2. Action to perform on click */
  //  $('.blur').on('click', function(){
  //   var onMug = parseInt($(this).attr('data-rank'));// The mug currently mouse on
  //   var mugs = $(this).parent().children('img.blur'); // array of all mugs
  //   console.log(onMug) // gives back the number on mug pressed
  //   console.log(mugs); // gives us an array of 5 img mugs
    
  //   for (i = 0; i < mugs.length; i++) {
  //     $(mugs[i]).removeClass('full');
  //   }
  //   for (i = 0; i < onMug; i++) {
  //     $(mugs[i]).addClass('full');
  //   }

  //      // JUST RESPONSE (Not needed)
  //      var ratingValue = parseInt($(this).last().attr('data-rank'));
  //      var msg = "";
  //      if (ratingValue >= 1) {
  //          msg = "Thanks! You rated this " + ratingValue + " stars.";
  //      }
  //     //  else {
  //     //      msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
  //     //  }
  //      responseMessage(msg);
       
  //    });



  







