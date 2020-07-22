var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 45, 30000);

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(70, 20, 20);
var material = new THREE.MeshNormalMaterial({wireframe: true});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

var geometry2 = new THREE.SphereGeometry(80, 20, 20);
var material2 = new THREE.MeshNormalMaterial({wireframe: true});
var sphere2 = new THREE.Mesh(geometry2, material2);
sphere2.position.x = 300;
scene.add(sphere2);

var geometry3 = new THREE.SphereGeometry(90, 20, 20);
var material3 = new THREE.MeshNormalMaterial({wireframe: true});
var sphere3 = new THREE.Mesh(geometry3, material3);
sphere3.position.x = -300;
scene.add(sphere3);

camera.position.set(-900,-200,-900);

var interaction = new THREE.Interaction(renderer, scene, camera);
sphere.cursor = 'pointer';
sphere2.cursor = 'pointer';
sphere3.cursor = 'pointer';
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

sphere3.on('mouseover', function(ev) {
    sphere3.scale.set(1.5,1.5,1.5);
})

sphere3.on('mouseout', function(ev) {
    sphere3.scale.set(1,1,1);
})


// ____________________SKYBOX STUFF___________________________________

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 500;
controls.maxDistance = 1500;

var materialArray = [];
var texture_ft = new THREE.TextureLoader().load( './kenon_star_ft.jpg');
var texture_bk = new THREE.TextureLoader().load( './kenon_star_bk.jpg');
var texture_up = new THREE.TextureLoader().load( './kenon_star_up.jpg');
var texture_dn = new THREE.TextureLoader().load( './kenon_star_dn.jpg');
var texture_rt = new THREE.TextureLoader().load( './kenon_star_rt.jpg');
var texture_lf = new THREE.TextureLoader().load( './kenon_star_lf.jpg');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (var i = 0; i < 6; i++) {
  materialArray[i].side = THREE.BackSide;
}

var skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
var skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add(skybox);

var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.2 );
scene.add( ambientLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
directionalLight.position.set( 0.75, 0.75, 1.0 ).normalize();
scene.add( directionalLight );


var animate = () => {
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


// IF WINDOW IS RESIZED, EVERYTHING IS CENTERED EITHER WAY
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls.handleResize();

}
onWindowResize();

