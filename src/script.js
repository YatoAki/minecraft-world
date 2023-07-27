import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'dat.gui'

const canvas = document.querySelector('canvas.webgl')
// const gui = new dat.GUI()
// const parameters = {
//     color: 0xff0000
// }

// let color = 0xaaaaaa;

// gui.addColor(parameters, 'color').onChange(() => {
//     color = parameters.color;
//     updateBoxMaterialsColor();
// })

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, -2, 10)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const textureLoader = new THREE.TextureLoader()
const texturePaths = [
    "/textures/1.png",
    "/textures/2.png",
    "/textures/3.png",
    "/textures/4.png",
    "/textures/5.png",
    "/textures/6.png",
    "/textures/7.png",
    "/textures/8.png",
    "/textures/9.png",
    "/textures/10.png",
    "/textures/11.png",
    "/textures/12.png",
    "/textures/13.png",
    "/textures/14.png",
    "/textures/15.png",
    "/textures/16.png",
    "/textures/17.png",
    "/textures/18.png"
]

const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/minecraft.json',
    (font) => {
        const textMaterial = new THREE.MeshLambertMaterial({
            color: 0xaaaaaa
        })
        const textGeo = new TextGeometry(
            "Minecraft",
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeo.center()
        const text = new THREE.Mesh(textGeo, textMaterial)
        scene.add(text)

        for (let i = 0; i < 50; i++) {
            texturePaths.forEach((i) => {
                const boxTexture = textureLoader.load(i)
                boxTexture.magFilter = THREE.NearestFilter
                boxTexture.minFilter = THREE.NearestFilter
                const boxGeo = new THREE.BoxBufferGeometry(1, 1, 1);
                const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x79b2ca });
                boxMaterial.transparent = true
                boxMaterial.map = boxTexture
                const box = new THREE.Mesh(boxGeo, boxMaterial);
                box.position.x = ((Math.random() - 0.5) * 25)
                box.position.y = ((Math.random() - 0.5) * 25)
                box.position.z = ((Math.random() - 0.5) * 25)
                box.rotation.x = Math.random() * Math.PI
                box.rotation.y = Math.random() * Math.PI
                const scale = Math.random()
                box.scale.set(scale, scale, scale)
                if (box.position.distanceTo(text.position) > 3) {
                    scene.add(box);
                }
            })
        }
    }
)

const directionalLight1 = new THREE.DirectionalLight(0x666666, 1)
directionalLight1.position.set(1, -1, 1)
scene.add(directionalLight1)

const directionalLight2 = new THREE.DirectionalLight(0x666666, 1)
directionalLight2.position.set(-1, -1, 1)
scene.add(directionalLight2)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()
let animate = true
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    if (animate === true){
        camera.position.y = elapsedTime
        camera.position.x = elapsedTime
        camera.position.z = elapsedTime
        if (camera.position.z > 8){
            animate = false
        }
    }
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

// function updateBoxMaterialsColor() {
//     scene.traverse((child) => {
//         if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
//             const boxMaterial = new THREE.MeshBasicMaterial({ color: color });
//             boxMaterial.transparent = true;
//             boxMaterial.map = child.material.map;
//             child.material = boxMaterial;
//         }
//     });
// }

tick()
