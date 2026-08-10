import { curriculum } from '../data/curriculum';
import { seedQuestions } from '../data/questionBank';
import { ActualDifficulty, GenerateArgs, Question } from '../types';

const MAX_BATCH=5, MAX_RETRY=3;
const difficulties:ActualDifficulty[]=['Kolay','Orta','Zor'];
const shuffle=<T,>(a:T[])=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
function normalize(q:Question):Question|null{
  if(!q||!q.stem||!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.correctIndex)||q.correctIndex<0||q.correctIndex>3||!q.explanation)return null;
  return q;
}
function localPool(args:GenerateArgs){
  let pool=seedQuestions.filter(x=>x.grade===args.grade);
  if(args.topic!=='Tüm Konular') pool=pool.filter(x=>x.topic===args.topic);
  if(args.difficulty!=='Karma'){
    const exact=pool.filter(x=>x.difficulty===args.difficulty); if(exact.length) pool=exact;
  }
  if(!pool.length) pool=seedQuestions.filter(x=>x.grade===args.grade);
  return pool;
}
function localQuestion(args:GenerateArgs,index:number):Question{
  const pool=localPool(args); const base=pool[index%pool.length]; const desired:ActualDifficulty=args.difficulty==='Karma'?difficulties[index%3]:args.difficulty;
  const options=base.options.map((x:string,i:number)=>({x,i})); const mixed=shuffle(options); const correctIndex=mixed.findIndex(x=>x.i===base.correctIndex);
  return {...base,id:`local-${Date.now()}-${index}-${Math.random().toString(36).slice(2,7)}`,difficulty:args.difficulty==='Karma'?base.difficulty:desired,options:mixed.map(x=>x.x),correctIndex,sourceNote:`${base.sourceNote} • ${curriculum[args.grade].officialBasis}`};
}
async function remoteBatch(args:GenerateArgs,amount:number,offset:number):Promise<Question[]>{
  const endpoint=process.env.EXPO_PUBLIC_QUESTION_API_URL; if(!endpoint)return [];
  const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),16000);
  try{
    const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...args,count:amount,offset,sourcePolicy:'Yalnız MEB ve resmî eğitim kaynakları; lise düzeyi; 4 seçenek; tek doğru cevap.'}),signal:controller.signal});
    if(!r.ok)throw new Error(`HTTP ${r.status}`); const data=await r.json();
    return (Array.isArray(data.questions)?data.questions:[]).map(normalize).filter(Boolean) as Question[];
  }finally{clearTimeout(timer)}
}
export async function generateQuestions(args:GenerateArgs,onProgress?:(done:number,total:number)=>void):Promise<Question[]>{
  const completed:Question[]=[]; const seen=new Set<string>(); let localIndex=Math.floor(Math.random()*1000);
  while(completed.length<args.count){
    const batchStart=completed.length;
    const batchSize=Math.min(MAX_BATCH,args.count-batchStart);
    const target=batchStart+batchSize;
    let remote:Question[]=[];
    if(process.env.EXPO_PUBLIC_QUESTION_API_URL){
      for(let attempt=1;attempt<=MAX_RETRY;attempt++){
        try{remote=await remoteBatch(args,batchSize,batchStart);if(remote.length)break}catch{await new Promise<void>(r=>setTimeout(r,250*attempt))}
      }
    }
    for(const item of remote){
      if(completed.length>=target)break;
      const key=item.stem.trim().toLocaleLowerCase('tr-TR');
      if(!seen.has(key)){seen.add(key);completed.push(item)}
    }
    // Bir batch eksik veya tamamen hatalı dönerse yalnız o batch'in eksik kısmı yerel motorla tamamlanır.
    while(completed.length<target){
      const item=localQuestion(args,localIndex++);
      completed.push(item);
    }
    onProgress?.(completed.length,args.count);
  }
  return completed.slice(0,args.count);
}
