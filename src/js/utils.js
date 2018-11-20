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

export const animateScroll = (doc, position, callBack) => {
	// 传统的JS平滑滚动处理代码...
	if(typeof window.getComputedStyle(document.body).scrollBehavior == 'undefined') {
		// 当前滚动高度
		let scrollTop = doc.scrollTop;
		// 目标高度和当前滚动高度相等时，不需要滚动。
		if(scrollTop == position) return;
		// 滚动step方法
		let step = function() {
			// 距离目标滚动距离
			var distance = position - scrollTop;
			// 目标滚动位置
			scrollTop = scrollTop + distance / 10;
			if(Math.abs(distance) < 1) {
//				doc.scrollTo(0, position);
				doc.scrollTop = position;
				if(typeof(callBack) == 'function') callBack();
			} else {
				doc.scrollTop = scrollTop;
//				doc.scrollTo(0, scrollTop);
				requestAnimationFrame(step);
			}
		}
		step();
	} else {
		// 新特性只需要在滚动元素上面添加 scroll-behavior: smooth; 即可
		doc.scrollTo(0, position);
		setTimeout(callBack, 500);
	}

}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

export default {
	animateScroll,
	setStore,
	getStore,
	removeStore
}