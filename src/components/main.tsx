import { useEffect, useRef, useState } from "react"
import Examples from "./purchaseExamples"
import axios from "axios";
interface examples{
    ID?:number;
    icon:string;
    purchaseDetail:string;
    price:number
}
export default function Main(){
    const [balance,setBalance] = useState<number>(0)
    const [displayWindow,setDisplayWidnow]=useState<boolean>(false)
    const [displayExamples,setDisplayExamples]=useState<boolean>(false)
    const [purchacesArray,setPurchacesArray]=useState<Array<examples>|[]>([])
    const [purchaseDetail,setPurchaseDetail]=useState<examples|null>(null)
    const price = useRef<HTMLInputElement|null>(null)
    const textRef = useRef<HTMLInputElement|null>(null)
    var balanceStyles = `${balance>=0?"text-green-400":"text-red-600"} text-4xl`
    var windowStyles = `${displayWindow?"block":"hidden"} absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center` 
    async function addExpense(obj:examples) {
        await axios.post('http://localhost:9000/addExpense',obj)
    }
    function createPurchase(){
        if(purchaseDetail===null||price.current?.value.trim().length===0){
            return 0
        }
        if(price.current){
            setDisplayWidnow(false)
            var obj = purchaseDetail
            obj.price=parseInt(price.current.value)
            setPurchaseDetail(obj)
            var arr = [...purchacesArray,obj]
            setPurchacesArray(arr)
            addExpense(obj)
        }else{
            return 0
        }
    }
    useEffect(() => {
        if(purchaseDetail!==null){
            var finalPrice
            if(purchaseDetail.purchaseDetail==="Deposit Money"){
                 finalPrice =balance + purchaseDetail.price;
            }else{
                finalPrice =balance - purchaseDetail.price;
            }
            setBalance(finalPrice);
        }
    }, [purchacesArray]);
   useEffect(()=>{
    if(textRef.current&&purchaseDetail){
        textRef.current.value=purchaseDetail?.purchaseDetail
    }
   },[purchaseDetail])
    async function getExpenses() {
        const request = await axios.post('http://localhost:9000/getExpenses',{ID:1}).then(e=>{
            setPurchacesArray(e.data)
            var cena =e.data.reduce((prev:number,item:examples)=>{
                return prev+item.price
            },0)
            setBalance(cena)
            return e.data 
        })
    }
    useEffect(()=>{
    getExpenses()
    },[])
   function createDate(data: Date): string {
    var today = "";
    data.getDay() < 10?today += `0${data.getDay()}-`:today += `${data.getDay()}-`
    data.getDay() < 10?today += `0${data.getMonth()+1}-`:today += `${data.getMonth()+1}-`
    today+=data.getFullYear()

    return today;
}
   const today = createDate(new Date())
return <div className=" w-full h-full flex flex-col">
        <div className={windowStyles}>
            <div className="w-72 h-2/4 p-3 bg-white flex relative">
                <i className="fa-solid fa-x text-4xl absolute top-3 right-4 cursor-pointer" onClick={()=>setDisplayWidnow(false)}></i>
                <table className="mt-12 h-56 ">
                    <tr className="flex justify-around w-64 mt-6 items-center ">
                        <td className="text-left font-bold text-xl">Select emote</td>
                        <td><div onClick={()=>setDisplayExamples(true)} className="w-10 h-10 bg-white rounded-full border cursor-pointer flex justify-center items-center text-xl border-black">{purchaseDetail?.icon}</div></td>
                    </tr>
                    <tr className="flex justify-around w-64 mt-6 items-center ">
                        <td className="text-left font-bold text-xl">Purchase detail</td>
                        <td><input type="text" readOnly={purchaseDetail?.purchaseDetail==="Deposit Money"?true:false} className="font-semibold p-1 rounded-xl border border-black w-20" ref={textRef}/></td>
                    </tr>
                    <tr className="flex justify-around w-64 mt-6 items-center ">
                        <td className="text-left font-bold text-xl">Purchase price</td>
                        <td><input type="number" ref={price}  className="font-semibold p-1 rounded-xl border border-black w-20" /></td>
                    </tr>
                    <tr className="flex justify-center mt-8" >
                        <td colSpan={2}><button className="border-4 cursor-pointer  font-bold border-black rounded-xl px-2.5 py-1" onClick={createPurchase}>Add purchase</button></td>
                    </tr>
                </table>
            </div>
            {displayExamples?<Examples closeExamples={setDisplayExamples} setDetail={setPurchaseDetail} />:""}
        </div>
        <div className="flex justify-around items-center mt-4 mb-4">
            <p className={balanceStyles}>{balance}zł</p>
            <i className="cursor-pointer text-4xl fa-solid fa-plus" onClick={()=>setDisplayWidnow(true)}></i>
        </div>
        <table className="w-full overflow-hidden max-h-full self-end mt-4">
            {
               purchacesArray.map((e,index:number)=>{
                  return  <tr key={index} className=" border-t-2 border-t-black text-xl">
                        <td className="p-3 ">{e.icon}</td>
                        <td className="p-3">{e.purchaseDetail}</td>
                        <td className={e.purchaseDetail==="Deposit Money"?'text-green-600 p-3 flex flex-col':"text-red-600 p-3 flex flex-col"}>{e.purchaseDetail==="Deposit Money"?`+${e.price}zł`:`${e.price}zł`}
                            <span className="text-black text-xs">{today}</span>
                        </td>
                    </tr>
                })
            }
        </table>
    </div>
}