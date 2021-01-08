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
    if (win(this.id)) {
        alert("AY FAM YOU WON MATE POGGERS POGPOGPOG")
    }
    for (let element in msg){
        document.getElementById(msg[element]).style.backgroundColor="#FFFF00"

        unused_tiles.push(document.getElementById(msg[element]))
    }
    if (win(this.id)) {
        alert("AY FAM YOU WON MATE POGGERS POGPOGPOG")
    }
})

function seekserver(data){
    if (win(this.id)) {
        alert("AY FAM YOU WON MATE POGGERS POGPOGPOG")
    }
    socket.emit("ss",data)
    if (win(this.id)) {
        alert("AY FAM YOU WON MATE POGGERS POGPOGPOG")
    }
}

function send_turn_to_server(msg){
    if (win(this.id)) {
        alert("AY FAM YOU WON MATE POGGERS POGPOGPOG")
    }
    socket.emit("sttsr",msg)
    if (win(this.id)) {
        alert("AY FAM YOU WON MATE POGGERS POGPOGPOG")
    }
}

socket.on("sttcr", (msg)=>{new_turn = msg
    if (win(this.id)) {
        alert("AY FAM YOU WON MATE POGGERS POGPOGPOG")
    }
    set_message_player()
    if (win(this.id)) {
        alert("AY FAM YOU WON MATE POGGERS POGPOGPOG")
    }
})

let message_player = null

function win(id){
    if (id === 16){
        //.right three times;.down three times;.rightdown three times
        try{
            if (
                //three right down
                ((this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.
nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.
nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.
nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor==='#ff0000')&&
                (this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.
nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.
nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor==='#ff0000')&&
                (this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.
nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor==='#ff0000'))
                ){
                return true
            }
        }catch (err){}

    }
    /*
       identifier: (((id-1)%7)+1) === [rownum] && (id-1)/7 === [colnum]
       one left: this.previousElementSibling

       one right: this.nextElementSibling

       one up : this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.
       previousElementSibling.previousElementSibling.previousElementSibling

       one down: this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.
       nextElementSibling.nextElementSibling

       left up: this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.
       previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling

       right up: this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.
       previousElementSibling.previousElementSibling

       left down: this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.
       nextElementSibling

       right down: this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.
       nextElementSibling.nextElementSibling.nextElementSibling

     */
}

function set_message_player(){
    if ((turn =="red"||turn==null||new_turn=="red")){
        message_player = "It's your turn"
        }

    else if(turn=="yellow"){
            message_player="It's player yellow's turn"
        }

    // this is the message they receive when someone wins i think
    if (win(this.id)){
        alert("AY FAM YOU WON MATE POGGERS POGPOGPOG")
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
              if (win(this.id)){
        alert("AY FAM YOU WON MATE POGGERS POGPOGPOG")
    }
            else{
                alert("You can't do that, try again")
            }
        }
        catch (err){}
    }
}
