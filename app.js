await new Promise(r => setTimeout(r, 2000));
const loader = document.getElementById("loader")
loader.hidden = true;
alert('loaded!');