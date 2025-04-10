/* Vienna Sightseeing Beispiel */

// Stephansdom Objekt
let stephansdom = {
    lat: 48.208493,
    lng: 16.373118,
    zoom: 12,
    title: "Domkirche St. Stephan",
};

// Karte initialisieren
let map = L.map("map").setView([stephansdom.lat, stephansdom.lng], stephansdom.zoom);

// Overlays definieren
let overlays = {
    sights: L.featureGroup().addTo(map), // .addto(map) um layer default zu checken
    lines: L.featureGroup().addTo(map),
    stops: L.featureGroup().addTo(map),
    zones: L.featureGroup().addTo(map),
    hotels: L.featureGroup().addTo(map),
};

// Layercontrol
L.control.layers({
    "BasemapAT": L.tileLayer.provider('BasemapAT.basemap').addTo(map),
    "BasemapAT grau": L.tileLayer.provider('BasemapAT.grau'),
    "BasemapAT overlay": L.tileLayer.provider('BasemapAT.overlay'),
    "BasemapAT Gelände": L.tileLayer.provider('BasemapAT.terrain'),
    "BasemapAT Oberfläche": L.tileLayer.provider('BasemapAT.surface'),
    "BasemapAT highdpi": L.tileLayer.provider('BasemapAT.highdpi'),
    "BasemapAT Satellit": L.tileLayer.provider('BasemapAT.orthofoto'),
}, {
    "Sehenswürdigkeiten": overlays.sights, // .addto(map) um layer default zu checken
    "Vienna sightseeing Linien": overlays.lines,
    "Vienna sightseeing Haltestellen": overlays.stops,
    "Fußgängerzonen": overlays.zones,
    "Hotels": overlays.hotels,
}).addTo(map);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

// Sehenswürdigkeiten Standorte Wien
async function loadSights(url) { // funktion wird definiert
    //console.log(url);
    let response = await fetch(url); // anfrage an server
    let jsondata = await response.json(); // in variable schreiben
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>"
    }).addTo(overlays.sights); // mit leaflet in karte hinzufügen!
};

// Kraftfahrlinien Wien
async function loadLines(url) { // funktion wird definiert
    //console.log(url);
    let response = await fetch(url); // anfrage an server
    let jsondata = await response.json(); // in variable schreiben
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>"
    }).addTo(overlays.lines); // mit leaflet in karte hinzufügen!
};

// Haltestellen Wien
async function loadStops(url) { // funktion wird definiert
    //console.log(url);
    let response = await fetch(url); // anfrage an server
    let jsondata = await response.json(); // in variable schreiben
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>"
    }).addTo(overlays.stops); // mit leaflet in karte hinzufügen!
};

// Fußgängerzonen Wien
async function loadZones(url) { // funktion wird definiert
    //console.log(url);
    let response = await fetch(url); // anfrage an server
    let jsondata = await response.json(); // in variable schreiben
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>",
        style: function (feature) {
            console.log(feature);
            return {
                color: "#F012BE",
                weight: 1,
                opacity: 0.4,
                fillOpacity: 0.1,
            }
        }
    }).addTo(overlays.zones); // mit leaflet in karte hinzufügen!
};

// Hotels Wien
async function loadHotels(url) { // funktion wird definiert
    //console.log(url);
    let response = await fetch(url); // anfrage an server
    let jsondata = await response.json(); // in variable schreiben
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href='https://data.wien.gv.at'>Stadt Wien</a>"
    }).addTo(overlays.hotels); // mit leaflet in karte hinzufügen!
};

// GeoJSON laden und visualisieren
loadSights("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json");
loadLines("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKLINIEVSLOGD&srsName=EPSG:4326&outputFormat=json");
loadStops("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKHTSVSLOGD&srsName=EPSG:4326&outputFormat=json");
loadZones("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FUSSGEHERZONEOGD&srsName=EPSG:4326&outputFormat=json");
loadHotels("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:UNTERKUNFTOGD&srsName=EPSG:4326&outputFormat=json");

