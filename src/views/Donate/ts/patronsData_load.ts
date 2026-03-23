import staticDataAddress from "@/ts/env/staticDataAddress.ts";
import {ref, type Ref} from "vue";

export type PatronsData={
    name: string;
    value: number;
}[];

export default function () {
    const patronsData:Ref<PatronsData> = ref([]);
    const patronsData_isLoaded:Ref<boolean> = ref(false);
    const patronsData_isFailed:Ref<boolean> = ref(false);

    (async ()=>{
        const res=await fetch(`${staticDataAddress}/donate/patron/data.json`);
        if (res.ok){
            const resJson = await res.json();


            type SimplJson={
                patrons:{
                    name:string,
                    allValue:number,
                }[]
            }
            //简化的json
            let simplJson:SimplJson={patrons:[]};
            //排序的json
            let sortJson:SimplJson={patrons:[]};

            resJson.patron.forEach((item:any)=>{//为simplJson赋值
                simplJson.patrons.push({
                    name: item.name,
                    allValue: (()=>{
                        let outputValue:number=0;
                        item.donateData.forEach((ite:any)=>{
                            outputValue+=Number(ite.value as string);
                        });
                        return outputValue;
                    })(),
                })
            });

            {//为sortJson赋值
                let pushedIndex:number[]=[];
                while (simplJson.patrons.length != pushedIndex.length) {
                    let maxValIndex: number = -1;
                    {
                        let lastMax = 0;
                        for (let i = 0; i < simplJson.patrons.length; i++) {
                            {
                                let isCon=false;
                                for (let j=0;j<pushedIndex.length; j++){
                                    if (pushedIndex[j]==i) {
                                        isCon = true;
                                        break;
                                    }
                                }
                                if (isCon)
                                    continue;
                            }
                            if (simplJson.patrons[i]!.allValue > lastMax) {
                                lastMax = simplJson.patrons[i]!.allValue;
                                maxValIndex = i;
                            }
                        }
                    }
                    sortJson.patrons.push(simplJson.patrons[maxValIndex]!);
                    pushedIndex.push(maxValIndex);
                }
            }

            {//将最终值赋值至patronsData
                let output:PatronsData=[];
                sortJson.patrons.forEach((item) => {
                    output.push({
                        name: item.name,
                        value: item.allValue,
                    });
                });
                patronsData.value=output;
            }

            patronsData_isLoaded.value=true;
            patronsData_isFailed.value=false;
        }else{
            patronsData_isLoaded.value=true;
            patronsData_isFailed.value=true;
            patronsData.value=[];
        }
    })();

    return {patronsData, patronsData_isLoaded, patronsData_isFailed};
}