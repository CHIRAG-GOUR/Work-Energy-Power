const fs = require('fs');

function fix(file, from, to) {
    let c = fs.readFileSync(file, 'utf8');
    c = c.replace(from, to);
    fs.writeFileSync(file, c);
}

// ChapterOneOne.jsx
let c11 = fs.readFileSync('src/pages/ChapterOneOne.jsx', 'utf8');
c11 = c11.replace(/left: \\calc\\(\\%\\)\\,/g, 'left: `calc(${(displacement / 20) * 80}%)`,');
c11 = c11.replace(/width: \\%\\,/g, 'width: `${(displacement / 20) * 80}%`,');
c11 = c11.replace(/transform: \\translateX\\(\\px\\)\\,/g, 'transform: `translateX(${Math.random() * (pushClicks > 0 ? 5 : 0)}px)`,');
c11 = c11.replace(/width: \\\\%\\,/g, 'width: `${wallStamina}%`,');
fs.writeFileSync('src/pages/ChapterOneOne.jsx', c11);

// ChapterOneThree.jsx
let c13 = fs.readFileSync('src/pages/ChapterOneThree.jsx', 'utf8');
c13 = c13.replace(/width: \\px\\,/g, 'width: `${force * 2}px`,').replace(/width: \\px\\,/g, 'width: `${forceX * 2}px`,');
c13 = c13.replace(/transform: \\rotate\\(\\-deg\\)\\,/g, 'transform: `rotate(${-angle}deg)`,');
fs.writeFileSync('src/pages/ChapterOneThree.jsx', c13);

// ChapterTwoTwo.jsx
let c22 = fs.readFileSync('src/pages/ChapterTwoTwo.jsx', 'utf8');
c22 = c22.replace(/width: \\px\\,/g, 'width: `${60 + mass}px`,');
c22 = c22.replace(/transition: isCrashing \? \\left s ease-in\\ : 'left 0s',/g, "transition: isCrashing ? `left ${20 / velocity}s ease-in` : 'left 0s',");
c22 = c22.replace(/transform: isCrashing \? \\translateX\\(\\px\\) rotate\\(\\deg\\)\\ : 'none',/g, "transform: isCrashing ? `translateX(${kineticEnergy / 10}px) rotate(${kineticEnergy / 50}deg)` : 'none',");
c22 = c22.replace(/transitionDelay: isCrashing \? \\s\\ : '0s',/g, "transitionDelay: isCrashing ? `${20 / velocity}s` : '0s',");
c22 = c22.replace(/transition: \\all 0\.2s s\\,/g, 'transition: `all 0.2s ${20 / velocity}s`,');
fs.writeFileSync('src/pages/ChapterTwoTwo.jsx', c22);

// ChapterTwoFour.jsx
let c24 = fs.readFileSync('src/pages/ChapterTwoFour.jsx', 'utf8');
c24 = c24.replace(/width: \\px\\, height: \\px\\,/g, 'width: `${50 + mass/2}px`, height: `${50 + mass/2}px`,');
c24 = c24.replace(/bottom: \\px\\,/g, 'bottom: `${40 + (height/20)*200}px`,');
c24 = c24.replace(/left: \\px\\,/g, 'left: `${80 + (50+mass/2)/2 - 2}px`,');
c24 = c24.replace(/width: \\px\\,/g, 'width: `${Math.sqrt(Math.pow(70, 2) + Math.pow(stretch, 2))}px`,');
c24 = c24.replace(/transform: \\rotate\\(\\deg\\)\\/g, 'transform: `rotate(${Math.atan2(stretch, 70) * (180/Math.PI)}deg)`');
c24 = c24.replace(/width: \\px\\,/g, 'width: `${Math.sqrt(Math.pow(70, 2) + Math.pow(stretch, 2))}px`,');
c24 = c24.replace(/transform: \\rotate\\(\\deg\\)\\/g, 'transform: `rotate(${-Math.atan2(stretch, 70) * (180/Math.PI)}deg)`');
c24 = c24.replace(/top: \\px\\,/g, 'top: `${50 + stretch}px`,');
c24 = c24.replace(/width: \\\\%\\,/g, 'width: `${stretch}%`,');
c24 = c24.replace(/bottom: \\px\\,/g, 'bottom: `${40 + (50+mass/2) + (height/20)*200}px`,');
fs.writeFileSync('src/pages/ChapterTwoFour.jsx', c24);

// ChapterTwoFive.jsx
let c25 = fs.readFileSync('src/pages/ChapterTwoFive.jsx', 'utf8');
c25 = c25.replace(/transform: \\rotate\\(\\deg\\)\\,/g, 'transform: `rotate(${uiAngle}deg)`,');
c25 = c25.replace(/height: \\%\\,/g, 'height: `${PE_Percent}%`,');
c25 = c25.replace(/height: \\%\\,/g, 'height: `${KE_Percent}%`,');
fs.writeFileSync('src/pages/ChapterTwoFive.jsx', c25);

console.log("Fixed files!");
