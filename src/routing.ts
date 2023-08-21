import homeSourceCode from "./routes/home";
import aboutSourceCode from "./routes/about";
import { lerp } from "./utils/smoothScroll";
import { gl, program } from "./runGL";

let currentPath = window.location.pathname;
let listenersAdded = false;

const appElement = document.querySelector("#app") as HTMLDivElement;

const routes: { [path: string]: string } = {
  "/": homeSourceCode,
  "/about": aboutSourceCode,
};

const addLinkListeners = () => {
  const links = document.querySelectorAll('[href^="/"]');
  links.forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;

      const { pathname } = new URL(target.href);

      if (pathname !== currentPath) {
        currentPath = pathname;

        window.history.pushState({ path: pathname }, pathname, pathname);
        render(pathname);
      }
    })
  );

  listenersAdded = true;
};


const exitAnimation = () => {
  let delta = 0
  const target = 10;
  function animate(){
    delta = lerp(delta, target, 0.075 * 0.075) 
    delta = parseFloat(delta.toFixed(5))  
    const deltaYLocation = gl.getUniformLocation(program, 'u_deltaY')
    gl.uniform1f(deltaYLocation, (delta * delta) * 0.5)
    requestAnimationFrame(animate)
  }
  animate()
}

const enterAnimation = () => {
  let delta = -10 
  const target = 0;
  function animate(){
    delta = lerp(delta, target, 0.075)
    delta = parseFloat(delta.toFixed(5))
    
    const deltaYLocation = gl.getUniformLocation(program, 'u_deltaY')
    gl.uniform1f(deltaYLocation, delta / 1.0)
    requestAnimationFrame(animate)
  }
  animate()
}

const render = (path: string) => {
  if (!listenersAdded) {
    addLinkListeners();
  }
  
  if (currentPath !== "/"){
    exitAnimation()
  }
  
  if (currentPath === "/"){
    enterAnimation()
  }

  appElement.innerHTML = routes[path] || "<h1>Not Found</h1>";
};

window.addEventListener("popstate", (event) => {
  const path = event.state ? event.state.path : window.location.pathname;
  render(path);
});

render(window.location.pathname);
