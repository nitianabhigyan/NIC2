var lang = "en-IN";
var GlobalObj = null;
var rate = 1;
var list = null; //list.length to get the length if list at any time
var voice = speechSynthesis.getVoices();
var recognition = new webkitSpeechRecognition();
var u = new SpeechSynthesisUtterance();
u.lang = lang;
u.rate = rate;
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = lang;

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
	v.stop(a.currentTime+.200)
}
recognition.onresult = function(event) 	{ 
	console.log('done'); // add for writing to content.
	for (var i = event.resultIndex; i < event.results.length; ++i) {
		if (event.results[i].isFinal){
			final_tanscript = event.results[i][0].transcript;
			console.log(final_tanscript);
			GlobalObj.value = final_tanscript;
			GlobalObj = null;
			recognition.stop();
			activate(num+1);
		}
	}
}

function listen(obj){
	navigator.vibrate(200); // vibrate the device if Mobile
	beep();
	GlobalObj = obj;
	recognition.start();
}

function speak(obj){
	u.text = obj.getAttribute('tospeak');
	console.log(u);
	speechSynthesis.speak(u);
	u.addEventListener('end',function(event) { 
		//console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' milliseconds.');
		listen(obj);
	});
}
function activate(num){
	if(num == 0){
		list = document.querySelectorAll('input');
	}
	list[num].click();
}