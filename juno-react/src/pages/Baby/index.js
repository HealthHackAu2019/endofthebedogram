import React from "react";
import withWaitForCondition from '../../components/WaitForCondition/withWaitForCondition';

const babyModel = ("https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/baby.obj");
const carMaterial = ("https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/TechnicLEGO_CAR_1.mtl");

class Baby extends React.Component {
  state = { loading: true };

  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    //ADD SCENE
    this.scene = new window.THREE.Scene()
    this.scene.background = new window.THREE.Color(0x111111);

    //ADD CAMERA
    this.camera = new window.THREE.PerspectiveCamera(
      45,
      width / height,
      1,
      1000
    );
    this.camera.position.set(0, 0, -50);
    this.camera.zoom = 500;

    // Add lights
    var ambientLight = new window.THREE.AmbientLight(0xcccccc, 0.8);
    this.scene.add(ambientLight);

    var pointLight = new window.THREE.PointLight(0xffffff, 1);
    this.camera.add(pointLight);


    //ADD RENDERER
    this.renderer = new window.THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor('#fff')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    // Load stuff
    const mgr = new window.THREE.LoadingManager();
    mgr.addHandler(/\.dds$/i, new window.THREE.DDSLoader());

    const mtlLoader = new window.THREE.MTLLoader();
    mtlLoader.load(carMaterial, (material) => {
      material.preload();
      const loader = new window.THREE.OBJLoader();
      loader.setMaterials(material).load(babyModel, (object) => {
        object.traverse(function(child) {
          if (child instanceof window.THREE.Mesh) {
            child.material.color = new window.THREE.Color(0xffb830);
          }
        });
        object.position.set(0, 0, -53);

        this.object = object;
        this.scene.add(object);
        this.setState({ loading: false });
      });
    });

    // Go
    this.start();
  }
  componentWillUnmount() {
    this.stop()
    if (this.renderer) {
      this.mount.removeChild(this.renderer.domElement);
    }
  }

  // Use requestAnimationFrame to kick off the rendering
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  // Cancel animation frame when you don't want it to keep rendering
  stop = () => {
    cancelAnimationFrame(this.frameId);
  }

  // Rotate and render
  animate = () => {
    if (this.object) {
      this.object.rotation.y += 0.01;
    }

    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  render(){
    return(
      <>
        {this.state.loading ? <p>Loading...</p> : null }
        <div
          style={{ width: '400px', height: '400px' }}
          ref={(mount) => { this.mount = mount }}
        />
      </>
    )
  }
}

const WithWaitForCondition = withWaitForCondition(
  () =>
    'THREE' in window &&
    'DDSLoader' in window.THREE &&
    'MTLLoader' in window.THREE &&
    'OBJLoader' in window.THREE &&
    'GLTFLoader' in window.THREE,
  200,
)(Baby);

export default WithWaitForCondition;
