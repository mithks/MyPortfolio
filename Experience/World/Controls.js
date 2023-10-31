import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

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

        GSAP.registerPlugin(ScrollTrigger);
        
        this.setScrollTrigger();

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
                });
            },
          
            // all
            all: function () {
            },
          });
    }

    resize(){
        
    }

    update(){
        
        
    }
}