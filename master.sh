./dateFileMaker.sh $1
for i in $(ls dailydata/); do ./joiner.sh "dailydata/$i"; done
