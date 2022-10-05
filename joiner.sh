for i in $(cut -d',' -f1 $1); do grep $i stations.csv; done >tmpstations.csv

join -t',' tmpstations.csv $1 >dailydata/tmp.csv && mv dailydata/tmp.csv $1
