var scene = new THREE.Scene();
console.log(window.THREE);

var camera = new THREE.PerspectiveCamera(
    55,                                   
    window.innerWidth / window.innerHeight,
    0.1,                                  
    1000                                 
);

camera.position.set(80, 80, 80);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfff6e6);

document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () { renderer.render(scene, camera); });

var geometry = new THREE.OctahedronGeometry(10, 1);
var material = new THREE.MeshStandardMaterial({
    color: 0xff0051,
    shading: THREE.FlatShading, // default is THREE.SmoothShading
    metalness: 0,
    roughness: 1
});
var shapeOne = new THREE.Mesh(geometry, material);
shapeOne.position.y += 10;
scene.add(shapeOne);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

shapeOne.castShadow = true;
shapeOne.receiveShadow = true;

var shadowMaterial = new THREE.ShadowMaterial({ color: 0xeeeeee });
shadowMaterial.opacity = 0.5;