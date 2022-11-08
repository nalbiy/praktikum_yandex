function getResponse() {
    let userText = document.getElementById('textInput').value

    if (userText== "") {
        userText = "Yandex Practikum is the best!";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    userText = "";
    let chatbox= document.getElementById("chatbox")
    chatbox.innerHTML+=userHtml

    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    /*setTimeout(() => {
        getHardResponse(userText);
    }, 1000)*/

}

(function() {
    //alert('cchat')
    document.getElementById('textInput').addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
            getResponse()
            // можете делать все что угодно со значением текстового поля
            console.log(this.value);
            document.getElementById('textInput').value='';
        }
    });
})();