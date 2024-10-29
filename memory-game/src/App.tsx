import { ChangeEvent, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [gridSize,setGridSize] = useState<number>(5);
  const [count, setCount] = useState<number>(0);
  const [solved , setSolved] = useState<number[]>([]);
  const [disabled , setDisabled] = useState<boolean>(false);
  const [won,setWon] = useState<boolean>(false);
  const [cards,setCards]=useState<{id:number,number:number}[]>([]);
  const [flipped,setFlipped] = useState<number[]>([]);
  const initializeGame = ()=>{
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards/2);
   
    const numbers = [...Array(pairCount).keys()].map((num)=>num+1);
    const suffleCards = [...numbers,...numbers]
    .sort(()=>Math.random() - 0.5)
    .slice(0,totalCards)
    .map((number,index)=>({id:index,number}));
    setCards(suffleCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  };



  useEffect(()=>{
initializeGame()
  },[gridSize])

const handleClick = (id:number) =>{
  if(disabled||won) return;
  if(flipped.length===0){
    setFlipped([id]);
    return;


  }

  if(flipped.length===1){
    setDisabled(true);
    if(id!==flipped[0]){
      setFlipped([...flipped,id])
      checkMatch(id)
    }else{
      setFlipped([]);
      setDisabled(false)
    }
  }
};

const checkMatch=(secondId:number) =>{
  const [firstId] = flipped;
  if(cards[firstId].number===cards[secondId].number){
    setSolved([...solved,firstId,secondId])
    setFlipped([]);
    setDisabled(false);
  }else{
    setTimeout(()=>{
      setFlipped([])
      setDisabled(false)
    },1000)
    
  }
}

const isFlipped = (id:number)=>flipped.includes(id) || solved.includes(id);
const isSolved = (id:number) => solved.includes(id);
  const HandleGridSizeChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const size = parseInt(e.target.value);
    if(size>=2 && size<=10)setGridSize(size);

  };

useEffect(()=>{
if(solved.length === cards.length && cards.length>0){
  setWon(true);
}
},[solved,cards])
  return (
    <>
    <div className='flex flex-col items-center justify-center min-h-screen bg-green p-4'>
      <h1 className='text-3xl font-bold mb-6'>Memory Game</h1>
   <div className='mb-4'>
    <label htmlFor="gridSize" className='mr-2'>
      GridSize :- max(10)
    </label>
    <input type="number" 
    id="gridSize" 
    min="2"
    max="10"
    value={gridSize}
    onChange={HandleGridSizeChange}
    className='border-2 border-green-300 rounded px-3 py2'
    />
   </div>
   <div className='grid gap-2 mb-4'
   style={{
    gridTemplateColumns:`repeat(${gridSize},minmax(0,1fr))`,
    width:`min(100%,${gridSize * 5.5}rem),`
   }}>

    {cards.map((card)=>{
      return(
        <div onClick={()=>handleClick(card.id)} className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all
        duration-300 bg-gray-300 bg-gray-300 text-gray-400 ${isFlipped(card.id)? isSolved(card.id) ? "bg-green-500 text-white-300": "bg-blue-500 text-white" : "bg-gray-300 text-gray-400"}`}  key={card.id}>
          
          {isFlipped(card.id) ? card.number:
          '?'}
          </div>
      )
    })}

   </div>

   {won && (
    <div className='animate-bounce mt-4 text-4xl font-bold'>You Won..</div>
   )}

   <button className='bg-blue-300 font-bold py-2 px-4 text-white rounded hovor:bg-blue-500'>{won ? 'Play Again':'Reset'}</button>
    </div>
    
    </>


















































  )
}

export default App
