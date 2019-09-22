import React from "react";
import withWaitForCondition from '../../components/WaitForCondition/withWaitForCondition';

class ObjectRenderer extends React.Component {
  state = { loading: true };

  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    //ADD SCENE
    this.scene = new window.THREE.Scene();
    this.scene.background = new window.THREE.Color(0x666666);

    //ADD CAMERA
    this.camera = new window.THREE.PerspectiveCamera(
      45,
      width / height,
      1,
      1000
    );
    this.camera.position.set(0, 0, this.props.zPosition);
    this.camera.zoom = 500;

    // Add lights
    var ambientLight = new window.THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    var pointLight = new window.THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, this.props.zPosition + 2);
    this.scene.add(pointLight);

    //ADD RENDERER
    this.renderer = new window.THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor('#fff');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    // Load stuff
    const loader = new window.THREE.GLTFLoader();
    loader.load(this.props.modelPath, (object) => {
      object.scene.position.set(0, 0, this.props.zPosition - this.props.zOffset);
      console.log(object.scene);

      this.object = object.scene;
      this.scene.add(object.scene);
      this.setState({ loading: false });
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

const ObjectRendererWithWait = withWaitForCondition(
  () =>
    'THREE' in window &&
    'DDSLoader' in window.THREE &&
    'MTLLoader' in window.THREE &&
    'OBJLoader' in window.THREE &&
    'GLTFLoader' in window.THREE,
  200,
)(ObjectRenderer);


export default ObjectRendererWithWait;
