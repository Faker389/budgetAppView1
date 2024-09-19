import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";

interface examples{
    Id:number;
    icon:string;
    purchaseDetail:string;
}
interface props{
    closeExamples:Function;
    setDetail:Function;
}
export default function Examples({closeExamples,setDetail}:props){
    const [exampleArray,setExampleArray]= useState<Array<examples>|[]>([])
    const [showNewPurchase,setShowNewPurchase] = useState<boolean>(false)
    const emote = useRef<HTMLInputElement|null>(null)
    const description = useRef<HTMLInputElement|null>(null)
    function handleDetailChange(obj:examples){
        setDetail(obj)
        closeExamples(false)
    }
   useMemo(()=>{
       axios.post("http://localhost:9000/options",{ID:1}).then(e=>{
           setExampleArray(e.data)
        })
   },[exampleArray])
   
    function newOption(){
        if(emote.current?.value.trim().length===0||description.current?.value.trim().length===0){
            return 0
        }
        if(emote.current&&description.current){
            var obj = {
                icon:emote.current.value,
                purchaseDetail:description.current?.value,
                Id:1
            } as examples
            var arr = [...exampleArray,obj]
            axios.post('http://localhost:9000/newOption',obj)
            setExampleArray(arr)
            setShowNewPurchase(false)
        }
    }
return <div className="bg-black bg-opacity-70 absolute top-0 left-0 w-screen h-screen">
    <div className="grid p-3 grid-cols-5  grid-rows-3 absolute h-fit bottom-0 left-0 w-full  border-t-4 border-black bg-white">
    <i className="fa-solid fa-x text-3xl absolute top-0 right-0 cursor-pointer" onClick={()=>closeExamples(false)}></i>
        <div className="mr-5 cursor-pointer"> 
            <div className="w-12 h-12 bg-white border-2 text-2xl flex justify-center items-center border-black rounded-full" onClick={()=> setShowNewPurchase(true)}>
                <i className="fa-solid fa-plus text-3xl"></i>
            </div>
            <p className="text-center">Add new</p>
        </div>
        <div className="mr-5 cursor-pointer" onClick={()=>handleDetailChange({Id:9,icon:"💸",purchaseDetail:"Deposit Money"})}> 
            <div className="w-12 h-12 bg-white border-2 text-2xl flex justify-center items-center border-black rounded-full">💸</div>
            <p className="text-center">Deposit Money</p>
        </div>
        {exampleArray.map((e:examples)=>{
            return <div key={e.Id} className="mr-5 cursor-pointer" onClick={()=>handleDetailChange(e)}> 
                <div className="w-12 h-12 bg-white border-2 text-2xl flex justify-center items-center border-black rounded-full">{e.icon}</div>
                <p className="text-center">{e.purchaseDetail}</p>
            </div>
        })}        
    </div>
    {showNewPurchase?
        <div className="bg-black bg-opacity-70 absolute top-0 left-0 w-screen h-screen">
            <div className="p-4 z-20 w-full h-1/4 bg-white absolute bottom-0 left-0">
                <div className="flex justify-around items-center ">
                    <label className="text-xl font-bold">Select emote:</label>
                    <div className="w-12 h-12 bg-white border-2 text-2xl p-2 border-black rounded-full">
                        <input ref={emote} className="w-full h-full rounded-full border-white" maxLength={2} type="text" />
                    </div>
                </div>
                <div className="flex justify-around mt-3 items-center ">
                    <label className="text-xl font-bold">Purchase detail:</label>
                    <input ref={description} className="w-32 border-black border-2 p-1 font-semibold"  type="text" />
                </div>
                <div className="flex justify-around mt-5 items-center ">
                    <button className="border-4 cursor-pointer  font-bold border-black rounded-xl px-2.5 py-1" onClick={newOption} >Add option</button>
                </div>
            </div>
        </div>
    :""}
</div>
}