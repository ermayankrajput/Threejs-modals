import { Component } from '@angular/core';
import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'threed-models';

  name = 'Angular';

  ngOnInit() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const geometry = new THREE.PlaneGeometry(1, 1, 1);
  //   const envTexture = new THREE.CubeTextureLoader().load([
  //     './assets/img/px_25.jpg',
  //     './assets/img/nx_25.jpg',
  //     './assets/img/py_25.jpg',
  //     './assets/img/pz_25.jpg',
  //     './assets/img/nz_25.jpg'
  // ])
  // envTexture.mapping = THREE.CubeReflectionMapping
    // const material = new THREE.MeshBasicMaterial({ color: 0xb2ffc8, fog: true, wireframe: false, opacity: 0.75  });
    const material = new THREE.MeshBasicMaterial();
  //   const material = new THREE.MeshPhysicalMaterial({
  //     color: 0xb2ffc8,
  //     envMap: envTexture,
  //     metalness: 0.25,
  //     roughness: 0.1,
  //     opacity: 1.0,
  //     transparent: true,
  //     transmission: 0.99,
  //     clearcoat: 1.0,
  //     clearcoatRoughness: 0.25
  // })
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    // var loader = new STLLoader();
		// loader.load( 'assets/1.stl' );
    const loader = new STLLoader();
				loader.load( './assets/export-1.stl', function ( geometry ) {

					// const material = new THREE.MeshPhongMaterial( { color: 0xff9c7c, specular: 0x494949, shininess: 200 } );
					const mesh = new THREE.Mesh( geometry, material );
          let boxSize = new THREE.Vector3();
          const box = new THREE.Box3().setFromObject(mesh);
          const size = box.getSize(boxSize);
          console.log(mesh, size);
					mesh.position.set( 0, 0, 0 );
					mesh.rotation.set( 1, - Math.PI / 2, 0.5 );
					mesh.scale.set( 0.01, 0.01, 0.01 );

					mesh.castShadow = true;
					mesh.receiveShadow = true;

					scene.add( mesh );

				} );
    let boxSize = new THREE.Vector3();;
    const animate = function () {
      requestAnimationFrame(animate);
      const mesh = new THREE.Mesh( geometry, material );
      mesh.rotation.x += 1;
      mesh.rotation.y += 1;

      renderer.render(scene, camera);
    };
    camera.position.z = 5;
    renderer.render(scene, camera);
    animate();
  }
}
