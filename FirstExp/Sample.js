var lang = "en-IN";
var rate = 1;
var list = null; //list.length to get the length if list at any time

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = lang;
// var u = new SpeechSynthesisUtterance();
// u.lang = lang;
// u.rate = rate;



function beep(){
	a=new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em
	v=a.createOscillator()
	au=a.createGain()
	v.connect(au)
	v.frequency.value=610 // frequency
	v.type="square"
	au.connect(a.destination)
	au.gain.value=1
	v.start(a.currentTime)
	v.stop(a.currentTime+.250)
}
function listen(obj){
	navigator.vibrate(200); // vibrate the device if Mobile
	console.log("entered",obj);
	beep();
}

function speak(obj){
	var u = new SpeechSynthesisUtterance();
	u.lang = lang;
	u.rate = rate;

	u.text = obj.getAttribute('tospeak');
	console.log(u);
	speechSynthesis.speak(u);
	u.onend = listen(obj);
	//speechSynthesis.onend = listen(obj);
}

recognition.onresult = function(event) { 
	console.log('done');
}

function activate(num){
	if(num == 0){
		list = document.querySelectorAll('input');
	}
	list[num].click();
}