let allMenusOpen = false
const menus = document.querySelectorAll('.menu-bubble')

function positionBubbles(parent){
    const bubbles = Array.from(parent.children).filter(child => child.classList.contains('menu-item'))
    let deg,start    
    if (parent.classList.contains('menu-item')) {
        deg = 180 / (bubbles.length + 1)
        start = parent.deg - 90 + deg
    } else {
        deg = 360 / bubbles.length
        start = 0
    }
    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        const dist = (bubble.offsetWidth + parent.offsetWidth) / 2 + 10
        bubble.style.transform = `translate(-50%, -50%) rotate(${start + deg * i}deg) translateY(-${dist}px) rotate(${-(start + deg * i)}deg)`
        bubble.deg = start + deg * i
    }
}

function forceAspectRatio(el){
    const w = window.getComputedStyle(el).getPropertyValue('width')
    const h = window.getComputedStyle(el).getPropertyValue('height')
    el.style.height = w > h ? w : h
    el.style.width = w > h ? w : h
}

function toggleMenu(){
    allMenusOpen = !allMenusOpen
    if (allMenusOpen) {
        menus.forEach(menu => positionBubbles(menu))
        menus.forEach(menu => menu.removeEventListener("mouseleave", menu.toCenter))
        document.querySelectorAll('.menu-item').forEach(el => el.classList.add('toggled'))
    } else {
        menus.forEach(menu => menu.addEventListener("mouseleave", menu.toCenter))
        document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('toggled'))
    }
}

function addFish(){
    const fish = document.createElement('img')
    fish.src = 'img/hal.png'
    fish.style.position = "absolute"
    fish.style.top = `${Math.random() * 100}%`
    fish.style.left = `-20%`
    fish.style.animation = `swim ${Math.random() * 8 + 9}s linear ${Math.random() * 5 - 3}s infinite`
    fish.style.height = `${Math.random() * 0.5 + 0.5}rem`
    fish.style.filter = `hue-rotate(${Math.random() * 180}deg)`
    if (Math.random() > 0.5) {
        fish.style.transform = "scaleX(-1)"
        fish.style["animation-direction"] = "reverse"
    }
    document.getElementById("sea").appendChild(fish)
}

for (let i = 0; i < 8; i++) {
    addFish()
}

document.querySelectorAll('.bubble').forEach(forceAspectRatio)

menus.forEach(menu => menu.addEventListener("mouseover", e => positionBubbles(menu)))

menus.forEach(menu => menu.toCenter = () => {
    const bubbles = Array.from(menu.children).filter(child => child.classList.contains('menu-item'))
    bubbles.forEach(bubble => bubble.style.transform = `translate(-50%, -50%)`)
})

menus.forEach(menu => menu.addEventListener("mouseleave", menu.toCenter))