if(!window.requestAnimationFrame) {
	var lastTime = 0;
	window.requestAnimationFrame = function(callback) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
		var id = window.setTimeout(function() {
			callback(currTime + timeToCall);
		}, timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	}
}
if(!window.cancelAnimationFrame) {
	window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}

export const animateScroll = (doc, sTop, callBack) => {
	let curTop = doc.scrollTop;
	if(curTop == sTop) return;
	let animation = null, timer = null, totleDiff = Math.abs(sTop - curTop);
	let speed = totleDiff * 16.7 / 200;
	if(curTop < sTop) {
		animation = function() {
			curTop += speed;
			if(curTop >= sTop) {
				doc.scrollTop = sTop;
				cancelAnimationFrame(timer);
				if(typeof(callBack) == 'function') callBack();
				return;
			} else {
				doc.scrollTop = curTop;
			}
			timer = requestAnimationFrame(animation);
		}
	} else {
		animation = function() {
			curTop -= speed;
			if(curTop <= sTop) {
				doc.scrollTop = sTop;
				cancelAnimationFrame(timer);
				if(typeof(callBack) == 'function') callBack();
				return;
			} else {
				doc.scrollTop = curTop;
			}
			timer = requestAnimationFrame(animation);
		}
	}
	timer = requestAnimationFrame(animation);
}

export default {
	animateScroll
}