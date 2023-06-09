import { Component } from '@angular/core';
// import * as THREE from 'three';
// // import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';




import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'threed-models';

  name = 'Angular';

  ngOnInit() {
  //   const scene = new THREE.Scene();

  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );
  //   const renderer = new THREE.WebGLRenderer();
  //   const controls = new OrbitControls(camera, renderer.domElement)
  //   controls.enableDamping = true
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   document.body.appendChild(renderer.domElement);
  //   const geometry = new THREE.PlaneGeometry(1, 1, 1);
  // //   const envTexture = new THREE.CubeTextureLoader().load([
  // //     './assets/img/px_25.jpg',
  // //     './assets/img/nx_25.jpg',
  // //     './assets/img/py_25.jpg',
  // //     './assets/img/pz_25.jpg',
  // //     './assets/img/nz_25.jpg'
  // // ])
  // // envTexture.mapping = THREE.CubeReflectionMapping
  //   // const material = new THREE.MeshBasicMaterial({ color: 0xb2ffc8, fog: true, wireframe: false, opacity: 0.75  });
  //   const material = new THREE.MeshBasicMaterial();
  // //   const material = new THREE.MeshPhysicalMaterial({
  // //     color: 0xb2ffc8,
  // //     envMap: envTexture,
  // //     metalness: 0.25,
  // //     roughness: 0.1,
  // //     opacity: 1.0,
  // //     transparent: true,
  // //     transmission: 0.99,
  // //     clearcoat: 1.0,
  // //     clearcoatRoughness: 0.25
  // // })
  //   // const cube = new THREE.Mesh(geometry, material);
  //   // scene.add(cube);
  //   // var loader = new STLLoader();
	// 	// loader.load( 'assets/1.stl' );
  //   const loader = new STLLoader();
  //   const white = new THREE.Color( 0xffffff ); // hexadecimal
  //   loader.load( './assets/export-1.stl', function ( geometry ) {

	// 				// const material = new THREE.MeshLambertMaterial( { 
  //           // color: 0xff9c7c, 
  //           // specular: 0x494949, 
  //           // shininess: 200,
  //           // overdraw:true,
  //           // color: 0xaa0000,
  //           // shading: THREE.FlatShading
  //         // } );

          







  //         scene.background = white;
	// 				const mesh = new THREE.Mesh( geometry, material );
  //         let boxSize = new THREE.Vector3();
  //         const box = new THREE.Box3().setFromObject(mesh);
  //         const size = box.getSize(boxSize);
  //         console.log(mesh, size);
	// 				mesh.position.set( 0, 0, 0 );
	// 				mesh.rotation.set( 1, - Math.PI / 2, 0.5 );
	// 				mesh.scale.set( 0.01, 0.01, 0.01 );


  //         mesh.material.color.setHex( 0xF48225 );



	// 				// mesh.castShadow = true;
	// 				// mesh.receiveShadow = true;

	// 				scene.add( mesh );

	// 			} );
  //   let boxSize = new THREE.Vector3();;
  //   const animate = function () {
  //     requestAnimationFrame(animate);
  //     const mesh = new THREE.Mesh( geometry, material );
  //     mesh.rotation.x += 1;
  //     mesh.rotation.y += 1;

  //     renderer.render(scene, camera);
  //   };
  //   camera.position.z = 5;
  //   renderer.render(scene, camera);
  //   animate();














const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))


/////////////////   Default Light /////////////////////
  // const light = new THREE.SpotLight()
  // light.position.set(20, 20, 20)
  // scene.add(light)
/////////////////   Default Light /////////////////////


///// ////////////   Spotlight /////////////////////
  // const spotLight = new THREE.SpotLight( 0xffffff );
  // spotLight.position.set( 100, 1000, 100 );
  // spotLight.castShadow = false;
  // spotLight.shadow.mapSize.width = 1024;
  // spotLight.shadow.mapSize.height = 1024;
  // spotLight.shadow.camera.near = 500;
  // spotLight.shadow.camera.far = 4000;
  // spotLight.shadow.camera.fov = 30;
  // scene.add( spotLight );
/////////////////   Spotlight /////////////////////

/////////////// Ambient Light ///////////////////
  // const light = new THREE.AmbientLight( 0xffffff ); // soft white light
  // scene.add( light );
/////////////// Ambient Light ///////////////////

/////////////// Ambient Light ///////////////////
  // const light = new THREE.AmbientLightProbe( 0xffffff ); // soft white light
  // scene.add( light );
/////////////// Ambient Light ///////////////////

/////////////////////////// HemisphereLight ///////////////
  const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  scene.add( light );
/////////////////////////// HemisphereLight ///////////////




console.log('size'+window.innerWidth / window.innerHeight);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 3
camera.position.x = 1
camera.position.y = 1

const renderer = new THREE.WebGLRenderer()
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const envTexture = new THREE.CubeTextureLoader().load([
      './assets/img/px_25.jpg',
      './assets/img/nx_25.jpg',
      './assets/img/py_25.jpg',
      './assets/img/pz_25.jpg',
      './assets/img/nz_25.jpg'
])
envTexture.mapping = THREE.CubeReflectionMapping

const material = new THREE.MeshPhysicalMaterial({
    color: 0xFFFFFF,
    // envMap: envTexture,
    metalness: 0.25,
    roughness: 0.1,
    opacity: 1.0,
    transparent: false,
    // transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25
})
// const material = new THREE.MeshLambertMaterial({
//   // overdraw:true,
//   color: 0xaa0000,
//   // shading: THREE.FlatShading
// });

const loader = new STLLoader()
loader.load(
  './assets/slotted_disk.stl',
    function (geometry) {
        const mesh = new THREE.Mesh(geometry, material)
        mesh.scale.set(0.01, 0.01, 0.01)
        scene.add(mesh)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
  }
}
