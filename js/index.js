let app = new Vue({
	el: '#app',
	data: {
		title: '小黑板',
		bullet: '睡觉没前途(￣o￣) . z Z　',
		display: {
			height: 0,
			width: 0
		},
		content: {
			width: 0,
			move: {
				left: 0,
				right: 0,
				duration: 10
			},
			style: {
				left: '0px',
				color: '#FFFFFF',
				animationDuration: '10s'
			}
		},
		setting: {
			title: 'setting',
			fontSize: 300,
			color: '#FFFFFF',
			show: false,
			rainbow:{
				white: '#FFFFFF',
				black: '#000000',
				red: '#FF0000',
				orange: '#FF7F00',
				yellow: '#FFFF00',
				green: '#00FF00',
				blue: '#0000FF',
				indigo: '#00FFFF',
				purple: '#8B00FF'
			}
		},
		styleSheet: null
	},
	created: function() {
		this.init();
	},
	mounted: function() {},
	watch: {
		bullet: function(val, oldVal) {
			this.content.width = val.length * this.setting.fontSize;
			this.content.move.right = -this.content.width;
			
			this.animationMove("content", this.content.move.left, this.content.move.right);

		},
		'content.move.left': function(val, oldVal) {
			this.content.style.left = `${val}px`;
		},
		'content.move.duration': function(val, oldVal){
			this.content.style.duration = `${val}s`;
		},
		'setting.color': function(val, oldVal){
			this.content.style.color = val;
		}
	},
	methods: {
		init() {
			this.initDisplay();
			this.initStyleSheets();
			this.initContent();
		},
		initDisplay() {
			let display = document.getElementById("display");
			this.display.height = display.clientHeight;
			this.display.width = display.clientWidth;
		},
		initContent() {
			this.content.width = this.bullet.length * this.setting.fontSize;
			this.content.move.left = this.display.width;
			this.content.move.right = -this.content.width;
			
			this.animationMove("content", this.content.move.left, this.content.move.right);
		},
		initStyleSheets() {
			let styleSheets = document.styleSheets;
			for (let i = 0; i < styleSheets.length; i++) {
				if (styleSheets[i].href.search(/\/blackboard\/css\/index.css/)) {
					this.styleSheet = styleSheets.length > 0 ? styleSheets[0] : null;
					break;
				}
			}
		},
		showSetting() {
			this.setting.show = true;
		},
		disableSetting() {
			this.setting.show = false;
		},
		changeColor(color){
			this.setting.color = color;
		},
		animationMove(name, beg, end, delay = 0) {
			let cssRules = this.styleSheet.cssRules;

			for (let i = 0; i < cssRules.length; i++) {
				if (cssRules[i] instanceof CSSKeyframesRule) {
					if (cssRules[i].name == name) {
						this.styleSheet.removeRule(i);
					}
				}
			}
			this.styleSheet.insertRule(`@keyframes ${name} { 
					0 { left: ${beg}px; }
					${delay}% { left: ${beg}px; }
					100% { left: ${end}px; } 
				}`, 0);
		}
	}
});
