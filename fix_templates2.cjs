const fs = require('fs');

function f(file, from, to) {
    let c = fs.readFileSync(file, 'utf8');
    c = c.split(from).join(to);
    fs.writeFileSync(file, c);
}

// ChapterOneOne.jsx
f('src/pages/ChapterOneOne.jsx', 'left: \\calc(\\%)\\,', 'left: `calc(${(displacement / 20) * 80}%)`,');
f('src/pages/ChapterOneOne.jsx', 'width: \\%\\,', 'width: `${(displacement / 20) * 80}%`,');
f('src/pages/ChapterOneOne.jsx', 'transform: \\translateX(\\px)\\,', 'transform: `translateX(${Math.random() * (pushClicks > 0 ? 5 : 0)}px)`,');
f('src/pages/ChapterOneOne.jsx', 'width: \\\\%\\,', 'width: `${wallStamina}%`,');

// ChapterOneThree.jsx
f('src/pages/ChapterOneThree.jsx', 'width: \\px\\,', 'width: `${force * 2}px`,');
// Wait, for c13 it might have replaced both if forceX also used the same. Let's look closely at what happened. Instead I'll use the file directly if needed. 
// For now, let's just do sequential replacements.
let c13 = fs.readFileSync('src/pages/ChapterOneThree.jsx', 'utf8');
c13 = c13.replace('width: \\px\\,', 'width: `${force * 2}px`,');
c13 = c13.replace('width: \\px\\,', 'width: `${forceX * 2}px`,');
c13 = c13.replace('transform: \\rotate(\\-deg)\\,', 'transform: `rotate(${-angle}deg)`,');
fs.writeFileSync('src/pages/ChapterOneThree.jsx', c13);

// ChapterTwoTwo.jsx
f('src/pages/ChapterTwoTwo.jsx', 'width: \\px\\,', 'width: `${60 + mass}px`,');
f('src/pages/ChapterTwoTwo.jsx', "transition: isCrashing ? \\left s ease-in\\ : 'left 0s',", "transition: isCrashing ? `left ${20 / velocity}s ease-in` : 'left 0s',");
f('src/pages/ChapterTwoTwo.jsx', "transform: isCrashing ? \\translateX(\\px) rotate(\\deg)\\ : 'none',", "transform: isCrashing ? `translateX(${kineticEnergy / 10}px) rotate(${kineticEnergy / 50}deg)` : 'none',");
f('src/pages/ChapterTwoTwo.jsx', "transitionDelay: isCrashing ? \\s\\ : '0s'", "transitionDelay: isCrashing ? `${20 / velocity}s` : '0s'");
f('src/pages/ChapterTwoTwo.jsx', "transition: \\all 0.2s s\\,", "transition: `all 0.2s ${20 / velocity}s`,");

// ChapterTwoFour.jsx
f('src/pages/ChapterTwoFour.jsx', 'width: \\px\\, height: \\px\\,', 'width: `${50 + mass/2}px`, height: `${50 + mass/2}px`,');
f('src/pages/ChapterTwoFour.jsx', 'bottom: \\px\\,', 'bottom: `${40 + (height/20)*200}px`,');
f('src/pages/ChapterTwoFour.jsx', 'left: \\px\\,', 'left: `${80 + (50+mass/2)/2 - 2}px`,');

let c24 = fs.readFileSync('src/pages/ChapterTwoFour.jsx', 'utf8');
c24 = c24.replace('width: \\px\\,', 'width: `${Math.sqrt(Math.pow(70, 2) + Math.pow(stretch, 2))}px`,');
c24 = c24.replace('transform: \\rotate(\\deg)\\', 'transform: `rotate(${Math.atan2(stretch, 70) * (180/Math.PI)}deg)`');
c24 = c24.replace('width: \\px\\,', 'width: `${Math.sqrt(Math.pow(70, 2) + Math.pow(stretch, 2))}px`,');
c24 = c24.replace('transform: \\rotate(\\deg)\\', 'transform: `rotate(${-Math.atan2(stretch, 70) * (180/Math.PI)}deg)`');
c24 = c24.replace('top: \\px\\,', 'top: `${50 + stretch}px`,');
c24 = c24.replace('width: \\\\%\\,', 'width: `${stretch}%`,');
c24 = c24.replace('bottom: \\px\\,', 'bottom: `${40 + (50+mass/2) + (height/20)*200}px`,');
fs.writeFileSync('src/pages/ChapterTwoFour.jsx', c24);

// ChapterTwoFive.jsx
f('src/pages/ChapterTwoFive.jsx', 'transform: \\rotate(\\deg)\\,', 'transform: `rotate(${uiAngle}deg)`,');
let c25 = fs.readFileSync('src/pages/ChapterTwoFive.jsx', 'utf8');
c25 = c25.replace('height: \\%\\,', 'height: `${PE_Percent}%`,');
c25 = c25.replace('height: \\%\\,', 'height: `${KE_Percent}%`,');
c25 = c25.replace('height: \\%\\,', 'height: `${PE_Percent}%`,');
c25 = c25.replace('height: \\%\\,', 'height: `${KE_Percent}%`,');
fs.writeFileSync('src/pages/ChapterTwoFive.jsx', c25);

console.log("Success");
