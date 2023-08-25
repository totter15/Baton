import images from './statics/images.json' assert { type: 'json' };

const home = document.querySelector('.home');
const locateRotate = [];

function preload(images) {
	images.forEach((image) => {
		const img = new Image();
		img.src = image;
	});
}

preload(images);

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
	return Math.floor(Math.random() * (90 - 40) + 40);
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

	const appearKeyfram = [{ height: 0 }, { height: randomHeight + '%' }];
	const appearOptions = {
		duration: 1000,
		easing: 'ease-out',
	};

	const balloonList = document.querySelector('.balloon_list');
	const balloon = document.createElement('button');
	balloon.className = 'balloon';
	balloon.style.width = getRandomSize() + 'px';
	balloon.style.height = randomHeight + '%';
	balloon.addEventListener('click', (e) => deleteBalloon(e));
	balloon.animate(appearKeyfram, appearOptions);
	balloon.animate(keyframe, options);

	const balloonImg = document.createElement('img');
	balloonImg.src = `./imgs/balloon_${getRandomBalloon()}.png`;
	balloonImg.alt = 'baloon';

	// 마우스를 올렸을시 풍선이 커지는 애니메이션
	balloonImg.addEventListener('mouseover', () => {
		balloonImg.style.width = '105%';
	});
	balloonImg.addEventListener('mouseleave', () => {
		balloonImg.style.width = '100%';
	});

	const line = document.createElement('div');
	line.className = 'line';

	balloon.append(balloonImg, line);
	balloonList.append(balloon);
}

home.addEventListener('click', createBalloon);
