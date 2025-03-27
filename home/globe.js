import countries from './assets/custom.geo.json';
import lines from './assets/lines.json';
import map from './assets/map.json';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ThreeGlobe from 'three-globe';

const colors = { pink: '#eb8fff' };

// adding a scene
const scene = new THREE.Scene();

// globe
const globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
})
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.6)
    .showAtmosphere(true)
    .atmosphereColor('#009dff')
    .atmosphereAltitude(0.1)
    .onGlobeReady(() => {
        globe
            .labelsData(map.maps)
            .labelColor(() => colors.pink)
            .pointColor(() => colors.pink)
            .hexPolygonColor(() => 'blue')
            .labelDotRadius(0.5)
            .labelSize(1)
            .labelText('city')
            .labelResolution(6)
            .labelAltitude(0.01)
            .pointsData(map.maps)
            .pointsMerge(true)
            .pointAltitude(0.09)
            .pointRadius(0.09)
            .arcsData(lines.pulls)
            .arcColor((e) => {
                return colors[e.color] || colors.pink;
            })
            .arcAltitudeAutoScale(true)
            .arcAltitude(0.2)
            .arcStroke(0.3)
            .arcDashLength(2)
            .arcDashGap(0)
            .arcDashAnimateTime(5000)
            .arcsTransitionDuration(500)
            .arcDashInitialGap((e) => e.order * 1);
    });

const globematerial = globe.globeMaterial();
globematerial.color = new THREE.Color(0xb1b1e9);
globematerial.emissive = new THREE.Color(0x2c2c42);
globematerial.emissiveIntensity = 1;
globematerial.shininess = 0.5;
scene.add(globe);

// adding a camera
const container = document.querySelector('.globe-container');

// Get the container’s actual size (which will respect aspect-ratio 16:9)
const w = container.offsetWidth;
const h = container.offsetHeight;

const camera = new THREE.PerspectiveCamera(35, w / h, 1, 1000);
camera.updateProjectionMatrix();
camera.position.z = 320;
camera.position.x = 0;
camera.position.y = 160;
scene.add(camera);

/*   light   */
const dlight = new THREE.DirectionalLight(0xffffff, 1);
dlight.position.set(-900, 10, 400);
camera.add(dlight);

// finally rendering everything into the canvas
const canvas = Array.from(document.querySelectorAll('.webgl')).find(el => {
    return window.getComputedStyle(el).display === 'block';
});
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
});

renderer.setSize(w, h);
renderer.render(scene, camera);
renderer.setPixelRatio(window.devicePixelRatio);

// adding orbit controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // smooth dragging
controls.dampingFactor = 0.05;
controls.autoRotate = true; // enable auto-rotation by default
controls.autoRotateSpeed = 0.3; // how fast to spin
controls.enableZoom = false; // how fast to spin

// update the window everytime it is resized

window.addEventListener('resize', () => {
    const container = document.querySelector('.globe-container');
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
});

// the object is streching lets fix that
const loop = () => {
    globe.rotation.x = 0;
    globe.rotation.y += 0.0025;
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};
loop();
