let turn = null
const unused_tiles = []
let socket = io.connect(window.origin +"/hide")
socket.on("connect",()=>{socket.send(window.location.pathname.split("/")[2])})
socket.on("rh",(msg)=>{
    for (let element in msg){
        document.getElementById(msg[element]).style.backgroundColor="#ff0000"
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
function win(id){
    if (id !== 16){
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
nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor==='#ff0000')&&
                (this.id.style.backgroundColor === '#ff0000'))
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
    if ((turn=="yellow")){
        message_player = "It's your turn"
        }
        else if((turn=="red"||turn==null||new_turn=="red")){
            message_player="It's player red's turn"
        }
    if (win(this.id)){
        message_player = "You Lost! lol sucks to be you!!!!!! HAHAHHAHA LOSER LLLLLLLL"
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
    if ((unused_tiles.includes(this)==false)&&(turn=="yellow"))  {
        try {
            if ((this.id >= 36) || unused_tiles.includes(this.nextElementSibling.nextElementSibling.nextElementSibling.
                nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling) == true){
                let res = []
                res.push(this)
                this.style.backgroundColor="#ffff00";
                unused_tiles.push(this)

                let filtered_res = res.filter(el=>{return el!= null})
                let id = filtered_res.map(n=>{return n.id})
                hideserver([id,window.location.pathname.split("/")[2]])
                send_turn_to_server_from_yellow(["red",window.location.pathname.split("/")[2]])
                turn="red"
                set_message_player()
            }
            else{
                alert("You can't do that, try again")
            }
        }
        catch (err){}
    }
}
