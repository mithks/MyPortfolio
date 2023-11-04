import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap"


export default class Preloader extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets(){
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        
    }

    firstIntro(){
        return new Promise ((resolve) => {
            this.timeline = new GSAP.timeline();

            if (this.device === "desktop"){
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve,
                });
            }
            else{
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve,
                });
            }
        });
        
        
    }

    
    secondIntro(){
        return new Promise ((resolve) => {
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline.to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            }, "same")
            .to(this.roomChildren.cube.rotation, {
                y: 2*Math.PI + Math.PI/4,
            }, "same")
            .to(this.roomChildren.cube.scale, {
                x: 1.25,
                y: 1.25,
                z: 1.25,
            }, "same")
            .to(this.camera.orthographicCamera.position, {
                y: 3.5,
            }, "same")
            .to(this.roomChildren.cube.position, {
                x: 0.135078,
                y: 0.761609,
                z: 0.297591,
            }, "same")
            .set(this.roomChildren.platform.scale, {
                x: 1,
                y: 1,
                z: 1,
            }, "same1")
            .to(this.roomChildren.window.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }, "same1")
            .to(this.roomChildren.cube.scale, {
                x: 0,
                y: 0,
                z: 0,
            })
            .to(this.roomChildren.wood1.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.wood2.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.wood3.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.wood4.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.wood5.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.2,
            })
            .to(this.roomChildren.bed.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.4,
            })
            .to(this.roomChildren.grass1.scale, {
                x: 0.828986,
                y: 0.828986,
                z: 0.828986,
                ease: "back.out(2.2)",
                duration: 0.2,
            })
            .to(this.roomChildren.bush1.scale, {
                x: 0.45769,
                y: 0.45769,
                z: 0.45769,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.bush2.scale, {
                x: 0.252837,
                y: 0.252837,
                z: 0.252837,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.bush3.scale, {
                x: 0.456313,
                y: 0.456313,
                z: 0.456313,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.bush4.scale, {
                x: 0.298637,
                y: 0.298637,
                z: 0.298637,
                ease: "back.out(2.2)",
                duration: 0.2,
            })
            .to(this.roomChildren.rock.scale, {
                x: 0.417489,
                y: 0.417489,
                z: 0.417489,
                ease: "back.out(2.2)",
                duration: 0.2,
            })
            .to(this.roomChildren.curtain.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.3,
            })
            .to(this.roomChildren.light1.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.3,
            }, "same2").to(this.roomChildren.light2.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.3,
            }, "same2")
            .to(this.roomChildren.painting.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.3,
            },  "same2")
            .to(this.roomChildren.plant1.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.3,
            }, "same3").to(this.roomChildren.plant2.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.3,
            }, "same3")
            .to(this.roomChildren.seat1.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.3,
            }, "same4").to(this.roomChildren.seat2.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.3,
            }, "same4")
            .to(this.roomChildren.table.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.3,
            }, "same4")
            .to(this.roomChildren.tree1.scale, {
                x: 0.208686,
                y: 0.208686,
                z: 0.208686,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.tree2.scale, {
                x: 0.074791,
                y: 0.074791,
                z: 0.074791,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.tree3.scale, {
                x: 0.113239,
                y: 0.113239,
                z: 0.113239,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.tree4.scale, {
                x: 0.043044,
                y: 0.043044,
                z: 0.043044,
                ease: "back.out(2.2)",
                duration: 0.5,
                onComplete: resolve,
            });
            
        });
        
    }

    onScroll(e){
        if (e.deltaY > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e){
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e){
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListeners(){
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro(){
        await this.firstIntro();
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    async playSecondIntro(){
        await this.secondIntro();
        this.emit("enablecontrols");
    }
}