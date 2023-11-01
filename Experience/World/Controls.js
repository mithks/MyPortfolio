import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'


export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        this.room.children.forEach( child => {
            if (child.type === "RectAreaLight"){
                this.rectLight = child;
            }
        });

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;
        
        GSAP.registerPlugin(ScrollTrigger);
        
        this.setSmoothScroll();
        this.setScrollTrigger();


    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.3,
          disableRaf: true });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": ()=> {

                //Resets
                this.rectLight.width = 2;
                this.rectLight.height = 2;
                this.room.scale.set(1, 1, 1);

                //First Section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: ()=> {
                        return this.sizes.width * 0.00155;
                    },
                });

                //Second Section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                })
                .to(this.room.position, {
                    x: ()=> {
                        return 0;
                    },
                    z: ()=> {
                        return this.sizes.height * 0.0075;
                    },
                }, "same")
                .to(this.room.scale, {
                    x: 4,
                    y: 4,
                    z: 4,
                }, "same")
                .to(this.rectLight, {
                    width: 2 * 4,
                    height: 2 * 4,
                }, "same");

                //Third Section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                })
                .to(this.camera.orthographicCamera.position, {
                    y: 0,
                    x: -3,
                });
            },

            //Mobile
            "(max-width: 968px)": ()=> {

                //Resets
                this.room.scale.set(0.7, 0.7, 0.7);
                this.room.position.set(0, 0, 0);
                this.rectLight.width = 1.4;
                this.rectLight.height = 1.4;

                //First Section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                })
                .to(this.room.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                }, "same")
                .to(this.rectLight, {
                    width: 2,
                    height: 2,
                }, "same");
                //Second Section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                })
                .to(this.room.scale, {
                    x: 2,
                    y: 2,
                    z: 2,
                }, "same")
                .to(this.rectLight, {
                    width: 2 * 2,
                    height: 2 * 2,
                }, "same")
                .to(this.room.position, {
                    x: 1.5,
                }, "same");
                //Third Section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                })
                .to(this.room.position, {
                    x: 0.5,
                    z: -2.5,
                });
            },
          
            // all
            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")){
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    else{
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });

                //All Animations
                //First Section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });            
                
                //Second Section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleSecond.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                }, "same")
                .to(this.room.position, {
                    y: 0.5,
                }, "same");

                //Third Section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });    
            },
          });
    }

    resize(){
        
    }

    update(){
        
        
    }
}