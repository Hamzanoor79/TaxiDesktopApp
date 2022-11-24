const { contextBridge,electron} = require('electron');
const Store = require('electron-store');
const store = new Store();

// const axios = require('axios');
// const qs = require('qs');

 var myVar = null;

        function printDuration() {
            
                 document.getElementById('play_buttonlarge').style.display = 'none';
             document.getElementById('pause_buttonlarge').style.display = 'block';

        //     $('.pause_buttonlarge').show();
        //    $('.play_buttonlarge').hide();
           var get_time=localStorage.getItem('timerdata');
           //alert(get_time);
          // var countdown=$('#countdown').text();
            var countdown=document.getElementById('countdown').text;
            if(get_time=='NaN'){
              //alert('Nan data');
               var set_timer=localStorage.setItem("timerdata",countdown);
            }else{
              //alert('Nan data new');
               var set_timer=get_time;
            }

             myVar = setInterval(myTimer, 1000);
            function myTimer() {
               var get_updatedtime=localStorage.getItem('timerdata');
               get_updatedtime++;
               document.getElementById("countdown").innerHTML =get_updatedtime;
               var set_timer=localStorage.setItem("timerdata",get_updatedtime);
                // const d = new Date();
                // document.getElementById("demo").innerHTML = d.toLocaleTimeString();
            }

            // const Store = require('electron-store');
            // const store = new Store();
            // store.set('unicorn', '12');
            // console.log(store.get('unicorn'));
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            // This arrangement can be altered based on how we want the date's format to appear.
            let currentDate = `${day}-${month}-${year}`;
           // console.log(currentDate); // "17-6-2022"
         
              store.set(currentDate,localStorage.getItem('timerdata'));
              console.log('datestart',store.get(currentDate));
        }

        function stop() {
            document.getElementById('pause_buttonlarge').style.display = 'none';
             document.getElementById('play_buttonlarge').style.display = 'block';
          // $('.pause_buttonlarge').hide();
           //$('.play_buttonlarge').show();
            clearInterval(myVar);
            myVar = null;
            document.getElementById("countdown").innerHTML =localStorage.getItem('timerdata');
        }

        window.onload=function(){
            var mb = document.getElementById("play_buttonlarge");
            mb.addEventListener("click", printDuration);

            var mb2 = document.getElementById("pause_buttonlarge");
            mb2.addEventListener("click", stop);
            //mb.addEventListener("click", handler2)

             var get_time1=localStorage.getItem('timerdata');
            if(get_time1=='NaN'){
              //alert('Nan data');
              document.getElementById('countdown').innerHTML=0;
            }else{
              //alert('Nan data new');
              document.getElementById('countdown').innerHTML=localStorage.getItem('timerdata');
            }
        }
    // document.getElementById('countdown').html(localStorage.getItem('timerdata'));
     //localStorage.setItem("timerdata",0);
    // $('#countdown').html(localStorage.getItem('timerdata'));