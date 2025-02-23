import TweenVars = gsap.TweenVars;

export const gsapStyles: Record<string, TweenVars> = {
    mouseEnter: {
        width: 56,
        height: 56,
        background: '#f2f3f7',
        fontSize: 20,
        duration: 0.3,
        overwrite: 'auto',
    },

    mouseLeave: {
        width: 6,
        height: 6,
        background: '#42567A',
        fontSize: 0,
        duration: 0.3,
        overwrite: 'auto',
    },

    rotation: {
        duration: 1,
        ease: "power2.inOut"
    },

    activeDot: {
        width: 56,
        height: 56,
        background: '#f2f3f7',
        fontSize: 20,
        duration: 1,
        ease: "circ.inOut"
    },

    unActiveDot: {
        width: 6,
        height: 6,
        background: '#42567A',
        fontSize: 0,
        duration: 1,
        ease: "circ.inOut"
    }
}