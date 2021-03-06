const canvas = document.createElement('canvas');
canvas.width = 850;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let instructions = document.createElement('p');
instructions.innerHTML = `<b>instructions</b><br>
click the "next wave" button to start a wave<br>
click a tower on the tower menu to select, then click on a grass tile to place<br>
or use the hotkeys to select a tower:<br>
<ul>
	<li>G: select gun bean</li>
	<li>L: select lazer bean</li>
	<li>B: select beanberg</li>
	<li>ESC: click while placing a tower to cancel</li>
	<li>S: click while a placed tower is selected to sell</li>
</ul>`;
document.body.appendChild(instructions);

var mouse_x = 0, mouse_y = 0;
var game = null;
var menu = new Menu();

$(document).mousemove(function(event) {
	mouse_x = event.pageX - ($(window).width()/2 - canvas.width/2);
	mouse_y = event.pageY - 8; // adjust for weird padding on top of canvas i couldn't remove
});

canvas.onmousedown = () => {
	/* 
		todo: 
		add extra logic here to tell if the mouse was clicked over the grid
		or over the area where u buy/upgrade towers
	*/

	if (menu) {
		if (menu.onStart(mouse_x, mouse_y)) {
			menu.startGame();
			return;
		}

		if (menu.onCredits(mouse_x, mouse_y)) {
			menu.showCredits();
		}

		if (menu.onReturn(mouse_x, mouse_y)) {
			menu.showMain();
		}
	}

	if (game) {
		// placing towers
		for (let i = 0; i < game.towerIcons.length; i++) {
			if (game.towerIcons[i].hasCoords(mouse_x, mouse_y)) {
				game.towerIcons[i].buyTower();
			}
		}

		// selecting towers
		for (let i = 0; i < game.level.length; i++) {
			for (let j = 0; j < game.level[0].length; j++) {
				if (game.level[i][j].hasCoords(mouse_x, mouse_y)) {
					if (game.placing && game.placing.isValid()) {
						game.placing.place();
						return;
					}

					if (game.level[i][j].type == 'highground' && game.level[i][j].tower) {
						game.selected = game.level[i][j];
						return;
					}
				}
			}
		}

		// tower upgrades
		let deselecting = true;
		if (game.selected) {
			if (mouse_x >= 200 && mouse_x < 500 && mouse_y >= canvas.height - 150 && mouse_y <= canvas.height) {
				// path1 upgrade
				deselecting = false;
				if (game.selected.tower.path1.length != 0 && game.cash >= game.selected.tower.path1[0].price) {
					game.cash -= game.selected.tower.path1[0].price;
					game.selected.tower.value += game.selected.tower.path1[0].price/2;
					game.selected.tower.path1[0].action();
					game.selected.tower.path1.splice(0, 1);
				}
			}

			if (mouse_x >= 500 && mouse_x <= 800 && mouse_y >= canvas.height - 150 && mouse_y <= canvas.height) {
				// path2 upgrade
				deselecting = false;
				if (game.selected.tower.path2.length != 0 && game.cash >= game.selected.tower.path2[0].price) {
					game.cash -= game.selected.tower.path2[0].price;
					game.selected.tower.value += game.selected.tower.path2[0].price/2;
					game.selected.tower.path2[0].action();
					game.selected.tower.path2.splice(0, 1);
				}
			}

			if (mouse_x >= 20 && mouse_x <= 170 && mouse_y >= canvas.height - 60 && mouse_y <= canvas.height - 10) {
				game.selected.tower.sell();
			}

			if (game.selected.tower.fb) {
				if (mouse_x >= game.selected.tower.fb.left && mouse_x <= game.selected.tower.fb.left + game.selected.tower.fb.width &&
					mouse_y >= game.selected.tower.fb.top && mouse_y <= game.selected.tower.fb.top + game.selected.tower.fb.height) {
					deselecting = false;
					game.selected.tower.targeting = 'first';
				}

				if (mouse_x >= game.selected.tower.cb.left && mouse_x <= game.selected.tower.cb.left + game.selected.tower.cb.width &&
					mouse_y >= game.selected.tower.cb.top && mouse_y <= game.selected.tower.cb.top + game.selected.tower.cb.height) {
					deselecting = false;
					game.selected.tower.targeting = 'close';
				}

				if (mouse_x >= game.selected.tower.sb.left && mouse_x <= game.selected.tower.sb.left + game.selected.tower.sb.width &&
					mouse_y >= game.selected.tower.sb.top && mouse_y <= game.selected.tower.sb.top + game.selected.tower.sb.height) {
					deselecting = false;
					game.selected.tower.targeting = 'strong';
				}
			}
		}

		// next wave
		if (!game.wave) {
			if (mouse_x >= canvas.width - 200 && mouse_x <= canvas.width &&
				mouse_y >= canvas.height - 200 && mouse_y <= canvas.height - 150) {
				game.wave = new Wave(game.onLevel);
				deselecting = false;
			}
		}

		if (deselecting) {
			game.selected = null;
		}
	}
}
let paused = false;

let fpsInterval, then, startTime, elapsed;
function startGame(fps) {
	fpsInterval = 1000 / fps;
	then = Date.now();
	startTime = then;
	//game = new Game(test);
	runGame();
}

function runGame() {
	requestAnimationFrame(runGame);
	now = Date.now();
	elapsed = now - then;

	if (elapsed > fpsInterval && !paused) {
		then = now - (elapsed % fpsInterval);
        
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (game) {
			drawGame();
		}

		if (menu) {
			drawMenu();
		}
	}
}

startGame(60);