// dht11
#include <DHT.h>
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// wifi
#include <WiFi.h>
#include <esp_wifi.h>
const char* ssid     = "@JumboPlusIoT";     
const char* password = "mnayyxei"; 

void readMacAddress(){
  uint8_t baseMac[6];
  esp_err_t ret = esp_wifi_get_mac(WIFI_IF_STA, baseMac);
  if (ret == ESP_OK) {
    Serial.printf("%02x:%02x:%02x:%02x:%02x:%02x\n",
                  baseMac[0], baseMac[1], baseMac[2],
                  baseMac[3], baseMac[4], baseMac[5]);
  } else {
    Serial.println("Failed to read MAC address");
  }
}

// http client
#include <HTTPClient.h> 
const char* serverName = "https://a552-202-28-251-54.ngrok-free.app/api/v1/data/"; 

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  // อ่าน mac address
  readMacAddress();

  // เชื่อมต่อ Wi-Fi
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("เชื่อมต่อสำเร็จ! IP Address:");
  Serial.println(WiFi.localIP());

  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  // get dht 11
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if(isnan(humidity) || isnan(temperature)){
    Serial.println("อ่านค่าไม่ได้");
  }
  Serial.print(humidity);
  Serial.print(temperature);

  // send api
  HTTPClient http;
  http.begin(serverName);
  http.addHeader("Content-Type", "application/json"); 
  String jsonData = "{";
  jsonData += "\"sta_code\":\"A4\",";                   // Station code
  jsonData += "\"sta_name\":\"Station 5\",";            // Station name
  jsonData += "\"hum\":" + String(humidity) + ",";      // PM2.5 value
  jsonData += "\"temp\":" + String(temperature);        // Temperature
  jsonData += "}";

  Serial.println(jsonData);
  int httpResponseCode = http.POST(jsonData);
  http.end();

  Serial.println("");
  delay(6000);
}
