    let turn = null
    let new_turn = null
    const unused_tiles = []
    let socket = io.connect(window.origin +"/seek")
    socket.on("connect",()=>{socket.send(window.location.pathname.split("/")[2])})
    socket.on("message",(msg)=>{document.getElementById("player-status").innerText=msg})
    const squares = document.querySelectorAll("#board button")

squares.forEach(square=>{
    square.addEventListener("click",relevantsquare)
})

socket.on("rs",(msg)=>{
    for (let element in msg){
        document.getElementById(msg[element]).style.backgroundColor="#FFFF00"

        unused_tiles.push(document.getElementById(msg[element]))
    }
})

function seekserver(data){
    socket.emit("ss",data)
}

function send_turn_to_server(msg){
    socket.emit("sttsr",msg)
}

socket.on("sttcr", (msg)=>{new_turn = msg
    set_message_player()
})

let message_player = null

function set_message_player(){
    if ((turn =="red"||turn==null||new_turn=="red")){
        message_player = "It's your turn"
        }

    else if(turn=="yellow"){
            message_player="It's player yellow's turn"
        }
    // // probably don't need this if there is a definite winner in the end
    // document.getElementById("red-score").innerText = "Red: " + document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length
    // document.getElementById("yellow-score").innerText = "yellow: " + document.querySelectorAll('button[style="background-color: rgb(255, 255, 0);"]').length

    // this is the message they receive when someone wins i think
    if ((document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length)+(document.querySelectorAll('button[style="background-color: rgb(255, 255, 0);"]').length)==49){
        if (document.querySelectorAll('button[style="background-color: rgb(255, 255, 0);"]').length>document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length){
            message_player = "yellow player won, you lost!"
        }

        else if (document.querySelectorAll('button[style="background-color: rgb(255, 255, 0);"]').length==document.querySelectorAll('button[style="background-color: rgb(192, 57, 43);"]').length){
            message_player = "It's a tie!"
        }
        else{
            message_player = "You Won!"
        }
    }
    document.getElementById("turn").innerText = message_player
}
set_message_player()
// setInterval(set_message_player,100)
function relevantsquare(){
    const grid = 8

    if (unused_tiles.length == 0) {
        turn = "red"}
  else if(new_turn !==null){
      turn = new_turn
  }
  else{
      turn = turn
  }
    // if it is the host's turn and the tile is empty
    if ((unused_tiles.includes(this)==false)&&(turn=="red"))  {
        try {
            if ((this.id >= 36) || unused_tiles.includes(this.nextElementSibling.nextElementSibling.nextElementSibling.
                nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling) == true){
                let res = []
                res.push(this)
                this.style.backgroundColor="#ff0000";
                unused_tiles.push(this)

                let filtered_res = res.filter(el=>{return el!= null})
                let id = filtered_res.map(n=>{return n.id})
                seekserver([id,window.location.pathname.split("/")[2]])
                send_turn_to_server(["yellow",window.location.pathname.split("/")[2]])
                new_turn=null
                turn="yellow"
                set_message_player()
            }
            else{
                alert("You can't do that, try again")
            }
        }
        catch (err){}
    }
}