#!/bin/bash
######init setting
Local_Path=$(pwd)
Fasle_json_Path="${Local_Path}"'/output_Fasle.json'
Success_json_Path="${Local_Path}"'/output_Success.json'
success_log() {
    last -ad | cut -c 01-58 --complement | sort | awk '{if(length !=0) print $0}' | uniq -c | sort -n -r
}
false_log() {
    lastb -a | cut -c 01-60 --complement | sort | awk '{if(length !=0) print $0}' | uniq -c | sort -n -r
}
TMPFile=$(mktemp)
######output data to temp file
init() {
    unset VARS
    unset index
    unset IPV4
    unset Count
}
Log() {
    init

    $1 >${TMPFile}

    while read line; do
        VARS[$index]="$line"
        index=$(expr $index + 1)
    done <${TMPFile}

    for ((index = 0; index < ${#VARS[*]}; index++)); do
        Count[$index]=$(echo ${VARS[$index]} | cut -d " " -f 1)
        IPV4[$index]=$(echo ${VARS[$index]} | cut -d " " -f 2)
    done

    printf "{"
    printf "\""$2"\":["
    for ((i = 0; i < ${#IPV4[*]}; i++)); do
        cat <<EFO
        {
            "IP_Address" : "${IPV4[i]}",
            "times" : ${Count[i]},
            "status" : "$2"
        }
EFO
    if [ $i -lt $((${#IPV4[*]}-1)) ] ; then
        printf ","
    fi
    done
    printf "    ]"
    printf "}"

}

Log false_log false >${Fasle_json_Path}
Log success_log true >${Success_json_Path}
