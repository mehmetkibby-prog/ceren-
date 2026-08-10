import AsyncStorage from '@react-native-async-storage/async-storage';
import { Question, TestHistory, WrongRecord } from '../types';

const WRONG='kimya.wrongs.v1', HISTORY='kimya.history.v1';
export async function getWrongs():Promise<WrongRecord[]>{ try{return JSON.parse((await AsyncStorage.getItem(WRONG))||'[]')}catch{return []} }
export async function addWrong(question:Question){
  const all=await getWrongs(); const i=all.findIndex(x=>x.stem===question.stem && x.grade===question.grade);
  if(i>=0) all[i]={...all[i],wrongCount:all[i].wrongCount+1,lastWrongAt:Date.now()};
  else all.unshift({...question,wrongCount:1,lastWrongAt:Date.now()});
  await AsyncStorage.setItem(WRONG,JSON.stringify(all.slice(0,300)));
}
export async function removeWrong(id:string){ const all=(await getWrongs()).filter(x=>x.id!==id); await AsyncStorage.setItem(WRONG,JSON.stringify(all)); }
export async function clearWrongs(){ await AsyncStorage.removeItem(WRONG); }
export async function getHistory():Promise<TestHistory[]>{ try{return JSON.parse((await AsyncStorage.getItem(HISTORY))||'[]')}catch{return []} }
export async function addHistory(item:TestHistory){ const all=await getHistory(); await AsyncStorage.setItem(HISTORY,JSON.stringify([item,...all].slice(0,100))); }
