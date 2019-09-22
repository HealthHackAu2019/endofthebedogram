// @flow

import React, {useEffect, useRef, useState} from "react";
import withWaitForCondition from "../WaitForCondition/withWaitForCondition";
import DebugLine from "../DebugLine";

const createScene = async (camera, modelUrl) => {
  const scene = new window.THREE.Scene();

  scene.visible = false;
  scene.add(camera);

  // Add lights
  const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new window.THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 0, 2);
  scene.add(pointLight);

  const loader = new window.THREE.GLTFLoader();
  return new Promise((resolve) => {
    loader.load(modelUrl, (object) => {
      object.scene.position.set(0, 0, 0);
      object.scene.rotation.set(-Math.PI / 2, 0, Math.PI / 2);

      window.objj = object;

      console.log(object);
      console.log(object.scene);

      scene.add(object.scene);
      resolve(scene);
    });
  });
};

const ARView = () => {
  const modelUrl = "https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/baby012.glb";
  const [rendererElement, setRendererElement] = useState(null);
  const camera = useRef(null);
  const scene = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = null;
  }, []);

  useEffect(async () => {
    if (!scene.current) {
      return;
    }

    console.log("Creating new scene");
    const newScene = await createScene(camera.current, modelUrl);

    console.log("Loading new scene");
    scene.current.visible = false;
    scene.current = newScene;
    scene.current.visible = true;
  }, [modelUrl]);

  useEffect(async () => {
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
    scene.current = await createScene(camera.current, modelUrl);

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
      <DebugLine enabled right />
    </div>
  );
};

const ARViewWithWait = withWaitForCondition(
  () =>
    'THREE' in window &&
    'GLTFLoader' in window.THREE &&
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

export default ARViewWithWait;
// export default ARViewChanger;
