inNum=$1
BtoTmin=-900
BtoTmax=0
TtoGmin=1
TtoGmax=40
GtoYmin=41
GtoYmax=240
YtoRmin=241
YtoRmax=700

outMin=0
outMax=255
outNum=0

if [ "$inNum" -ge $BtoTmin ] && [ "$inNum" -le $BtoTmax ]; then
	outNum=$(printf %.0f $(bc <<<"scale=20; ($outMin + (($outMax - $outMin) / ($BtoTmax - $BtoTmin)) * ($inNum - $BtoTmin))"))
	echo "#00$(printf '%02x\n' $outNum)ff"
elif [ "$inNum" -ge $TtoGmin ] && [ "$inNum" -le $TtoGmax ]; then
	outNum=$(printf %.0f $(bc <<<"scale=20; 255 - ($outMin + (($outMax - $outMin) / ($TtoGmax - $TtoGmin)) * ($inNum - $TtoGmin))"))
	echo "#00ff$(printf '%02x\n' $outNum)"
elif [ "$inNum" -ge $GtoYmin ] && [ "$inNum" -le $GtoYmax ]; then
	outNum=$(printf %.0f $(bc <<<"scale=20; $outMin + (($outMax - $outMin) / ($GtoYmax - $GtoYmin)) * ($inNum - $GtoYmin)"))
	echo "#$(printf '%02x\n' $outNum)ff00"
elif [ "$inNum" -ge $YtoRmin ] && [ "$inNum" -le $YtoRmax ]; then
	outNum=$(printf %.0f $(bc <<<"scale=20; 255 - ($outMin + (($outMax - $outMin) / ($YtoRmax - $YtoRmin)) * ($inNum - $YtoRmin))"))
	echo "#ff$(printf '%02x\n' $outNum)00"
else
	echo "N/A"
fi
#printf "%02x\n" $outNum

#lesson 4, question 17: 175A
#output = $outMin + (($outMax - $outMin) / ($TtoGmax - $TtoGmin)) * ($inNum - $TtoGmin)
#output = output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start)
