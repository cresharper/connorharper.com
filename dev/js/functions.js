//CONNORHARPER.COM JS FUNCTIONS

//loading in transition
$(document).ready(function(){
    $(".main-fold").hide(0).delay(10).fadeIn(1000)
});

$(document).ready(function(){
    particlesJS.load('particles-js', '../build/js/particles.json', function() {
        console.log('callback - particles.js config loaded WEEEEE');
    });
});

//email form/validation and mobile menu
$(document).ready(function() {
    $("#submit_btn").click(function(e) { 

       e.preventDefault()

        var proceed = true;    
        $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function(){
            $(this).css('border-color',''); 
            if(!$.trim($(this).val())){ 
                $(this).css('border-color','red');    
                proceed = false; 
            }
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); 
                proceed = false;             
            }   
        });
       
        if(proceed) 
        {
            
            post_data = {
                'user_name'     : $('input[name=name]').val(), 
                'user_email'    : $('input[name=email]').val(), 
                'msg'           : $('textarea[name=message]').val()
            };
            
            $.post('contact_me.php', post_data, function(response){  
                if(response.type == 'error'){ 
                    output = '<div class="error">'+response.text+'</div>';
                }else{
                    output = '<div class="success">'+response.text+'</div>';
                    
                    $("#contact_form  input[required=true], #contact_form textarea[required=true]").val(''); 
                    $("#contact_form #contact_body").slideUp(); 
                }
                $("#contact_form #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });
    
    $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() { 
        $(this).css('border-color',''); 
        $("#result").slideUp();
    });


//version 1
$(".mobile-toggle").on("click", ".mobile-toggle--open, .mobile-toggle--close", function() {

    if ($(".mobile-toggle").hasClass("mmt-open")) {
        $(".mobile-toggle").removeClass("mmt-open")
    } else {
        $(".mobile-toggle").addClass("mmt-open")
    }

    if ($(".menu-section").hasClass("menu-section--show")) {
        $(".menu-section").removeClass("menu-section--show")
    } else {
        $(".menu-section").addClass("menu-section--show")
    }

});


$(".menu-item").click(function() {
    $(".menu-section").removeClass("menu-section--show");
    $(".mobile-toggle").removeClass("mmt-open");
});

}); //main closer for all functions


//smooth scroll
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
