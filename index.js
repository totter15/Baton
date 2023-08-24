const balloon = document.querySelector('.balloon');
const home = document.querySelector('.home');

const locateRotate = [];

function createBalloon() {
	function deleteBalloon(e) {
		const nodes = e.target.parentElement;
		nodes.remove();
	}

	const getRandomBalloon = () => {
		return Math.floor(Math.random() * 6) + 1;
	};

	const getRandomRotate = () => {
		let rotate = Math.floor(Math.random() * (45 + 45) - 45);

		// 같은 위치에 풍선이 생기는 것 방지
		while (locateRotate.includes(rotate)) {
			if (!locateRotate.includes(rotate)) break;
			rotate = Math.floor(Math.random() * (45 + 45) - 45);
		}
		locateRotate.push(rotate);
		return rotate;
	};

	const getRandomHeight = () => {
		return Math.floor(Math.random() * (40 - 10) + 10);
	};

	const randomHeight = getRandomHeight();

	const balloonList = document.querySelector('.balloon_list');
	const balloon = document.createElement('button');
	balloon.className = 'balloon';
	balloon.style.transform = `rotate(${getRandomRotate()}deg) translate(-50%, 0%)`;
	balloon?.addEventListener('click', (e) => deleteBalloon(e));

	const balloonImg = document.createElement('img');
	balloonImg.src = `./imgs/balloon_${getRandomBalloon()}.png`;
	balloonImg.alt = 'baloon';
	balloonImg.style.top = randomHeight + '%';

	const line = document.createElement('div');
	line.className = 'line';
	line.style.height = 100 - randomHeight + '%';

	balloon.append(balloonImg, line);
	balloonList.append(balloon);
}

home.addEventListener('click', createBalloon);
