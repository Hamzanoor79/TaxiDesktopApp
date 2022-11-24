$(document).ready(function(){
     $(document).on('click','#login_user',(function(e){
             var email=$('#emaildata').val();
             var password=$('#pass').val();
             var formData = new FormData($('#submitform')[0]);
             formData.append('email',email);
             formData.append('password',password);
             var ele=$(this);
              
      $.ajax({
       // url: "https://book2say.com/timetracker/Authentication/login_user", 
       url:"http://taxiapp.sysbitechies.com/Authentication/login_user",
        type: 'POST',
        data: formData,
        contentType:false,
        processData:false,
        cache: false,
        dataType: "json",
        beforeSend:function(){
         ele.html('Processing <i class="fa fa-spinner fa-spin "></i>');
        },
        success: function (reponse) { 
		ele.html('Login');
         window.location.href = "task.html";
            if(reponse.status){
                var userdetail=reponse.data;
                //console.log('userstatus',userdetail.status);
                localStorage.setItem("u_id", userdetail.u_id);
                localStorage.setItem("f_name", userdetail.name);
            }else{
                alert(reponse.message);
                window.location.href = "index.html";
            }
       
        } 
 
      }); 

     }));

      $('.logout').click(function(){
              localStorage.clear();
              window.location.href = "index.html";
          });


     $(document).on('click','.upload_data',function(){

        var result=confirm("Are you sure you want to change?");
           if(result==true){
          var id=$(this).attr('data-id');
               var ins =$('#uplodefile_'+id)[0].files;
 var formData = new FormData();
    for (var x = 0; x < ins.length; x++) {
                formData.append("upload_file[]", $('#uplodefile_'+id)[0].files[x]);
                //$('.image_field').val($('#upload_file_'+id)[0].files[x]);
        }
             //console.log('ins2',ins.length);

           
            //var task_id=$('#task_id_'+id).val();
            var userid=localStorage.getItem('u_id');
            var text=$('#messagedata_'+id).val();
            var image_field=$('#uplodefile_'+id).val();

            

            formData.append('id',id);
            formData.append('userid',userid);
            formData.append('remarks',text);
            formData.append('image_field',image_field);
            formData.append('select_statusnew','Inreview');
            

            $.ajax({
             // url: "https://book2say.com/timetracker/Authentication/update_task", 
              url:"http://taxiapp.sysbitechies.com/Authentication/update_task",
              type: 'POST',
              data: formData,
              contentType:false,
              processData:false,
              cache: false,
              dataType: "json",
              // beforeSend:function(){
              //  $('#change_'+id).html('Processing <i class="fa fa-spinner fa-spin "></i>');
              // },
              success: function (reponse) { 
            if(reponse.status){
              $('#submitmsg_'+id).html("Sent");
              alert("Sent for Approval");
              // $('#modaltext_'+id).html(reponse.data.status);
              // $('#selected_'+id).val(reponse.data.status);
              // $('#change_'+id).html("saved");
            //localStorage.clear();
              // var userdetail=reponse.data;
              // alert("Logged in");
              // localStorage.setItem("u_id", userdetail.u_id);
              // localStorage.setItem("auth", userdetail.auth);
              // localStorage.setItem("f_name", userdetail.f_name);
              // localStorage.setItem("hour_rate", userdetail.hourly_rate);
              // localStorage.setItem("l_name", userdetail.l_name);
              // window.location.href = "jobstats.html";
            }else{
              alert(reponse.message);
            }
             
        } 
 
      });
    }
     });

     $(document).on('click','.chat_color',function(){
         window.location.href = "chat.html";
         var id=$(this).attr('data-id');
         	var formData = new FormData();
            formData.append('taskid',id);
			 $.ajax({
          url:'http://taxiapp.sysbitechies.com/Authentication/get_message',
					type: 'POST',
					contentType:false,
					data: formData,
					processData:false,
					cache: false,
					dataType: "json",
					success: function (reponse) { 
						var userdetail=reponse.data;
						
						var content_html='';
						var j=1; 
						var viewthread='';
						var username=localStorage.getItem("f_name");
						if(userdetail.length > 0){
							for(var i=0;i<userdetail.length;i++)
							{
								console.log(userdetail[i].send_by);
								//  if(reponse.near_data.Id==userdetail[i].Id){
								//      var redclass="red_row";
								//  }else{
								//     var redclass="";
								//  }
								
								if(userdetail[i].send_by==1){
									//viewthread+='<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>'+userdetail[i].message+'</p></div></div></li>';
                  viewthread+='<div class="row mt-3"><div class="col-sm-12"><div class="col-sm-8 white_chatmessage"><p class="white_chattext">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galle</p><p class="chat_timenew">09:50 AM</p></div></div></div>';
								}else{
									viewthread+='<div class="row mt-3"><div class="col-sm-12"><div class="col-sm-8 green_chatmessage"><p class="white_chattext">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galle</p><p class="chat_timenew">09:50 AM</p></div></div></div>';
								}
								//var redclass="";
								//content_html+='<tr class="'+redclass+'"><td>'+j+'</td><td>'+userdetail[i].Task+'</td><td>'+userdetail[i].end_date+'</td><td><button type="button" class="btn btn-primary modal_newbtn" id="modaltext_'+userdetail[i].Id+'" data-id="'+userdetail[i].Id+'" data-toggle="modal" data-target="#exampleModal">'+userdetail[i].status+'</button>'+viewthread+'</td></tr>';
							j++;
							
							}    
							$('.chat_display').html(viewthread);
             

						}
				}

			 });

     });

     $(document).on('click','.complete_taskdata',function(){
       
          var result=confirm("Are you sure you want to change?");
           if(result==true){
              var formData = new FormData();
              var id=$(this).attr('data-task');
              var select_statusnew='Complete';
              var userid=localStorage.getItem('u_id');
           
             formData.append('id',id);
             formData.append('select_statusnew',select_statusnew);
            // formData.append('remarks',remarks);
             formData.append('userid',userid);
         $.ajax({
          
              url:"http://taxiapp.sysbitechies.com/Authentication/update_task",
              type: 'POST',
              data: formData,
              contentType:false,
              processData:false,
              cache: false,
              dataType: "json",
              beforeSend:function(){
               $('#mark_'+id).html('Processing <i class="fa fa-spinner fa-spin "></i>');
              },
              success: function (reponse) { 
            if(reponse.status){
             
              $('#mark_'+id).html("saved");
          
            }else{
              alert(reponse.message);
            }
             
        } 
 
      }); 
    }
       
     });
     

    //   var myVar = null;

    //     function printDuration() {
            
    //         $('.pause_buttonlarge').show();
    //        $('.play_buttonlarge').hide();
    //        var get_time=localStorage.getItem('timerdata');
    //        //alert(get_time);
    //        var countdown=$('#countdown').text();
    //         if(get_time=='NaN'){
    //           //alert('Nan data');
    //            var set_timer=localStorage.setItem("timerdata",countdown);
    //         }else{
    //           //alert('Nan data new');
    //            var set_timer=get_time;
    //         }

    //          myVar = setInterval(myTimer, 1000);
    //         function myTimer() {
    //            var get_updatedtime=localStorage.getItem('timerdata');
    //            get_updatedtime++;
    //            document.getElementById("countdown").innerHTML =get_updatedtime;
    //            var set_timer=localStorage.setItem("timerdata",get_updatedtime);
    //             // const d = new Date();
    //             // document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    //         }

    //         const Store = require('electron-store');
    //         const store = new Store();
    //         store.set('unicorn', '12');
    //         console.log(store.get('unicorn'));
         

    //     }

    //     function stop() {
    //        $('.pause_buttonlarge').hide();
    //        $('.play_buttonlarge').show();
    //         clearInterval(myVar);
    //         myVar = null;
    //         document.getElementById("countdown").innerHTML =localStorage.getItem('timerdata');
    //     }

    //  $(document).on('click','.play_buttonlarge',function(){
    //        printDuration();
    //  });

    //    $(document).on('click','.pause_buttonlarge',function(){
           
    //        stop();
    //         // clearInterval(myVar);
    //         // check = null;
    //         // document.getElementById("para").innerHTML = '0';
        
    //    });
    //  //localStorage.setItem("timerdata",0);
    //  $('#countdown').html(localStorage.getItem('timerdata'));
});