for i in $(cut -d',' -f4 $1); do sed -i -e s/,$i$/,$(./run.sh $i)/g $1; done
