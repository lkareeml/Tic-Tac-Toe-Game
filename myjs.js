$(document).ready(function(){
  var w,c;
  var arr = [["0","0","0"],
             ["0","0","0"],
             ["0","0","0"]];
  /*
      arr = [["q","w","e"],
             ["a","s","d"],
             ["z","x","c"]]
  */
  //c exist w exist
  function cex(x,y){
    return arr[x][y] == c;
  }
  function wex(x,y){
    return arr[x][y] == w;
  }
  
  function start(){
    $("#msg").fadeOut(1000, function(){$(this).addClass("hide");});
    $("#xobox").removeClass("hide");
    $("#xobox").addClass("fade-in");
  }
  
  function reset(){
    arr = [["0","0","0"],["0","0","0"],["0","0","0"]];
    
    $("#q").empty();
    $("#w").empty();
    $("#e").empty();
    $("#a").empty();
    $("#s").empty();
    $("#d").empty();
    $("#z").empty();
    $("#x").empty();
    $("#c").empty();
    alert("ALL RESET OK");
  }
  //Check if any one wins
  function checkwin(){
      var counter = 0;
      var rawx = true, colx = true,
          rawo = true, colo = true;
      var dealx = true,dealo=true;
      var Draw = true;
      for(var j=0;j<3;j++){
        for(var i=0;i<3;i++){
          //Is there is any winner ? 
          {//x winning checktool raw & col
          var cRawx = arr[j][i]=="x",
              cColx = arr[i][j]=="x"; 
          rawx = (rawx&&cRawx);
          colx = (colx&&cColx);
          //o winning checktool raw & col
          var cRawo = arr[j][i]=="o",
              cColo = arr[i][j]=="o"; 
          rawo = (rawo&&cRawo);
          colo = (colo&&cColo);
        //diameter checktool x & o 
          var x = arr[i][i]=="x";
           dealx = dealx && x;
          var o = arr[i][i]=="o";
           dealo = dealo && o;
          }
          //can i complete playing ?
          if (arr[j][i]=="x"||arr[j][i]=="o")
            {counter++;}
        }
        //How do i know if you win?
        {
        //For "X
        if(rawx===true||colx===true||dealx===true)
        {
          console.log("X is a winner");Draw=false;
          setTimeout(function(){alert("X Wins");reset();return true;}, 1000);
        }
        else if(rawx===false||colx===false||dealx===false)
        {rawx=true;colx=true;dealx=true;}
        
        //For "O"
        if(rawo===true||colo===true||dealo===true)
        {
          console.log("O is a winner");Draw=false;
          setTimeout(function(){alert("O Wins");reset();return true;}, 1000);
        }
        else if(rawo===false||colo===false||dealo===false)
        {rawo=true;colo=true;dealo=true;}
      }
    }
    if((wex(2,0)&&wex(1,1)&&wex(0,2))){
      //w is a winner
      alert(w + " is A winner");reset();Draw=false;return true;
    }
    if((cex(2,0)&&cex(1,1)&&cex(0,2))){
      //w is a winner
      alert(c + " is A winner");reset();Draw=false;return true;
    }
    //How do i know if match end and draw or continue
      if(Draw && counter==9) {console.log("DRAW");setTimeout(function(){alert("DRAW");reset();return true;}, 2000);}
    
    
    return false;
    }
  //Check if the cell is empty
  function empty(x,y){
    if (arr[x][y]=="0") return true;
    else return false;
  }
  //Printing the press to the html screen
  function printing(x,y,who){
    if(x==0&&y==0){$("#q").html(who);}
    if(x==0&&y==1){$("#w").html(who);}
    if(x==0&&y==2){$("#e").html(who);}
    
    if(x==1&&y==0){$("#a").html(who);}
    if(x==1&&y==1){$("#s").html(who);}
    if(x==1&&y==2){$("#d").html(who);}

    if(x==2&&y==0){$("#z").html(who);}    
    if(x==2&&y==1){$("#x").html(who);}
    if(x==2&&y==2){$("#c").html(who);}
  }
  
  //when click to play
  function play(x,y,who){
    if(empty(x,y)){
      arr[x][y] = who;
      printing(x,y,who);
      if(checkwin()) return false;
      else return true;
    }
  }
  function cplay(x,y){
    if(empty(x,y)){
      arr[x][y] = c;
      printing(x,y,c);
      checkwin();  
      return true;
    }
   else return false;
  }
  
  
  
  //Computer Turn (AI is so simple try to block try to win and play random)
  function trywin(){
    //Horizon ends
    if(cex(0,0)&&cex(0,2)){if (cplay(0,1)) return true;}
    if(cex(1,0)&&cex(1,2)){if (cplay(1,1)) return true;}
    if(cex(2,0)&&cex(2,2)){if (cplay(2,1)) return true;}
    if(cex(0,0)&&cex(0,1)){if (cplay(0,2)) return true;}
    if(cex(1,0)&&cex(1,1)){if (cplay(1,2)) return true;}
    if(cex(2,0)&&cex(2,1)){if (cplay(2,2)) return true;}
    if(cex(0,2)&&cex(0,1)){if (cplay(0,0)) return true;}
    if(cex(1,2)&&cex(1,1)){if (cplay(1,0)) return true;}
    if(cex(2,2)&&cex(2,1)){if (cplay(2,0)) return true;}
    
    //Vertical ends
    if(cex(0,0)&&cex(2,0)){if (cplay(1,0)) return true;}
    if(cex(0,1)&&cex(2,1)){if (cplay(1,1)) return true;}
    if(cex(0,2)&&cex(2,2)){if (cplay(1,2)) return true;}
    if(cex(0,0)&&cex(1,0)){if (cplay(2,0)) return true;}
    if(cex(0,1)&&cex(1,1)){if (cplay(2,1)) return true;}
    if(cex(0,2)&&cex(1,2)){if (cplay(2,2)) return true;}
    if(cex(2,0)&&cex(1,0)){if (cplay(0,0)) return true;}
    if(cex(2,1)&&cex(1,1)){if (cplay(0,1)) return true;}
    if(cex(2,2)&&cex(1,2)){if (cplay(0,2)) return true;}
    
    //Diagonal ends
    if(cex(0,0)&&cex(2,2)){if (cplay(1,1)) return true;}
    if(cex(0,2)&&cex(2,0)){if (cplay(1,1)) return true;}
    if(cex(0,0)&&cex(1,1)){if (cplay(2,2)) return true;}
    if(cex(0,2)&&cex(1,1)){if (cplay(2,0)) return true;}
    if(cex(2,0)&&cex(1,1)){if (cplay(0,2)) return true;}
    if(cex(2,2)&&cex(1,1)){if (cplay(0,0)) return true;}
    //If nothing happend return false
    return false;
  }
  function tryblock(){

    //(0,0)
     if(wex(0,1)&&wex(0,2)){if (cplay(0,0)) return true;}
     if(wex(1,0)&&wex(2,0)){if (cplay(0,0)) return true;}
     if(wex(1,1)&&wex(2,2)){if (cplay(0,0)) return true;}
    //(0,1)
     if(wex(0,0)&&wex(0,2)){if (cplay(0,1)) return true;}
     if(wex(1,1)&&wex(2,1)){if (cplay(0,1)) return true;}
    //(0,2)
     if(wex(0,0)&&wex(0,1)){if (cplay(0,2)) return true;}
     if(wex(1,2)&&wex(2,2)){if (cplay(0,2)) return true;}
     if(wex(2,0)&&wex(1,1)){if (cplay(0,2)) return true;}
    //(1,0)
     if(wex(1,1)&&wex(1,2)){if (cplay(1,0)) return true;}
     if(wex(0,0)&&wex(2,0)){if (cplay(1,0)) return true;}
    //(1,1)
     if(wex(0,1)&&wex(2,1)){if (cplay(1,1)) return true;}
     if(wex(0,0)&&wex(2,2)){if (cplay(1,1)) return true;}
     if(wex(0,2)&&wex(2,0)){if (cplay(1,1)) return true;}
     if(wex(1,0)&&wex(1,2)){if (cplay(1,1)) return true;}
     //(1,2)
     if(wex(1,0)&&wex(1,1)){if (cplay(1,2)) return true;}
     if(wex(0,2)&&wex(2,2)){if (cplay(1,2)) return true;}
     //(2,0)
     if(wex(2,2)&&wex(2,1)){if (cplay(2,0)) return true;}
     if(wex(0,0)&&wex(1,0)){if (cplay(2,0)) return true;}
     if(wex(0,2)&&wex(1,1)){if (cplay(2,0)) return true;}
     //(2,1)
     if(wex(2,0)&&wex(2,2)){if (cplay(2,1)) return true;}
     if(wex(2,0)&&wex(2,1)){if (cplay(2,2)) return true;}
     if(wex(0,1)&&wex(1,1)){if (cplay(2,1)) return true;}
     //(2,2)
     if(wex(0,2)&&wex(1,2)){if (cplay(2,2)) return true;}
     if(wex(0,0)&&wex(1,1)){if (cplay(2,2)) return true;}

    //Special Cases
     if(wex(1,1)&&wex(2,2)){if (cplay(2,0)) return true;}
     
    
    //If nothing happend return false
     return false;
 }
  function playrnd(){
    for(var j=0;j<3;j++){
      for(var i=0;i<3;i++){
        if (cplay(i,j)) return true;
      }
    }
  }
 
  
  //Computer Playing
  function complay(){
    if(trywin())   return;
    if(tryblock()) return;
    
    if(wex(1,1))
      {if(cplay(0,0))return;}
    if(wex(0,0)||wex(0,2)||wex(2,0)||wex(2,2))
      {if(cplay(1,1))return;}
    if(wex(0,1)||wex(1,0))                     
      {if(cplay(0,0))return;}
    if(wex(2,1)||wex(1,2))             
      {if(cplay(2,2))return;}
    if(playrnd())  return;
  }
  
  
  
  
  
  //Buttons Clicks 
  $("#xbut").on("click",function(){start();w = "x";c = "o";});
  $("#obut").on("click",function(){start();w = "o";c = "x";});
/*********************************************************/
  $("#q").on("click",function(){if(empty(0,0)){if(play(0,0,w))complay();}});
  $("#w").on("click",function(){if(empty(0,1)){if(play(0,1,w))complay();}});
  $("#e").on("click",function(){if(empty(0,2)){if(play(0,2,w))complay();}});
/*********************************************************/
  $("#a").on("click",function(){if(empty(1,0)){if(play(1,0,w))complay();}});
  $("#s").on("click",function(){if(empty(1,1)){if(play(1,1,w))complay();}});
  $("#d").on("click",function(){if(empty(1,2)){if(play(1,2,w))complay();}});
/*********************************************************/
  $("#z").on("click",function(){if(empty(2,0)){if(play(2,0,w))complay();}});
  $("#x").on("click",function(){if(empty(2,1)){if(play(2,1,w))complay();}});
  $("#c").on("click",function(){if(empty(2,2)){if(play(2,2,w))complay();}});
});
