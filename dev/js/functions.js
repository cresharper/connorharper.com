//CONNORHARPER.COM JS FUNCTIONS

//loading in transition
$(document).ready(function(){
    $("#main-fold").hide(0).delay(50).fadeIn(1000)
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


    //mobile menu 
	$(".mobile-menu-toggle").click(function() {
        var menushowing = $("#side-section").css("display");
		$("#side-section").toggle("fast");
        if (menushowing == "block") {
            $(".mobile-menu-toggle--close").css("z-index", "1");
        } else {
            $(".mobile-menu-toggle--close").css("z-index", "3");
        }

        $(".menu-item").click(function() {
            var menushowing = $("#side-section").css("display");
            $("#side-section").toggle("fast");
            if (menushowing == "block") {
                $(".mobile-menu-toggle--close").css("z-index", "1");
            } else {
                $(".mobile-menu-toggle--close").css("z-index", "3");
            }
        });
	});

});


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
