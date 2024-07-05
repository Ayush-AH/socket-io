const socket = io()
const input = document.querySelector("input")
const typing = document.querySelector(".typing")

const messageContainer = document.querySelector(".message-container")
messageContainer.scrollTo(0,messageContainer.scrollHeight)

// emiting message to server
document.querySelector("button").addEventListener("click", function () {
    socket.emit("message", input.value)
    input.value = ""
})
// emiting some one istyping to server
input.addEventListener("input", function () {
    socket.emit("typing")
})

// listing reseved message
socket.on("message-reseved", function (data) {
    messageContainer.innerHTML += `<h1 class="text-white">${data}</h1>`
    messageContainer.scrollTo(0,messageContainer.scrollHeight)
})

// listing some-one-is-typing message
socket.on("some-one-is-typing", function () {
    typing.textContent = "Typing..."
    clearTimeout(timer)
    var timer = setTimeout(() => {
    typing.textContent = ""
    },1000);

})
