import { Component, OnInit, Input } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

@Component({
  selector: 'app-render-object',
  templateUrl: './render-object.component.html',
  styleUrls: ['./render-object.component.css']
})
export class RenderObjectComponent implements OnInit {
  title = 'threed-models';
  image2: string = '';
  name = 'Angular';
  camera: any;
  renderer: any;
  animateVar: any;
  controls: any;
  stats: any;
  scene: any;
  link: any;
  container: any;
  finalReadFile: any;

  @Input() file3dInput: any;

  constructor() {


    

  }

  ngOnChanges() {
    // console.log(this.file3dInput);
    
  }
  ngOnInit(): void {


    // console.log(this.file3dInput);
    // if (this.file3dInput) {
    //   const file = this.file3dInput;
    //   const reader = new FileReader();
    //   reader.onload = e => {
    //     this.finalReadFile = reader.result;
    //     console.log(this.finalReadFile);
    //   } 
    //   reader.readAsDataURL(file);
    // }


    console.log(this.file3dInput);
    this.scene = new THREE.Scene()
    this.scene.add(new THREE.AxesHelper(5))

    /////////////////////////// HemisphereLight ///////////////
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(light);
    /////////////////////////// HemisphereLight ///////////////

    console.log('size' + window.innerWidth / window.innerHeight);
    this.camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
    this.camera.position.z = 3
    this.camera.position.x = 1
    this.camera.position.y = 1
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.container = document.getElementById('object_canvas');
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

    
    this.stats = new Stats()
    this.addEventListeners();
    this.animate();

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0.25,
      roughness: 0.1,
      opacity: 1.0,
      transparent: false,
      clearcoat: 1.0,
      clearcoatRoughness: 0.25
    })
    // if(this.scene){
      // this.scene?.remove()
    // };
    // console.log(this.scene);
    const loader = new STLLoader()
    loader.load(
      this.file3dInput,
      (geometry) => {
        const mesh = new THREE.Mesh(geometry, material)
        console.log(mesh);
        this.scene.add(mesh)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.log(error)
      }
    );





  }

  

  addEventListeners() {
    // window.addEventListener('resize', this.onWindowResize, false);
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.render()
  }

  animate = () => {
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
    this.image2 = dataURL;
  }

  dwnImg() {
    this.link = document.getElementById('link');
    this.link.setAttribute('download', 'MintyPaper.png');
    this.link.click();
  }

  

}
