./dateFileMaker.sh $1
for i in $(ls dailydata/); do ./joiner.sh "dailydata/$i"; done
./colorizer.sh dailydata/*.csv
sed -i '1s/^/name,latitude,longitude,color\n/' dailydata/*.csv
