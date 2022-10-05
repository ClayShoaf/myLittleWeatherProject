gawk -i inplace -F, '{print $1 ": " $4 "," $2 "," $3 "," $4}' $1
for i in $(cut -d',' -f4 $1); do sed -i -e s/,$i$/,$(./run.sh $i)/g $1; done
