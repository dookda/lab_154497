var map = L.map("map", {
    center: [16.45, 99.75],
    zoom: 8
})

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var featureGroup = L.featureGroup();

let baseMap = {
    "แผนที่ OSM": osm.addTo(map),
    "แผนที่ Satellite": Esri_WorldImagery
}

let overlayMap = {
    "ขอบเขตจังหวัด": featureGroup.addTo(map)
}

L.control.layers(baseMap, overlayMap).addTo(map);

var marker = L.marker([16.45, 99.75]).bindPopup("สวัสดี จ.เชียงใหม่").openPopup();
featureGroup.addLayer(marker)

var marker2 = L.marker([18.45, 99.15]).bindPopup("สวัสดี จ.ลำปาง")
featureGroup.addLayer(marker2);