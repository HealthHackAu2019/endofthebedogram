// import React, { useEffect } from "react";

// function Baby() {
//   useEffect(() => {
//     var scene = new window.THREE.Scene();
//     var camera = new window.THREE.PerspectiveCamera( 0, window.innerWidth/window.innerHeight, 0.1, 1000 );
  
//     var renderer = new window.THREE.WebGLRenderer();
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     document.body.appendChild( renderer.domElement );
  
//     var loader = new window.THREE.OBJLoader();
//     loader.load( '', function ( object ) {
//       scene.add( object );
//     } );


//     renderer.render( scene, camera );
//   }, []);

//   return (
//     <div>
//     <p>Baby</p>
//     </div>
//   )
// };

import React from "react";
import React3 from "react-three-renderer";
import ObjectModel from 'react-three-renderer-objects';
const carModel = ("https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/TechnicLEGO_CAR_1.obj");
const carMaterial = ("https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/TechnicLEGO_CAR_1.mtl");

class Baby extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      scene: {}
    };
  }
componentDidMount() {
    const { scene } = this.refs;
    this.setState({ scene });
  }
render() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        alpha={true}
      >
        <scene ref="scene">
          <perspectiveCamera
            key={`perspectiveCamera`}
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={new window.THREE.Vector3(0, 0, 25)}
            lookAt={new window.THREE.Vector3(0, 0, 0)}
          />
          <group name="carGroup">
            <ObjectModel
              name="boat"
              model={carModel}
              material={carMaterial}
              scene={this.state.scene}
              group="carGroup"
            />
          </group>
        </scene>
      </React3>
    );
  }
}

export default Baby;
