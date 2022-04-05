;(function(){
  let myMap;
let mapZoom = 14.6;
if(window.innerWidth <1050){
  mapZoom = 13.6;
}
if(window.innerWidth < 450){
  mapZoom = 13.1;
}

const init = () =>{
  myMap = new ymaps.Map("map",{
    center: [55.752498, 37.601648],
    zoom: mapZoom,
    controls:[]
  });

  const coords =[
    [55.758796,37.583509],
    [55.750131, 37.603759],
    [55.756724,37.619237],
    [55.744784, 37.581467]
  ];
  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable:false,
    iconLayout: "default#image",
    iconImageHref:"./beats-pictures/map-mark.svg",
    iconImageSize: [46, 57],
    iconImageOffset :[-35, -52]
  })

  coords.forEach(coord =>{
    myCollection.add(new ymaps.Placemark(coord));
  })
  myMap.geoObjects.add(myCollection);
  myMap.behaviors.disable("scrollZoom");
  myMap.behaviors.disable("drag");
}

ymaps.ready(init);

})()
