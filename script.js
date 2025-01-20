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


const menus = document.querySelectorAll('.menu-bubble')
menus.forEach(menu => menu.addEventListener("mouseover", e => positionBubbles(menu)))

menus.forEach(menu => menu.addEventListener("mouseleave", () => {
    const bubbles = Array.from(menu.children).filter(child => child.classList.contains('menu-item'))
    bubbles.forEach(bubble => bubble.style.transform = `translate(-50%, -50%)`)
}))