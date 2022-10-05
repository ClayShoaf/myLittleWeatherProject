echo "making files"
./dateFileMaker.sh $1
echo "joining files"
for i in $(ls dailydata/); do ./joiner.sh "dailydata/$i"; done
echo "colorizing files"
for i in $(ls dailydata/); do ./colorizer.sh "dailydata/$i"; done
echo "adding headers to files"
sed -i '1s/^/name,latitude,longitude,color\n/' dailydata/*.csv
