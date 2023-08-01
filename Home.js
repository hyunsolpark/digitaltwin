import { OrbitControls, Html} from '@react-three/drei'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from "three"
import { useControls } from 'leva'
import React, { useMemo} from 'react';
import { useNavigate} from "react-router-dom";

//3d 모델 컴포넌트
const TheModel=() =>{
  //모델의 화면과 애니메이션을 읽어오는 코드
  const { scene, animations } = useLoader(GLTFLoader, './models/check.glb');
  let mixer = new THREE.AnimationMixer(scene);
  
  //3d모델에 포함된 animation들을 actions안에 넣는 코드
  const actions=[];
  animations.forEach((clip)=>{
      actions.push(mixer.clipAction(clip))
  });

  //모터와 벨트 상태판 클릭 시 info 페이지로 이동하는 코드
  const navigate=useNavigate();
  const info=(data)=>{
    let id;
    if(data==="motor1")
    {
      id=1
      navigate(`/info/${id}`)
    }
    if(data==="motor2")
    {
      id=2
      navigate(`/info/${id}`)
    }
    if(data==="belt")
    {
      id=3
      navigate(`/info/${id}`)
    }
  }

  //모델 설정과 결함 선택 구현 코드
  const options=useMemo(()=>{
    return {
      speed: 100,
    }
  },[])
  
  const options2=useMemo(()=>{
    return{
        "결함조건":{
        options:{
          "정상" : "정상",
          "베어링 결함": "베어링 결함",
          "축 불평형": "축 불평형",
          "벨트 파손": "벨트 파손",
        }
      }
    }
  },[])

  const model=useControls("모델 설정",options)
  const errors=useControls("결함 선택",options2)

  //상태판과 결함 시 색깔을 바꿀 대상을 화면을 반복문으로 찾아서 배열에 저장
  const annotations = []
  const errorplace=[]

  if(annotations.length===0)
  {
    scene.traverse((o) => {
      if(o.type==="Mesh"){ 
        if(o.material.name==="Material.002")
        {
          errorplace.push(o.material);
        }
        else if(o.material.name==="Material.023")
        {
          errorplace.push(o.material)
        }
        else if(o.material.name==="Material.020")
        {
          errorplace.push(o.material)
        }
      }
      if (o.userData.prop) {
        annotations.push(
          <Html
            key={o.uuid}
            position={[o.position.x, o.position.y, o.position.z]}
            distanceFactor={0.25}
          >
            <div className="annotation" onClick={()=>info(o.userData.prop)}>
              { 
                <div>
                  {o.userData.prop} 
                  <br/>
                  status:ok
                </div>
              }
            </div>
          </Html>
        )
      }
    })
  }
  //결함조건 따라서 특정 animation 작동과 색깔 변화시키는 코드
  if(errors.결함조건==="정상"){
    actions[0].play();
    errorplace[0].color.r=1
    errorplace[0].color.g=1
    errorplace[0].color.b=1
    errorplace[1].color.r=0.7461602687835693
    errorplace[1].color.g=0.07471167296171188
    errorplace[1].color.b=0.8000000715255737
    errorplace[2].color.r=1
    errorplace[2].color.g=1
    errorplace[2].color.b=1
    model.speed=100
  }
  else if(errors.결함조건==="베어링 결함"){
    actions[1].play();
    errorplace[0].color.r=1
    errorplace[0].color.g=1
    errorplace[0].color.b=1
    errorplace[1].color.r=1
    errorplace[1].color.g=0
    errorplace[1].color.b=0
    errorplace[2].color.r=1
    errorplace[2].color.g=1
    errorplace[2].color.b=1
    annotations[1]=<Html
      key={scene.children[23].uuid}
      position={[scene.children[23].position.x, scene.children[23].position.y, scene.children[23].position.z]}
      distanceFactor={0.25}
    >
      <div className="annotation_err" onClick={()=>info(scene.children[23].userData.prop)}>
        { 
          <div>
            {scene.children[23].userData.prop} 
            <br/>
            status:error
          </div>
        }
      </div>
    </Html>
  }
  else if(errors.결함조건==="축 불평형"){
    actions[0].play();
    errorplace[0].color.r=1
    errorplace[0].color.g=0
    errorplace[0].color.b=0
    errorplace[1].color.r=0.7461602687835693
    errorplace[1].color.g=0.07471167296171188
    errorplace[1].color.b=0.8000000715255737
    errorplace[2].color.r=1
    errorplace[2].color.g=1
    errorplace[2].color.b=1
    annotations[0]=<Html
      key={scene.children[22].uuid}
      position={[scene.children[22].position.x, scene.children[22].position.y, scene.children[22].position.z]}
      distanceFactor={0.25}
    >
      <div className="annotation_err" onClick={()=>info(scene.children[22].userData.prop)}>
        { 
          <div>
            {scene.children[22].userData.prop} 
            <br/>
            status:error
          </div>
        }
      </div>
    </Html>
  }
  else{
    actions[2].play();
    actions[3].play();
    actions[4].play();
    errorplace[0].color.r=1
    errorplace[0].color.g=1
    errorplace[0].color.b=1
    errorplace[1].color.r=0.7461602687835693
    errorplace[1].color.g=0.07471167296171188
    errorplace[1].color.b=0.8000000715255737
    errorplace[2].color.r=0
    errorplace[2].color.g=0
    errorplace[2].color.b=1
    model.speed=50
    annotations[2]=<Html
      key={scene.children[24].uuid}
      position={[scene.children[24].position.x, scene.children[24].position.y, scene.children[24].position.z]}
      distanceFactor={0.25}
    >
      <div className="annotation_err" onClick={()=>info(scene.children[24].userData.prop)}>
        { 
          <div>
            {scene.children[24].userData.prop} 
            <br/>
            status:error
          </div>
        }
      </div>
    </Html>
  }
  
  //속도 조절 및 animation 작동 코드
  useFrame((state, delta) => {
    mixer.update(delta*model.speed*1/100); 
  });
  
  //작업 후 return하는 코드
  return (
    <primitive object={scene} position={[0, 0, 0]}>{annotations}</primitive>
  )
}

//home 화면 컴포넌트
const Home=()=>{

  return (
    <div className='home'>
      <Canvas camera={{ position: [5, 5, 0] }}>
        <directionalLight position={[0, 5, 0]}/>
        <TheModel />
        <OrbitControls target={[0, 1, 0]} />
      </Canvas>
      <span id="info">
        3d 모델을 보여주는 화면입니다.<br/>
        설정값을 오른쪽에서 입력하세요.
      </span>
    </div>
  )
}

export default Home;