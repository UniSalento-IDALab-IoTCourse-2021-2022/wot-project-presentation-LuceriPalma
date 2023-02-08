#!/bin/zsh
# dal db.json ottieni un CSV
# step 1 dal DB prendi solo alcune variabili
cd ../../model;
#cat ../json-server/db.json | head -n1 ;
#cat ../json-server/db.json | jq '.potfinds[]' | jq '{ id: .id, time: .time, lat: .lat, lng: .lng, gyroX: .info[10].value, gyroY: .info[11].value, gyroZ: .info[12].value, accX: .info[13].value, accY: .info[14].value, accZ: .info[15].value }' > db_per_model.json
cat ../json-server/db.json | jq '.potfinds[]' | jq '{ id: .id, time: .time, lat: .lat, lng: .lng, gyroX: .info[10].value, gyroY: .info[11].value, gyroZ: .info[12].value, accX: .info[13].value, accY: .info[14].value, accZ: .info[15].value }' > db_per_model.json
# step 2 crea un CSV
jq -s -f filter.jq db_per_model.json > data.csv
# step 3 correggi errori di quote
sed -e 's/\\"/"/g' data.csv| sed -e 's/""/"/g' >  data_input.csv
rm data.csv
# fine
echo "input"
cat data_input.csv

echo "lancio il mdoello"
# creato il file.. lanciamo il modello
source ./venv/bin/activate
python3 intervalli.py
python3 model.py

# leggo results.csv
#cat results.csv|cut -f26-28 -d','| grep -e ',1$' > reduced_results.csv
cat results.csv|cut -f26-28 -d',' > reduced_results.csv

#jq --null-input --raw-input '[input|scan("\\w+")] as $header |[inputs as $data |[$header,[$data|scan("\\w+")|tonumber? // .]] |transpose |map({(.[0]):.[1]}) |add]' reduced_results.csv
cat reduced_results.csv | python -c 'import csv, json, sys; print(json.dumps([dict(r) for r in csv.DictReader(sys.stdin)]))' > reduced_results.json



###elimina potholes
#cat ../json-server/db.json| jq '.potholes[]' | jq '.id' | xargs -L1 -I'{}' curl -XDELETE 'localhost:3000/potholes/{}'; sleep 0.05

### elimina potholes ogni 10
#cat ../json-server/db.json| jq '.potholes[]' | jq '.id' | xargs -L1 -I'{}' curl -XDELETE 'localhost:3000/potholes/{}'; sleep 0.05
#ricrea potholes

#cat reduced_results.json|jq -r '.[]|select(.pothole=="1")' | xargs -L1 -I'{}' echo curl -XPOST 'localhost:3000/potholes/{}'
#cat reduced_results.json|jq -r '.[]|select(.pothole=="1")' | xargs -L1 -I'{}' echo curl -XPOST 'localhost:3000/potholes/{}'
#cat reduced_results.json|jq -c '.'| jq '.[]|select(.pothole=="1")' | jq -c | xargs -L1 -I'{}' echo curl -XPOST 'localhost:3000/potholes/{}' | curl -X POST http://localhost:3000/potholes/ -H 'Content-Type: application/json' -d {}
IFS=$'\n';
for LINE in $( cat reduced_results.json|jq -c '.'| jq '.[]|select(.pothole=="1")' | jq -c ); do
echo $LINE;
curl -XPOST 'localhost:3000/potholes/'   -H 'Content-Type: application/json' -d $LINE
sleep 0.05;
done


#for POTHOLE in $(cat results.csv|cut -f26-28 -d','| grep -e ',1$'|grep -v pothole|sort -n|uniq); do
  # echo $POTHOLE;
  # i.e. 39.9875302,18.246275700000005,1
#  LAT=$(echo $POTHOLE|cut -f1 -d',')
  #echo $LAT;
#  LNG=$(echo $POTHOLE|cut -f2 -d',')
  #echo $LNG;
#  curl -X POST http://localhost:3000/potholes/ -H 'Content-Type: application/json' -d "{'lat':$LAT,'lng':$LNG}"
#done
