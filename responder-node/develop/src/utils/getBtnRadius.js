function getBtnRadius() {
  let WindowWidth = window.innerWidth;
  let WindowHeight = window.innerHeight;

  if (typeof WindowWidth != "number") {
    if (document.compatMode == "CSS1Compat") {
      WindowWidth = document.documentElement.clientWidth;
      WindowHeight = document.documentElement.clientHeight;
    }else{
      WindowWidth = document.body.clientWidth;
      WindowHeight = document.body.clientHeight;
    }
  }

  if (WindowWidth < 1080) {
    let radius = ((WindowWidth > WindowHeight) ? WindowHeight: WindowWidth) / 5 * 3
    return radius
  }
}

export default getBtnRadius 