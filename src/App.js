// App.js

import React, { useRef } from 'react';
import './App.css';
import Navbar from './components/navbar';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


function Earth() {
  const group = useRef();
  const { scene } = useGLTF('/earth/scene.gltf');

 
  useFrame((state,delta) => {
    if (group.current) {
      group.current.rotation.y += 0.003; 
      console.log('hi it worked')
      console.log(group.current)
    }
  });

  const boundingBox = new THREE.Box3().setFromObject(scene);
  const center = boundingBox.getCenter(new THREE.Vector3());


  const offsetX = -center.x;
  const offsetY = -center.y;
  const offsetZ = -center.z;

  return <primitive ref={group} object={scene} scale={[5, 5, 5]} position={[offsetX * 5, offsetY * 5, offsetZ * 5]}/>;
}


function App() {
  const scrollBot = () => {
    window.scrollTo({
      top: 600,
      behavior: 'smooth'
    });}
  const scrollBot2 = () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });}
  return (
    <>
    <div className="app-container">
      <div className="background-color"></div>
      <Navbar />
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 200 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Earth />
      </Canvas>
      <div className='app'>
        <div className='left'>
          <div className='head left'>
            <div className='heading'>GPTtoPPT</div>
            <div className='content'>
              AI presentation generator, make your presentation by just giving a prompt! Yes it's that simple.
              Customize the generated slides as per your preference, add your own touch, and you're ready to present!
            </div>
          </div>
          <div className='img left floating-image'>
            <img src="/ey_logo.png" height={100} width={200} alt="ey logo" />
            <img className='img2' src="/gpttoppt.png" height={300} alt="GPTtoPPT" />
          </div>
          <div className='button-container'>
          <div className='button left' onClick={scrollBot}>
            Get started <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <div className='button left' onClick={scrollBot2}>
            Generate ppt <FontAwesomeIcon icon={faArrowRight} />
          </div></div>
        </div>
      </div>
    </div>
    </>
  );
}
export default App;