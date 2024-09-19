import { useEffect, useState } from "react";
import ChartComponent from "./chart";
import axios from "axios";
interface dane{
    income:Array<number>;
    months:Array<string>;
  }
export default function Statistic(){
    const [ArraySave,setArraySave]=useState<dane>({income:[],months:[]})
    const [chartData,setChartData]=useState<dane>({income:[],months:[]})
    useEffect(()=>{
        axios.post("http://localhost:9000/chartData",{ID:1}).then(e=>{
            setChartData(e.data)
            setArraySave(e.data)
        })
    },[])
    function handleMonthChange(e: React.ChangeEvent<HTMLSelectElement>){
        if(e.target.value==="All months") {
            setChartData(ArraySave);
             return 
        }
        var index = ArraySave.months.indexOf(e.target.value)
        var obj = {
            income:[ArraySave.income[index]],
            months:[ArraySave.months[index]],
        } as dane
        setChartData(obj)
    }
    return <div className=" w-full h-full p-3">
        <select onChange={(e)=>handleMonthChange(e)} className="p-2 border-2 rounded-md">
            <option value="All months">All months</option>
            {
                ArraySave.months.map((e:string)=>{
                    return <option value={e}>{e}</option>
                })
            }
        </select>
        <ChartComponent data={chartData} />
    </div>
}