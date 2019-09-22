// @flow

import React, {useEffect, useRef, useState} from "react";
import withWaitForCondition from "../WaitForCondition/withWaitForCondition";
import Debug from "../Debug";

const createScene = async (camera, modelUrl) => {
  const scene = new window.THREE.Scene();

  scene.visible = false;
  scene.add(camera);

  const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new window.THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 5, 0);
  scene.add(pointLight);

  if (!modelUrl) {
    return Promise.resolve(scene);
  }

  const loader = new window.THREE.GLTFLoader();
  return new Promise((resolve) => {
    loader.load(modelUrl, (object) => {
      object.scene.position.set(0, 0.35, 0);
      object.scene.scale.set(1.5, 1.5, 1.5);
      object.scene.rotation.set(-Math.PI / 2, 0, Math.PI / 2);

      scene.add(object.scene);
      resolve(scene);
    });
  });
};

const ARView = ({ model }) => {
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

    console.log("Creating new scene");
    createScene(camera.current, model).then(newScene => {
      console.log("Loading new scene");
      scene.current.visible = false;
      scene.current = newScene;
      scene.current.visible = true;
    });
  }, [model]);

  useEffect(() => {
    const renderer  = new window.THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    renderer.setClearColor(new window.THREE.Color('lightgrey'), 0);
    renderer.setSize(1280, 960);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';

    setRendererElement(renderer.domElement);

    const onRenderFcts = [];
    camera.current = new window.THREE.Camera();
    createScene(camera.current, model).then(newScene => scene.current = newScene);

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
      type: 'pattern',
      patternUrl: window.THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
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
      <Debug enabled right line />
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

export default ARViewWithWait;
