let turn = null

const unused_tiles = []


let socket = io.connect(window.origin +"/hide")


socket.on("connect",()=>{socket.send(window.location.pathname.split("/")[2])})


socket.on("rh",(msg)=>{
    for (let element in msg){
        document.getElementById(msg[element]).style.backgroundColor="#c0392b"

        unused_tiles.push(document.getElementById(msg[element]))
    }


})

socket.on("sttcb",(msg)=>{turn=msg
    set_message_player()}

)


function hideserver(msg){
    socket.emit("sh",msg)
}

function send_turn_to_server_from_yellow(msg){
    socket.emit("sttsb",msg)

}


const squares = document.querySelectorAll("#board button")
squares.forEach(square=>{
    square.addEventListener("click",relevantsquare)


})


let message_player = null

function set_message_player(){
    if ((turn=="yellow")){
        message_player = "It's your turn"
        }

        else if((turn=="red"||turn==null||new_turn=="red")){
            message_player="It's player red's turn"
        }



        document.getElementById("red-score").innerText = "Red: " + document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length
        document.getElementById("yellow-score").innerText = "yellow: " + document.querySelectorAll('button[style="background-color: rgb(255, 255, 0);"]').length


    if ((document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length)+(document.querySelectorAll('button[style="background-color: rgb(255, 255, 0);"]').length)==49){
        if (document.querySelectorAll('button[style="background-color: rgb(255, 255, 0);"]').length>document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length){
            message_player = "You Won!"
        }

        else if (document.querySelectorAll('button[style="background-color: rgb(255, 255, 0);"]').length==document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length){
            message_player = "It's a tie!"
        }
        else{
            message_player = "Red player won, you lost!"
        }
    }

    document.getElementById("turn").innerText = message_player

}

set_message_player()
// setInterval(set_message_player,100)


function relevantsquare(){

    const grid = 7



    if (unused_tiles.length == 0) {
        turn = "red"
    }










    if ((this.id%grid == 1)&&(unused_tiles.includes(this)==false)&&(turn=="yellow"))  {

        let res = []

        res.push(this.nextElementSibling)
        res.push(this)
        this.nextElementSibling.style.backgroundColor="#FFFF00";
        this.style.backgroundColor="#FFFF00";
        unused_tiles.push(this.nextElementSibling)
        unused_tiles.push(this)


       try{
           res.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)
           this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor="#FFFF00"
           unused_tiles.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)

       }
       catch(err){

       }

      try{
          res.push(this.previousElementSibling.previousElementSibling.previousElementSibling.nextElementSibling.previousElementSibling.previousElementSibling)
          this.previousElementSibling.previousElementSibling.previousElementSibling.nextElementSibling.previousElementSibling.previousElementSibling.style.backgroundColor="#FFFF00"
          unused_tiles.push(this.previousElementSibling.previousElementSibling.nextElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)

      }
      catch(err){

      }

      let filteyellow_res = res.filter(el=>{return el!= null})

      let id = filteyellow_res.map(n=>{
          return n.id
      })
      hideserver([id,window.location.pathname.split("/")[2]])
      send_turn_to_server_from_yellow(["red",window.location.pathname.split("/")[2]])

      turn="red"
      set_message_player()



    }


    else if ((this.id%grid == 0)&&(unused_tiles.includes(this)==false)&&(turn=="yellow")) {

    let res = []


    res.push(this.previousElementSibling)
    unused_tiles.push(this.previousElementSibling)
    this.previousElementSibling.style.backgroundColor="#FFFF00";

    res.push(this)
    this.style.backgroundColor="#FFFF00";
    unused_tiles.push(this)

    try{
        res.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)
        this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor="#FFFF00"
        unused_tiles.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)


    }


    catch(err){

    }


    try{
        res.push(this.previousElementSibling.nextElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)
        this.previousElementSibling.nextElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.style.backgroundColor="#FFFF00"
        unused_tiles.push(this.previousElementSibling.nextElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)

    }
    catch(err){

    }

    let filteyellow_res = res.filter(el=>{return el!= null})

    let id = filteyellow_res.map(n=>{
        return n.id
    })
    hideserver([id,window.location.pathname.split("/")[2]])
    send_turn_to_server_from_yellow(["red",window.location.pathname.split("/")[2]])

    turn="red"
    set_message_player()

    }



    else if((unused_tiles.includes(this)==false)&&(turn=="yellow")){

    let res = []

    res.push(this.previousElementSibling)
    unused_tiles.push(this.previousElementSibling)
    this.previousElementSibling.style.backgroundColor="#FFFF00"

    res.push(this)
    this.style.backgroundColor="#FFFF00";
    unused_tiles.push(this)

    res.push(this.nextElementSibling)
    unused_tiles.push(this.nextElementSibling)
    this.nextElementSibling.style.backgroundColor="#FFFF00"



    try{
        res.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)
        this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor="#FFFF00"
        unused_tiles.push(this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)

    }
    catch(err){

    }

    try{
        res.push(this.previousElementSibling.previousElementSibling.nextElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)
        this.previousElementSibling.previousElementSibling.previousElementSibling.nextElementSibling.previousElementSibling.previousElementSibling.style.backgroundColor="#FFFF00"
        unused_tiles.push(this.previousElementSibling.previousElementSibling.nextElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)


    }
    catch(err){

    }



    let filteyellow_res = res.filter(el=>{return el!= null})

    let id = filteyellow_res.map(n=>{
        return n.id
    })
    hideserver([id,window.location.pathname.split("/")[2]])
    send_turn_to_server_from_yellow(["red",window.location.pathname.split("/")[2]])

    turn="red"
    set_message_player()

    }





}

