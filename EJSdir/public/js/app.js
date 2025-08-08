const btns = document.querySelectorAll("button");

for(btn of btns) {
    addEventListener("click", () => {
        console.log("Button was clicked");
    });
}