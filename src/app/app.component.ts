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
  image2: string = '';
  name = 'Angular';
  camera: any;
  renderer: any;
  animateVar: any;
  controls: any;
  stats: any;
  scene: any;
  link:any;
  ngOnInit() {

    this.scene = new THREE.Scene()
    this.scene.add(new THREE.AxesHelper(5))

    /////////////////////////// HemisphereLight ///////////////
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(light);
    /////////////////////////// HemisphereLight ///////////////

    console.log('size' + window.innerWidth / window.innerHeight);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 3
    this.camera.position.x = 1
    this.camera.position.y = 1

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

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
      './assets/export.stl',
      (geometry) => {
        const mesh = new THREE.Mesh(geometry, material)
        console.log(mesh);
        // mesh.scale.set(0.025, 0.025, 0.025)
        
        this.scene.add(mesh)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.log(error)
      }
    );
    this.stats = new Stats()
    // document.body.appendChild(this.stats.dom);
    this.addEventListeners();

    // animate()
    // }
    this.animate();
  }

  addEventListeners() {
    window.addEventListener('resize', this.onWindowResize, false);
  }






  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.render()
  }

  animate =() => {
    requestAnimationFrame(this.animate)

    this.controls.update()

    this.render()
    

    this.stats.update()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
    var canvas = document.getElementsByTagName('canvas')[0];
    var dataURL = canvas.toDataURL('image/png');
    var imgSrc = dataURL.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    // var imgSrc = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    // window.location.href=imgSrc;
    this.image2 = dataURL;
    // console.log({ dataURL });


    
  }

  dwnImg(){
    this.link = document.getElementById('link');
    this.link.setAttribute('download', 'MintyPaper.png');
    // this.link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    this.link.click();
  }
}
