console.clear();
console.log(
  "this design was inspired by @serejaris, classic perlin 3D noise by stefan gustavson was used"
);
const canvas = document.getElementById("canvas"),
  logo = document.querySelector(".logo");

const screen = {
  width: document.body.clientWidth - 128,
  height: document.body.clientHeight - 128,
};

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: !0,
});

const camera = new THREE.PerspectiveCamera(
  45,
  canvas.clientWidth / canvas.clientWidth,
  1,
  1000
);
const mouse = new THREE.Vector2(0.7, 0.7);
let imgArrIndex = 0;

const imgArr = ["2.jpg", "3.jpg", "9-3.jpg", "4.jpg", "5.jpg", "1.jpg", "6-2.jpg"];
const imgTexture = new THREE.TextureLoader().load("./img/6-2.jpg");

var quad = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.ShaderMaterial({
    vertexShader: document.getElementById("vertex-shader").textContent,
    fragmentShader: document.getElementById("fragment-shader").textContent,
    depthWrite: !1,
    depthTest: !1,
    uniforms: {
      kurt: {
        type: "t",
        value: imgTexture,
      },
      delta: {
        value: 0.3,
      },
      mouse: {
        value: mouse,
      },
      filter: {
        value: !1,
      },
      speed: {
        value: 0.000004,
      },
    },
  })
);
scene.add(quad);

function onResize() {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, !1);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

function onMouseMove(e) {
  const x = e.clientX / (window.innerWidth * 0.5) - 1;
  const y = -1 * (e.clientY / (window.innerHeight * 0.5)) + 1;
  updateMouse(x, y);
}

function onTouchMove(e) {
  const x = e.touches[0].clientX / (window.innerWidth * 0.5) - 1;
  const y = -1 * (e.touches[0].clientY / (window.innerHeight * 0.5)) + 1;
  updateMouse(x, y);
}

function updateMouse(x, y) {
  TweenMax.to(mouse, 2, {
    x: x,
    y: y,
    onUpdate: function () {
      quad.material.uniforms.mouse.value = mouse;
    },
  });
}

function render(a) {
  requestAnimationFrame(render);
  quad.material.uniforms.delta.value = a;
  renderer.render(scene, camera);
}
onResize();
window.addEventListener("resize", onResize);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);

let clickTimer = null;

window.addEventListener("click", changePhoto);

window.addEventListener("touchend", function () {
  if (clickTimer == null) {
    clickTimer = setTimeout(function () {
      clickTimer = null;
    }, 50);
  } else {
    clearTimeout(clickTimer);
    clickTimer = null;
    changePhoto();
  }
});

function changePhoto() {
  if (imgArrIndex == imgArr.length) imgArrIndex = 0;
  quad.material.uniforms.kurt.value = new THREE.TextureLoader().load(
    `./img/${imgArr[imgArrIndex]}`
  );
  imgArrIndex++;
}

function getJsonFromUrl(url) {
  if (!url) url = location.search;
  var query = url.substr(1);
  var result = {};
  query.split("&").forEach(function (part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

if (getJsonFromUrl().autoplay) {
  const autoplay = setInterval(changePhoto, getJsonFromUrl().autoplay * 1000);
}

requestAnimationFrame(render);
