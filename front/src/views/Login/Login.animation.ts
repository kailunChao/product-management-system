import gsap from 'gsap'

const fadeInOut = (element: HTMLDivElement) => {
  const timeline = gsap.timeline()
  timeline
    .to(element, { opacity: 0, duration: 0.5 })
    .to(element, { x: 44, duration: 1 })
    .to(element, { opacity: 1, duration: 0.5 })
}

const fadeInOutV2 = (element: HTMLDivElement) => {
  const timeline = gsap.timeline()
  timeline
    .to(element, { opacity: 0, duration: 0.5 })
    .to(element, { x: 502, duration: 1 })
    .to(element, { opacity: 1, duration: 0.5 })
}

const moveCircleToLeft = (element: HTMLDivElement) => {
  const timeline = gsap.timeline()
  timeline
    .set(element, {
      transformOrigin: '0 50%'
    })
    .to(element, { width: 500, height: 500, duration: 0.5, boxShadow: 'none' })
    .to(element, { x: 0, duration: 1 })
    .set(element, {
      transformOrigin: '100% 50%'
    })
    .to(element, {
      scale: 1.4,
      duration: 0.5,
      boxShadow: '0px 0px 6px 5px #d7d7d71f'
    })
}

const moveCircleToRight = (element: HTMLDivElement) => {
  const timeline = gsap.timeline()
  timeline
    .set(element, {
      transformOrigin: '100% 50%'
    })
    .set(element, {
      scale: 1,
      width: 700,
      height: 700,
      x: -202
    })
    .to(element, {
      scale: 0.71,
      duration: 0.5,
      boxShadow: 'none'
    })
    .to(element, { x: 202, duration: 1 })
    .set(element, { transformOrigin: '0 50%', x: 402 })
    .to(element, {
      scale: 1,
      duration: 0.5,
      boxShadow: '0px 0px 6px 5px #d7d7d71f'
    })
}

const moveGirlToRight = (element: HTMLDivElement) => {
  const timelineGirl = gsap.timeline()
  timelineGirl
    .to(element.children[0], {
      scale: 1.2,
      ease: 'none',
      duration: 0.2
    })
    .to(element.children[0], {
      scale: 0.9,
      ease: 'none',
      duration: 0.2
    })
    .to(element.children[0], {
      scale: 0.7,
      opacity: 0,
      duration: 0.1
    })
    .to(element.children[0], {
      scale: 0,
      duration: 0.3
    })
    .set(element.children[0], {
      x: 450
    })
    .to(element.children[0], {
      scale: 0.7,
      opacity: 0,
      duration: 0.3
    })
    .to(element.children[0], {
      scale: 0.9,
      opacity: 1,
      ease: 'none',
      duration: 0.1
    })
    .to(element.children[0], {
      scale: 1.2,
      ease: 'none',
      duration: 0.2
    })
    .to(element.children[0], {
      scale: 1,
      ease: 'none',
      duration: 0.2
    })
  // .to(element.children[0], {
  //   scale: 1,
  //   ease: 'none',
  //   duration: 0.2
  // })

  const timelineshadow = gsap.timeline()
  timelineshadow
    .to(element.children[1], {
      ease: 'power1.out',
      x: 30,
      y: 10,
      duration: 0.2,
      filter: 'blur(12px)'
    })
    .to(element.children[1], {
      scale: 0.9,
      ease: 'none',
      x: -12,
      y: 0,
      duration: 0.2,
      filter: 'blur(0px)'
    })
    .to(element.children[1], {
      scale: 0.7,
      ease: 'none',
      duration: 0.1,
      filter: 'blur(9px)'
    })
    .to(element.children[1], {
      scale: 0,
      ease: 'none',
      duration: 0.3,
      filter: 'blur(39px)'
    })
    .set(element.children[1], {
      x: 438
    })
    .to(element.children[1], {
      scale: 0.7,
      ease: 'none',
      duration: 0.3,
      filter: 'blur(9px)'
    })
    .to(element.children[1], {
      scale: 0.9,
      ease: 'none',
      duration: 0.1,
      filter: 'blur(0px)'
    })
    .to(element.children[1], {
      scale: 1,
      ease: 'none',
      x: 479,
      y: 0,
      duration: 0.2,
      filter: 'blur(12px)'
    })
    .to(element.children[1], {
      scale: 1,
      ease: 'none',
      x: 457,
      y: 10,
      duration: 0.2,
      filter: 'blur(6px)'
    })
}

