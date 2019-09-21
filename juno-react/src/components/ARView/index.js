// @flow

import React, {useEffect, useRef, useState} from "react";
import withWaitForCondition from "../WaitForCondition/withWaitForCondition";

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const buildCubeMesh = (size) => {
  const geometry = new window.THREE.CubeGeometry(size, size, size);
  const material = new window.THREE.MeshNormalMaterial({
    transparent : true,
    opacity: 0.5,
    side: window.THREE.DoubleSide
  });

  const mesh = new window.THREE.Mesh(geometry, material);
  mesh.position.y = geometry.parameters.height / 2;
  return mesh;
};

const buildMesh = (meshType: 'cube1' | 'cube2') => {
  if (meshType === 'cube1') {
    return buildCubeMesh(1);
  } else {
    return buildCubeMesh(0.5);
  }
};

const createScene = (camera, mesh) => {
  const scene = new window.THREE.Scene();

  scene.visible = false;
  scene.add(camera);
  scene.add(mesh);

  return scene;
};

const ARView = ({ meshType, debug }: { meshType: 'cube1' | 'cube2', debug: boolean }) => {
  const [rendererElement, setRendererElement] = useState(null);
  const camera = useRef(null);
  const scene = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = null;
  }, []);

  useEffect(() => {
    if (!scene.current) {
      return;
    }

    scene.current.visible = false;

    scene.current = createScene(camera.current, buildMesh(meshType));
  }, [meshType]);

  useEffect(() => {
    const renderer  = new window.THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    renderer.setClearColor(new window.THREE.Color('lightgrey'), 0);
    renderer.setSize(640, 480);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';

    setRendererElement(renderer.domElement);

    const onRenderFcts = [];
    camera.current = new window.THREE.Camera();
    scene.current = createScene(camera.current, buildMesh(meshType));

    const arToolkitSource = new window.THREEx.ArToolkitSource({
      sourceType : 'webcam',
    });

    const onResize = () => {
      arToolkitSource.onResizeElement();
      arToolkitSource.copyElementSizeTo(renderer.domElement);
      if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
      }
    };

    arToolkitSource.init(onResize);
    window.addEventListener('resize', onResize);

    const arToolkitContext = new window.THREEx.ArToolkitContext({
      cameraParametersUrl: window.THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
      detectionMode: 'mono',
    });

    arToolkitContext.init(() => camera.current.projectionMatrix.copy(arToolkitContext.getProjectionMatrix()));

    onRenderFcts.push(() => {
      if (arToolkitSource.ready === false) {
        return;
      }
      arToolkitContext.update(arToolkitSource.domElement);
      scene.current.visible = camera.current.visible;
    });

    new window.THREEx.ArMarkerControls(arToolkitContext, camera.current, {
      type : 'pattern',
      patternUrl : window.THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
      changeMatrixMode: 'cameraTransformMatrix'
    });

    onRenderFcts.push(() => renderer.render(scene.current, camera.current));

    const animationInteval = setInterval(
      () => onRenderFcts.map(onRenderFct => onRenderFct()),
      16
    );

    return () => {
      clearInterval(animationInteval);
      renderer.domElement && renderer.domElement.remove();
      arToolkitSource.domElement && arToolkitSource.domElement.remove();
    }
  }, []);

  return (
    <div ref={nodeElement => nodeElement && rendererElement && nodeElement.appendChild(rendererElement)}>
      { debug && <div style={{ width: '50px', height: '100vh', backgroundColor: `${getRandomColor()}77` }} /> }
    </div>
  );
};

const ARViewWithWait = withWaitForCondition(
  () =>
    'THREE' in window &&
    'THREEx' in window &&
    'ArToolkitSource' in window.THREEx &&
    'ArToolkitContext' in window.THREEx &&
    'ArMarkerControls' in window.THREEx,
  200,
)(ARView);

const ARViewChanger = () => {
  const [meshType, setMeshType] = useState('cube1');

  useEffect(() => {
    const changeInterval = setInterval(() => {
      setMeshType(meshType === 'cube1' ? 'cube2' : 'cube1');
    }, 2000);

    return () => clearInterval(changeInterval);
  }, [meshType]);


  return (
    <ARViewWithWait meshType={meshType} debug={true} />
  )
};



export default ARViewChanger;
