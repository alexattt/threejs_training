const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(10, 30, 30);
const material = new THREE.MeshNormalMaterial({wireframe: true});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const geometry2 = new THREE.SphereGeometry(12, 30, 30);
const material2 = new THREE.MeshNormalMaterial({wireframe: true});
const sphere2 = new THREE.Mesh(geometry2, material2);
sphere2.position.x = 30;
scene.add(sphere2);

const geometry3 = new THREE.SphereGeometry(15, 30, 30);
const material3 = new THREE.MeshNormalMaterial({wireframe: true});
const sphere3 = new THREE.Mesh(geometry3, material3);
sphere3.position.x = -30;
scene.add(sphere3);

camera.position.z = 70;

const interaction = new THREE.Interaction(renderer, scene, camera);
sphere.cursor = 'pointer';
sphere2.cursor = 'pointer';
var clicked = false;
sphere.on('click', function(ev) {
    if (!clicked) {
        material.wireframe = false;
        clicked = true;
    } else {
        material.wireframe = true;
        clicked = false;
    }
})

var listener = new THREE.AudioListener();
camera.add( listener );
var sound = new THREE.Audio(listener);

var audioLoader = new THREE.AudioLoader();
audioLoader.load( './No_manners.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.8 );
});


var clicked2 = false;
sphere2.on('click', function(ev) {
    if (!clicked2) {
        sound.play();
        clicked2 = true;
    } else {
        sound.stop();
        clicked2 = false;
    }
})

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 600;

const animate = () => {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.015;
    sphere2.rotation.x += 0.01;
    sphere3.rotation.x += 0.005;
    sphere.rotation.z += 0.015;
    sphere2.rotation.z += 0.01;
    sphere3.rotation.z += 0.005;
    controls.update();
    renderer.render(scene, camera);
}

animate();

