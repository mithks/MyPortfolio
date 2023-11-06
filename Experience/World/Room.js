import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience.js";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current : 0,
            target : 0,
            ease : 0.1,
        };

        this.setModel();
        //this.setAnimation();
        this.onMouseWheel();

    }

    setModel(){
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group){
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            if (child.name === "Cube.018" || child.name === "Cube.019" ||child.name === "Cube.020" ){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xffffff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }
        });

        const width = 2;
        const height = 2;
        const intensity = 2;
        const rectLight = new THREE.RectAreaLight( 0xDC654C, intensity,  width, height );
        rectLight.position.set( 0.147278, 1.5, 0.3 );
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;
        this.actualRoom.add( rectLight )

        //const rectLightHelper = new RectAreaLightHelper( rectLight );
        //rectLight.add( rectLightHelper );
        

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(1,1,1);
    }

    /*setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.animate = this.mixer.clipAction(this.room.animations[0]);
        this.animate.play();
    }*/

    onMouseWheel(){
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth/2)*2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }

    resize(){
        
    }

    update(){
        //this.mixer.update(this.time.delta * 0.001);

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease,
        );
        this.actualRoom.rotation.y = this.lerp.current;
    }
}