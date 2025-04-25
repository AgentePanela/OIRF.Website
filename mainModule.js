const spriteUrls = [
    'gringo.png',
    'human1.png',
    'dummy.png',
    'battery.png',
    'box.png',
    //'evac.png',
    'plant1.png',
    'plant2.png',
    //'poster.png',
    //'alarm.png',
];
  
function getRandomSpriteUrl() {
    const index = Math.floor(Math.random() * spriteUrls.length);
    return spriteUrls[index];
}
  
function getRandomDirection() {
    const dx = (Math.random() * 200 - 100) + 'vw';
    const dy = (Math.random() * 200 - 100) + 'vh';
    return { dx, dy };
}
  
function spawnSprite() {
    if (localStorage.getItem("sprites") == 'false')
        return;
    const sprite = document.createElement('div');
    sprite.classList.add('sprite');
  
    sprite.style.backgroundImage = `url('/media/sprites/${getRandomSpriteUrl()}')`;
  
    const scale = 1.5 + Math.random() * 1.5;
    const size = 32 * scale;
    sprite.style.width = `${size}px`;
    sprite.style.height = `${size}px`;
  
    let x = Math.random() * (window.innerWidth - size);
    let y = Math.random() * (window.innerHeight - size);
    let angle = 0;
  
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;
  
    document.body.appendChild(sprite);
  
    let lifetime = 0;
    const maxLifetime = 10 * 60;
    const fadeStart = 8 * 60;
  
    function update() {
        x += dx;
        y += dy;
  
        // Verificar colisão com as bordas da tela e ricochetear
        if (x < 0) {
            x = 0;
            dx *= -1;
        } else if (x + size > window.innerWidth - 64) { //64 left limit
            x = window.innerWidth - 64 - size;
            dx *= -1;
        }
  
        if (y < 0) {
            y = 0;
            dy *= -1;
        } else if (y + size > window.innerHeight - 64) {
            y = window.innerHeight - 64- size;
            dy *= -1;
        }
    
        angle += 2;
    
        sprite.style.left = `${x}px`;
        sprite.style.top = `${y}px`;
        sprite.style.transform = `rotate(${angle}deg)`;
    
        if (lifetime > fadeStart) {
            const fade = 1 - (lifetime - fadeStart) / (maxLifetime - fadeStart);
            sprite.style.opacity = fade;
        }
    
        if (lifetime < maxLifetime) {
            lifetime++;
            requestAnimationFrame(update);
        } else {
            sprite.remove();
        }
    }
  
    update();
}
  
setInterval(() => {
    if (document.hasFocus() && localStorage.getItem('sprites') !== 'false') {
        spawnSprite();
    }
}, 2000);

spawnSprite
spawnSprite
  