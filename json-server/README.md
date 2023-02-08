=useful commands=
#get ID of points with empty lat
cat db.json  |  jq '.[]'|jq '.[]'| jq 'if .lat == "" then .id else empty end'

# delete points with empty ID
for EMPTYID in $(cat db.json  |  jq '.[]'|jq '.[]'| jq 'if .lat == "" then .id else empty end'); do
  echo curl -X DELETE http://localhost:3000/points/$EMPTYID;
  curl -X DELETE http://localhost:3000/points/$EMPTYID ;
done

# print id and time of every point
cat db.json  |  jq '.[]'|jq '.[]'| jq '{ id: .id, time: .time }'


# awk 'NR % 100 == 0'

i=1;
FILE="db_20230203_to_lecce.json"
TOT=$(cat $FILE | awk 'NR % 100 == 0'|wc -l)

IFS=$'\n';
for LINE in $( cat $FILE | awk 'NR % 100 == 0' | jq '.' | jq -c '.'); do
echo "-----------------"
echo "${LINE}";
echo "- - - - - - - - -"
echo $i;
echo '---';
NEWLINE=$(echo $LINE|jq -c -r --arg TOT "$TOT" --arg i "$i" '.lat=39.88648512567619+((40.35484466879717 - 39.88648512567619) / ($TOT|tonumber))*($i|tonumber)| .lng=18.300799112766985-((18.300799112766985 - 18.157976847141985) / ($TOT|tonumber))*($i|tonumber)')
echo "${NEWLINE}";
echo "-   -   -   -   -"
((i+=1)); echo $i on $TOT;
curl -XPOST 'localhost:3000/points/'   -H 'Content-Type: application/json' -d "${NEWLINE}"
sleep 0.2
done
