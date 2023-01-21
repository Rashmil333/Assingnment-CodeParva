/* eslint-disable no-mixed-operators */
import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import styles from './test.module.scss';
import { useRef } from 'react';
import { a, useSpring } from '@react-spring/three';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { ErrorData, Measures, weatherapihandler } from './constant';
import { K2C } from '../../helpers';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import UseDebounce from '../../Hooks/UseDeBounce';

const Model = ({ url }) => {
    const [model, setModel] = useState();
    useEffect(() => {
        new GLTFLoader().load(url, setModel);
    }, [url]);
    return (
        model ? <primitive object={model.scene} /> : null
    )
};


const SunEmoji = ({ setSunHovered, sunHovered }) => {
    const emojiRef = useRef();
    useFrame((state) => {
        emojiRef.current.position.y = Math.sin(state.clock.getElapsedTime()) / 10;
        emojiRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) / 10;
    }, []);
    const props = useSpring({
        scale: sunHovered ? 5 : 3
    });

    return (
        <a.mesh scale={props.scale} position={[-2, 4, 0]} ref={emojiRef} onPointerOver={() => setSunHovered(true)} onPointerOut={() => setSunHovered(false)}>
            <Model url={'/Models/suno.gltf'} />
        </a.mesh>
    )
}


const Environment = ({ type }) => {
    const Snowballs = Array(20).fill().map((_, index) => {
        return (
            {
                id: index
            }
        )
    });

    const state = useThree();

    return (
        <group>

            {Snowballs.map((_, index) => {
                return (
                    <>
                        {type === 'cloud' ? (
                            <Cloud type={type} key={index} position={[Math.random() * (2 * state.viewport.width / 2 - -state.viewport.width / 2) + -state.viewport.width / 2, Math.random() * (2 * state.viewport.height / 2 - -state.viewport.height / 2) + -state.viewport.height / 2, 0]} />
                        )
                            : (
                                <Snow type={type} key={index} position={[Math.random() * (2 * state.viewport.width / 2 - -state.viewport.width / 2) + -state.viewport.width / 2, Math.random() * (2 * state.viewport.height / 2 - -state.viewport.height / 2) + -state.viewport.height / 2, 0]} />
                            )
                        }
                    </>

                )
            })}
        </group>
    );
};

const Snow = ({ position, type }) => {
    const snowRef = useRef();
    useFrame((state) => {
        const bottom = -state.viewport.height / 2 - 2;
        if (snowRef.current.position.y < bottom) {
            snowRef.current.position.y = state.viewport.height / 2;
            snowRef.current.position.x = Math.random() * (2 * state.viewport.width / 2 - -state.viewport.width / 2) + -state.viewport.width / 2;
            snowRef.current.position.z = Math.random();
        }
        // snowRef.current.position.y -= 0.01 + Math.random() / 50;
        if (type !== 'snow') {
            snowRef.current.position.x -= 0.04 + Math.random() / 50;
            snowRef.current.position.y -= 0.04 + Math.random() / 50;
        } else {
            snowRef.current.position.y -= 0.01 + Math.random() / 50;
        }
    })
    return (
        <mesh position={position} ref={snowRef} rotation={type !== 'snow' ? [0, 0, -Math.PI / 4] : [0, 0, 0]}>
            {type === 'snow' ?
                (
                    <>
                        <meshPhysicalMaterial attach='material' color='white' />
                        <octahedronGeometry attach='geometry' args={[0.2, 1]} />
                    </>
                ) :
                (
                    <>
                        <meshPhysicalMaterial attach='material' color='skyblue' />
                        <capsuleGeometry attach='geometry' args={[0.1, 0.3]} />
                    </>
                )
            }
        </mesh>
    );
}

const SmallCloud = ({ position }) => {
    return (
        <mesh position={position}>
            <meshPhysicalMaterial color='grey' />
            <sphereGeometry args={[0.4, 32]} />
        </mesh>
    )
}

const Cloud = ({ position }) => {
    const cloudRef = useRef();
    useFrame((state) => {
        const leftmargin = -state.viewport.width / 2 - 2;
        cloudRef.current.position.x -= 0.03;
        if (cloudRef.current.position.x < leftmargin) {
            cloudRef.current.position.x = state.viewport.width / 2;
        }
    });
    return (
        <group position={position} ref={cloudRef}>
            <SmallCloud />
            <SmallCloud position={[-0.5, 0, 0]} />
            <SmallCloud position={[0, 0.5, 0]} />
        </group>
    )
};

const SunEnvironment = () => {
    const state = useThree();
    return (
        <mesh position={[-state.viewport.width / 2 + 3, state.viewport.height / 2 - 2, 0]}>
            <meshPhysicalMaterial color='red' />
            <sphereGeometry args={[1, 32]} />
        </mesh>
    )
}

const WeatherApp = () => {
    const [data, setData] = useState({});
    const [val, setVal] = useState('');
    const [sunHovered, setSunHovered] = useState(false);
    const debouncedSearch = UseDebounce(val, 1000);

    const mesauresHandler = useCallback((index) => {
        switch (index) {
            case 0:
                return `${(data?.wind?.speed) || ''}km/h`;
            case 1:
                return `${data?.main?.humidity || ''}%`;
            case 2:
                return `${data?.visibility / 1000 || ''}km`;
            default: return null;
        }
    }, [data]);

    useEffect(() => {
        async function getDatum() {
            const res = await fetch(weatherapihandler(debouncedSearch));
            const result = await res.json()
            if (result?.cod === '404') {
                setData(ErrorData);
            } else {
                setData(result);
            }
        }
        if (debouncedSearch) getDatum()
    }, [debouncedSearch]);

    return (
        <div className={styles.weatherSetup}>
            <div className={styles.mainContainer}>
                <input type='text' placeholder='CITY...' className={styles.input} onChange={(e) => setVal(e.target.value)} />
                <div className={styles.centerDiv}>
                    {data?.name ? (<p className={styles.cityName}>{data.name}</p>) : null}
                    <p className={styles.type}>{(data?.main?.humidity > 60) && ('Rainy') || (K2C(data?.main?.temp) > 25) && ('Sunny') || (K2C(data?.main?.temp) < 20) && ('snow') || ('cloud')}</p>
                    <p className={styles.temp}>{K2C(data?.main?.temp) || '0'}</p>
                </div>
                <div className={styles.bottomDiv}>
                    {Measures.map((item, index) => {
                        return (
                            <div className={styles.measures}>
                                <img src={item.icon} alt='icon' />
                                <p className={styles.value}>{mesauresHandler(index)}</p>
                                <p className={styles.typo}>{item.title}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.weatherenvironment}>
                <Canvas>
                    <ambientLight />
                    <pointLight color='white' position={[0, 2, 0]} intensity={10} />
                    <pointLight color='white' position={[2, 1, 0]} intensity={2} />
                    <pointLight color='red' position={[-2, 0, 0]} intensity={10} />

                    {K2C(data?.main?.temp) > 25 && (
                        <SunEnvironment type='cloud' />
                    ) || (
                            <Environment type={data?.main?.humidity > 60 && 'rain' || K2C(data?.main?.temp) < 20 && 'snow' || 'cloud'} />
                        )}
                    <SunEmoji setSunHovered={setSunHovered} sunHovered={sunHovered} />
                    <pointLight color='orange' position={[-2, 0, 5]} intensity={sunHovered ? 30 : 10} />
                </Canvas>
            </div>
        </div>

    )
}

export default WeatherApp;
