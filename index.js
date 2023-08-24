const balloon = document.querySelector('.balloon');
const home = document.querySelector('.home');

const locateRotate = [];

function deleteBalloon(e) {
	const nodes = e.target.parentElement;
	nodes.className === 'balloon' && nodes.remove();
}

const getRandomSize = () => {
	return Math.floor(Math.random() * (150 - 120) + 120);
};

const getRandomBalloon = () => {
	return Math.floor(Math.random() * 9) + 1;
};

const getRandomRotate = () => {
	let rotate = Math.floor(Math.random() * (50 + 50) - 50);

	// 같은 위치에 풍선이 생기는 것 방지
	while (locateRotate.includes(rotate)) {
		if (!locateRotate.includes(rotate)) break;
		rotate = Math.floor(Math.random() * (50 + 50) - 50);
	}
	locateRotate.push(rotate);
	return rotate;
};

const getRandomHeight = () => {
	return Math.floor(Math.random() * (50 - 5) + 5);
};

function createBalloon() {
	const randomHeight = getRandomHeight();
	const randomRotate = getRandomRotate();
	const keyframe = [
		{ transform: `rotate(${randomRotate - 1}deg) translate(-50%, 0%)` },
		{ transform: `rotate(${randomRotate + 1}deg) translate(-50%, 0%)` },
	];
	const options = {
		duration: 1500,
		easing: 'ease-in-out',
		direction: 'alternate',
		iterations: Infinity,
	};

	const balloonList = document.querySelector('.balloon_list');
	const balloon = document.createElement('button');
	balloon.className = 'balloon';
	balloon.style.width = getRandomSize() + 'px';
	balloon.addEventListener('click', (e) => deleteBalloon(e));
	balloon.animate(keyframe, options);

	const balloonImg = document.createElement('img');
	balloonImg.src = `./imgs/balloon_${getRandomBalloon()}.png`;
	balloonImg.alt = 'baloon';
	balloonImg.style.top = randomHeight + '%';

	const line = document.createElement('div');
	line.className = 'line';
	line.style.height = 90 - randomHeight + '%';

	balloon.append(balloonImg, line);
	balloonList.append(balloon);
}

home.addEventListener('click', createBalloon);