const moveGirlToLeft = (element: HTMLDivElement) => {
  const timelineGirl = gsap.timeline()
  timelineGirl
    .to(element.children[0], {
      scale: 1.2,
      ease: 'none',
      duration: 0.2
    })
    .to(element.children[0], {
      scale: 0.9,
      ease: 'none',
      duration: 0.2
    })
    .to(element.children[0], {
      scale: 0.7,
      opacity: 0,
      duration: 0.1
    })
    .to(element.children[0], {
      scale: 0,
      duration: 0.3
    })
    .set(element.children[0], {
      x: 0
    })
    .to(element.children[0], {
      scale: 0.7,
      opacity: 0,
      duration: 0.3
    })
    .to(element.children[0], {
      scale: 0.9,
      opacity: 1,
      ease: 'none',
      duration: 0.1
    })
    .to(element.children[0], {
      scale: 1.2,
      ease: 'none',
      duration: 0.2
    })
    .to(element.children[0], {
      scale: 1,
      ease: 'none',
      duration: 0.2
    })
  // .to(element.children[0], {
  //   scale: 1,
  //   ease: 'none',
  //   duration: 0.2
  // })

  const timelineshadow = gsap.timeline()
  timelineshadow
    .to(element.children[1], {
      ease: 'power1.out',
      x: 479,
      y: 10,
      duration: 0.2,
      filter: 'blur(12px)'
    })
    .to(element.children[1], {
      scale: 0.9,
      ease: 'none',
      x: 435,
      y: 0,
      duration: 0.2,
      filter: 'blur(0px)'
    })
    .to(element.children[1], {
      scale: 0.7,
      ease: 'none',
      duration: 0.1,
      filter: 'blur(9px)'
    })
    .to(element.children[1], {
      scale: 0,
      ease: 'none',
      duration: 0.3,
      filter: 'blur(39px)'
    })
    .set(element.children[1], {
      x: -12
    })
    .to(element.children[1], {
      scale: 0.7,
      ease: 'none',
      duration: 0.3,
      filter: 'blur(9px)'
    })
    .to(element.children[1], {
      scale: 0.9,
      ease: 'none',
      duration: 0.1,
      filter: 'blur(0px)'
    })
    .to(element.children[1], {
      scale: 1,
      ease: 'none',
      x: 30,
      y: 10,
      duration: 0.2,
      filter: 'blur(12px)'
    })
    .to(element.children[1], {
      scale: 1,
      ease: 'none',
      x: 6,
      y: 9,
      duration: 0.2,
      filter: 'blur(9px)'
    })
}

const backgroundAnimation = (element: HTMLDivElement) => {
  gsap.to(element, {
    keyframes: [
      {
        backgroundPosition:
          '-85vmax -85vmax, 70vmax -40vmax, 20vmax 20vmax, -20vmax 0vmax, 60vmax 60vmax',
        duration: 2
      },
      {
        backgroundPosition:
          '-75vmax -75vmax, 50vmax -20vmax, 0vmax 0vmax, -40vmax -20vmax, 40vmax 40vmax',
        duration: 2
      }
    ],
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut'
  })
}

const cloudAnimation = (element: HTMLDivElement) => {
  gsap.to(element.children[1], {
    y: -506,
    duration: 1.2,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut'
  })

  gsap.to(element.children[2], {
    y: -423,
    duration: 1.2,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut',
    delay: 0.3
  })

  gsap.to(element.children[3], {
    y: 134,
    duration: 1.2,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut',
    delay: 0.7
  })
}

export {
  fadeInOut,
  fadeInOutV2,
  moveCircleToRight,
  moveCircleToLeft,
  moveGirlToLeft,
  moveGirlToRight,
  cloudAnimation,
  backgroundAnimation
}
