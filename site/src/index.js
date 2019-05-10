import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { apply, Canvas, useRender } from 'react-three-fiber';
import  * as meshline from 'three.meshline';
import './style/style.css';

apply(meshline)
const numLines = 30
const lines = new Array(numLines).fill()
const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#EE786E']

function Fatline() {
  const material = useRef()
  const [color] = useState(() => colors[parseInt(colors.length * Math.random())])
  const [ratio] = useState(() => 0.5 + 0.5 * Math.random())
  const [width] = useState(() => Math.max(0.1, 0.3 * Math.random()))
  // Calculate wiggly curve
  const [curve] = useState(() => {
    let pos = new THREE.Vector3(30 - 60 * Math.random(), -5, 10 - 20 * Math.random())
    return new Array(30).fill().map(() => pos.add(new THREE.Vector3(2 - Math.random() * 4, 4 - Math.random() * 2, 5 - Math.random() * 10)).clone())
  })
  // Hook into the render loop and decrease the materials dash-offset
  useRender(() => (material.current.uniforms.dashOffset.value -= 0.0005))
  return (
    <mesh>
      {/** MeshLine and CMRCurve are a OOP factories, not scene objects, hence all the imperative code in here :-( */}
      <meshLine onUpdate={self => (self.parent.geometry = self.geometry)}>
        <geometry onUpdate={self => self.parent.setGeometry(self)}>
          <catmullRomCurve3 args={[curve]} onUpdate={self => (self.parent.vertices = self.getPoints(500))} />
        </geometry>
      </meshLine>
      {/** MeshLineMaterial on the other hand is a regular material, so we can just attach it */}
      <meshLineMaterial attach="material" ref={material} transparent depthTest={false} lineWidth={width} color={color} dashArray={0.1} dashRatio={ratio} />
    </mesh>
  )
}

function Scene() {
  let group = useRef()
  let theta = 0
  // Hook into the render loop and rotate the scene a bit
  useRender(() => group.current.rotation.set(0, 5 * Math.sin(THREE.Math.degToRad((theta += 0.02))), 0))
  return (
    <group ref={group}>
      {lines.map((_, index) => (
        <Fatline key={index} />
      ))}
    </group>
  )
}

function Stage() {
  return (
    <div className="stage">
      <Canvas style={{ background: '#324444' }} camera={{ position: [0, 50, 10], fov: 75 }}>
        <Scene />
      </Canvas>

      <div className="infos">
        <div className="avatar" />
        <div className="links" >
          <div className="me" title="关于我">
            <i />
            <a href="" target="blank">关于我</a>
          </div>
          <div className="work" title="我的作品">
            <i />
            <a href="https://hideinbush.github.io/demo-collections/build/index.html" target="blank">我的作品</a>
          </div>
          <div className="github" title="Github">
            <i />
            <a href="https://github.com/hideInbush" target="blank" >Github</a>
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <Stage />,
  document.querySelector('#root'),
);