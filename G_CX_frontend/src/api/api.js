import {api} from 'src/boot/axios';

export const getserver1info=(data)=>api.post('/test/server1info',data);
export const getserver2info=()=>api.post('/test/server2info');
export const getserver3info=()=>api.post('/test/server3info');
export const getlinechart1=()=>api.post('/test/getlinechart1');
export const getlinechart2=()=>api.post('/test/getlinechart2');
export const getlinechart3=()=>api.post('/test/getlinechart3');
