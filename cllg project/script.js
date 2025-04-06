 // Mobile Menu Toggle
 const mobileToggle = document.getElementById('mobileToggle');
 const mobileMenu = document.getElementById('mobileMenu');

 mobileToggle.addEventListener('click', () => {
     mobileMenu.classList.toggle('active');
 });

 // Close mobile menu when clicking a link
 document.querySelectorAll('.mobile-nav-links a').forEach(link => {
     link.addEventListener('click', () => {
         mobileMenu.classList.remove('active');
     });
 });

 // Navbar scroll effect
 window.addEventListener('scroll', () => {
     const navbar = document.querySelector('.navbar');
     if (window.scrollY > 50) {
         navbar.classList.add('scrolled');
     } else {
         navbar.classList.remove('scrolled');
     }
 });

 // Three.js Planet Animation
 const container = document.getElementById('planet-container');

 // Scene setup
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(
     75,
     window.innerWidth / window.innerHeight,
     0.1,
     1000
 );
 camera.position.z = 15;

 const renderer = new THREE.WebGLRenderer({
     antialias: true,
     alpha: true
 });
 renderer.setSize(window.innerWidth, window.innerHeight);
 container.appendChild(renderer.domElement);

 // Create planet
 const geometry = new THREE.SphereGeometry(5, 64, 64);

 // Load Earth texture (replace with your own texture path)
 const textureLoader = new THREE.TextureLoader();
 const texture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
 const bumpMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');

 const material = new THREE.MeshPhongMaterial({
     map: texture,
     bumpMap: bumpMap,
     bumpScale: 0.05,
     specular: new THREE.Color('grey'),
     shininess: 5
 });

 const planet = new THREE.Mesh(geometry, material);
 scene.add(planet);

 // Add ambient and directional light
 const ambientLight = new THREE.AmbientLight(0x333333);
 scene.add(ambientLight);

 const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
 directionalLight.position.set(5, 3, 5);
 scene.add(directionalLight);

 // Add stars background
 const starGeometry = new THREE.BufferGeometry();
 const starMaterial = new THREE.PointsMaterial({
     color: 0xffffff,
     size: 0.1,
 });

 const starVertices = [];
 for (let i = 0; i < 10000; i++) {
     const x = (Math.random() - 0.5) * 2000;
     const y = (Math.random() - 0.5) * 2000;
     const z = (Math.random() - 0.5) * 2000;
     starVertices.push(x, y, z);
 }

 starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
 const stars = new THREE.Points(starGeometry, starMaterial);
 scene.add(stars);

 // Animation loop
 function animate() {
     requestAnimationFrame(animate);
     planet.rotation.y += 0.005;
     renderer.render(scene, camera);
 }
 animate();

 // Handle window resize
 window.addEventListener('resize', () => {
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize(window.innerWidth, window.innerHeight);
 });


 //  feedback
 //  document.getElementById('feedbackForm').addEventListener('submit', function(e) {
 //      e.preventDefault();

 // Here you would typically send the form data to your server
 // For demonstration, we'll just show the success message

 // Hide the form
 //  document.querySelector('.feedback-form').style.display = 'none';
 // Show success message
 //  document.querySelector('.feedback-success').style.display = 'block';

 // You could add AJAX code here to submit the form data
 /*
 const formData = new FormData(this);
 fetch('/submit-feedback', {
     method: 'POST',
     body: formData
 })
 .then(response => response.json())
 .then(data => {
     document.querySelector('.feedback-form').style.display = 'none';
     document.querySelector('.feedback-success').style.display = 'block';
 })
 .catch(error => {
     console.error('Error:', error);
 });
 */
 //  });

 //  function resetForm() {
 // Hide success message
 //  document.querySelector('.feedback-success').style.display = 'none';
 // Show form
 //  document.querySelector('.feedback-form').style.display = 'block';
 // Reset form
 //  document.getElementById('feedbackForm').reset();
 //  }
 //  ,,,,,,,,,,,,,,,,,,,<
 const form = document.getElementById('feedbackForm');

 form.addEventListener('submit', (e) => {
     e.preventDefault();
     const formData = new FormData(form);
     fetch('/api/feedback', {
             method: 'POST',
             body: formData,
         })
         .then((response) => response.json())
         .then((data) => console.log(data))
         .catch((error) => console.error(error));
 });