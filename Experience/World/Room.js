import * as THREE from "three";

import Experience from "../Experience.js";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.setModel();
        //this.setAnimation();

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

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(1,1,1);
    }

    /*setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.animate = this.mixer.clipAction(this.room.animations[0]);
        this.animate.play();
    }*/

    resize(){
        
    }

    update(){
        //this.mixer.update(this.time.delta * 0.001);
    }
}