for i in $(seq 0 365); do
	for j in $(date -d "$(echo $1 | cut -d'.' -f1)-01-01 $i days" +%Y%m%d); do
		grep $j $1 | cut -d',' -f1,4 >dailydata/$j.csv;
	done;
done
