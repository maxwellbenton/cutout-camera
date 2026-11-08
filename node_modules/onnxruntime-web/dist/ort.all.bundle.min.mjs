/*!
 * ONNX Runtime Web v1.31.1
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var B2=Object.create;var yi=Object.defineProperty;var V2=Object.getOwnPropertyDescriptor;var F2=Object.getOwnPropertyNames;var G2=Object.getPrototypeOf,U2=Object.prototype.hasOwnProperty;var Jr=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var N=(r,e,n)=>()=>{if(n)throw n[0];try{return r&&(e=r(r=0)),e}catch(t){throw n=[t],t}};var oe=(r,e)=>()=>{try{return e||r((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}},Or=(r,e)=>{for(var n in e)yi(r,n,{get:e[n],enumerable:!0})},rf=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of F2(e))!U2.call(r,o)&&o!==n&&yi(r,o,{get:()=>e[o],enumerable:!(t=V2(e,o))||t.enumerable});return r};var we=(r,e,n)=>(n=r!=null?B2(G2(r)):{},rf(e||!r||!r.__esModule?yi(n,"default",{value:r,enumerable:!0}):n,r)),Yr=r=>rf(yi({},"__esModule",{value:!0}),r);var Oo,ur,of,lr,af,sf,uf,_i=N(()=>{"use strict";Oo=new Map,ur=[],of=new WeakMap,lr=(r,e,n)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=Oo.get(r);if(t===void 0)Oo.set(r,{backend:e,priority:n});else{if(t.priority>n)return;if(t.priority===n&&t.backend!==e)throw new Error(`cannot register backend "${r}" using priority ${n}`)}if(n>=0){let o=ur.indexOf(r);o!==-1&&ur.splice(o,1);for(let i=0;i<ur.length;i++)if(Oo.get(ur[i]).priority<=n){ur.splice(i,0,r);return}ur.push(r)}return}throw new TypeError("not a valid backend")},af=async r=>{let e=Oo.get(r);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let n=!!e.initPromise;try{if(!n){let t=e.backend,o=of.get(t);e.initPromise=o?o.then(async()=>t.init(r),async()=>t.init(r)):t.init(r),of.set(t,e.initPromise)}return await e.initPromise,e.initialized=!0,e.backend}catch(t){return n||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},sf=async r=>{let e=r.executionProviders||[],n=e.map(u=>typeof u=="string"?u:u.name),t=n.length===0?ur:n,o,i=[],a=new Set;for(let u of t){let l=await af(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&a.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let s=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[o,new Proxy(r,{get:(u,l)=>l==="executionProviders"?s:Reflect.get(u,l)})]},uf=async()=>{let r=[];for(let n of ur){if(typeof Oo.get(n).backend.createLoraAdapterHandler!="function")continue;let t=await af(n);if(typeof t!="string")return t;r.push({name:n,err:t})}let e=r.length===0?"":` ERR: ${r.map(n=>`[${n.name}] ${n.err}`).join(", ")}`;throw new Error(`no available backend supports LoRA adapters.${e}`)}});var lf=N(()=>{"use strict";_i()});var cf,df=N(()=>{"use strict";cf="1.31.1"});var pf,ct,Hs=N(()=>{"use strict";df();pf="warning",ct={wasm:{},webgl:{},webgpu:{},versions:{common:cf},set logLevel(r){if(r!==void 0){if(typeof r!="string"||["verbose","info","warning","error","fatal"].indexOf(r)===-1)throw new Error(`Unsupported logging level: ${r}`);pf=r}},get logLevel(){return pf}};Object.defineProperty(ct,"logLevel",{enumerable:!0})});var me,ff=N(()=>{"use strict";Hs();me=ct});var vi,hf,gt,pt,cr,dr,wi=N(()=>{"use strict";Hs();vi=(r,e)=>{(typeof ct.trace>"u"?!ct.wasm.trace:!ct.trace)||console.timeStamp(`${r}::ORT::${e}`)},hf=(r,e)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<n.length;o++){if(t&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${r}::${n[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),vi("CPU",i);return}n[o].includes("TRACE_FUNC")&&(t=!0)}},gt=r=>{(typeof ct.trace>"u"?!ct.wasm.trace:!ct.trace)||hf("BEGIN",r)},pt=r=>{(typeof ct.trace>"u"?!ct.wasm.trace:!ct.trace)||hf("END",r)},cr=r=>{(typeof ct.trace>"u"?!ct.wasm.trace:!ct.trace)||console.time(`ORT::${r}`)},dr=r=>{(typeof ct.trace>"u"?!ct.wasm.trace:!ct.trace)||console.timeEnd(`ORT::${r}`)}});var Qr,qs=N(()=>{"use strict";_i();wi();Qr=class r{constructor(e,n){this.backend=e,this.handler=n}static async create(e){if(gt(),typeof e!="string"&&!(e instanceof Uint8Array))throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let n=await uf(),t=await n.createLoraAdapterHandler(e);return pt(),new r(n,t)}async release(){return this.handler.dispose()}}});var mf,gf,bf=N(()=>{"use strict";mf=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=r.dims[3],n.height=r.dims[2];let t=n.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[3]):(o=r.dims[3],i=r.dims[2]);let a=e?.format!==void 0?e.format:"RGB",s=e?.norm,u,l;s===void 0||s.mean===void 0?u=[255,255,255,255]:typeof s.mean=="number"?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(u[3]=s.mean[3])),s===void 0||s.bias===void 0?l=[0,0,0,0]:typeof s.bias=="number"?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(l[3]=s.bias[3]));let c=i*o,p=0,h=c,g=c*2,m=-1;a==="RGBA"?(p=0,h=c,g=c*2,m=c*3):a==="RGB"?(p=0,h=c,g=c*2):a==="RBG"&&(p=0,g=c,h=c*2);for(let _=0;_<i;_++)for(let S=0;S<o;S++){let v=(r.data[p++]-l[0])*u[0],x=(r.data[h++]-l[1])*u[1],$=(r.data[g++]-l[2])*u[2],O=m===-1?255:(r.data[m++]-l[3])*u[3];t.fillStyle="rgba("+v+","+x+","+$+","+O+")",t.fillRect(S,_,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},gf=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(n!=null){let o,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[1],a=r.dims[3]):(o=r.dims[3],i=r.dims[2],a=r.dims[1]);let s=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,c;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let p=i*o;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,g=0,m=1,_=2,S=3,v=0,x=p,$=p*2,O=-1;s==="RGBA"?(v=0,x=p,$=p*2,O=p*3):s==="RGB"?(v=0,x=p,$=p*2):s==="RBG"&&(v=0,$=p,x=p*2),t=n.createImageData(o,i);for(let P=0;P<i*o;g+=h,m+=h,_+=h,S+=h,P++)t.data[g]=(r.data[v++]-c[0])*l[0],t.data[m]=(r.data[x++]-c[1])*l[1],t.data[_]=(r.data[$++]-c[2])*l[2],t.data[S]=O===-1?255:(r.data[O++]-c[3])*l[3]}else throw new Error("Can not access image data");return t}});var js,yf,_f,vf,wf,xf,Tf=N(()=>{"use strict";xi();js=(r,e)=>{if(r===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:t}=e,o=e.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let s=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=n*t,c=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),p=4,h=0,g=1,m=2,_=3,S=0,v=l,x=l*2,$=-1;s==="RGB"&&(p=3,h=0,g=1,m=2,_=-1),u==="RGBA"?$=l*3:u==="RBG"?(S=0,x=l,v=l*2):u==="BGR"&&(x=0,v=l,S=l*2);for(let P=0;P<l;P++,h+=p,m+=p,g+=p,_+=p)c[S++]=(r[h]+a[0])/i[0],c[v++]=(r[g]+a[1])/i[1],c[x++]=(r[m]+a[2])/i[2],$!==-1&&_!==-1&&(c[$++]=(r[_]+a[3])/i[3]);return u==="RGBA"?new bt("float32",c,[1,4,n,t]):new bt("float32",c,[1,3,n,t])},yf=async(r,e)=>{let n=typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement,t=typeof ImageData<"u"&&r instanceof ImageData,o=typeof ImageBitmap<"u"&&r instanceof ImageBitmap,i=typeof r=="string",a,s=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(n){let c=u();c.width=r.width,c.height=r.height;let p=l(c);if(p!=null){let h=r.height,g=r.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(h=e.resizedHeight,g=e.resizedWidth),e!==void 0){if(s=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=h,s.width=g}else s.tensorFormat="RGBA",s.height=h,s.width=g;p.drawImage(r,0,0),a=p.getImageData(0,0,g,h).data}else throw new Error("Can not access image data")}else if(t){let c,p;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(c=e.resizedHeight,p=e.resizedWidth):(c=r.height,p=r.width),e!==void 0&&(s=e),s.format="RGBA",s.height=c,s.width=p,e!==void 0){let h=u();h.width=p,h.height=c;let g=l(h);if(g!=null)g.putImageData(r,0,0),a=g.getImageData(0,0,p,c).data;else throw new Error("Can not access image data")}else a=r.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=r.width,c.height=r.height;let p=l(c);if(p!=null){let h=r.height,g=r.width;return p.drawImage(r,0,0,g,h),a=p.getImageData(0,0,g,h).data,s.height=h,s.width=g,js(a,s)}else throw new Error("Can not access image data")}else{if(i)return new Promise((c,p)=>{let h=u(),g=l(h);if(!r||!g)return p();let m=new Image;m.crossOrigin="Anonymous",m.src=r,m.onload=()=>{h.width=m.width,h.height=m.height,g.drawImage(m,0,0,h.width,h.height);let _=g.getImageData(0,0,h.width,h.height);s.height=h.height,s.width=h.width,c(js(_.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return js(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")},_f=(r,e)=>{let{width:n,height:t,download:o,dispose:i}=e,a=[1,t,n,4];return new bt({location:"texture",type:"float32",texture:r,dims:a,download:o,dispose:i})},vf=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new bt({location:"gpu-buffer",type:n??"float32",gpuBuffer:r,dims:t,download:o,dispose:i})},wf=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new bt({location:"ml-tensor",type:n??"float32",mlTensor:r,dims:t,download:o,dispose:i})},xf=(r,e,n)=>new bt({location:"cpu-pinned",type:r,data:e,dims:n??[e.length]})});var Pr,Po,If,Sf,$f=N(()=>{"use strict";Pr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Po=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),If=!1,Sf=()=>{if(!If){If=!0;let r=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,t=typeof n<"u"&&n.from;r&&(Pr.set("int64",BigInt64Array),Po.set(BigInt64Array,"int64")),e&&(Pr.set("uint64",BigUint64Array),Po.set(BigUint64Array,"uint64")),t?(Pr.set("float16",n),Po.set(n,"float16")):Pr.set("float16",Uint16Array)}}});var Af,Of,Pf=N(()=>{"use strict";xi();Af=r=>{let e=1;for(let n=0;n<r.length;n++){let t=r[n];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${n}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${t}`);e*=t}return e},Of=(r,e)=>{switch(r.location){case"cpu":return new bt(r.type,r.data,e);case"cpu-pinned":return new bt({location:"cpu-pinned",data:r.data,type:r.type,dims:e});case"texture":return new bt({location:"texture",texture:r.texture,type:r.type,dims:e});case"gpu-buffer":return new bt({location:"gpu-buffer",gpuBuffer:r.gpuBuffer,type:r.type,dims:e});case"ml-tensor":return new bt({location:"ml-tensor",mlTensor:r.mlTensor,type:r.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${r.location} is not supported`)}}});var bt,xi=N(()=>{"use strict";bf();Tf();$f();Pf();bt=class{constructor(e,n,t){Sf();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=Pr.get(o);if(!s)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");s=n}else{let l=Pr.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(n)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(n,BigInt):s=l.from(n)}else if(n instanceof l)s=n;else if(n instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&n instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(n.buffer,n.byteOffset,n.length);else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=n,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",s=e;else if(l==="boolean")o="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",s=Uint8Array.from(e);else{let l=Po.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=Af(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(e,n){return yf(e,n)}static fromTexture(e,n){return _f(e,n)}static fromGpuBuffer(e,n){return vf(e,n)}static fromMLTensor(e,n){return wf(e,n)}static fromPinnedBuffer(e,n,t){return xf(e,n,t)}toDataURL(e){return mf(this,e)}toImageData(e){return gf(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,e&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Of(this,e)}}});var At,Ks=N(()=>{"use strict";xi();At=bt});var Ti,Ef=N(()=>{"use strict";_i();qs();Ks();wi();Ti=class r{constructor(e,n){this.handler=e,this.backend=n}async run(e,n,t){gt(),cr("InferenceSession.run");let o={},i={};if(typeof e!="object"||e===null||e instanceof At||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof At)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of n){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,p=Object.getOwnPropertyNames(n);for(let h of this.outputNames)if(p.indexOf(h)!==-1){let g=n[h];(g===null||g instanceof At)&&(c=!0,a=!1,o[h]=g)}if(c){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof e[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)o[c]=null;let s;if(i.activeLoraAdapters!==void 0){if(!Array.isArray(i.activeLoraAdapters))throw new TypeError("'activeLoraAdapters' must be an array.");s=i.activeLoraAdapters.map(c=>{if(!(c instanceof Qr))throw new TypeError("'activeLoraAdapters' must be an array of LoraAdapter objects.");if(c.backend!==this.backend)throw new Error("LoRA adapter was created by a different backend than the session.");return c.handler})}let u=await this.handler.run(e,o,i,s),l={};for(let c in u)if(Object.hasOwnProperty.call(u,c)){let p=u[c];p instanceof At?l[c]=p:l[c]=new At(p.type,p.data,p.dims)}return dr("InferenceSession.run"),pt(),l}async release(){return this.handler.dispose()}static async create(e,n,t,o){gt(),cr("InferenceSession.create");let i,a={};if(typeof e=="string"){if(i=e,typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let c=e,p=0,h=e.byteLength;if(typeof n=="object"&&n!==null)a=n;else if(typeof n=="number"){if(p=n,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(h=e.byteLength-p,typeof t=="number"){if(h=t,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||p+h>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-p}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(c,p,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await sf(a),l=await s.createInferenceSessionHandler(i,u);return dr("InferenceSession.create"),pt(),new r(l,s)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var W2,Cf=N(()=>{"use strict";Ef();W2=Ti});var H2,Df=N(()=>{"use strict";qs();H2=Qr});var kf=N(()=>{"use strict"});var Nf=N(()=>{"use strict"});var Lf=N(()=>{"use strict"});var Rf=N(()=>{"use strict"});var Xs={};Or(Xs,{InferenceSession:()=>W2,LoraAdapter:()=>H2,TRACE:()=>vi,TRACE_EVENT_BEGIN:()=>cr,TRACE_EVENT_END:()=>dr,TRACE_FUNC_BEGIN:()=>gt,TRACE_FUNC_END:()=>pt,Tensor:()=>At,env:()=>me,registerBackend:()=>lr});var ft=N(()=>{"use strict";lf();ff();Cf();Df();Ks();kf();Nf();wi();Lf();Rf()});function pr(r,e,n,t){if(e===void 0)return j2(r);if(n===void 0)Ii(r,e,1);else if(typeof n=="number"&&t===void 0)Ii(r,e,n);else if(typeof n=="string"&&t===void 0)Ii(r,n,1,e);else if(typeof n=="string"&&typeof t=="number")Ii(r,n,t,e);else throw new TypeError("input is valid")}function j2(r){return{verbose:pr.verbose.bind(null,r),info:pr.info.bind(null,r),warning:pr.warning.bind(null,r),error:pr.error.bind(null,r),fatal:pr.fatal.bind(null,r)}}function Ii(r,e,n,t){let o=Eo[t||""]||Eo[""];Mf[r]<Mf[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,q2[o.provider].log(r,e,t))}var Zs,Js,Mf,q2,Bf,Eo,Fe,$i,Ai,Oi,Si,Dt=N(()=>{"use strict";Zs=class{log(e,n,t){}},Js=class{log(e,n,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${n}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Mf={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},q2={none:new Zs,console:new Js},Bf={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},Eo={"":Bf};(u=>{function r(l,c){u("verbose",l,c)}u.verbose=r;function e(l,c){u("info",l,c)}u.info=e;function n(l,c){u("warning",l,c)}u.warning=n;function t(l,c){u("error",l,c)}u.error=t;function o(l,c){u("fatal",l,c)}u.fatal=o;function i(l){Eo={},a("",l||{})}u.reset=i;function a(l,c){if(l==="*")i(c);else{let p=Eo[l]||Bf;Eo[l]={provider:c.provider||p.provider,minimalSeverity:c.minimalSeverity||p.minimalSeverity,logDateTime:c.logDateTime===void 0?p.logDateTime:c.logDateTime,logSourceLocation:c.logSourceLocation===void 0?p.logSourceLocation:c.logSourceLocation}}}u.set=a;function s(l){let c={};l.logLevel&&(c.minimalSeverity=l.logLevel),a("",c)}u.setWithEnv=s})(pr||={});Fe=pr,$i=class{constructor(e,n,t,o,i,a){this.category=e;this.name=n;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},Ai=class{constructor(e,n,t,o){this.category=e;this.name=n;this.startTime=t;this.endTime=o}},Oi=class{constructor(e,n,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=n===void 0?10:n,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=Si(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,n,t,o){let i=this._started?this.begin(e,n,o):void 0,a=!1,s=t();if(s&&typeof s.then=="function")return a=!0,new Promise((u,l)=>{s.then(async c=>{i&&await i.end(),u(c)},async c=>{i&&await i.end(),l(c)})});if(!a&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,c)=>{u.then(()=>{l(s)},p=>{c(p)})})}return s}begin(e,n,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=Si();return this.flush(o),new $i(e,n,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new $i(e,n,0,async i=>this.end(i),o,t)}}async end(e){let n=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Ai(e.category,e.name,e.startTime,n)),this.flush(n))}endSync(e){let n=Si();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Ai(e.category,e.name,e.startTime,n)),this.flush(n))}logOneEvent(e){Fe.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let n=this._flushPointer;this._flushPointer<n+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=Si()}}get started(){return this._started}},Si=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Vf(r,e,n){for(let t of n){let o=t[0],i=t[1],a=t[2],s=t[3],u=t[4];if(r.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&K2(l.version,a))return{opImpl:s,opInit:u}}}throw new TypeError(`cannot resolve operator '${r.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function K2(r,e){if(e.endsWith("+")){let n=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(n)&&n<=r}else if(e.split("-").length===2){let n=e.split("-"),t=Number.parseInt(n[0],10),o=Number.parseInt(n[1],10);return!isNaN(t)&&!isNaN(o)&&t<=r&&r<=o}else return Number.parseInt(e,10)===r}var Ff=N(()=>{"use strict"});var Gf=oe(Ys=>{"use strict";Ys.__esModule=!0;var X2=(function(){function r(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=r.EMPTY,e&&r.isGuid(e)&&(this.value=e)}return r.isGuid=function(e){var n=e.toString();return e&&(e instanceof r||r.validator.test(n))},r.create=function(){return new r([r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-"))},r.createEmpty=function(){return new r("emptyguid")},r.parse=function(e){return new r(e)},r.raw=function(){return[r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-")},r.gen=function(e){for(var n="",t=0;t<e;t++)n+=((1+Math.random())*65536|0).toString(16).substring(1);return n},r.prototype.equals=function(e){return r.isGuid(e)&&this.value===e.toString()},r.prototype.isEmpty=function(){return this.value===r.EMPTY},r.prototype.toString=function(){return this.value},r.prototype.toJSON=function(){return{value:this.value}},r.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),r.EMPTY="00000000-0000-0000-0000-000000000000",r})();Ys.Guid=X2});function He(r,e,n){this.low=r|0,this.high=e|0,this.unsigned=!!n}function _t(r){return(r&&r.__isLong__)===!0}function Uf(r){var e=Math.clz32(r&-r);return r?31-e:e}function Er(r,e){var n,t,o;return e?(r>>>=0,(o=0<=r&&r<256)&&(t=Hf[r],t)?t:(n=Re(r,0,!0),o&&(Hf[r]=n),n)):(r|=0,(o=-128<=r&&r<128)&&(t=Wf[r],t)?t:(n=Re(r,r<0?-1:0,!1),o&&(Wf[r]=n),n))}function Nt(r,e){if(isNaN(r))return e?Jn:qt;if(e){if(r<0)return Jn;if(r>=Xf)return Yf}else{if(r<=-jf)return xt;if(r+1>=jf)return Jf}return r<0?Nt(-r,e).neg():Re(r%to|0,r/to|0,e)}function Re(r,e,n){return new He(r,e,n)}function eu(r,e,n){if(r.length===0)throw Error("empty string");if(typeof e=="number"?(n=e,e=!1):e=!!e,r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return e?Jn:qt;if(n=n||10,n<2||36<n)throw RangeError("radix");var t;if((t=r.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return eu(r.substring(1),e,n).neg();for(var o=Nt(Pi(n,8)),i=qt,a=0;a<r.length;a+=8){var s=Math.min(8,r.length-a),u=parseInt(r.substring(a,a+s),n);if(s<8){var l=Nt(Pi(n,s));i=i.mul(l).add(Nt(u))}else i=i.mul(o),i=i.add(Nt(u))}return i.unsigned=e,i}function Lt(r,e){return typeof r=="number"?Nt(r,e):typeof r=="string"?eu(r,e):Re(r.low,r.high,typeof e=="boolean"?e:r.unsigned)}var kt,Wf,Hf,Pi,qf,Z2,to,Xf,jf,Kf,qt,Jn,eo,Zf,Qs,Jf,Yf,xt,X,fr,tu=N(()=>{kt=null;try{kt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}He.prototype.__isLong__;Object.defineProperty(He.prototype,"__isLong__",{value:!0});He.isLong=_t;Wf={},Hf={};He.fromInt=Er;He.fromNumber=Nt;He.fromBits=Re;Pi=Math.pow;He.fromString=eu;He.fromValue=Lt;qf=65536,Z2=1<<24,to=qf*qf,Xf=to*to,jf=Xf/2,Kf=Er(Z2),qt=Er(0);He.ZERO=qt;Jn=Er(0,!0);He.UZERO=Jn;eo=Er(1);He.ONE=eo;Zf=Er(1,!0);He.UONE=Zf;Qs=Er(-1);He.NEG_ONE=Qs;Jf=Re(-1,2147483647,!1);He.MAX_VALUE=Jf;Yf=Re(-1,-1,!0);He.MAX_UNSIGNED_VALUE=Yf;xt=Re(0,-2147483648,!1);He.MIN_VALUE=xt;X=He.prototype;X.toInt=function(){return this.unsigned?this.low>>>0:this.low};X.toNumber=function(){return this.unsigned?(this.high>>>0)*to+(this.low>>>0):this.high*to+(this.low>>>0)};X.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(xt)){var n=Nt(e),t=this.div(n),o=t.mul(n).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=Nt(Pi(e,6),this.unsigned),a=this,s="";;){var u=a.div(i),l=a.sub(u.mul(i)).toInt()>>>0,c=l.toString(e);if(a=u,a.isZero())return c+s;for(;c.length<6;)c="0"+c;s=""+c+s}};X.getHighBits=function(){return this.high};X.getHighBitsUnsigned=function(){return this.high>>>0};X.getLowBits=function(){return this.low};X.getLowBitsUnsigned=function(){return this.low>>>0};X.getNumBitsAbs=function(){if(this.isNegative())return this.eq(xt)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&(e&1<<n)==0;n--);return this.high!=0?n+33:n+1};X.isSafeInteger=function(){var e=this.high>>21;return e?this.unsigned?!1:e===-1&&!(this.low===0&&this.high===-2097152):!0};X.isZero=function(){return this.high===0&&this.low===0};X.eqz=X.isZero;X.isNegative=function(){return!this.unsigned&&this.high<0};X.isPositive=function(){return this.unsigned||this.high>=0};X.isOdd=function(){return(this.low&1)===1};X.isEven=function(){return(this.low&1)===0};X.equals=function(e){return _t(e)||(e=Lt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};X.eq=X.equals;X.notEquals=function(e){return!this.eq(e)};X.neq=X.notEquals;X.ne=X.notEquals;X.lessThan=function(e){return this.comp(e)<0};X.lt=X.lessThan;X.lessThanOrEqual=function(e){return this.comp(e)<=0};X.lte=X.lessThanOrEqual;X.le=X.lessThanOrEqual;X.greaterThan=function(e){return this.comp(e)>0};X.gt=X.greaterThan;X.greaterThanOrEqual=function(e){return this.comp(e)>=0};X.gte=X.greaterThanOrEqual;X.ge=X.greaterThanOrEqual;X.compare=function(e){if(_t(e)||(e=Lt(e)),this.eq(e))return 0;var n=this.isNegative(),t=e.isNegative();return n&&!t?-1:!n&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};X.comp=X.compare;X.negate=function(){return!this.unsigned&&this.eq(xt)?xt:this.not().add(eo)};X.neg=X.negate;X.add=function(e){_t(e)||(e=Lt(e));var n=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,a=e.high>>>16,s=e.high&65535,u=e.low>>>16,l=e.low&65535,c=0,p=0,h=0,g=0;return g+=i+l,h+=g>>>16,g&=65535,h+=o+u,p+=h>>>16,h&=65535,p+=t+s,c+=p>>>16,p&=65535,c+=n+a,c&=65535,Re(h<<16|g,c<<16|p,this.unsigned)};X.subtract=function(e){return _t(e)||(e=Lt(e)),this.add(e.neg())};X.sub=X.subtract;X.multiply=function(e){if(this.isZero())return this;if(_t(e)||(e=Lt(e)),kt){var n=kt.mul(this.low,this.high,e.low,e.high);return Re(n,kt.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?Jn:qt;if(this.eq(xt))return e.isOdd()?xt:qt;if(e.eq(xt))return this.isOdd()?xt:qt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Kf)&&e.lt(Kf))return Nt(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,a=this.low&65535,s=e.high>>>16,u=e.high&65535,l=e.low>>>16,c=e.low&65535,p=0,h=0,g=0,m=0;return m+=a*c,g+=m>>>16,m&=65535,g+=i*c,h+=g>>>16,g&=65535,g+=a*l,h+=g>>>16,g&=65535,h+=o*c,p+=h>>>16,h&=65535,h+=i*l,p+=h>>>16,h&=65535,h+=a*u,p+=h>>>16,h&=65535,p+=t*c+o*l+i*u+a*s,p&=65535,Re(g<<16|m,p<<16|h,this.unsigned)};X.mul=X.multiply;X.divide=function(e){if(_t(e)||(e=Lt(e)),e.isZero())throw Error("division by zero");if(kt){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?kt.div_u:kt.div_s)(this.low,this.high,e.low,e.high);return Re(n,kt.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Jn:qt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Jn;if(e.gt(this.shru(1)))return Zf;i=Jn}else{if(this.eq(xt)){if(e.eq(eo)||e.eq(Qs))return xt;if(e.eq(xt))return eo;var a=this.shr(1);return t=a.div(e).shl(1),t.eq(qt)?e.isNegative()?eo:Qs:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(xt))return this.unsigned?Jn:qt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=qt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var s=Math.ceil(Math.log(t)/Math.LN2),u=s<=48?1:Pi(2,s-48),l=Nt(t),c=l.mul(e);c.isNegative()||c.gt(o);)t-=u,l=Nt(t,this.unsigned),c=l.mul(e);l.isZero()&&(l=eo),i=i.add(l),o=o.sub(c)}return i};X.div=X.divide;X.modulo=function(e){if(_t(e)||(e=Lt(e)),kt){var n=(this.unsigned?kt.rem_u:kt.rem_s)(this.low,this.high,e.low,e.high);return Re(n,kt.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};X.mod=X.modulo;X.rem=X.modulo;X.not=function(){return Re(~this.low,~this.high,this.unsigned)};X.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};X.clz=X.countLeadingZeros;X.countTrailingZeros=function(){return this.low?Uf(this.low):Uf(this.high)+32};X.ctz=X.countTrailingZeros;X.and=function(e){return _t(e)||(e=Lt(e)),Re(this.low&e.low,this.high&e.high,this.unsigned)};X.or=function(e){return _t(e)||(e=Lt(e)),Re(this.low|e.low,this.high|e.high,this.unsigned)};X.xor=function(e){return _t(e)||(e=Lt(e)),Re(this.low^e.low,this.high^e.high,this.unsigned)};X.shiftLeft=function(e){return _t(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Re(0,this.low<<e-32,this.unsigned)};X.shl=X.shiftLeft;X.shiftRight=function(e){return _t(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Re(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};X.shr=X.shiftRight;X.shiftRightUnsigned=function(e){return _t(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Re(this.high,0,this.unsigned):Re(this.high>>>e-32,0,this.unsigned)};X.shru=X.shiftRightUnsigned;X.shr_u=X.shiftRightUnsigned;X.rotateLeft=function(e){var n;return _t(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Re(this.high,this.low,this.unsigned):e<32?(n=32-e,Re(this.low<<e|this.high>>>n,this.high<<e|this.low>>>n,this.unsigned)):(e-=32,n=32-e,Re(this.high<<e|this.low>>>n,this.low<<e|this.high>>>n,this.unsigned))};X.rotl=X.rotateLeft;X.rotateRight=function(e){var n;return _t(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Re(this.high,this.low,this.unsigned):e<32?(n=32-e,Re(this.high<<n|this.low>>>e,this.low<<n|this.high>>>e,this.unsigned)):(e-=32,n=32-e,Re(this.low<<n|this.high>>>e,this.high<<n|this.low>>>e,this.unsigned))};X.rotr=X.rotateRight;X.toSigned=function(){return this.unsigned?Re(this.low,this.high,!1):this};X.toUnsigned=function(){return this.unsigned?this:Re(this.low,this.high,!0)};X.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};X.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};X.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};He.fromBytes=function(e,n,t){return t?He.fromBytesLE(e,n):He.fromBytesBE(e,n)};He.fromBytesLE=function(e,n){return new He(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};He.fromBytesBE=function(e,n){return new He(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};typeof BigInt=="function"&&(He.fromBigInt=function(e,n){var t=Number(BigInt.asIntN(32,e)),o=Number(BigInt.asIntN(32,e>>BigInt(32)));return Re(t,o,n)},He.fromValue=function(e,n){return typeof e=="bigint"?He.fromBigInt(e,n):Lt(e,n)},X.toBigInt=function(){var e=BigInt(this.low>>>0),n=BigInt(this.unsigned?this.high>>>0:this.high);return n<<BigInt(32)|e});fr=He});var nu=oe(Ei=>{"use strict";Object.defineProperty(Ei,"__esModule",{value:!0});Ei.ArgType=void 0;var Qf;(function(r){r[r.INPUT=0]="INPUT",r[r.OUTPUT=1]="OUTPUT"})(Qf||(Ei.ArgType=Qf={}))});var Ci=oe(rn=>{"use strict";Object.defineProperty(rn,"__esModule",{value:!0});rn.SIZE_PREFIX_LENGTH=rn.FILE_IDENTIFIER_LENGTH=rn.SIZEOF_INT=rn.SIZEOF_SHORT=void 0;rn.SIZEOF_SHORT=2;rn.SIZEOF_INT=4;rn.FILE_IDENTIFIER_LENGTH=4;rn.SIZE_PREFIX_LENGTH=4});var ru=oe(Rt=>{"use strict";Object.defineProperty(Rt,"__esModule",{value:!0});Rt.isLittleEndian=Rt.float64=Rt.float32=Rt.int32=void 0;Rt.int32=new Int32Array(2);Rt.float32=new Float32Array(Rt.int32.buffer);Rt.float64=new Float64Array(Rt.int32.buffer);Rt.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var ou=oe(Di=>{"use strict";Object.defineProperty(Di,"__esModule",{value:!0});Di.Encoding=void 0;var eh;(function(r){r[r.UTF8_BYTES=1]="UTF8_BYTES",r[r.UTF16_STRING=2]="UTF16_STRING"})(eh||(Di.Encoding=eh={}))});var au=oe(ki=>{"use strict";Object.defineProperty(ki,"__esModule",{value:!0});ki.ByteBuffer=void 0;var on=Ci(),J2=ou(),Tt=ru(),iu=class r{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new r(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return Tt.int32[0]=this.readInt32(e),Tt.float32[0]}readFloat64(e){return Tt.int32[Tt.isLittleEndian?0:1]=this.readInt32(e),Tt.int32[Tt.isLittleEndian?1:0]=this.readInt32(e+4),Tt.float64[0]}writeInt8(e,n){this.bytes_[e]=n}writeUint8(e,n){this.bytes_[e]=n}writeInt16(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8}writeUint16(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8}writeInt32(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8,this.bytes_[e+2]=n>>16,this.bytes_[e+3]=n>>24}writeUint32(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8,this.bytes_[e+2]=n>>16,this.bytes_[e+3]=n>>24}writeInt64(e,n){this.writeInt32(e,Number(BigInt.asIntN(32,n))),this.writeInt32(e+4,Number(BigInt.asIntN(32,n>>BigInt(32))))}writeUint64(e,n){this.writeUint32(e,Number(BigInt.asUintN(32,n))),this.writeUint32(e+4,Number(BigInt.asUintN(32,n>>BigInt(32))))}writeFloat32(e,n){Tt.float32[0]=n,this.writeInt32(e,Tt.int32[0])}writeFloat64(e,n){Tt.float64[0]=n,this.writeInt32(e,Tt.int32[Tt.isLittleEndian?0:1]),this.writeInt32(e+4,Tt.int32[Tt.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+on.SIZEOF_INT+on.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let n=0;n<on.FILE_IDENTIFIER_LENGTH;n++)e+=String.fromCharCode(this.readInt8(this.position_+on.SIZEOF_INT+n));return e}__offset(e,n){let t=e-this.readInt32(e);return n<this.readInt16(t)?this.readInt16(t+n):0}__union(e,n){return e.bb_pos=n+this.readInt32(n),e.bb=this,e}__string(e,n){e+=this.readInt32(e);let t=this.readInt32(e);e+=on.SIZEOF_INT;let o=this.bytes_.subarray(e,e+t);return n===J2.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,n){return typeof e=="string"?this.__string(n):this.__union(e,n)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+on.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=on.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+on.FILE_IDENTIFIER_LENGTH);for(let n=0;n<on.FILE_IDENTIFIER_LENGTH;n++)if(e.charCodeAt(n)!=this.readInt8(this.position()+on.SIZEOF_INT+n))return!1;return!0}createScalarList(e,n){let t=[];for(let o=0;o<n;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,n){let t=[];for(let o=0;o<n;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}};ki.ByteBuffer=iu});var nh=oe(Ni=>{"use strict";Object.defineProperty(Ni,"__esModule",{value:!0});Ni.Builder=void 0;var th=au(),Ot=Ci(),su=class r{constructor(e){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let n;e?n=e:n=1024,this.bb=th.ByteBuffer.allocate(n),this.space=n}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(e,n){e>this.minalign&&(this.minalign=e);let t=~(this.bb.capacity()-this.space+n)+1&e-1;for(;this.space<t+e+n;){let o=this.bb.capacity();this.bb=r.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(t)}pad(e){for(let n=0;n<e;n++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,n,t){(this.force_defaults||n!=t)&&(this.addInt8(n),this.slot(e))}addFieldInt16(e,n,t){(this.force_defaults||n!=t)&&(this.addInt16(n),this.slot(e))}addFieldInt32(e,n,t){(this.force_defaults||n!=t)&&(this.addInt32(n),this.slot(e))}addFieldInt64(e,n,t){(this.force_defaults||n!==t)&&(this.addInt64(n),this.slot(e))}addFieldFloat32(e,n,t){(this.force_defaults||n!=t)&&(this.addFloat32(n),this.slot(e))}addFieldFloat64(e,n,t){(this.force_defaults||n!=t)&&(this.addFloat64(n),this.slot(e))}addFieldOffset(e,n,t){(this.force_defaults||n!=t)&&(this.addOffset(n),this.slot(e))}addFieldStruct(e,n,t){n!=t&&(this.nested(n),this.slot(e))}nested(e){if(e!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){this.vtable!==null&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let n=e.capacity();if(n&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let t=n<<1,o=th.ByteBuffer.allocate(t);return o.setPosition(t-n),o.bytes().set(e.bytes(),t-n),o}addOffset(e){this.prep(Ot.SIZEOF_INT,0),this.writeInt32(this.offset()-e+Ot.SIZEOF_INT)}startObject(e){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=e;for(let n=0;n<e;n++)this.vtable[n]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),n=this.vtable_in_use-1;for(;n>=0&&this.vtable[n]==0;n--);let t=n+1;for(;n>=0;n--)this.addInt16(this.vtable[n]!=0?e-this.vtable[n]:0);let o=2;this.addInt16(e-this.object_start);let i=(t+o)*Ot.SIZEOF_SHORT;this.addInt16(i);let a=0,s=this.space;e:for(n=0;n<this.vtables.length;n++){let u=this.bb.capacity()-this.vtables[n];if(i==this.bb.readInt16(u)){for(let l=Ot.SIZEOF_SHORT;l<i;l+=Ot.SIZEOF_SHORT)if(this.bb.readInt16(s+l)!=this.bb.readInt16(u+l))continue e;a=this.vtables[n];break}}return a?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,a-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,n,t){let o=t?Ot.SIZE_PREFIX_LENGTH:0;if(n){let i=n;if(this.prep(this.minalign,Ot.SIZEOF_INT+Ot.FILE_IDENTIFIER_LENGTH+o),i.length!=Ot.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+Ot.FILE_IDENTIFIER_LENGTH);for(let a=Ot.FILE_IDENTIFIER_LENGTH-1;a>=0;a--)this.writeInt8(i.charCodeAt(a))}this.prep(this.minalign,Ot.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,n){this.finish(e,n,!0)}requiredField(e,n){let t=this.bb.capacity()-e,o=t-this.bb.readInt32(t);if(!(n<this.bb.readInt16(o)&&this.bb.readInt16(o+n)!=0))throw new TypeError("FlatBuffers: field "+n+" must be set")}startVector(e,n,t){this.notNested(),this.vector_num_elems=n,this.prep(Ot.SIZEOF_INT,e*n),this.prep(t,e*n)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let n=this.createString(e);return this.string_maps.set(e,n),n}createString(e){if(e==null)return 0;let n;return e instanceof Uint8Array?n=e:n=this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,n.length,1),this.bb.setPosition(this.space-=n.length),this.bb.bytes().set(n,this.space),this.endVector()}createByteVector(e){return e==null?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return e===null?0:typeof e=="string"?this.createString(e):e.pack(this)}createObjectOffsetList(e){let n=[];for(let t=0;t<e.length;++t){let o=e[t];if(o!==null)n.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return n}createStructOffsetList(e,n){return n(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}};Ni.Builder=su});var Be=oe(Ze=>{"use strict";Object.defineProperty(Ze,"__esModule",{value:!0});Ze.Encoding=Ze.ByteBuffer=Ze.Builder=Ze.isLittleEndian=Ze.int32=Ze.float64=Ze.float32=Ze.SIZE_PREFIX_LENGTH=Ze.SIZEOF_SHORT=Ze.SIZEOF_INT=Ze.FILE_IDENTIFIER_LENGTH=void 0;var Li=Ci();Object.defineProperty(Ze,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return Li.FILE_IDENTIFIER_LENGTH}});Object.defineProperty(Ze,"SIZEOF_INT",{enumerable:!0,get:function(){return Li.SIZEOF_INT}});Object.defineProperty(Ze,"SIZEOF_SHORT",{enumerable:!0,get:function(){return Li.SIZEOF_SHORT}});Object.defineProperty(Ze,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return Li.SIZE_PREFIX_LENGTH}});var Ri=ru();Object.defineProperty(Ze,"float32",{enumerable:!0,get:function(){return Ri.float32}});Object.defineProperty(Ze,"float64",{enumerable:!0,get:function(){return Ri.float64}});Object.defineProperty(Ze,"int32",{enumerable:!0,get:function(){return Ri.int32}});Object.defineProperty(Ze,"isLittleEndian",{enumerable:!0,get:function(){return Ri.isLittleEndian}});var Y2=nh();Object.defineProperty(Ze,"Builder",{enumerable:!0,get:function(){return Y2.Builder}});var Q2=au();Object.defineProperty(Ze,"ByteBuffer",{enumerable:!0,get:function(){return Q2.ByteBuffer}});var eI=ou();Object.defineProperty(Ze,"Encoding",{enumerable:!0,get:function(){return eI.Encoding}})});var lu=oe(an=>{"use strict";var tI=an&&an.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),nI=an&&an.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),rI=an&&an.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&tI(n,e,t[o]);return nI(n,e),n}})();Object.defineProperty(an,"__esModule",{value:!0});an.ArgTypeAndIndex=void 0;var oI=rI(Be()),rh=nu(),uu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsArgTypeAndIndex(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,n){return e.setPosition(e.position()+oI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):rh.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,n){e.addFieldInt8(0,n,rh.ArgType.INPUT)}static addIndex(e,n){e.addFieldInt32(1,n,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,n,t){return r.startArgTypeAndIndex(e),r.addArgType(e,n),r.addIndex(e,t),r.endArgTypeAndIndex(e)}};an.ArgTypeAndIndex=uu});var cu=oe(zi=>{"use strict";Object.defineProperty(zi,"__esModule",{value:!0});zi.AttributeType=void 0;var oh;(function(r){r[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.INT=2]="INT",r[r.STRING=3]="STRING",r[r.TENSOR=4]="TENSOR",r[r.GRAPH=5]="GRAPH",r[r.FLOATS=6]="FLOATS",r[r.INTS=7]="INTS",r[r.STRINGS=8]="STRINGS",r[r.TENSORS=9]="TENSORS",r[r.GRAPHS=10]="GRAPHS",r[r.SPARSE_TENSOR=11]="SPARSE_TENSOR",r[r.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(oh||(zi.AttributeType=oh={}))});var du=oe(Mi=>{"use strict";Object.defineProperty(Mi,"__esModule",{value:!0});Mi.NodeType=void 0;var ih;(function(r){r[r.Primitive=0]="Primitive",r[r.Fused=1]="Fused"})(ih||(Mi.NodeType=ih={}))});var fu=oe(sn=>{"use strict";var iI=sn&&sn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),aI=sn&&sn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),sI=sn&&sn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&iI(n,e,t[o]);return aI(n,e),n}})();Object.defineProperty(sn,"__esModule",{value:!0});sn.Node=void 0;var uI=sI(Be()),lI=hu(),ah=du(),pu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNode(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,n){return e.setPosition(e.position()+uI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}domain(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb_pos+n,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):ah.NodeType.Primitive}executionProviderType(e){let n=this.bb.__offset(this.bb_pos,18);return n?this.bb.__string(this.bb_pos+n,e):null}inputs(e,n){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,n){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,n){let t=this.bb.__offset(this.bb_pos,24);return t?(n||new lI.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let n=this.bb.__offset(this.bb_pos,26);return n?this.bb.readInt32(this.bb.__vector(this.bb_pos+n)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,n){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addDomain(e,n){e.addFieldOffset(2,n,0)}static addSinceVersion(e,n){e.addFieldInt32(3,n,0)}static addIndex(e,n){e.addFieldInt32(4,n,0)}static addOpType(e,n){e.addFieldOffset(5,n,0)}static addType(e,n){e.addFieldInt32(6,n,ah.NodeType.Primitive)}static addExecutionProviderType(e,n){e.addFieldOffset(7,n,0)}static addInputs(e,n){e.addFieldOffset(8,n,0)}static createInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInputsVector(e,n){e.startVector(4,n,4)}static addOutputs(e,n){e.addFieldOffset(9,n,0)}static createOutputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOutputsVector(e,n){e.startVector(4,n,4)}static addAttributes(e,n){e.addFieldOffset(10,n,0)}static createAttributesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startAttributesVector(e,n){e.startVector(4,n,4)}static addInputArgCounts(e,n){e.addFieldOffset(11,n,0)}static createInputArgCountsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startInputArgCountsVector(e,n){e.startVector(4,n,4)}static addImplicitInputs(e,n){e.addFieldOffset(12,n,0)}static createImplicitInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startImplicitInputsVector(e,n){e.startVector(4,n,4)}static endNode(e){return e.endObject()}static createNode(e,n,t,o,i,a,s,u,l,c,p,h,g,m){return r.startNode(e),r.addName(e,n),r.addDocString(e,t),r.addDomain(e,o),r.addSinceVersion(e,i),r.addIndex(e,a),r.addOpType(e,s),r.addType(e,u),r.addExecutionProviderType(e,l),r.addInputs(e,c),r.addOutputs(e,p),r.addAttributes(e,h),r.addInputArgCounts(e,g),r.addImplicitInputs(e,m),r.endNode(e)}};sn.Node=pu});var gu=oe(Bi=>{"use strict";Object.defineProperty(Bi,"__esModule",{value:!0});Bi.EdgeEnd=void 0;var mu=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,n,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(n),e.offset()}};Bi.EdgeEnd=mu});var yu=oe(un=>{"use strict";var cI=un&&un.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),dI=un&&un.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),pI=un&&un.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&cI(n,e,t[o]);return dI(n,e),n}})();Object.defineProperty(un,"__esModule",{value:!0});un.NodeEdge=void 0;var fI=pI(Be()),sh=gu(),bu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNodeEdge(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,n){return e.setPosition(e.position()+fI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new sh.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,n){let t=this.bb.__offset(this.bb_pos,8);return t?(n||new sh.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,n){e.addFieldInt32(0,n,0)}static addInputEdges(e,n){e.addFieldOffset(1,n,0)}static startInputEdgesVector(e,n){e.startVector(12,n,4)}static addOutputEdges(e,n){e.addFieldOffset(2,n,0)}static startOutputEdgesVector(e,n){e.startVector(12,n,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,n,t,o){return r.startNodeEdge(e),r.addNodeIndex(e,n),r.addInputEdges(e,t),r.addOutputEdges(e,o),r.endNodeEdge(e)}};un.NodeEdge=bu});var vu=oe(ln=>{"use strict";var hI=ln&&ln.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),mI=ln&&ln.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),gI=ln&&ln.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&hI(n,e,t[o]);return mI(n,e),n}})();Object.defineProperty(ln,"__esModule",{value:!0});ln.NodesToOptimizeIndices=void 0;var bI=gI(Be()),_u=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNodesToOptimizeIndices(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,n){return e.setPosition(e.position()+bI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,n){e.addFieldOffset(0,n,0)}static createNodeIndicesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startNodeIndicesVector(e,n){e.startVector(4,n,4)}static addNumInputs(e,n){e.addFieldInt32(1,n,0)}static addNumOutputs(e,n){e.addFieldInt32(2,n,0)}static addHasVariadicInput(e,n){e.addFieldInt8(3,+n,0)}static addHasVariadicOutput(e,n){e.addFieldInt8(4,+n,0)}static addNumVariadicInputs(e,n){e.addFieldInt32(5,n,0)}static addNumVariadicOutputs(e,n){e.addFieldInt32(6,n,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,n,t,o,i,a,s,u){return r.startNodesToOptimizeIndices(e),r.addNodeIndices(e,n),r.addNumInputs(e,t),r.addNumOutputs(e,o),r.addHasVariadicInput(e,i),r.addHasVariadicOutput(e,a),r.addNumVariadicInputs(e,s),r.addNumVariadicOutputs(e,u),r.endNodesToOptimizeIndices(e)}};ln.NodesToOptimizeIndices=_u});var xu=oe(cn=>{"use strict";var yI=cn&&cn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),_I=cn&&cn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),vI=cn&&cn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&yI(n,e,t[o]);return _I(n,e),n}})();Object.defineProperty(cn,"__esModule",{value:!0});cn.RuntimeOptimizationRecord=void 0;var wI=vI(Be()),xI=vu(),wu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizationRecord(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,n){return e.setPosition(e.position()+wI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}nodesToOptimizeIndices(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new xI.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}producedOpIds(e,n){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,n){e.addFieldOffset(0,n,0)}static addNodesToOptimizeIndices(e,n){e.addFieldOffset(1,n,0)}static addProducedOpIds(e,n){e.addFieldOffset(3,n,0)}static createProducedOpIdsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startProducedOpIdsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}};cn.RuntimeOptimizationRecord=wu});var Iu=oe(dn=>{"use strict";var TI=dn&&dn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),II=dn&&dn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),SI=dn&&dn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&TI(n,e,t[o]);return II(n,e),n}})();Object.defineProperty(dn,"__esModule",{value:!0});dn.RuntimeOptimizationRecordContainerEntry=void 0;var $I=SI(Be()),AI=xu(),Tu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,n){return e.setPosition(e.position()+$I.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}runtimeOptimizationRecords(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new AI.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,n){e.addFieldOffset(0,n,0)}static addRuntimeOptimizationRecords(e,n){e.addFieldOffset(1,n,0)}static createRuntimeOptimizationRecordsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizationRecordContainerEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createRuntimeOptimizationRecordContainerEntry(e,n,t){return r.startRuntimeOptimizationRecordContainerEntry(e),r.addOptimizerName(e,n),r.addRuntimeOptimizationRecords(e,t),r.endRuntimeOptimizationRecordContainerEntry(e)}};dn.RuntimeOptimizationRecordContainerEntry=Tu});var $u=oe(pn=>{"use strict";var OI=pn&&pn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),PI=pn&&pn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),EI=pn&&pn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&OI(n,e,t[o]);return PI(n,e),n}})();Object.defineProperty(pn,"__esModule",{value:!0});pn.RuntimeOptimizations=void 0;var CI=EI(Be()),DI=Iu(),Su=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizations(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,n){return e.setPosition(e.position()+CI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}records(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new DI.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,n){e.addFieldOffset(0,n,0)}static createRecordsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startRecordsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,n){return r.startRuntimeOptimizations(e),r.addRecords(e,n),r.endRuntimeOptimizations(e)}};pn.RuntimeOptimizations=Su});var Co=oe(Vi=>{"use strict";Object.defineProperty(Vi,"__esModule",{value:!0});Vi.TensorDataType=void 0;var uh;(function(r){r[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.UINT8=2]="UINT8",r[r.INT8=3]="INT8",r[r.UINT16=4]="UINT16",r[r.INT16=5]="INT16",r[r.INT32=6]="INT32",r[r.INT64=7]="INT64",r[r.STRING=8]="STRING",r[r.BOOL=9]="BOOL",r[r.FLOAT16=10]="FLOAT16",r[r.DOUBLE=11]="DOUBLE",r[r.UINT32=12]="UINT32",r[r.UINT64=13]="UINT64",r[r.COMPLEX64=14]="COMPLEX64",r[r.COMPLEX128=15]="COMPLEX128",r[r.BFLOAT16=16]="BFLOAT16",r[r.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",r[r.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",r[r.FLOAT8E5M2=19]="FLOAT8E5M2",r[r.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(uh||(Vi.TensorDataType=uh={}))});var Do=oe(fn=>{"use strict";var kI=fn&&fn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),NI=fn&&fn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),LI=fn&&fn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&kI(n,e,t[o]);return NI(n,e),n}})();Object.defineProperty(fn,"__esModule",{value:!0});fn.Tensor=void 0;var RI=LI(Be()),lh=Co(),Au=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTensor(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,n){return e.setPosition(e.position()+RI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}dims(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):lh.TensorDataType.UNDEFINED}rawData(e){let n=this.bb.__offset(this.bb_pos,12);return n?this.bb.readUint8(this.bb.__vector(this.bb_pos+n)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,n){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addDims(e,n){e.addFieldOffset(2,n,0)}static createDimsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startDimsVector(e,n){e.startVector(8,n,8)}static addDataType(e,n){e.addFieldInt32(3,n,lh.TensorDataType.UNDEFINED)}static addRawData(e,n){e.addFieldOffset(4,n,0)}static createRawDataVector(e,n){e.startVector(1,n.length,1);for(let t=n.length-1;t>=0;t--)e.addInt8(n[t]);return e.endVector()}static startRawDataVector(e,n){e.startVector(1,n,1)}static addStringData(e,n){e.addFieldOffset(5,n,0)}static createStringDataVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startStringDataVector(e,n){e.startVector(4,n,4)}static addExternalDataOffset(e,n){e.addFieldInt64(6,n,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,n,t,o,i,a,s,u){return r.startTensor(e),r.addName(e,n),r.addDocString(e,t),r.addDims(e,o),r.addDataType(e,i),r.addRawData(e,a),r.addStringData(e,s),r.addExternalDataOffset(e,u),r.endTensor(e)}};fn.Tensor=Au});var Pu=oe(hn=>{"use strict";var zI=hn&&hn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),MI=hn&&hn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),BI=hn&&hn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&zI(n,e,t[o]);return MI(n,e),n}})();Object.defineProperty(hn,"__esModule",{value:!0});hn.SparseTensor=void 0;var VI=BI(Be()),ch=Do(),Ou=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsSparseTensor(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,n){return e.setPosition(e.position()+VI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}values(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new ch.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}indices(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new ch.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}dims(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,n){e.addFieldOffset(0,n,0)}static addIndices(e,n){e.addFieldOffset(1,n,0)}static addDims(e,n){e.addFieldOffset(2,n,0)}static createDimsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startDimsVector(e,n){e.startVector(8,n,8)}static endSparseTensor(e){return e.endObject()}};hn.SparseTensor=Ou});var Cu=oe(mn=>{"use strict";var FI=mn&&mn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),GI=mn&&mn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),UI=mn&&mn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&FI(n,e,t[o]);return GI(n,e),n}})();Object.defineProperty(mn,"__esModule",{value:!0});mn.MapType=void 0;var WI=UI(Be()),dh=Co(),HI=ko(),Eu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsMapType(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsMapType(e,n){return e.setPosition(e.position()+WI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):dh.TensorDataType.UNDEFINED}valueType(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new HI.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,n){e.addFieldInt32(0,n,dh.TensorDataType.UNDEFINED)}static addValueType(e,n){e.addFieldOffset(1,n,0)}static endMapType(e){return e.endObject()}};mn.MapType=Eu});var ku=oe(gn=>{"use strict";var qI=gn&&gn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),jI=gn&&gn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),KI=gn&&gn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&qI(n,e,t[o]);return jI(n,e),n}})();Object.defineProperty(gn,"__esModule",{value:!0});gn.SequenceType=void 0;var XI=KI(Be()),ZI=ko(),Du=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsSequenceType(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSequenceType(e,n){return e.setPosition(e.position()+XI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}elemType(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new ZI.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,n){e.addFieldOffset(0,n,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(e,n){return r.startSequenceType(e),r.addElemType(e,n),r.endSequenceType(e)}};gn.SequenceType=Du});var Nu=oe(Fi=>{"use strict";Object.defineProperty(Fi,"__esModule",{value:!0});Fi.DimensionValueType=void 0;var ph;(function(r){r[r.UNKNOWN=0]="UNKNOWN",r[r.VALUE=1]="VALUE",r[r.PARAM=2]="PARAM"})(ph||(Fi.DimensionValueType=ph={}))});var Ru=oe(bn=>{"use strict";var JI=bn&&bn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),YI=bn&&bn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),QI=bn&&bn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&JI(n,e,t[o]);return YI(n,e),n}})();Object.defineProperty(bn,"__esModule",{value:!0});bn.DimensionValue=void 0;var eS=QI(Be()),fh=Nu(),Lu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDimensionValue(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,n){return e.setPosition(e.position()+eS.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):fh.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,n){e.addFieldInt8(0,n,fh.DimensionValueType.UNKNOWN)}static addDimValue(e,n){e.addFieldInt64(1,n,BigInt("0"))}static addDimParam(e,n){e.addFieldOffset(2,n,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,n,t,o){return r.startDimensionValue(e),r.addDimType(e,n),r.addDimValue(e,t),r.addDimParam(e,o),r.endDimensionValue(e)}};bn.DimensionValue=Lu});var Mu=oe(yn=>{"use strict";var tS=yn&&yn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),nS=yn&&yn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),rS=yn&&yn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&tS(n,e,t[o]);return nS(n,e),n}})();Object.defineProperty(yn,"__esModule",{value:!0});yn.Dimension=void 0;var oS=rS(Be()),iS=Ru(),zu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDimension(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,n){return e.setPosition(e.position()+oS.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}value(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new iS.DimensionValue).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}denotation(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}static startDimension(e){e.startObject(2)}static addValue(e,n){e.addFieldOffset(0,n,0)}static addDenotation(e,n){e.addFieldOffset(1,n,0)}static endDimension(e){return e.endObject()}static createDimension(e,n,t){return r.startDimension(e),r.addValue(e,n),r.addDenotation(e,t),r.endDimension(e)}};yn.Dimension=zu});var Vu=oe(_n=>{"use strict";var aS=_n&&_n.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),sS=_n&&_n.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),uS=_n&&_n.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&aS(n,e,t[o]);return sS(n,e),n}})();Object.defineProperty(_n,"__esModule",{value:!0});_n.Shape=void 0;var lS=uS(Be()),cS=Mu(),Bu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsShape(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,n){return e.setPosition(e.position()+lS.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}dim(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new cS.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,n){e.addFieldOffset(0,n,0)}static createDimVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startDimVector(e,n){e.startVector(4,n,4)}static endShape(e){return e.endObject()}static createShape(e,n){return r.startShape(e),r.addDim(e,n),r.endShape(e)}};_n.Shape=Bu});var Gu=oe(vn=>{"use strict";var dS=vn&&vn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),pS=vn&&vn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),fS=vn&&vn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&dS(n,e,t[o]);return pS(n,e),n}})();Object.defineProperty(vn,"__esModule",{value:!0});vn.TensorTypeAndShape=void 0;var hS=fS(Be()),mS=Vu(),hh=Co(),Fu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTensorTypeAndShape(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,n){return e.setPosition(e.position()+hS.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):hh.TensorDataType.UNDEFINED}shape(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new mS.Shape).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,n){e.addFieldInt32(0,n,hh.TensorDataType.UNDEFINED)}static addShape(e,n){e.addFieldOffset(1,n,0)}static endTensorTypeAndShape(e){return e.endObject()}};vn.TensorTypeAndShape=Fu});var Uu=oe(no=>{"use strict";Object.defineProperty(no,"__esModule",{value:!0});no.TypeInfoValue=void 0;no.unionToTypeInfoValue=gS;no.unionListToTypeInfoValue=bS;var mh=Cu(),gh=ku(),bh=Gu(),Gi;(function(r){r[r.NONE=0]="NONE",r[r.tensor_type=1]="tensor_type",r[r.sequence_type=2]="sequence_type",r[r.map_type=3]="map_type"})(Gi||(no.TypeInfoValue=Gi={}));function gS(r,e){switch(Gi[r]){case"NONE":return null;case"tensor_type":return e(new bh.TensorTypeAndShape);case"sequence_type":return e(new gh.SequenceType);case"map_type":return e(new mh.MapType);default:return null}}function bS(r,e,n){switch(Gi[r]){case"NONE":return null;case"tensor_type":return e(n,new bh.TensorTypeAndShape);case"sequence_type":return e(n,new gh.SequenceType);case"map_type":return e(n,new mh.MapType);default:return null}}});var ko=oe(wn=>{"use strict";var yS=wn&&wn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),_S=wn&&wn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),vS=wn&&wn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&yS(n,e,t[o]);return _S(n,e),n}})();Object.defineProperty(wn,"__esModule",{value:!0});wn.TypeInfo=void 0;var wS=vS(Be()),yh=Uu(),Wu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTypeInfo(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,n){return e.setPosition(e.position()+wS.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):yh.TypeInfoValue.NONE}value(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__union(e,this.bb_pos+n):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,n){e.addFieldOffset(0,n,0)}static addValueType(e,n){e.addFieldInt8(1,n,yh.TypeInfoValue.NONE)}static addValue(e,n){e.addFieldOffset(2,n,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,n,t,o){return r.startTypeInfo(e),r.addDenotation(e,n),r.addValueType(e,t),r.addValue(e,o),r.endTypeInfo(e)}};wn.TypeInfo=Wu});var qu=oe(xn=>{"use strict";var xS=xn&&xn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),TS=xn&&xn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),IS=xn&&xn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&xS(n,e,t[o]);return TS(n,e),n}})();Object.defineProperty(xn,"__esModule",{value:!0});xn.ValueInfo=void 0;var SS=IS(Be()),$S=ko(),Hu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsValueInfo(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,n){return e.setPosition(e.position()+SS.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}type(e){let n=this.bb.__offset(this.bb_pos,8);return n?(e||new $S.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addType(e,n){e.addFieldOffset(2,n,0)}static endValueInfo(e){return e.endObject()}};xn.ValueInfo=Hu});var Ui=oe(Tn=>{"use strict";var AS=Tn&&Tn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),OS=Tn&&Tn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),PS=Tn&&Tn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&AS(n,e,t[o]);return OS(n,e),n}})();Object.defineProperty(Tn,"__esModule",{value:!0});Tn.Graph=void 0;var ES=PS(Be()),CS=fu(),DS=yu(),kS=$u(),NS=Pu(),LS=Do(),RS=qu(),ju=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsGraph(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,n){return e.setPosition(e.position()+ES.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new LS.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new RS.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,n){let t=this.bb.__offset(this.bb_pos,8);return t?(n||new CS.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,n){let t=this.bb.__offset(this.bb_pos,12);return t?(n||new DS.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,n){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,n){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,n){let t=this.bb.__offset(this.bb_pos,18);return t?(n||new NS.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let n=this.bb.__offset(this.bb_pos,20);return n?(e||new kS.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,n){e.addFieldOffset(0,n,0)}static createInitializersVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInitializersVector(e,n){e.startVector(4,n,4)}static addNodeArgs(e,n){e.addFieldOffset(1,n,0)}static createNodeArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodeArgsVector(e,n){e.startVector(4,n,4)}static addNodes(e,n){e.addFieldOffset(2,n,0)}static createNodesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodesVector(e,n){e.startVector(4,n,4)}static addMaxNodeIndex(e,n){e.addFieldInt32(3,n,0)}static addNodeEdges(e,n){e.addFieldOffset(4,n,0)}static createNodeEdgesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodeEdgesVector(e,n){e.startVector(4,n,4)}static addInputs(e,n){e.addFieldOffset(5,n,0)}static createInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInputsVector(e,n){e.startVector(4,n,4)}static addOutputs(e,n){e.addFieldOffset(6,n,0)}static createOutputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOutputsVector(e,n){e.startVector(4,n,4)}static addSparseInitializers(e,n){e.addFieldOffset(7,n,0)}static createSparseInitializersVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startSparseInitializersVector(e,n){e.startVector(4,n,4)}static addRuntimeOptimizations(e,n){e.addFieldOffset(8,n,0)}static endGraph(e){return e.endObject()}};Tn.Graph=ju});var hu=oe(In=>{"use strict";var zS=In&&In.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),MS=In&&In.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),BS=In&&In.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&zS(n,e,t[o]);return MS(n,e),n}})();Object.defineProperty(In,"__esModule",{value:!0});In.Attribute=void 0;var VS=BS(Be()),_h=cu(),vh=Ui(),wh=Do(),Ku=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsAttribute(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,n){return e.setPosition(e.position()+VS.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):_h.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb_pos+n,e):null}t(e){let n=this.bb.__offset(this.bb_pos,16);return n?(e||new wh.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}g(e){let n=this.bb.__offset(this.bb_pos,18);return n?(e||new vh.Graph).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}floats(e){let n=this.bb.__offset(this.bb_pos,20);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let n=this.bb.__offset(this.bb_pos,22);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,n){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,n){let t=this.bb.__offset(this.bb_pos,26);return t?(n||new wh.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,n){let t=this.bb.__offset(this.bb_pos,28);return t?(n||new vh.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addType(e,n){e.addFieldInt32(2,n,_h.AttributeType.UNDEFINED)}static addF(e,n){e.addFieldFloat32(3,n,0)}static addI(e,n){e.addFieldInt64(4,n,BigInt("0"))}static addS(e,n){e.addFieldOffset(5,n,0)}static addT(e,n){e.addFieldOffset(6,n,0)}static addG(e,n){e.addFieldOffset(7,n,0)}static addFloats(e,n){e.addFieldOffset(8,n,0)}static createFloatsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addFloat32(n[t]);return e.endVector()}static startFloatsVector(e,n){e.startVector(4,n,4)}static addInts(e,n){e.addFieldOffset(9,n,0)}static createIntsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startIntsVector(e,n){e.startVector(8,n,8)}static addStrings(e,n){e.addFieldOffset(10,n,0)}static createStringsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startStringsVector(e,n){e.startVector(4,n,4)}static addTensors(e,n){e.addFieldOffset(11,n,0)}static createTensorsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startTensorsVector(e,n){e.startVector(4,n,4)}static addGraphs(e,n){e.addFieldOffset(12,n,0)}static createGraphsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startGraphsVector(e,n){e.startVector(4,n,4)}static endAttribute(e){return e.endObject()}};In.Attribute=Ku});var Zu=oe(Sn=>{"use strict";var FS=Sn&&Sn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),GS=Sn&&Sn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),US=Sn&&Sn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&FS(n,e,t[o]);return GS(n,e),n}})();Object.defineProperty(Sn,"__esModule",{value:!0});Sn.DeprecatedKernelCreateInfos=void 0;var WS=US(Be()),Xu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedKernelCreateInfos(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(e,n){return e.setPosition(e.position()+WS.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.readUint64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,n){e.addFieldOffset(0,n,0)}static createNodeIndicesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startNodeIndicesVector(e,n){e.startVector(4,n,4)}static addKernelDefHashes(e,n){e.addFieldOffset(1,n,0)}static createKernelDefHashesVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startKernelDefHashesVector(e,n){e.startVector(8,n,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(e,n,t){return r.startDeprecatedKernelCreateInfos(e),r.addNodeIndices(e,n),r.addKernelDefHashes(e,t),r.endDeprecatedKernelCreateInfos(e)}};Sn.DeprecatedKernelCreateInfos=Xu});var xh=oe($n=>{"use strict";var HS=$n&&$n.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),qS=$n&&$n.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),jS=$n&&$n.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&HS(n,e,t[o]);return qS(n,e),n}})();Object.defineProperty($n,"__esModule",{value:!0});$n.DeprecatedNodeIndexAndKernelDefHash=void 0;var KS=jS(Be()),Ju=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(e,n){return e.setPosition(e.position()+KS.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,n){e.addFieldInt32(0,n,0)}static addKernelDefHash(e,n){e.addFieldInt64(1,n,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(e,n,t){return r.startDeprecatedNodeIndexAndKernelDefHash(e),r.addNodeIndex(e,n),r.addKernelDefHash(e,t),r.endDeprecatedNodeIndexAndKernelDefHash(e)}};$n.DeprecatedNodeIndexAndKernelDefHash=Ju});var Qu=oe(An=>{"use strict";var XS=An&&An.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),ZS=An&&An.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),JS=An&&An.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&XS(n,e,t[o]);return ZS(n,e),n}})();Object.defineProperty(An,"__esModule",{value:!0});An.DeprecatedSubGraphSessionState=void 0;var YS=JS(Be()),QS=el(),Yu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedSubGraphSessionState(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(e,n){return e.setPosition(e.position()+YS.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}graphId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}sessionState(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new QS.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,n){e.addFieldOffset(0,n,0)}static addSessionState(e,n){e.addFieldOffset(1,n,0)}static endDeprecatedSubGraphSessionState(e){let n=e.endObject();return e.requiredField(n,4),n}};An.DeprecatedSubGraphSessionState=Yu});var el=oe(On=>{"use strict";var e$=On&&On.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),t$=On&&On.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),n$=On&&On.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&e$(n,e,t[o]);return t$(n,e),n}})();Object.defineProperty(On,"__esModule",{value:!0});On.DeprecatedSessionState=void 0;var r$=n$(Be()),o$=Zu(),i$=Qu(),tl=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedSessionState(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSessionState(e,n){return e.setPosition(e.position()+r$.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}kernels(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new o$.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}subGraphSessionStates(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new i$.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,n){e.addFieldOffset(0,n,0)}static addSubGraphSessionStates(e,n){e.addFieldOffset(1,n,0)}static createSubGraphSessionStatesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startSubGraphSessionStatesVector(e,n){e.startVector(4,n,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(e,n,t){return r.startDeprecatedSessionState(e),r.addKernels(e,n),r.addSubGraphSessionStates(e,t),r.endDeprecatedSessionState(e)}};On.DeprecatedSessionState=tl});var rl=oe(Pn=>{"use strict";var a$=Pn&&Pn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),s$=Pn&&Pn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),u$=Pn&&Pn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&a$(n,e,t[o]);return s$(n,e),n}})();Object.defineProperty(Pn,"__esModule",{value:!0});Pn.KernelTypeStrArgsEntry=void 0;var l$=u$(Be()),c$=lu(),nl=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsKernelTypeStrArgsEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,n){return e.setPosition(e.position()+l$.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}args(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new c$.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,n){e.addFieldOffset(0,n,0)}static addArgs(e,n){e.addFieldOffset(1,n,0)}static createArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startArgsVector(e,n){e.startVector(4,n,4)}static endKernelTypeStrArgsEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createKernelTypeStrArgsEntry(e,n,t){return r.startKernelTypeStrArgsEntry(e),r.addKernelTypeStr(e,n),r.addArgs(e,t),r.endKernelTypeStrArgsEntry(e)}};Pn.KernelTypeStrArgsEntry=nl});var il=oe(En=>{"use strict";var d$=En&&En.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),p$=En&&En.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),f$=En&&En.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&d$(n,e,t[o]);return p$(n,e),n}})();Object.defineProperty(En,"__esModule",{value:!0});En.OpIdKernelTypeStrArgsEntry=void 0;var h$=f$(Be()),m$=rl(),ol=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,n){return e.setPosition(e.position()+h$.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}kernelTypeStrArgs(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new m$.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,n){e.addFieldOffset(0,n,0)}static addKernelTypeStrArgs(e,n){e.addFieldOffset(1,n,0)}static createKernelTypeStrArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,n){e.startVector(4,n,4)}static endOpIdKernelTypeStrArgsEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createOpIdKernelTypeStrArgsEntry(e,n,t){return r.startOpIdKernelTypeStrArgsEntry(e),r.addOpId(e,n),r.addKernelTypeStrArgs(e,t),r.endOpIdKernelTypeStrArgsEntry(e)}};En.OpIdKernelTypeStrArgsEntry=ol});var sl=oe(Cn=>{"use strict";var g$=Cn&&Cn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),b$=Cn&&Cn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),y$=Cn&&Cn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&g$(n,e,t[o]);return b$(n,e),n}})();Object.defineProperty(Cn,"__esModule",{value:!0});Cn.KernelTypeStrResolver=void 0;var _$=y$(Be()),v$=il(),al=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsKernelTypeStrResolver(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,n){return e.setPosition(e.position()+_$.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new v$.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,n){e.addFieldOffset(0,n,0)}static createOpKernelTypeStrArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,n){e.startVector(4,n,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,n){return r.startKernelTypeStrResolver(e),r.addOpKernelTypeStrArgs(e,n),r.endKernelTypeStrResolver(e)}};Cn.KernelTypeStrResolver=al});var ll=oe(Dn=>{"use strict";var w$=Dn&&Dn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),x$=Dn&&Dn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),T$=Dn&&Dn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&w$(n,e,t[o]);return x$(n,e),n}})();Object.defineProperty(Dn,"__esModule",{value:!0});Dn.OperatorSetId=void 0;var I$=T$(Be()),ul=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsOperatorSetId(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,n){return e.setPosition(e.position()+I$.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,n){e.addFieldOffset(0,n,0)}static addVersion(e,n){e.addFieldInt64(1,n,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,n,t){return r.startOperatorSetId(e),r.addDomain(e,n),r.addVersion(e,t),r.endOperatorSetId(e)}};Dn.OperatorSetId=ul});var dl=oe(kn=>{"use strict";var S$=kn&&kn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),$$=kn&&kn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),A$=kn&&kn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&S$(n,e,t[o]);return $$(n,e),n}})();Object.defineProperty(kn,"__esModule",{value:!0});kn.StringStringEntry=void 0;var O$=A$(Be()),cl=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsStringStringEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,n){return e.setPosition(e.position()+O$.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}key(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}value(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,n){e.addFieldOffset(0,n,0)}static addValue(e,n){e.addFieldOffset(1,n,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,n,t){return r.startStringStringEntry(e),r.addKey(e,n),r.addValue(e,t),r.endStringStringEntry(e)}};kn.StringStringEntry=cl});var fl=oe(Nn=>{"use strict";var P$=Nn&&Nn.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),E$=Nn&&Nn.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),C$=Nn&&Nn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&P$(n,e,t[o]);return E$(n,e),n}})();Object.defineProperty(Nn,"__esModule",{value:!0});Nn.Model=void 0;var D$=C$(Be()),k$=Ui(),N$=ll(),L$=dl(),pl=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsModel(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,n){return e.setPosition(e.position()+D$.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new N$.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}producerVersion(e){let n=this.bb.__offset(this.bb_pos,10);return n?this.bb.__string(this.bb_pos+n,e):null}domain(e){let n=this.bb.__offset(this.bb_pos,12);return n?this.bb.__string(this.bb_pos+n,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let n=this.bb.__offset(this.bb_pos,16);return n?this.bb.__string(this.bb_pos+n,e):null}graph(e){let n=this.bb.__offset(this.bb_pos,18);return n?(e||new k$.Graph).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}graphDocString(e){let n=this.bb.__offset(this.bb_pos,20);return n?this.bb.__string(this.bb_pos+n,e):null}metadataProps(e,n){let t=this.bb.__offset(this.bb_pos,22);return t?(n||new L$.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,n){e.addFieldInt64(0,n,BigInt("0"))}static addOpsetImport(e,n){e.addFieldOffset(1,n,0)}static createOpsetImportVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOpsetImportVector(e,n){e.startVector(4,n,4)}static addProducerName(e,n){e.addFieldOffset(2,n,0)}static addProducerVersion(e,n){e.addFieldOffset(3,n,0)}static addDomain(e,n){e.addFieldOffset(4,n,0)}static addModelVersion(e,n){e.addFieldInt64(5,n,BigInt("0"))}static addDocString(e,n){e.addFieldOffset(6,n,0)}static addGraph(e,n){e.addFieldOffset(7,n,0)}static addGraphDocString(e,n){e.addFieldOffset(8,n,0)}static addMetadataProps(e,n){e.addFieldOffset(9,n,0)}static createMetadataPropsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startMetadataPropsVector(e,n){e.startVector(4,n,4)}static endModel(e){return e.endObject()}};Nn.Model=pl});var Th=oe(Ln=>{"use strict";var R$=Ln&&Ln.__createBinding||(Object.create?function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}:function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]}),z$=Ln&&Ln.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),M$=Ln&&Ln.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&R$(n,e,t[o]);return z$(n,e),n}})();Object.defineProperty(Ln,"__esModule",{value:!0});Ln.InferenceSession=void 0;var B$=M$(Be()),V$=sl(),F$=fl(),hl=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsInferenceSession(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,n){return e.setPosition(e.position()+B$.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}model(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new F$.Model).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}kernelTypeStrResolver(e){let n=this.bb.__offset(this.bb_pos,10);return n?(e||new V$.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,n){e.addFieldOffset(0,n,0)}static addModel(e,n){e.addFieldOffset(1,n,0)}static addKernelTypeStrResolver(e,n){e.addFieldOffset(3,n,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,n){e.finish(n,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,n){e.finish(n,"ORTM",!0)}};Ln.InferenceSession=hl});var G$,U$,Wi,zt,W$,H$,q$,j$,K$,X$,Z$,J$,ml,gl,Y$,Q$,eA,tA,bl,nA,rA,oA,iA,aA,sA,uA,lA,cA,dA,pA,fA,hA,No,yl,mA,_l,gA,Ih=N(()=>{"use strict";G$=we(nu()),U$=we(lu()),Wi=we(hu()),zt=we(cu()),W$=we(Zu()),H$=we(xh()),q$=we(el()),j$=we(Qu()),K$=we(Mu()),X$=we(Ru()),Z$=we(Nu()),J$=we(gu()),ml=we(Ui()),gl=we(Th()),Y$=we(rl()),Q$=we(sl()),eA=we(Cu()),tA=we(fl()),bl=we(fu()),nA=we(yu()),rA=we(du()),oA=we(vu()),iA=we(il()),aA=we(ll()),sA=we(xu()),uA=we(Iu()),lA=we($u()),cA=we(ku()),dA=we(Vu()),pA=we(Pu()),fA=we(dl()),hA=we(Do()),No=we(Co()),yl=we(Gu()),mA=we(ko()),_l=we(Uu()),gA=we(qu())});var Lo=N(()=>{"use strict";Ih()});var $h=oe((aL,Sh)=>{"use strict";Sh.exports=bA;function bA(r,e){for(var n=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)n[t++]=arguments[o++];return new Promise(function(s,u){n[t]=function(c){if(i)if(i=!1,c)u(c);else{for(var p=new Array(arguments.length-1),h=0;h<p.length;)p[h++]=arguments[h];s.apply(null,p)}};try{r.apply(e||null,n)}catch(l){i&&(i=!1,u(l))}})}});var Eh=oe(Ph=>{"use strict";var qi=Ph;qi.length=function(e){var n=e.length;if(!n)return 0;for(var t=0;--n%4>1&&e.charAt(n)==="=";)++t;return Math.ceil(e.length*3)/4-t};var ro=new Array(64),Oh=new Array(123);for(jt=0;jt<64;)Oh[ro[jt]=jt<26?jt+65:jt<52?jt+71:jt<62?jt-4:jt-59|43]=jt++;var jt;qi.encode=function(e,n,t){for(var o=null,i=[],a=0,s=0,u;n<t;){var l=e[n++];switch(s){case 0:i[a++]=ro[l>>2],u=(l&3)<<4,s=1;break;case 1:i[a++]=ro[u|l>>4],u=(l&15)<<2,s=2;break;case 2:i[a++]=ro[u|l>>6],i[a++]=ro[l&63],s=0;break}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),a=0)}return s&&(i[a++]=ro[u],i[a++]=61,s===1&&(i[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,i.slice(0,a))),o.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var Ah="invalid encoding";qi.decode=function(e,n,t){for(var o=t,i=0,a,s=0;s<e.length;){var u=e.charCodeAt(s++);if(u===61&&i>1)break;if((u=Oh[u])===void 0)throw Error(Ah);switch(i){case 0:a=u,i=1;break;case 1:n[t++]=a<<2|(u&48)>>4,a=u,i=2;break;case 2:n[t++]=(a&15)<<4|(u&60)>>2,a=u,i=3;break;case 3:n[t++]=(a&3)<<6|u,i=0;break}}if(i===1)throw Error(Ah);return t-o};qi.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Dh=oe((uL,Ch)=>{"use strict";Ch.exports=ji;function ji(){this._listeners=Object.create(null)}ji.prototype.on=function(e,n,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:n,ctx:t||this}),this};ji.prototype.off=function(e,n){if(e===void 0)this._listeners=Object.create(null);else if(n===void 0)this._listeners[e]=[];else{var t=this._listeners[e];if(!t)return this;for(var o=0;o<t.length;)t[o].fn===n?t.splice(o,1):++o}return this};ji.prototype.emit=function(e){var n=this._listeners[e];if(n){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<n.length;)n[o].fn.apply(n[o++].ctx,t)}return this}});var Bh=oe((lL,Mh)=>{"use strict";Mh.exports=kh(kh);function kh(r){return typeof Float32Array<"u"?(function(){var e=new Float32Array([-0]),n=new Uint8Array(e.buffer),t=n[3]===128;function o(u,l,c){e[0]=u,l[c]=n[0],l[c+1]=n[1],l[c+2]=n[2],l[c+3]=n[3]}function i(u,l,c){e[0]=u,l[c]=n[3],l[c+1]=n[2],l[c+2]=n[1],l[c+3]=n[0]}r.writeFloatLE=t?o:i,r.writeFloatBE=t?i:o;function a(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],e[0]}function s(u,l){return n[3]=u[l],n[2]=u[l+1],n[1]=u[l+2],n[0]=u[l+3],e[0]}r.readFloatLE=t?a:s,r.readFloatBE=t?s:a})():(function(){function e(t,o,i,a){var s=o<0?1:0;if(s&&(o=-o),o===0)t(1/o>0?0:2147483648,i,a);else if(isNaN(o))t(2143289344,i,a);else if(o>34028234663852886e22)t((s<<31|2139095040)>>>0,i,a);else if(o<11754943508222875e-54)t((s<<31|Math.round(o/1401298464324817e-60))>>>0,i,a);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((s<<31|u+127<<23|l)>>>0,i,a)}}r.writeFloatLE=e.bind(null,Nh),r.writeFloatBE=e.bind(null,Lh);function n(t,o,i){var a=t(o,i),s=(a>>31)*2+1,u=a>>>23&255,l=a&8388607;return u===255?l?NaN:s*(1/0):u===0?s*1401298464324817e-60*l:s*Math.pow(2,u-150)*(l+8388608)}r.readFloatLE=n.bind(null,Rh),r.readFloatBE=n.bind(null,zh)})(),typeof Float64Array<"u"?(function(){var e=new Float64Array([-0]),n=new Uint8Array(e.buffer),t=n[7]===128;function o(u,l,c){e[0]=u,l[c]=n[0],l[c+1]=n[1],l[c+2]=n[2],l[c+3]=n[3],l[c+4]=n[4],l[c+5]=n[5],l[c+6]=n[6],l[c+7]=n[7]}function i(u,l,c){e[0]=u,l[c]=n[7],l[c+1]=n[6],l[c+2]=n[5],l[c+3]=n[4],l[c+4]=n[3],l[c+5]=n[2],l[c+6]=n[1],l[c+7]=n[0]}r.writeDoubleLE=t?o:i,r.writeDoubleBE=t?i:o;function a(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],n[4]=u[l+4],n[5]=u[l+5],n[6]=u[l+6],n[7]=u[l+7],e[0]}function s(u,l){return n[7]=u[l],n[6]=u[l+1],n[5]=u[l+2],n[4]=u[l+3],n[3]=u[l+4],n[2]=u[l+5],n[1]=u[l+6],n[0]=u[l+7],e[0]}r.readDoubleLE=t?a:s,r.readDoubleBE=t?s:a})():(function(){function e(t,o,i,a,s,u){var l=a<0?1:0;if(l&&(a=-a),a===0)t(0,s,u+o),t(1/a>0?0:2147483648,s,u+i);else if(isNaN(a))t(0,s,u+o),t(2146959360,s,u+i);else if(a>17976931348623157e292)t(0,s,u+o),t((l<<31|2146435072)>>>0,s,u+i);else{var c;if(a<22250738585072014e-324)c=a/5e-324,t(c>>>0,s,u+o),t((l<<31|c/4294967296)>>>0,s,u+i);else{var p=Math.floor(Math.log(a)/Math.LN2);p===1024&&(p=1023),c=a*Math.pow(2,-p),t(c*4503599627370496>>>0,s,u+o),t((l<<31|p+1023<<20|c*1048576&1048575)>>>0,s,u+i)}}}r.writeDoubleLE=e.bind(null,Nh,0,4),r.writeDoubleBE=e.bind(null,Lh,4,0);function n(t,o,i,a,s){var u=t(a,s+o),l=t(a,s+i),c=(l>>31)*2+1,p=l>>>20&2047,h=4294967296*(l&1048575)+u;return p===2047?h?NaN:c*(1/0):p===0?c*5e-324*h:c*Math.pow(2,p-1075)*(h+4503599627370496)}r.readDoubleLE=n.bind(null,Rh,0,4),r.readDoubleBE=n.bind(null,zh,4,0)})(),r}function Nh(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}function Lh(r,e,n){e[n]=r>>>24,e[n+1]=r>>>16&255,e[n+2]=r>>>8&255,e[n+3]=r&255}function Rh(r,e){return(r[e]|r[e+1]<<8|r[e+2]<<16|r[e+3]<<24)>>>0}function zh(r,e){return(r[e]<<24|r[e+1]<<16|r[e+2]<<8|r[e+3])>>>0}});var Fh=oe((cL,Vh)=>{"use strict";Vh.exports=yA;function yA(r){try{if(typeof Jr!="function")return null;var e=Jr(r);return e&&(e.length||Object.keys(e).length)?e:null}catch{return null}}});var Uh=oe(Gh=>{"use strict";var wl=Gh,vl="\uFFFD";wl.length=function(e){for(var n=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?n+=1:t<2048?n+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,n+=4):n+=3;return n};wl.read=function(e,n,t){if(t-n<1)return"";for(var o="",i=n;i<t;){var a=e[i++];if(a<=127)o+=String.fromCharCode(a);else if(a>=192&&a<224){var s=(a&31)<<6|e[i++]&63;o+=s>=128?String.fromCharCode(s):vl}else if(a>=224&&a<240){var u=(a&15)<<12|(e[i++]&63)<<6|e[i++]&63;o+=u>=2048?String.fromCharCode(u):vl}else if(a>=240){var l=(a&7)<<18|(e[i++]&63)<<12|(e[i++]&63)<<6|e[i++]&63;l<65536||l>1114111?o+=vl:(l-=65536,o+=String.fromCharCode(55296+(l>>10)),o+=String.fromCharCode(56320+(l&1023)))}}return o};wl.write=function(e,n,t){for(var o=t,i,a,s=0;s<e.length;++s)i=e.charCodeAt(s),i<128?n[t++]=i:i<2048?(n[t++]=i>>6|192,n[t++]=i&63|128):(i&64512)===55296&&((a=e.charCodeAt(s+1))&64512)===56320?(i=65536+((i&1023)<<10)+(a&1023),++s,n[t++]=i>>18|240,n[t++]=i>>12&63|128,n[t++]=i>>6&63|128,n[t++]=i&63|128):(n[t++]=i>>12|224,n[t++]=i>>6&63|128,n[t++]=i&63|128);return t-o}});var Hh=oe((fL,Wh)=>{"use strict";Wh.exports=_A;function _A(r,e,n){var t=n||8192,o=t>>>1,i=null,a=t;return function(u){if(u<1||u>o)return r(u);a+u>t&&(i=r(t),a=0);var l=e.call(i,a,a+=u);return a&7&&(a=(a|7)+1),l}}});var jh=oe((hL,qh)=>{"use strict";qh.exports=ht;var Ro=mr();function ht(r,e){this.lo=r>>>0,this.hi=e>>>0}var Cr=ht.zero=new ht(0,0);Cr.toNumber=function(){return 0};Cr.zzEncode=Cr.zzDecode=function(){return this};Cr.length=function(){return 1};var vA=ht.zeroHash="\0\0\0\0\0\0\0\0";ht.fromNumber=function(e){if(e===0)return Cr;var n=e<0;n&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return n&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new ht(t,o)};ht.from=function(e){if(typeof e=="number")return ht.fromNumber(e);if(Ro.isString(e))if(Ro.Long)e=Ro.Long.fromString(e);else return ht.fromNumber(parseInt(e,10));return e.low||e.high?new ht(e.low>>>0,e.high>>>0):Cr};ht.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var n=~this.lo+1>>>0,t=~this.hi>>>0;return n||(t=t+1>>>0),-(n+t*4294967296)}return this.lo+this.hi*4294967296};ht.prototype.toLong=function(e){return Ro.Long?new Ro.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var hr=String.prototype.charCodeAt;ht.fromHash=function(e){return e===vA?Cr:new ht((hr.call(e,0)|hr.call(e,1)<<8|hr.call(e,2)<<16|hr.call(e,3)<<24)>>>0,(hr.call(e,4)|hr.call(e,5)<<8|hr.call(e,6)<<16|hr.call(e,7)<<24)>>>0)};ht.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};ht.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};ht.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};ht.prototype.length=function(){var e=this.lo,n=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?n===0?e<16384?e<128?1:2:e<2097152?3:4:n<16384?n<128?5:6:n<2097152?7:8:t<128?9:10}});var Kh=oe((zo,xl)=>{(function(r,e){function n(t){return t.default||t}typeof define=="function"&&define.amd?define([],function(){var t={};return e(t),n(t)}):typeof zo=="object"?(e(zo),typeof xl=="object"&&(xl.exports=n(zo))):(function(){var t={};e(t),r.Long=n(t)})()})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:zo,function(r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var e=null;try{e=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function n(B,w,V){this.low=B|0,this.high=w|0,this.unsigned=!!V}n.prototype.__isLong__,Object.defineProperty(n.prototype,"__isLong__",{value:!0});function t(B){return(B&&B.__isLong__)===!0}function o(B){var w=Math.clz32(B&-B);return B?31-w:w}n.isLong=t;var i={},a={};function s(B,w){var V,Z,G;return w?(B>>>=0,(G=0<=B&&B<256)&&(Z=a[B],Z)?Z:(V=l(B,0,!0),G&&(a[B]=V),V)):(B|=0,(G=-128<=B&&B<128)&&(Z=i[B],Z)?Z:(V=l(B,B<0?-1:0,!1),G&&(i[B]=V),V))}n.fromInt=s;function u(B,w){if(isNaN(B))return w?O:$;if(w){if(B<0)return O;if(B>=S)return W}else{if(B<=-v)return H;if(B+1>=v)return T}return B<0?u(-B,w).neg():l(B%_|0,B/_|0,w)}n.fromNumber=u;function l(B,w,V){return new n(B,w,V)}n.fromBits=l;var c=Math.pow;function p(B,w,V){if(B.length===0)throw Error("empty string");if(typeof w=="number"?(V=w,w=!1):w=!!w,B==="NaN"||B==="Infinity"||B==="+Infinity"||B==="-Infinity")return w?O:$;if(V=V||10,V<2||36<V)throw RangeError("radix");var Z;if((Z=B.indexOf("-"))>0)throw Error("interior hyphen");if(Z===0)return p(B.substring(1),w,V).neg();for(var G=u(c(V,8)),Q=$,ue=0;ue<B.length;ue+=8){var ae=Math.min(8,B.length-ue),_e=parseInt(B.substring(ue,ue+ae),V);if(ae<8){var fe=u(c(V,ae));Q=Q.mul(fe).add(u(_e))}else Q=Q.mul(G),Q=Q.add(u(_e))}return Q.unsigned=w,Q}n.fromString=p;function h(B,w){return typeof B=="number"?u(B,w):typeof B=="string"?p(B,w):l(B.low,B.high,typeof w=="boolean"?w:B.unsigned)}n.fromValue=h;var g=65536,m=1<<24,_=g*g,S=_*_,v=S/2,x=s(m),$=s(0);n.ZERO=$;var O=s(0,!0);n.UZERO=O;var P=s(1);n.ONE=P;var C=s(1,!0);n.UONE=C;var R=s(-1);n.NEG_ONE=R;var T=l(-1,2147483647,!1);n.MAX_VALUE=T;var W=l(-1,-1,!0);n.MAX_UNSIGNED_VALUE=W;var H=l(0,-2147483648,!1);n.MIN_VALUE=H;var M=n.prototype;M.toInt=function(){return this.unsigned?this.low>>>0:this.low},M.toNumber=function(){return this.unsigned?(this.high>>>0)*_+(this.low>>>0):this.high*_+(this.low>>>0)},M.toString=function(w){if(w=w||10,w<2||36<w)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(H)){var V=u(w),Z=this.div(V),G=Z.mul(V).sub(this);return Z.toString(w)+G.toInt().toString(w)}else return"-"+this.neg().toString(w);for(var Q=u(c(w,6),this.unsigned),ue=this,ae="";;){var _e=ue.div(Q),fe=ue.sub(_e.mul(Q)).toInt()>>>0,se=fe.toString(w);if(ue=_e,ue.isZero())return se+ae;for(;se.length<6;)se="0"+se;ae=""+se+ae}},M.getHighBits=function(){return this.high},M.getHighBitsUnsigned=function(){return this.high>>>0},M.getLowBits=function(){return this.low},M.getLowBitsUnsigned=function(){return this.low>>>0},M.getNumBitsAbs=function(){if(this.isNegative())return this.eq(H)?64:this.neg().getNumBitsAbs();for(var w=this.high!=0?this.high:this.low,V=31;V>0&&(w&1<<V)==0;V--);return this.high!=0?V+33:V+1},M.isSafeInteger=function(){var w=this.high>>21;return w?this.unsigned?!1:w===-1&&!(this.low===0&&this.high===-2097152):!0},M.isZero=function(){return this.high===0&&this.low===0},M.eqz=M.isZero,M.isNegative=function(){return!this.unsigned&&this.high<0},M.isPositive=function(){return this.unsigned||this.high>=0},M.isOdd=function(){return(this.low&1)===1},M.isEven=function(){return(this.low&1)===0},M.equals=function(w){return t(w)||(w=h(w)),this.unsigned!==w.unsigned&&this.high>>>31===1&&w.high>>>31===1?!1:this.high===w.high&&this.low===w.low},M.eq=M.equals,M.notEquals=function(w){return!this.eq(w)},M.neq=M.notEquals,M.ne=M.notEquals,M.lessThan=function(w){return this.comp(w)<0},M.lt=M.lessThan,M.lessThanOrEqual=function(w){return this.comp(w)<=0},M.lte=M.lessThanOrEqual,M.le=M.lessThanOrEqual,M.greaterThan=function(w){return this.comp(w)>0},M.gt=M.greaterThan,M.greaterThanOrEqual=function(w){return this.comp(w)>=0},M.gte=M.greaterThanOrEqual,M.ge=M.greaterThanOrEqual,M.compare=function(w){if(t(w)||(w=h(w)),this.eq(w))return 0;var V=this.isNegative(),Z=w.isNegative();return V&&!Z?-1:!V&&Z?1:this.unsigned?w.high>>>0>this.high>>>0||w.high===this.high&&w.low>>>0>this.low>>>0?-1:1:this.sub(w).isNegative()?-1:1},M.comp=M.compare,M.negate=function(){return!this.unsigned&&this.eq(H)?H:this.not().add(P)},M.neg=M.negate,M.add=function(w){t(w)||(w=h(w));var V=this.high>>>16,Z=this.high&65535,G=this.low>>>16,Q=this.low&65535,ue=w.high>>>16,ae=w.high&65535,_e=w.low>>>16,fe=w.low&65535,se=0,U=0,j=0,he=0;return he+=Q+fe,j+=he>>>16,he&=65535,j+=G+_e,U+=j>>>16,j&=65535,U+=Z+ae,se+=U>>>16,U&=65535,se+=V+ue,se&=65535,l(j<<16|he,se<<16|U,this.unsigned)},M.subtract=function(w){return t(w)||(w=h(w)),this.add(w.neg())},M.sub=M.subtract,M.multiply=function(w){if(this.isZero())return this;if(t(w)||(w=h(w)),e){var V=e.mul(this.low,this.high,w.low,w.high);return l(V,e.get_high(),this.unsigned)}if(w.isZero())return this.unsigned?O:$;if(this.eq(H))return w.isOdd()?H:$;if(w.eq(H))return this.isOdd()?H:$;if(this.isNegative())return w.isNegative()?this.neg().mul(w.neg()):this.neg().mul(w).neg();if(w.isNegative())return this.mul(w.neg()).neg();if(this.lt(x)&&w.lt(x))return u(this.toNumber()*w.toNumber(),this.unsigned);var Z=this.high>>>16,G=this.high&65535,Q=this.low>>>16,ue=this.low&65535,ae=w.high>>>16,_e=w.high&65535,fe=w.low>>>16,se=w.low&65535,U=0,j=0,he=0,lt=0;return lt+=ue*se,he+=lt>>>16,lt&=65535,he+=Q*se,j+=he>>>16,he&=65535,he+=ue*fe,j+=he>>>16,he&=65535,j+=G*se,U+=j>>>16,j&=65535,j+=Q*fe,U+=j>>>16,j&=65535,j+=ue*_e,U+=j>>>16,j&=65535,U+=Z*se+G*fe+Q*_e+ue*ae,U&=65535,l(he<<16|lt,U<<16|j,this.unsigned)},M.mul=M.multiply,M.divide=function(w){if(t(w)||(w=h(w)),w.isZero())throw Error("division by zero");if(e){if(!this.unsigned&&this.high===-2147483648&&w.low===-1&&w.high===-1)return this;var V=(this.unsigned?e.div_u:e.div_s)(this.low,this.high,w.low,w.high);return l(V,e.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?O:$;var Z,G,Q;if(this.unsigned){if(w.unsigned||(w=w.toUnsigned()),w.gt(this))return O;if(w.gt(this.shru(1)))return C;Q=O}else{if(this.eq(H)){if(w.eq(P)||w.eq(R))return H;if(w.eq(H))return P;var ue=this.shr(1);return Z=ue.div(w).shl(1),Z.eq($)?w.isNegative()?P:R:(G=this.sub(w.mul(Z)),Q=Z.add(G.div(w)),Q)}else if(w.eq(H))return this.unsigned?O:$;if(this.isNegative())return w.isNegative()?this.neg().div(w.neg()):this.neg().div(w).neg();if(w.isNegative())return this.div(w.neg()).neg();Q=$}for(G=this;G.gte(w);){Z=Math.max(1,Math.floor(G.toNumber()/w.toNumber()));for(var ae=Math.ceil(Math.log(Z)/Math.LN2),_e=ae<=48?1:c(2,ae-48),fe=u(Z),se=fe.mul(w);se.isNegative()||se.gt(G);)Z-=_e,fe=u(Z,this.unsigned),se=fe.mul(w);fe.isZero()&&(fe=P),Q=Q.add(fe),G=G.sub(se)}return Q},M.div=M.divide,M.modulo=function(w){if(t(w)||(w=h(w)),e){var V=(this.unsigned?e.rem_u:e.rem_s)(this.low,this.high,w.low,w.high);return l(V,e.get_high(),this.unsigned)}return this.sub(this.div(w).mul(w))},M.mod=M.modulo,M.rem=M.modulo,M.not=function(){return l(~this.low,~this.high,this.unsigned)},M.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},M.clz=M.countLeadingZeros,M.countTrailingZeros=function(){return this.low?o(this.low):o(this.high)+32},M.ctz=M.countTrailingZeros,M.and=function(w){return t(w)||(w=h(w)),l(this.low&w.low,this.high&w.high,this.unsigned)},M.or=function(w){return t(w)||(w=h(w)),l(this.low|w.low,this.high|w.high,this.unsigned)},M.xor=function(w){return t(w)||(w=h(w)),l(this.low^w.low,this.high^w.high,this.unsigned)},M.shiftLeft=function(w){return t(w)&&(w=w.toInt()),(w&=63)===0?this:w<32?l(this.low<<w,this.high<<w|this.low>>>32-w,this.unsigned):l(0,this.low<<w-32,this.unsigned)},M.shl=M.shiftLeft,M.shiftRight=function(w){return t(w)&&(w=w.toInt()),(w&=63)===0?this:w<32?l(this.low>>>w|this.high<<32-w,this.high>>w,this.unsigned):l(this.high>>w-32,this.high>=0?0:-1,this.unsigned)},M.shr=M.shiftRight,M.shiftRightUnsigned=function(w){return t(w)&&(w=w.toInt()),(w&=63)===0?this:w<32?l(this.low>>>w|this.high<<32-w,this.high>>>w,this.unsigned):w===32?l(this.high,0,this.unsigned):l(this.high>>>w-32,0,this.unsigned)},M.shru=M.shiftRightUnsigned,M.shr_u=M.shiftRightUnsigned,M.rotateLeft=function(w){var V;return t(w)&&(w=w.toInt()),(w&=63)===0?this:w===32?l(this.high,this.low,this.unsigned):w<32?(V=32-w,l(this.low<<w|this.high>>>V,this.high<<w|this.low>>>V,this.unsigned)):(w-=32,V=32-w,l(this.high<<w|this.low>>>V,this.low<<w|this.high>>>V,this.unsigned))},M.rotl=M.rotateLeft,M.rotateRight=function(w){var V;return t(w)&&(w=w.toInt()),(w&=63)===0?this:w===32?l(this.high,this.low,this.unsigned):w<32?(V=32-w,l(this.high<<V|this.low>>>w,this.low<<V|this.high>>>w,this.unsigned)):(w-=32,V=32-w,l(this.low<<V|this.high>>>w,this.high<<V|this.low>>>w,this.unsigned))},M.rotr=M.rotateRight,M.toSigned=function(){return this.unsigned?l(this.low,this.high,!1):this},M.toUnsigned=function(){return this.unsigned?this:l(this.low,this.high,!0)},M.toBytes=function(w){return w?this.toBytesLE():this.toBytesBE()},M.toBytesLE=function(){var w=this.high,V=this.low;return[V&255,V>>>8&255,V>>>16&255,V>>>24,w&255,w>>>8&255,w>>>16&255,w>>>24]},M.toBytesBE=function(){var w=this.high,V=this.low;return[w>>>24,w>>>16&255,w>>>8&255,w&255,V>>>24,V>>>16&255,V>>>8&255,V&255]},n.fromBytes=function(w,V,Z){return Z?n.fromBytesLE(w,V):n.fromBytesBE(w,V)},n.fromBytesLE=function(w,V){return new n(w[0]|w[1]<<8|w[2]<<16|w[3]<<24,w[4]|w[5]<<8|w[6]<<16|w[7]<<24,V)},n.fromBytesBE=function(w,V){return new n(w[4]<<24|w[5]<<16|w[6]<<8|w[7],w[0]<<24|w[1]<<16|w[2]<<8|w[3],V)},typeof BigInt=="function"&&(n.fromBigInt=function(w,V){var Z=Number(BigInt.asIntN(32,w)),G=Number(BigInt.asIntN(32,w>>BigInt(32)));return l(Z,G,V)},n.fromValue=function(w,V){return typeof w=="bigint"?n.fromBigInt(w,V):h(w,V)},M.toBigInt=function(){var w=BigInt(this.low>>>0),V=BigInt(this.unsigned?this.high>>>0:this.high);return V<<BigInt(32)|w});var re=r.default=n})});var mr=oe(Tl=>{"use strict";var le=Tl;le.asPromise=$h();le.base64=Eh();le.EventEmitter=Dh();le.float=Bh();le.inquire=Fh();le.utf8=Uh();le.pool=Hh();le.LongBits=jh();function Xh(r){return r==="__proto__"||r==="prototype"||r==="constructor"}le.isUnsafeProperty=Xh;le.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);le.global=le.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||Tl;le.emptyArray=Object.freeze?Object.freeze([]):[];le.emptyObject=Object.freeze?Object.freeze({}):{};le.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};le.isString=function(e){return typeof e=="string"||e instanceof String};le.isObject=function(e){return e&&typeof e=="object"};le.isset=le.isSet=function(e,n){var t=e[n];return t!=null&&Object.hasOwnProperty.call(e,n)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};le.Buffer=(function(){try{var r=le.global.Buffer;return r.prototype.utf8Write?r:null}catch{return null}})();le._Buffer_from=null;le._Buffer_allocUnsafe=null;le.newBuffer=function(e){return typeof e=="number"?le.Buffer?le._Buffer_allocUnsafe(e):new le.Array(e):le.Buffer?le._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};le.Array=typeof Uint8Array<"u"?Uint8Array:Array;le.Long=le.global.dcodeIO&&le.global.dcodeIO.Long||le.global.Long||(function(){try{var r=Kh();return r&&r.isLong?r:null}catch{return null}})();le.key2Re=/^true|false|0|1$/;le.key32Re=/^-?(?:0|[1-9][0-9]*)$/;le.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;le.longToHash=function(e){return e?le.LongBits.from(e).toHash():le.LongBits.zeroHash};le.longFromHash=function(e,n){var t=le.LongBits.fromHash(e);return le.Long?le.Long.fromBits(t.lo,t.hi,n):t.toNumber(!!n)};function Zh(r){var e=typeof arguments[arguments.length-1]=="boolean",n=e?arguments.length-1:arguments.length;e=e&&arguments[arguments.length-1];for(var t=1;t<n;++t){var o=arguments[t];if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)!Xh(i[a])&&(r[i[a]]===void 0||!e)&&(r[i[a]]=o[i[a]])}return r}le.merge=Zh;le.nestingLimit=32;le.recursionLimit=100;le.makeProp=function(e,n){Object.defineProperty(e,n,{enumerable:!0,configurable:!0,writable:!0})};le.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function Jh(r){function e(n,t){if(!(this instanceof e))return new e(n,t);Object.defineProperty(this,"message",{get:function(){return n}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&Zh(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return r},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}le.newError=Jh;le.ProtocolError=Jh("ProtocolError");le.oneOfGetter=function(e){for(var n={},t=0;t<e.length;++t)n[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(n[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};le.oneOfSetter=function(e){return function(n){for(var t=0;t<e.length;++t)e[t]!==n&&delete this[e[t]]}};le.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};le._configure=function(){var r=le.Buffer;if(!r){le._Buffer_from=le._Buffer_allocUnsafe=null;return}le._Buffer_from=r.from!==Uint8Array.from&&r.from||function(n,t){return new r(n,t)},le._Buffer_allocUnsafe=r.allocUnsafe||function(n){return new r(n)}}});var El=oe((gL,tm)=>{"use strict";tm.exports=ze;var Mt=mr(),Il,Ki=Mt.LongBits,Yh=Mt.base64,Qh=Mt.utf8;function Mo(r,e,n){this.fn=r,this.len=e,this.next=void 0,this.val=n}function $l(){}function wA(r){this.head=r.head,this.tail=r.tail,this.len=r.len,this.next=r.states}function ze(){this.len=0,this.head=new Mo($l,0,0),this.tail=this.head,this.states=null}var em=function(){return Mt.Buffer?function(){return(ze.create=function(){return new Il})()}:function(){return new ze}};ze.create=em();ze.alloc=function(e){return new Mt.Array(e)};Mt.Array!==Array&&(ze.alloc=Mt.pool(ze.alloc,Mt.Array.prototype.subarray));ze.prototype._push=function(e,n,t){return this.tail=this.tail.next=new Mo(e,n,t),this.len+=n,this};function Al(r,e,n){e[n]=r&255}function xA(r,e,n){for(;r>127;)e[n++]=r&127|128,r>>>=7;e[n]=r}function Ol(r,e){this.len=r,this.next=void 0,this.val=e}Ol.prototype=Object.create(Mo.prototype);Ol.prototype.fn=xA;ze.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new Ol((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};ze.prototype.int32=function(e){return(e|=0)<0?this._push(Pl,10,Ki.fromNumber(e)):this.uint32(e)};ze.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function Pl(r,e,n){for(var t=r.lo,o=r.hi;o;)e[n++]=t&127|128,t=(t>>>7|o<<25)>>>0,o>>>=7;for(;t>127;)e[n++]=t&127|128,t=t>>>7;e[n++]=t}ze.prototype.uint64=function(e){var n=Ki.from(e);return this._push(Pl,n.length(),n)};ze.prototype.int64=ze.prototype.uint64;ze.prototype.sint64=function(e){var n=Ki.from(e).zzEncode();return this._push(Pl,n.length(),n)};ze.prototype.bool=function(e){return this._push(Al,1,e?1:0)};function Sl(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}ze.prototype.fixed32=function(e){return this._push(Sl,4,e>>>0)};ze.prototype.sfixed32=ze.prototype.fixed32;ze.prototype.fixed64=function(e){var n=Ki.from(e);return this._push(Sl,4,n.lo)._push(Sl,4,n.hi)};ze.prototype.sfixed64=ze.prototype.fixed64;ze.prototype.float=function(e){return this._push(Mt.float.writeFloatLE,4,e)};ze.prototype.double=function(e){return this._push(Mt.float.writeDoubleLE,8,e)};var TA=Mt.Array.prototype.set?function(e,n,t){n.set(e,t)}:function(e,n,t){for(var o=0;o<e.length;++o)n[t+o]=e[o]};ze.prototype.bytes=function(e){var n=e.length>>>0;if(!n)return this._push(Al,1,0);if(Mt.isString(e)){var t=ze.alloc(n=Yh.length(e));Yh.decode(e,t,0),e=t}return this.uint32(n)._push(TA,n,e)};ze.prototype.string=function(e){var n=Qh.length(e);return n?this.uint32(n)._push(Qh.write,n,e):this._push(Al,1,0)};ze.prototype.fork=function(){return this.states=new wA(this),this.head=this.tail=new Mo($l,0,0),this.len=0,this};ze.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Mo($l,0,0),this.len=0),this};ze.prototype.ldelim=function(){var e=this.head,n=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=n,this.len+=t),this};ze.prototype.finish=function(){for(var e=this.head.next,n=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,n,t),t+=e.len,e=e.next;return n};ze._configure=function(r){Il=r,ze.create=em(),Il._configure()}});var om=oe((bL,rm)=>{"use strict";rm.exports=Rn;var nm=El();(Rn.prototype=Object.create(nm.prototype)).constructor=Rn;var gr=mr();function Rn(){nm.call(this)}Rn._configure=function(){Rn.alloc=gr._Buffer_allocUnsafe,Rn.writeBytesBuffer=gr.Buffer&&gr.Buffer.prototype instanceof Uint8Array&&gr.Buffer.prototype.set.name==="set"?function(e,n,t){n.set(e,t)}:function(e,n,t){if(e.copy)e.copy(n,t,0,e.length);else for(var o=0;o<e.length;)n[t++]=e[o++]}};Rn.prototype.bytes=function(e){gr.isString(e)&&(e=gr._Buffer_from(e,"base64"));var n=e.length>>>0;return this.uint32(n),n&&this._push(Rn.writeBytesBuffer,n,e),this};function IA(r,e,n){r.length<40?gr.utf8.write(r,e,n):e.utf8Write?e.utf8Write(r,n):e.write(r,n)}Rn.prototype.string=function(e){var n=gr.Buffer.byteLength(e);return this.uint32(n),n&&this._push(IA,n,e),this};Rn._configure()});var kl=oe((yL,lm)=>{"use strict";lm.exports=et;var Bt=mr(),Dl,sm=Bt.LongBits,SA=Bt.utf8;function Kt(r,e){return RangeError("index out of range: "+r.pos+" + "+(e||1)+" > "+r.len)}function et(r){this.buf=r,this.pos=0,this.len=r.length}var im=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new et(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new et(e);throw Error("illegal buffer")},um=function(){return Bt.Buffer?function(n){return(et.create=function(o){return Bt.Buffer.isBuffer(o)?new Dl(o):im(o)})(n)}:im};et.create=um();et.prototype._slice=Bt.Array.prototype.subarray||Bt.Array.prototype.slice;et.prototype.uint32=(function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,Kt(this,10);return e}})();et.prototype.int32=function(){return this.uint32()|0};et.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function Cl(){var r=new sm(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r;if(r.lo=(r.lo|(this.buf[this.pos]&127)<<28)>>>0,r.hi=(r.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return r;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw Kt(this);if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r}return r.lo=(r.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,r}if(this.len-this.pos>4){for(;e<5;++e)if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}else for(;e<5;++e){if(this.pos>=this.len)throw Kt(this);if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}throw Error("invalid varint encoding")}et.prototype.bool=function(){return this.uint32()!==0};function Xi(r,e){return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0}et.prototype.fixed32=function(){if(this.pos+4>this.len)throw Kt(this,4);return Xi(this.buf,this.pos+=4)};et.prototype.sfixed32=function(){if(this.pos+4>this.len)throw Kt(this,4);return Xi(this.buf,this.pos+=4)|0};function am(){if(this.pos+8>this.len)throw Kt(this,8);return new sm(Xi(this.buf,this.pos+=4),Xi(this.buf,this.pos+=4))}et.prototype.float=function(){if(this.pos+4>this.len)throw Kt(this,4);var e=Bt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};et.prototype.double=function(){if(this.pos+8>this.len)throw Kt(this,4);var e=Bt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};et.prototype.bytes=function(){var e=this.uint32(),n=this.pos,t=this.pos+e;if(t>this.len)throw Kt(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(n,t);if(n===t){var o=Bt.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,n,t)};et.prototype.string=function(){var e=this.bytes();return SA.read(e,0,e.length)};et.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw Kt(this,e);this.pos+=e}else do if(this.pos>=this.len)throw Kt(this);while(this.buf[this.pos++]&128);return this};et.recursionLimit=Bt.recursionLimit;et.prototype.skipType=function(r,e){if(e===void 0&&(e=0),e>et.recursionLimit)throw Error("maximum nesting depth exceeded");switch(r){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(r=this.uint32()&7)!==4;)this.skipType(r,e+1);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+r+" at offset "+this.pos)}return this};et._configure=function(r){Dl=r,et.create=um(),Dl._configure();var e=Bt.Long?"toLong":"toNumber";Bt.merge(et.prototype,{int64:function(){return Cl.call(this)[e](!1)},uint64:function(){return Cl.call(this)[e](!0)},sint64:function(){return Cl.call(this).zzDecode()[e](!1)},fixed64:function(){return am.call(this)[e](!0)},sfixed64:function(){return am.call(this)[e](!1)}})}});var fm=oe((_L,pm)=>{"use strict";pm.exports=Dr;var dm=kl();(Dr.prototype=Object.create(dm.prototype)).constructor=Dr;var cm=mr();function Dr(r){dm.call(this,r)}Dr._configure=function(){cm.Buffer&&(Dr.prototype._slice=cm.Buffer.prototype.slice)};Dr.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};Dr._configure()});var mm=oe((vL,hm)=>{"use strict";hm.exports=Bo;var Nl=mr();(Bo.prototype=Object.create(Nl.EventEmitter.prototype)).constructor=Bo;function Bo(r,e,n){if(typeof r!="function")throw TypeError("rpcImpl must be a function");Nl.EventEmitter.call(this),this.rpcImpl=r,this.requestDelimited=!!e,this.responseDelimited=!!n}Bo.prototype.rpcCall=function r(e,n,t,o,i){if(!o)throw TypeError("request must be specified");var a=this;if(!i)return Nl.asPromise(r,a,e,n,t,o);if(!a.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return a.rpcImpl(e,n[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return a.emit("error",u,e),i(u);if(l===null){a.end(!0);return}if(!(l instanceof t))try{l=t[a.responseDelimited?"decodeDelimited":"decode"](l)}catch(c){return a.emit("error",c,e),i(c)}return a.emit("data",l,e),i(null,l)})}catch(s){a.emit("error",s,e),setTimeout(function(){i(s)},0);return}};Bo.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var bm=oe(gm=>{"use strict";var $A=gm;$A.Service=mm()});var _m=oe((xL,ym)=>{"use strict";ym.exports=Object.create(null)});var xm=oe(wm=>{"use strict";var It=wm;It.build="minimal";It.Writer=El();It.BufferWriter=om();It.Reader=kl();It.BufferReader=fm();It.util=mr();It.rpc=bm();It.roots=_m();It.configure=vm;function vm(){It.util._configure(),It.Writer._configure(It.BufferWriter),It.Reader._configure(It.BufferReader)}vm()});var Im=oe((IL,Tm)=>{"use strict";Tm.exports=xm()});var oo=oe((SL,Sm)=>{"use strict";var je=Im(),Y=je.Reader,it=je.Writer,D=je.util,A=je.roots.default||(je.roots.default={});A.onnx=(function(){var r={};return r.Version=(function(){var e={},n=Object.create(e);return n[e[0]="_START_VERSION"]=0,n[e[1]="IR_VERSION_2017_10_10"]=1,n[e[2]="IR_VERSION_2017_10_30"]=2,n[e[3]="IR_VERSION_2017_11_3"]=3,n[e[4]="IR_VERSION_2019_1_22"]=4,n[e[5]="IR_VERSION_2019_3_18"]=5,n[e[6]="IR_VERSION_2019_9_19"]=6,n[e[7]="IR_VERSION_2020_5_8"]=7,n[e[8]="IR_VERSION_2021_7_30"]=8,n[e[9]="IR_VERSION"]=9,n})(),r.AttributeProto=(function(){function e(n){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=D.Long?D.Long.fromBits(0,0,!1):0,e.prototype.s=D.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=D.emptyArray,e.prototype.ints=D.emptyArray,e.prototype.strings=D.emptyArray,e.prototype.tensors=D.emptyArray,e.prototype.graphs=D.emptyArray,e.prototype.sparseTensors=D.emptyArray,e.prototype.typeProtos=D.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=it.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&A.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&A.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)A.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)A.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&A.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)A.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&A.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)A.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.AttributeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 21:{a.refAttrName=t.string();break}case 13:{a.docString=t.string();break}case 20:{a.type=t.int32();break}case 2:{a.f=t.float();break}case 3:{a.i=t.int64();break}case 4:{a.s=t.bytes();break}case 5:{a.t=A.onnx.TensorProto.decode(t,t.uint32());break}case 6:{a.g=A.onnx.GraphProto.decode(t,t.uint32());break}case 22:{a.sparseTensor=A.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{a.tp=A.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(a.floats&&a.floats.length||(a.floats=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floats.push(t.float());else a.floats.push(t.float());break}case 8:{if(a.ints&&a.ints.length||(a.ints=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.ints.push(t.int64());else a.ints.push(t.int64());break}case 9:{a.strings&&a.strings.length||(a.strings=[]),a.strings.push(t.bytes());break}case 10:{a.tensors&&a.tensors.length||(a.tensors=[]),a.tensors.push(A.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{a.graphs&&a.graphs.length||(a.graphs=[]),a.graphs.push(A.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{a.sparseTensors&&a.sparseTensors.length||(a.sparseTensors=[]),a.sparseTensors.push(A.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{a.typeProtos&&a.typeProtos.length||(a.typeProtos=[]),a.typeProtos.push(A.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!D.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!D.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!D.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!D.isInteger(t.i)&&!(t.i&&D.isInteger(t.i.low)&&D.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||D.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=A.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=A.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=A.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=A.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!D.isInteger(t.ints[i])&&!(t.ints[i]&&D.isInteger(t.ints[i].low)&&D.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||D.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=A.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=A.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=A.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=A.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof A.onnx.AttributeProto)return t;var o=new A.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(D.Long?(o.i=D.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new D.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?D.base64.decode(t.s,o.s=D.newBuffer(D.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=A.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=A.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=A.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=A.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)D.Long?(o.ints[i]=D.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new D.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?D.base64.decode(t.strings[i],o.strings[i]=D.newBuffer(D.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=A.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=A.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=A.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=A.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,D.Long){var a=new D.Long(0,0,!1);i.i=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=D.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?D.Long.prototype.toString.call(t.i):o.longs===Number?new D.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?D.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=A.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=A.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var s=0;s<t.floats.length;++s)i.floats[s]=o.json&&!isFinite(t.floats[s])?String(t.floats[s]):t.floats[s]}if(t.ints&&t.ints.length){i.ints=[];for(var s=0;s<t.ints.length;++s)typeof t.ints[s]=="number"?i.ints[s]=o.longs===String?String(t.ints[s]):t.ints[s]:i.ints[s]=o.longs===String?D.Long.prototype.toString.call(t.ints[s]):o.longs===Number?new D.LongBits(t.ints[s].low>>>0,t.ints[s].high>>>0).toNumber():t.ints[s]}if(t.strings&&t.strings.length){i.strings=[];for(var s=0;s<t.strings.length;++s)i.strings[s]=o.bytes===String?D.base64.encode(t.strings[s],0,t.strings[s].length):o.bytes===Array?Array.prototype.slice.call(t.strings[s]):t.strings[s]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var s=0;s<t.tensors.length;++s)i.tensors[s]=A.onnx.TensorProto.toObject(t.tensors[s],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var s=0;s<t.graphs.length;++s)i.graphs[s]=A.onnx.GraphProto.toObject(t.graphs[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=A.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var s=0;s<t.typeProtos.length;++s)i.typeProtos[s]=A.onnx.TypeProto.toObject(t.typeProtos[s],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?A.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:A.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=A.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var s=0;s<t.sparseTensors.length;++s)i.sparseTensors[s]=A.onnx.SparseTensorProto.toObject(t.sparseTensors[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=(function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="INT"]=2,t[n[3]="STRING"]=3,t[n[4]="TENSOR"]=4,t[n[5]="GRAPH"]=5,t[n[11]="SPARSE_TENSOR"]=11,t[n[13]="TYPE_PROTO"]=13,t[n[6]="FLOATS"]=6,t[n[7]="INTS"]=7,t[n[8]="STRINGS"]=8,t[n[9]="TENSORS"]=9,t[n[10]="GRAPHS"]=10,t[n[12]="SPARSE_TENSORS"]=12,t[n[14]="TYPE_PROTOS"]=14,t})(),e})(),r.ValueInfoProto=(function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=it.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&A.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.ValueInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 2:{a.type=A.onnx.TypeProto.decode(t,t.uint32());break}case 3:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!D.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=A.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!D.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof A.onnx.ValueInfoProto)return t;var o=new A.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=A.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=A.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e})(),r.NodeProto=(function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.input=D.emptyArray,e.prototype.output=D.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=D.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=it.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)A.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.NodeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 2:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 3:{a.name=t.string();break}case 4:{a.opType=t.string();break}case 7:{a.domain=t.string();break}case 5:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(A.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!D.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!D.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!D.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!D.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!D.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=A.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!D.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof A.onnx.NodeProto)return t;var o=new A.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=A.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=A.onnx.AttributeProto.toObject(t.attribute[a],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e})(),r.TrainingInfoProto=(function(){function e(n){if(this.initializationBinding=[],this.updateBinding=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=D.emptyArray,e.prototype.updateBinding=D.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=it.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&A.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&A.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)A.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)A.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.TrainingInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.initialization=A.onnx.GraphProto.decode(t,t.uint32());break}case 2:{a.algorithm=A.onnx.GraphProto.decode(t,t.uint32());break}case 3:{a.initializationBinding&&a.initializationBinding.length||(a.initializationBinding=[]),a.initializationBinding.push(A.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{a.updateBinding&&a.updateBinding.length||(a.updateBinding=[]),a.updateBinding.push(A.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=A.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=A.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=A.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=A.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof A.onnx.TrainingInfoProto)return t;var o=new A.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=A.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=A.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=A.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=A.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=A.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=A.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var a=0;a<t.initializationBinding.length;++a)i.initializationBinding[a]=A.onnx.StringStringEntryProto.toObject(t.initializationBinding[a],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var a=0;a<t.updateBinding.length;++a)i.updateBinding[a]=A.onnx.StringStringEntryProto.toObject(t.updateBinding[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e})(),r.ModelProto=(function(){function e(n){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.irVersion=D.Long?D.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=D.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=D.Long?D.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=D.emptyArray,e.prototype.trainingInfo=D.emptyArray,e.prototype.functions=D.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=it.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&A.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)A.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)A.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)A.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)A.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.ModelProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.irVersion=t.int64();break}case 8:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(A.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{a.producerName=t.string();break}case 3:{a.producerVersion=t.string();break}case 4:{a.domain=t.string();break}case 5:{a.modelVersion=t.int64();break}case 6:{a.docString=t.string();break}case 7:{a.graph=A.onnx.GraphProto.decode(t,t.uint32());break}case 14:{a.metadataProps&&a.metadataProps.length||(a.metadataProps=[]),a.metadataProps.push(A.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{a.trainingInfo&&a.trainingInfo.length||(a.trainingInfo=[]),a.trainingInfo.push(A.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{a.functions&&a.functions.length||(a.functions=[]),a.functions.push(A.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!D.isInteger(t.irVersion)&&!(t.irVersion&&D.isInteger(t.irVersion.low)&&D.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=A.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!D.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!D.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!D.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!D.isInteger(t.modelVersion)&&!(t.modelVersion&&D.isInteger(t.modelVersion.low)&&D.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!D.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=A.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=A.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=A.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=A.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof A.onnx.ModelProto)return t;var o=new A.onnx.ModelProto;if(t.irVersion!=null&&(D.Long?(o.irVersion=D.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new D.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=A.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(D.Long?(o.modelVersion=D.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new D.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=A.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=A.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=A.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=A.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(D.Long){var a=new D.Long(0,0,!1);i.irVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",D.Long){var a=new D.Long(0,0,!1);i.modelVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?D.Long.prototype.toString.call(t.irVersion):o.longs===Number?new D.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?D.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new D.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=A.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=A.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var s=0;s<t.metadataProps.length;++s)i.metadataProps[s]=A.onnx.StringStringEntryProto.toObject(t.metadataProps[s],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var s=0;s<t.trainingInfo.length;++s)i.trainingInfo[s]=A.onnx.TrainingInfoProto.toObject(t.trainingInfo[s],o)}if(t.functions&&t.functions.length){i.functions=[];for(var s=0;s<t.functions.length;++s)i.functions[s]=A.onnx.FunctionProto.toObject(t.functions[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e})(),r.StringStringEntryProto=(function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=it.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.StringStringEntryProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.key=t.string();break}case 2:{a.value=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!D.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!D.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof A.onnx.StringStringEntryProto)return t;var o=new A.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e})(),r.TensorAnnotation=(function(){function e(n){if(this.quantParameterTensorNames=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=D.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=it.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)A.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.TensorAnnotation;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.tensorName=t.string();break}case 2:{a.quantParameterTensorNames&&a.quantParameterTensorNames.length||(a.quantParameterTensorNames=[]),a.quantParameterTensorNames.push(A.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!D.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=A.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof A.onnx.TensorAnnotation)return t;var o=new A.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=A.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var a=0;a<t.quantParameterTensorNames.length;++a)i.quantParameterTensorNames[a]=A.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e})(),r.GraphProto=(function(){function e(n){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.node=D.emptyArray,e.prototype.name="",e.prototype.initializer=D.emptyArray,e.prototype.sparseInitializer=D.emptyArray,e.prototype.docString="",e.prototype.input=D.emptyArray,e.prototype.output=D.emptyArray,e.prototype.valueInfo=D.emptyArray,e.prototype.quantizationAnnotation=D.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=it.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)A.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)A.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)A.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)A.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)A.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)A.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)A.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.GraphProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.node&&a.node.length||(a.node=[]),a.node.push(A.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{a.name=t.string();break}case 5:{a.initializer&&a.initializer.length||(a.initializer=[]),a.initializer.push(A.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{a.sparseInitializer&&a.sparseInitializer.length||(a.sparseInitializer=[]),a.sparseInitializer.push(A.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{a.docString=t.string();break}case 11:{a.input&&a.input.length||(a.input=[]),a.input.push(A.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{a.output&&a.output.length||(a.output=[]),a.output.push(A.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{a.valueInfo&&a.valueInfo.length||(a.valueInfo=[]),a.valueInfo.push(A.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{a.quantizationAnnotation&&a.quantizationAnnotation.length||(a.quantizationAnnotation=[]),a.quantizationAnnotation.push(A.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=A.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!D.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=A.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=A.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!D.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=A.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=A.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=A.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=A.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof A.onnx.GraphProto)return t;var o=new A.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=A.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=A.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=A.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=A.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=A.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=A.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=A.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=A.onnx.NodeProto.toObject(t.node[a],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var a=0;a<t.initializer.length;++a)i.initializer[a]=A.onnx.TensorProto.toObject(t.initializer[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=A.onnx.ValueInfoProto.toObject(t.input[a],o)}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=A.onnx.ValueInfoProto.toObject(t.output[a],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var a=0;a<t.valueInfo.length;++a)i.valueInfo[a]=A.onnx.ValueInfoProto.toObject(t.valueInfo[a],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var a=0;a<t.quantizationAnnotation.length;++a)i.quantizationAnnotation[a]=A.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[a],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var a=0;a<t.sparseInitializer.length;++a)i.sparseInitializer[a]=A.onnx.SparseTensorProto.toObject(t.sparseInitializer[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e})(),r.TensorProto=(function(){function e(n){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dims=D.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=D.emptyArray,e.prototype.int32Data=D.emptyArray,e.prototype.stringData=D.emptyArray,e.prototype.int64Data=D.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=D.newBuffer([]),e.prototype.externalData=D.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=D.emptyArray,e.prototype.uint64Data=D.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=it.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&A.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)A.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.TensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}case 2:{a.dataType=t.int32();break}case 3:{a.segment=A.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(a.floatData&&a.floatData.length||(a.floatData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floatData.push(t.float());else a.floatData.push(t.float());break}case 5:{if(a.int32Data&&a.int32Data.length||(a.int32Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int32Data.push(t.int32());else a.int32Data.push(t.int32());break}case 6:{a.stringData&&a.stringData.length||(a.stringData=[]),a.stringData.push(t.bytes());break}case 7:{if(a.int64Data&&a.int64Data.length||(a.int64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int64Data.push(t.int64());else a.int64Data.push(t.int64());break}case 8:{a.name=t.string();break}case 12:{a.docString=t.string();break}case 9:{a.rawData=t.bytes();break}case 13:{a.externalData&&a.externalData.length||(a.externalData=[]),a.externalData.push(A.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{a.dataLocation=t.int32();break}case 10:{if(a.doubleData&&a.doubleData.length||(a.doubleData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.doubleData.push(t.double());else a.doubleData.push(t.double());break}case 11:{if(a.uint64Data&&a.uint64Data.length||(a.uint64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.uint64Data.push(t.uint64());else a.uint64Data.push(t.uint64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!D.isInteger(t.dims[o])&&!(t.dims[o]&&D.isInteger(t.dims[o].low)&&D.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!D.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=A.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!D.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||D.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!D.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&D.isInteger(t.int64Data[o].low)&&D.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!D.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!D.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||D.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=A.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!D.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&D.isInteger(t.uint64Data[o].low)&&D.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof A.onnx.TensorProto)return t;var o=new A.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)D.Long?(o.dims[i]=D.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new D.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=A.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?D.base64.decode(t.stringData[i],o.stringData[i]=D.newBuffer(D.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)D.Long?(o.int64Data[i]=D.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new D.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?D.base64.decode(t.rawData,o.rawData=D.newBuffer(D.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=A.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)D.Long?(o.uint64Data[i]=D.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new D.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=D.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?D.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new D.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=A.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var a=0;a<t.floatData.length;++a)i.floatData[a]=o.json&&!isFinite(t.floatData[a])?String(t.floatData[a]):t.floatData[a]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var a=0;a<t.int32Data.length;++a)i.int32Data[a]=t.int32Data[a]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var a=0;a<t.stringData.length;++a)i.stringData[a]=o.bytes===String?D.base64.encode(t.stringData[a],0,t.stringData[a].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[a]):t.stringData[a]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var a=0;a<t.int64Data.length;++a)typeof t.int64Data[a]=="number"?i.int64Data[a]=o.longs===String?String(t.int64Data[a]):t.int64Data[a]:i.int64Data[a]=o.longs===String?D.Long.prototype.toString.call(t.int64Data[a]):o.longs===Number?new D.LongBits(t.int64Data[a].low>>>0,t.int64Data[a].high>>>0).toNumber():t.int64Data[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?D.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var a=0;a<t.doubleData.length;++a)i.doubleData[a]=o.json&&!isFinite(t.doubleData[a])?String(t.doubleData[a]):t.doubleData[a]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var a=0;a<t.uint64Data.length;++a)typeof t.uint64Data[a]=="number"?i.uint64Data[a]=o.longs===String?String(t.uint64Data[a]):t.uint64Data[a]:i.uint64Data[a]=o.longs===String?D.Long.prototype.toString.call(t.uint64Data[a]):o.longs===Number?new D.LongBits(t.uint64Data[a].low>>>0,t.uint64Data[a].high>>>0).toNumber(!0):t.uint64Data[a]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var a=0;a<t.externalData.length;++a)i.externalData[a]=A.onnx.StringStringEntryProto.toObject(t.externalData[a],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?A.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:A.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=(function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="UINT8"]=2,t[n[3]="INT8"]=3,t[n[4]="UINT16"]=4,t[n[5]="INT16"]=5,t[n[6]="INT32"]=6,t[n[7]="INT64"]=7,t[n[8]="STRING"]=8,t[n[9]="BOOL"]=9,t[n[10]="FLOAT16"]=10,t[n[11]="DOUBLE"]=11,t[n[12]="UINT32"]=12,t[n[13]="UINT64"]=13,t[n[14]="COMPLEX64"]=14,t[n[15]="COMPLEX128"]=15,t[n[16]="BFLOAT16"]=16,t[n[17]="FLOAT8E4M3FN"]=17,t[n[18]="FLOAT8E4M3FNUZ"]=18,t[n[19]="FLOAT8E5M2"]=19,t[n[20]="FLOAT8E5M2FNUZ"]=20,t})(),e.Segment=(function(){function n(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return n.prototype.begin=D.Long?D.Long.fromBits(0,0,!1):0,n.prototype.end=D.Long?D.Long.fromBits(0,0,!1):0,n.create=function(o){return new n(o)},n.encode=function(o,i){return i||(i=it.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},n.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},n.decode=function(o,i){o instanceof Y||(o=Y.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new A.onnx.TensorProto.Segment;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.begin=o.int64();break}case 2:{s.end=o.int64();break}default:o.skipType(u&7);break}}return s},n.decodeDelimited=function(o){return o instanceof Y||(o=new Y(o)),this.decode(o,o.uint32())},n.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!D.isInteger(o.begin)&&!(o.begin&&D.isInteger(o.begin.low)&&D.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!D.isInteger(o.end)&&!(o.end&&D.isInteger(o.end.low)&&D.isInteger(o.end.high))?"end: integer|Long expected":null},n.fromObject=function(o){if(o instanceof A.onnx.TensorProto.Segment)return o;var i=new A.onnx.TensorProto.Segment;return o.begin!=null&&(D.Long?(i.begin=D.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new D.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(D.Long?(i.end=D.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new D.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},n.toObject=function(o,i){i||(i={});var a={};if(i.defaults){if(D.Long){var s=new D.Long(0,0,!1);a.begin=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.begin=i.longs===String?"0":0;if(D.Long){var s=new D.Long(0,0,!1);a.end=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?a.begin=i.longs===String?String(o.begin):o.begin:a.begin=i.longs===String?D.Long.prototype.toString.call(o.begin):i.longs===Number?new D.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?a.end=i.longs===String?String(o.end):o.end:a.end=i.longs===String?D.Long.prototype.toString.call(o.end):i.longs===Number?new D.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),a},n.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},n.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},n})(),e.DataLocation=(function(){var n={},t=Object.create(n);return t[n[0]="DEFAULT"]=0,t[n[1]="EXTERNAL"]=1,t})(),e})(),r.SparseTensorProto=(function(){function e(n){if(this.dims=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=D.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=it.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&A.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&A.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.SparseTensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.values=A.onnx.TensorProto.decode(t,t.uint32());break}case 2:{a.indices=A.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=A.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=A.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!D.isInteger(t.dims[i])&&!(t.dims[i]&&D.isInteger(t.dims[i].low)&&D.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof A.onnx.SparseTensorProto)return t;var o=new A.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=A.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=A.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)D.Long?(o.dims[i]=D.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new D.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=A.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=A.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?D.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new D.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e})(),r.TensorShapeProto=(function(){function e(n){if(this.dim=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dim=D.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=it.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)A.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.TensorShapeProto;t.pos<i;){var s=t.uint32();s>>>3===1?(a.dim&&a.dim.length||(a.dim=[]),a.dim.push(A.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()))):t.skipType(s&7)}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=A.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof A.onnx.TensorShapeProto)return t;var o=new A.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=A.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var a=0;a<t.dim.length;++a)i.dim[a]=A.onnx.TensorShapeProto.Dimension.toObject(t.dim[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=(function(){function n(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}n.prototype.dimValue=null,n.prototype.dimParam=null,n.prototype.denotation="";var t;return Object.defineProperty(n.prototype,"value",{get:D.oneOfGetter(t=["dimValue","dimParam"]),set:D.oneOfSetter(t)}),n.create=function(i){return new n(i)},n.encode=function(i,a){return a||(a=it.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&a.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&a.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(26).string(i.denotation),a},n.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},n.decode=function(i,a){i instanceof Y||(i=Y.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TensorShapeProto.Dimension;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},n.decodeDelimited=function(i){return i instanceof Y||(i=new Y(i)),this.decode(i,i.uint32())},n.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(a.value=1,!D.isInteger(i.dimValue)&&!(i.dimValue&&D.isInteger(i.dimValue.low)&&D.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(a.value===1)return"value: multiple values";if(a.value=1,!D.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!D.isString(i.denotation)?"denotation: string expected":null},n.fromObject=function(i){if(i instanceof A.onnx.TensorShapeProto.Dimension)return i;var a=new A.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(D.Long?(a.dimValue=D.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?a.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?a.dimValue=i.dimValue:typeof i.dimValue=="object"&&(a.dimValue=new D.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(a.dimParam=String(i.dimParam)),i.denotation!=null&&(a.denotation=String(i.denotation)),a},n.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?s.dimValue=a.longs===String?String(i.dimValue):i.dimValue:s.dimValue=a.longs===String?D.Long.prototype.toString.call(i.dimValue):a.longs===Number?new D.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,a.oneofs&&(s.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(s.dimParam=i.dimParam,a.oneofs&&(s.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(s.denotation=i.denotation),s},n.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},n.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},n})(),e})(),r.TypeProto=(function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var n;return Object.defineProperty(e.prototype,"value",{get:D.oneOfGetter(n=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:D.oneOfSetter(n)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=it.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&A.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&A.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&A.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&A.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&A.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof Y||(o=Y.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new A.onnx.TypeProto;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.tensorType=A.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{s.sequenceType=A.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{s.mapType=A.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{s.optionalType=A.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{s.sparseTensorType=A.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{s.denotation=o.string();break}default:o.skipType(u&7);break}}return s},e.decodeDelimited=function(o){return o instanceof Y||(o=new Y(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var a=A.onnx.TypeProto.Tensor.verify(o.tensorType);if(a)return"tensorType."+a}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=A.onnx.TypeProto.Sequence.verify(o.sequenceType);if(a)return"sequenceType."+a}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=A.onnx.TypeProto.Map.verify(o.mapType);if(a)return"mapType."+a}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=A.onnx.TypeProto.Optional.verify(o.optionalType);if(a)return"optionalType."+a}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=A.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(a)return"sparseTensorType."+a}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!D.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof A.onnx.TypeProto)return o;var i=new A.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=A.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=A.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=A.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=A.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=A.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var a={};return i.defaults&&(a.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(a.tensorType=A.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(a.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(a.sequenceType=A.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(a.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(a.mapType=A.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(a.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(a.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(a.sparseTensorType=A.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(a.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(a.optionalType=A.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(a.value="optionalType")),a},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=(function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=it.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&A.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof Y||(i=Y.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TypeProto.Tensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=A.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof Y||(i=new Y(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!D.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=A.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof A.onnx.TypeProto.Tensor)return i;var a=new A.onnx.TypeProto.Tensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");a.shape=A.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=A.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t})(),e.Sequence=(function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=it.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&A.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof Y||(i=Y.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TypeProto.Sequence;i.pos<s;){var l=i.uint32();l>>>3===1?u.elemType=A.onnx.TypeProto.decode(i,i.uint32()):i.skipType(l&7)}return u},t.decodeDelimited=function(i){return i instanceof Y||(i=new Y(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=A.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof A.onnx.TypeProto.Sequence)return i;var a=new A.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");a.elemType=A.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=A.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t})(),e.Map=(function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=it.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&a.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&A.onnx.TypeProto.encode(i.valueType,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof Y||(i=Y.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TypeProto.Map;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=A.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof Y||(i=new Y(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!D.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var a=A.onnx.TypeProto.verify(i.valueType);if(a)return"valueType."+a}return null},t.fromObject=function(i){if(i instanceof A.onnx.TypeProto.Map)return i;var a=new A.onnx.TypeProto.Map;if(i.keyType!=null&&(a.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");a.valueType=A.onnx.TypeProto.fromObject(i.valueType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.keyType=0,s.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(s.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(s.valueType=A.onnx.TypeProto.toObject(i.valueType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t})(),e.Optional=(function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=it.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&A.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof Y||(i=Y.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TypeProto.Optional;i.pos<s;){var l=i.uint32();l>>>3===1?u.elemType=A.onnx.TypeProto.decode(i,i.uint32()):i.skipType(l&7)}return u},t.decodeDelimited=function(i){return i instanceof Y||(i=new Y(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=A.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof A.onnx.TypeProto.Optional)return i;var a=new A.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");a.elemType=A.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=A.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t})(),e.SparseTensor=(function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=it.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&A.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof Y||(i=Y.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TypeProto.SparseTensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=A.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof Y||(i=new Y(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!D.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=A.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof A.onnx.TypeProto.SparseTensor)return i;var a=new A.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");a.shape=A.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=A.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t})(),e})(),r.OperatorSetIdProto=(function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.domain="",e.prototype.version=D.Long?D.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=it.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.OperatorSetIdProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.domain=t.string();break}case 2:{a.version=t.int64();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!D.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!D.isInteger(t.version)&&!(t.version&&D.isInteger(t.version.low)&&D.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof A.onnx.OperatorSetIdProto)return t;var o=new A.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(D.Long?(o.version=D.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new D.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",D.Long){var a=new D.Long(0,0,!1);i.version=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?D.Long.prototype.toString.call(t.version):o.longs===Number?new D.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e})(),r.OperatorStatus=(function(){var e={},n=Object.create(e);return n[e[0]="EXPERIMENTAL"]=0,n[e[1]="STABLE"]=1,n})(),r.FunctionProto=(function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.input=D.emptyArray,e.prototype.output=D.emptyArray,e.prototype.attribute=D.emptyArray,e.prototype.attributeProto=D.emptyArray,e.prototype.node=D.emptyArray,e.prototype.docString="",e.prototype.opsetImport=D.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=it.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)A.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)A.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)A.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof Y||(t=Y.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.FunctionProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 4:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 5:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 6:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(t.string());break}case 11:{a.attributeProto&&a.attributeProto.length||(a.attributeProto=[]),a.attributeProto.push(A.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{a.node&&a.node.length||(a.node=[]),a.node.push(A.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{a.docString=t.string();break}case 9:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(A.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{a.domain=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof Y||(t=new Y(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!D.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!D.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!D.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!D.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=A.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=A.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!D.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=A.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!D.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof A.onnx.FunctionProto)return t;var o=new A.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=A.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=A.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=A.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=t.attribute[a]}if(t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=A.onnx.NodeProto.toObject(t.node[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=A.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var a=0;a<t.attributeProto.length;++a)i.attributeProto[a]=A.onnx.AttributeProto.toObject(t.attributeProto[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e})(),r})();Sm.exports=A});function io(r,e){if(!r)throw new Error(typeof e=="string"?e:e())}function Fo(r){return new TextDecoder().decode(r)}var Ke,kr,Ll,vt,Zi,yt,St,ie,Vo,Nr,Lr,Rr,Ve=N(()=>{"use strict";tu();Ke=we(oo());zr();kr=class{static arraysEqual(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}},Ll=class{static preprocessInputShapes(e,n){let t=e.length===1?[1,e[0]]:e,o=n.length===1?[n[0],1]:n;return[t,o]}static postprocessOutputShape(e,n,t){n===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},vt=class r{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let a=Math.max(e.length,n.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=Ll.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:n[i-u];if(l!==c&&l>1&&c>1)return;s[a-u]=Math.max(l,c)}return s}static index(e,n){let t=new Array(n.length);return r.fillIndex(e,n,t),t}static fillIndex(e,n,t){let o=e.length-n.length;for(let i=0;i<n.length;i++)t[i]=e[o+i]%n[i]}static calc(e,n,t,o,i){let a=r.calcShape(e.dims,n.dims);if(a){if(o&&!ie.areEqual(a,e.dims))return;let s=ie.size(a),u=o?e:new st(a,i||e.type);if(a.length===0)u.set([],t(e.get([]),n.get([])));else{let l=new Array(a.length),c=new Array(e.dims.length),p=new Array(n.dims.length),h=0,g=0,m=!1,_=!1;e.dims.length===0&&(h=e.get([]),m=!0),n.dims.length===0&&(g=n.get([]),_=!0);let S;for(let v=0;v<s;v++){S=v;for(let x=a.length-1;x>=0;x--)l[x]=S%a[x],S=Math.floor(S/a[x]);m||(r.fillIndex(l,e.dims,c),h=e.get(c)),_||(r.fillIndex(l,n.dims,p),g=n.get(p)),u.set(l,t(h,g))}}return u}}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}static getBroadcastDims(e,n){let t=e.length,o=[];for(let i=0;i<t;i++){let a=t-1-i,s=e[a]||1;(n[n.length-1-i]||1)>1&&s===1&&o.unshift(a)}return o}},Zi=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;n?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!vt.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},yt=class r{static tensorDataTypeFromProto(e){switch(e){case Ke.onnx.TensorProto.DataType.INT8:return"int8";case Ke.onnx.TensorProto.DataType.UINT8:return"uint8";case Ke.onnx.TensorProto.DataType.BOOL:return"bool";case Ke.onnx.TensorProto.DataType.INT16:return"int16";case Ke.onnx.TensorProto.DataType.UINT16:return"uint16";case Ke.onnx.TensorProto.DataType.INT32:return"int32";case Ke.onnx.TensorProto.DataType.UINT32:return"uint32";case Ke.onnx.TensorProto.DataType.FLOAT:return"float32";case Ke.onnx.TensorProto.DataType.DOUBLE:return"float64";case Ke.onnx.TensorProto.DataType.STRING:return"string";case Ke.onnx.TensorProto.DataType.INT64:return"int32";case Ke.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${Ke.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return Ke.onnx.TensorProto.DataType.INT8;case"uint8":return Ke.onnx.TensorProto.DataType.UINT8;case"bool":return Ke.onnx.TensorProto.DataType.BOOL;case"int16":return Ke.onnx.TensorProto.DataType.INT16;case"uint16":return Ke.onnx.TensorProto.DataType.UINT16;case"int32":return Ke.onnx.TensorProto.DataType.INT32;case"uint32":return Ke.onnx.TensorProto.DataType.UINT32;case"float32":return Ke.onnx.TensorProto.DataType.FLOAT;case"float64":return Ke.onnx.TensorProto.DataType.DOUBLE;case"string":return Ke.onnx.TensorProto.DataType.STRING;case"int64":return Ke.onnx.TensorProto.DataType.INT64;case"uint64":return Ke.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(n=>fr.isLong(n)?n.toNumber():n)}static tensorValueTypeFromProto(e){return{tensorType:r.tensorDataTypeFromProto(e.elemType),shape:{dims:r.tensorDimsFromProto(e.shape.dim.map(n=>n.dimValue))}}}static tensorDimsFromORTFormat(e){let n=[];for(let t=0;t<e.dimsLength();t++)n.push(St.longToNumber(e.dims(t)));return n}static tensorAttributesFromORTFormat(e){let n=[];for(let t=0;t<e.attributesLength();t++)n.push(e.attributes(t));return n}},St=class{static longToNumber(e){return fr.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return fr.isLong(e)||typeof e=="bigint"}},ie=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,n,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=n[i]*e[i];return o}static offsetToIndices(e,n){let t=n.length;if(t===0)return[];if(t===1)return[e*n[0]];let o=new Array(n.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/n[i]),e-=o[i]*n[i];return o[o.length-1]=e,o}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n))}static incrementIndex(e,n,t){if(n.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=n.length;else if(t<=0||t>n.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<n[o]));--o)e[o]=0}static calculateReshapedDims(e,n){if(n.length===0){if(e.length===0||r.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=n.length,o=new Array(t),i=-1,a=1;for(let u=0;u<t;u++){if(n[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(n[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(n[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=n[u];a*=o[u]}}let s=r.size(e);if(i!==-1){if(s%a!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${n}]`);o[i]=s/a}else if(a!==s)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let n=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);n*=t}return n}static flattenShape(e,n){n<0&&(n+=e.length);let t=e.reduce((a,s)=>a*s,1),o=e.slice(n).reduce((a,s)=>a*s,1);return[t/o,o]}static squeezeShape(e,n){let t=new Array;n=r.normalizeAxes(n,e.length);for(let o=0;o<e.length;o++){let i=n.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(n.length===0&&e[o]>1||n.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,n){let t=new Array(e.length+n.length);t.fill(0);for(let i=0;i<n.length;i++){let a=r.normalizeAxis(n[i],t.length);if(a>=t.length)throw new Error("'axes' has an out of range axis");if(t[a]!==0)throw new Error("'axes' has a duplicate axis");t[a]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},Vo=class r{static splitShape(e,n,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");r.determineSplit(e[n],o,t)}let i=[],a=[0];for(let s=0;s<t.length;++s){s!==0&&a.push(a[s-1]+t[s-1]);let u=e.slice();u[n]=t[s],i.push(u)}return[i,a]}static determineSplit(e,n,t){if(e%n!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<n;++o)t.push(e/n)}},Nr=class r{static adjustPoolAttributes(e,n,t,o,i,a){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<n.length-2;s++)s>=t.length?t.push(n[s+2]):t[s]=n[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<e.length-2;s++)r.adjustPadAndReturnShape(e[s+2],n[s],t[s],o[s],i,s,s+e.length-2,a)}}static computePoolOutputShape(e,n,t,o,i,a,s,u=0){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return r.computeShapeHelper(e,n,l,t,o,i,a,s,u),l}static computeConvOutputShape(e,n,t,o,i,a,s){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,n,t,o,i,a,s,u,l=0){if(e)for(let c=0;c<n.length-2;c++)t.push(1);else for(let c=0;c<n.length-2;c++)t.push(r.adjustPadAndReturnShape(n[c+2],o[c],i[c],a[c],s,c,c+n.length-2,u,l))}static computeOutputSize(e,n,t,o,i){let a=Math.floor(e/n)+1;return i===1&&(a=Math.ceil(e/n)+1,(a-1)*n>=t+o&&(a-=1)),a}static adjustPadAndReturnShape(e,n,t,o,i,a,s,u,l=0){let c=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,r.computeOutputSize(e-c,n,e,0,l);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=(Math.floor((e+n-1)/n)-1)*n+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(h+1)/2:h/2),i[s]=h-i[a],r.computeOutputSize(e+i[a]+i[s]-c,n,e,i[a],l)}default:throw new Error("Unsupported AutoPad type")}else return r.computeOutputSize(e+i[a]+i[s]-c,n,e,i[a],l)}},Lr=-34028234663852886e22,Rr=34028234663852886e22});function AA(r){switch(r){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${r}`)}}function $m(r){switch(r){case Ae.onnx.TensorProto.DataType.UINT8:case Ae.onnx.TensorProto.DataType.INT8:case Ae.onnx.TensorProto.DataType.BOOL:return 1;case Ae.onnx.TensorProto.DataType.UINT16:case Ae.onnx.TensorProto.DataType.INT16:return 2;case Ae.onnx.TensorProto.DataType.FLOAT:case Ae.onnx.TensorProto.DataType.INT32:case Ae.onnx.TensorProto.DataType.UINT32:return 4;case Ae.onnx.TensorProto.DataType.INT64:case Ae.onnx.TensorProto.DataType.DOUBLE:case Ae.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${Ae.onnx.TensorProto.DataType[r]}`)}}function OA(r,e){return new(Pm(e))(r)}function Pm(r){switch(r){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function Rl(r,e){if(e===Ae.onnx.TensorProto.DataType.INT64||e===No.TensorDataType.INT64){if(r.greaterThanOrEqual(2147483648)||r.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===Ae.onnx.TensorProto.DataType.UINT32||e===No.TensorDataType.UINT32||e===Ae.onnx.TensorProto.DataType.UINT64||e===No.TensorDataType.UINT64){if(r.greaterThanOrEqual(4294967296)||r.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${Ae.onnx.TensorProto.DataType[e]}`);return r.toNumber()}function Am(r,e,n){switch(e){case Ae.onnx.TensorProto.DataType.BOOL:case Ae.onnx.TensorProto.DataType.UINT8:return r.getUint8(n);case Ae.onnx.TensorProto.DataType.INT8:return r.getInt8(n);case Ae.onnx.TensorProto.DataType.UINT16:return r.getUint16(n,!0);case Ae.onnx.TensorProto.DataType.INT16:return r.getInt16(n,!0);case Ae.onnx.TensorProto.DataType.FLOAT:return r.getFloat32(n,!0);case Ae.onnx.TensorProto.DataType.INT32:return r.getInt32(n,!0);case Ae.onnx.TensorProto.DataType.UINT32:return r.getUint32(n,!0);case Ae.onnx.TensorProto.DataType.INT64:return Rl(fr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!1),e);case Ae.onnx.TensorProto.DataType.DOUBLE:return r.getFloat64(n,!0);case Ae.onnx.TensorProto.DataType.UINT64:return Rl(fr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${Ae.onnx.TensorProto.DataType[e]}`)}}var Om,Ae,st,zr=N(()=>{"use strict";Om=we(Gf());tu();Lo();Ae=we(oo());Ve();st=class r{constructor(e,n,t,o,i,a=Om.Guid.create()){this.dims=e;this.type=n;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=a;this.size=ie.validateDimsAndCalcSize(e);let s=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==s)throw new RangeError("Input dims doesn't match data length.");if(n==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(s))}else{if(i!==void 0){let l=Pm(n);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(s*AA(n));this.cache=OA(l,n)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[ie.indicesToOffset(e,this.strides)]}set(e,n){this.data[ie.indicesToOffset(e,this.strides)]=n}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=ie.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=yt.tensorDataTypeFromProto(e.dataType),t=yt.tensorDimsFromProto(e.dims),o=new r(t,n);if(n==="string")e.stringData.forEach((i,a)=>{o.data[a]=Fo(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,a=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),s=$m(e.dataType),u=e.rawData.byteLength/s;if(e.rawData.byteLength%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=Am(a,e.dataType,l*s);i[l]=c}}else{let i;switch(e.dataType){case Ae.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case Ae.onnx.TensorProto.DataType.INT32:case Ae.onnx.TensorProto.DataType.INT16:case Ae.onnx.TensorProto.DataType.UINT16:case Ae.onnx.TensorProto.DataType.INT8:case Ae.onnx.TensorProto.DataType.UINT8:case Ae.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case Ae.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case Ae.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case Ae.onnx.TensorProto.DataType.UINT32:case Ae.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let a=o.data;if(a.length!==i.length)throw new Error("array length mismatch");for(let s=0;s<i.length;s++){let u=i[s];fr.isLong(u)?a[s]=Rl(u,e.dataType):a[s]=u}}return o}static fromData(e,n,t){return new r(n,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=yt.tensorDimsFromORTFormat(e),t=yt.tensorDataTypeFromProto(e.dataType()),o=new r(n,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,a=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),s=$m(e.dataType()),u=e.rawDataLength()/s;if(e.rawDataLength()%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=Am(a,e.dataType(),l*s);i[l]=c}}return o}}});function de(r){return r===1?PA:EA}function Em(r){let e=de(r);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Cm(r){let e=de(r);return`${e.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${e.varyingFrag} vec2 TexCoords;
    ${e.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function Dm(r,e){let n=de(r);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var PA,EA,Je=N(()=>{"use strict";PA={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},EA={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var ke=N(()=>{"use strict"});async function zl(r,e=t=>0,n){return new Promise((t,o)=>{let i=0,a=()=>{if(r()){t();return}i++;let s=e(i);if(n!=null&&i>=n){o();return}setTimeout(a,s)};a()})}function Ji(r){return io(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)}function km(r){return io(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)+"AtOutCoords"}function ao(r,e){let n=JSON.parse(JSON.stringify(r));return n=e,n}function so(r,e){return e.map(n=>r[n]).join(", ")}function wt(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function Xt(r=6){return["x","y","z","w","u","v"].slice(0,r)}var zn=N(()=>{"use strict";Ve()});function CA(r,e){return Xt(e).map(n=>`${r}.${n}`)}function uo(r,e){return e===1?[r]:CA(r,e)}function Mn(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var Mr=N(()=>{"use strict";zn()});function kA(r,e,n){if(r===0)return"false";if(r===1)return`rc > ${e[0]}`;let t="";for(let o=r-2;o<r;o++)t+=`${n[o]} >= ${e[o-r+2]}`,o<r-1&&(t+="||");return t}function NA(r,e){let n=r.length;if(n===0)return"getA(), 0, 0, 0";if(n===1)return`getA(rc),
            rc + 1 >= ${r[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",a="rp1, cp1",s="";if(n>2)for(let u=0;u<n-2;++u)s=s+`${e[u]},`;return`getA(${s}${t}),
          rEdge ? 0. : getA(${s}${i}),
          cEdge ? 0. : getA(${s}${o}),
          rEdge || cEdge ? 0. : getA(${s}${a})`}function LA(r,e,n,t){return r===0||r===1?"":`
    int r = ${e[r-2]};
    int c = ${e[r-1]};
    int rp1 = ${e[r-2]} + 1;
    int cp1 = ${e[r-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${n};
    `}var Nm,DA,Lm,Rm=N(()=>{"use strict";Je();ke();zn();Mr();Nm={name:"pack",inputNames:["A"],inputTypes:[1]},DA=(r,e)=>{let n=de(r.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,a=wt(i),s=uo("rc",i),u=LA(i,s,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let c=kA(i,l,s),p=NA(t,s),h=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${c}) {
            ${n.output} = vec4(0);
          } else {
            ${u}

            ${n.output} = vec4(${p});
          }
        }
      `;return{...Nm,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:h}},Lm=(r,e)=>({...Nm,get:()=>DA(r,e)})});function Ml(r){if(r.length===0)return[1,1,1];let e=1;for(let n=0;n<r.length-2;++n)e*=r[n];return[e,r.length>1?r[r.length-2]:1,r[r.length-1]]}function Mm(r,e){let n=!1;return r.length===0||e.length===0?n=!0:r.length<2||e.length<2?n=r[r.length-1]===e[e.length-1]:n=r[r.length-1]===e[e.length-1]&&r[r.length-2]===e[e.length-2],n}function MA(r){let e=ie.computeStrides(r),n=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,a)=>{let s=`int ${n[a]} = ${t} / ${i}`,u=a===e.length-1?`int ${n[a+1]} = ${t} - ${n[a]} * ${i}`:`index -= ${n[a]} * ${i}`;return`${s}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function BA(r){let e=ie.computeStrides(r);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var RA,zA,zm,Bm=N(()=>{"use strict";Ve();Je();ke();Mr();RA=r=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${r}`}),zA=(r,e,n,t)=>{let o=e.dims,i=t,a="";for(let l=0;l<4;l++){let c="";switch(l){case 0:c="outputCoords = rc;";break;case 1:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:c="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}a+=`
        ${c}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let s=de(r.session.backend.glContext.version),u=`
      ${MA(o)}
      ${BA(i)}
      ${Mn()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${a}
        ${s.output} = result;
      }
    `;return{...n,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},zm=(r,e,n)=>{let t=RA(n);return{...t,get:()=>zA(r,e,t,n)}}});var Bl,Vm=N(()=>{"use strict";Je();ke();Bl=(r,e)=>{let n=e.shape,t=de(r.session.backend.glContext.version),o=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${t.texture2D}(X,TexCoords).r;
      ${t.output} = encodeAsUint8(value);
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return r.executeProgram(i,[e.tensor])}});function FA(r,e){if(r===1)return"rc";let n="";for(let t=0;t<r;t++)n+=e[t],t<r-1&&(n+=",");return n}var Fm,VA,Gm,Um=N(()=>{"use strict";Je();ke();zn();Mr();Fm={name:"unpack",inputNames:["A"],inputTypes:[2]},VA=(r,e)=>{let n=e.dims.length,t=uo("rc",n),o=t.slice(-2),i=wt(n),a=Mn(),u=e.dims.length===0?"":FA(n,t),l=n<=1?"rc":`vec2(${o.join(",")})`,c=de(r.session.backend.glContext.version),p=`
    ${a}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${c.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Fm,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:p}},Gm=(r,e)=>({...Fm,get:()=>VA(r,e)})});var Yi,Go,Qi,Uo=N(()=>{"use strict";Dt();Yi=class{constructor(e,n=1){if(n===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){let t,o;return e.constructor!==Float32Array&&(Fe.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),n*this.channelSize>e.length?(Fe.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(n*this.channelSize),o.forEach((i,a)=>t[a]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Go=class{constructor(e,n=1,t){if(n!==1&&n!==4)throw new Error(`Invalid number of channels: ${n}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=n,this.textureType=t||e.FLOAT}encode(e,n){let t=e;return this.channelSize===1&&(Fe.verbose("Encoder","Exploding into a larger array"),t=this.allocate(n),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Qi=class{constructor(e,n=1){this.channelSize=4;if(n===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,n){if(e instanceof Uint8Array)return e.subarray(0,n);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Wo,Wm,Vl,Hm=N(()=>{"use strict";Ve();ke();Wo=(r,e,n)=>{let t=n===0||n===1?1:4,o=n===2,i=n===1||n===2,a=n===4?e.length-1:void 0,s=n===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return Vl(r,e,t,s,{isPacked:o,reverseWH:i,breakAxis:a})},Wm=(r,e,n)=>{let t=Wo(r,e,n);return[t.width,t.height]},Vl=(r,e,n=1,t,o)=>{let i=!!(o&&o.isPacked),[a,s]=r.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),n===1)t=e;else if(i){if(n!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:n,isPacked:i,shape:l,strides:ie.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var UA,ea,jm=N(()=>{"use strict";Dt();zr();Ve();Rm();Bm();Vm();Um();Uo();Hm();ke();UA=(r,e)=>{let n=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=r.name;return r.cacheHint&&(t+="["+r.cacheHint+"]"),t+=":"+n,t},ea=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,n){return Wm(this.session.layoutStrategy,e,n)}executeProgram(e,n){if(n.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(n[l],e.inputTypes[l]);let o=UA(e,t),i=this.session.programManager.getArtifact(o),a=i?i.programInfo:typeof e.get=="function"?e.get():e,s=Wo(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return i||(i=this.session.programManager.build(a,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,n){return this.executeProgram(e,n).tensor}runProgram(e,n,t){for(let o=0;o<n.length;++o)if(!!n[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,n,t)}getOrCreateTextureData(e,n){let t=this.getTextureData(e.dataId,n===2);if(!t&&(t=this.getTextureData(e.dataId,n!==2),t))return n===2?this.pack(t):this.unpack(t);if(!t){let o=Wo(this.session.layoutStrategy,e.dims,n);if(n===4){let s=e.dims;if(s.length===4){let u=[s[0],Math.ceil(s[1]*s[2]*s[3]/4)],l=Wo(this.session.layoutStrategy,u,n),c=e.numberData;if(s[1]*s[2]*s[3]%4!==0){let p=s[0],h=s[1]*s[2]*s[3],g=Math.ceil(h*1/4)*4,m=p*g;c=new Float32Array(m);for(let _=0;_<p;++_){let S=_*h,v=_*g+_%1*h;c.set(e.numberData.subarray(S,S+h),v)}}return this.createTextureData(l,e.type,c,e,1)}}if(n===2){let i=Vl(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),a=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(a)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,n,t,o){return this.createTextureData(e,n,t,o,1)}createTextureData(e,n,t,o,i){Fe.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(n,e,t,i);return this.createTextureDataFromTexture(e,n,a,o)}reshapeUnpacked(e,n){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:ie.computeStrides(n),unpackedShape:n};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,n){let t=this.getOrCreateTextureData(e,2);if(Mm(e.dims,n)){let l={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:ie.computeStrides(n),unpackedShape:n,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=Ml(e.dims),i=Ml(n),a=this.reshapePacked(e,o),s=this.run(zm(this,a,i),[a]);return this.reshapePacked(s,n)}cast(e,n){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,n,t.texture).tensor}createTextureDataFromTexture(e,n,t,o,i){let a={...e,tensor:o||new st(e.unpackedShape,n,s=>this.readTexture(a),async s=>this.readTextureAsync(a),void 0,i),texture:t};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,n=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,n):n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,n,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,n)}isTextureLayoutCached(e,n=!1){return!!this.getTextureData(e.dataId,n)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Bl(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Bl(this,e))}pack(e){return this.executeProgram(Lm(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Gm(this,e.tensor),[e.tensor])}}});var Fl,Se,mt=N(()=>{"use strict";Fl=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Se=r=>new Fl(r)});var Km,Xm,Zm,WA,HA,Jm=N(()=>{"use strict";mt();Je();ke();Km={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},Xm=(r,e,n)=>(HA(e),[r.run({...Km,cacheHint:n.cacheKey,get:()=>WA(r,e,n)},e)]),Zm=r=>{let e=r.attributes.getFloat("epsilon",1e-5),n=r.attributes.getFloat("momentum",.9),t=r.attributes.getInt("spatial",1);return Se({epsilon:e,momentum:n,spatial:t})},WA=(r,e,n)=>{let t=de(r.session.backend.glContext.version),o=e[0].dims.length,[i,a]=r.calculateTextureWidthAndHeight(e[1].dims,0),s=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${a});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...Km,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:s}},HA=r=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=r[0],n=r[1],t=r[2],o=r[3],i=r[4];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var ta,Vt,ee,Ho,na,Yn=N(()=>{"use strict";ta=class{constructor(e,n,t,o){this.glContext=e;this.programInfo=n;this.inputTextureLayouts=t;this.outputTextureLayout=o}},Vt=class{constructor(e){this.context=e}},ee=class{constructor(e,n){this.routineBody=e;this.dependencies=n}},Ho=class{constructor(e,n,t){this.name=e;t?this.dependencies=t:this.dependencies=[],n&&(this.routineBody=n)}addDependency(e){e&&this.dependencies.push(e)}},na=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let n=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,n,t,o),o}static createOrderedNodes(e,n,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],n,t,o)}static dfsTraverse(e,n,t,o){if(!e||t.has(e.name))return;if(n.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");n.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let a=0;a<i.length;++a)this.dfsTraverse(i[a],n,t,o);o.push(e),t.add(e.name),n.delete(e.name)}}});function jA(){let r="add_";return{body:`
  float ${r}(float a, float b) {
    return a + b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:r,type:0}}function KA(){let r="div_";return{body:`
  float ${r}(float a, float b) {
    return a / b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:r,type:0}}function XA(){let r="mul_";return{body:`
  float ${r}(float a, float b) {
    return a * b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:r,type:0}}function ZA(){let r="sub_";return{body:`
  float ${r}(float a, float b) {
    return a - b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:r,type:0}}function JA(){let r="equal_";return{body:`
  float ${r}(float a, float b) {
    return float(a == b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:r,type:0}}function YA(){let r="greater_";return{body:`
  float ${r}(float a, float b) {
    return float(a > b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:r,type:0}}function QA(){let r="less_";return{body:`
  float ${r}(float a, float b) {
    return float(a < b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:r,type:0}}function eO(){let r="and_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:r,type:0}}function tO(){return{body:`
  float or_(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 or_(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:"or_",type:0}}function nO(){let r="xor_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:r,type:0}}function rO(){return iO("pow")}function oO(){let r="prelu_";return{body:`
  float ${r}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:r,type:0}}function iO(r){let e=`${r}_`;return{body:`
  float ${e}(float a, float b) {
    return ${r}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${r}(v1, v2);
  }
  `,name:e,type:0}}var Ft,aO,Ym,Qm,eg,tg,ng,rg,og,ig,ag,sg,ug,lg,cg=N(()=>{"use strict";Ve();Yn();Je();ke();Ft=(r,e,n,t=e[0].type,o)=>{let i=r.session.pack?2:0;return{name:n.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>aO(r,e,n,t)}},aO=(r,e,n,t=e[0].type)=>{let o=r.session.pack?2:0,i=!ie.areEqual(e[0].dims,e[1].dims),a=e[0].dims,s=r.session.pack;if(i){let c=vt.calcShape(e[0].dims,e[1].dims,!1);if(!c)throw new Error("Can't perform binary op on the given tensors");a=c;let p=a.length,h=e[0].dims.length!==0?e[0].dims.length:1,g=e[1].dims.length!==0?e[1].dims.length:1,m=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",_=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",S=de(r.session.backend.glContext.version),v=s?`
      ${n.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${n.name}(a, b);
        ${S.output} = result;
      }`:`
      ${n.body}
      float process(int indices[${p}]) {
        int aindices[${h}];
        int bindices[${g}];
        ${m}
        ${_}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:t,textureType:o},shaderSource:v,hasMain:s}}let u=de(r.session.backend.glContext.version),l=`
    ${n.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},Ym=(r,e)=>[r.run(Ft(r,e,jA()),e)],Qm=(r,e)=>[r.run(Ft(r,e,eO(),"bool"),e)],eg=(r,e)=>[r.run(Ft(r,e,KA()),e)],tg=(r,e)=>[r.run(Ft(r,e,JA(),"bool"),e)],ng=(r,e)=>[r.run(Ft(r,e,YA(),"bool"),e)],rg=(r,e)=>[r.run(Ft(r,e,QA(),"bool"),e)],og=(r,e)=>[r.run(Ft(r,e,XA()),e)],ig=(r,e)=>[r.run(Ft(r,e,tO(),"bool"),e)],ag=(r,e)=>[r.run(Ft(r,e,rO()),e)],sg=(r,e)=>[r.run(Ft(r,e,oO()),e)],ug=(r,e)=>[r.run(Ft(r,e,ZA()),e)],lg=(r,e)=>[r.run(Ft(r,e,nO(),"bool"),e)]});var dg,pg,uO,fg=N(()=>{"use strict";Ve();dg=(r,e,n)=>(uO(e),[r.cast(e[0],n)]),pg=r=>yt.tensorDataTypeFromProto(r.attributes.getInt("to")),uO=r=>{if(!r||r.length!==1)throw new Error("Cast requires 1 input.");if(r[0].type==="string")throw new Error("Invalid input type.")}});var lO,cO,hg,ra,mg=N(()=>{"use strict";Je();ke();zn();Mr();lO=(r,e)=>({name:"Concat (packed)",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(2),cacheHint:e}),cO=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let P=1;P<n.length;P++){let C=n[P].dims.slice();for(let R=0;R<o.length;R++)if(R===t)i[t]+=C[R];else if(o[R]!==C[R])throw new Error("non concat dimensions must match")}let a=i.length,s=uo("coords",a),u=wt(a),l=Mn(),c=n.map(P=>P.dims),p=Xt(a),h=new Array(c.length-1);h[0]=c[0][t];for(let P=1;P<h.length;P++)h[P]=h[P-1]+c[P][t];let g=p[t],m=p.slice(-2),_=p.join(),S=`if (${g} < ${h[0]}) {
        return getChannel(
            getX0(${_}), vec2(${m.join()}));
        }`;for(let P=1;P<h.length;P++){let C=h[P-1];S+=`
            if (${g} < ${h[P]}  && ${g} >= ${h[P-1]}) {
              return getChannel(
                getX${P}(${ra(p,g,C)}),
                vec2(${ra(m,g,C)}));
            }`}let v=h.length,x=h[h.length-1];S+=`
            return getChannel(
              getX${v}(${ra(p,g,x)}),
              vec2(${ra(m,g,x)}));`;let $=de(r.session.backend.glContext.version),O=`
          ${l}
          float getValue(${p.map(P=>"int "+P)}) {
            ${S}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${p[a-1]};
            coords.${p[a-1]} = coords.${p[a-2]};
            coords.${p[a-2]} = lastDim;

            vec4 result = vec4(getValue(${s}), 0., 0., 0.);

            ${s[a-1]} = ${s[a-1]} + 1;
            if (${s[a-1]} < ${i[a-1]}) {
              result.g = getValue(${s});
            }

            ${s[a-2]} = ${s[a-2]} + 1;
            if (${s[a-2]} < ${i[a-2]}) {
              result.a = getValue(${s});
            }

            ${s[a-1]} = ${s[a-1]} - 1;
            if (${s[a-2]} < ${i[a-2]} &&
                ${s[a-1]} < ${i[a-1]}) {
              result.b = getValue(${s});
            }
            ${$.output} = result;
          }
        `;return{...e,output:{dims:i,type:n[0].type,textureType:2},shaderSource:O,hasMain:!0}},hg=(r,e,n)=>{let t=lO(e.length,n.cacheKey);return{...t,get:()=>cO(r,t,e,n.axis)}},ra=(r,e,n)=>{let t=r.indexOf(e);return r.map((i,a)=>a===t?`${i} - ${n}`:i).join()}});var gg,dO,pO,fO,bg,hO,mO,gO,yg,bO,_g=N(()=>{"use strict";mt();ke();mg();gg=(r,e,n)=>(bO(e),r.session.pack&&e[0].dims.length>1?[r.run(hg(r,e,n),e)]:[r.run(fO(r,e,n),e)]),dO=(r,e)=>({name:"Concat",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(0),cacheHint:e}),pO=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let g=1;g<n.length;g++){let m=n[g].dims.slice();for(let _=0;_<o.length;_++)if(_===t)i[t]+=m[_];else if(o[_]!==m[_])throw new Error("non concat dimensions must match")}let a=i.length,s=new Array(n.length),u=0;for(let g=0;g<s.length;++g)u+=n[g].dims[t],s[g]=u;let l="";n.length<5?l=bg(s):l=hO(s);let c=mO(n.length,a),p=gO(s),h=`
        ${c}
        ${p}
        ${l}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:h}},fO=(r,e,n)=>{let t=dO(e.length,n.cacheKey);return{...t,get:()=>pO(r,t,e,n.axis)}},bg=r=>`int getTextureWhereDataResides(int index) {
      ${r.map((n,t)=>`if(index<${n}) {return ${t};}
`).join("")}
    }`,hO=r=>bg(r),mO=(r,e)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<r;++t)t===0?n.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===r-1?n.push(`	else { return _X${t}(indices); }`):n.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return n.push("	}"),n.join(`
`)},gO=r=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<r.length;++n)n===0?e.push(`	if (index == ${n}) { return ${r[n]}; }`):n===r.length-1?e.push(`	else { return ${r[n]}; }`):e.push(`	else if (index == ${n}) { return ${r[n]}; }`);return e.push("	}"),e.join(`
`)},yg=r=>Se({axis:r.attributes.getInt("axis")}),bO=r=>{if(!r||r.length<1)throw new Error("too few inputs");let e=r[0].type,n=r[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of r){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==n)throw new Error("input tensors should have the same shape")}}});function yO(){return Gt("abs")}function _O(){return Gt("acos")}function vO(){return Gt("asin")}function wO(){return Gt("atan")}function xO(){return Gt("ceil")}function TO(){return Gt("cos")}function IO(r){return{body:`
  const float alpha = float(${r});

  float elu_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 elu_(vec4 v) {
    return vec4(elu_(v.x), elu_(v.y), elu_(v.z), elu_(v.w));
  }
  `,name:"elu",type:0}}function SO(){return Gt("exp")}function $O(){return Gt("floor")}function Gl(r,e){let n="clip";return{body:`
  const float min = float(${r});
  const float max = float(${e});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function AO(){let r="indentity";return{body:`
  float ${r}_(float a) {
    return a;
  }
  vec4 ${r}_(vec4 v) {
    return v;
  }
  `,name:r,type:0}}function OO(r){let e="leakyRelu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function PO(){return Gt("log")}function EO(){return{body:`
  float neg_(float a) {
    return -a;
  }
  vec4 neg_(vec4 v) {
    return -v;
  }
  `,name:"neg",type:0}}function CO(){return{body:`
  float not_(float a) {
    return float( ! bool(a) );
  }
  bool not_(bool a) {
    return !a;
  }
  vec4 not_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 not_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:"not",type:0}}function DO(){return Gt("sin")}function Ul(){let r="relu";return{body:`
  float ${r}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${r}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:r,type:0}}function Wl(){let r="sigmoid";return{body:`
  float ${r}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${r}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:r,type:0}}function kO(){return Gt("sqrt")}function NO(){return Gt("tan")}function LO(){let r="tanh";return{body:`
  float ${r}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${r}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:r,type:0}}function Gt(r){return{body:`
  float ${r}_(float a) {
    return ${r}(a);
  }
  vec4 ${r}_(vec4 v) {
    return ${r}(v);
  }
  `,name:r,type:0}}var RO,at,vg,wg,xg,Tg,Hl,Ig,Sg,zO,$g,Ag,Og,Pg,Eg,Cg,ql,Dg,kg,Ng,Lg,Rg,zg,Mg,Bg,Vg,Fg,Gg,jl=N(()=>{"use strict";mt();Ve();Yn();Je();ke();RO=(r,e,n,t)=>{let o=r.session.pack?2:0,i=de(r.session.backend.glContext.version);return{...e,output:{dims:n.dims,type:n.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},at=(r,e,n,t)=>{let o=r.session.pack?2:0,i={name:n.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>RO(r,i,e,n)}},vg=(r,e)=>[r.run(at(r,e[0],yO()),e)],wg=(r,e)=>[r.run(at(r,e[0],_O()),e)],xg=(r,e)=>[r.run(at(r,e[0],vO()),e)],Tg=(r,e)=>[r.run(at(r,e[0],wO()),e)],Hl=(r,e,n)=>[r.run(at(r,e[0],Gl(n.min,n.max),n.cacheKey),e)],Ig=r=>Se({min:r.attributes.getFloat("min",Lr),max:r.attributes.getFloat("max",Rr)}),Sg=(r,e)=>{let n=zO(r,e);return Hl(r,[e[0]],n)},zO=(r,e)=>{if(e.length>=3&&(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let n=e.length>=3?e[1].numberData[0]:Lr,t=e.length>=3?e[2].numberData[0]:Rr;return Se({min:n,max:t})},$g=(r,e)=>[r.run(at(r,e[0],xO()),e)],Ag=(r,e)=>[r.run(at(r,e[0],TO()),e)],Og=(r,e,n)=>[r.run(at(r,e[0],IO(n.alpha),n.cacheKey),e)],Pg=r=>Se({alpha:r.attributes.getFloat("alpha",1)}),Eg=(r,e)=>[r.run(at(r,e[0],SO()),e)],Cg=(r,e)=>[r.run(at(r,e[0],$O()),e)],ql=(r,e)=>[r.run(at(r,e[0],AO()),e)],Dg=(r,e,n)=>[r.run(at(r,e[0],OO(n.alpha),n.cacheKey),e)],kg=r=>Se({alpha:r.attributes.getFloat("alpha",.01)}),Ng=(r,e)=>[r.run(at(r,e[0],PO()),e)],Lg=(r,e)=>[r.run(at(r,e[0],EO()),e)],Rg=(r,e)=>[r.run(at(r,e[0],CO()),e)],zg=(r,e)=>[r.run(at(r,e[0],Ul()),e)],Mg=(r,e)=>[r.run(at(r,e[0],Wl()),e)],Bg=(r,e)=>[r.run(at(r,e[0],DO()),e)],Vg=(r,e)=>[r.run(at(r,e[0],kO()),e)],Fg=(r,e)=>[r.run(at(r,e[0],NO()),e)],Gg=(r,e)=>[r.run(at(r,e[0],LO()),e)]});function Bn(r){let e;switch(r.activation){case"Relu":e=Ul();break;case"Sigmoid":e=Wl();break;case"Clip":e=Gl(r.clipMin,r.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=e.name,t=e.body,o=`value = ${n}_(value);`;return{activationFunction:t,applyActivation:o}}var lo,Br=N(()=>{"use strict";Ve();jl();lo=r=>{let e=r.getString("activation","");if(e==="Clip"){let[n,t]=r.getFloats("activation_params",[Lr,Rr]);return{activation:e,clipMax:t,clipMin:n,activationCacheKey:`${e}:${n},${t}`}}return{activation:e,activationCacheKey:e}}});var BO,VO,Ug,Wg=N(()=>{"use strict";Dt();Je();ke();oa();Br();BO=(r,e)=>({name:"GroupedConv",inputNames:r?["X","W","Bias"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),VO=(r,e,n,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",a=e[0].dims.slice(),s=e[1].dims.slice(),u=s[0]/t.group;Fe.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=co(a,s,t.dilations,t.pads,t.strides),c=de(r.session.backend.glContext.version),{activationFunction:p,applyActivation:h}=Bn(t),g=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${p}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${u};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${s[1]}; wInChannel++) {
      int input_channel = group_id * ${s[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${s[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${t.dilations[0]};

        if (xHeight < 0 || xHeight >= ${a[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${s[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${t.dilations[1]};
          if (xWidth < 0 || xWidth >= ${a[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${i}
    ${h}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:l,type:e[0].type,textureType:0},shaderSource:g,hasMain:!0}},Ug=(r,e,n)=>{let t=BO(e.length>2,n.cacheKey);return{...t,get:()=>VO(r,e,t,n)}}});var FO,GO,Hg,qg=N(()=>{"use strict";Je();ke();Mr();FO=r=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:r}),GO=(r,e,n,t,o,i)=>{let a=n.dims,s=t.dims,u=2,l=3,c=o.length,p=[s[1]*s[2]*s[3],o[2]*o[3]],h=s[2]*s[3],g=Mn(),m=de(r.session.backend.glContext.version),_="";for(let v=0;v<=1;v++)for(let x=0;x<=1;x++)_+=`
            blockIndex = rc.x + ${x};
            pos = rc.y + ${v};

            if(blockIndex < ${p[1]} && pos < ${p[0]}) {
              offsetY = int(blockIndex / (${o[c-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${h}) / ${s[2]});

              if(d0 < ${a[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[c-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${h}), ${s[2]});

                if(d1 < ${a[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${h}.);
                    innerDims = vec2(d0, d1);
                    result[${v*2+x}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let S=`
      ${g}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${_}
          ${m.output} = result;
      }
            `;return{...e,output:{dims:p,type:n.type,textureType:2},shaderSource:S,hasMain:!0}},Hg=(r,e,n,t,o)=>{let i=FO(o.cacheKey);return{...i,get:()=>GO(r,i,e,n,t,o)}}});function WO(r,e,n){let t=e[0].dims,o=e[1].dims,i=vt.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let a=wt(i.length),s=Xt(),{activationFunction:u,applyActivation:l}=Bn(n),c=e.length>2,p=c?"value += getBiasForMatmul();":"",h=c?`${Xl(a,s,e[2].dims,i,!1)}`:"",g=i.length,m=t.length,_=o.length,S=t[t.length-1],v=`
    ${u}
    ${h}
    float process(int indices[${g}]) {
        int a[${m}];
        int b[${_}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${S}; ++k) {
            a[${m-1}] = k;
            b[${_-2}] = k;
            value += _A(a) * _B(b);
        }
        ${p}
        ${l}
        return value;
    }`;return{...r,output:{dims:i,type:e[0].type,textureType:0},shaderSource:v}}function Kl(r,e){let n=UO(r.length>2,e.activationCacheKey);return{...n,get:()=>WO(n,r,e)}}function Xl(r,e,n,t,o){let i="",a=n.length,s=t.length,u=s-a;s<2&&a>0?i="coords":i=n.map((_,S)=>`coords.${e[S+u]}`).join(", ");let c=vt.getBroadcastDims(n,t).map(_=>`coords.${e[_+u]} = 0;`).join(`
`),h=ie.size(n)===1,g="vec4(outputValue.xx, outputValue.yy)";return h&&(g="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${c}
  vec4 outputValue = getBias(${i});
  return ${g};
}`:`
float getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${c}
  return getBias(coords.x);
}`}var jg,Kg,UO,HO,ia=N(()=>{"use strict";Ve();ke();zn();Br();Zl();jg=(r,e,n)=>(HO(e),r.session.pack?[r.run(aa(r,e,n),e)]:[r.run(Kl(e,n),e)]),Kg=r=>lo(r.attributes),UO=(r,e)=>({name:"MatMul",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e});HO=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64")throw new Error("inputs should be float type");if(r[0].type!==r[1].type)throw new Error("inputs types should match")}});function KO(r,e,n,t){let o=[],i=[],a=n[0].dims,s=n[1].dims,u=a.length,l=s.length,c=t.length,p=c-u,h=c-l;o=a.map(($,O)=>`coords.${e[O+p]}`),o[u-1]="i*2",o.join(", "),i=s.map(($,O)=>`coords.${e[O+h]}`),i[l-2]="i*2",i.join(", ");let g=vt.getBroadcastDims(a,t),m=vt.getBroadcastDims(s,t),_=g.map($=>`coords.${e[$+p]} = 0;`).join(`
`),S=m.map($=>`coords.${e[$+h]} = 0;`).join(`
`),v=`int lastDim = coords.${e[c-1]};
  coords.${e[c-1]} = coords.${e[c-2]};
  coords.${e[c-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${v}
  ${_}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${v}
  ${S}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function XO(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`rc.${r[e-2]}, i*2`,n}function ZO(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`i*2, rc.${r[e-1]}`,n}var qO,jO,aa,Zl=N(()=>{"use strict";Ve();Je();ke();zn();Br();ia();qO=(r,e)=>({name:"MatMul (packed)",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[2,2,2]:[2,2],cacheHint:e}),jO=(r,e,n,t)=>{let o=n.length>2,i=o?"value += getBiasForMatmul();":"",a=n[0].dims,s=n[1].dims,u=vt.calcShape(a,s,!0),l=!ie.areEqual(n[0].dims,n[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let c=a[a.length-1],p=Math.ceil(c/2),h=a.length,g=s.length,m=de(r.session.backend.glContext.version),_=wt(u.length),S=u.length,v=Xt(),{activationFunction:x,applyActivation:$}=Bn(t),O=o?`${Xl(_,v,n[2].dims,u,!0)}`:"",P=l?`${KO(_,v,n,u)}`:"",C=l?"getAAtOutCoordsMatmul(i)":`getA(${XO(v,h)})`,R=l?"getBAtOutCoordsMatmul(i)":`getB(${ZO(v,g)})`,T=l?"":`${_} rc =
          getOutputCoords(); int lastDim = rc.${v[S-1]}; rc.${v[S-1]} =
          rc.${v[S-2]}; rc.${v[S-2]} = lastDim;
      `,W=`
            ${P}
            ${O}
            ${x}
            void main() {
              ${T}

              vec4 value = vec4(0);
              for (int i = 0; i < ${p}; i++) {
                vec4 a = ${C};
                vec4 b = ${R};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${$}
              ${m.output} = value;
            }`;return{...e,output:{dims:u,type:n[0].type,textureType:2},shaderSource:W,hasMain:!0}},aa=(r,e,n)=>{let t=qO(e.length>2,n.activationCacheKey);return{...t,get:()=>jO(r,t,e,n)}}});var Xg,Zg=N(()=>{"use strict";oa();qg();Zl();Xg=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=co(t,o,n.dilations,n.pads,n.strides),a=r.run(Hg(r,e[0],e[1],i,n),[e[0]]),s=r.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[s,a,e[2]]:[s,a],l=r.run(aa(r,u,n),u);return r.reshapePacked(l,i)}});var JO,YO,Jg,Jl,Yl=N(()=>{"use strict";ke();JO=r=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:r}),YO=(r,e,n,t,o,i)=>{let a=n.dims,s=t.dims,u=o.length,l=Jl(a,s,o,4),c=`
        const int XC = ${a[1]};
        const int XH = ${a[2]};
        const int XW = ${a[3]};
        const int KH = ${i.kernelShape[0]};
        const int KW = ${i.kernelShape[1]};
        const int dilationH = ${i.dilations[0]};
        const int dilationW = ${i.dilations[1]};
        const int strideH = ${i.strides[0]};
        const int strideW = ${i.strides[1]};
        const int padH = ${i.pads[0]};
        const int padW = ${i.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${u}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${a.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...e,output:{dims:l,type:n.type,textureType:4},shaderSource:c}},Jg=(r,e,n,t,o)=>{let i=JO(o.cacheKey);return{...i,get:()=>YO(r,i,e,n,t,o)}},Jl=(r,e,n,t=4)=>[n[0],n[2],n[3],Math.ceil(r[1]*e[2]*e[3]/t)]});var QO,eP,Yg,Qg=N(()=>{"use strict";Ve();Je();ke();Br();Yl();QO=(r,e)=>({name:"ConvDotProduct",inputNames:r?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:r?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),eP=(r,e,n,t,o)=>{let i=n[0].dims,a=n[1].dims,s=[a[0],Math.ceil(i[1]*a[2]*a[3]/4)],u=Jl(i,a,t),[l,c]=r.calculateTextureWidthAndHeight(s,4),p=ie.computeStrides(u),[h,g]=r.calculateTextureWidthAndHeight(u,4),m=t.length,_=n.length<3?"0.0":"_B(b)",S=Math.ceil(i[1]*a[2]*a[3]/4),{activationFunction:v,applyActivation:x}=Bn(o),$=de(r.session.backend.glContext.version),O=`
${v}
float process(int indices[${m}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${p[0]} + im2col[1] * ${p[1]} + im2col[2] * ${p[2]};
  int kernelOffset = indices[1] * ${s[1]};
  float value = ${_};
  for (int i = 0; i < ${S}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${h}, ${g});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${c});
    value += dot(${$.texture2D}(Im2Col, im2colCoords), ${$.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${x}
  return value;
}`;return{...e,output:{dims:t,type:n[0].type,textureType:0},shaderSource:O}},Yg=(r,e,n,t)=>{let o=QO(e.length>2,t);return{...o,get:()=>eP(r,o,e,n,t)}}});var co,Ql,tP,nP,rP,oP,ec,iP,oa=N(()=>{"use strict";mt();Ve();Wg();Zg();Qg();Br();Yl();ia();co=(r,e,n,t,o)=>{let i=r[0],a=r.slice(2),s=a.length,u=e[0],c=e.slice(2).map((m,_)=>m+(m-1)*(n[_]-1)),h=a.map((m,_)=>m+t[_]+t[_+s]).map((m,_)=>Math.floor((m-c[_]+o[_])/o[_]));return[i,u].concat(...h)},Ql=(r,e,n)=>(iP(e,n),tP(r,e,n)),tP=(r,e,n)=>{let t=oP(n,e),o=r.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[r.run(Ug(r,e,t),e)]:i&&o?[nP(r,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[Xg(r,e,t)]:[rP(r,e,t)]},nP=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=co(t,o,n.dilations,n.pads,n.strides),a=r.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),s=r.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[s,a,e[2]]:[s,a],l=r.run(Kl(u,n),u);return r.reshapeUnpacked(l,i)},rP=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=co(t,o,n.dilations,n.pads,n.strides),a=r.run(Jg(r,e[0],e[1],i,n),[e[0]]),s=e.length===3?[a,e[1],e[2]]:[a,e[1]];return r.run(Yg(r,e,i,n),s)},oP=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)n.push(e[1].dims[i]);let t=r.pads.slice();Nr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t,cacheKey:r.cacheKey}),o},ec=r=>{let e=r.attributes,n=lo(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return Se({autoPad:t,dilations:o,group:i,kernelShape:a,pads:s,strides:u,...n})},iP=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var aP,sP,uP,eb,lP,cP,dP,pP,fP,hP,tb,mP,nb=N(()=>{"use strict";mt();Je();ke();Br();aP=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,sP=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},uP=(r,e,n,t,o,i,a,s)=>{let u=r.length-2,l=s.length===0;for(let c=0;c<u;++c){let p=l?r[c+2]*i[c]:s[c],h=aP(r[c+2],i[c],o[c],e[c],n[c],p);sP(h,t,o,c,c+u),l&&s.push(i[c]*(r[c+2]-1)+a[c]+(e[c]-1)*n[c]+1-o[c]-o[c+u])}},eb=(r,e,n)=>(mP(e,n),lP(r,e,n)),lP=(r,e,n)=>{let t=hP(n,e);return[fP(r,e,t)]},cP=(r,e)=>({name:"ConvTranspose",inputNames:r?["X","W","B"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),dP=(r,e,n,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",a=e[0].dims,s=e[1].dims,u=s[1],l=s[0]/t.group,c=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],p=de(r.session.backend.glContext.version),{activationFunction:h,applyActivation:g}=Bn(t),m=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${h}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${u};
    int wOutChannel = output_channel - group_id * ${u};

    float value = ${i};
    for (int inChannelOffset = 0; inChannelOffset < ${l}; inChannelOffset++) {
      int input_channel = group_id * ${l} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${s[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${s[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${t.dilations[0]}, wHOff * ${t.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${a[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${a[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${g}
    ${p.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:c,type:e[0].type,textureType:0},shaderSource:m,hasMain:!0}},pP=(r,e,n)=>{let t=cP(e.length>2,n.cacheKey);return{...t,get:()=>dP(r,e,t,n)}},fP=(r,e,n)=>r.run(pP(r,e,n),e),hP=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let s=2;s<e[1].dims.length;++s)n.push(e[1].dims[s]);let t=r.pads.slice(),o=r.outputShape.slice(),i=e[0].dims;uP(i,n,r.dilations,r.autoPad,t,r.strides,r.outputPadding,o);let a=Object.assign({},r);return Object.assign(a,{kernelShape:n,pads:t,outputShape:o,cacheKey:r.cacheKey}),a},tb=r=>{let e=r.attributes,n=lo(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),c=e.getInts("strides",[1,1]);return Se({autoPad:t,dilations:o,group:i,kernelShape:a,outputPadding:s,outputShape:u,pads:l,strides:c,...n})},mP=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var rb,Vr,ob,gP,ib,bP,yP,_P,sa=N(()=>{"use strict";mt();Ve();ke();rb={name:"Transpose",inputNames:["A"],inputTypes:[0]},Vr=(r,e,n)=>(_P(e),[r.run({...rb,cacheHint:n.cacheKey,get:()=>gP(r,e[0],n.perm)},e)]),ob=r=>Se({perm:r.attributes.getInts("perm",[])}),gP=(r,e,n)=>{let t=e.dims;n=ib(t,n);let o=bP(t,n),i=t.length,a=`
      ${yP("perm",n,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...rb,output:{dims:o,type:e.type,textureType:0},shaderSource:a}},ib=(r,e)=>(e&&e.length!==r.length&&(e=[...r.keys()].reverse()),e),bP=(r,e)=>(e=ib(r,e),ie.sortBasedOnPerm(r,e)),yP=(r,e,n)=>{let t=[];t.push(`void ${r}(out int a[${n}], int src[${n}]) {`);for(let o=0;o<n;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},_P=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("input should be float tensor")}});var ab,sb,vP,ub=N(()=>{"use strict";sa();ab=(r,e,n)=>{vP(e);let t=n.blocksize,o=t*t,i=n.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],a=n.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],s=r.reshapeUnpacked(e[0],a),u={perm:i,cacheKey:`${i}`},[l]=Vr(r,[s],u),c=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[r.reshapeUnpacked(l,c)]},sb=r=>{let e=r.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let n=r.attributes.getString("mode","DCR");if(n!=="DCR"&&n!=="CRD")throw new Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:e}},vP=r=>{if(r.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${r.length}`);if(r[0].type==="string"||r[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var lb,cb,wP,db=N(()=>{"use strict";Ve();lb=(r,e,n)=>{wP(e,n);let t=ie.flattenShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},cb=r=>r.attributes.getInt("axis",1),wP=(r,e)=>{if(!r||r.length!==1)throw new Error("Flatten requires 1 input.");let n=r[0].dims.length;if(n===0)throw new Error("scalar tensor is not supported.");if(e<-n||e>n)throw new Error("Invalid axis");if(r[0].type==="string")throw new Error("string tensor is not supported.")}});var br,qo=N(()=>{"use strict";br=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var pb,fb,xP,TP,IP,SP,hb=N(()=>{"use strict";mt();qo();Ve();ke();pb=(r,e,n)=>(SP(e,n.axis),[r.run(IP(r,e,n),e)]),fb=r=>Se({axis:r.attributes.getInt("axis",0)}),xP={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},TP=(r,e,n,t)=>{let o=n[0].dims.slice(),i=n[1].dims.slice(),a=new Array(o.length+i.length-1);t=ie.normalizeAxis(t,o.length);let s=[];for(let h=0;h<a.length;h++)h<t?(a[h]=o[h],s.push(`inputIdx[${h}] = outputIdx[${h}];`)):h<t+i.length?(a[h]=i[h-t],s.push(`indexDataIdx[${h-t}] = outputIdx[${h}];`)):(a[h]=o[h-i.length+1],s.push(`inputIdx[${h-i.length+1}] = outputIdx[${h}];`));let u=a.length||1,l=o.length,c=i.length||1,p=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${c}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:a,type:n[0].type,textureType:0},shaderSource:p}},IP=(r,e,n)=>{let t={...xP,cacheHint:n.cacheKey};return{...t,get:()=>TP(r,t,e,n.axis)}},SP=(r,e)=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.");let n=r[0].dims.length;if(n<1)throw new Error("Invalid input shape.");if(e<-n||e>n-1)throw new Error("Invalid axis.");if(br.indexOf(r[0].type)===-1)throw new Error("Invaid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invaid input type.")}});var tc,mb,gb,bb,$P,AP,OP,yb=N(()=>{"use strict";mt();Ve();ke();tc=(r,e,n)=>(OP(e,n),[r.run($P(e,n),e)]),mb=(r,e)=>{let n=r.attributes.getInt("transA",0)!==0,t=r.attributes.getInt("transB",0)!==0,o=r.attributes.getFloat("alpha",1),i=r.attributes.getFloat("beta",1);return Se({transA:n,transB:t,alpha:o,beta:i,isOptionalC:e})},gb=r=>mb(r,!1),bb=r=>mb(r,!0),$P=(r,e)=>{let n={name:"Gemm",inputNames:r.length===3?["A","B","C"]:["A","B"],inputTypes:r.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...n,get:()=>AP(n,r,e)}},AP=(r,e,n)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,a]=Zi.getShapeOfGemmResult(t,n.transA,o,n.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";n.transA&&(u=t[0]),n.transA&&n.transB?l="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?l="value += _A_T(a) * _B(b);":!n.transA&&n.transB?l="value += _A(a) * _B_T(b);":!n.transA&&!n.transB&&(l="value += _A(a) * _B(b);");let c=s.length,p=e.length===3?`int c[${e[2].dims.length}];`:"",h=e.length===3?"bcastIndices_C(indices, c);":"",g=e.length===3?"value += beta * _C(c);":"",m=`
      float process(int indices[${c}]) {
          int a[${c}];
          int b[${c}];
          ${p}

          copyVec(indices, a);
          copyVec(indices, b);
          ${h}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${c-1}] = k;
              b[${c-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${g}
          return value;
      }`;return{...r,output:{dims:s,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:m}},OP=(r,e)=>{if(!r)throw new Error("Input is missing");if(e.isOptionalC&&(r.length<2||r.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&r.length!==3)throw new Error("Gemm requires 3 inputs");if(r.length===3&&r[2].dims.length!==1&&r[2].dims.length!==2)throw new Error("Invalid input shape of C");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64"||r.length===3&&r[2].type!=="float32"&&r[2].type!=="float64")throw new Error("Invalid input type.");if(r[0].type!==r[1].type||r.length===3&&r[0].type!==r[2].type)throw new Error("Input types are mismatched")}});var _b,vb,PP,EP,CP,DP,kP,wb=N(()=>{"use strict";mt();ke();_b=(r,e,n)=>(kP(e),[r.run(CP(r,e,n),e)]),vb=r=>{let e=r.attributes.getFloat("scale"),n=r.attributes.getFloats("bias");return Se({scale:e,bias:n})},PP={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},EP=(r,e,n,t)=>{let o=n[0].dims.slice(),i=o.length,s=`
      ${DP(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:s}},CP=(r,e,n)=>{let t={...PP,cacheHint:n.cacheKey};return{...t,get:()=>EP(r,t,e,n)}},DP=r=>{let e=[`float getBias(float bias[${r}], int channel) {`];for(let n=0;n<r;++n)n===0?e.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===r-1?e.push(`	else { return bias[${n}]; }`):e.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return e.push("	}"),e.join(`
`)},kP=r=>{if(!r||r.length!==1)throw new Error("ImageScaler requires 1 input.");if(r[0].dims.length!==4)throw new Error("Invalid input shape.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")}});var Tb,Ib,xb,NP,LP,RP,zP,MP,BP,Sb=N(()=>{"use strict";Je();ke();Tb=(r,e,n)=>{BP(e);let t=r.run(LP(e[0]),e);return[r.run(MP(r,e[0],n,t.dims),[e[0],t,e[1],e[2]])]},Ib=r=>r.attributes.getFloat("epsilon",1e-5),xb={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},NP=(r,e)=>{let n=e.dims.slice(),t=n[1],o=n[2]*n[3],i=[n[0],t],a=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${o});
        temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${o});

        return v;
      }`;return{...r,output:{dims:i,type:e.type,textureType:4},shaderSource:a}},LP=r=>({...xb,get:()=>NP(xb,r)}),RP={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},zP=(r,e,n,t,o)=>{let i=de(r.session.backend.glContext.version),[a,s]=r.calculateTextureWidthAndHeight(o,4),[u,l]=[a/4,s],c=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${u}, ${l});
        return ${i.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...e,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:c}},MP=(r,e,n,t)=>{let o={...RP,cacheHint:`${n}`};return{...o,get:()=>zP(r,o,e,n,t)}},BP=r=>{if(!r||r.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(r[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function VP(r,e){let n=r[0].dims[1],t=r[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),a=`float(${e.alpha}) / float(${e.size})`,s=`float(${e.bias})`,u=`float(${e.beta})`,l=`
    float process(int indices[${t}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${o}; i <= ${i}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${n}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${s} + ${a} * square_sum, ${u});
    }`;return{...Ob,cacheHint:e.cacheKey,output:{dims:r[0].dims,type:r[0].type,textureType:0},shaderSource:l}}function FP(r,e){return{...Ob,cacheHint:e.cacheKey,get:()=>VP(r,e)}}var $b,Ab,Ob,GP,Pb=N(()=>{"use strict";mt();ke();$b=(r,e,n)=>(GP(e),[r.run(FP(e,n),e)]),Ab=r=>{let e=r.attributes.getFloat("alpha",1e-4),n=r.attributes.getFloat("beta",.75),t=r.attributes.getFloat("bias",1),o=r.attributes.getInt("size");return Se({alpha:e,beta:n,bias:t,size:o})},Ob={name:"LRN",inputNames:["X"],inputTypes:[0]};GP=r=>{if(!r||r.length!==1)throw new Error("LRN requires 1 input.");if(r[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(r[0].type!=="float32")throw new Error("input should be float type")}});var UP,nc,Eb,Cb,Db,WP,HP,qP,jP,KP,XP,ZP,JP,kb=N(()=>{"use strict";mt();Ve();Je();ke();UP={name:"Pad",inputNames:["A"],inputTypes:[0]},nc=(r,e,n)=>(qP(e),[r.run({...UP,cacheHint:n.cacheKey,get:()=>HP(r,e[0],n)},e)]),Eb=r=>{let e=r.attributes.getString("mode","constant"),n=r.attributes.getFloat("value",0),t=r.attributes.getInts("pads");return Se({mode:e,value:n,pads:t})},Cb=(r,e,n)=>{jP(e);let t=WP(r,e,n);return nc(r,[e[0]],t)},Db=r=>r.attributes.getString("mode","constant"),WP=(r,e,n)=>{if(!r.session.isInitializer(e[1].dataId)||e.length>=3&&!r.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return Se({mode:n,pads:t,value:o})},HP=(r,e,n)=>{let t=ie.padShape(e.dims.slice(),n.pads),o=t.length,a=`
      ${KP(r,e,n)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:a}},qP=r=>{if(!r||r.length!==1)throw new Error("Pad requires 1 input");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},jP=r=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(r[1].type!=="int32")throw new Error("Invalid input type.");if(r.length>=3&&r[2].type==="string")throw new Error("Invalid input type.")},KP=(r,e,n)=>{let t=de(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e.dims,0),a=ie.computeStrides(e.dims);switch(n.mode){case"constant":return XP(t,e.dims,a,o,i,n.pads,n.value);case"reflect":return ZP(t,e.dims,a,o,i,n.pads);case"edge":return JP(t,e.dims,a,o,i,n.pads);default:throw new Error("Invalid mode")}},XP=(r,e,n,t,o,i,a)=>{let s=e.length,u="";for(let l=s-1;l>=0;--l)u+=`
        k = m[${l}] - ${i[l]};
        if (k < 0)  return constant;
        if (k >= ${e[l]}) return constant;
        offset += k * ${n[l]};
        `;return`
      float padA(int m[${s}]) {
        const float constant = float(${a});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},ZP=(r,e,n,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(e[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${e[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${n[u]};
        `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},JP=(r,e,n,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0)  k = 0;
        if (k >= ${e[u]}) k = ${e[u]-1};
        offset += k * ${n[u]};
      `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `}});var Lb,Rb,zb,Mb,Bb,Vb,Fb,Gb,Ub,YP,Nb,Wb,la,Hb,ua,QP,qb=N(()=>{"use strict";mt();Ve();ke();Lb=(r,e,n)=>{la(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>zb(e,t,!1,n)},e)]},Rb=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInt("count_include_pad",0)!==0,o=r.attributes.getInts("kernel_shape"),i=r.attributes.getInts("strides",[]),a=r.attributes.getInts("pads",[]);if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return Se({autoPad:e,ceilMode:n,countIncludePad:t,kernelShape:o,strides:i,pads:a})},zb=(r,e,n,t)=>{let[o,i]=Ub(r,t,n),a=ie.size(o.kernelShape),s="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${a});`:u+=`value /= float(${a} - pad);`;let c=`
        ${Hb(r[0].dims,o,s,u,"0.0")}
      `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:c}},Mb=(r,e,n)=>{la(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[r.run({...t,get:()=>zb(e,t,!0,n)},e)]},Bb=r=>{let e=r.attributes.getInt("count_include_pad",0)!==0;return Se({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},Vb=(r,e,n)=>{la(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Gb(e,t,!1,n)},e)]},Fb=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInts("kernel_shape"),o=r.attributes.getInts("strides",[]),i=r.attributes.getInts("pads",[]),a=r.attributes.getInt("storage_order",0),s=r.attributes.getInts("dilations",[]);if(a!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return Se({autoPad:e,ceilMode:n,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:a,dilations:s})},Gb=(r,e,n,t)=>{let[o,i]=Ub(r,t,n),l=`
      ${Hb(r[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:l}},Ub=(r,e,n)=>{let t=r[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),a=e.strides.slice(),s=o?e.dilations.slice():[],u=e.pads.slice();Nr.adjustPoolAttributes(n,t,i,a,s,u);let l=Nr.computePoolOutputShape(n,t,a,s,i,u,e.autoPad),c=Object.assign({},e);return o?Object.assign(c,{kernelShape:i,strides:a,pads:u,dilations:s,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:i,strides:a,pads:u,cacheKey:e.cacheKey}),[c,l]},YP={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Nb={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},Wb=(r,e)=>(la(e),[r.run({...Nb,get:()=>Gb(e,Nb,!0,YP)},e)]),la=r=>{if(!r||r.length!==1)throw new Error("Pool ops requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},Hb=(r,e,n,t,o)=>{let i=r.length;if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],s=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],c=r[i-1],p="",h="",g="";if(u+l!==0?p=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${c}) {
              pad++;
              continue;
            }
            ${n}
          }`:p=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            ${n}
          }`,e.kernelShape.length===2){let _=e.kernelShape[e.kernelShape.length-2],S=e.strides[e.strides.length-2],v=e.pads[e.pads.length/2-2],x=e.pads[e.pads.length-2],$=r[i-2];v+x!==0?h=`
            for (int j = 0; j < ${_}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${S} - ${v} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${$}) {
                pad+= ${a};
                continue;
              }
          `:h=`
            for (int j = 0; j < ${_}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${S} - ${v} + j;
            `,g=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${h}
          ${p}
          ${g}
          ${t}
          return value;
        }
      `}else{let a=ie.size(e.kernelShape),s=ie.computeStrides(e.kernelShape),u=s.length,l=e.pads.length,c=QP(u),p=ua(r,"inputDims"),h=ua(e.pads,"pads"),g=ua(s,"kernelStrides"),m=ua(e.strides,"strides"),_=e.pads.reduce((x,$)=>x+$),S="";return _?S=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${n}
          }`:S=`
          }
          ${n}
        `,`
        ${c}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${h}
          ${p}
          ${m}
          ${g}

          float value = ${o};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${a}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${i} - ${u}; j < ${i}; j++) {
              x[j] = indices[j] * strides[j - ${i} + ${u}]
                + offset[j - ${i} + ${u}] - pads[j - 2];
              ${S}
          }
          ${t}

          return value;
        }
      `}},ua=(r,e)=>{let n="";for(let t=0;t<r.length;t++)n+=`
      ${e}[${t}] = ${r[t]};
    `;return n},QP=r=>`
  void offsetToIndices(int offset, int[${r}] strides, out int[${r}] indices) {
    if (${r} == 0) {
      return;
    }
    for (int i = 0; i < ${r} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${r} - 1] = offset;
  }`});var Fr,yr,e3,t3,jb,Kb,Xb,Zb,Jb,Yb,Qb,ey=N(()=>{"use strict";mt();qo();Ve();ke();Fr=(r,e,n,t,o)=>{t3(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[r.run({...i,cacheHint:n.cacheKey,get:()=>e3(r,e,n,t,o,i)},e)]},yr=r=>{let e=r.attributes.getInts("axes",[]),n=r.attributes.getInt("keepdims",1)===1;return Se({axes:e,keepDims:n})},e3=(r,e,n,t,o,i)=>{let a=[],s=e[0].dims.length||1,u=[],l=ie.normalizeAxes(n.axes,e[0].dims.length),c=o(e,l),p=c[1];for(let m=0;m<e[0].dims.length;m++)l.indexOf(m)>=0||l.length===0?(n.keepDims&&a.push(1),p=`
          for(int j${m} = 0; j${m} < ${e[0].dims[m]}; j${m}++) {
            inputIdx[${m}] = j${m};
            ${p}
          }`):(u.push(`inputIdx[${m}] = outputIdx[${a.length}];`),a.push(e[0].dims[m]));let g=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${s}];      // addressing input data
        ${u.join(`
`)}
        ${c[0]}       // init ops for reduce max/min
        ${p}
        ${c[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:a,type:e[0].type,textureType:0},shaderSource:g}},t3=r=>{if(!r||r.length!==1)throw new Error("Reduce op requires 1 input.");if(br.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},jb=(r,e,n)=>Fr(r,e,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),Kb=(r,e,n)=>Fr(r,e,n,"ReduceMean",(o,i)=>{let a=1;for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=o[0].dims[s]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${a}.;`]}),Xb=(r,e,n)=>Fr(r,e,n,"ReduceMax",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),Zb=(r,e,n)=>Fr(r,e,n,"ReduceMin",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),Jb=(r,e,n)=>Fr(r,e,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),Yb=(r,e,n)=>Fr(r,e,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),Qb=(r,e,n)=>Fr(r,e,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var ty,ny=N(()=>{"use strict";Ve();ty=(r,e)=>{let n=ie.calculateReshapedDims(e[0].dims,e[1].integerData);return r.session.pack?[r.reshapePacked(e[0],n)]:[r.reshapeUnpacked(e[0],n)]}});var ry,rc,oy,iy,jo,n3,oc,ca,ic=N(()=>{"use strict";mt();Je();ke();ry={name:"Upsample",inputNames:["X"],inputTypes:[0]},rc=(r,e,n)=>(oc(e,n),[r.run({...ry,cacheHint:n.cacheKey,get:()=>n3(r,e,n)},e)]),oy=r=>jo(r,7),iy=r=>jo(r,9),jo=(r,e)=>{let n=e>=10,t=r.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=r.attributes.getFloats("scales"),ca(o,t,n));let i=r.attributes.getFloat("extrapolation_value",0),a=e>10?r.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a)===-1)throw new Error(`coordinate_transform_mode '${a}' is not supported`);let s=a==="tf_crop_and_resize",u=s,l=t==="nearest"&&e>=11?r.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let c=r.attributes.getFloat("cubic_coeff_a",-.75),p=r.attributes.getInt("exclude_outside",0)!==0;if(p&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let h=e<11?!0:t==="nearest"&&a==="asymmetric"&&l==="floor",g=0,m=0,_=0;return e>10?r.inputs.length>2?(g=1,m=2,_=3):(m=1,_=2):e===9&&(m=1),Se({opset:e,isResize:n,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:a,useExtrapolation:u,needRoiInput:s,nearestMode:l,cubicCoefficientA:c,excludeOutside:p,useNearest2xOptimization:h,roiInputIdx:g,scalesInputIdx:m,sizesInputIdx:_})},n3=(r,e,n)=>{let t=de(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e[0].dims,0),a=e[0].dims.map((_,S)=>Math.floor(_*n.scales[S])),[s,u]=r.calculateTextureWidthAndHeight(a,0),l=a.length,c=new Array(l),p=new Array(l),h=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let _=l-1;_>=0;_--)c[_]=_===l-1?1:c[_+1]*a[_+1],p[_]=_===l-1?1:p[_+1]*e[0].dims[_+1],h+=`
        output_pitches[${_}] = ${c[_]};
        input_pitches[${_}] = ${p[_]};
        `;let g=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,m=n.mode==="nearest"?`
    ${g}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${h}

      int d, m;
      for (int dim = 0; dim < ${l}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:l===4?`
    ${g}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${h}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${e[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${g}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${h}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${e[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...ry,output:{dims:a,type:e[0].type,textureType:0},shaderSource:m,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(_=>Math.ceil(_))}]}},oc=(r,e)=>{if(!r||e.opset<9&&r.length!==1||e.opset>=9&&e.opset<11&&r.length!==2||e.opset>=11&&r.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&r[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(r[0].type==="string")throw new Error("Invalid input tensor types.")},ca=(r,e,n)=>{if(n){for(let t of r)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of r)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&r.length!==2&&(r.length!==4||r[0]!==1||r[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}});var ac,sc,ay,sy,r3,o3,i3,a3,uy=N(()=>{"use strict";Je();ke();zn();Mr();ic();ac={name:"Resize",inputNames:["A"],inputTypes:[2]},sc=(r,e,n)=>(oc(e,n),[r.run({...ac,cacheHint:n.cacheKey,get:()=>r3(r,e,n)},e)]),ay=r=>jo(r,10),sy=r=>jo(r,11),r3=(r,e,n)=>{let t=de(r.session.backend.glContext.version),[o,i]=o3(e,n);if(o.every($=>$===1)&&n.coordinateTransformMode!=="tf_crop_and_resize")return{...ac,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let s=i.length;if(s<2)throw new Error(`output dimension should be at least 2, but got ${s}`);let u=i[s-2],l=i[s-1],c=e[0].dims;if(s!==c.length)throw new Error(`output dimension should match input ${c.length}, but got ${s}`);let p=c[s-2],h=c[s-1],g=o[s-2],m=o[s-1],_="";if(n.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${h}.0 - 1.0, ${p}.0 - 1.0, ${h}.0 - 1.0,
                            ${p}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let S=wt(s),v=Mn(),x=`
            const vec2 inputWH = vec2(${p}.0, ${h}.0);
            const vec4 scaleWHWH = vec4(float(${g}), float(${m}), float(${g}), float(${m}));
            ${v}
            ${_}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${S} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${u-1};
                bool hasNextCol = rc.z < ${l-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${t.output} = vec4(newValue);
            }
        `;return{...ac,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:x}},o3=(r,e)=>{let t=r[0].dims,o=e.scales,i;if(o.length===0){let s=r[e.scalesInputIdx];if(s&&s.size!==0){if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=i3(s,e.mode,e.isResize)}else{let u=r[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=a3(i,t,e.mode,e.isResize)}}else if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let a=i||t.map((s,u)=>Math.floor(s*o[u]));return[o,a]},i3=(r,e,n)=>{let t=Array.from(r.floatData);return ca(t,e,n),t},a3=(r,e,n,t)=>{let o=e.length,i=new Array(o);for(let a=0,s=o;a<s;a++)if(e[a]===0){if(r[a]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[a]=1}else i[a]=r[a]/e[a];return ca(i,n,t),i}});var ly,s3,cy=N(()=>{"use strict";zr();ly=(r,e)=>(s3(e),[new st([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),s3=r=>{if(!r||r.length!==1)throw new Error("Shape requires 1 input.")}});var uc,dy,py,fy,u3,hy,l3,c3,my=N(()=>{"use strict";mt();qo();Ve();ke();uc={name:"Slice",inputNames:["A"],inputTypes:[0]},dy=(r,e,n)=>(u3(e),[r.run({...uc,cacheHint:n.cacheKey,get:()=>fy(r,e[0],n)},e)]),py=r=>{let e=r.attributes.getInts("starts"),n=r.attributes.getInts("ends"),t=r.attributes.getInts("axes",[]);return Se({starts:e,ends:n,axes:t})},fy=(r,e,n)=>{let t=n.axes.length===0?e.dims.slice(0).map((p,h)=>h):n.axes,o=ie.normalizeAxes(t,e.dims.length),i=n.starts.map((p,h)=>p>e.dims[o[h]]-1?e.dims[o[h]]:ie.normalizeAxis(p,e.dims[o[h]])),a=n.ends.map((p,h)=>p>e.dims[o[h]]-1?e.dims[o[h]]:ie.normalizeAxis(p,e.dims[o[h]])),s=e.dims.slice(),u=[];for(let p=0;p<o.length;p++)s[o[p]]=a[p]-i[p],i[p]>0&&u.push(`outputIdx[${o[p]}] += ${i[p]};`);let c=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...uc,output:{dims:s,type:e.type,textureType:0},shaderSource:c}},u3=r=>{if(!r||r.length!==1)throw new Error("Slice requires 1 input.");if(br.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},hy=(r,e)=>{c3(e);let n=l3(r,e);return[r.run({...uc,cacheHint:n.cacheKey,get:()=>fy(r,e[0],n)},[e[0]])]},l3=(r,e)=>{if(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)||e.length>=4&&!r.session.isInitializer(e[3].dataId)||e.length>=5&&!r.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(a=>a!==1))throw new Error("currently non-1 steps is not supported for Slice");let n=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${n};${t}`;return{starts:n,ends:t,axes:o,cacheKey:i}},c3=r=>{if(!r||r.length<3||r.length>5)throw new Error("Invalid input number.");if(r[1].type!=="int32"||r[1].dims.length!==1)throw new Error("Invalid input type.");if(r[2].type!=="int32"||r[2].dims.length!==1)throw new Error("Invalid input type.");if(r.length>=4&&(r[3].type!=="int32"||r[3].dims.length!==1))throw new Error("Invalid input type.");if(r.length>=5&&(r[4].type!=="int32"||r[4].dims.length!==1))throw new Error("Invalid input type.")}});var gy,by,yy,_y,vy,wy,xy,Ty,d3,p3,f3,Iy,Sy=N(()=>{"use strict";mt();Ve();Je();ke();sa();gy={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},by={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},yy={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},_y=(r,e,n)=>{Iy(e);let t=e[0].dims.slice(),o=ie.normalizeAxis(n.axis,t.length),i=ie.sizeToDimension(t,o),a=ie.sizeFromDimension(t,o);return Ty(r,e,n,i,a)},vy=r=>Se({axis:r.attributes.getInt("axis",1)}),wy=r=>Se({axis:r.attributes.getInt("axis",-1)}),xy=(r,e,n)=>{Iy(e);let t=e[0].dims.slice(),o=ie.normalizeAxis(n.axis,t.length),i=t.length,a=o!==i-1,s=[],u=[],l=[],c;a&&(u=Array.from({length:i}).map((m,_)=>_),u[o]=i-1,u[i-1]=o,u.map(m=>s.push(t[m])),c=Se({perm:u}),l=Vr(r,e,c));let p=a?ie.sizeToDimension(s,i-1):ie.sizeToDimension(t,i-1),h=a?ie.sizeFromDimension(s,i-1):ie.sizeFromDimension(t,i-1),g=Ty(r,a?l:e,n,p,h);return a?Vr(r,g,c):g},Ty=(r,e,n,t,o)=>{let i=d3(r,e[0],t,o,[t]),a=r.run({...gy,cacheHint:n.cacheKey,get:()=>i},e),s=p3(r,e[0],t,o,i.output.dims,[t]),u=r.run({...by,cacheHint:n.cacheKey,get:()=>s},[e[0],a]),l=f3(r,e[0],t,o,i.output.dims,s.output.dims);return[r.run({...yy,cacheHint:n.cacheKey,get:()=>l},[e[0],a,u])]},d3=(r,e,n,t,o)=>{let[i,a]=r.calculateTextureWidthAndHeight(e.dims,0),s=o.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==n)throw new Error("Shape of the output should be equal to logical row count");let u=de(r.session.backend.glContext.version),l=`
      float process(int[${s}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${i},
        ${a} )));
        for(int i=1; i<${t}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${i}, ${a})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...gy,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},p3=(r,e,n,t,o,i)=>{let[a,s]=r.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==n)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=de(r.session.backend.glContext.version),c=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${t}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${a}, ${s}))) - max);
        }

        return norm_factor;
      }`;return{...by,output:{dims:i,type:e.type,textureType:0},shaderSource:c}},f3=(r,e,n,t,o,i)=>{let[a,s]=r.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n||i[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${a}, ${s});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${t};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...yy,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},Iy=r=>{if(!r||r.length!==1)throw new Error("Softmax requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type")}});var $y,Ay,Oy,h3,m3,g3,Py=N(()=>{"use strict";mt();Ve();ke();$y={name:"Split",inputNames:["A"],inputTypes:[0]},Ay=(r,e,n)=>{g3(e);let t=ie.normalizeAxis(n.axis,e[0].dims.length),o=h3(r,e,t,n),i=[];for(let a=0;a<o;++a)i.push(r.run({...$y,cacheHint:`${n.cacheKey};${a}`,get:()=>m3(r,e[0],n,t,a)},e));return i},Oy=r=>{let e=r.attributes.getInt("axis",0),n=r.attributes.getInts("split",[]),t=r.outputs.length;return Se({axis:e,split:n,numOutputs:t})},h3=(r,e,n,t)=>{let[,o]=Vo.splitShape(e[0].dims,n,t.split,t.numOutputs);return o.length},m3=(r,e,n,t,o)=>{let[i,a]=Vo.splitShape(e.dims,t,n.split,n.numOutputs),s=a[o],u=i[o],c=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${s};
        return _A(indices);
      }
    `;return{...$y,cacheHint:`${n.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:c}},g3=r=>{if(!r||r.length!==1)throw new Error("Split requires one input.");if(r[0].type!=="int8"&&r[0].type!=="uint8"&&r[0].type!=="int16"&&r[0].type!=="uint16"&&r[0].type!=="int32"&&r[0].type!=="uint32"&&r[0].type!=="float32"&&r[0].type!=="float64"&&r[0].type!=="bool")throw new Error("Invalid input type.")}});var lc,Ey,Cy,b3,y3,Dy=N(()=>{"use strict";Ve();lc=(r,e,n)=>{b3(e);let t=ie.squeezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Ey=(r,e)=>(y3(e),lc(r,[e[0]],Array.from(e[1].integerData))),Cy=r=>r.attributes.getInts("axes"),b3=r=>{if(!r||r.length!==1)throw new Error("Squeeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},y3=r=>{if(!r||r.length!==2)throw new Error("Squeeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var ky,_3,v3,Ny=N(()=>{"use strict";Je();ke();ky=(r,e)=>{v3(e);let n={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[r.run({...n,get:()=>_3(r,e,n)},e)]},_3=(r,e,n)=>{let t=de(r.session.backend.glContext.version),o=e[0].dims.slice(),a=`
      void main() {
        vec4 result = ${e.map((s,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:a}},v3=r=>{if(!r||r.length===0)throw new Error("Sum requires inputs.");let e=r[0].dims.length;for(let n=1;n<r.length;n++){if(e!==r[n].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(r[0].dims[t]!==r[n].dims[t])throw new Error("Input shapes are not matched.")}if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.");for(let n=1;n<r.length;n++)if(r[0].type!==r[n].type)throw new Error("Input types are not matched.")}});var Ly,w3,x3,Ry=N(()=>{"use strict";qo();ke();Ly=(r,e)=>{x3(e);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[r.run({...n,get:()=>w3(r,e,n)},e)]},w3=(r,e,n)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let a=o.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},shaderSource:s}},x3=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 input.");if(r[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(r[1].dims[0]!==r[0].dims.length)throw new Error("Invalid input shape.");if(br.indexOf(r[0].type)===-1)throw new Error("Invalid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invalid repeat type.")}});var cc,zy,My,T3,I3,By=N(()=>{"use strict";Ve();cc=(r,e,n)=>{T3(e);let t=ie.unsqueezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},zy=(r,e)=>(I3(e),cc(r,[e[0]],Array.from(e[1].integerData))),My=r=>r.attributes.getInts("axes"),T3=r=>{if(!r||r.length!==1)throw new Error("Unsqueeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},I3=r=>{if(!r||r.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var Vy,Fy=N(()=>{"use strict";Jm();cg();fg();_g();oa();nb();ub();db();hb();yb();wb();Sb();Pb();ia();kb();qb();ey();ny();uy();cy();my();Sy();Py();Dy();Ny();Ry();sa();jl();By();ic();Vy=[["Abs","","6+",vg],["Acos","","7+",wg],["Add","","7+",Ym],["And","","7+",Qm],["Asin","","7+",xg],["Atan","","7+",Tg],["AveragePool","","7+",Lb,Rb],["BatchNormalization","","7+",Xm,Zm],["Cast","","6+",dg,pg],["Ceil","","6+",$g],["Clip","","6-10",Hl,Ig],["Clip","","11+",Sg],["Concat","","4+",gg,yg],["Conv","","1+",Ql,ec],["ConvTranspose","","1+",eb,tb],["Cos","","7+",Ag],["Div","","7+",eg],["Dropout","","7+",ql],["DepthToSpace","","1+",ab,sb],["Equal","","7+",tg],["Elu","","6+",Og,Pg],["Exp","","6+",Eg],["Flatten","","1+",lb,cb],["Floor","","6+",Cg],["FusedConv","com.microsoft","1+",Ql,ec],["Gather","","1+",pb,fb],["Gemm","","7-10",tc,gb],["Gemm","","11+",tc,bb],["GlobalAveragePool","","1+",Mb,Bb],["GlobalMaxPool","","1+",Wb],["Greater","","7+",ng],["Identity","","1+",ql],["ImageScaler","","1+",_b,vb],["InstanceNormalization","","6+",Tb,Ib],["LeakyRelu","","6+",Dg,kg],["Less","","7+",rg],["LRN","","1+",$b,Ab],["Log","","6+",Ng],["MatMul","","1+",jg,Kg],["MaxPool","","1+",Vb,Fb],["Mul","","7+",og],["Neg","","6+",Lg],["Not","","1+",Rg],["Or","","7+",ig],["Pad","","2-10",nc,Eb],["Pad","","11+",Cb,Db],["Pow","","7+",ag],["PRelu","","7+",sg],["ReduceLogSum","","1+",Yb,yr],["ReduceMax","","1+",Xb,yr],["ReduceMean","","1+",Kb,yr],["ReduceMin","","1+",Zb,yr],["ReduceProd","","1+",Jb,yr],["ReduceSum","","1-12",jb,yr],["ReduceSumSquare","","1+",Qb,yr],["Relu","","6+",zg],["Reshape","","5+",ty],["Resize","","10",sc,ay],["Resize","","11+",sc,sy],["Shape","","1+",ly],["Sigmoid","","6+",Mg],["Sin","","7+",Bg],["Slice","","10+",hy],["Slice","","1-9",dy,py],["Softmax","","1-12",_y,vy],["Softmax","","13+",xy,wy],["Split","","2-12",Ay,Oy],["Sqrt","","6+",Vg],["Squeeze","","1-12",lc,Cy],["Squeeze","","13+",Ey],["Sub","","7+",ug],["Sum","","6+",ky],["Tan","","7+",Fg],["Tanh","","6+",Gg],["Tile","","6+",Ly],["Transpose","","1+",Vr,ob],["Upsample","","7-8",rc,oy],["Upsample","","9",rc,iy],["Unsqueeze","","1-12",cc,My],["Unsqueeze","","13+",zy],["Xor","","7+",lg]]});function Uy(r){let e={},n;for(;(n=Gy.exec(r))!==null;){let t=n[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[n[2]]={params:t,body:n[4]}}for(let t in e){let o=S3.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(n=i.exec(r))!==null;){let a=n[1],s=n[2],u=n[3].split(","),l=a?`${a} ${s};`:"",c=e[t].body,p="";e[t].params.forEach((g,m)=>{g&&(p+=`${g.type} ${g.name} = ${u[m]};
`)}),c=`${p}
 ${c}`,c=c.replace("return",`${s} = `);let h=`
      ${l}
      {
        ${c}
      }
      `;r=r.replace(n[0],h)}}return r=r.replace(Gy,""),r}var Gy,S3,Wy=N(()=>{"use strict";Gy=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,S3="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function po(r,e){let n=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:$3(e,r).sort(),a=0;for(let s=0;s<r.length;++s){if(i!=null){if(i[a]===s&&r[s]!==1)throw new Error(`Can't squeeze axis ${s} since its dim '${r[s]}' is not 1`);(i[a]==null||i[a]>s)&&r[s]===1&&(n.push(r[s]),t.push(s)),i[a]<=s&&a++}r[s]!==1&&(n.push(r[s]),t.push(s))}return{newShape:n,keptDims:t}}function $3(r,e){let n=e.length;return r=r==null?e.map((t,o)=>o):[].concat(r),io(r.every(t=>t>=-n&&t<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${r}`),io(r.every(A3),()=>`All values in axis param must be integers but got axis ${r}`),r.map(t=>t<0?n+t:t)}function A3(r){return r%1===0}function O3(r){if(r.length===0)return 1;let e=r[0];for(let n=1;n<r.length;n++)e*=r[n];return e}function Hy(r){let e=Math.ceil(Math.sqrt(r));return[e,Math.ceil(r/e)]}var da,dc=N(()=>{"use strict";Dt();Ve();da=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,n){let t=this.computeTexture(e,n);return n&&n.isPacked&&(t[0]/=2,t[1]/=2),n&&n.reverseWH?[t[1],t[0]]:t}computeTexture(e,n){let t=n&&n.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(n&&n.breakAxis!==void 0){let s=n.breakAxis>=e.length?1:e.slice(n.breakAxis).reduce((l,c)=>l*c),u=n.breakAxis<=0?1:e.slice(0,n.breakAxis).reduce((l,c)=>l*c);if(s>o||u>o)Fe.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${n.breakAxis}`);else return[s,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((s,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=po(i).newShape);let a=O3(i);return i.length<=1&&a<=o?[1,a]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?Hy(a/4).map(s=>s*2):Hy(a)}}});var pa,qy=N(()=>{"use strict";Ve();Yn();Je();dc();zn();pa=class extends Vt{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new ee(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new ee(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let n=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(n.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputPacked1DCoords(n,t);break;case 2:o[i]=this.getOutputPacked2DCoords(n,t);break;case 3:o[i]=this.getOutputPacked3DCoords(n,t);break;default:o[i]=this.getOutputPackedNDCoords(n,t)}let s=`
      void setOutput(vec4 val) {
        ${de(this.context.glContext.version).output} = val;
      }
    `,u="floatTextureSetRGBA";return o[u]=new ee(s),o}getUnpackedOutputSamplingSnippet(e){let n=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(n.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputUnpacked1DCoords(n,t);break;case 2:o[i]=this.getOutputUnpacked2DCoords(n,t);break;case 3:o[i]=this.getOutputUnpacked3DCoords(n,t);break;case 4:o[i]=this.getOutputUnpacked4DCoords(n,t);break;case 5:o[i]=this.getOutputUnpacked5DCoords(n,t);break;case 6:o[i]=this.getOutputUnpacked6DCoords(n,t);break;default:throw new Error(`Unsupported output dimensionality: ${n.length}`)}let s=`
        void setOutput(float val) {
          ${de(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,u="floatTextureSetR";return o[u]=new ee(s),o}getOutputScalarCoords(){return new ee(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,n){let t=n,o="";return t[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `,new ee(o)):t[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `,new ee(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new ee(o))}getOutputPacked2DCoords(e,n){let t="";if(kr.arraysEqual(e,n))return t=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${n[0]}, ${n[1]}));
        }
      `,new ee(t);let o=n,i=Math.ceil(e[1]/2);return t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new ee(t)}getOutputPacked3DCoords(e,n){let t=[n[0],n[1]],o=Math.ceil(e[2]/2),i=o*Math.ceil(e[1]/2),a=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;

          int b = index / ${i};
          index -= b * ${i};

          // reverse r and c order for packed texture
          int r = imod(index, ${o}) * 2;
          int c = 2 * (index / ${o});

          return ivec3(b, r, c);
        }
      `;return new ee(a)}getOutputPackedNDCoords(e,n){let t=[n[0],n[1]],o=Math.ceil(e[e.length-1]/2),i=o*Math.ceil(e[e.length-2]/2),a=i,s="",u="b, r, c";for(let c=2;c<e.length-1;c++)a*=e[e.length-c-1],s=`
      int b${c} = index / ${a};
      index -= b${c} * ${a};
    `+s,u=`b${c}, `+u;let l=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.y * ${t[0]} + resTexRC.x;

        ${s}

        int b = index / ${i};
        index -= b * ${i};

        // reverse r and c order for packed texture
        int r = imod(index, ${o}) * 2;
        int c = 2 * (index / ${o});

        return ivec${e.length}(${u});
      }
    `;return new ee(l)}getOutputUnpacked1DCoords(e,n){let t=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          return resTexRC.y * ${n[0]} + resTexRC.x;
        }
      `;return new ee(t)}getOutputUnpacked2DCoords(e,n){let t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new ee(t)}getOutputUnpacked3DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new ee(t)}getOutputUnpacked4DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new ee(t)}getOutputUnpacked5DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new ee(t)}getOutputUnpacked6DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3","d4"],s=i.map((u,l)=>{let c=`int ${a[l]} = index / ${u}`,p=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${c}; ${p};`}).join("");return t=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${n[0]}, ${n[1]}));
         int index = resTexRC.y * ${n[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new ee(t)}getCommonUtilFuncs(){let e={},n="uvFromFlat";e[n]=new ee(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),n="packedUVfrom1D",e[n]=new ee(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="packedUVfrom2D",e[n]=new ee(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="packedUVfrom3D",e[n]=new ee(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="sampleTexture";let t=de(this.context.glContext.version);return e[n]=new ee(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${t.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},n=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=Ji(t);i.isPacked?e[a]=this.getPackedSamplerFromInput(a,t,i):e[a]=this.getUnpackedSamplerFromInput(a,t,i);let s=km(t);i.unpackedShape.length<=n.unpackedShape.length&&(i.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,i,n,t):e[s]=this.getUnpackedSamplerAtOutputCoords(s,i,n,t))}),e}getPackedSamplerAtOutputCoords(e,n,t,o){let i=n.unpackedShape,a=t.unpackedShape,u=Ji(o),l=i.length,c=a.length,p=vt.getBroadcastDims(i,a),h=wt(c),g=c-l,m,_=Xt();l===0?m="":c<2&&p.length>=1?m="coords = 0;":m=p.map(T=>`coords.${_[T+g]} = 0;`).join(`
`);let S="";c<2&&l>0?S="coords":S=i.map((T,W)=>`coords.${_[W+g]}`).join(", ");let v="return outputValue;",$=ie.size(i)===1,P=ie.size(a)===1;if(l===1&&!$&&!P)v=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if($&&!P)c===1?v=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:v=`
          return vec4(outputValue.x);
        `;else if(p.length){let T=l-2,W=l-1;p.indexOf(T)>-1&&p.indexOf(W)>-1?v="return vec4(outputValue.x);":p.indexOf(T)>-1?v="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":p.indexOf(W)>-1&&(v="return vec4(outputValue.xx, outputValue.zz);")}let C=`
        int lastDim = coords.${_[c-1]};
        coords.${_[c-1]} = coords.${_[c-2]};
        coords.${_[c-2]} = lastDim;
      `,R=`
      vec4 ${e}() {
        ${h} coords = getOutputCoords();
        ${C}
        ${m}
        vec4 outputValue = ${u}(${S});
        ${v}
      }
    `;return new ee(R,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,n,t,o){let i=[t.width,t.height],a=[n.width,n.height],s=n.unpackedShape.length,u=t.unpackedShape.length,l=n.unpackedShape,c=t.unpackedShape,p=Ji(o);if(s===u&&kr.arraysEqual(a,i)){let $=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new ee($,["coordinates.sampleTexture"])}let h=wt(u),g=vt.getBroadcastDims(l,c),m=u-s,_,S=Xt();s===0?_="":u<2&&g.length>=1?_="coords = 0;":_=g.map($=>`coords.${S[$+m]} = 0;`).join(`
`);let v="";u<2&&s>0?v="coords":v=n.unpackedShape.map(($,O)=>`coords.${S[O+m]}`).join(", ");let x=`
        float ${e}() {
          ${h} coords = getOutputCoords();
          ${_}
          return ${p}(${v});
        }
      `;return new ee(x,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,n,t){switch(t.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,n);case 1:return this.getPackedSampler1D(e,n,t);case 2:return this.getPackedSampler2D(e,n,t);case 3:return this.getPackedSampler3D(e,n,t);default:return this.getPackedSamplerND(e,n,t)}}getUnpackedSamplerFromInput(e,n,t){let o=t.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,n,t);case 1:return this.getUnpackedSampler1D(e,n,t);case 2:return this.getUnpackedSampler2D(e,n,t);case 3:return this.getUnpackedSampler3D(e,n,t);case 4:return this.getUnpackedSampler4D(e,n,t);case 5:return this.getUnpackedSampler5D(e,n,t);case 6:return this.getUnpackedSampler6D(e,n,t);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,n){let t=de(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${t.texture2D}(${n}, halfCR);
          }
        `;return new ee(o)}getPackedSampler1D(e,n,t){let o=[t.width,t.height],i=[o[1],o[0]],a=de(this.context.glContext.version),u=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${a.texture2D}(${n}, uv);
    }`;return new ee(u,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,n,t){let o=t.unpackedShape,i=[t.width,t.height],a=de(this.context.glContext.version),s=i[0],u=i[1];if(i!=null&&kr.arraysEqual(o,i)){let g=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${s}.0);
        return ${a.texture2D}(${n}, uv);
      }`;return new ee(g)}let l=i,c=Math.ceil(o[1]/2),h=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l[1]}, ${l[0]}, ${c}, row, col);
      return ${a.texture2D}(${n}, uv);
    }`;return new ee(h,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,n,t){let o=t.unpackedShape,i=[t.width,t.height],a=[i[0],i[1]],s=de(this.context.glContext.version);if(o[0]===1){let m=o.slice(1),_=[1,2],S=ao(o,m),v=["b","row","col"],x=JSON.parse(JSON.stringify(t));x.unpackedShape=S;let $=this.getPackedSamplerFromInput(e,n,x),P=`${$.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${so(v,_)});
      } `;return new ee(P,$.dependencies)}let u=a[0],l=a[1],c=Math.ceil(o[2]/2),p=c*Math.ceil(o[1]/2),g=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${u}, ${p}, ${c}, b, row, col);
      return ${s.texture2D}(${n}, uv);}`;return new ee(g,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,n,t){let o=t.unpackedShape,i=o.length,a=[t.width,t.height],s=de(this.context.glContext.version),u=[a[0],a[1]],l=u[1],c=u[0],p=Math.ceil(o[i-1]/2),h=p*Math.ceil(o[i-2]/2),g="int b, int row, int col",m=`b * ${h} + (row / 2) * ${p} + (col / 2)`;for(let v=2;v<i-1;v++)g=`int b${v}, `+g,h*=o[i-v-1],m=`b${v} * ${h} + `+m;let S=`vec4 ${e}(${g}) {
      int index = ${m};
      int texR = index / ${c};
      int texC = index - texR * ${c};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${c}, ${l});
      return ${s.texture2D}(${n}, uv);
    }`;return new ee(S)}getUnpackedSamplerScalar(e,n,t){let[o,i]=[t.width,t.height];if(o===1&&i===1){let s=`
          float ${e}() {
            return sampleTexture(${n}, halfCR);
          }
        `;return new ee(s,["coordinates.sampleTexture"])}let a=`
        float ${e}() {
          int offset_${n} = coordsToOffset(TexCoords, ${o}, ${i});
          vec2 uv = uvFromFlat(${o}, ${i}, offset_${n});
          return sampleTexture(${n}, uv);
        }
      `;return new ee(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,n,t){let o=t.width,i=t.height;if(i===1&&o===1){let s=`
        float ${e}(int index) {
          return sampleTexture(${n}, halfCR);
        }
      `;return new ee(s,["coordinates.sampleTexture"])}if(i===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${n}, uv);
          }
        `;return new ee(s,["coordinates.sampleTexture"])}if(o===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new ee(s,["coordinates.sampleTexture"])}let a=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${i}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new ee(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,n,t){let o=t.unpackedShape,i=[t.height,t.width];if(i!=null&&kr.arraysEqual(o,i)){let h=i[1],g=i[0],m=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${h}.0, ${g}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new ee(m,["coordinates.sampleTexture"])}let{newShape:a,keptDims:s}=po(o),u=a;if(u.length<o.length){let h=ao(o,u),g=JSON.parse(JSON.stringify(t));g.unpackedShape=h;let m=["col","row"],_=`
          ${this.getUnpackedSamplerFromInput(e,n,g).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${so(m,s)});
          }
        `;return new ee(_,["coordinates.sampleTexture"])}let l=i[1],c=i[0];if(c===1){let h=`
          float ${e}(int row, int col) {
            int offset_${n} = coordsToOffset(TexCoords, ${l}, ${c});
            float index = dot(vec3(row, col, offset_${n}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new ee(h,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(l===1){let h=`
          float ${e}(int row, int col) {
            int offset_${n} = coordsToOffset(TexCoords, ${l}, ${c});
            float index = dot(vec3(row, col, offset_${n}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${c}.0, 0.5);
            return sampleTexture(${n}, uv);
          }
        `;return new ee(h,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let p=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${l}, ${c}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new ee(p,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,n,t){let o=t.unpackedShape,i=o[1]*o[2],a=o[2],{newShape:s,keptDims:u}=po(o),l=s;if(l.length<o.length){let g=ao(o,l),m=["batch","col","row"],_=JSON.parse(JSON.stringify(t));_.unpackedShape=g;let S=this.getUnpackedSamplerFromInput(e,n,_),v=u.reverse(),x=`
          ${S.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${so(m,v)});
          }
        `;return new ee(x,S.dependencies)}let c=t.width,p=t.height,h=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${a} + row;
            vec2 uv = uvFromFlat(${c}, ${p}, index);
            return sampleTexture(${n}, uv);
          }
      `;return new ee(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,n,t){let o=t.unpackedShape,i=o[3],a=o[2]*i,s=o[1]*a,u=t.width,l=t.height,c=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${a} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${u}, ${l}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new ee(c,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,n,t){let o=t.unpackedShape,i=o[4],a=o[3]*i,s=o[2]*a,u=o[1]*s,{newShape:l,keptDims:c}=po(o);if(l.length<o.length){let m=ao(o,l),_=["row","col","depth","depth2","depth3"],S=JSON.parse(JSON.stringify(t));S.unpackedShape=m;let v=`
          ${this.getUnpackedSamplerFromInput(e,n,S).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${so(_,c)});
          }
        `;return new ee(v,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=t.width,h=t.height,g=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${s} + depth * ${a} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${p}, ${h}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new ee(g,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,n,t){let o=t.unpackedShape,i=o[5],a=o[4]*i,s=o[3]*a,u=o[2]*s,l=o[1]*u,{newShape:c,keptDims:p}=po(o);if(c.length<o.length){let _=ao(o,c),S=["row","col","depth","depth2","depth3","depth4"],v=JSON.parse(JSON.stringify(t));v.unpackedShape=_;let x=`
            ${this.getUnpackedSamplerFromInput(e,n,v).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${so(S,p)});
            }
          `;return new ee(x,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let h=t.width,g=t.height,m=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${l} + col * ${u} + depth * ${s} +
            depth2 * ${a} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${h}, ${g}, index);
            return sampleTexture(${n}, uv);
          }
        `;return new ee(m,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,n=e.shape.length,t=e.strides,o=e.width,i=e.height,a=[];for(let u=0;u<n-1;++u)a.push(`
        c[${u}] = offset / ${t[u]};`),a.push(`
        offset -= c[${u}] * ${t[u]};`);a.push(`
        c[${n-1}] = offset;`);let s=`
      void toVec(vec2 texCoords, out int c[${n}]) {
        int offset = coordsToOffset(texCoords, ${o}, ${i});
        ${a.join("")}
      }
      void toVec(int offset, out int c[${n}]) {
        ${a.join("")}
      }
    `;return{toVec:new ee(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t],a=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length,s=`_${n}`;e[s]=new ee(this.getValueFromSingle(n,a,o.width,o.height,!1),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),s=s+"_T",e[s]=new ee(this.getValueFromSingle(n,a,o.width,o.height,!0),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,n,t,o,i){let a=`_${e}`;i&&(a=a+"_T");let s=de(this.context.glContext.version);return`
        float ${a}(int m[${n}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          float value = getColorAsFloat(${s.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,n,t,o,i){let a=`_${e}_Pack`;i&&(a=a+"_T");let s=de(this.context.glContext.version);return`
        vec4 ${a}(int m[${n}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          return ${s.texture2D}(${e}, coords);
        }
        `}}});var fa,jy=N(()=>{"use strict";Yn();fa=class r extends Vt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new ee(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new ee(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new ee(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${e}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new ee(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),n=new Uint32Array(e),t=new Uint8Array(e);if(n[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var ha,Ky=N(()=>{"use strict";Yn();Je();ha=class extends Vt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=de(this.context.glContext.version);return{setFragColor:new ee(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new ee(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var ma,Xy=N(()=>{"use strict";Yn();ma=class r extends Vt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let a=i.length,s=e-a,u=`bcastIndices_${t}`,l="";for(let p=0;p<a;++p)l+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${s+p}]), ${i[p]}.0) );
          `;let c=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
        }
        `;n[u]=new ee(c)}}),n}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let a=i.length,s=e-a,u=`bcastMatmulIndices_${t}`,l="";for(let p=0;p<a-2;++p)l+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${s+p}]), ${i[p]}.0) );
          `;let c=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
          realIndices[${a-1}] = bcastedIndices[${e-1}];
          realIndices[${a-2}] = bcastedIndices[${e-2}];
        }
        `;n[u]=new ee(c)}}),n}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`indicesToOffset_${n}`;e[s]=new ee(r.indexToOffsetSingle(s,a,i)),s=`indicesToOffset_${n}_T`,e[s]=new ee(r.indexToOffsetSingle(s,a,i.slice().reverse()))}),e}static indexToOffsetSingle(e,n,t){let o="";for(let i=n-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${n}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`offsetToIndices_${n}`;e[s]=new ee(r.offsetToIndicesSingle(s,a,i)),s=`offsetToIndices_${n}_T`,e[s]=new ee(r.offsetToIndicesSingle(s,a,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,n,t){let o=[];for(let i=0;i<n-1;++i)o.push(`
      indices[${i}] = offset / ${t[i]};`),o.push(`
        offset -= indices[${i}] * ${t[i]};`);return o.push(`
      indices[${n-1}] = offset;`),`
      void ${e}(int offset, out int indices[${n}]) {
        ${o.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=o.length,a=`incrementIndices_${n}`,s="";for(let l=0;l<i;++l)s+=`
        shape[${l}] = ${o[l]};`;let u=`
        void ${a}(int axis, out int indices[${i}]) {
          int shape[${i}];
          ${s};
          for(int i = ${i} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[a]=new ee(u)}),e}}});var ga,Zy=N(()=>{"use strict";Yn();ga=class extends Vt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let n=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let a=`${i}Vec`,s="";for(let l=0;l<n;++l)s+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${a}(int src[${n}], out int dest[${n}]) {
          ${s}
        }
        `;o[a]=new ee(u)}return o}copyVec(){let n=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<n;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${n}], out int dest[${n}]) {
        ${t}
      }
      `;return{copyVec:new ee(o)}}setVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${n} + index;
        if (index == 0)
            m[0] = value;
        `;for(let i=1;i<n-1;++i)t+=`
        else if (index == ${i})
            m[${i}] = value;
            `;t+=`
        else
            m[${n-1}] = value;
        `;let o=`
      void setVecItem(out int m[${n}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new ee(o)}}getVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${n} + index;
        if (index == 0)
            return m[0];
      `;for(let i=1;i<n-1;++i)t+=`
        else if (index == ${i})
            return m[${i}];
      `;t+=`
        else
            return m[${n-1}];
        `;let o=`
      int getVecItem(int m[${n}], int index) {
        ${t}
      }
    `;return{getVecItem:new ee(o)}}}});var pc,Jy=N(()=>{"use strict";qy();jy();Ky();Xy();Zy();pc={encoding:fa,fragcolor:ha,vec:ga,shapeUtils:ma,coordinates:pa}});var ba,Yy=N(()=>{"use strict";Yn();Wy();Jy();Je();ba=class{constructor(e,n,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new ta(e,n,t,o),Object.keys(pc).forEach(a=>{let s=new pc[a](this.context);this.libs[a]=s});let i=this.glslLibRoutineDependencyGraph;for(let a in this.libs){let u=this.libs[a].getFunctions();for(let l in u){let c=a+"."+l,p;i[c]?(p=i[c],p.routineBody=u[l].routineBody):(p=new Ho(c,u[l].routineBody),i[c]=p);let h=u[l].dependencies;if(h)for(let g=0;g<h.length;++g)if(i[h[g]])p.addDependency(i[h[g]]);else{let m=new Ho(h[g]);i[h[g]]=m,p.addDependency(m)}}}}preprocess(){let e=this.context.programInfo,n=e.shaderSource;return this.context.programInfo.hasMain||(n=`${n}
      ${Dm(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),n=Uy(n),`${Cm(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(n)}
    ${n}`}getImports(e){let n=this.selectGlslLibRoutinesToBeIncluded(e);if(n.length===0)return"";let t="";for(let o=0;o<n.length;++o)if(n[o].routineBody)t+=n[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${n[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let n=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&n.push(this.glslLibRoutineDependencyGraph[t])}),na.returnOrderedNodes(n)}getUniforms(e,n){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(n)for(let o of n)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var ya,Qy=N(()=>{"use strict";ft();Dt();Yy();Je();ya=class{constructor(e,n,t){this.profiler=e;this.glContext=n;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],n)}catch(a){throw Fe.error("ProgramManager",e.programInfo.shaderSource),a}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,n,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new ba(this.glContext,e,n,t),i=o.preprocess(),a=this.compile(i);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){Fe.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=Em(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}me.debug&&Fe.verbose("ProrgramManager",`FragShader:
${e}
`);let n=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,n);return this.glContext.deleteShader(n),t}bindOutput(e){let n=e.width,t=e.height;Fe.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${n}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,n,t)}bindAttributes(e){let n=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(n,t),this.attributesBound=!0}bindUniforms(e,n,t){let o=this.glContext.gl,i=0;for(let{name:a,type:s,location:u,arrayLength:l}of e){let c=n.find(p=>p.name===a)?.data;if(s!=="sampler2D"&&!c)throw new Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,c):o.uniform1f(u,c);break;case"int":l?o.uniform1iv(u,c):o.uniform1i(u,c);break;default:throw new Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,n,t){this.glContext.bindTextureToUniform(e.texture,t,n)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,n,t){let o=[];if(n)for(let i of n)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,n){let o=this.glContext.gl.getUniformLocation(e,n);if(o===null)throw new Error(`Uniform ${n} not found.`);return o}getAttribLocation(e,n){return this.glContext.gl.getAttribLocation(e,n)}}});var _a,e_=N(()=>{"use strict";Dt();Uo();_a=class{constructor(e,n,t,o){this.glContext=e;this.layoutStrategy=n;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,n,t,o){let i=this.toEncoderType(e),a=this.glContext.getEncoder(i,n.channels||1,o);if(n.isPacked&&o===1)throw new Error("not implemented");let s=n.width,u=n.height,l,c;if(this.config.reuseTextures){l=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,c=this.inUseTextures.get(l),c||(c=[],this.inUseTextures.set(l,c));let h=this.idleTextures.get(l);if(h&&h.length>0){let g=h.pop();return c.push(g),o===1&&this.glContext.updateTexture(g,s,u,a,this.toTextureData(e,t)),g}}Fe.verbose("TextureManager",`Creating new texture of size ${n.width}x${n.height}`);let p=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,t));return this.config.reuseTextures&&(c.push(p),this.textureLookup.set(p,l)),p}readTexture(e,n,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((a,s)=>a*s)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(n),t);return this.toTensorData(n,i)})}async readTextureAsync(e,n,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(a=>i?.push(a))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,c)=>l*c)*t;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(n),t),s=this.toTensorData(n,a),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let n=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,n*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,n)})}releaseTexture(e,n){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){n&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let a=this.idleTextures.get(t);a||(a=[],this.idleTextures.set(t,a)),a.push(e.texture)}}}(!t||n)&&(Fe.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,n){switch(e){case"int16":return n instanceof Int16Array?n:Int16Array.from(n);case"int32":return n instanceof Int32Array?n:Int32Array.from(n);case"int8":return n instanceof Int8Array?n:Int8Array.from(n);case"uint16":return n instanceof Uint16Array?n:Uint16Array.from(n);case"uint32":return n instanceof Uint32Array?n:Uint32Array.from(n);case"uint8":case"bool":return n instanceof Uint8Array?n:Uint8Array.from(n);case"float32":return n instanceof Float32Array?n:Float32Array.from(n);case"float64":return n instanceof Float64Array?n:Float64Array.from(n);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,n){if(n)return n instanceof Float32Array?n:new Float32Array(n)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var va,t_=N(()=>{"use strict";Dt();Ff();jm();Fy();Qy();dc();e_();va=class{constructor(e,n){this.backend=e;this.context=n;this.layoutStrategy=new da(e.glContext.maxTextureSize),this.programManager=new ya(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new _a(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new ea(this)}onGraphInitialized(e){let n=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(n)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,n){return n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){Fe.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,n):this.unpackedTextureDataCache.set(e,n)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,n,t){let o=Vf(e,n,Vy);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function P3(r){let e=0;for(;e<r.length&&r[e]();++e);return e-1}var Ko,n_=N(()=>{"use strict";ft();Uo();Uo();zn();Ko=class{constructor(e,n){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=n,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,n,t,o){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=o?t.encode(o,e*n):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,n,0,t.format,t.textureType,s),this.checkError(),a}updateTexture(e,n,t,o,i){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=o.encode(i,n*t);a.texSubImage2D(a.TEXTURE_2D,0,0,0,n,t,o.format,o.textureType,s),this.checkError()}attachFramebuffer(e,n,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,n,t),o.scissor(0,0,n,t)}readTexture(e,n,t,o,i,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,n,t);let u=this.getEncoder(i,a),l=u.allocate(n*t);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,n,t,s.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,n){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),n!==-1&&(t.vertexAttribPointer(n,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(n)),this.checkError()}createProgram(e,n){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,n),t.linkProgram(o),o}compileShader(e,n){let t=this.gl,o=t.createShader(n);if(!o)throw new Error(`createShader() returned null with type ${n}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,n,t){let o=this.gl;o.activeTexture(o.TEXTURE0+n),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,n),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(me.debug){let e=this.gl,n=e.getError(),t="";switch(n){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${n.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,n,t=0){if(this.version===2)return new Yi(this.gl,n);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new Go(this.gl,n):new Go(this.gl,n,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Qi(this.gl,n);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let n=0;n<this.maxTextureImageUnits;++n)e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,n=e.createBuffer();if(!n)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),n}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,n,t,o,i,a;try{n=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,n);let s=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),a=e.createProgram(),!a)?!1:(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),n&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(n))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(n.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension;e.endQuery(n.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let n=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;n=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return n&&!t}getTimerResult(e){let n=0;if(this.version===2){let t=this.gl;n=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return n/1e6}async waitForQueryAndGetTime(e){return await zl(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let n,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?n=()=>!0:n=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:n}}async pollFence(e){return new Promise(n=>{this.addItemToPoll(()=>e.isFencePassed(),()=>n())})}pollItems(){let e=P3(this.itemsToPoll.map(n=>n.isDoneFn));for(let n=0;n<=e;++n){let{resolveFn:t}=this.itemsToPoll[n];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,n){this.itemsToPoll.push({isDoneFn:e,resolveFn:n}),!(this.itemsToPoll.length>1)&&await zl(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function fc(r){let e;if((!r||r==="webgl2")&&"webgl2"in fo?e=fo.webgl2:(!r||r==="webgl")&&"webgl"in fo&&(e=fo.webgl),!e)try{let t=C3();e=r_(t,r)}catch{let t=E3();e=r_(t,r)}r=r||e.version===1?"webgl":"webgl2";let n=e.gl;return fo[r]=e,n.isContextLost()?(delete fo[r],fc(r)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),e)}function r_(r,e){let n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=n;if((!e||e==="webgl2")&&(t=r.getContext("webgl2",o),t))try{return new Ko(t,2)}catch(i){Fe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=r.getContext("webgl",o)||r.getContext("experimental-webgl",o),t))try{return new Ko(t,1)}catch(i){Fe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function E3(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let r=document.createElement("canvas");return r.width=1,r.height=1,r}function C3(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var fo,o_=N(()=>{"use strict";Dt();n_();fo={}});var wa,i_=N(()=>{"use strict";ft();Dt();t_();o_();wa=class{get contextId(){return me.webgl.contextId}set contextId(e){me.webgl.contextId=e}get matmulMaxBatchSize(){return me.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){me.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return me.webgl.textureCacheMode}set textureCacheMode(e){me.webgl.textureCacheMode=e}get pack(){return me.webgl.pack}set pack(e){me.webgl.pack=e}get async(){return me.webgl.async}set async(e){me.webgl.async=e}initialize(){try{return this.glContext=fc(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Fe.setWithEnv(me),me.webgl.context||Object.defineProperty(me.webgl,"context",{value:this.glContext.gl}),Fe.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Fe.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new va(this,e)}dispose(){this.glContext.dispose()}}});async function hc(r){if(r){let e=typeof r=="string"?[r]:r;for(let n of e){let t=a_.get(n);if(t)return t;let o=await k3(n);if(o)return o}}else return hc(["webgl"]);throw new Error("no available backend to use")}async function k3(r){let e=D3;if(typeof e[r]<"u"&&N3(e[r])){let n=e[r],t=n.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return a_.set(r,n),n}}function N3(r){let e=r;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var a_,D3,s_=N(()=>{"use strict";i_();a_=new Map,D3={webgl:new wa}});var mc,xa,u_=N(()=>{"use strict";Dt();mc=class{constructor(e,n){this.op=e;this.node=n}},xa=class{constructor(e,n,t){this.graph=e;this.profiler=t;this.initialize(n)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let n=this.graph.getNodes();if(n.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new mc(t,n[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let a of t.node.inputs)if(!this._values[a]&&this.graph.getInputIndices().indexOf(a)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,n){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(n.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${n.length} expected: ${o.length}`);n.forEach((c,p)=>{let h=o[p];this._values[h]=c});let i=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<i.length;){let c=i[u++],p=this._ops[c],h=p.node.inputs.map(S=>this._values[S]);if(h.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${p.node}`);let g=h;Fe.verbose("ExecPlan",`Running op:${p.node.name} (${g.map((S,v)=>`'${p.node.inputs[v]}': ${S.type}[${S.dims.join(",")}]`).join(", ")})`);let m=await this.profiler.event("node",p.node.name,async()=>p.op.impl(t,g,p.op.context));if(m.length!==p.node.outputs.length)throw new Error("the size of output does not match model definition.");m.forEach((S,v)=>{let x=p.node.outputs[v];if(this._values[x])throw new Error(`output [${x}] already has value: op:${p.node.name}`);this._values[x]=S});let _=new Set;m.forEach((S,v)=>{let x=p.node.outputs[v];for(let $ of a[x].to){let O=s[$],P=!0;for(let C of O.inputs)if(!this._values[C]){P=!1;break}P&&_.add($)}}),i.push(..._)}let l=[];for(let c=0;c<this.graph.getOutputIndices().length;c++){let p=this.graph.getOutputIndices()[c],h=this._values[p];if(h===void 0)throw new Error(`required output [${p}] does not have value`);p===0?await h.getData():h.data,l.push(h)}return Fe.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var Pe,Xo,l_=N(()=>{"use strict";Lo();Pe=we(oo());zr();Ve();Xo=class r{constructor(e){if(this._attributes=new Map,e!=null){for(let n of e)n instanceof Pe.onnx.AttributeProto?this._attributes.set(n.name,[r.getValue(n),r.getType(n)]):n instanceof Wi.Attribute&&this._attributes.set(n.name(),[r.getValue(n),r.getType(n)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,n,t){this._attributes.set(e,[t,n])}delete(e){this._attributes.delete(e)}getFloat(e,n){return this.get(e,"float",n)}getInt(e,n){return this.get(e,"int",n)}getString(e,n){return this.get(e,"string",n)}getTensor(e,n){return this.get(e,"tensor",n)}getFloats(e,n){return this.get(e,"floats",n)}getInts(e,n){return this.get(e,"ints",n)}getStrings(e,n){return this.get(e,"strings",n)}getTensors(e,n){return this.get(e,"tensors",n)}get(e,n,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==n)throw new Error(`type mismatch: expected ${n} but got ${o[1]}`);return o[0]}static getType(e){let n=e instanceof Pe.onnx.AttributeProto?e.type:e.type();switch(n){case Pe.onnx.AttributeProto.AttributeType.FLOAT:return"float";case Pe.onnx.AttributeProto.AttributeType.INT:return"int";case Pe.onnx.AttributeProto.AttributeType.STRING:return"string";case Pe.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case Pe.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case Pe.onnx.AttributeProto.AttributeType.INTS:return"ints";case Pe.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case Pe.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${Pe.onnx.AttributeProto.AttributeType[n]}`)}}static getValue(e){let n=e instanceof Pe.onnx.AttributeProto?e.type:e.type();if(n===Pe.onnx.AttributeProto.AttributeType.GRAPH||n===Pe.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(n===Pe.onnx.AttributeProto.AttributeType.INT&&St.isLong(t))return St.longToNumber(t);if(n===Pe.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let a=0;a<o.length;a++){let s=o[a];i[a]=St.longToNumber(s)}return i}if(n===Pe.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof Pe.onnx.AttributeProto?st.fromProto(t):st.fromOrtTensor(t);if(n===Pe.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof Pe.onnx.AttributeProto)return t.map(i=>st.fromProto(i));if(e instanceof Wi.Attribute)return t.map(i=>st.fromOrtTensor(i))}return n===Pe.onnx.AttributeProto.AttributeType.STRING&&e instanceof Pe.onnx.AttributeProto?Fo(t):n===Pe.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof Pe.onnx.AttributeProto?t.map(Fo):t}static getValueNoCheck(e){return e instanceof Pe.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case Pe.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case Pe.onnx.AttributeProto.AttributeType.INT:return e.i;case Pe.onnx.AttributeProto.AttributeType.STRING:return e.s;case Pe.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case Pe.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case Pe.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case Pe.onnx.AttributeProto.AttributeType.INTS:return e.ints;case Pe.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case Pe.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case Pe.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${Pe.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case zt.AttributeType.FLOAT:return e.f();case zt.AttributeType.INT:return e.i();case zt.AttributeType.STRING:return e.s();case zt.AttributeType.TENSOR:return e.t();case zt.AttributeType.GRAPH:return e.g();case zt.AttributeType.FLOATS:return e.floatsArray();case zt.AttributeType.INTS:{let n=[];for(let t=0;t<e.intsLength();t++)n.push(e.ints(t));return n}case zt.AttributeType.STRINGS:{let n=[];for(let t=0;t<e.stringsLength();t++)n.push(e.strings(t));return n}case zt.AttributeType.TENSORS:{let n=[];for(let t=0;t<e.tensorsLength();t++)n.push(e.tensors(t));return n}default:throw new Error(`unsupported attribute type: ${zt.AttributeType[e.type()]}`)}}}});var bc,yc,Vn,Ta,gc,c_=N(()=>{"use strict";l_();Lo();bc=we(oo());zr();Ve();yc={from:(r,e)=>new gc(r,e)},Vn=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=yt.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},Ta=class{constructor(e,n){e instanceof bc.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Xo(e.attribute)):e instanceof bl.Node&&(this.name=n??e.name(),this.opType=e.opType(),this.attributes=new Xo(yt.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},gc=class{constructor(e,n){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(n),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof bc.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof ml.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(n.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let a=this._allData.push(new Vn(i))-1;n.set(i.name,a),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let a=n.get(i.name);if(a===void 0){let s=new Vn;s.type={shape:{dims:yt.tensorDimsFromProto(i.dims)},tensorType:yt.tensorDataTypeFromProto(i.dataType)},a=this._allData.push(s)-1,n.set(i.name,a)}this._allData[a]._from=-1,this._allData[a].tensor=st.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(n.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let a=this._allData.push(new Vn(i))-1;n.set(i.name,a),this._allOutputIndices.push(a),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let s=0;;s++){let u=`unnamed_${i.opType}_${s}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let a=this._nodes.push(new Ta(i))-1;t.set(i.name,a)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.output)throw new Error(`missing output for node: ${s.name}`);for(let u of s.output){let l=n.get(u);if(typeof l>"u"&&(l=this._allData.push(new Vn)-1,n.set(u,l)),a.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,s.opType==="Constant"){if(!s.attribute||s.attribute.length!==1||!s.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!s.output||s.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=st.fromProto(s.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.input)throw new Error(`missing input for node: ${s.name}`);for(let u of s.input){let l=n.get(u);if(typeof l>"u"){if(u===""&&(s.input.length===3||s.input.length===4)&&s.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${s.name}`)}a.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let a=e.inputs(i);if(n.has(a))throw new Error(`duplicated input name: ${a}`);for(let s=0;s<e.nodeArgsLength();s++)if(e.nodeArgs(s)?.name()===a){let u=new Vn;if(e.nodeArgs(s)?.type()?.valueType()!==_l.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let c=e.nodeArgs(s).type().value(new yl.TensorTypeAndShape),p=yt.tensorDataTypeFromProto(c.elemType()),h=c.shape(),g=[];for(let _=0;_<h.dimLength();_++)g.push(St.longToNumber(h.dim(_).value().dimValue()));u.type={shape:{dims:g},tensorType:p};let m=this._allData.push(u)-1;n.set(a,m),o.push(a)}}for(let i=0;i<e.initializersLength();i++){let a=e.initializers(i),s=n.get(a.name());if(s===void 0){let u=new Vn,l=yt.tensorDimsFromORTFormat(a),c=yt.tensorDataTypeFromProto(a.dataType());u.type={shape:{dims:l},tensorType:c},s=this._allData.push(u)-1,n.set(a.name(),s)}this._allData[s]._from=-1,this._allData[s].tensor=st.fromOrtTensor(a)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let a=e.outputs(i);if(n.has(a))throw new Error(`duplicated output name: ${a}`);let s=this._allData.push(new Vn)-1;n.set(a,s),this._allOutputIndices.push(s),this._allOutputNames.push(a)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let a=e.nodes(i),s=a.name();if(!s)for(let l=0;s=`unnamed_${a.opType()}_${l}`,!!t.has(s);l++);if(t.has(s))throw new Error(`duplicated node name: ${s}`);let u=this._nodes.push(new Ta(a,s))-1;t.set(s,u)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s==null)throw new Error(`No node exists at index ${i}`);if(s?.outputsLength()===0)throw new Error(`missing output for node: ${s.name}`);for(let u=0;u<s?.outputsLength();u++){let l=s?.outputs(u),c=n.get(l);if(typeof c>"u"&&(c=this._allData.push(new Vn)-1,n.set(l,c)),a.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=i,s.opType()==="Constant"){if(s.attributesLength()!==1||!s.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(s.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=st.fromOrtTensor(s.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s.inputsLength()===0)throw new Error(`missing input for node: ${s.name}`);for(let u=0;u<s.inputsLength();u++){let l=s.inputs(u),c=n.get(l);if(typeof c>"u")throw new Error(`unrecognized input '${l}' for node: ${s.name()}`);a.inputs.push(c),this._allData[c]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(a=>{e.add(a)})});let n=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;n.length>0;){let o=n.pop();t[o]==="gray"?t[o]="black":(n.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let a=this._allData[i];if(typeof a.tensor<"u")throw new Error("node outputs should not be initialized");if(a._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");a._to.forEach(s=>{if(t[s]==="gray")throw new Error("model graph is cyclic");t[s]==="white"&&n.push(s)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,n=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)n[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=n[i._from]);for(let a=0;a<i._to.length;a++)if(i._to[a]>=0)i._to[a]=n[i._to[a]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(a=>{i=this._nodes[a].inputs.indexOf(o+e),i!==-1&&(this._nodes[a].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let n=this._nodes[e];if(n.outputs.length>1){for(let s=1;s<n.outputs.length;s++)if(this._allData[n.outputs[s]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}n.executeNode=!1;let t=n.inputs[0],o=n.outputs[0],i=this._allData[o].to;for(let s=0;s<n.inputs.length;s++){let u=this._allData[n.inputs[s]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[n.inputs[s]].to.splice(u,1)}this._allData[o]._to=[];let a=this._allOutputIndices.indexOf(o);if(a!==-1&&(this._allOutputIndices[a]=t),i&&i.length>0)for(let s of i){let u=this._nodes[s].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[s].inputs[u]=t,this._allData[t].to.push(s)}}removeAllDropoutNodes(){let e=0;for(let n of this._nodes){if(n.opType==="Dropout"){if(n.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(n.outputs.length!==1&&n.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(n.outputs.length===2&&this._allData[n.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let n of this._nodes)n.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let n=this._allData[e.outputs[0]]._to;if(n.length===1&&this.isActivation(this._nodes[n[0]])){let t=this._nodes[n[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Lr,Rr])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(n[0])}}}}});var d_,p_,Ia,f_=N(()=>{"use strict";d_=we(Be());c_();Lo();p_=we(oo());Ve();Ia=class{constructor(){}load(e,n,t){let o;if(!t)try{this.loadFromOnnxFormat(e,n);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,n)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,n){let t=p_.onnx.ModelProto.decode(e);if(St.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:St.longToNumber(i.version)})),this._graph=yc.from(t.graph,n)}loadFromOrtFormat(e,n){let t=new d_.ByteBuffer(e),o=gl.InferenceSession.getRootAsInferenceSession(t).model();if(St.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let a=0;a<o.opsetImportLength();a++){let s=o.opsetImport(a);this._opsets.push({domain:s?.domain(),version:St.longToNumber(s.version())})}this._graph=yc.from(o.graph(),n)}get graph(){return this._graph}get opsets(){return this._opsets}}});var Sa,h_=N(()=>{"use strict";s_();u_();Dt();f_();Sa=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=Oi.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,n,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await hc(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new Ia,typeof e=="string"){let i=e.endsWith(".ort");{let s=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(s),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,n||0,t||e.byteLength);this.initialize(i)}})}initialize(e,n){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,n),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new xa(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let n=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,n);return this.createOutput(t)})}normalizeAndValidateInputs(e){let n=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==n.length)throw new Error(`incorrect input array length: expected ${n.length} but got ${e.length}`)}else{if(e.size!==n.length)throw new Error(`incorrect input map size: expected ${n.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<n.length;++i){let a=e.get(n[i]);if(!a)throw new Error(`missing input tensor for: '${name}'`);t[o++]=a}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let a=0;a<t.length;++a){let s=o[t[a]];i[a]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[a].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,n){for(let t=0;t<n.length;t++){let o=e[t],i=n[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,n,t){for(let o=0;o<n.length;o++){let i=e[o],a=n[o].dims;if(!this.compareTensorDims(i,a,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,n,t){if(e.length!==n.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==n[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let n=this._model.graph.getOutputNames();if(e.length!==n.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<n.length;++o)t.set(n[o],e[o]);return t}initializeOps(e){let n=e.getNodes();this._ops=new Array(n.length);for(let t=0;t<n.length;t++)this._ops[t]=this.sessionHandler.resolve(n[t],this._model.opsets,e)}}});var $a,m_=N(()=>{"use strict";ft();zr();$a=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,n,t){let o=new Map;for(let s in e)if(Object.hasOwnProperty.call(e,s)){let u=e[s];o.set(s,new st(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),a={};return i.forEach((s,u)=>{a[u]=new At(s.type,s.data,s.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var Aa,_c=N(()=>{"use strict";Aa=r=>{if(r?.epContextDataRead)throw new Error('session option "epContextDataRead" is not supported by ONNX Runtime Web')}});var g_={};Or(g_,{onnxjsBackend:()=>L3});var vc,L3,b_=N(()=>{"use strict";h_();m_();_c();vc=class{async init(){}async createInferenceSessionHandler(e,n){Aa(n);let t=new Sa(n);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new $a(t)}},L3=new vc});var Oa=N(()=>{"use strict"});var v_={};Or(v_,{default:()=>R3});var y_,__,R3,w_=N(()=>{"use strict";wc();_r();Pa();y_="ort-wasm-proxy-worker",__=globalThis.self?.name===y_;__&&(self.onmessage=r=>{let{type:e,in:n}=r.data;try{switch(e){case"init-wasm":Ea(n.wasm).then(()=>{Ca(n).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=n;Da(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=n,o=Zo(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=n;ka(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":Na(n),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:a,options:s}=n;La(t,o,i,a,new Array(a.length).fill(null),s).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},za([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":Ra(n),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});R3=__?null:r=>new Worker(r??Pt,{type:"module",name:y_})});var T_={};Or(T_,{default:()=>z3});async function x_(r={}){var e=r,n=!!globalThis.window,t=!!globalThis.WorkerGlobalScope,o=t&&self.name?.startsWith("em-pthread");e.mountExternalData=(d,f)=>{d.startsWith("./")&&(d=d.substring(2)),(e.jd||(e.jd=new Map)).set(d,f)},e.unmountExternalData=()=>{delete e.jd,delete e.ke,delete e.je,delete e.le},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let i=d=>async(...f)=>{try{if(e.hd)throw Error("Session already started");let y=e.hd={Vd:f[0],errors:[]},b=await d(...f);if(e.hd!==y)throw Error("Session mismatch");e.pd?.flush();let I=y.errors;if(0<I.length){let E=await Promise.all(I);if(E=E.filter(L=>L),0<E.length)throw Error(E.join(`
`))}return b}finally{e.hd=null}};e.jsepInit=(d,f)=>{if(d==="webgpu"){[e.pd,e.Ld,e.Pd,e.rd,e.Od,e.ic,e.Qd,e.Sd,e.Md,e.Nd,e.Rd]=f;let y=e.pd;e.jsepRegisterBuffer=(b,I,E,L)=>y.registerBuffer(b,I,E,L),e.jsepGetBuffer=b=>y.getBuffer(b),e.jsepCreateDownloader=(b,I,E)=>y.createDownloader(b,I,E),e.jsepOnCreateSession=b=>{y.onCreateSession(b)},e.jsepOnReleaseSession=b=>{y.onReleaseSession(b)},e.jsepOnRunStart=b=>y.onRunStart(b),e.Td=(b,I)=>{y.upload(b,I)}}else if(d==="webnn"){let y=f[0];[e.ce,e.Cd,e.webnnEnsureTensor,e.Dd,e.webnnDownloadTensor,e.be,e.webnnEnableTraceEvent]=f.slice(1),e.webnnReleaseTensorId=e.Cd,e.webnnUploadTensor=e.Dd,e.webnnRegisterMLContext=e.be,e.webnnOnRunStart=b=>y.onRunStart(b),e.webnnOnRunEnd=y.onRunEnd.bind(y),e.webnnOnReleaseSession=b=>{y.onReleaseSession(b)},e.webnnCreateMLTensorDownloader=(b,I)=>y.createMLTensorDownloader(b,I),e.webnnRegisterMLTensor=(b,I,E,L)=>y.registerMLTensor(b,I,E,L),e.webnnCreateMLContext=b=>y.createMLContext(b),e.webnnRegisterGraphInput=y.registerGraphInput.bind(y),e.webnnIsGraphInput=y.isGraphInput.bind(y),e.webnnRegisterGraphOutput=y.registerGraphOutput.bind(y),e.webnnIsGraphOutput=y.isGraphOutput.bind(y),e.webnnCreateTemporaryTensor=y.createTemporaryTensor.bind(y),e.webnnIsGraphInputOutputTypeSupported=y.isGraphInputOutputTypeSupported.bind(y)}};let a=()=>{let d=f=>(...y)=>{let b=tn;return y=f(...y),tn!=b?new Promise((I,E)=>{Ds={resolve:I,reject:E}}):y};(f=>{for(let y of f)e[y]=d(e[y])})("_OrtAppendExecutionProvider _OrtAppendExecutionProviderV2 _OrtCreateSession _OrtRun _OrtRunWithBinding _OrtBindInput".split(" ")),i!==void 0&&(e._OrtRun=i(e._OrtRun),e._OrtRunWithBinding=i(e._OrtRunWithBinding)),a=void 0};e.asyncInit=()=>{a?.()};var s,u,l=(d,f)=>{throw f},c=import.meta.url,p="";if(n||t){try{p=new URL(".",c).href}catch{}t&&(u=d=>{var f=new XMLHttpRequest;return f.open("GET",d,!1),f.responseType="arraybuffer",f.send(null),new Uint8Array(f.response)}),s=async d=>{if(R(d))return new Promise((y,b)=>{var I=new XMLHttpRequest;I.open("GET",d,!0),I.responseType="arraybuffer",I.onload=()=>{I.status==200||I.status==0&&I.response?y(I.response):b(I.status)},I.onerror=b,I.send(null)});var f=await fetch(d,{credentials:"same-origin"});if(f.ok)return f.arrayBuffer();throw Error(f.status+" : "+f.url)}}var h,g,m,_,S,v,x=console.log.bind(console),$=console.error.bind(console),O=x,P=$,C=!1,R=d=>d.startsWith("file://");function T(){or.buffer!=H.buffer&&fe()}if(o){let d=function(f){try{var y=f.data,b=y.bd;if(b==="load"){let I=[];self.onmessage=E=>I.push(E),v=()=>{postMessage({bd:"loaded"});for(let E of I)d(E);self.onmessage=d};for(let E of y.Hd)e[E]&&!e[E].proxy||(e[E]=(...L)=>{postMessage({bd:"callHandler",Fd:E,args:L})},E=="print"&&(O=e[E]),E=="printErr"&&(P=e[E]));or=y.Zd,fe(),g=y.$d,he(),bi()}else if(b==="run"){(function(I){var E=(T(),V)[I+52>>>2>>>0];I=(T(),V)[I+56>>>2>>>0],dp(E,E-I),Te(E)})(y.ad),zs(y.ad,0,0,1,0,0),dd(),Ps(y.ad),W||(ip(),W=!0);try{AT(y.Xd,y.nd)}catch(I){if(I!="unwind")throw I}}else y.target!=="setimmediate"&&(b==="checkMailbox"?W&&ci():b&&(P(`worker: received unknown command ${b}`),P(y)))}catch(I){throw ap(),I}};var bk=d,W=!1;self.onunhandledrejection=f=>{throw f.reason||f},self.onmessage=d}var H,M,re,B,w,V,Z,G,Q,ue,ae,_e=!1;function fe(){var d=or.buffer;e.HEAP8=H=new Int8Array(d),re=new Int16Array(d),e.HEAPU8=M=new Uint8Array(d),B=new Uint16Array(d),e.HEAP32=w=new Int32Array(d),e.HEAPU32=V=new Uint32Array(d),Z=new Float32Array(d),G=new Float64Array(d),Q=new BigInt64Array(d),ue=new BigUint64Array(d)}function se(){_e=!0,o?v():Zn.vb()}function U(d){throw P(d="Aborted("+d+")"),C=!0,d=new WebAssembly.RuntimeError(d+". Build with -sASSERTIONS for more info."),S?.(d),d}function j(){return{a:{na:Y1,jb:J1,g:OT,G:PT,f:ET,o:CT,h:DT,$:kT,b:NT,S:LT,Ja:bd,n:RT,aa:wd,_a:xd,Fa:Td,Ha:Id,$a:Sd,Ya:$d,Ra:Ad,Xa:Od,la:Pd,Ga:Ed,Da:Cd,Za:Dd,Ea:kd,eb:zT,ga:BT,ya:VT,wa:GT,fa:WT,N:HT,I:qT,xa:jT,_:e1,za:t1,Ua:n1,Ba:o1,Ka:i1,ua:a1,ha:s1,Ta:Ps,bb:u1,Q:p1,r:b1,c:As,kb:y1,y:_1,M:v1,D:w1,m:x1,s:Fd,lb:T1,J:I1,R:S1,j:$1,u:A1,q:O1,k:P1,Oa:E1,Pa:C1,Qa:D1,Ma:Hd,Na:qd,va:jd,gb:N1,db:z1,v:M1,ba:B1,ia:V1,cb:L1,V:F1,ab:G1,Ca:U1,F:k1,U:W1,ma:mi,Aa:q1,ib:H1,hb:j1,Va:Jd,Wa:Yd,Ia:ii,T:Qd,La:ep,ka:tp,Sa:np,ja:rp,nb:R2,oa:C2,ob:L2,pa:E2,H:_2,e:n2,t:e2,w:Q1,B:f2,pb:A2,Z:$2,x:a2,qa:O2,X:D2,ca:S2,qb:I2,ea:o2,O:h2,sb:w2,ra:T2,tb:v2,L:b2,Y:P2,d:t2,A:i2,l:r2,mb:z2,p:u2,z:l2,C:s2,E:c2,K:m2,sa:y2,P:k2,da:g2,W:N2,ub:p2,ta:d2,rb:x2,i:X1,a:or,fb:nr}}}async function he(){function d(b,I){var E=Zn=b.exports;b={};for(let[L,F]of Object.entries(E))typeof F=="function"?(E=l1(F),b[L]=E):b[L]=F;return Zn=b,Zn=(function(){var L=Zn,F=te=>ve=>te(ve)>>>0,J=te=>()=>te()>>>0;return(L=Object.assign({},L)).wb=F(L.wb),L.ec=J(L.ec),L.gc=F(L.gc),L.uc=F(L.uc),L.vc=J(L.vc),L.zc=F(L.zc),L})(),ld.push(Zn.hc),op=(b=Zn).wb,ip=b.xb,e._OrtInit=b.yb,e._OrtGetLastError=b.zb,e._OrtCreateSessionOptions=b.Ab,e._OrtAppendExecutionProvider=b.Bb,e._OrtGetEpDevices=b.Cb,e._OrtEpDevice_EpName=b.Db,e._OrtAppendExecutionProviderV2=b.Eb,e._OrtAddFreeDimensionOverride=b.Fb,e._OrtAddSessionConfigEntry=b.Gb,e._OrtReleaseSessionOptions=b.Hb,e._OrtCreateSession=b.Ib,e._OrtReleaseSession=b.Jb,e._OrtGetInputOutputCount=b.Kb,e._OrtGetInputOutputMetadata=b.Lb,e._OrtFree=b.Mb,e._OrtCreateTensor=b.Nb,e._OrtGetTensorData=b.Ob,e._OrtReleaseTensor=b.Pb,e._OrtCreateLoraAdapter=b.Qb,e._OrtReleaseLoraAdapter=b.Rb,e._OrtCreateRunOptions=b.Sb,e._OrtAddRunConfigEntry=b.Tb,e._OrtRunOptionsAddActiveLoraAdapter=b.Ub,e._OrtReleaseRunOptions=b.Vb,e._OrtCreateBinding=b.Wb,e._OrtBindInput=b.Xb,e._OrtBindOutput=b.Yb,e._OrtClearBoundOutputs=b.Zb,e._OrtReleaseBinding=b._b,e._OrtRunWithBinding=b.$b,e._OrtRun=b.ac,e._OrtEndProfiling=b.bc,e._JsepOutput=b.cc,e._JsepGetNodeName=b.dc,gi=b.ec,nn=e._free=b.fc,$o=e._malloc=b.gc,zs=b.jc,ap=b.kc,sp=b.lc,up=b.mc,Ms=b.nc,lp=b.oc,cp=b.pc,$e=b.qc,Ao=b.rc,dp=b.sc,Te=b.tc,Bs=b.uc,Ie=b.vc,pp=b.wc,Vs=b.xc,fp=b.yc,hp=b.zc,mp=b.Ac,Fs=b.Bc,gp=b.Cc,bp=b.Dc,yp=b.Ec,_p=b.Fc,vp=b.Gc,wp=b.Hc,xp=b.Ic,Tp=b.Jc,Ip=b.Kc,Sp=b.Lc,$p=b.Mc,Ap=b.Nc,Op=b.Oc,Pp=b.Pc,Ep=b.Qc,Cp=b.Rc,Dp=b.Sc,kp=b.Tc,Np=b.Uc,Lp=b.Vc,Rp=b.Wc,zp=b.Xc,Mp=b.Yc,Bp=b._c,Vp=b.$c,Fp=b.kd,Gp=b.ld,Up=b.qd,Wp=b.vd,Hp=b.wd,qp=b.xd,jp=b.yd,Kp=b.zd,Xp=b.Ad,Zp=b.Bd,Jp=b.Gd,Yp=b.Jd,Qp=b.fe,ef=b.ge,tf=b.he,nf=b.ie,g=I,Zn}var f,y=j();return e.instantiateWasm?new Promise(b=>{e.instantiateWasm(y,(I,E)=>{b(d(I,E))})}):o?d(new WebAssembly.Instance(g,j()),g):(ae??=e.locateFile?e.locateFile?e.locateFile("ort-wasm-simd-threaded.jsep.wasm",p):p+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,f=await(async function(b){var I=ae;if(!h&&!R(I))try{var E=fetch(I,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(E,b)}catch(L){P(`wasm streaming compile failed: ${L}`),P("falling back to ArrayBuffer instantiation")}return(async function(L,F){try{var J=await(async function(te){if(!h)try{var ve=await s(te);return new Uint8Array(ve)}catch{}if(te==ae&&h)te=new Uint8Array(h);else{if(!u)throw"both async and sync fetching of the wasm failed";te=u(te)}return te})(L);return await WebAssembly.instantiate(J,F)}catch(te){P(`failed to asynchronously prepare wasm: ${te}`),U(te)}})(I,b)})(y),d(f.instance,f.module))}class lt{name="ExitStatus";constructor(f){this.message=`Program terminated with exit(${f})`,this.status=f}}var Ye=d=>{d.terminate(),d.onmessage=()=>{}},nt=[],Qe=0,Wt=null,rt=d=>{rr.length==0&&(fd(),pd(rr[0]));var f=rr.pop();if(!f)return 6;Io.push(f),Sr[d.ad]=f,f.ad=d.ad;var y={bd:"run",Xd:d.Wd,nd:d.nd,ad:d.ad};return f.postMessage(y,d.ud),0},Ue=0,Ce=(d,f,...y)=>{var b,I=16*y.length,E=Ie(),L=Bs(I),F=L>>>3;for(b of y)typeof b=="bigint"?((T(),Q)[F++>>>0]=1n,(T(),Q)[F++>>>0]=b):((T(),Q)[F++>>>0]=0n,(T(),G)[F++>>>0]=b);return d=sp(d,0,I,L,f),Te(E),d};function nr(d){if(o)return Ce(0,1,d);if(m=d,!(0<Ue)){for(var f of Io)Ye(f);for(f of rr)Ye(f);rr=[],Io=[],Sr={},C=!0}l(0,new lt(d))}function To(d){if(o)return Ce(1,0,d);ii(d)}var ii=d=>{if(m=d,o)throw To(d),"unwind";nr(d)},rr=[],Io=[],ld=[],Sr={},cd=d=>{var f=d.ad;delete Sr[f],rr.push(d),Io.splice(Io.indexOf(d),1),d.ad=0,up(f)};function dd(){ld.forEach(d=>d())}var pd=d=>new Promise(f=>{d.onmessage=I=>{var E=I.data;if(I=E.bd,E.md&&E.md!=gi()){var L=Sr[E.md];L?L.postMessage(E,E.ud):P(`Internal error! Worker sent a message "${I}" to target pthread ${E.md}, but that thread no longer exists!`)}else I==="checkMailbox"?ci():I==="spawnThread"?rt(E):I==="cleanupThread"?li(()=>{cd(Sr[E.Yd])}):I==="loaded"?(d.loaded=!0,f(d)):E.target==="setimmediate"?d.postMessage(E):I==="uncaughtException"?d.onerror(E.error):I==="callHandler"?e[E.Fd](...E.args):I&&P(`worker sent an unknown command ${I}`)},d.onerror=I=>{throw P(`worker sent an error! ${I.filename}:${I.lineno}: ${I.message}`),I};var y,b=[];for(y of[])e.propertyIsEnumerable(y)&&b.push(y);d.postMessage({bd:"load",Hd:b,Zd:or,$d:g})});function fd(){var d=new Worker((()=>{let f=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new f("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});rr.push(d)}var or,AT=(d,f)=>{Ue=0,d=Fs(d,f),0<Ue?m=d:Ms(d)},ai=[],si=0;function OT(d){var f=new Ts(d>>>=0);return(T(),H)[f.cd+12>>>0]==0&&(hd(f,!0),si--),md(f,!1),ai.push(f),hp(d)}var Xr=0,PT=()=>{$e(0,0);var d=ai.pop();pp(d.od),Xr=0};function hd(d,f){f=f?1:0,(T(),H)[d.cd+12>>>0]=f}function md(d,f){f=f?1:0,(T(),H)[d.cd+13>>>0]=f}class Ts{constructor(f){this.od=f,this.cd=f-24}}var Is=d=>{var f=Xr;if(!f)return Ao(0),0;var y=new Ts(f);(T(),V)[y.cd+16>>>2>>>0]=f;var b=(T(),V)[y.cd+4>>>2>>>0];if(!b)return Ao(0),f;for(var I of d){if(I===0||I===b)break;if(fp(I,b,y.cd+16))return Ao(I),f}return Ao(b),f};function ET(){return Is([])}function CT(d){return Is([d>>>0])}function DT(d,f,y,b){return Is([d>>>0,f>>>0,y>>>0,b>>>0])}var kT=()=>{var d=ai.pop();d||U("no exception to throw");var f=d.od;throw(T(),H)[d.cd+13>>>0]==0&&(ai.push(d),md(d,!0),hd(d,!1),si++),Vs(f),Xr=f};function NT(d,f,y){var b=new Ts(d>>>=0);throw f>>>=0,y>>>=0,(T(),V)[b.cd+16>>>2>>>0]=0,(T(),V)[b.cd+4>>>2>>>0]=f,(T(),V)[b.cd+8>>>2>>>0]=y,Vs(d),si++,Xr=d}var LT=()=>si;function gd(d,f,y,b){return o?Ce(2,1,d,f,y,b):bd(d,f,y,b)}function bd(d,f,y,b){if(d>>>=0,f>>>=0,y>>>=0,b>>>=0,!globalThis.SharedArrayBuffer)return 6;var I=[];return o&&I.length===0?gd(d,f,y,b):(d={Wd:y,ad:d,nd:b,ud:I},o?(d.bd="spawnThread",postMessage(d,I),0):rt(d))}function RT(d){throw Xr||=d>>>0,Xr}var yd=globalThis.TextDecoder&&new TextDecoder,_d=(d,f,y,b)=>{if(y=f+y,b)return y;for(;d[f]&&!(f>=y);)++f;return f},vd=(d,f=0,y,b)=>{if(16<(y=_d(d,f>>>=0,y,b))-f&&d.buffer&&yd)return yd.decode(d.buffer instanceof ArrayBuffer?d.subarray(f,y):d.slice(f,y));for(b="";f<y;){var I=d[f++];if(128&I){var E=63&d[f++];if((224&I)==192)b+=String.fromCharCode((31&I)<<6|E);else{var L=63&d[f++];65536>(I=(240&I)==224?(15&I)<<12|E<<6|L:(7&I)<<18|E<<12|L<<6|63&d[f++])?b+=String.fromCharCode(I):(I-=65536,b+=String.fromCharCode(55296|I>>10,56320|1023&I))}}else b+=String.fromCharCode(I)}return b},ot=(d,f,y)=>(d>>>=0)?vd((T(),M),d,f,y):"";function wd(d,f,y){return o?Ce(3,1,d,f,y):0}function xd(d,f){if(o)return Ce(4,1,d,f)}function Td(d,f){if(o)return Ce(5,1,d,f)}function Id(d,f,y){if(o)return Ce(6,1,d,f,y)}function Sd(d,f,y){return o?Ce(7,1,d,f,y):0}function $d(d,f){if(o)return Ce(8,1,d,f)}function Ad(d,f,y){if(o)return Ce(9,1,d,f,y)}function Od(d,f,y,b){if(o)return Ce(10,1,d,f,y,b)}function Pd(d,f,y,b){if(o)return Ce(11,1,d,f,y,b)}function Ed(d,f,y,b){if(o)return Ce(12,1,d,f,y,b)}function Cd(d){if(o)return Ce(13,1,d)}function Dd(d,f){if(o)return Ce(14,1,d,f)}function kd(d,f,y){if(o)return Ce(15,1,d,f,y)}var zT=()=>U(""),en=d=>{d>>>=0;for(var f="";;){var y=(T(),M)[d++>>>0];if(!y)return f;f+=String.fromCharCode(y)}},Ss={},$s={},MT={},Zr=class extends Error{constructor(d){super(d),this.name="BindingError"}};function Xn(d,f,y={}){return(function(b,I,E={}){var L=I.name;if(!b)throw new Zr(`type "${L}" must have a positive integer typeid pointer`);if($s.hasOwnProperty(b)){if(E.Id)return;throw new Zr(`Cannot register type '${L}' twice`)}$s[b]=I,delete MT[b],Ss.hasOwnProperty(b)&&(I=Ss[b],delete Ss[b],I.forEach(F=>F()))})(d,f,y)}var Nd=(d,f,y)=>{switch(f){case 1:return y?b=>(T(),H)[b>>>0]:b=>(T(),M)[b>>>0];case 2:return y?b=>(T(),re)[b>>>1>>>0]:b=>(T(),B)[b>>>1>>>0];case 4:return y?b=>(T(),w)[b>>>2>>>0]:b=>(T(),V)[b>>>2>>>0];case 8:return y?b=>(T(),Q)[b>>>3>>>0]:b=>(T(),ue)[b>>>3>>>0];default:throw new TypeError(`invalid integer width (${f}): ${d}`)}};function BT(d,f,y,b,I){d>>>=0,y>>>=0,f=en(f>>>0);let E=L=>L;if(b=b===0n){let L=8*y;E=F=>BigInt.asUintN(L,F),I=E(I)}Xn(d,{name:f,Zc:E,ed:(L,F)=>(typeof F=="number"&&(F=BigInt(F)),F),dd:Nd(f,y,!b),gd:null})}function VT(d,f,y,b){Xn(d>>>=0,{name:f=en(f>>>0),Zc:function(I){return!!I},ed:function(I,E){return E?y:b},dd:function(I){return this.Zc((T(),M)[I>>>0])},gd:null})}var Ld=[],$r=[0,1,,1,null,1,!0,1,!1,1];function As(d){9<(d>>>=0)&&--$r[d+1]===0&&($r[d]=void 0,Ld.push(d))}var Ct=d=>{if(!d)throw new Zr(`Cannot use deleted val. handle = ${d}`);return $r[d]},Ht=d=>{switch(d){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let f=Ld.pop()||$r.length;return $r[f]=d,$r[f+1]=1,f}};function Os(d){return this.Zc((T(),V)[d>>>2>>>0])}var FT={name:"emscripten::val",Zc:d=>{var f=Ct(d);return As(d),f},ed:(d,f)=>Ht(f),dd:Os,gd:null};function GT(d){return Xn(d>>>0,FT)}var UT=(d,f)=>{switch(f){case 4:return function(y){return this.Zc((T(),Z)[y>>>2>>>0])};case 8:return function(y){return this.Zc((T(),G)[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${f}): ${d}`)}};function WT(d,f,y){y>>>=0,Xn(d>>>=0,{name:f=en(f>>>0),Zc:b=>b,ed:(b,I)=>I,dd:UT(f,y),gd:null})}function HT(d,f,y,b,I){d>>>=0,y>>>=0,f=en(f>>>0);let E=F=>F;if(b===0){var L=32-8*y;E=F=>F<<L>>>L,I=E(I)}Xn(d,{name:f,Zc:E,ed:(F,J)=>J,dd:Nd(f,y,b!==0),gd:null})}function qT(d,f,y){function b(E){var L=(T(),V)[E>>>2>>>0];return E=(T(),V)[E+4>>>2>>>0],new I((T(),H).buffer,E,L)}var I=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][f];Xn(d>>>=0,{name:y=en(y>>>0),Zc:b,dd:b},{Id:!0})}var ir=(d,f,y)=>{var b=(T(),M);if(f>>>=0,0<y){var I=f;y=f+y-1;for(var E=0;E<d.length;++E){var L=d.codePointAt(E);if(127>=L){if(f>=y)break;b[f++>>>0]=L}else if(2047>=L){if(f+1>=y)break;b[f++>>>0]=192|L>>6,b[f++>>>0]=128|63&L}else if(65535>=L){if(f+2>=y)break;b[f++>>>0]=224|L>>12,b[f++>>>0]=128|L>>6&63,b[f++>>>0]=128|63&L}else{if(f+3>=y)break;b[f++>>>0]=240|L>>18,b[f++>>>0]=128|L>>12&63,b[f++>>>0]=128|L>>6&63,b[f++>>>0]=128|63&L,E++}}b[f>>>0]=0,d=f-I}else d=0;return d},ui=d=>{for(var f=0,y=0;y<d.length;++y){var b=d.charCodeAt(y);127>=b?f++:2047>=b?f+=2:55296<=b&&57343>=b?(f+=4,++y):f+=3}return f};function jT(d,f){Xn(d>>>=0,{name:f=en(f>>>0),Zc(y){var b=(T(),V)[y>>>2>>>0];return b=ot(y+4,b,!0),nn(y),b},ed(y,b){b instanceof ArrayBuffer&&(b=new Uint8Array(b));var I=typeof b=="string";if(!(I||ArrayBuffer.isView(b)&&b.BYTES_PER_ELEMENT==1))throw new Zr("Cannot pass non-string to std::string");var E=I?ui(b):b.length,L=$o(4+E+1),F=L+4;return(T(),V)[L>>>2>>>0]=E,I?ir(b,F,E+1):(T(),M).set(b,F>>>0),y!==null&&y.push(nn,L),L},dd:Os,gd(y){nn(y)}})}var Rd=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,KT=(d,f,y)=>{if(d>>>=1,16<(f=_d((T(),B),d,f/2,y))-d&&Rd)return Rd.decode((T(),B).slice(d,f));for(y="";d<f;++d){var b=(T(),B)[d>>>0];y+=String.fromCharCode(b)}return y},XT=(d,f,y)=>{if(y??=2147483647,2>y)return 0;var b=f;y=(y-=2)<2*d.length?y/2:d.length;for(var I=0;I<y;++I){var E=d.charCodeAt(I);(T(),re)[f>>>1>>>0]=E,f+=2}return(T(),re)[f>>>1>>>0]=0,f-b},ZT=d=>2*d.length,JT=(d,f,y)=>{var b="";d>>>=2;for(var I=0;!(I>=f/4);I++){var E=(T(),V)[d+I>>>0];if(!E&&!y)break;b+=String.fromCodePoint(E)}return b},YT=(d,f,y)=>{if(f>>>=0,y??=2147483647,4>y)return 0;var b=f;y=b+y-4;for(var I=0;I<d.length;++I){var E=d.codePointAt(I);if(65535<E&&I++,(T(),w)[f>>>2>>>0]=E,(f+=4)+4>y)break}return(T(),w)[f>>>2>>>0]=0,f-b},QT=d=>{for(var f=0,y=0;y<d.length;++y)65535<d.codePointAt(y)&&y++,f+=4;return f};function e1(d,f,y){if(d>>>=0,f>>>=0,y=en(y>>>=0),f===2)var b=KT,I=XT,E=ZT;else b=JT,I=YT,E=QT;Xn(d,{name:y,Zc:L=>{var F=(T(),V)[L>>>2>>>0];return F=b(L+4,F*f,!0),nn(L),F},ed:(L,F)=>{if(typeof F!="string")throw new Zr(`Cannot pass non-string to C++ string type ${y}`);var J=E(F),te=$o(4+J+f);return(T(),V)[te>>>2>>>0]=J/f,I(F,te+4,J+f),L!==null&&L.push(nn,te),te},dd:Os,gd(L){nn(L)}})}function t1(d,f){Xn(d>>>=0,{Kd:!0,name:f=en(f>>>0),Zc:()=>{},ed:()=>{}})}function n1(d){zs(d>>>0,!t,1,!n,131072,!1),dd()}var li=d=>{if(!C)try{if(d(),!(0<Ue))try{o?gi()&&Ms(m):ii(m)}catch(f){f instanceof lt||f=="unwind"||l(0,f)}}catch(f){f instanceof lt||f=="unwind"||l(0,f)}},r1=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Ps(d){d>>>=0,r1||(Atomics.waitAsync((T(),w),d>>>2,d).value.then(ci),d+=128,Atomics.store((T(),w),d>>>2,1))}var ci=()=>li(()=>{var d=gi();d&&(Ps(d),cp())});function o1(d,f){(d>>>=0)==f>>>0?setTimeout(ci):o?postMessage({md:d,bd:"checkMailbox"}):(d=Sr[d])&&d.postMessage({bd:"checkMailbox"})}var Es=[];function i1(d,f,y,b,I){for(f>>>=0,I>>>=0,Es.length=0,y=I>>>3,b=I+b>>>3;y<b;){var E;E=(T(),Q)[y++>>>0]?(T(),Q)[y++>>>0]:(T(),G)[y++>>>0],Es.push(E)}return(f?Gs[f]:Z1[d])(...Es)}var a1=()=>{Ue=0};function s1(d){d>>>=0,o?postMessage({bd:"cleanupThread",Yd:d}):cd(Sr[d])}function u1(d){}var di=d=>{try{d()}catch(f){U(f)}};function l1(d){var f=(...y)=>{pi.push(d);try{return d(...y)}finally{C||(pi.pop(),tn&&ar===1&&pi.length===0&&(ar=0,Ue+=1,di(ef),typeof Fibers<"u"&&Fibers.ne()))}};return Bd.set(d,f),f}var ar=0,tn=null,zd=0,pi=[],Cs=new Map,Md=new Map,Bd=new Map,c1=0,Ds=null,d1=[],Vd=d=>(function(f){if(!C){if(ar===0){var y=!1,b=!1;f((I=0)=>{if(!C&&(zd=I,y=!0,b)){ar=2,di(()=>tf(tn)),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.resume(),I=!1;try{var E=(function(){var J=(T(),w)[tn+8>>>2>>>0];return J=Md.get(J),J=Bd.get(J),--Ue,J()})()}catch(J){E=J,I=!0}var L=!1;if(!tn){var F=Ds;F&&(Ds=null,(I?F.reject:F.resolve)(E),L=!0)}if(I&&!L)throw E}}),b=!0,y||(ar=1,tn=(function(){var I=$o(65548),E=I+12;if((T(),V)[I>>>2>>>0]=E,(T(),V)[I+4>>>2>>>0]=E+65536,E=pi[0],!Cs.has(E)){var L=c1++;Cs.set(E,L),Md.set(L,E)}return E=Cs.get(E),(T(),w)[I+8>>>2>>>0]=E,I})(),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.pause(),di(()=>Qp(tn)))}else ar===2?(ar=0,di(nf),nn(tn),tn=null,d1.forEach(li)):U(`invalid state: ${ar}`);return zd}})(f=>{d().then(f)});function p1(d){return d>>>=0,Vd(async()=>{var f=await Ct(d);return Ht(f)})}var ks=[],f1=d=>{var f=ks.length;return ks.push(d),f},h1=(d,f)=>{for(var y=Array(d),b=0;b<d;++b){var I=b,E=(T(),V)[f+4*b>>>2>>>0],L=$s[E];if(L===void 0)throw d=`parameter ${b}`,E=op(E),f=en(E),nn(E),new Zr(`${d} has unknown type ${f}`);y[I]=L}return y},m1=(d,f,y)=>{var b=[];return d=d(b,y),b.length&&((T(),V)[f>>>2>>>0]=Ht(b)),d},g1={},fi=d=>{var f=g1[d];return f===void 0?en(d):f};function b1(d,f,y){var[b,...I]=h1(d,f>>>0);f=b.ed.bind(b);var E=I.map(J=>J.dd.bind(J));d--;var L={toValue:Ct};switch(d=E.map((J,te)=>{var ve=`argFromPtr${te}`;return L[ve]=J,`${ve}(args${te?"+"+8*te:""})`}),y){case 0:var F="toValue(handle)";break;case 2:F="new (toValue(handle))";break;case 3:F="";break;case 1:L.getStringOrSymbol=fi,F="toValue(handle)[getStringOrSymbol(methodName)]"}return F+=`(${d})`,b.Kd||(L.toReturnWire=f,L.emval_returnValue=m1,F=`return emval_returnValue(toReturnWire, destructorsRef, ${F})`),F=`return function (handle, methodName, destructorsRef, args) {
  ${F}
  }`,y=new Function(Object.keys(L),F)(...Object.values(L)),F=`methodCaller<(${I.map(J=>J.name)}) => ${b.name}>`,f1(Object.defineProperty(y,"name",{value:F}))}function y1(d,f){return f>>>=0,(d=Ct(d>>>0))==Ct(f)}function _1(d){return(d>>>=0)?(d=fi(d),Ht(globalThis[d])):Ht(globalThis)}function v1(d){return d=fi(d>>>0),Ht(e[d])}function w1(d,f){return f>>>=0,d=Ct(d>>>0),f=Ct(f),Ht(d[f])}function x1(d){9<(d>>>=0)&&($r[d+1]+=1)}function Fd(d,f,y,b,I){return ks[d>>>0](f>>>0,y>>>0,b>>>0,I>>>0)}function T1(d,f,y,b,I){return Fd(d>>>0,f>>>0,y>>>0,b>>>0,I>>>0)}function I1(){return Ht([])}function S1(d){d=Ct(d>>>0);for(var f=Array(d.length),y=0;y<d.length;y++)f[y]=d[y];return Ht(f)}function $1(d){return Ht(fi(d>>>0))}function A1(){return Ht({})}function O1(d){for(var f=Ct(d>>>=0);f.length;){var y=f.pop();f.pop()(y)}As(d)}function P1(d,f,y){f>>>=0,y>>>=0,d=Ct(d>>>0),f=Ct(f),y=Ct(y),d[f]=y}function E1(d,f){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),f>>>=0,d=new Date(1e3*d),(T(),w)[f>>>2>>>0]=d.getUTCSeconds(),(T(),w)[f+4>>>2>>>0]=d.getUTCMinutes(),(T(),w)[f+8>>>2>>>0]=d.getUTCHours(),(T(),w)[f+12>>>2>>>0]=d.getUTCDate(),(T(),w)[f+16>>>2>>>0]=d.getUTCMonth(),(T(),w)[f+20>>>2>>>0]=d.getUTCFullYear()-1900,(T(),w)[f+24>>>2>>>0]=d.getUTCDay(),d=(d.getTime()-Date.UTC(d.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(T(),w)[f+28>>>2>>>0]=d}var Gd=d=>d%4==0&&(d%100!=0||d%400==0),Ud=[0,31,60,91,121,152,182,213,244,274,305,335],Wd=[0,31,59,90,120,151,181,212,243,273,304,334];function C1(d,f){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),f>>>=0,d=new Date(1e3*d),(T(),w)[f>>>2>>>0]=d.getSeconds(),(T(),w)[f+4>>>2>>>0]=d.getMinutes(),(T(),w)[f+8>>>2>>>0]=d.getHours(),(T(),w)[f+12>>>2>>>0]=d.getDate(),(T(),w)[f+16>>>2>>>0]=d.getMonth(),(T(),w)[f+20>>>2>>>0]=d.getFullYear()-1900,(T(),w)[f+24>>>2>>>0]=d.getDay();var y=(Gd(d.getFullYear())?Ud:Wd)[d.getMonth()]+d.getDate()-1|0;(T(),w)[f+28>>>2>>>0]=y,(T(),w)[f+36>>>2>>>0]=-60*d.getTimezoneOffset(),y=new Date(d.getFullYear(),6,1).getTimezoneOffset();var b=new Date(d.getFullYear(),0,1).getTimezoneOffset();d=0|(y!=b&&d.getTimezoneOffset()==Math.min(b,y)),(T(),w)[f+32>>>2>>>0]=d}function D1(d){d>>>=0;var f=new Date((T(),w)[d+20>>>2>>>0]+1900,(T(),w)[d+16>>>2>>>0],(T(),w)[d+12>>>2>>>0],(T(),w)[d+8>>>2>>>0],(T(),w)[d+4>>>2>>>0],(T(),w)[d>>>2>>>0],0),y=(T(),w)[d+32>>>2>>>0],b=f.getTimezoneOffset(),I=new Date(f.getFullYear(),6,1).getTimezoneOffset(),E=new Date(f.getFullYear(),0,1).getTimezoneOffset(),L=Math.min(E,I);return 0>y?(T(),w)[d+32>>>2>>>0]=+(I!=E&&L==b):0<y!=(L==b)&&(I=Math.max(E,I),f.setTime(f.getTime()+6e4*((0<y?L:I)-b))),(T(),w)[d+24>>>2>>>0]=f.getDay(),y=(Gd(f.getFullYear())?Ud:Wd)[f.getMonth()]+f.getDate()-1|0,(T(),w)[d+28>>>2>>>0]=y,(T(),w)[d>>>2>>>0]=f.getSeconds(),(T(),w)[d+4>>>2>>>0]=f.getMinutes(),(T(),w)[d+8>>>2>>>0]=f.getHours(),(T(),w)[d+12>>>2>>>0]=f.getDate(),(T(),w)[d+16>>>2>>>0]=f.getMonth(),(T(),w)[d+20>>>2>>>0]=f.getYear(),d=f.getTime(),BigInt(isNaN(d)?-1:d/1e3)}function Hd(d,f,y,b,I,E,L){return o?Ce(16,1,d,f,y,b,I,E,L):-52}function qd(d,f,y,b,I,E){if(o)return Ce(17,1,d,f,y,b,I,E)}var So={},k1=()=>performance.timeOrigin+performance.now();function jd(d,f){if(o)return Ce(18,1,d,f);if(So[d]&&(clearTimeout(So[d].id),delete So[d]),!f)return 0;var y=setTimeout(()=>{delete So[d],li(()=>lp(d,performance.timeOrigin+performance.now()))},f);return So[d]={id:y,me:f},0}function N1(d,f,y,b){d>>>=0,f>>>=0,y>>>=0,b>>>=0;var I=new Date().getFullYear(),E=new Date(I,0,1).getTimezoneOffset();I=new Date(I,6,1).getTimezoneOffset();var L=Math.max(E,I);(T(),V)[d>>>2>>>0]=60*L,(T(),w)[f>>>2>>>0]=+(E!=I),d=(f=F=>{var J=Math.abs(F);return`UTC${0<=F?"-":"+"}${String(Math.floor(J/60)).padStart(2,"0")}${String(J%60).padStart(2,"0")}`})(E),f=f(I),I<E?(ir(d,y,17),ir(f,b,17)):(ir(d,b,17),ir(f,y,17))}var L1=()=>Date.now(),R1=1;function z1(d,f,y){if(y>>>=0,!(0<=d&&3>=d))return 28;if(d===0)d=Date.now();else{if(!R1)return 52;d=performance.timeOrigin+performance.now()}return d=Math.round(1e6*d),(T(),Q)[y>>>3>>>0]=BigInt(d),0}var Ns=[],Kd=(d,f)=>{Ns.length=0;for(var y;y=(T(),M)[d++>>>0];){var b=y!=105;f+=(b&=y!=112)&&f%8?4:0,Ns.push(y==112?(T(),V)[f>>>2>>>0]:y==106?(T(),Q)[f>>>3>>>0]:y==105?(T(),w)[f>>>2>>>0]:(T(),G)[f>>>3>>>0]),f+=b?8:4}return Ns};function M1(d,f,y){return d>>>=0,f=Kd(f>>>0,y>>>0),Gs[d](...f)}function B1(d,f,y){return d>>>=0,f=Kd(f>>>0,y>>>0),Gs[d](...f)}var V1=()=>{};function F1(d,f){return P(ot(d>>>0,f>>>0))}var G1=()=>{throw Ue+=1,"unwind"};function U1(){return 4294901760}var W1=()=>navigator.hardwareConcurrency,Ar={},hi=d=>{var f;return(f=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(d))?+f[1]:(f=/:(\d+):\d+(?:\)|$)/.exec(d))?2147483648|+f[1]:0},Xd=d=>{for(var f of d)(d=hi(f))&&(Ar[d]=f)};function H1(){var d=Error().stack.toString().split(`
`);return d[0]=="Error"&&d.shift(),Xd(d),Ar.sd=hi(d[3]),Ar.Ud=d,Ar.sd}function mi(d){if(!(d=Ar[d>>>0]))return 0;var f;if(f=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(d))d=f[1];else if(f=/^\s+at (.*) \(.*\)$/.exec(d))d=f[1];else{if(!(f=/^(.+?)@/.exec(d)))return 0;d=f[1]}nn(mi.td??0),f=ui(d)+1;var y=$o(f);return y&&ir(d,y,f),mi.td=y,mi.td}function q1(d){d>>>=0;var f=(T(),M).length;if(d<=f||4294901760<d)return!1;for(var y=1;4>=y;y*=2){var b=f*(1+.2/y);b=Math.min(b,d+100663296);e:{b=(Math.min(4294901760,65536*Math.ceil(Math.max(d,b)/65536))-or.buffer.byteLength+65535)/65536|0;try{or.grow(b),fe();var I=1;break e}catch{}I=void 0}if(I)return!0}return!1}function j1(d,f,y){if(d>>>=0,f>>>=0,Ar.sd==d)var b=Ar.Ud;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),Xd(b);for(var I=3;b[I]&&hi(b[I])!=d;)++I;for(d=0;d<y&&b[d+I];++d)(T(),w)[f+4*d>>>2>>>0]=hi(b[d+I]);return d}var Ls,Rs={},Zd=()=>{if(!Ls){var d,f={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(d in Rs)Rs[d]===void 0?delete f[d]:f[d]=Rs[d];var y=[];for(d in f)y.push(`${d}=${f[d]}`);Ls=y}return Ls};function Jd(d,f){if(o)return Ce(19,1,d,f);d>>>=0,f>>>=0;var y,b=0,I=0;for(y of Zd()){var E=f+b;(T(),V)[d+I>>>2>>>0]=E,b+=ir(y,E,1/0)+1,I+=4}return 0}function Yd(d,f){if(o)return Ce(20,1,d,f);d>>>=0,f>>>=0;var y=Zd();for(var b of((T(),V)[d>>>2>>>0]=y.length,d=0,y))d+=ui(b)+1;return(T(),V)[f>>>2>>>0]=d,0}function Qd(d){return o?Ce(21,1,d):52}function ep(d,f,y,b,I){return o?Ce(22,1,d,f,y,b,I):52}function tp(d,f,y,b){return o?Ce(23,1,d,f,y,b):52}function np(d,f,y,b){return o?Ce(24,1,d,f,y,b):70}var K1=[null,[],[]];function rp(d,f,y,b){if(o)return Ce(25,1,d,f,y,b);f>>>=0,y>>>=0,b>>>=0;for(var I=0,E=0;E<y;E++){var L=(T(),V)[f>>>2>>>0],F=(T(),V)[f+4>>>2>>>0];f+=8;for(var J=0;J<F;J++){var te=d,ve=(T(),M)[L+J>>>0],De=K1[te];ve===0||ve===10?((te===1?O:P)(vd(De)),De.length=0):De.push(ve)}I+=F}return(T(),V)[b>>>2>>>0]=I,0}function X1(d){return d>>>0}o||(function(){for(var d=e.numThreads-1;d--;)fd();nt.push(async()=>{var f=(async function(){if(!o)return Promise.all(rr.map(pd))})();Qe++,await f,--Qe==0&&Wt&&(f=Wt,Wt=null,f())})})(),o||(or=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),fe()),e.wasmBinary&&(h=e.wasmBinary),e.stackSave=()=>Ie(),e.stackRestore=d=>Te(d),e.stackAlloc=d=>Bs(d),e.setValue=function(d,f,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":(T(),H)[d>>>0]=f;break;case"i16":(T(),re)[d>>>1>>>0]=f;break;case"i32":(T(),w)[d>>>2>>>0]=f;break;case"i64":(T(),Q)[d>>>3>>>0]=BigInt(f);break;case"float":(T(),Z)[d>>>2>>>0]=f;break;case"double":(T(),G)[d>>>3>>>0]=f;break;case"*":(T(),V)[d>>>2>>>0]=f;break;default:U(`invalid type for setValue: ${y}`)}},e.getValue=function(d,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":return(T(),H)[d>>>0];case"i16":return(T(),re)[d>>>1>>>0];case"i32":return(T(),w)[d>>>2>>>0];case"i64":return(T(),Q)[d>>>3>>>0];case"float":return(T(),Z)[d>>>2>>>0];case"double":return(T(),G)[d>>>3>>>0];case"*":return(T(),V)[d>>>2>>>0];default:U(`invalid type for getValue: ${f}`)}},e.UTF8ToString=ot,e.stringToUTF8=ir,e.lengthBytesUTF8=ui;var op,ip,gi,nn,$o,zs,ap,sp,up,Ms,lp,cp,$e,Ao,dp,Te,Bs,Ie,pp,Vs,fp,hp,mp,Fs,gp,bp,yp,_p,vp,wp,xp,Tp,Ip,Sp,$p,Ap,Op,Pp,Ep,Cp,Dp,kp,Np,Lp,Rp,zp,Mp,Bp,Vp,Fp,Gp,Up,Wp,Hp,qp,jp,Kp,Xp,Zp,Jp,Yp,Qp,ef,tf,nf,Zn,Z1=[nr,To,gd,wd,xd,Td,Id,Sd,$d,Ad,Od,Pd,Ed,Cd,Dd,kd,Hd,qd,jd,Jd,Yd,Qd,ep,tp,np,rp],Gs={1124124:(d,f,y,b,I)=>{if(e===void 0||!e.jd)return 1;if((d=ot(Number(d>>>0))).startsWith("./")&&(d=d.substring(2)),!(d=e.jd.get(d)))return 2;if(f=Number(f>>>0),y=Number(y>>>0),b=Number(b>>>0),f+y>d.byteLength)return 3;try{let E=d.subarray(f,f+y);switch(I){case 0:(T(),M).set(E,b>>>0);break;case 1:e.ae?e.ae(b,E):e.Td(b,E);break;default:return 4}return 0}catch{return 4}},1124948:()=>typeof navigator<"u"&&navigator.de?1:0,1125020:(d,f,y)=>{e.Dd(d,(T(),M).subarray(f>>>0,f+y>>>0))},1125084:()=>e.ce(),1125126:d=>{e.Cd(d)},1125163:()=>{e.Md()},1125194:()=>{e.Nd()},1125223:()=>{e.Rd()},1125248:d=>e.Ld(d),1125281:d=>e.Pd(d),1125313:(d,f,y)=>{e.rd(Number(d),Number(f),Number(y),!0)},1125376:(d,f,y)=>{e.rd(Number(d),Number(f),Number(y))},1125433:()=>typeof wasmOffsetConverter<"u",1125490:d=>{e.ic("Abs",d,void 0)},1125541:d=>{e.ic("Neg",d,void 0)},1125592:d=>{e.ic("Floor",d,void 0)},1125645:d=>{e.ic("Ceil",d,void 0)},1125697:d=>{e.ic("Reciprocal",d,void 0)},1125755:d=>{e.ic("Sqrt",d,void 0)},1125807:d=>{e.ic("Exp",d,void 0)},1125858:d=>{e.ic("Erf",d,void 0)},1125909:d=>{e.ic("Sigmoid",d,void 0)},1125964:(d,f,y)=>{e.ic("HardSigmoid",d,{alpha:f,beta:y})},1126043:d=>{e.ic("HardSwish",d,void 0)},1126100:d=>{e.ic("Log",d,void 0)},1126151:d=>{e.ic("Sin",d,void 0)},1126202:d=>{e.ic("Cos",d,void 0)},1126253:d=>{e.ic("Tan",d,void 0)},1126304:d=>{e.ic("Asin",d,void 0)},1126356:d=>{e.ic("Acos",d,void 0)},1126408:d=>{e.ic("Atan",d,void 0)},1126460:d=>{e.ic("Sinh",d,void 0)},1126512:d=>{e.ic("Cosh",d,void 0)},1126564:d=>{e.ic("Asinh",d,void 0)},1126617:d=>{e.ic("Acosh",d,void 0)},1126670:d=>{e.ic("Atanh",d,void 0)},1126723:d=>{e.ic("Tanh",d,void 0)},1126775:d=>{e.ic("Not",d,void 0)},1126826:(d,f,y)=>{e.ic("Clip",d,{min:f,max:y})},1126895:d=>{e.ic("Clip",d,void 0)},1126947:(d,f)=>{e.ic("Elu",d,{alpha:f})},1127005:d=>{e.ic("Gelu",d,void 0)},1127057:d=>{e.ic("Relu",d,void 0)},1127109:(d,f)=>{e.ic("LeakyRelu",d,{alpha:f})},1127173:(d,f)=>{e.ic("ThresholdedRelu",d,{alpha:f})},1127243:(d,f)=>{e.ic("Cast",d,{to:f})},1127301:d=>{e.ic("Add",d,void 0)},1127352:d=>{e.ic("Sub",d,void 0)},1127403:d=>{e.ic("Mul",d,void 0)},1127454:d=>{e.ic("Div",d,void 0)},1127505:d=>{e.ic("Pow",d,void 0)},1127556:d=>{e.ic("Equal",d,void 0)},1127609:d=>{e.ic("Greater",d,void 0)},1127664:d=>{e.ic("GreaterOrEqual",d,void 0)},1127726:d=>{e.ic("Less",d,void 0)},1127778:d=>{e.ic("LessOrEqual",d,void 0)},1127837:(d,f,y,b,I)=>{e.ic("ReduceMean",d,{keepDims:!!f,noopWithEmptyAxes:!!y,axes:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1128012:(d,f,y,b,I)=>{e.ic("ReduceMax",d,{keepDims:!!f,noopWithEmptyAxes:!!y,axes:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1128186:(d,f,y,b,I)=>{e.ic("ReduceMin",d,{keepDims:!!f,noopWithEmptyAxes:!!y,axes:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1128360:(d,f,y,b,I)=>{e.ic("ReduceProd",d,{keepDims:!!f,noopWithEmptyAxes:!!y,axes:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1128535:(d,f,y,b,I)=>{e.ic("ReduceSum",d,{keepDims:!!f,noopWithEmptyAxes:!!y,axes:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1128709:(d,f,y,b,I)=>{e.ic("ReduceL1",d,{keepDims:!!f,noopWithEmptyAxes:!!y,axes:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1128882:(d,f,y,b,I)=>{e.ic("ReduceL2",d,{keepDims:!!f,noopWithEmptyAxes:!!y,axes:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1129055:(d,f,y,b,I)=>{e.ic("ReduceLogSum",d,{keepDims:!!f,noopWithEmptyAxes:!!y,axes:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1129232:(d,f,y,b,I)=>{e.ic("ReduceSumSquare",d,{keepDims:!!f,noopWithEmptyAxes:!!y,axes:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1129412:(d,f,y,b,I)=>{e.ic("ReduceLogSumExp",d,{keepDims:!!f,noopWithEmptyAxes:!!y,axes:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1129592:d=>{e.ic("Where",d,void 0)},1129645:(d,f,y)=>{e.ic("Transpose",d,{perm:f?Array.from((T(),w).subarray(Number(f)>>>0,Number(y)>>>0)):[]})},1129769:(d,f,y,b)=>{e.ic("DepthToSpace",d,{blocksize:f,mode:ot(y),format:b?"NHWC":"NCHW"})},1129902:(d,f,y,b)=>{e.ic("DepthToSpace",d,{blocksize:f,mode:ot(y),format:b?"NHWC":"NCHW"})},1130035:(d,f,y,b)=>{e.ic("DFT",d,{axis:f,inverse:y,onesided:b})},1130127:(d,f,y,b,I,E,L,F,J,te,ve,De,We,qe,sr)=>{e.ic("ConvTranspose",d,{format:J?"NHWC":"NCHW",autoPad:f,dilations:[y],group:b,kernelShape:[I],pads:[E,L],strides:[F],wIsConst:()=>!!(T(),H)[te>>>0],outputPadding:ve?Array.from((T(),w).subarray(Number(ve)>>>0,Number(De)>>>0)):[],outputShape:We?Array.from((T(),w).subarray(Number(We)>>>0,Number(qe)>>>0)):[],activation:ot(sr)})},1130560:(d,f,y,b,I,E,L,F,J,te,ve,De,We,qe)=>{e.ic("ConvTranspose",d,{format:F?"NHWC":"NCHW",autoPad:f,dilations:Array.from((T(),w).subarray(Number(y)>>>0,(Number(y)>>>0)+2>>>0)),group:b,kernelShape:Array.from((T(),w).subarray(Number(I)>>>0,(Number(I)>>>0)+2>>>0)),pads:Array.from((T(),w).subarray(Number(E)>>>0,(Number(E)>>>0)+4>>>0)),strides:Array.from((T(),w).subarray(Number(L)>>>0,(Number(L)>>>0)+2>>>0)),wIsConst:()=>!!(T(),H)[J>>>0],outputPadding:te?Array.from((T(),w).subarray(Number(te)>>>0,Number(ve)>>>0)):[],outputShape:De?Array.from((T(),w).subarray(Number(De)>>>0,Number(We)>>>0)):[],activation:ot(qe)})},1131221:(d,f,y,b,I,E,L,F,J,te,ve,De,We,qe,sr)=>{e.ic("ConvTranspose",d,{format:J?"NHWC":"NCHW",autoPad:f,dilations:[y],group:b,kernelShape:[I],pads:[E,L],strides:[F],wIsConst:()=>!!(T(),H)[te>>>0],outputPadding:ve?Array.from((T(),w).subarray(Number(ve)>>>0,Number(De)>>>0)):[],outputShape:We?Array.from((T(),w).subarray(Number(We)>>>0,Number(qe)>>>0)):[],activation:ot(sr)})},1131654:(d,f,y,b,I,E,L,F,J,te,ve,De,We,qe)=>{e.ic("ConvTranspose",d,{format:F?"NHWC":"NCHW",autoPad:f,dilations:Array.from((T(),w).subarray(Number(y)>>>0,(Number(y)>>>0)+2>>>0)),group:b,kernelShape:Array.from((T(),w).subarray(Number(I)>>>0,(Number(I)>>>0)+2>>>0)),pads:Array.from((T(),w).subarray(Number(E)>>>0,(Number(E)>>>0)+4>>>0)),strides:Array.from((T(),w).subarray(Number(L)>>>0,(Number(L)>>>0)+2>>>0)),wIsConst:()=>!!(T(),H)[J>>>0],outputPadding:te?Array.from((T(),w).subarray(Number(te)>>>0,Number(ve)>>>0)):[],outputShape:De?Array.from((T(),w).subarray(Number(De)>>>0,Number(We)>>>0)):[],activation:ot(qe)})},1132315:(d,f)=>{e.ic("GlobalAveragePool",d,{format:f?"NHWC":"NCHW"})},1132406:(d,f,y,b,I,E,L,F,J,te,ve,De,We,qe)=>{e.ic("AveragePool",d,{format:qe?"NHWC":"NCHW",auto_pad:f,ceil_mode:y,count_include_pad:b,storage_order:I,dilations:E?Array.from((T(),w).subarray(Number(E)>>>0,Number(L)>>>0)):[],kernel_shape:F?Array.from((T(),w).subarray(Number(F)>>>0,Number(J)>>>0)):[],pads:te?Array.from((T(),w).subarray(Number(te)>>>0,Number(ve)>>>0)):[],strides:De?Array.from((T(),w).subarray(Number(De)>>>0,Number(We)>>>0)):[]})},1132885:(d,f)=>{e.ic("GlobalAveragePool",d,{format:f?"NHWC":"NCHW"})},1132976:(d,f,y,b,I,E,L,F,J,te,ve,De,We,qe)=>{e.ic("AveragePool",d,{format:qe?"NHWC":"NCHW",auto_pad:f,ceil_mode:y,count_include_pad:b,storage_order:I,dilations:E?Array.from((T(),w).subarray(Number(E)>>>0,Number(L)>>>0)):[],kernel_shape:F?Array.from((T(),w).subarray(Number(F)>>>0,Number(J)>>>0)):[],pads:te?Array.from((T(),w).subarray(Number(te)>>>0,Number(ve)>>>0)):[],strides:De?Array.from((T(),w).subarray(Number(De)>>>0,Number(We)>>>0)):[]})},1133455:(d,f)=>{e.ic("GlobalMaxPool",d,{format:f?"NHWC":"NCHW"})},1133542:(d,f,y,b,I,E,L,F,J,te,ve,De,We,qe)=>{e.ic("MaxPool",d,{format:qe?"NHWC":"NCHW",auto_pad:f,ceil_mode:y,count_include_pad:b,storage_order:I,dilations:E?Array.from((T(),w).subarray(Number(E)>>>0,Number(L)>>>0)):[],kernel_shape:F?Array.from((T(),w).subarray(Number(F)>>>0,Number(J)>>>0)):[],pads:te?Array.from((T(),w).subarray(Number(te)>>>0,Number(ve)>>>0)):[],strides:De?Array.from((T(),w).subarray(Number(De)>>>0,Number(We)>>>0)):[]})},1134017:(d,f)=>{e.ic("GlobalMaxPool",d,{format:f?"NHWC":"NCHW"})},1134104:(d,f,y,b,I,E,L,F,J,te,ve,De,We,qe)=>{e.ic("MaxPool",d,{format:qe?"NHWC":"NCHW",auto_pad:f,ceil_mode:y,count_include_pad:b,storage_order:I,dilations:E?Array.from((T(),w).subarray(Number(E)>>>0,Number(L)>>>0)):[],kernel_shape:F?Array.from((T(),w).subarray(Number(F)>>>0,Number(J)>>>0)):[],pads:te?Array.from((T(),w).subarray(Number(te)>>>0,Number(ve)>>>0)):[],strides:De?Array.from((T(),w).subarray(Number(De)>>>0,Number(We)>>>0)):[]})},1134579:(d,f,y,b,I)=>{e.ic("Gemm",d,{alpha:f,beta:y,transA:b,transB:I})},1134683:d=>{e.ic("MatMul",d,void 0)},1134737:(d,f,y,b)=>{e.ic("ArgMax",d,{keepDims:!!f,selectLastIndex:!!y,axis:b})},1134845:(d,f,y,b)=>{e.ic("ArgMin",d,{keepDims:!!f,selectLastIndex:!!y,axis:b})},1134953:(d,f)=>{e.ic("Softmax",d,{axis:f})},1135016:(d,f)=>{e.ic("Concat",d,{axis:f})},1135076:(d,f,y,b,I)=>{e.ic("Split",d,{axis:f,numOutputs:y,splitSizes:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1135232:d=>{e.ic("Expand",d,void 0)},1135286:(d,f)=>{e.ic("Gather",d,{axis:Number(f)})},1135357:(d,f)=>{e.ic("GatherElements",d,{axis:Number(f)})},1135436:(d,f)=>{e.ic("GatherND",d,{batch_dims:Number(f)})},1135515:(d,f,y,b,I,E,L,F,J,te,ve)=>{e.ic("Resize",d,{antialias:f,axes:y?Array.from((T(),w).subarray(Number(y)>>>0,Number(b)>>>0)):[],coordinateTransformMode:ot(I),cubicCoeffA:E,excludeOutside:L,extrapolationValue:F,keepAspectRatioPolicy:ot(J),mode:ot(te),nearestMode:ot(ve)})},1135877:(d,f,y,b,I,E,L)=>{e.ic("Slice",d,{starts:f?Array.from((T(),w).subarray(Number(f)>>>0,Number(y)>>>0)):[],ends:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[],axes:E?Array.from((T(),w).subarray(Number(E)>>>0,Number(L)>>>0)):[]})},1136141:d=>{e.ic("Tile",d,void 0)},1136193:(d,f,y)=>{e.ic("InstanceNormalization",d,{epsilon:f,format:y?"NHWC":"NCHW"})},1136307:(d,f,y)=>{e.ic("InstanceNormalization",d,{epsilon:f,format:y?"NHWC":"NCHW"})},1136421:d=>{e.ic("Range",d,void 0)},1136474:(d,f)=>{e.ic("Einsum",d,{equation:ot(f)})},1136555:(d,f,y,b,I)=>{e.ic("Pad",d,{mode:f,value:y,pads:b?Array.from((T(),w).subarray(Number(b)>>>0,Number(I)>>>0)):[]})},1136698:(d,f,y,b,I,E)=>{e.ic("BatchNormalization",d,{epsilon:f,momentum:y,spatial:!!I,trainingMode:!!b,format:E?"NHWC":"NCHW"})},1136867:(d,f,y,b,I,E)=>{e.ic("BatchNormalization",d,{epsilon:f,momentum:y,spatial:!!I,trainingMode:!!b,format:E?"NHWC":"NCHW"})},1137036:(d,f,y)=>{e.ic("CumSum",d,{exclusive:Number(f),reverse:Number(y)})},1137133:(d,f,y)=>{e.ic("DequantizeLinear",d,{axis:f,blockSize:y})},1137223:(d,f,y,b,I)=>{e.ic("GridSample",d,{align_corners:f,mode:ot(y),padding_mode:ot(b),format:I?"NHWC":"NCHW"})},1137393:(d,f,y,b,I)=>{e.ic("GridSample",d,{align_corners:f,mode:ot(y),padding_mode:ot(b),format:I?"NHWC":"NCHW"})},1137563:(d,f)=>{e.ic("ScatterND",d,{reduction:ot(f)})},1137648:(d,f,y,b,I,E,L,F,J)=>{e.ic("Attention",d,{numHeads:f,isUnidirectional:y,maskFilterValue:b,scale:I,doRotary:E,qkvHiddenSizes:L?Array.from((T(),w).subarray(Number(F)>>>0,Number(F)+L>>>0)):[],pastPresentShareBuffer:!!J})},1137920:d=>{e.ic("BiasAdd",d,void 0)},1137975:d=>{e.ic("BiasSplitGelu",d,void 0)},1138036:d=>{e.ic("FastGelu",d,void 0)},1138092:(d,f,y,b,I,E,L,F,J,te,ve,De,We,qe,sr,Us)=>{e.ic("Conv",d,{format:De?"NHWC":"NCHW",auto_pad:f,dilations:y?Array.from((T(),w).subarray(Number(y)>>>0,Number(b)>>>0)):[],group:I,kernel_shape:E?Array.from((T(),w).subarray(Number(E)>>>0,Number(L)>>>0)):[],pads:F?Array.from((T(),w).subarray(Number(F)>>>0,Number(J)>>>0)):[],strides:te?Array.from((T(),w).subarray(Number(te)>>>0,Number(ve)>>>0)):[],w_is_const:()=>!!(T(),H)[Number(We)>>>0],activation:ot(qe),activation_params:sr?Array.from((T(),Z).subarray(Number(sr)>>>0,Number(Us)>>>0)):[]})},1138676:d=>{e.ic("Gelu",d,void 0)},1138728:(d,f,y,b,I,E,L,F,J)=>{e.ic("GroupQueryAttention",d,{numHeads:f,kvNumHeads:y,scale:b,softcap:I,doRotary:E,rotaryInterleaved:L,smoothSoftmax:F,localWindowSize:J})},1138945:(d,f,y,b)=>{e.ic("LayerNormalization",d,{axis:f,epsilon:y,simplified:!!b})},1139056:(d,f,y,b)=>{e.ic("LayerNormalization",d,{axis:f,epsilon:y,simplified:!!b})},1139167:(d,f,y,b,I,E)=>{e.ic("MatMulNBits",d,{k:f,n:y,accuracyLevel:b,bits:I,blockSize:E})},1139294:(d,f,y,b,I,E)=>{e.ic("MultiHeadAttention",d,{numHeads:f,isUnidirectional:y,maskFilterValue:b,scale:I,doRotary:E})},1139453:(d,f)=>{e.ic("QuickGelu",d,{alpha:f})},1139517:(d,f,y,b,I)=>{e.ic("RotaryEmbedding",d,{interleaved:!!f,numHeads:y,rotaryEmbeddingDim:b,scale:I})},1139656:(d,f,y)=>{e.ic("SkipLayerNormalization",d,{epsilon:f,simplified:!!y})},1139758:(d,f,y)=>{e.ic("SkipLayerNormalization",d,{epsilon:f,simplified:!!y})},1139860:(d,f,y,b)=>{e.ic("GatherBlockQuantized",d,{gatherAxis:f,quantizeAxis:y,blockSize:b})},1139981:d=>{e.Qd(d)},1140015:(d,f)=>e.Sd(Number(d),Number(f),e.hd.Vd,e.hd.errors)};function J1(d,f,y){return Vd(async()=>{await e.Od(Number(d),Number(f),Number(y))})}function Y1(){return typeof wasmOffsetConverter<"u"}function Q1(d,f,y,b){var I=Ie();try{return Ip(d,f,y,b)}catch(E){if(Te(I),E!==E+0)throw E;$e(1,0)}}function e2(d,f,y){var b=Ie();try{return xp(d,f,y)}catch(I){if(Te(b),I!==I+0)throw I;$e(1,0)}}function t2(d){var f=Ie();try{vp(d)}catch(y){if(Te(f),y!==y+0)throw y;$e(1,0)}}function n2(d,f){var y=Ie();try{return Fs(d,f)}catch(b){if(Te(y),b!==b+0)throw b;$e(1,0)}}function r2(d,f,y){var b=Ie();try{mp(d,f,y)}catch(I){if(Te(b),I!==I+0)throw I;$e(1,0)}}function o2(d,f,y,b){var I=Ie();try{return Pp(d,f,y,b)}catch(E){if(Te(I),E!==E+0)throw E;$e(1,0)}}function i2(d,f){var y=Ie();try{Sp(d,f)}catch(b){if(Te(y),b!==b+0)throw b;$e(1,0)}}function a2(d,f,y,b,I,E,L){var F=Ie();try{return Tp(d,f,y,b,I,E,L)}catch(J){if(Te(F),J!==J+0)throw J;$e(1,0)}}function s2(d,f,y,b,I,E){var L=Ie();try{gp(d,f,y,b,I,E)}catch(F){if(Te(L),F!==F+0)throw F;$e(1,0)}}function u2(d,f,y,b){var I=Ie();try{yp(d,f,y,b)}catch(E){if(Te(I),E!==E+0)throw E;$e(1,0)}}function l2(d,f,y,b,I){var E=Ie();try{wp(d,f,y,b,I)}catch(L){if(Te(E),L!==L+0)throw L;$e(1,0)}}function c2(d,f,y,b,I,E,L){var F=Ie();try{Ap(d,f,y,b,I,E,L)}catch(J){if(Te(F),J!==J+0)throw J;$e(1,0)}}function d2(d,f,y,b,I,E,L){var F=Ie();try{Op(d,f,y,b,I,E,L)}catch(J){if(Te(F),J!==J+0)throw J;$e(1,0)}}function p2(d,f,y,b,I,E,L,F){var J=Ie();try{kp(d,f,y,b,I,E,L,F)}catch(te){if(Te(J),te!==te+0)throw te;$e(1,0)}}function f2(d,f,y,b,I){var E=Ie();try{return $p(d,f,y,b,I)}catch(L){if(Te(E),L!==L+0)throw L;$e(1,0)}}function h2(d,f,y){var b=Ie();try{return _p(d,f,y)}catch(I){if(Te(b),I!==I+0)throw I;$e(1,0)}}function m2(d,f,y,b,I,E,L,F){var J=Ie();try{Np(d,f,y,b,I,E,L,F)}catch(te){if(Te(J),te!==te+0)throw te;$e(1,0)}}function g2(d,f,y,b,I,E,L,F,J,te,ve,De){var We=Ie();try{Ep(d,f,y,b,I,E,L,F,J,te,ve,De)}catch(qe){if(Te(We),qe!==qe+0)throw qe;$e(1,0)}}function b2(d,f,y){var b=Ie();try{return Lp(d,f,y)}catch(I){if(Te(b),I!==I+0)throw I;return $e(1,0),0n}}function y2(d,f,y,b,I,E,L,F,J){var te=Ie();try{bp(d,f,y,b,I,E,L,F,J)}catch(ve){if(Te(te),ve!==ve+0)throw ve;$e(1,0)}}function _2(d){var f=Ie();try{return Rp(d)}catch(y){if(Te(f),y!==y+0)throw y;$e(1,0)}}function v2(d,f){var y=Ie();try{return Jp(d,f)}catch(b){if(Te(y),b!==b+0)throw b;return $e(1,0),0n}}function w2(d,f,y,b){var I=Ie();try{return zp(d,f,y,b)}catch(E){if(Te(I),E!==E+0)throw E;$e(1,0)}}function x2(d,f,y,b,I,E,L){var F=Ie();try{Yp(d,f,y,b,I,E,L)}catch(J){if(Te(F),J!==J+0)throw J;$e(1,0)}}function T2(d){var f=Ie();try{return Mp(d)}catch(y){if(Te(f),y!==y+0)throw y;return $e(1,0),0n}}function I2(d,f,y,b,I){var E=Ie();try{return Wp(d,f,y,b,I)}catch(L){if(Te(E),L!==L+0)throw L;$e(1,0)}}function S2(d,f,y,b,I,E){var L=Ie();try{return Hp(d,f,y,b,I,E)}catch(F){if(Te(L),F!==F+0)throw F;$e(1,0)}}function $2(d,f,y,b,I,E){var L=Ie();try{return Cp(d,f,y,b,I,E)}catch(F){if(Te(L),F!==F+0)throw F;$e(1,0)}}function A2(d,f,y,b,I,E){var L=Ie();try{return qp(d,f,y,b,I,E)}catch(F){if(Te(L),F!==F+0)throw F;$e(1,0)}}function O2(d,f,y,b,I,E,L,F){var J=Ie();try{return Dp(d,f,y,b,I,E,L,F)}catch(te){if(Te(J),te!==te+0)throw te;$e(1,0)}}function P2(d,f,y,b,I){var E=Ie();try{return jp(d,f,y,b,I)}catch(L){if(Te(E),L!==L+0)throw L;return $e(1,0),0n}}function E2(d,f,y,b){var I=Ie();try{return Kp(d,f,y,b)}catch(E){if(Te(I),E!==E+0)throw E;$e(1,0)}}function C2(d,f,y,b){var I=Ie();try{return Xp(d,f,y,b)}catch(E){if(Te(I),E!==E+0)throw E;$e(1,0)}}function D2(d,f,y,b,I,E,L,F,J,te,ve,De){var We=Ie();try{return Zp(d,f,y,b,I,E,L,F,J,te,ve,De)}catch(qe){if(Te(We),qe!==qe+0)throw qe;$e(1,0)}}function k2(d,f,y,b,I,E,L,F,J,te,ve){var De=Ie();try{Gp(d,f,y,b,I,E,L,F,J,te,ve)}catch(We){if(Te(De),We!==We+0)throw We;$e(1,0)}}function N2(d,f,y,b,I,E,L,F,J,te,ve,De,We,qe,sr,Us){var M2=Ie();try{Up(d,f,y,b,I,E,L,F,J,te,ve,De,We,qe,sr,Us)}catch(Ws){if(Te(M2),Ws!==Ws+0)throw Ws;$e(1,0)}}function L2(d,f,y){var b=Ie();try{return Bp(d,f,y)}catch(I){if(Te(b),I!==I+0)throw I;$e(1,0)}}function R2(d,f,y){var b=Ie();try{return Vp(d,f,y)}catch(I){if(Te(b),I!==I+0)throw I;$e(1,0)}}function z2(d,f,y,b){var I=Ie();try{Fp(d,f,y,b)}catch(E){if(Te(I),E!==E+0)throw E;$e(1,0)}}function bi(){if(0<Qe)Wt=bi;else if(o)_?.(e),se();else{for(var d=nt;0<d.length;)d.shift()(e);0<Qe?Wt=bi:(e.calledRun=!0,C||(se(),_?.(e)))}}return o||(Zn=await he(),bi()),e.PTR_SIZE=4,_e?e:new Promise((d,f)=>{_=d,S=f})}var z3,M3,I_=N(()=>{"use strict";z3=x_,M3=globalThis.self?.name?.startsWith("em-pthread");M3&&x_()});var A_,Tc,B3,Pt,O_,xc,V3,F3,P_,G3,S_,E_,$_,C_,Pa=N(()=>{"use strict";Oa();A_=typeof location>"u"?void 0:location.origin,Tc=import.meta.url>"file:"&&import.meta.url<"file;",B3=()=>{if(!!1){if(Tc){let r=URL;return new URL(new r("ort.all.bundle.min.mjs",import.meta.url).href,A_).href}return import.meta.url}},Pt=B3(),O_=()=>{if(Pt&&!Pt.startsWith("blob:"))return Pt.substring(0,Pt.lastIndexOf("/")+1)},xc=(r,e)=>{try{let n=e??Pt;return(n?new URL(r,n):new URL(r)).origin===A_}catch{return!1}},V3=(r,e)=>{let n=e??Pt;try{return(n?new URL(r,n):new URL(r)).href}catch{return}},F3=(r,e)=>`${e??"./"}${r}`,P_=async r=>{let n=await(await fetch(r,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},G3=async r=>(await import(/*webpackIgnore:true*/ /*@vite-ignore*/r)).default,S_=(w_(),Yr(v_)).default,E_=async()=>{if(!Pt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(xc(Pt))return[void 0,S_()];let r=await P_(Pt);return[r,S_(r)]},$_=(I_(),Yr(T_)).default,C_=async(r,e,n,t)=>{let o=$_&&!(r||e);if(o)if(Pt)o=xc(Pt)||t&&!n;else if(t&&!n)o=!0;else throw new Error("cannot determine the script source URL.");if(o)return[void 0,$_];{let i="ort-wasm-simd-threaded.jsep.mjs",a=r??V3(i,e),s=!!1&&n&&a&&!xc(a,e),u=s?await P_(a):a??F3(i,e);return[s?u:void 0,await G3(u)]}}});var Ic,Sc,Ma,D_,U3,W3,H3,Ea,Oe,_r=N(()=>{"use strict";Pa();Sc=!1,Ma=!1,D_=!1,U3=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},W3=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},H3=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ea=async r=>{if(Sc)return Promise.resolve();if(Ma)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(D_)throw new Error("previous call to 'initializeWebAssembly()' failed.");Ma=!0;let e=r.initTimeout,n=r.numThreads;if(r.simd!==!1){if(r.simd==="relaxed"){if(!H3())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!W3())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let t=U3();n>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),r.numThreads=n=1);let o=r.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,s=a?.href??a,u=o?.wasm,l=u?.href??u,c=r.wasmBinary,[p,h]=await C_(s,i,n>1,!!c||!!l),g=!1,m=[];if(e>0&&m.push(new Promise(_=>{setTimeout(()=>{g=!0,_()},e)})),m.push(new Promise((_,S)=>{let v={numThreads:n};if(c)v.wasmBinary=c,v.locateFile=x=>x;else if(l||i)v.locateFile=x=>l??i+x;else if(s&&s.indexOf("blob:")!==0)v.locateFile=x=>new URL(x,s).href;else if(p){let x=O_();x&&(v.locateFile=$=>x+$)}h(v).then(x=>{Ma=!1,Sc=!0,Ic=x,_(),p&&URL.revokeObjectURL(p)},x=>{Ma=!1,D_=!0,S(x)})})),await Promise.race(m),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Oe=()=>{if(Sc&&Ic)return Ic;throw new Error("WebAssembly is not initialized yet.")}});var Et,Jo,Ee,Ba=N(()=>{"use strict";_r();Et=(r,e)=>{let n=Oe(),t=n.lengthBytesUTF8(r)+1,o=n._malloc(t);return n.stringToUTF8(r,o,t),e.push(o),o},Jo=(r,e,n,t)=>{if(typeof r=="object"&&r!==null){if(n.has(r))throw new Error("Circular reference in options");n.add(r)}Object.entries(r).forEach(([o,i])=>{let a=e?e+o:o;if(typeof i=="object")Jo(i,a+".",n,t);else if(typeof i=="string"||typeof i=="number")t(a,i.toString());else if(typeof i=="boolean")t(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},Ee=r=>{let e=Oe(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),a=e.getValue(o+t,"*"),s=a?e.UTF8ToString(a):"";throw new Error(`${r} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(n)}}});var k_,N_=N(()=>{"use strict";_r();Ba();k_=(r,e)=>{let n=Oe(),t=0,o=[],i=r||{};try{if(r?.logSeverityLevel===void 0)i.logSeverityLevel=2;else if(typeof r.logSeverityLevel!="number"||!Number.isInteger(r.logSeverityLevel)||r.logSeverityLevel<0||r.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${r.logSeverityLevel}`);if(r?.logVerbosityLevel===void 0)i.logVerbosityLevel=0;else if(typeof r.logVerbosityLevel!="number"||!Number.isInteger(r.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${r.logVerbosityLevel}`);r?.terminate===void 0&&(i.terminate=!1);let a=0;r?.tag!==void 0&&(a=Et(r.tag,o)),t=n._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,a),t===0&&Ee("Can't create run options."),r?.extra!==void 0&&Jo(r.extra,"",new WeakSet,(s,u)=>{let l=Et(s,o),c=Et(u,o);n._OrtAddRunConfigEntry(t,l,c)!==0&&Ee(`Can't set a run config entry: ${s} - ${u}.`)});for(let s of e)n._OrtRunOptionsAddActiveLoraAdapter(t,s)!==0&&Ee("Can't add an active LoRA adapter.");return[t,o]}catch(a){throw t!==0&&n._OrtReleaseRunOptions(t),o.forEach(s=>n._free(s)),a}}});var q3,j3,K3,ho,X3,L_,R_=N(()=>{"use strict";_r();Ba();q3=r=>{switch(r){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${r}`)}},j3=r=>{switch(r){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${r}`)}},K3=r=>{r.extra||(r.extra={}),r.extra.session||(r.extra.session={});let e=r.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(r.enableMemPattern=!1)},ho=(r,e,n,t)=>{let o=Et(e,t),i=Et(n,t);Oe()._OrtAddSessionConfigEntry(r,o,i)!==0&&Ee(`Can't set a session config entry: ${e} - ${n}.`)},X3=async(r,e,n)=>{let t=e.executionProviders;for(let o of t){let i=typeof o=="string"?o:o.name,a=[],s;switch(i){case"webnn":if(i="WEBNN",ho(r,"session.disable_quant_qdq","1",n),ho(r,"session.disable_qdq_constant_folding","1",n),typeof o!="string"){let g=o?.deviceType;g&&ho(r,"deviceType",g,n)}break;case"webgpu":if(i="JS",typeof o!="string"){let h=o;if(h?.preferredLayout){if(h.preferredLayout!=="NCHW"&&h.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${h.preferredLayout}`);ho(r,"preferredLayout",h.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${i}`)}let u=a.length,l=0,c=0;if(u>0){l=Oe()._malloc(u*Oe().PTR_SIZE),n.push(l),c=Oe()._malloc(u*Oe().PTR_SIZE),n.push(c);for(let h=0;h<u;h++)Oe().setValue(l+h*Oe().PTR_SIZE,a[h][0],"*"),Oe().setValue(c+h*Oe().PTR_SIZE,a[h][1],"*")}let p;if(s!==void 0){let h=Oe()._malloc(Oe().PTR_SIZE);n.push(h),Oe().setValue(h,s[0],"*"),p=await Oe()._OrtAppendExecutionProviderV2(r,h,1,l,c,u)}else{let h=Et(i,n);p=await Oe()._OrtAppendExecutionProvider(r,h,l,c,u)}p!==0&&Ee(`Can't append execution provider: ${i}.`)}},L_=async r=>{let e=Oe(),n=0,t=[],o=r||{};K3(o);try{let i=q3(o.graphOptimizationLevel??"all"),a=j3(o.executionMode??"sequential"),s=typeof o.logId=="string"?Et(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log severity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof o.optimizedModelFilePath=="string"?Et(o.optimizedModelFilePath,t):0;if(n=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,l,c),n===0&&Ee("Can't create session options."),o.executionProviders&&await X3(n,o,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);ho(n,"enableGraphCapture",o.enableGraphCapture.toString(),t)}if(o.freeDimensionOverrides)for(let[p,h]of Object.entries(o.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let g=Et(p,t);e._OrtAddFreeDimensionOverride(n,g,h)!==0&&Ee(`Can't set a free dimension override: ${p} - ${h}.`)}return o.extra!==void 0&&Jo(o.extra,"",new WeakSet,(p,h)=>{ho(n,p,h,t)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseSessionOptions(n)!==0&&Ee("Can't release session options."),t.forEach(a=>e._free(a)),i}}});var vr,Fn,wr,mo,Yo,Va,Fa,$c,pe=N(()=>{"use strict";vr=r=>{switch(r){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${r}`)}},Fn=r=>{switch(r){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${r}`)}},wr=(r,e)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][r],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return n>0?Math.ceil(t*n):void 0},mo=r=>{switch(r){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${r}`)}},Yo=r=>{switch(r){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${r}`)}},Va=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",Fa=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint64"||r==="int8"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",$c=r=>{switch(r){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${r}`)}}});var Ur,Ga=N(()=>{"use strict";Oa();Ur=async r=>{if(typeof r=="string")if(!1)try{let{readFile:e}=Jr("node:fs/promises");return new Uint8Array(await e(r))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=Jr("node:fs"),t=n(r),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(r);if(!e.ok)throw new Error(`failed to load external data file: ${r}`);let n=e.headers.get("Content-Length"),t=n?parseInt(n,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${r}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(s){if(s instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw s}let a=0;for(;;){let{done:s,value:u}=await o.read();if(s)break;let l=u.byteLength;new Uint8Array(i,a,l).set(u),a+=l}return new Uint8Array(i,0,t)}}else return r instanceof Blob?new Uint8Array(await r.arrayBuffer()):r instanceof Uint8Array?r:new Uint8Array(r)}});var Z3,J3,z_,M_,Ua,Y3,xe,Gn=N(()=>{"use strict";pe();Z3=["V","I","W","E","F"],J3=(r,e)=>{console.log(`[${Z3[r]},${new Date().toISOString()}]${e}`)},Ua=(r,e)=>{z_=r,M_=e},Y3=(r,e)=>{let n=Yo(r),t=Yo(z_);n>=t&&J3(n,typeof e=="function"?e():e)},xe=(...r)=>{M_&&Y3(...r)}});var Ac,Un,k,Wr,Wa,B_,V_,ge=N(()=>{"use strict";Ac=class{static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},Un=class{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let a=Math.max(e.length,n.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=Ac.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:n[i-u];if(l!==c&&l>1&&c>1)return;let p=Math.max(l,c);if(l&&c)s[a-u]=Math.max(l,c);else{if(p>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}},k=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,n=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%n===0){o[i]=e[i]/n;break}if(n%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n??e.length))}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}},Wr=class r{static adjustPoolAttributes(e,n,t,o,i,a){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<n.length-2;s++)s>=t.length?t.push(n[s+2]):t[s]=n[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,a,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)r.adjustPadAndReturnShape(e[u+(a?1:2)],n[u],t[u],o[u],i,u,u+e.length-2,s)}}static computePoolOutputShape(e,n,t,o,i,a,s,u=0){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return r.computeShapeHelper(e,n,l,t,o,i,a,s,u),l}static computeConvOutputShape(e,n,t,o,i,a,s){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,n,t,o,i,a,s,u,l=0){if(e)for(let c=0;c<n.length-2;c++)t.push(1);else for(let c=0;c<n.length-2;c++)t.push(r.adjustPadAndReturnShape(n[c+2],o[c],i[c],a[c],s,c,c+n.length-2,u,l))}static computeOutputSize(e,n,t,o,i){let a=Math.floor(e/n)+1;return i===1&&(a=Math.ceil(e/n)+1,(a-1)*n>=t+o&&(a-=1)),a}static adjustPadAndReturnShape(e,n,t,o,i,a,s,u,l=0){let c=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,r.computeOutputSize(e-c,n,e,0,l);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=(Math.floor((e+n-1)/n)-1)*n+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(h+1)/2:h/2),i[s]=h-i[a],r.computeOutputSize(e+i[a]+i[s]-c,n,e,i[a],l)}default:throw new Error("Unsupported AutoPad type")}else return r.computeOutputSize(e+i[a]+i[s]-c,n,e,i[a],l)}},Wa=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;n?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Un.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},B_=-34028234663852886e22,V_=34028234663852886e22});var Ha,Oc=N(()=>{"use strict";pe();Ha=(r,e)=>new(mo(e))(r)});var G_,Q3,U_,eE,F_,tE,W_,qa,ja,Pc,H_,q_=N(()=>{"use strict";pe();Gn();G_=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Q3=(r,e)=>{if(e==="int32")return r;let n=G_.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);let t=n/8;if(r.byteLength%t!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${t}.`);let o=r.byteLength/t,i=new(mo(e))(r.buffer,r.byteOffset,o);switch(e){case"int64":case"uint64":{let a=new Int32Array(o);for(let s=0;s<o;s++){let u=i[s];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[s]=Number(u)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(e==="uint32"&&i.some(s=>s>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${e} to 'int32'`)}},U_=(r,e)=>{if(e==="int32")return r;if(r.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=r.byteLength/4,t=new Int32Array(r.buffer,r.byteOffset,n);switch(e){case"int64":{let o=BigInt64Array.from(t,BigInt);return new Uint8Array(o.buffer)}case"uint64":{if(t.some(i=>i<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let o=BigUint64Array.from(t,BigInt);return new Uint8Array(o.buffer)}case"int8":{if(t.some(i=>i<-128||i>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let o=Int8Array.from(t,Number);return new Uint8Array(o.buffer)}case"uint8":{if(t.some(o=>o<0||o>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(t,Number)}case"uint32":{if(t.some(i=>i<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let o=Uint32Array.from(t,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${e}`)}},eE=1,F_=()=>eE++,tE=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),W_=(r,e)=>{let n=G_.get(r);if(!n)throw new Error(`WebNN backend does not support data type: ${r}`);return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*n/8):0},qa=class{constructor(e){this.isDataConverted=!1;let{sessionId:n,context:t,tensor:o,dataType:i,shape:a,fallbackDataType:s}=e;this.sessionId=n,this.mlContext=t,this.mlTensor=o,this.dataType=i,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return W_(this.dataType,this.tensorShape)}destroy(){xe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let n=await this.mlContext.readTensor(this.mlTensor),t=U_(new Uint8Array(n),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t);return}else return new Uint8Array(t).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,n,t){return this.mlContext===e&&this.dataType===n&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}setIsDataConverted(e){this.isDataConverted=e}},ja=class{constructor(e,n){this.tensorManager=e;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,n,t,o){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!a?.input.dataTypes.includes(n)){if(s=tE.get(n),!s||!a?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${n}`);xe("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${n} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,n,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==W_(n,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,n,t,u,!0,!0,s),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let n=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")n=Q3(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(n);return}else xe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(n):this.activeUpload=new Uint8Array(n)}async download(e){if(this.activeUpload){let n=this.wrapper?.isDataConverted?U_(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(n):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(n);return}else return n.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Pc=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let n=this.backend.getMLContext(e);if(!n)throw new Error("MLContext not found for session.");return n}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=F_();return this.tensorTrackersById.set(e,new ja(this)),e}releaseTensorId(e){let n=this.tensorTrackersById.get(e);n&&(this.tensorTrackersById.delete(e),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(e,n,t,o,i){xe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${n}, dataType: ${t}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(n);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,t,o,i)}upload(e,n){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(n)}async download(e,n){xe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${n?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(n)}releaseTensorsForSession(e){for(let n of this.freeTensors)n.sessionId===e&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==e)}registerTensor(e,n,t,o){let i=this.getMLContext(e),a=F_(),s=new qa({sessionId:e,context:i,tensor:n,dataType:t,shape:o});return this.tensorTrackersById.set(a,new ja(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,n,t,o,i,a,s){let u=this.getMLContext(e);for(let[c,p]of this.freeTensors.entries())if(p.canReuseTensor(u,n,t)){xe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${n}, ${s?`fallbackDataType: ${s},`:""} shape: ${t}`);let h=this.freeTensors.splice(c,1)[0];return h.sessionId=e,h}xe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${n}, ${s?`fallbackDataType: ${s},`:""} shape: ${t}}`);let l=await u.createTensor({dataType:s??n,shape:t,dimensions:t,usage:o,writable:i,readable:a});return new qa({sessionId:e,context:u,tensor:l,dataType:n,shape:t,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},H_=(...r)=>new Pc(...r)});var Ka,nE,Xa,j_=N(()=>{"use strict";pe();_r();Oc();q_();Gn();Ka=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),nE=(r,e)=>{if(r===e)return!0;if(r===void 0||e===void 0)return!1;let n=Object.keys(r).sort(),t=Object.keys(e).sort();return n.length===t.length&&n.every((o,i)=>o===t[i]&&r[o]===e[o])},Xa=class{constructor(e){this.tensorManager=H_(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.sessionGraphOutputs=new Map;this.temporaryGraphInputs=[];this.temporaryGraphOutputs=[];this.temporarySessionTensorIds=new Map;this.mlOpSupportLimitsBySessionId=new Map;Ua(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){xe("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){xe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let n=this.temporarySessionTensorIds.get(e);if(n){for(let t of n)xe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(t=>nE(t.options,e));if(n!==-1)return this.mlContextCache[n].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,n){this.mlContextBySessionId.set(e,n);let t=this.sessionIdsByMLContext.get(n);t||(t=new Set,this.sessionIdsByMLContext.set(n,t)),t.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,n.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let n=this.mlContextBySessionId.get(e);if(!n)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(n);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(i=>i.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){xe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,n,t,o,i){let a=Ka.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,n,a,o,i)}async createTemporaryTensor(e,n,t){xe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${n}, shape: ${t}}`);let o=Ka.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,t,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,n){if(!Oe().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");xe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${n.byteLength}}`),this.tensorManager.upload(e,n)}async downloadTensor(e,n){return this.tensorManager.download(e,n)}createMLTensorDownloader(e,n){return async()=>{let t=await this.tensorManager.download(e);return Ha(t,n)}}registerMLTensor(e,n,t,o){let i=Ka.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.registerTensor(e,n,i,o);return xe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${n}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,n){let t=this.sessionGraphInputs.get(e);return t?t.includes(n):!1}isGraphOutput(e,n){let t=this.sessionGraphOutputs.get(e);return t?t.includes(n):!1}isGraphInputOutputTypeSupported(e,n,t=!0){let o=Ka.get(vr(n)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof o>"u"?!1:t?!!i?.input.dataTypes.includes(o):!!i?.output.dataTypes.includes(o)}flush(){}}});var Za=N(()=>{"use strict"});var K_,Ec,Cc,rE,oE,X_,kc,Dc,J_,Y_=N(()=>{"use strict";Gn();Za();K_=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Ec=[],Cc=r=>Math.ceil(Number(r)/16)*16,rE=r=>{for(let e=0;e<Ec.length;e++){let n=Ec[e];if(r<=n)return n}return Math.ceil(r/16)*16},oE=1,X_=()=>oE++,kc=async(r,e,n,t)=>{let o=Cc(n),i=r.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=r.getCommandEncoder();r.endComputePass(),a.copyBufferToBuffer(e,0,i,0,o),r.flush(),await i.mapAsync(GPUMapMode.READ);let s=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(s,0,n)),u}else return new Uint8Array(s.slice(0,n))}finally{i.destroy()}},Dc=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of K_)Ec.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(e,n){let t=n.buffer,o=n.byteOffset,i=n.byteLength,a=Cc(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);if(a===i&&o%4===0)this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,t,o,i);else{let u=new Uint8Array(a);u.set(n),this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,u,0,a)}xe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Cc(t.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,n,t){let o;if(t){if(o=t[0],e===t[1])return xe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=X_();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:n}),xe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),xe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=rE(e),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:n}):o=this.backend.device.createBuffer({size:t,usage:n})}else o=this.backend.device.createBuffer({size:t,usage:n});let s={id:X_(),type:0,buffer:o};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),xe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let n=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(n);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return xe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,n){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await kc(this.backend,t.gpuData.buffer,t.originalSize,n)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let n=K_.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let n of this.buffersPending)e.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let n=this.capturedPendingBuffers.get(e);n&&(n.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(xe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},J_=(...r)=>new Dc(...r)});var Nc,ce,Xe=N(()=>{"use strict";Nc=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ce=r=>new Nc(r)});var Hr,Rc,Ge,tt,K,Ne,zc,qr,Zt,ne,Ja,z,q,Q_,Ya,Lc,e0,ye=N(()=>{"use strict";pe();ge();Hr=64,Rc=(r,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(r)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${r}`)}},Ge=(r,e=1)=>{let n=Rc(r,e);return typeof n=="string"?n:n[0]},tt=(r,e=1)=>{let n=Rc(r,e);return typeof n=="string"?n:n[1]},K=(...r)=>{let e=[];return r.forEach(n=>{n.length!==0&&e.push({type:12,data:n},{type:12,data:k.computeStrides(n)})}),e},Ne=r=>r%4===0?4:r%2===0?2:1,zc=(r="f32",e,n="0")=>!e||e===1?`${r}(${n})`:`vec${e}<${r}>(${n})`,qr=(r,e,n)=>r==="f32"?n:e===1?`f32(${n})`:`vec${e}<f32>(${n})`,Zt=(r,e)=>e===4?`(${r}.x + ${r}.y + ${r}.z + ${r}.w)`:e===2?`(${r}.x + ${r}.y)`:e===3?`(${r}.x + ${r}.y + ${r}.z)`:r,ne=(r,e,n,t)=>r.startsWith("uniforms.")&&n>4?typeof e=="string"?t==="f16"?`${r}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${r}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${r}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${r}[${Math.floor(e/4)}][${e%4}]`:n>1?`${r}[${e}]`:r,Ja=(r,e,n,t,o)=>{let i=typeof n=="number",a=i?n:n.length,s=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,l=Rc(e,o),c=typeof l=="string"?l:l[1],p=typeof l=="string"?l:l[0],h={indices:u,value:c,storage:p,tensor:e},g=U=>typeof U=="string"?U:`${U}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=i?"uniforms.":"",S=`${_}${r}_shape`,v=`${_}${r}_strides`,x="";for(let U=0;U<a-1;U++)x+=`
    let dim${U} = current / ${ne(v,U,a)};
    let rest${U} = current % ${ne(v,U,a)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;x+=`indices[${a-1}] = current;`;let $=a<2?"":`
  fn o2i_${r}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${x}
    return indices;
  }`,O=U=>(m.offsetToIndices=!0,a<2?U:`o2i_${r}(${U})`),P=[];if(a>=2)for(let U=a-1;U>=0;U--)P.push(`${ne(v,U,a)} * (indices[${U}])`);let C=a<2?"":`
  fn i2o_${r}(indices: ${h.indices}) -> u32 {
    return ${P.join("+")};
  }`,R=U=>(m.indicesToOffset=!0,a<2?U:`i2o_${r}(${U})`),T=(...U)=>a===0?"0u":`${h.indices}(${U.map(g).join(",")})`,W=(U,j)=>a<2?`${U}`:`${ne(U,j,a)}`,H=(U,j,he)=>a<2?`${U}=${he};`:`${ne(U,j,a)}=${he};`,M={},re=(U,j)=>{m.broadcastedIndicesToOffset=!0;let he=`${j.name}broadcastedIndicesTo${r}Offset`;if(he in M)return`${he}(${U})`;let lt=[];for(let Ye=a-1;Ye>=0;Ye--){let nt=j.indicesGet("outputIndices",Ye+j.rank-a);lt.push(`${W(v,Ye)} * (${nt} % ${W(S,Ye)})`)}return M[he]=`fn ${he}(outputIndices: ${j.type.indices}) -> u32 {
             return ${lt.length>0?lt.join("+"):"0u"};
           }`,`${he}(${U})`},B=(U,j)=>(()=>{if(h.storage===h.value)return`${r}[${U}]=${j};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${r}[${U}]=vec2<u32>(u32(${j}), select(0u, 0xFFFFFFFFu, ${j} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${r}[${U}]=vec2<u32>(u32(${j}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${r}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${j}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),w=U=>(()=>{if(h.storage===h.value)return`${r}[${U}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${r}[${U}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${r}[${U}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${r}[${U}] & 0xFFu), bool(${r}[${U}] & 0xFF00u), bool(${r}[${U}] & 0xFF0000u), bool(${r}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),V=a<2?"":`
  fn get_${r}ByIndices(indices: ${h.indices}) -> ${c} {
    return ${w(`i2o_${r}(indices)`)};
  }`,Z=a<2?"":(()=>{let U=s.map(he=>`d${he}: u32`).join(", "),j=s.map(he=>`d${he}`).join(", ");return`
  fn get_${r}(${U}) -> ${c} {
    return get_${r}ByIndices(${T(j)});
  }`})(),G=(...U)=>{if(U.length!==a)throw new Error(`indices length must be ${a}`);let j=U.map(g).join(",");return a===0?w("0u"):a===1?w(j[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${r}(${j})`)},Q=U=>a<2?w(U):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${r}ByIndices(${U})`),ue=a<2?"":`
  fn set_${r}ByIndices(indices: ${h.indices}, value: ${c}) {
    ${B(`i2o_${r}(indices)`,"value")}
  }`,ae=a<2?"":(()=>{let U=s.map(he=>`d${he}: u32`).join(", "),j=s.map(he=>`d${he}`).join(", ");return`
  fn set_${r}(${U}, value: ${c}) {
    set_${r}ByIndices(${T(j)}, value);
  }`})();return{impl:()=>{let U=[],j=!1;return m.offsetToIndices&&(U.push($),j=!0),m.indicesToOffset&&(U.push(C),j=!0),m.broadcastedIndicesToOffset&&(Object.values(M).forEach(he=>U.push(he)),j=!0),m.set&&(U.push(ae),j=!0),m.setByIndices&&(U.push(ue),j=!0),m.get&&(U.push(Z),j=!0),m.getByIndices&&(U.push(V),j=!0),!i&&j&&U.unshift(`const ${S} = ${h.indices}(${n.join(",")});`,`const ${v} = ${h.indices}(${k.computeStrides(n).join(",")});`),U.join(`
`)},type:h,offsetToIndices:O,indicesToOffset:R,broadcastedIndicesToOffset:re,indices:T,indicesGet:W,indicesSet:H,set:(...U)=>{if(U.length!==a+1)throw new Error(`indices length must be ${a}`);let j=U[a];if(typeof j!="string")throw new Error("value must be string");let he=U.slice(0,a).map(g).join(",");return a===0?B("0u",j):a===1?B(he[0],j):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${r}(${he}, ${j})`)},setByOffset:B,setByIndices:(U,j)=>a<2?B(U,j):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${r}ByIndices(${U}, ${j});`),get:G,getByOffset:w,getByIndices:Q,usage:t,name:r,strides:v,shape:S,rank:a}},z=(r,e,n,t=1)=>Ja(r,e,n,"input",t),q=(r,e,n,t=1)=>Ja(r,e,n,"output",t),Q_=(r,e,n)=>Ja(r,e,n,"atomicOutput",1),Ya=(r,e,n,t=1)=>Ja(r,e,n,"internal",t),Lc=class{constructor(e,n){this.normalizedDispatchGroup=e;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Hr){let n=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(n>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*t*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${t}, ${o})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,n){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let t=e.usage==="input"?"read":"read_write",o=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${n}) var<storage, ${t}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(e,n,t=1){return this.uniforms.push({name:e,type:n,length:t}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:n,type:t,length:o}of this.uniforms)if(o&&o>4)t==="f16"?e.push(`@align(16) ${n}:array<mat2x4<${t}>, ${Math.ceil(o/8)}>`):e.push(`${n}:array<vec4<${t}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?t:`vec${o}<${t}>`;e.push(`${n}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[e(n.type),n.length??1])}},e0=(r,e)=>new Lc(r,e)});var iE,t0,aE,sE,uE,lE,dt,n0,r0,Qn=N(()=>{"use strict";pe();ge();Xe();ye();iE=(r,e)=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==r[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${r[0].dims.length}`)},t0=(r,e)=>e.length!==0?e:[...new Array(r).keys()].reverse(),aE=(r,e)=>k.sortBasedOnPerm(r,t0(r.length,e)),sE=(r,e,n,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<e;++i)o+=`a[${r[i]}]=i[${i}];`;return o+="return a;}"},uE=(r,e)=>{let n=[],t=[];for(let o=0;o<r.length;++o)r[o]!==1&&n.push(r[o]),r[e[o]]!==1&&t.push(e[o]);return{newShape:n,newPerm:t}},lE=(r,e)=>{let n=0;for(let t=0;t<r.length;++t)if(e[r[t]]!==1){if(r[t]<n)return!1;n=r[t]}return!0},dt=(r,e)=>{let n=r.dataType,t=r.dims.length,o=t0(t,e),i=aE(r.dims,o),a=r.dims,s=i,u=t<2||lE(o,r.dims),l;if(u)return l=_=>{let S=z("input",n,a,4),v=q("output",n,s,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(S,v)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=k.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:l};let{newShape:c,newPerm:p}=uE(r.dims,o),h=k.areEqual(p,[2,3,1]),g=k.areEqual(p,[3,1,2]);if(c.length===2||h||g){a=h?[c[0],c[1]*c[2]]:g?[c[0]*c[1],c[2]]:c,s=[a[1],a[0]];let _=16;return l=S=>{let v=z("a",n,a.length),x=q("output",n,s.length);return`
  ${S.registerUniform("output_size","u32").declareVariables(v,x)}
  var<workgroup> tile : array<array<${x.type.value}, ${_+1}>, ${_}>;
  ${S.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${v.getByIndices(`${v.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${x.setByIndices(`${x.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let S=k.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(s[1]/_),y:Math.ceil(s[0]/_)},programUniforms:[{type:12,data:S},...K(a,s)]}},getShaderSource:l}}return l=_=>{let S=z("a",n,a.length),v=q("output",n,s.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(S,v)}

  ${sE(o,t,S,v)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",S.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let _=k.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...K(a,s)]}},getShaderSource:l}},n0=(r,e)=>{iE(r.inputs,e.perm),r.compute(dt(r.inputs[0],e.perm))},r0=r=>ce({perm:r.perm})});var cE,dE,pE,fE,hE,mE,gE,bE,yE,_E,Wn,o0,i0,a0,s0,u0,l0,c0,d0,p0,f0,h0=N(()=>{"use strict";pe();ge();ye();Qa();Qn();cE={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},dE={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},pE={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},fE={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},hE=(r,e)=>{let n=[];for(let t=e-r;t<e;++t)n.push(t);return n},mE=(r,e)=>{let n=[],t=r.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&n.push(r[i]);let o=e.map(i=>r[i]);return[n,o]},gE=(r,e)=>{let n=r.length+e.length,t=[],o=0;for(let i=0;i<n;i++)e.indexOf(i)===-1?t.push(r[o++]):t.push(1);return t},bE=(r,e)=>{for(let n=0;n<r.length;++n)if(r[r.length-n-1]!==e-1-n)return!1;return!0},yE=(r,e)=>{let n=[];if(!bE(r,e)){for(let t=0;t<e;++t)r.indexOf(t)===-1&&n.push(t);r.forEach(t=>n.push(t))}return n},_E=(r,e,n,t,o,i,a)=>{let s=n[0].dims,u=k.size(i),l=k.size(a),c=z("_A",n[0].dataType,s),p=q("output",o,i),h=64;u===1&&(h=256);let g=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,m=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(c,p)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${pE[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${cE[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${dE[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${t==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${fE[t]})`}`)};
         }
        }`;return{name:r,shaderCache:{hint:`${e};${h}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Wn=(r,e,n,t)=>{let o=r.inputs.length===1?n:Mc(r.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=r.inputs[0].dims.map((g,m)=>m));let a=k.normalizeAxes(i,r.inputs[0].dims.length),s=a,u=r.inputs[0],l=yE(s,r.inputs[0].dims.length);l.length>0&&(u=r.compute(dt(r.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=hE(s.length,u.dims.length));let[c,p]=mE(u.dims,s),h=c;o.keepDims&&(h=gE(c,a)),r.compute(_E(e,o.cacheKey,[u],t,r.inputs[0].dataType,h,p),{inputs:[u]})},o0=(r,e)=>{Wn(r,"ReduceMeanShared",e,"mean")},i0=(r,e)=>{Wn(r,"ReduceL1Shared",e,"l1")},a0=(r,e)=>{Wn(r,"ReduceL2Shared",e,"l2")},s0=(r,e)=>{Wn(r,"ReduceLogSumExpShared",e,"logSumExp")},u0=(r,e)=>{Wn(r,"ReduceMaxShared",e,"max")},l0=(r,e)=>{Wn(r,"ReduceMinShared",e,"min")},c0=(r,e)=>{Wn(r,"ReduceProdShared",e,"prod")},d0=(r,e)=>{Wn(r,"ReduceSumShared",e,"sum")},p0=(r,e)=>{Wn(r,"ReduceSumSquareShared",e,"sumSquare")},f0=(r,e)=>{Wn(r,"ReduceLogSumShared",e,"logSum")}});var Hn,vE,es,Mc,qn,wE,xE,TE,IE,SE,$E,AE,OE,PE,EE,jn,m0,g0,b0,y0,_0,v0,w0,x0,T0,I0,Qa=N(()=>{"use strict";pe();ge();Xe();ye();h0();Hn=r=>{if(!r||r.length===0||r.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(r.length===2&&r[1].dims.length!==1)throw new Error("Invalid axes input dims.")},vE=r=>["","",`var value = ${r.getByIndices("input_indices")};`,""],es=(r,e,n,t,o,i,a=!1,s=!1)=>{let u=[],l=n[0].dims,c=l.length,p=k.normalizeAxes(o,c),h=!s&&p.length===0;l.forEach((S,v)=>{h||p.indexOf(v)>=0?a&&u.push(1):u.push(S)});let g=u.length,m=k.size(u);return{name:r,shaderCache:e,getShaderSource:S=>{let v=[],x=z("_A",n[0].dataType,c),$=q("output",i,g),O=t(x,$,p),P=O[2];for(let C=0,R=0;C<c;C++)h||p.indexOf(C)>=0?(a&&R++,P=`for(var j${C}: u32 = 0; j${C} < ${l[C]}; j${C}++) {
                  ${O[2].includes("last_index")?`let last_index = j${C};`:""}
                  ${x.indicesSet("input_indices",C,`j${C}`)}
                  ${P}
                }`):(v.push(`${x.indicesSet("input_indices",C,$.indicesGet("output_indices",R))};`),R++);return`

        ${S.registerUniform("output_size","u32").declareVariables(x,$)}

        ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${x.type.indices};
          let output_indices = ${$.offsetToIndices("global_idx")};

          ${v.join(`
`)}
          ${O[0]}       // init ops for reduce max/min
          ${O[1]}
          ${P}
          ${O[3]}
          ${O.length===4?$.setByOffset("global_idx","value"):O.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...K(l,u)]})}},Mc=(r,e)=>{let n=[];return r[1].dims[0]>0&&r[1].getBigInt64Array().forEach(t=>n.push(Number(t))),ce({axes:n,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},qn=(r,e,n,t)=>{let o=r.inputs,i=o.length===1?n:Mc(o,n);r.compute(es(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?vE:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},wE=(r,e)=>{Hn(r.inputs),qn(r,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},xE=(r,e)=>{Hn(r.inputs),qn(r,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},TE=(r,e)=>{Hn(r.inputs),qn(r,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},IE=(r,e)=>{Hn(r.inputs),qn(r,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},SE=(r,e)=>{Hn(r.inputs),qn(r,"ReduceMax",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(t.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},$E=(r,e)=>{Hn(r.inputs),qn(r,"ReduceMean",e,(t,o,i)=>{let a=1;for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=r.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},AE=(r,e)=>{Hn(r.inputs),qn(r,"ReduceMin",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},OE=(r,e)=>{Hn(r.inputs),qn(r,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},PE=(r,e)=>{Hn(r.inputs),qn(r,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},EE=(r,e)=>{Hn(r.inputs),qn(r,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},jn=(r,e,n)=>{if(e.length===0)return n;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=r[i]:o*=r[i];return o<32&&t>1024},m0=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?$E(r,e):o0(r,e)},g0=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?xE(r,e):i0(r,e)},b0=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?TE(r,e):a0(r,e)},y0=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?IE(r,e):s0(r,e)},_0=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?SE(r,e):u0(r,e)},v0=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?AE(r,e):l0(r,e)},w0=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?OE(r,e):c0(r,e)},x0=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?PE(r,e):d0(r,e)},T0=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?EE(r,e):p0(r,e)},I0=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?wE(r,e):f0(r,e)}});var S0,$0,A0,Bc,O0=N(()=>{"use strict";pe();Xe();Qa();S0=r=>{if(!r||r.length===0||r.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(r[0].dataType!==1)throw new Error("Invalid input type.")},$0=(r,e)=>{S0(r.inputs);let n=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(es("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},A0=(r,e)=>{S0(r.inputs);let n=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(es("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},Bc=r=>ce(r)});var CE,Vc,DE,kE,NE,go,LE,P0,ts=N(()=>{"use strict";pe();ge();Za();ye();CE=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],a=r[4],s=r[5];if(a&&s)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],l=n.dims[1],c=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=o.dims[0]/3,h=p,g=h;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let $ of e.qkvHiddenSizes)if($%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=e.qkvHiddenSizes[0],h=e.qkvHiddenSizes[1],g=e.qkvHiddenSizes[2]}let m=l;if(p!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==p+h+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(a){if(h!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(_=a.dims[3])}let S=m+_,v=-1,x=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==e.numHeads||s.dims[2]!==l||s.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:_,kvSequenceLength:m,totalSequenceLength:S,maxSequenceLength:v,inputHiddenSize:c,hiddenSize:p,vHiddenSize:g,headSize:Math.floor(p/e.numHeads),vHeadSize:Math.floor(g/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:x,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Vc=(r,e,n)=>e&&r?`
      let total_sequence_length_input = u32(${e.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${r?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,DE=(r,e,n,t,o,i,a,s)=>{let u=Ne(a?1:i),l=64,c=i/u;c<l&&(l=32);let p=Math.ceil(i/u/l),h=[{type:12,data:e},{type:12,data:n},{type:12,data:t},{type:12,data:o},{type:12,data:c},{type:12,data:p}],g=Ge(r.dataType,u),m=tt(1,u),_=["type"];a&&_.push("type"),s&&_.push("type");let S=v=>{let x=q("x",r.dataType,r.dims,u),$=[x],O=a?z("seq_lens",a.dataType,a.dims):void 0;O&&$.push(O);let P=s?z("total_sequence_length_input",s.dataType,s.dims):void 0;P&&$.push(P);let C=tt(r.dataType),R=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${v.registerUniforms(R).declareVariables(...$)}
  ${v.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Vc(O,P,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${x.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${x.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${x.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${g};${u}`,inputDependencies:_},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:e*n},programUniforms:h})}},kE=(r,e,n,t,o,i,a,s,u)=>{let l=a+i.kvSequenceLength,c=[i.batchSize,i.numHeads,i.sequenceLength,l],p=r>1&&t,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,g=p?[i.batchSize,h,l,i.headSize]:void 0,m=i.nReps?i.nReps:1,_=i.scale===0?1/Math.sqrt(i.headSize):i.scale,S=Ne(i.headSize),v=i.headSize/S,x=12,$={x:Math.ceil(l/x),y:Math.ceil(i.sequenceLength/x),z:i.batchSize*i.numHeads},O=[{type:12,data:i.sequenceLength},{type:12,data:v},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:_},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:m}],P=p&&t&&k.size(t.dims)>0,C=["type","type"];P&&C.push("type"),o&&C.push("type"),s&&C.push("type"),u&&C.push("type");let R=[{dims:c,dataType:e.dataType,gpuDataType:0}];p&&R.push({dims:g,dataType:e.dataType,gpuDataType:0});let T=W=>{let H=z("q",e.dataType,e.dims,S),M=z("key",n.dataType,n.dims,S),re=[H,M];if(P){let ue=z("past_key",t.dataType,t.dims,S);re.push(ue)}o&&re.push(z("attention_bias",o.dataType,o.dims));let B=s?z("seq_lens",s.dataType,s.dims):void 0;B&&re.push(B);let w=u?z("total_sequence_length_input",u.dataType,u.dims):void 0;w&&re.push(w);let V=q("output",e.dataType,c),Z=[V];p&&Z.push(q("present_key",e.dataType,g,S));let G=tt(1,S),Q=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;

  var<workgroup> tileQ: array<${H.type.storage}, ${x*x}>;
  var<workgroup> tileK: array<${H.type.storage}, ${x*x}>;
  ${W.registerUniforms(Q).declareVariables(...re,...Z)}
  ${W.mainStart([x,x,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Vc(B,w,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${P&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${G}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${P&&p?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${p?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${G}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${V.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${o!==void 0};${t!==void 0};${r}`,inputDependencies:C},getRunData:()=>({outputs:R,dispatchGroup:$,programUniforms:O}),getShaderSource:T}},NE=(r,e,n,t,o,i,a=void 0,s=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,c=o.vHiddenSize*l,p=r>1&&t,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,g=p?[o.batchSize,h,u,o.headSize]:void 0,m=[o.batchSize,o.sequenceLength,c],_=12,S={x:Math.ceil(o.vHeadSize/_),y:Math.ceil(o.sequenceLength/_),z:o.batchSize*o.numHeads},v=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:c},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],x=p&&t&&k.size(t.dims)>0,$=["type","type"];x&&$.push("type"),a&&$.push("type"),s&&$.push("type");let O=[{dims:m,dataType:e.dataType,gpuDataType:0}];p&&O.push({dims:g,dataType:e.dataType,gpuDataType:0});let P=C=>{let R=z("probs",e.dataType,e.dims),T=z("v",n.dataType,n.dims),W=[R,T];x&&W.push(z("past_value",t.dataType,t.dims));let H=a?z("seq_lens",a.dataType,a.dims):void 0;a&&W.push(H);let M=s?z("total_sequence_length_input",s.dataType,s.dims):void 0;s&&W.push(M);let B=[q("output",e.dataType,m)];p&&B.push(q("present_value",e.dataType,g));let w=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${R.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${R.type.value}, ${_*_}>;
  ${C.registerUniforms(w).declareVariables(...W,...B)}
  ${C.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Vc(H,M,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${x&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${R.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${x&&p?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${p?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${r}`,inputDependencies:$},getRunData:()=>({outputs:O,dispatchGroup:S,programUniforms:v}),getShaderSource:P}},go=(r,e,n,t,o,i,a,s,u,l,c=void 0,p=void 0)=>{let h=Math.min(r.outputCount,1+(a?1:0)+(s?1:0)),g=h>1?a:void 0,m=h>1?s:void 0,_=h>1?l.pastSequenceLength:0,S=_+l.kvSequenceLength,v=u&&k.size(u.dims)>0?u:void 0,x=[e,n];g&&k.size(g.dims)>0&&x.push(g),v&&x.push(v),c&&x.push(c),p&&x.push(p);let $=r.compute(kE(h,e,n,g,v,l,_,c,p),{inputs:x,outputs:h>1?[-1,1]:[-1]})[0];r.compute(DE($,l.batchSize,l.numHeads,_,l.sequenceLength,S,c,p),{inputs:c&&p?[$,c,p]:[$],outputs:[]});let O=[$,t];m&&k.size(m.dims)>0&&O.push(m),c&&O.push(c),p&&O.push(p),r.compute(NE(h,$,t,m,l,_,c,p),{inputs:O,outputs:h>1?[0,2]:[0]})},LE=(r,e)=>{let n=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,a=12,s={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[r.inputs[0],r.inputs[1],r.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],c=p=>{let h=q("output_q",u[0].dataType,n),g=q("output_k",u[0].dataType,n),m=q("output_v",u[0].dataType,n),_=z("input",u[0].dataType,u[0].dims),S=z("weight",u[1].dataType,u[1].dims),v=z("bias",u[2].dataType,u[2].dims),x=_.type.storage,$=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${x}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${x}, ${a*a}>;
  var<workgroup> tileWeightK: array<${x}, ${a*a}>;
  var<workgroup> tileWeightV: array<${x}, ${a*a}>;
  ${p.registerUniforms($).declareVariables(_,S,v,h,g,m)}
  ${p.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${x}(0);
    var valueK = ${x}(0);
    var valueV = ${x}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:l}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},P0=(r,e)=>{let n=CE(r.inputs,e),[t,o,i]=LE(r,n);return go(r,t,o,i,r.inputs[4],void 0,void 0,void 0,r.inputs[5],n)}});var RE,zE,ME,E0,C0=N(()=>{"use strict";ft();pe();ge();Xe();ye();RE=(r,e)=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(t,o,i)=>{let a=o.length;if(a!==t.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((s,u)=>{if(s!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(r[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?r[0].dims.slice(-1):r[0].dims.slice(-1).concat(r[0].dims.slice(1,r[0].dims.length-1)):r[0].dims.slice(1,e.spatial?2:void 0);n(r[1].dims,t,"Invalid input scale"),n(r[2].dims,t,"Invalid input B"),n(r[3].dims,t,"Invalid input mean"),n(r[4].dims,t,"Invalid input var")}else n(r[1].dims,[1],"Invalid input scale"),n(r[2].dims,[1],"Invalid input B"),n(r[3].dims,[1],"Invalid input mean"),n(r[4].dims,[1],"Invalid input var")},zE=(r,e)=>{let{epsilon:n,spatial:t,format:o}=e,i=r[0].dims,a=t?Ne(i[i.length-1]):1,s=o==="NHWC"&&i.length>1?a:1,u=k.size(i)/a,l=t,c=l?i.length:i,p=z("x",r[0].dataType,r[0].dims,a),h=z("scale",r[1].dataType,r[1].dims,s),g=z("bias",r[2].dataType,r[2].dims,s),m=z("inputMean",r[3].dataType,r[3].dims,s),_=z("inputVar",r[4].dataType,r[4].dims,s),S=q("y",r[0].dataType,c,a),v=()=>{let $="";if(t)$=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")$=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{$=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let O=1;O<h.rank;O++)$+=`cIndices[${O}] = outputIndices[${O}];`;$+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return $},x=$=>`
  const epsilon = ${n};
  ${$.registerUniform("outputSize","u32").declareVariables(p,h,g,m,_,S)}
  ${$.mainStart()}
  ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${a}`)};
    ${v()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${a}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:x,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...K(i)]:[{type:12,data:u}]})}},ME=r=>ce(r),E0=(r,e)=>{let{inputs:n,outputCount:t}=r,o=ME({...e,outputCount:t});if(me.webgpu.validateInputContent&&RE(n,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");r.compute(zE(n,o))}});var BE,VE,D0,k0=N(()=>{"use strict";ge();ye();BE=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(r[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},VE=r=>{let e=r[0].dims,n=r[0].dims[2],t=k.size(e)/4,o=r[0].dataType,i=z("input",o,e,4),a=z("bias",o,[n],4),s=z("residual",o,e,4),u=q("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:c=>`
  const channels = ${n}u / 4;
  ${c.declareVariables(i,a,s,u)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},D0=r=>{BE(r.inputs),r.compute(VE(r.inputs))}});var FE,Le,N0,L0,R0,z0,M0,B0,V0,F0,G0,GE,U0,W0,H0,q0,Qo,j0,ns,K0,X0,Z0,J0,Y0,Q0,ev,tv,nv,rv,ov,iv,av,sv,uv,lv,cv,dv,pv,Fc,Gc,fv,hv,mv,UE,WE,gv,rs=N(()=>{"use strict";pe();ge();Xe();ye();FE=(r,e,n,t,o,i,a)=>{let s=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=z("inputData",n,[s],4),c=q("outputData",t,[s],4),p=[{name:"vec_size",type:"u32"}];return a&&p.push(...a),`
      ${r.registerUniforms(p).declareVariables(l,c)}

  ${i??""}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},Le=(r,e,n,t,o,i=r.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(k.size(r.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>FE(l,k.size(r.dims),r.dataType,i,n,t,s),getRunData:l=>({outputs:[{dims:r.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(l[0].dims)/64/4)},programUniforms:u})}},N0=r=>{r.compute(Le(r.inputs[0],"Abs","abs"))},L0=r=>{r.compute(Le(r.inputs[0],"Acos","acos"))},R0=r=>{r.compute(Le(r.inputs[0],"Acosh","acosh"))},z0=r=>{r.compute(Le(r.inputs[0],"Asin","asin"))},M0=r=>{r.compute(Le(r.inputs[0],"Asinh","asinh"))},B0=r=>{r.compute(Le(r.inputs[0],"Atan","atan"))},V0=r=>{r.compute(Le(r.inputs[0],"Atanh","atanh"))},F0=r=>ce(r),G0=(r,e)=>{let n;switch(e.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}r.compute(Le(r.inputs[0],"Cast",n,void 0,e.cacheKey,e.to))},GE=r=>{let e,n,t=r.length>=2&&r[1].data!==0,o=r.length>=3&&r[2].data!==0;switch(r[0].dataType){case 1:e=t?r[1].getFloat32Array()[0]:-34028234663852886e22,n=o?r[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?r[1].getUint16Array()[0]:64511,n=o?r[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ce({min:e,max:n})},U0=(r,e)=>{let n=e||GE(r.inputs),t=tt(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:r.inputs[0].dataType,data:n.min},{type:r.inputs[0].dataType,data:n.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},W0=r=>{r.compute(Le(r.inputs[0],"Ceil","ceil"))},H0=r=>{r.compute(Le(r.inputs[0],"Cos","cos"))},q0=r=>{r.compute(Le(r.inputs[0],"Cosh","cosh"))},Qo=r=>ce(r),j0=(r,e)=>{let n=tt(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${n}(${e.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},ns=(r="f32")=>`
const r0: ${r} = 0.3275911;
const r1: ${r} = 0.254829592;
const r2: ${r} = -0.284496736;
const r3: ${r} = 1.421413741;
const r4: ${r} = -1.453152027;
const r5: ${r} = 1.061405429;

fn erf_vf32(v: vec4<${r}>) -> vec4<${r}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,K0=r=>{let e=tt(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"Erf",n=>`erf_vf32(${n})`,ns(e)))},X0=r=>{r.compute(Le(r.inputs[0],"Exp","exp"))},Z0=r=>{r.compute(Le(r.inputs[0],"Floor","floor"))},J0=r=>{let e=tt(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,ns(e)))},Y0=(r,e)=>{let n=tt(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${e.alpha});`,e.cacheKey))},Q0=r=>{r.compute(Le(r.inputs[0],"Not",e=>`!${e}`))},ev=r=>{r.compute(Le(r.inputs[0],"Neg",e=>`-${e}`))},tv=r=>{r.compute(Le(r.inputs[0],"Reciprocal",e=>`1.0/${e}`))},nv=r=>{let e=tt(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"Relu",n=>`select(vec4<${e}>(0.0), ${n}, ${n} > vec4<${e}>(0.0))`))},rv=r=>{r.compute(Le(r.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},ov=r=>ce(r),iv=(r,e)=>{let n=tt(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"HardSigmoid",t=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${e.alpha} * ${t} + vec4<${n}>(${e.beta})))`,void 0,e.cacheKey))},av=r=>{let e=tt(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"HardSwish",n=>`${n} * max(vec4<${e}>(0.0), min(vec4<${e}>(1.0), vec4<${e}>(${e}(1.0 / 6.0)) * ${n} + vec4<${e}>(0.5)))`))},sv=r=>{r.compute(Le(r.inputs[0],"Sin","sin"))},uv=r=>{r.compute(Le(r.inputs[0],"Sinh","sinh"))},lv=r=>{r.compute(Le(r.inputs[0],"Sqrt","sqrt"))},cv=r=>{r.compute(Le(r.inputs[0],"Tan","tan"))},dv=r=>`sign(${r}) * (1 - exp(-2 * abs(${r}))) / (1 + exp(-2 * abs(${r})))`,pv=r=>{r.compute(Le(r.inputs[0],"Tanh",dv))},Fc=(r="f32")=>`
const fast_gelu_a: ${r} = 0.5;
const fast_gelu_b: ${r} = 0.7978845608028654;
const fast_gelu_c: ${r} = 0.035677408136300125;

fn tanh_v(v: vec4<${r}>) -> vec4<${r}> {
  return ${dv("v")};
}
`,Gc=r=>`(fast_gelu_a + fast_gelu_a * tanh_v(${r} * (fast_gelu_c * ${r} * ${r} + fast_gelu_b))) * ${r}`,fv=r=>{let e=tt(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"FastGelu",Gc,Fc(e),void 0,r.inputs[0].dataType))},hv=(r,e)=>{let n=tt(r.inputs[0].dataType);return r.compute(Le(r.inputs[0],"ThresholdedRelu",t=>`select(vec4<${n}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${e.alpha});`,e.cacheKey)),0},mv=r=>{r.compute(Le(r.inputs[0],"Log","log"))},UE=(r,e)=>`
const alpha = vec4<${r}>(${e});
const one = ${r}(1.0);
const zero = ${r}(0.0);

fn quick_gelu_impl(x: vec4<${r}>) -> vec4<${r}> {
  let v = x *alpha;
  var x1 : vec4<${r}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,WE=r=>`quick_gelu_impl(${r})`,gv=(r,e)=>{let n=tt(r.inputs[0].dataType);r.compute(Le(r.inputs[0],"QuickGelu",WE,UE(n,e.alpha),e.cacheKey,r.inputs[0].dataType))}});var HE,qE,yv,_v=N(()=>{"use strict";ge();ye();rs();HE=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(r[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},qE=r=>{let e=r[0].dims.slice();e[2]=e[2]/2;let n=z("input",r[0].dataType,r[0].dims,4),t=z("bias",r[0].dataType,[r[0].dims[2]],4),o=q("output",r[0].dataType,e,4),i=k.size(e)/4,a=Ge(r[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${u.declareVariables(n,t,o)}

  ${ns(a)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},yv=r=>{HE(r.inputs),r.compute(qE(r.inputs))}});var jE,KE,Kn,vv,wv,xv,Tv,Iv,Sv,$v,Av,Ov,Pv,Ev=N(()=>{"use strict";pe();ge();ye();jE=(r,e,n,t,o,i,a,s,u,l,c,p)=>{let h,g;typeof s=="string"?h=g=(x,$)=>`${s}((${x}),(${$}))`:typeof s=="function"?h=g=s:(h=s.scalar,g=s.vector);let m=q("outputData",c,t.length,4),_=z("aData",u,e.length,4),S=z("bData",l,n.length,4),v;if(o)if(i){let x=k.size(e)===1,$=k.size(n)===1,O=e.length>0&&e[e.length-1]%4===0,P=n.length>0&&n[n.length-1]%4===0;x||$?v=m.setByOffset("global_idx",g(x?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),$?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):v=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",g(a||O?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||P?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=m.setByOffset("global_idx",g(_.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let x=($,O,P="")=>{let C=`aData[indexA${O}][componentA${O}]`,R=`bData[indexB${O}][componentB${O}]`;return`
            let outputIndices${O} = ${m.offsetToIndices(`global_idx * 4u + ${O}u`)};
            let offsetA${O} = ${_.broadcastedIndicesToOffset(`outputIndices${O}`,m)};
            let offsetB${O} = ${S.broadcastedIndicesToOffset(`outputIndices${O}`,m)};
            let indexA${O} = offsetA${O} / 4u;
            let indexB${O} = offsetB${O} / 4u;
            let componentA${O} = offsetA${O} % 4u;
            let componentB${O} = offsetB${O} % 4u;
            ${$}[${O}] = ${P}(${h(C,R)});
          `};c===9?v=`
            var data = vec4<u32>(0);
            ${x("data",0,"u32")}
            ${x("data",1,"u32")}
            ${x("data",2,"u32")}
            ${x("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${x("outputData[global_idx]",0)}
            ${x("outputData[global_idx]",1)}
            ${x("outputData[global_idx]",2)}
            ${x("outputData[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(_,S,m)}

        ${p??""}

        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},KE=(r,e,n,t,o,i,a=n.dataType)=>{let s=n.dims.map(Number),u=t.dims.map(Number),l=!k.areEqual(s,u),c=s,p=k.size(s),h=!1,g=!1,m=[l];if(l){let _=Un.calcShape(s,u,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");c=_.slice(),p=k.size(c);let S=k.size(s)===1,v=k.size(u)===1,x=s.length>0&&s[s.length-1]%4===0,$=u.length>0&&u[u.length-1]%4===0;m.push(S),m.push(v),m.push(x),m.push($);let O=1;for(let P=1;P<c.length;P++){let C=s[s.length-P],R=u[u.length-P];if(C===R)O*=C;else break}O%4===0?(g=!0,h=!0):(S||v||x||$)&&(h=!0)}else h=!0;return m.push(h),{name:r,shaderCache:{hint:e+m.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>jE(_,s,u,c,h,l,g,o,n.dataType,t.dataType,a,i),getRunData:()=>({outputs:[{dims:c,dataType:a}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(c)/4)},...K(s,u,c)]})}},Kn=(r,e,n,t,o,i)=>{r.compute(KE(e,o??"",r.inputs[0],r.inputs[1],n,t,i))},vv=r=>{Kn(r,"Add",(e,n)=>`${e}+${n}`)},wv=r=>{Kn(r,"Div",(e,n)=>`${e}/${n}`)},xv=r=>{Kn(r,"Equal",{scalar:(e,n)=>`u32(${e}==${n})`,vector:(e,n)=>`vec4<u32>(${e}==${n})`},void 0,void 0,9)},Tv=r=>{Kn(r,"Mul",(e,n)=>`${e}*${n}`)},Iv=r=>{let e=z("input",r.inputs[0].dataType,r.inputs[0].dims).type.value;Kn(r,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
    fn pow_custom(a : ${e}, b : ${e}) -> ${e} {
      if (b == ${e}(0.0)) {
        return ${e}(1.0);
      } else if (a < ${e}(0.0) && f32(b) != floor(f32(b))) {
        return ${e}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${e}(1.0), round(f32(abs(b) % ${e}(2.0))) != 1.0) * ${e}(${e==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${e}>, b : vec4<${e}>) -> vec4<${e}> {
      // TODO: implement vectorized pow
      return vec4<${e}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Sv=r=>{Kn(r,"Sub",(e,n)=>`${e}-${n}`)},$v=r=>{Kn(r,"Greater",{scalar:(e,n)=>`u32(${e}>${n})`,vector:(e,n)=>`vec4<u32>(${e}>${n})`},void 0,void 0,9)},Av=r=>{Kn(r,"Less",{scalar:(e,n)=>`u32(${e}<${n})`,vector:(e,n)=>`vec4<u32>(${e}<${n})`},void 0,void 0,9)},Ov=r=>{Kn(r,"GreaterOrEqual",{scalar:(e,n)=>`u32(${e}>=${n})`,vector:(e,n)=>`vec4<u32>(${e}>=${n})`},void 0,void 0,9)},Pv=r=>{Kn(r,"LessOrEqual",{scalar:(e,n)=>`u32(${e}<=${n})`,vector:(e,n)=>`vec4<u32>(${e}<=${n})`},void 0,void 0,9)}});var ZE,JE,Cv,Dv,kv=N(()=>{"use strict";pe();ge();Xe();ye();ZE=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");let n=0,t=r[n],o=t.dataType,i=t.dims.length;r.forEach((a,s)=>{if(s!==n){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},JE=(r,e,n,t,o=0)=>{let i=r.reduce((v,x)=>v+k.size(x.dims),0),a=new Array(r.length),s=new Array(r.length),u=new Array(r.length),l=0,c=o,p=[],h=[],g=[{type:12,data:i}];for(let v=0;v<r.length;++v)a[v]=l,s[v]=c,l+=k.size(r[v].dims),c+=r[v].dims[e],h.push(r[v].dims.length),u[v]=z(`input${v}`,t,h[v]),p.push("rank"),g.push({type:12,data:a[v]}),g.push({type:12,data:s[v]});for(let v=0;v<r.length;++v)g.push(...K(r[v].dims));g.push(...K(n));let m=q("output",t,n.length),_=u.map((v,x)=>{let O=`
        let inputOffset = ${`global_idx - uniforms.inputOffset${x}`};
        var outputIndices = ${v.offsetToIndices("inputOffset")};
        ${m.indicesGet("outputIndices",e)} += uniforms.outputAxisOffset${x};
        ${m.setByIndices("outputIndices",v.getByOffset("inputOffset"))}`;return r.length===1?O:x===0?`if (inputIndex == 0u) {${O}}`:x===r.length-1?`else {${O}}`:`else if (inputIndex == ${x}u) {${O}}`}).join(`
`),S=v=>`

  ${(()=>{v.registerUniform("outputSize","u32");for(let x=0;x<r.length;x++)v.registerUniform(`inputOffset${x}`,"u32"),v.registerUniform(`outputAxisOffset${x}`,"u32");return v.declareVariables(...u,m)})()}

  fn calculateInputIndex(global_idx: u32) -> u32 {
    ${u.slice(1).map((x,$)=>`if (global_idx < uniforms.inputOffset${$+1}) {
      return ${$}u;
    }`).join(`
`)}
    return ${r.length-1}u;
  }

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    let inputIndex = calculateInputIndex(global_idx);
    ${_}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g}),getShaderSource:S}},Cv=(r,e)=>{let n=r.inputs,t=n[0].dims,o=k.normalizeAxis(e.axis,t.length);ZE(n,o);let i=t.slice();i[o]=n.reduce((l,c)=>l+(c.dims.length>o?c.dims[o]:0),0);let a=n.filter(l=>k.size(l.dims)>0);if(a.length===0){r.output(0,i);return}let s=r.deviceLimits.maxStorageBuffersPerShaderStage-1,u=0;for(let l=0;l<a.length;l+=s){let c=a.slice(l,l+s);r.compute(JE(c,o,i,n[0].dataType,u),{inputs:c,outputs:[0]}),u+=c.reduce((p,h)=>p+h.dims[o],0)}},Dv=r=>ce({axis:r.axis})});var Jt,Yt,Qt,os,xr=N(()=>{"use strict";pe();ge();Jt=(r,e,n="f32")=>{switch(r.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${n}(uniforms.clip_min)), ${e}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${r.activation}`)}},Yt=(r,e)=>{r.activation==="Clip"?e.push({type:1,data:r.clipMax},{type:1,data:r.clipMin}):r.activation==="HardSigmoid"?e.push({type:1,data:r.alpha},{type:1,data:r.beta}):r.activation==="LeakyRelu"&&e.push({type:1,data:r.alpha})},Qt=(r,e)=>{r.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):r.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):r.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},os=r=>{let e=r?.activation||"";if(e==="HardSigmoid"){let[n,t]=r?.activation_params||[.2,.5];return{activation:e,alpha:n,beta:t}}else if(e==="Clip"){let[n,t]=r?.activation_params||[B_,V_];return{activation:e,clipMax:t,clipMin:n}}else if(e==="LeakyRelu"){let[n]=r?.activation_params||[.01];return{activation:e,alpha:n}}return{activation:e}}});var ut,Nv,is=N(()=>{"use strict";ut=(r,e)=>{switch(r){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${r}-component is not supported.`)}},Nv=r=>`
      ${r?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Lv,Rv=N(()=>{"use strict";Lv=r=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${r}.x), i32(${r}.y), i32(${r}.z), 1));
}
`});var ei,as,ss=N(()=>{"use strict";pe();ge();ye();xr();ei=(r,e,n,t,o)=>{let i=t-n;return`
      ${Array.from({length:n}).map((a,s)=>`
      if (${ne(e.shape,s,e.rank)} != 1) {
        ${e.indicesSet(r,s,ne(o,s+i,t))}
      } else {
        ${e.indicesSet(r,s,0)}
      }`).join("")}
`},as=(r,e,n,t,o=!1,i)=>{let a=r[0].dims,s=r[1].dims,u=a[a.length-2],l=s[s.length-1],c=a[a.length-1],p=Ne(l),h=Ne(c),g=Ne(u),m=k.size(n)/p/g,_=r.length>2,S=t?t.slice(0,-2):n.slice(0,-2),x=[k.size(S),u,l],$=[{type:12,data:m},{type:12,data:u},{type:12,data:l},{type:12,data:c}];Yt(e,$),$.push(...K(S,a,s)),_&&$.push(...K(r[2].dims)),$.push(...K(x));let O=P=>{let C=Ya("batch_dims",r[0].dataType,S.length),R=z("a",r[0].dataType,a.length,h),T=z("b",r[1].dataType,s.length,p),W=q("output",r[0].dataType,x.length,p),H=Ge(W.type.tensor),M=Jt(e,W.type.value,H),re=[R,T],B="";if(_){let Z=o?p:1;re.push(z("bias",r[2].dataType,r[2].dims.length,Z)),B=`${o?`value += bias[col / ${Z}];`:`value += ${W.type.value}(bias[row + i]);`}`}let w=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Qt(e,w);let V=()=>{let Z=`var a_data: ${R.type.value};`;for(let G=0;G<h;G++)Z+=`
              let b_data${G} = b[(b_offset + (k + ${G}) * uniforms.N + col) / ${p}];`;for(let G=0;G<g;G++){Z+=`a_data = a[(a_offset + (row + ${G}) * uniforms.K + k) / ${h}];`;for(let Q=0;Q<h;Q++)Z+=`
            values[${G}] = fma(${T.type.value}(a_data${h===1?"":`[${Q}]`}), b_data${Q}, values[${G}]);
`}return Z};return`
  ${P.registerUniforms(w).registerInternalVariables(C).declareVariables(...re,W)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${C.offsetToIndices("batch")};`}

    var a_indices: ${R.type.indices};
    ${ei("a_indices",R,R.rank-2,C.rank,"batch_indices")}
    ${R.indicesSet("a_indices",R.rank-2,0)}
    ${R.indicesSet("a_indices",R.rank-1,0)}
    let a_offset = ${R.indicesToOffset("a_indices")};

    var b_indices: ${T.type.indices};
    ${ei("b_indices",T,T.rank-2,C.rank,"batch_indices")}
    ${T.indicesSet("b_indices",T.rank-2,0)}
    ${T.indicesSet("b_indices",T.rank-1,0)}
    let b_offset = ${T.indicesToOffset("b_indices")};
    var values: array<${W.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${V()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${B}
      ${M}
      let cur_indices = ${W.type.indices}(batch, row + i, col);
      let offset = ${W.indicesToOffset("cur_indices")};
      ${W.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${p};${h};${g};${o}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:$}),getShaderSource:O}}});var YE,QE,Uc,zv,eC,Wc,tC,ti,us=N(()=>{"use strict";pe();ge();ye();xr();ss();is();YE=(r,e)=>r?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,QE=(r,e)=>r?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${e===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Uc=(r,e,n="f32",t,o=!1,i=32,a=!1,s=32)=>{let u=e[1]*r[1],l=e[0]*r[0],c=o?u:i,p=o?i:u,h=c/e[0],g=i/e[1];if(!((o&&h===4&&r[1]===4||!o&&(h===3||h===4))&&c%e[0]===0&&i%e[1]===0&&r[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${r[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${r[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${n}>, ${c/h}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${l/r[0]}>, ${i}>;

const rowPerThread = ${r[1]};
const colPerThread = ${r[0]};
const innerElementSize = ${h};
const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${a?`${Math.ceil(s/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${g};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${YE(o,t)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${t?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${QE(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},zv=(r,e)=>r?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,eC=r=>r?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Wc=(r,e,n="f32",t,o=!1,i=32,a=!1,s=32,u=!1)=>{let l=r[1]*e[1],c=r[0]*e[0],p=o?l:i,h=o?i:l;if(!(h%e[1]===0&&p%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let g=h/e[1],m=p/e[0],_=i/e[1],S=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${e[0]}) {
          ${zv(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${e[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${t?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${e[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${e[1]}];`:`mm_Asub[localRow + innerRow * ${e[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${e[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${e[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${g};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${zv(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${t?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${eC(o)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${p}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${c}>, ${i}>;
  const rowPerThread = ${r[1]};
  const colPerThread = ${r[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(s/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${S}
  }
`},tC=(r,e,n,t,o=!1)=>{let[i,a,s,u]=t,l=Ge(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${ut(r,l)} {
      var value = ${ut(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${ei("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${ut(r,l)} {
      var value = ${ut(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${ei("bIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ut(r,l)}) {
      let col = colIn * ${r};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${ut(r,l)}(bias[row])`};`:""}
        ${n}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ti=(r,e,n,t,o=!1,i)=>{let a=r[0].dims,s=r[1].dims,u=a.slice(0,-2),l=s.slice(0,-2),c=t?t.slice(0,-2):n.slice(0,-2),p=k.size(c),h=a[a.length-2],g=a[a.length-1],m=s[s.length-1],_=g%4===0&&m%4===0,S=h<=8?[4,1,1]:[4,4,1],v=[8,8,1],x=[Math.ceil(m/v[0]/S[0]),Math.ceil(h/v[1]/S[1]),Math.ceil(p/v[2]/S[2])],$=_?4:1,O=[...u,h,g/$],P=O.length,C=[...l,g,m/$],R=C.length,T=[p,h,m/$],W=[{type:6,data:h},{type:6,data:m},{type:6,data:g}];Yt(e,W),W.push(...K(c,O,C));let H=["rank","rank"],M=r.length>2;M&&(W.push(...K(r[2].dims)),H.push("rank")),W.push(...K(T));let re=B=>{let w=c.length,V=Ya("batchDims",r[0].dataType,w,1),Z=Ge(r[0].dataType),G=z("a",r[0].dataType,P,$),Q=z("b",r[1].dataType,R,$),ue=q("result",r[0].dataType,T.length,$),ae=[G,Q];if(M){let j=o?$:1;ae.push(z("bias",r[2].dataType,r[2].dims.length,j))}let _e=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Qt(e,_e);let fe=Ge(ue.type.tensor),se=Jt(e,ue.type.value,fe),U=tC($,M,se,[V,G,Q,ue],o);return`
  ${B.registerUniforms(_e).registerInternalVariables(V).declareVariables(...ae,ue)}
  ${U}
  ${_?Uc(S,v,Z,V):Wc(S,v,Z,V)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${e.activation};${_};${o}`,inputDependencies:H},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:W}),getShaderSource:re}}});var nC,Mv,Bv=N(()=>{"use strict";pe();Gn();ye();xr();is();Rv();us();nC=(r,e,n,t,o=!1,i,a=4,s=4,u=4,l="f32")=>{let c=H=>{switch(H){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${H} is not supported.`)}},p=H=>{switch(H){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${H} is not supported.`)}},h=r?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,g=r?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=r?"row":"col",v=r?"col":"row",x=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${ut(a,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${_}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(a)}
    }
    return resData;`,$=r?e&&t?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${x}
    }
    return ${ut(a,l)}(0.0);`:t&&n?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${x}
    }
    return ${ut(a,l)}(0.0);`,O=r?t&&n?p(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(s)}
    }
    return ${ut(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(s)}
    }
    return ${ut(s,l)}(0.0);`,P=ut(u,l),C=r?ut(a,l):ut(s,l),R=r?ut(s,l):ut(a,l),T=Jt(i,P,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${r?$:O}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${r?O:$}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${P}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${Nv(o)}
      ${T}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Mv=(r,e,n,t,o,i,a,s,u)=>{let l=e.format==="NHWC",c=l?r[0].dims[3]:r[0].dims[1],p=n[0],h=l?n[2]:n[3],g=l?n[1]:n[2],m=l?n[3]:n[1],_=l&&(c%4===0||c%3===0)&&m%4===0,S=l?m:h*g,v=l?h*g:m,x=[8,8,1],$=t<=8?[4,1,1]:[4,4,1],O=[Math.ceil(S/x[0]/$[0]),Math.ceil(v/x[1]/$[1]),Math.ceil(p/x[2]/$[2])];xe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${O}`);let P=_?l&&c%4!==0?3:4:1,C=x[1]*$[1],R=x[0]*$[0],T=Math.max(x[0]*P,x[1]),W=t%C===0,H=o%R===0,M=i%T===0,re=_?[P,4,4]:[1,1,1],B=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Yt(e,B),B.push(...K(r[0].dims,r[1].dims));let w=["rank","rank"];a&&(B.push(...K(r[2].dims)),w.push("rank")),B.push(...K(n));let V=Z=>{let G=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Qt(e,G);let Q=_?4:1,ue=Ge(r[0].dataType),ae=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${ue}>`:ue}) {
        result[flatIndex] = ${_?`vec4<${ue}>`:ue}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${ue}>`:ue}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,_e=z("x",r[0].dataType,r[0].dims.length,P===3?1:P),fe=z("w",r[1].dataType,r[1].dims.length,Q),se=[_e,fe],U=q("result",r[0].dataType,n.length,Q);if(a){let j=z("bias",r[2].dataType,r[2].dims.length,Q);se.push(j),ae+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${ue}>`:ue} {
          return bias[coords.${l?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${Lv("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Z.registerUniforms(G).declareVariables(...se,U)}
        ${ae}
        ${nC(l,W,H,M,a,e,re[0],re[1],re[2],ue)}
        ${_?Uc($,x,ue,void 0,!l,T):Wc($,x,ue,void 0,!l,T,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${P};${_};${W};${H};${M};${C};${R};${T}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:r[0].dataType}],dispatchGroup:{x:O[0],y:O[1],z:O[2]},programUniforms:B}),getShaderSource:V}}});var rC,Vv,ls,oC,Fv,iC,Gv,Uv,Wv=N(()=>{"use strict";pe();Gn();ge();ye();xr();is();rC=r=>{let e=1;for(let n=0;n<r.length;n++)e*=r[n];return e},Vv=r=>typeof r=="number"?[r,r,r]:r,ls=(r,e)=>e<=1?r:r+(r-1)*(e-1),oC=(r,e,n,t=1)=>{let o=ls(e,t);return Math.floor((r[0]*(n-1)-n+o)/2)},Fv=(r,e,n,t,o)=>{o==null&&(o=oC(r,e[0],t[0]));let i=[0,0,0,n];for(let a=0;a<3;a++)r[a]+2*o>=e[a]&&(i[a]=Math.trunc((r[a]-e[a]+2*o)/t[a]+1));return i},iC=(r,e,n,t,o,i,a,s,u,l)=>{let c,p,h,g;if(r==="VALID"&&(r=0),typeof r=="number"){c={top:r,bottom:r,left:r,right:r,front:r,back:r};let m=Fv([e,n,t,1],[s,u,l],1,[o,i,a],r);p=m[0],h=m[1],g=m[2]}else if(Array.isArray(r)){if(!r.every((_,S,v)=>_===v[0]))throw Error(`Unsupported padding parameter: ${r}`);c={top:r[0],bottom:r[1],left:r[2],right:r[3],front:r[4],back:r[5]};let m=Fv([e,n,t,1],[s,u,l],1,[o,i,a],r[0]);p=m[0],h=m[1],g=m[2]}else if(r==="SAME_UPPER"){p=Math.ceil(e/o),h=Math.ceil(n/i),g=Math.ceil(t/a);let m=(p-1)*o+s-e,_=(h-1)*i+u-n,S=(g-1)*a+l-t,v=Math.floor(m/2),x=m-v,$=Math.floor(_/2),O=_-$,P=Math.floor(S/2),C=S-P;c={top:$,bottom:O,left:P,right:C,front:v,back:x}}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:c,outDepth:p,outHeight:h,outWidth:g}},Gv=(r,e,n,t,o,i=!1,a="channelsLast")=>{let s,u,l,c,p;if(a==="channelsLast")[s,u,l,c,p]=r;else if(a==="channelsFirst")[s,p,u,l,c]=r;else throw new Error(`Unknown dataFormat ${a}`);let[h,,g,m,_]=e,[S,v,x]=Vv(n),[$,O,P]=Vv(t),C=ls(g,$),R=ls(m,O),T=ls(_,P),{padInfo:W,outDepth:H,outHeight:M,outWidth:re}=iC(o,u,l,c,S,v,x,C,R,T),B=i?h*p:h,w=[0,0,0,0,0];return a==="channelsFirst"?w=[s,B,H,M,re]:a==="channelsLast"&&(w=[s,H,M,re,B]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:l,inWidth:c,inChannels:p,outDepth:H,outHeight:M,outWidth:re,outChannels:B,padInfo:W,strideDepth:S,strideHeight:v,strideWidth:x,filterDepth:g,filterHeight:m,filterWidth:_,effectiveFilterDepth:C,effectiveFilterHeight:R,effectiveFilterWidth:T,dilationDepth:$,dilationHeight:O,dilationWidth:P,inShape:r,outShape:w,filterShape:e}},Uv=(r,e,n,t,o,i)=>{let a=i==="channelsLast",s=a?r[0].dims[3]:r[0].dims[1],u=!1,l=[64,1,1],c={x:n.map((x,$)=>$)},p=[Math.ceil(rC(c.x.map(x=>n[x]))/l[0]),1,1];xe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let h=u?a&&s%4!==0?3:4:1,g=k.size(n),m=[{type:12,data:g},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Yt(e,m),m.push(...K(r[0].dims,r[1].dims));let _=["rank","rank"],S=r.length===3;S&&(m.push(...K(r[2].dims)),_.push("rank")),m.push(...K(n));let v=x=>{let $=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Qt(e,$);let O=u?4:1,P=Ge(r[0].dataType),C=z("x",r[0].dataType,r[0].dims.length,h===3?1:h),R=z("W",r[1].dataType,r[1].dims.length,O),T=[C,R],W=q("result",r[0].dataType,n.length,O),H="";if(S){let B=z("bias",r[2].dataType,r[2].dims.length,O);T.push(B),H+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${P}>`:P} {
          return bias[${a?ne("coords",4,5):ne("coords",1,5)}${u?"/ 4":""}];
        }`}let M=ut(h,P),re=Jt(e,M,P);return`
            ${H}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${P} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${P} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${R.getByIndices("aIndices")};
            }
          ${x.registerUniforms($).declareVariables(...T,W)}
          ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${W.offsetToIndices("global_idx")};
              let batch = ${ne("coords",0,C.rank)};
              let d2 = ${a?ne("coords",C.rank-1,C.rank):ne("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${a?ne("coords",1,C.rank):ne("coords",2,C.rank)},
              ${a?ne("coords",2,C.rank):ne("coords",3,C.rank)},
              ${a?ne("coords",3,C.rank):ne("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?ne("uniforms.x_shape",1,C.rank):ne("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${a?ne("uniforms.x_shape",2,C.rank):ne("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${a?ne("uniforms.x_shape",3,C.rank):ne("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${a?ne("uniforms.x_shape",4,C.rank):ne("uniforms.x_shape",1,C.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = ${P}(0);
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${a?`let xValues = vec4<${P}>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<${P}>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<${P}>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<${P}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<${P}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<${P}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${a?`let xValues = vec3<${P}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<${P}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<${P}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${S?"value = value + getBiasByOutputCoords(coords)":""};
              ${re}
              result[global_idx] = ${P}(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${h};${S}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:m}),getShaderSource:v}}});var Hv,qv,jv=N(()=>{"use strict";pe();ge();ye();xr();Hv=(r,e,n,t)=>{let o=r.length>2,i=o?"value += b[output_channel];":"",a=r[0].dims,s=r[1].dims,u=e.format==="NHWC",l=u?n[3]:n[1],c=l/e.group,p=u&&c>=4?Ne(l):1,h=k.size(n)/p,g=[{type:12,data:h},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:c}];Yt(e,g),g.push(...K(a,[s[0],s[1],s[2],s[3]/p]));let m=o?["rank","rank","rank"]:["rank","rank"];g.push(...K([n[0],n[1],n[2],n[3]/p]));let _=S=>{let v=q("output",r[0].dataType,n.length,p),x=Ge(v.type.tensor),$=Jt(e,v.type.value,x),O=z("x",r[0].dataType,a.length),P=z("w",r[1].dataType,s.length,p),C=[O,P];o&&C.push(z("b",r[2].dataType,r[2].dims,p));let R=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Qt(e,R);let T=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${O.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${P.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${O.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${P.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(R).declareVariables(...C,v)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${T}
    ${i}
    ${$}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${p}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:_}},qv=(r,e,n,t)=>{let o=r.length>2,i=Ne(n[3]),a=Ne(n[2]),s=k.size(n)/i/a,u=[r[0].dims[0],r[0].dims[1],r[0].dims[2],r[0].dims[3]/i],l=[r[1].dims[0],r[1].dims[1],r[1].dims[2],r[1].dims[3]/i],c=[n[0],n[1],n[2],n[3]/i],p=[{type:12,data:s},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Yt(e,p),p.push(...K(u,l,c));let h=(a-1)*e.strides[1]+l[1],g=m=>{let _=q("output",r[0].dataType,c.length,i),S=Ge(_.type.tensor),v=Jt(e,_.type.value,S),x=z("x",r[0].dataType,u.length,i),$=z("w",r[1].dataType,l.length,i),O=[x,$];o&&O.push(z("b",r[2].dataType,r[2].dims,i));let P=o?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Qt(e,C),`
  ${m.registerUniforms(C).declareVariables(...O,_)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${x.type.value}, ${h}>;
    var values: array<${_.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${x.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${x.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${$.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${P}
      ${v}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${a};${h};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:g}}});var aC,Hc,sC,qc,jc,Kv,uC,lC,Kc,Xv=N(()=>{"use strict";ge();Bv();Wv();us();jv();xr();ss();Qn();aC=(r,e,n,t,o,i)=>{let a=r[0],s=r.slice(i?1:2,i?3:4),u=s.length,l=e[0],p=e.slice(2).map((m,_)=>m+(m-1)*(n[_]-1)),g=s.map((m,_)=>m+t[_]+t[_+u]).map((m,_)=>Math.floor((m-p[_]+o[_])/o[_]));return g.splice(0,0,a),g.splice(i?3:1,0,l),g},Hc=[2,3,1,0],sC=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length>5)throw new Error("greater than 5D is not supported");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape")},qc=(r,e)=>{let n=r.kernelShape.slice();n.length<e[1].dims.length-2&&n.push(...Array(e[1].dims.length-2-n.length).fill(0));for(let i=2;i<e[1].dims.length;++i)n[i-2]===0&&(n[i-2]=e[1].dims[i]);let t=r.pads.slice();Wr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.format==="NHWC",r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t}),o},jc=r=>{let e=os(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],o=r.dilations,i=r.group,a=r.kernel_shape,s=r.pads,u=r.strides,l=r.w_is_const();return{autoPad:t,format:n,dilations:o,group:i,kernelShape:a,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},Kv=(r,e,n,t)=>{let o=n.format==="NHWC",i=aC(e[0].dims,e[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let C=[e[0]];if(o){let T=r.kernelCustomData.wT??r.compute(dt(e[1],Hc),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=T),C.push(T)}else C.push(e[1]);e.length===3&&C.push(e[2]),!r.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===n.group&&e[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?r.compute(qv(C,n,i,t),{inputs:C}):r.compute(Hv(C,n,i,t),{inputs:C});return}let a=e.length===3,s=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],c=e[1].dims[2],p=e[1].dims[3],h=i[o?1:2],g=i[o?2:3],m=i[o?3:1],_=o&&c===s&&p===u&&n.pads[0]===0&&n.pads[1]===0;if(_||c===1&&p===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let C=i[0],R,T,W,H=[];if(o){let B=r.kernelCustomData.wT??r.compute(dt(e[1],Hc),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=B),_){let w=s*u*l;R=e[0].reshape([1,C,w]),T=B.reshape([1,w,m]),W=[1,C,m]}else R=e[0].reshape([C,s*u,l]),T=B.reshape([1,l,m]),W=[C,h*g,m];H.push(R),H.push(T)}else R=e[0].reshape([C,l,s*u]),T=e[1].reshape([1,m,l]),W=[C,m,h*g],H.push(T),H.push(R);a&&H.push(e[2]);let M=W[2],re=H[0].dims[H[0].dims.length-1];M<8&&re<8?r.compute(as(H,n,i,W,o,t),{inputs:H}):r.compute(ti(H,n,i,W,o,t),{inputs:H});return}let S=!0,v=r.kernelCustomData.wT??r.compute(dt(e[1],Hc),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=v);let x=[e[0],v];a&&x.push(e[2]);let $=o?h*g:m,O=o?m:h*g,P=c*p*l;r.compute(Mv(x,n,i,$,O,P,a,S,t),{inputs:x})},uC=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),s=[1].concat(e.kernelShape),u=qc({...e,pads:o,strides:i,dilations:a,kernelShape:s},t);Kv(r,t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},lC=(r,e,n)=>{let t=n.format==="NHWC"?"channelsLast":"channelsFirst",o=qc(n,e),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,a=Gv(e[0].dims,e[1].dims,n.strides,n.dilations,i,!1,t);r.compute(Uv(e,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],t))},Kc=(r,e)=>{if(sC(r.inputs,e),r.inputs[0].dims.length===3)uC(r,e);else if(r.inputs[0].dims.length===5)lC(r,r.inputs,e);else{let n=qc(e,r.inputs);Kv(r,r.inputs,n)}}});var Zv,Jv=N(()=>{"use strict";pe();Gn();ge();ye();Zv=(r,e,n)=>{let t=r.length>2,o=e.outputShape,i=e.format==="NHWC",a=e.group,s=r[1].dims,u=s[2]/a,l=s[3],c=i?Ne(u):1,p=i&&l===1&&u>=4,h=p?Math.floor(u/4)*4:Math.floor(u/c)*c,g=u-h,m=i?Ne(l):1,_=i?l===1?c:m:1,S=k.size(o)/m,v=[Math.ceil(S/64),1,1];xe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let x=["rank","rank"],$=[e.strides[0],e.strides[1]],O=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],P=[e.dilations[0],e.dilations[1]],C=[O[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),O[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],R=[C[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),C[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],T=[{type:12,data:S},{type:12,data:$},{type:12,data:O},{type:12,data:P},{type:12,data:C},{type:6,data:R},{type:12,data:h},{type:12,data:u},{type:12,data:l},...K(r[0].dims,r[1].dims)];t&&(T.push(...K(r[2].dims)),x.push("rank")),T.push(...K(o));let W=H=>{let M=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:$.length},{name:"filter_dims",type:"u32",length:O.length},{name:"dilations",type:"u32",length:O.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:R.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],re=Ge(r[0].dataType),B=i?1:2,w=i?2:3,V=i?3:1,Z=z("W",r[1].dataType,r[1].dims.length,_),G=z("Dy",r[0].dataType,r[0].dims.length,c),Q=[G,Z];t&&Q.push(z("bias",r[2].dataType,[o[V]].length,m));let ue=q("result",r[0].dataType,o.length,m),ae=()=>{let se="";if(p)c===4?se+=`
        let xValue = ${G.getByOffset("x_offset")};
        let wValue = ${Z.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?se+=`
          dotProd = dotProd + dot(vec4<${re}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}), vec4<${re}>(${Z.getByOffset("w_offset")}, ${Z.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(se+=`
          dotProd = dotProd + dot(vec4<${re}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}, ${G.getByOffset("x_offset + 2u")}, ${G.getByOffset("x_offset + 3u")}), vec4<${re}>(${Z.getByOffset("w_offset")}, ${Z.getByOffset("w_offset + 1u")}, ${Z.getByOffset("w_offset + 2u")}, ${Z.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(se+=`
                  let xValue = ${i?G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):G.get("batch","inputChannel","idyR","idyC")};
        `,c===1)se+=`
          let w_offset = ${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${Z.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let U=0;U<c;U++)se+=`
            let wValue${U} = ${Z.getByOffset(`${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${U}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${U}] * wValue${U};`;return se},_e=()=>{if(g===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let se="";if(c===1){se+="dotProd = dotProd";for(let U=0;U<g;U++)se+=`
            + ${G.getByOffset(`x_offset + ${U}`)} * ${Z.getByOffset(`w_offset + ${U}`)}`;se+=";"}else if(c===2){if(g!==2)throw new Error(`Invalid inputChannelsRemainder ${g}.`);se+=`
          let xValue = ${G.getByOffset("x_offset")};
          let wValue = ${Z.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return se},fe=`
            let outputIndices = ${ue.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${ue.indicesGet("outputIndices",0)};
            let d1 = ${ue.indicesGet("outputIndices",V)};
            let r = ${ue.indicesGet("outputIndices",B)};
            let c = ${ue.indicesGet("outputIndices",w)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${ue.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${re}(dyRCorner) + ${re}(wR)) / ${re}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${re}(uniforms.Dy_shape[${B}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${re}(dyCCorner) + ${re}(wC)) / ${re}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${re}(uniforms.Dy_shape[${w}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${Z.indicesToOffset(`${Z.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:c}) {
                  ${ae()}
                  inputChannel = inputChannel + ${p?4:c};
                }
                ${_e()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${m}]`:""};
            ${ue.setByOffset("global_idx","value")};
          `;return`
    ${H.registerUniforms(M).declareVariables(...Q,ue)}
      ${H.mainStart()}
      ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${fe}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${c}${_}${m}${p}${g}`,inputDependencies:x},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:n?n(o):o,dataType:r[0].dataType}],programUniforms:T}),getShaderSource:W}}});var cC,dC,pC,Yv,Qv,fC,ew,hC,tw,nw=N(()=>{"use strict";Jv();xr();Qn();cC=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,dC=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},pC=(r,e,n,t,o,i,a,s,u,l)=>{let c=r.length-2,p=l.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let h=r[0],g=e[s?3:1]*o;for(let m=0,_=r.length-c-(s?1:0);m<c;++m,++_){let S=r[_],v=p?S*a[m]:l[m],x=cC(S,a[m],i[m],e[_],n[m],v);dC(x,t,i,m,m+c),p&&l.push(a[m]*(S-1)+u[m]+(e[_]-1)*n[m]+1-i[m]-i[m+c])}l.splice(0,0,h),l.splice(s?3:1,0,g)},Yv=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0||r.kernelShape.reduce((p,h)=>p*h,1)===0){n.length=0;for(let p=2;p<e[1].dims.length;++p)n.push(e[1].dims[p])}let t=r.format==="NHWC";n.splice(0,0,e[1].dims[0]),n.splice(t?3:1,0,e[1].dims[1]);let o=r.pads.slice(),i=r.outputShape.slice(),a=r.outputPadding.slice(),s=e[0].dims,u=r.dilations.slice();if(u.reduce((p,h)=>p+h,0)===0){let p=e[0].dims.length-2;u=new Array(p).fill(1)}let l=r.strides.slice();if(l.reduce((p,h)=>p+h,0)===0){let p=e[0].dims.length-2;l=new Array(p).fill(1)}pC(s,n,u,r.autoPad,r.group,o,l,t,a,i);let c=Object.assign({},r);return Object.assign(c,{kernelShape:n,pads:o,outputPadding:a,outputShape:i,dilations:u,strides:l}),c},Qv=r=>{let e=os(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof r.autoPad>"u"?0:r.autoPad],o=r.dilations,i=r.group??1,a=r.kernelShape,s=r.pads,u=r.strides,l=r.wIsConst(),c=r.outputPadding,p=r.outputShape;return{autoPad:t,format:n,dilations:o,group:i,kernelShape:a,outputPadding:c,outputShape:p,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},fC=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4&&r[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.reduce((c,p)=>c+p,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((c,p)=>c+p,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((c,p)=>c+p,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((c,p)=>c+p,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape")},ew=(r,e,n,t)=>{let o=r.kernelCustomData.wT??r.compute(dt(e[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),r.compute(Zv(i,n,t),{inputs:i})},hC=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[r.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let s=e.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let u=e.outputPadding;u=[0].concat(u);let l=Yv({...e,pads:s,strides:a,dilations:i,kernelShape:o,outputPadding:u},t);ew(r,t,l,c=>n?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},tw=(r,e)=>{if(fC(r.inputs,e),r.inputs[0].dims.length===3)hC(r,e);else{let n=Yv(e,r.inputs);ew(r,r.inputs,n)}}});var mC,rw,ow,iw=N(()=>{"use strict";pe();ge();Xe();ye();mC=(r,e,n,t)=>{let o=k.size(e),i=e.length,a=z("input",r,i),s=q("output",r,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=k.normalizeAxis(u,i),c=p=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,g=ne("uniforms.input_shape","uniforms.axis",i),m=t.reverse?h+(t.exclusive?" + 1":""):"0",_=t.reverse?g:h+(t.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...K(e,e)]}),getShaderSource:c}},rw=(r,e)=>{let n=r.inputs[0].dims,t=r.inputs[0].dataType,o=r.inputs[1];r.compute(mC(t,n,o,e),{inputs:[0]})},ow=r=>{let e=r.exclusive===1,n=r.reverse===1;return ce({exclusive:e,reverse:n})}});var gC,bC,yC,aw,sw,uw=N(()=>{"use strict";pe();ge();Xe();ye();gC=r=>{if(!r||r.length!==1)throw new Error("DepthToSpace requires 1 input.");if(r[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},bC=(r,e,n,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<e;++i)o.push(n.indicesSet("a",r[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},yC=(r,e)=>{let n,t,o,i,a,s,u=e.format==="NHWC",l=e.blocksize,c=e.mode==="DCR";u?([n,t,o,i]=r.dims,a=c?[n,t,o,l,l,i/l**2]:[n,t,o,i/l**2,l,l],s=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,t,o,i]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],a=c?[n,l,l,i/l**2,t,o]:[n,i/l**2,l,l,t,o],s=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=r.reshape(a),h=p.dims.length,g=r.dataType,m=z("a",g,h),_=q("output",g,h),S=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(m,_)}

  ${bC(s,h,m,_)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:v=>{let x=u?[n,t*l,o*l,i/l**2]:[n,i/l**2,t*l,o*l],$=k.size(x),O=p.dims,P=k.sortBasedOnPerm(O,s);return{outputs:[{dims:x,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:[{type:12,data:$},...K(O,P)]}},getShaderSource:S}},aw=(r,e)=>{gC(r.inputs),r.compute(yC(r.inputs[0],e))},sw=r=>ce({blocksize:r.blocksize,mode:r.mode,format:r.format})});var Tr,cs,Xc,cw,jr,_C,vC,wC,dw,pw,fw,xC,TC,lw,IC,hw,mw,gw=N(()=>{"use strict";pe();ge();Xe();ye();Tr=256,cs=512,Xc=2*Math.PI,cw=r=>{let e=[],n=r;for(let t of[4,2,3,5])for(;n%t===0;)e.push(t),n/=t;return n===1?e:void 0},jr=r=>{let e=r.toPrecision(9);return/[.eE]/.test(e)?e:`${e}.0`},_C=(r,e,n,t,o)=>{let i=n/r,a=cs-t,s=l=>`smem[${a}u + base + ${l*e}u]`,u=`  for (var t = local_idx; t < ${i}u; t += ${Tr}u) {
`;u+=`    let twiddleIndex = t % ${e}u;
    let angleUnit = f32(twiddleIndex);
`,u+=`    var leg: array<vec2<f32>, 5>;
`;for(let l=0;l<r;l++){let c=`${t}u + t + ${l*i}u`;if(l===0)u+=`    leg[0] = smem[${c}];
`;else{let p=o*Xc*l/(r*e);u+=`    { let a = ${jr(p)} * angleUnit; leg[${l}] = cmul(smem[${c}], vec2<f32>(cos(a), sin(a))); }
`}}if(u+=`    let base = (t / ${e}u) * ${e*r}u + twiddleIndex;
`,r===2)u+=`    ${s(0)} = leg[0] + leg[1];
    ${s(1)} = leg[0] - leg[1];
`;else if(r===4){let l=o<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";u+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,u+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,u+=`    let oddRot = ${l};
`,u+=`    ${s(0)} = evenSum + oddSum;
    ${s(1)} = evenDiff + oddRot;
`,u+=`    ${s(2)} = evenSum - oddSum;
    ${s(3)} = evenDiff - oddRot;
`}else for(let l=0;l<r;l++){let c=["leg[0]"];for(let p=1;p<r;p++){let h=o*Xc*(p*l)/r,g=jr(Math.cos(h)),m=jr(Math.sin(h));c.push(`vec2<f32>(leg[${p}].x*${g} - leg[${p}].y*${m}, leg[${p}].x*${m} + leg[${p}].y*${g})`)}u+=`    ${s(l)} = ${c.join(" + ")};
`}return`${u}  }
  workgroupBarrier();
`},vC=(r,e,n)=>{let t="",o=1,i=0;for(let a of r)t+=_C(a,o,e,i,n),o*=a,i=cs-i;return{code:t,resultOffset:i}},wC=(r,e,n,t,o)=>{let i=r.dims,a=i.length,s=i[a-1],u=i[e],l=n&&t?(u-1)*2:u;o!==void 0&&(l=o);let c=n&&t?1:2,p=t&&!n?Math.floor(l/2)+1:l,h=i.slice();h[e]=p,h[a-1]=c;let g=1;for(let _=e+1;_<a-1;_++)g*=i[_];let m=k.size(i)/s/u;return{dataType:r.dataType,outputDims:h,length:l,signalLength:u,inner:g,batch:m,inputComponents:s,outputComponents:c,outputLength:p,inverse:n,onesided:t}},dw=(r,e)=>[e,r.length,r.inputComponents,r.outputComponents,r.inverse,r.onesided].join(";"),pw=r=>[{type:12,data:r.batch},{type:12,data:r.signalLength},{type:12,data:r.inner},{type:12,data:r.outputLength}],fw=(r,e,n)=>r.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(e,n),xC=r=>{let{dataType:e,length:n,inputComponents:t,outputComponents:o,inverse:i,onesided:a}=r,s=tt(e),u=i?1:-1,l=i?1/n:1,c=cw(n),p=h=>{let g=z("x",e,[1]),m=q("y",e,[1]),_=P=>{let C=`inBase + (${P}) * uniforms.inner * ${t}u`,R=`f32(${g.getByOffset(C)})`,T=t===2?`f32(${g.getByOffset(`${C} + 1u`)})`:"0.0";return`vec2<f32>(${R}, ${T})`},S;if(i&&a){let P=Math.floor(n/2)+1,C=n%2===0?`select(provided, provided - 1u, provided == ${P}u)`:"provided";S=`
    let provided = min(uniforms.signalLength, ${P}u);
    for (var i = local_idx; i < ${n}u; i += ${Tr}u) {
      if (i < provided) { smem[i] = ${_("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${C}; k += ${Tr}u) {
      let h = smem[k];
      smem[${n}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else S=`
    let loadCount = min(uniforms.signalLength, ${n}u);
    for (var i = local_idx; i < ${n}u; i += ${Tr}u) {
      if (i < loadCount) { smem[i] = ${_("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:v,resultOffset:x}=vC(c,n,u),$=l===1?`smem[${x}u + i]`:`smem[${x}u + i] * ${jr(l)}`,O=o===2?m.setByOffset("off + 1u",`${s}(v.y)`):"";return`
  ${fw(h,g,m)}
  var<workgroup> smem: array<vec2<f32>, ${2*cs}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${h.mainStart(Tr)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${t}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${o}u;
    ${S}
${v}    for (var i = local_idx; i < uniforms.outputLength; i += ${Tr}u) {
      let v = ${$};
      let off = outBase + i * uniforms.inner * ${o}u;
      ${m.setByOffset("off",`${s}(v.x)`)}
      ${O}
    }
  }`};return{name:"DFT",shaderCache:{hint:dw(r,"fft"),inputDependencies:["type"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:r.outputDims,dataType:e}],programUniforms:pw(r),dispatchGroup:{x:r.batch}})}},TC=r=>{let{dataType:e,length:n,inputComponents:t,outputComponents:o,inverse:i,onesided:a}=r,s=tt(e),u=i?1:-1,l=i?1/n:1,c=p=>{let h=z("x",e,[1]),g=q("y",e,[1]),m=$=>{let O=`inBase + (${$}) * uniforms.inner * ${t}u`,P=`f32(${h.getByOffset(O)})`,C=t===2?`f32(${h.getByOffset(`${O} + 1u`)})`:"0.0";return`vec2<f32>(${P}, ${C})`},_=i&&a?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(n/2)+1}u);
    if (k < provided) { return ${m("k")}; }
    let m = ${n}u - k;
    if (m < provided) {
      let h = ${m("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${m("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,S=`
      let angle = ${jr(u*Xc)} * f32(knMod) / ${jr(n)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${n}u) { knMod -= ${n}u; }`,v=o===2?g.setByOffset("off + 1u",`${s}(v.y)`):"",x=l===1?"acc":`acc * ${jr(l)}`;return`
  ${fw(p,h,g)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${_}
  ${p.mainStart(Tr)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${t}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${o}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${Tr}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${n}u; n++) {${S}
      }
      let v = ${x};
      let off = outBase + k * uniforms.inner * ${o}u;
      ${g.setByOffset("off",`${s}(v.x)`)}
      ${v}
    }
  }`};return{name:"DFT",shaderCache:{hint:dw(r,"direct"),inputDependencies:["type"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:r.outputDims,dataType:e}],programUniforms:pw(r),dispatchGroup:{x:r.batch}})}},lw=r=>{if(!r||r.dataType===0)return;if(k.size(r.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(r.dataType===6)return r.getInt32Array()[0];let e=Number(r.getBigInt64Array()[0]);if(!Number.isSafeInteger(e))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return e},IC=r=>{if(!r||r.length<1)throw new Error("DFT requires at least 1 input.");let e=r[0].dims;if(e.length<2)throw new Error("DFT input must have at least 2 dimensions.");let n=e[e.length-1];if(n!==1&&n!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},hw=(r,e)=>{IC(r.inputs);let n=r.inputs[0],t=n.dims.length,o=e.inverse!==0,i=e.onesided!==0,a=lw(r.inputs[1]);if(a!==void 0&&a<=0)throw new Error("dft_length must be greater than zero.");let s=k.normalizeAxis(lw(r.inputs[2])??e.axis,t);if(s===t-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(o&&i&&n.dims[t-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let u=wC(n,s,o,i,a);if(u.length<=0)throw new Error(`Invalid DFT length: ${u.length}`);let c=u.length<=cs&&cw(u.length)!==void 0?xC(u):TC(u);r.compute(c,{inputs:[0]})},mw=r=>ce({axis:r.axis??1,inverse:r.inverse??0,onesided:r.onesided??0})});var Zc,ds,bw,SC,$C,Jc,Yc,yw,AC,_w,vw,ww=N(()=>{"use strict";pe();ge();Xe();ye();Zc="[a-zA-Z]|\\.\\.\\.",ds="("+Zc+")+",bw="^"+ds+"$",SC="("+ds+",)*"+ds,$C="^"+SC+"$",Jc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,n){let t=this.symbolToIndices.get(e);t===void 0?t=[n]:t.push(n),this.symbolToIndices.set(e,t)}},Yc=class{constructor(e,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=n.includes("->")?n.split("->",2):[n,""];if(!t.match(RegExp($C)))throw new Error("Invalid LHS term");if(t.split(",").forEach((s,u)=>{let l=e[u].dims.slice();if(!s.match(RegExp(bw)))throw new Error("Invalid LHS term");let c=this.processTerm(s,!0,l,u);this.lhs.push(c)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([s,u])=>u.count===1||s==="...").map(([s])=>s).join("");else if(!o.match(RegExp(ds)))throw new Error("Invalid RHS");o.match(RegExp(Zc,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(s);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,n,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:n,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,n,t,o=-1){let i=t.length,a=!1,s=[],u=0;if(!e.match(RegExp(bw))&&!n&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Zc,"g")),c=new Jc(o);return l?.forEach((p,h)=>{if(p==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let g=i-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(s=t.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let m=0;m<s.length;m++){let _=String.fromCharCode(48+m);c.addSymbol(_,h+m),this.addSymbol(_,t[u++],o)}}else c.addSymbol(p,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(p,t[u++],o)}),c}},yw=r=>r+"_max",AC=(r,e,n,t)=>{let i=r.map(c=>c.length).map((c,p)=>z(`input${p}`,e,c)),a=k.size(t),s=q("output",e,t.length),u=[...n.symbolToInfo.keys()].filter(c=>!n.rhs.symbolToIndices.has(c)),l=c=>{let p=[],h="var prod = 1.0;",g="var sum = 0.0;",m="sum += prod;",_=[],S=[],v=[],x=[],$=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((P,C)=>{if(n.rhs.symbolToIndices.has(C)){let R=n.rhs.symbolToIndices.get(C)?.[0];R!==void 0&&n.lhs.forEach((T,W)=>{if(P.inputIndices.includes(W)){let H=T.symbolToIndices.get(C);if(H===void 0)throw new Error("Invalid symbol error");H.forEach(M=>{p.push(`${i[W].indicesSet(`input${W}Indices`,M,s.indicesGet("outputIndices",R))}`)})}})}else n.lhs.forEach((R,T)=>{if(P.inputIndices.includes(T)){let W=R.symbolToIndices.get(C);if(W===void 0)throw new Error("Invalid symbol error");W.forEach(H=>{_.push(`${i[T].indicesSet(`input${T}Indices`,H,`${C}`)}`)}),x.push(`prod *= ${i[T].getByIndices(`input${T}Indices`)};`)}}),S.push(`for(var ${C}: u32 = 0; ${C} < uniforms.${yw(C)}; ${C}++) {`),v.push("}")});let O=$?[...p,`let sum = ${i.map((P,C)=>P.getByIndices(`input${C}Indices`)).join(" * ")};`]:[...p,g,...S,..._,h,...x,m,...v];return`
            ${c.registerUniforms(u.map(P=>({name:`${yw(P)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((P,C)=>`var input${C}Indices: ${i[C].type.indices};`).join(`
`)}
            ${O.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let c=u.filter(h=>n.symbolToInfo.has(h)).map(h=>({type:12,data:n.symbolToInfo.get(h)?.dimValue||0}));c.push({type:12,data:a});let p=r.map((h,g)=>[...K(h)]).reduce((h,g)=>h.concat(g),c);return p.push(...K(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}},getShaderSource:l}},_w=(r,e)=>{let n=new Yc(r.inputs,e.equation),t=n.outputDims,o=r.inputs.map((i,a)=>i.dims);r.compute(AC(o,r.inputs[0].dataType,n,t))},vw=r=>{let e=r.equation.replace(/\s+/g,"");return ce({equation:e})}});var OC,xw,PC,EC,Tw,Iw=N(()=>{"use strict";pe();ge();ye();OC=r=>{if(!r||r.length!==2)throw new Error("Expand requires 2 input.");let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=n.length<e.length?0:n.length-e.length,o=e.length<n.length?0:e.length-n.length;for(;t<n.length&&o<e.length;++t,++o)if(n[t]!==e[o]&&n[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},xw=(r,e)=>{let n=r.length-e.length,t=[];for(let o=0;o<n;++o)t.push(r[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?r[o+n]:e[o]);return t},PC=(r,e)=>r.length>e.length?xw(r,e):xw(e,r),EC=r=>{let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=PC(e,n),o=r[0].dataType,i=o===9||k.size(e)===1,a=o===9||e.length>0&&e[e.length-1]%4===0?4:1,s=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(k.size(t)/s),l=p=>{let h=z("input",o,e.length,a),g=q("output",o,t.length,s),m;if(o===9){let _=(S,v,x="")=>`
          let outputIndices${v} = ${g.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${h.broadcastedIndicesToOffset(`outputIndices${v}`,g)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${S}[${v}] = ${x}(${h.getByOffset(`index${v}`)}[component${v}]);
        `;m=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else m=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${h.getByOffset(`inputOffset / ${a}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(h,g)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${m}`},c=[{type:12,data:u},...K(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:t,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c})}},Tw=r=>{OC(r.inputs),r.compute(EC(r.inputs),{inputs:[0]})}});var CC,Sw,$w=N(()=>{"use strict";pe();ge();ye();rs();CC=r=>{let e=r[0].dataType,n=k.size(r[0].dims),t=k.size(r[1].dims),o=t%4===0,i=a=>{let s=z("x",e,[1],4),u=z("bias",e,[1],4),l=q("y",e,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${u.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,h=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(c).declareVariables(s,u,l)}

    ${Fc(tt(e))}

    ${a.mainStart(Hr)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",Gc("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(n/Hr/4)}})}},Sw=r=>{r.inputs.length<2||k.size(r.inputs[1].dims)===0?fv(r):r.compute(CC(r.inputs))}});var DC,kC,Aw,Ow,Pw=N(()=>{"use strict";pe();ge();Xe();ye();DC=r=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.")},kC=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=k.normalizeAxis(e.axis,o),a=n.slice(0);a.splice(i,1,...t);let s=n[i],u=r[0].dataType===9?4:1,l=Math.ceil(k.size(a)/u),c=[{type:12,data:l},{type:6,data:s},{type:12,data:i},...K(r[0].dims,r[1].dims,a)],p=h=>{let g=z("data",r[0].dataType,r[0].dims.length,u),m=z("inputIndices",r[1].dataType,r[1].dims.length),_=q("output",r[0].dataType,a.length,u),S=x=>{let $=t.length,O=`var indicesIndices${x}  = ${m.type.indices}(0);`;for(let P=0;P<$;P++)O+=`${$>1?`indicesIndices${x}[${P}]`:`indicesIndices${x}`} = ${a.length>1?`outputIndices${x}[uniforms.axis + ${P}]`:`outputIndices${x}`};`;O+=`
          var idx${x} = ${m.getByIndices(`indicesIndices${x}`)};
          if (idx${x} < 0) {
            idx${x} = idx${x} + uniforms.axisDimLimit;
          }
          var dataIndices${x} : ${g.type.indices};
        `;for(let P=0,C=0;P<o;P++)P===i?(O+=`${o>1?`dataIndices${x}[${P}]`:`dataIndices${x}`} = u32(idx${x});`,C+=$):(O+=`${o>1?`dataIndices${x}[${P}]`:`dataIndices${x}`} = ${a.length>1?`outputIndices${x}[${C}]`:`outputIndices${x}`};`,C++);return O},v;if(r[0].dataType===9){let x=($,O,P="")=>`
          let outputIndices${O} = ${_.offsetToIndices(`outputOffset + ${O}u`)};
          ${S(O)};
          let offset${O} = ${g.indicesToOffset(`dataIndices${O}`)};
          let index${O} = offset${O} / 4u;
          let component${O} = offset${O} % 4u;
          ${$}[${O}] = ${P}(${g.getByOffset(`index${O}`)}[component${O}]);
        `;v=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${x("value",0,"u32")}
        ${x("value",1,"u32")}
        ${x("value",2,"u32")}
        ${x("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${g.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,m,_)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:p}},Aw=r=>ce({axis:r.axis}),Ow=(r,e)=>{let n=r.inputs;DC(n),r.compute(kC(r.inputs,e))}});var NC,Ew,Cw,Dw=N(()=>{"use strict";pe();ge();ye();NC=(r,e,n,t,o,i,a,s,u)=>{let l=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:12,data:u}],c=[i];l.push(...K(e.dims,c));let p=h=>{let g=z("indices_data",e.dataType,e.dims.length),m=q("input_slice_offsets_data",12,1,1),_=[g,m],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(S).declareVariables(..._)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${o.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${n.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return r.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:r.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:p},{inputs:[e],outputs:[-1]})[0]},Ew=(r,e)=>{let n=r.inputs,t=n[0].dims,o=n[0].dataType,i=n[1].dims,a=i[i.length-1],s=k.sizeToDimension(i,i.length-1),u=k.sizeFromDimension(t,e.batchDims+a),l=k.sizeToDimension(t,e.batchDims),c=k.sizeFromDimension(t,e.batchDims),p=s/l,h=new Array(a),g=u;for(let O=0;O<a;++O)h[a-1-O]=g,g*=t[e.batchDims+a-1-O];let m=NC(r,n[1],h,e.batchDims,t,s,p,c,a),_=e.batchDims+a;if(_>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=i.slice(0,-1).concat(t.slice(_)),v=k.size(S),x=[{type:12,data:v},{type:12,data:u},...K(n[0].dims,m.dims,S)],$=O=>{let P=z("data",n[0].dataType,n[0].dims.length),C=z("slice_offsets",12,m.dims.length),R=q("output",n[0].dataType,S.length);return`
          ${O.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(P,C,R)}
            ${O.mainStart()}
            ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};r.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:o}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:x}),getShaderSource:$},{inputs:[n[0],m]})},Cw=r=>({batchDims:r.batch_dims,cacheKey:""})});var LC,RC,kw,Nw,Lw=N(()=>{"use strict";pe();ge();Xe();ye();LC=(r,e)=>{if(r.length<3||r.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=k.normalizeAxis(e.quantizeAxis,r[0].dims.length),t=e.blockSize,o=r[0],i=r[2],a=r.length===4?r[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((s,u)=>u===n?Math.ceil(s/t)===i.dims[u]:s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((s,u)=>s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},RC=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=k.normalizeAxis(e.gatherAxis,o),a=k.normalizeAxis(e.quantizeAxis,o),s=n.slice(0);s.splice(i,1,...t);let u=k.size(s),l=r[2].dataType,p=r[0].dataType===22,h=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:e.blockSize},...K(...r.map((m,_)=>m.dims),s)],g=m=>{let _=z("data",r[0].dataType,r[0].dims.length),S=z("inputIndices",r[1].dataType,r[1].dims.length),v=z("scales",r[2].dataType,r[2].dims.length),x=r.length>3?z("zeroPoint",r[3].dataType,r[3].dims.length):void 0,$=q("output",l,s.length),O=[_,S,v];x&&O.push(x);let P=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${m.registerUniforms(P).declareVariables(...O,$)}
        ${m.mainStart()}
        let output_indices = ${$.offsetToIndices("global_idx")};
        var indices_indices = ${S.type.indices}(0);
        ${t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${$.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${S.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${$.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${$.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${S.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${$.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${v.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${v.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${v.getByIndices("scale_indices")};
        ${x?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${x.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${x.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${tt(l)}(quantized_data - zero_point) * scale;
        ${$.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${r.filter((m,_)=>_!==1).map(m=>m.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(m,_)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:g}},kw=(r,e)=>{let n=r.inputs;LC(n,e),r.compute(RC(r.inputs,e))},Nw=r=>ce({blockSize:r.blockSize,gatherAxis:r.gatherAxis,quantizeAxis:r.quantizeAxis})});var zC,MC,Rw,zw,Mw=N(()=>{"use strict";pe();ge();Xe();ye();zC=r=>{if(!r||r.length!==2)throw new Error("GatherElements requires 2 inputs.");if(r[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(r[0].dims.length!==r[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},MC=(r,e)=>{let n=r[0].dims,t=r[0].dataType,o=n.length,i=r[1].dims,a=r[1].dataType,s=k.normalizeAxis(e.axis,o),u=n[s],l=i.slice(0),c=k.size(l),p=z("input",t,o),h=z("indicesInput",a,i.length),g=q("output",t,l.length),m=[{type:12,data:c},{type:6,data:u},{type:12,data:s}];return m.push(...K(n,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:v=>`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,h,g)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},Rw=r=>ce({axis:r.axis}),zw=(r,e)=>{let n=r.inputs;zC(n),r.compute(MC(r.inputs,e))}});var BC,VC,Bw,Vw,Fw=N(()=>{"use strict";pe();ge();ye();BC=r=>{if(!r)throw new Error("Input is missing");if(r.length<2||r.length>3)throw new Error("Invaid input number.");if(r.length===3&&r[2].dims.length>2)throw new Error("Invalid input shape of C");if(r[0].dataType!==r[1].dataType||r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("Input types are mismatched")},VC=(r,e)=>{let n=r[0].dims.slice(),t=r[1].dims.slice(),[o,i,a]=Wa.getShapeOfGemmResult(n,e.transA,t,e.transB,r.length===3?r[2].dims:void 0),s=[o,i];if(!s)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),c=Math.ceil(o/u),p=!0,h=k.size(s),g=[{type:12,data:p?l:h},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],m=["type","type"];r.length===3&&(g.push(...K(r[2].dims)),m.push("rank")),g.push(...K(s));let _=v=>{let x="";e.transA&&e.transB?x="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?x="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?x="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(x="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let $=e.alpha===1?"":"value *= uniforms.alpha;",O=z("a",r[0].dataType,r[0].dims),P=z("b",r[1].dataType,r[1].dims),C=O.type.value,R=null,T=[O,P];r.length===3&&(R=z("c",r[2].dataType,r[2].dims.length),T.push(R));let W=q("output",r[0].dataType,s.length);T.push(W);let H=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(H).declareVariables(...T)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${x}
    }

    ${$}
    ${R!=null?`let cOffset = ${R.broadcastedIndicesToOffset("vec2(m, n)",W)}; value += ${C}(uniforms.beta) * ${R.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=v=>{let x=z("a",r[0].dataType,r[0].dims),$=z("b",r[1].dataType,r[1].dims),O=null,P=[x,$];r.length===3&&(O=z("c",r[2].dataType,r[2].dims.length),P.push(O));let C=q("output",r[0].dataType,s.length);P.push(C);let R=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],T="",W="";e.transA&&e.transB?(W=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${$.type.value}(0);
      }
      `,T="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(W=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${$.type.value}(0);
      }
      `,T="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(W=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${$.type.value}(0);
      }
      `,T="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(W=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${$.type.value}(0);
      }
      `,T="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let H=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(R).declareVariables(...P)}
  var<workgroup> tile_a: array<array<${x.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${$.type.storage}, ${u}>, ${u}>;
  ${v.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${W}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${T}
      }
      workgroupBarrier();
    }

    ${H}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${O!=null?`let cOffset = ${O.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${O.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:l*c},programUniforms:g}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:_}},Bw=r=>{let e=r.transA,n=r.transB,t=r.alpha,o=r.beta;return{transA:e,transB:n,alpha:t,beta:o,cacheKey:`${r.transA};${r.transB};${r.alpha===1}`}},Vw=(r,e)=>{BC(r.inputs),r.compute(VC(r.inputs,e))}});var er,Ir,bo,yo,FC,GC,UC,WC,HC,qC,jC,KC,Gw,Uw,Ww=N(()=>{"use strict";pe();ge();Xe();ye();[er,Ir,bo,yo]=[0,1,2,3],FC=r=>{if(r[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(r[0].dims.length!==r[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(r[0].dims.length-2!==r[1].dims[r[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${r[0].dims.length-2}`);if(r[0].dims[0]!==r[1].dims[0])throw new Error("grid batch size must match input batch size")},GC=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,UC=r=>`
  fn gs_bicubic_interpolate(p: mat4x4<${r}>, x: f32, y: f32) -> ${r} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${r}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,WC=r=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${r.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,HC=r=>`
  ${r.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,qC=(r,e,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${er}] = batch;
     indices[${Ir}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${bo}] = u32(r);
            indices[${yo}] = u32(c);
          } else {
            return ${e}(0);
          }
        `;case"border":return`
          indices[${bo}] = u32(clamp(r, 0, H - 1));
          indices[${yo}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${bo}] = gs_reflect(r, border[1], border[3]);
          indices[${yo}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${r.getByIndices("indices")};
  }
`,jC=(r,e,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${er}], indices[${Ir}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${er}], indices[${Ir}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${er}], indices[${Ir}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${er}], indices[${Ir}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${er}], indices[${Ir}], border);

          let dx2 = ${e}(f32(x2) - x);
          let dx1 = ${e}(x - f32(x1));
          let dy2 = ${e}(f32(y2) - y);
          let dy1 = ${e}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${e}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${er}], indices[${Ir}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${r.setByOffset("global_idx","result")}`,KC=(r,e)=>{let n=z("x",r[0].dataType,r[0].dims.length),t=[r[1].dims[0],r[1].dims[1],r[1].dims[2]],o=z("grid",r[1].dataType,t.length,2),i=[r[0].dims[0],r[0].dims[1],r[1].dims[1],r[1].dims[2]];e.format==="NHWC"&&(i=[r[0].dims[0],r[1].dims[1],r[1].dims[2],r[0].dims[3]],[er,Ir,bo,yo]=[0,3,1,2]);let a=q("output",r[0].dataType,i.length),s=n.type.value,u=k.size(i),l=[{type:12,data:u},...K(r[0].dims,t,i)],c=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(n,o,a)}
  ${GC}
  ${UC(s)}
  ${WC(e)}
  ${HC(e)}
  ${qC(n,s,e)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${bo}]);
      let W_in = i32(uniforms.x_shape[${yo}]);

      ${e.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${er}], indices[${bo}], indices[${yo}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${jC(a,s,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let h=k.size(i);return{outputs:[{dims:i,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:l}},getShaderSource:c}},Gw=(r,e)=>{FC(r.inputs),r.compute(KC(r.inputs,e))},Uw=r=>ce({alignCorners:r.align_corners,mode:r.mode,paddingMode:r.padding_mode,format:r.format})});var $t,JC,qw,Hw,YC,ni,jw,Qc=N(()=>{"use strict";pe();ge();Xe();Za();ts();ye();Qn();$t=(r,e)=>r.length>e&&r[e].dims.length>0?r[e]:void 0,JC=(r,e)=>{let n=r[0],t=$t(r,1),o=$t(r,2),i=$t(r,3),a=$t(r,4),s=$t(r,5),u=$t(r,6),l=$t(r,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=n.dims[0],p=n.dims[1],h=n.dims.length===3?n.dims[2]:e.numHeads*n.dims[4],g=p,m=0,_=0,S=Math.floor(h/e.numHeads);if(u&&l&&k.size(u.dims)&&k.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==e.numHeads||u.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==c||l.dims[1]!==e.numHeads||l.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=u.dims[2],_=u.dims[2]}else if(u&&k.size(u.dims)||l&&k.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(t&&k.size(t.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,g=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,g=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,g=t.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==e.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let x=m+g,$=0;if(a&&k.size(a.dims)>0){$=8;let R=a.dims;throw R.length===1?R[0]===c?$=1:R[0]===3*c+2&&($=3):R.length===2&&R[0]===c&&R[1]===x&&($=5),$===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let O=!1,P=h;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(g!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(g!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],O=!0}}let C=!1;if(a&&k.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(s&&k.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==c||s.dims[1]!==e.numHeads||s.dims[2]!==p||s.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:p,pastSequenceLength:m,kvSequenceLength:g,totalSequenceLength:x,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:h,vHiddenSize:P,headSize:S,vHeadSize:Math.floor(P/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:$,scale:e.scale,broadcastResPosBias:C,passPastInKv:O,qkvFormat:v}},qw=r=>ce({...r}),Hw=ce({perm:[0,2,1,3]}),YC=(r,e,n,t,o,i,a)=>{let s=[t,o,i],u=k.size(s),l=[{type:12,data:u},{type:12,data:a},{type:12,data:i}],c=p=>{let h=q("qkv_with_bias",e.dataType,s),g=z("qkv",e.dataType,s),m=z("bias",n.dataType,s),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(_).declareVariables(g,m,h)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return r.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:c},{inputs:[e,n],outputs:[-1]})[0]},ni=(r,e,n,t,o,i,a,s)=>{let u=i;if(a&&k.size(a.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=YC(r,i,a,e,t,n*o,s),u=u.reshape([e,t,n,o]),n===1||t===1?u:r.compute(dt(u,Hw.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,n,o])),n===1||t===1?u:r.compute(dt(u,Hw.perm),{inputs:[u],outputs:[-1]})[0]},jw=(r,e)=>{let n=JC(r.inputs,e),t=r.inputs[0],o=$t(r.inputs,1),i=$t(r.inputs,2),a=$t(r.inputs,3),s=$t(r.inputs,4),u=$t(r.inputs,5),l=$t(r.inputs,6),c=$t(r.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let p=o&&i&&o.dims.length===4&&i.dims.length===4,h=ni(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t,a,0);if(p)return go(r,h,o,i,s,void 0,l,c,u,n);if(!o||!i)throw new Error("key and value must be provided");let g=ni(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,a,n.hiddenSize),m=ni(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,a,2*n.hiddenSize);go(r,h,g,m,s,void 0,l,c,u,n)}});var QC,eD,tD,nD,ed,Kw,Xw,td=N(()=>{"use strict";pe();ge();Xe();ye();QC=r=>{if(!r||r.length<1)throw new Error("too few inputs")},eD=(r,e)=>{let n=[],t=e.numOutputs;return r[1].dims[0]>0&&(r[1].getBigInt64Array().forEach(o=>n.push(Number(o))),t=n.length),ce({numOutputs:t,axis:e.axis,splitSizes:n})},tD=r=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${ne("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`,nD=r=>{let e=r.length,n=[];for(let t=0;t<e;++t){let o=r[t].setByIndices("indices","input[global_idx]");e===1?n.push(o):t===0?n.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${r[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},ed=(r,e)=>{let n=r[0].dims,t=k.size(n),o=r[0].dataType,i=k.normalizeAxis(e.axis,n.length),a=new Array(e.numOutputs),s=z("input",o,n.length),u=new Array(e.numOutputs),l=[],c=[],p=0,h=[{type:12,data:t}];for(let m=0;m<e.numOutputs;m++){p+=e.splitSizes[m],u[m]=p;let _=n.slice();_[i]=e.splitSizes[m],c.push(_),a[m]=q(`output${m}`,o,_.length),l.push({dims:c[m],dataType:r[0].dataType})}h.push({type:12,data:u},...K(n,...c));let g=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${tD(u.length)}
  ${nD(a)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ne("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:h})}},Kw=(r,e)=>{QC(r.inputs);let n=r.inputs.length===1?e:eD(r.inputs,e);r.compute(ed(r.inputs,n),{inputs:[0]})},Xw=r=>{let e=r.axis,n=r.splitSizes,t=r.numOutputs<0?n.length:r.numOutputs;if(t!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return ce({axis:e,numOutputs:t,splitSizes:n})}});var rD,ps,Zw,nd=N(()=>{"use strict";pe();ge();Xe();ye();rD=(r,e)=>{let[n,t,o,i]=r,{numHeads:a,rotaryEmbeddingDim:s}=e;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!k.areEqual(t.dims,[])&&!k.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],l=n.dims[n.dims.length-2],c=o.dims[0],p=k.sizeFromDimension(n.dims,1)/l,h=s===0?o.dims[1]*2:p/a;if(s>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(l>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(h/2!==o.dims[1]&&s/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`)},ps=(r,e)=>{let{interleaved:n,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,a=r[0].dims[0],s=k.sizeFromDimension(r[0].dims,1),u=r[0].dims[r[0].dims.length-2],l=s/u,c=r[2].dims[1],p=o===0?c*2:l/t,h=new Array(a,u,l/p,p-c),g=k.computeStrides(h),m=[{type:1,data:i},{type:12,data:h},{type:12,data:g},...r[0].dims.length===3?new Array({type:12,data:[s,l,p,1]}):[],...r[0].dims.length===4?new Array({type:12,data:[s,p,u*p,1]}):[],...K(r[0].dims,r[1].dims,r[2].dims,r[3].dims,r[0].dims)],_=S=>{let v=z("input",r[0].dataType,r[0].dims.length),x=z("position_ids",r[1].dataType,r[1].dims.length),$=z("cos_cache",r[2].dataType,r[2].dims.length),O=z("sin_cache",r[3].dataType,r[3].dims.length),P=q("output",r[0].dataType,r[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${S.declareVariables(v,x,$,O,P)}

        ${S.mainStart(Hr)}
          let half_rotary_emb_dim = uniforms.${$.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${x.broadcastedIndicesToOffset("bsnh.xy",q("",x.type.tensor,2))};
            let position_id =
                u32(${x.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${v.getByOffset("i")} * ${$.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${O.get("position_id","bsnh[3]")};
            ${P.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${O.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${$.get("position_id","bsnh[3]")};
            ${P.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${P.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ce({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(h)/Hr)},programUniforms:m})}},Zw=(r,e)=>{rD(r.inputs,e),r.compute(ps(r.inputs,e))}});var oD,iD,Jw,aD,Yw,Qw=N(()=>{"use strict";Xe();pe();ts();Qc();td();Qn();nd();ye();oD=(r,e)=>{if(e.doRotary&&r.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=r[0],t=r[1],o=r[2],i=r[3],a=r[4];if(e.doRotary!==0&&r.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,u=n.dims[0],l=n.dims[1],c=n.dims.length===3?s?n.dims[2]/3:n.dims[2]:e.numHeads*n.dims[4],p=l,h=0,g=!t||t.dims.length===0,m=Math.floor(g?c/(e.numHeads+2*e.kvNumHeads):c/e.numHeads);g&&(c=m*e.numHeads);let _=i&&i.dims.length!==0,S=a&&a.dims.length!==0;if(_&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&S){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2]}else if(_||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x=1;if(t&&t.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(n.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');p=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=t.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==e.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}let $=0,O=!1,P=e.kvNumHeads?m*e.kvNumHeads:c;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(p!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(p!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],O=!0}}let C=r.length>4?r[5]:void 0;if(C){if(C.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let H=C.dims.reduce((M,re)=>M*re,1);if(H!==u)throw new Error(`seqlens_k must have batch_size (${u}) elements, got ${H}.`);for(let M=0;M<C.dims.length;M++)if(C.dims[M]!==1&&C.dims[M]!==u)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${u}), got dims[${M}] = ${C.dims[M]}.`)}return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:P,headSize:m,vHeadSize:Math.floor(P/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:$,scale:e.scale,broadcastResPosBias:!1,passPastInKv:O,qkvFormat:x}},iD=ce({perm:[0,2,1,3]}),Jw=(r,e,n)=>{let t=e,o=n.kvNumHeads;return e.dims.length===3&&n.kvSequenceLength!==0&&(t=e.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),t=r.compute(dt(t,iD.perm),{inputs:[t],outputs:[-1]})[0]),t},aD=(r,e,n,t)=>{let o=7,i=["type","type"],a=[r*e],s=r*e,u=[{type:12,data:s},{type:12,data:e},{type:12,data:r}],l=c=>{let p=z("seq_lens",n.dataType,n.dims),h=z("total_seq_lens",t.dataType,t.dims),g=q("pos_ids",o,a),m=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(m).declareVariables(p,h,g)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${p.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${g.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${r};${e}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u}),getShaderSource:l}},Yw=(r,e)=>{if(r.inputs.length>14&&r.inputs[14]||r.inputs.length>15&&r.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let n=oD(r.inputs,e);if(r.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(r.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=r.inputs[0],o=r.inputs[1]&&r.inputs[1].dims.length>0?r.inputs[1]:void 0,i=r.inputs[2]&&r.inputs[2].dims.length>0?r.inputs[2]:void 0,a=r.inputs[3]&&r.inputs[3].dims.length!==0?r.inputs[3]:void 0,s=r.inputs[4]&&r.inputs[4].dims.length!==0?r.inputs[4]:void 0,u=r.inputs.length>4?r.inputs[5]:void 0,l=r.inputs.length>5?r.inputs[6]:void 0,c=n.kvNumHeads?n.kvNumHeads:n.numHeads,p=ce({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,c*n.headSize,c*n.headSize]}),[h,g,m]=!o&&!i?r.compute(ed([t],p),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],_,S;if(e.doRotary){let O=r.compute(aD(n.batchSize,n.sequenceLength,u,l),{inputs:[u,l],outputs:[-1]})[0],P=r.inputs[7],C=r.inputs[8],R=ce({interleaved:e.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:e.scale}),T=[h,O,P,C],W=[-1];_=r.compute(ps(T,R),{inputs:T,outputs:W})[0],T.splice(0,1,g);let H=ce({interleaved:e.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:e.scale});S=r.compute(ps(T,H),{inputs:T,outputs:W})[0]}let v=ni(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,e.doRotary?_:h,void 0,0),x=Jw(r,e.doRotary?S:g,n),$=Jw(r,m,n);go(r,v,x,$,void 0,void 0,a,s,void 0,n,u,l)}});var ex,sD,uD,tx,nx=N(()=>{"use strict";pe();ge();Qn();ye();ex=(r,e,n,t,o,i,a,s)=>{let u=Ne(i),l=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,p=o*a,h=64;p===1&&(h=256);let g=[o,a,i/u],m=[o,a,2],_=["rank","type","type"],S=[];S.push(...K(g,m));let v=x=>{let $=z("x",e.dataType,3,u),O=z("scale",n.dataType,n.dims),P=z("bias",t.dataType,t.dims),C=q("output",1,3,2),R=[$,O,P,C];return`
  var<workgroup> workgroup_shared : array<${c}, ${h}>;
  const workgroup_size = ${h}u;
  ${x.declareVariables(...R)}
  ${x.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${$.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Zt("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Zt("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return r.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${h}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:p},programUniforms:S}),getShaderSource:v},{inputs:[e,n,t],outputs:[-1]})[0]},sD=(r,e,n)=>{let t=e[0].dims,o=t,i=2,a=t[0],s=t[1],u=k.sizeFromDimension(t,i),l=Ne(u),c=k.size(o)/l,p=ex(r,e[0],e[1],e[2],a,u,s,n.epsilon),h=[a,s,u/l],g=[a,s],m=["type","none"],_=S=>{let v=z("x",e[0].dataType,h.length,l),x=z("scale_shift",1,g.length,2),$=q("output",e[0].dataType,h.length,l),O=[v,x,$];return`
  ${S.registerUniform("output_size","u32").declareVariables(...O)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${$.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${x.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${$.type.value}(scale_shift.x) + ${$.type.value}(scale_shift.y);
      ${$.setByOffset("global_idx","value")};
  }`};r.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...K(h,g,h)]}),getShaderSource:_},{inputs:[e[0],p]})},uD=(r,e,n)=>{let t=e[0].dims,o=t,i=t[0],a=t[t.length-1],s=k.sizeFromDimension(t,1)/a,u=Ne(a),l=k.size(o)/u,c=[{type:12,data:s},{type:12,data:Math.floor(a/u)}],p=["type","type"],h=!1,g=[0,t.length-1];for(let v=0;v<t.length-2;v++)h=h||t[v+1]!==1,g.push(v+1);h=h&&t[t.length-1]!==1;let m=h?r.compute(dt(r.inputs[0],g),{inputs:[r.inputs[0]],outputs:[-1]})[0]:r.inputs[0].reshape(Array.from({length:t.length},(v,x)=>t[g[x]])),_=ex(r,m,e[1],e[2],i,s,a,n.epsilon),S=v=>{let x=Ge(e[0].dataType),$=u===1?"vec2f":`mat${u}x2f`,O=R=>{let T=R===0?"x":"y",W=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${x}(${W}(scale.${T}))`;case 2:return`vec2<${x}>(${W}(scale[0].${T}, scale[1].${T}))`;case 4:return`vec4<${x}>(${W}(scale[0].${T}, scale[1].${T}, scale[2].${T}, scale[3].${T}))`;default:throw new Error(`Not supported compoents ${u}`)}},P=z("input",e[0].dataType,e[0].dims,u),C=q("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${P.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${$}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${O(0)}, ${O(1)});
  }`};r.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:S},{inputs:[e[0],_]})},tx=(r,e)=>{e.format==="NHWC"?uD(r,r.inputs,e):sD(r,r.inputs,e)}});var lD,cD,rx,ox=N(()=>{"use strict";pe();ge();ye();lD=r=>{if(!r||r.length<2)throw new Error("layerNorm requires at least 2 inputs.")},cD=(r,e,n)=>{let t=e.simplified,o=r[0].dims,i=r[1],a=!t&&r[2],s=o,u=k.normalizeAxis(e.axis,o.length),l=k.sizeToDimension(o,u),c=k.sizeFromDimension(o,u),p=k.size(i.dims),h=a?k.size(a.dims):0;if(p!==c||a&&h!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${h}`);let g=[];for(let P=0;P<o.length;++P)P<u?g.push(o[P]):g.push(1);let m=Ne(c),_=["type","type"],S=[{type:12,data:l},{type:1,data:c},{type:12,data:Math.floor(c/m)},{type:1,data:e.epsilon}];a&&_.push("type");let v=n>1,x=n>2,$=P=>{let C=Ge(r[0].dataType),R=[z("x",r[0].dataType,r[0].dims,m),z("scale",i.dataType,i.dims,m)];a&&R.push(z("bias",a.dataType,a.dims,m)),R.push(q("output",r[0].dataType,s,m)),v&&R.push(q("mean_data_output",1,g)),x&&R.push(q("inv_std_output",1,g));let T=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${P.registerUniforms(T).declareVariables(...R)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${zc("f32",m)};
    var mean_square_vector = ${zc("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${qr(C,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Zt("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Zt("mean_square_vector",m)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${qr(C,m,"x[j + offset]")};
      let f32scale = ${qr(C,m,"scale[j]")};
      output[j + offset] = ${R[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${qr(C,m,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${x?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},O=[{dims:s,dataType:r[0].dataType}];return v&&O.push({dims:g,dataType:1}),x&&O.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${n};${t}`,inputDependencies:_},getRunData:()=>({outputs:O,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:S}),getShaderSource:$}},rx=(r,e)=>{lD(r.inputs),r.compute(cD(r.inputs,e,r.outputCount))}});var dD,ix,ax=N(()=>{"use strict";ge();ss();us();dD=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.")},ix=r=>{dD(r.inputs);let e=Un.calcShape(r.inputs[0].dims,r.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let n=e[e.length-1],t=r.inputs[0].dims[r.inputs[0].dims.length-1];if(n<8&&t<8)r.compute(as(r.inputs,{activation:""},e));else{let o=e[e.length-2],i=k.size(r.inputs[0].dims.slice(0,-2)),a=k.size(r.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let s=r.inputs[0].reshape([1,i,t]),u=r.inputs[1].reshape([1,t,n]),l=[1,i,n],c=[s,u];r.compute(ti(c,{activation:""},e,l),{inputs:c})}else r.compute(ti(r.inputs,{activation:""},e))}}});var pD,fD,hD,sx,ux,lx=N(()=>{"use strict";pe();ge();Xe();ye();pD=(r,e)=>{if(r.length<3||r.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=r[0],t=n.dims.length;if(n.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=r[1];if(!k.areEqual(a.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=r[2].dims;if(k.size(u)!==e.n*o)throw new Error("scales input size error.");if(r.length===4){let c=r[3].dims,p=e.n*(e.bits===8?o:Math.floor((o*e.bits+7)/8));if(k.size(c)!==p)throw new Error("zeroPoints input size error.")}},fD=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,a=e.n,s=n.slice(0,t-2),u=k.size(s),c=r[1].dims[2]/4,p=r[0].dataType,h=Ne(e.k),g=Ne(c),m=Ne(a),_=s.concat([o,a]),S=o>1&&a/m%2===0?2:1,v=k.size(_)/m/S,x=64,$=[],O=[u,o,i/h],P=k.convertShape(r[1].dims).slice();P.splice(-1,1,c/g),$.push(...K(O)),$.push(...K(P)),$.push(...K(r[2].dims)),r.length===4&&$.push(...K(k.convertShape(r[3].dims)));let C=[u,o,a/m];$.push(...K(C));let R=T=>{let W=O.length,H=z("a",r[0].dataType,W,h),M=z("b",12,P.length,g),re=z("scales",r[2].dataType,r[2].dims.length),B=[H,M,re],w=r.length===4?z("zero_points",12,r[3].dims.length):void 0;w&&B.push(w);let V=C.length,Z=q("output",r[0].dataType,V,m),G=Ge(r[0].dataType),Q=(()=>{switch(h){case 1:return`array<${G}, 8>`;case 2:return`mat4x2<${G}>`;case 4:return`mat2x4<${G}>`;default:throw new Error(`${h}-component is not supported.`)}})(),ue=Math.floor(32/e.bits),ae=Math.floor(ue/8),_e=()=>{let U="";for(let j=0;j<ae;j++){let he=j*e.bits*4,lt=he+e.bits;U+=`
          // reuse a data (pass ${j})
            var input_offset${j>0?j:""} = ${j===0?H.indicesToOffset(`${H.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${j>0?j:""}: ${Q};
            for (var j${j>0?j:""}: u32 = 0; j${j>0?j:""} < ${8/h}; j${j>0?j:""}++) {
              a_data${j>0?j:""}[j${j>0?j:""}] = ${H.getByOffset(`input_offset${j>0?j:""}`)};
              input_offset${j>0?j:""}++;
            }
          `;for(let Ye=0;Ye<m*S;Ye++)U+=`
            b_value = ${g===1?`b${Ye}_data`:`b${Ye}_data[i]`};
            ${e.bits===2?`{
              let half_word = b_value >> ${j*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${he}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${lt}u) & b_mask);`}
            b_quantized_values = ${Q}(${Array.from({length:4},(nt,Qe)=>`${G}(b_value_lower[${Qe}]), ${G}(b_value_upper[${Qe}])`).join(", ")});
            b_dequantized_values = ${h===1?`${Q}(${Array.from({length:8},(nt,Qe)=>`(b_quantized_values[${Qe}] - ${w?`zero_point${Ye}`:"zero_point"}) * scale${Ye}`).join(", ")});`:`(b_quantized_values - ${Q}(${Array(8).fill(`${w?`zero_point${Ye}`:"zero_point"}`).join(",")})) * scale${Ye};`};
            workgroup_shared[local_id.x * ${S} + ${Math.floor(Ye/m)}]${m>1?`[${Ye%m}]`:""} += ${Array.from({length:8/h},(nt,Qe)=>`${h===1?`a_data${j>0?j:""}[${Qe}] * b_dequantized_values[${Qe}]`:`dot(a_data${j>0?j:""}[${Qe}], b_dequantized_values[${Qe}])`}`).join(" + ")};
          `}return U},fe=()=>{let U=`
            var col_index = col * ${m};
            ${w?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/e.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,e.bits-1)} for unsigned ${e.bits}-bit quantization.
            let zero_point = ${G}(${Math.pow(2,e.bits-1).toFixed(1)});`}
            `;for(let j=0;j<m*S;j++)U+=`
            let scale${j} = ${re.getByOffset("col_index * nBlocksPerCol + block")};
            ${w?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${e.bits}u);
            zero_point_word = ${w.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${j} = ${G}((zero_point_word) & ${e.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return U},se=()=>{let U=`col_index = col * ${m};`;for(let j=0;j<m*S;j++)U+=`
            let b${j}_data = ${M.getByIndices(`${M.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return U+=`
            var b_value: u32;
            let b_mask: u32 = ${e.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${Q};
            var b_dequantized_values: ${Q};`,U};return`
        var<workgroup> workgroup_shared: array<${Z.type.value}, ${S*x}>;
        ${T.declareVariables(...B,Z)}
        ${T.mainStart([x,1,1])}
          let output_indices = ${Z.offsetToIndices(`(global_idx / ${x}) * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${x}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/h};
            ${fe()}
            for (var word: u32 = 0; word < ${c}; word += ${g}) {
              ${se()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${_e()}
                word_offset += ${ue/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${S}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${x}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${S};
            }
            ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${h};${g};${m};${S};${x}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:p}],dispatchGroup:{x:v},programUniforms:$}),getShaderSource:R}},hD=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,a=e.n,s=n.slice(0,t-2),u=k.size(s),c=r[1].dims[2]/4,p=r[0].dataType,h=Ne(e.k),g=Ne(c),m=s.concat([o,a]),_=128,S=a%8===0?8:a%4===0?4:1,v=_/S,x=Math.floor(32/e.bits),$=v*g*x,O=$/h,P=$/e.blockSize,C=k.size(m)/S,R=[],T=[u,o,i/h],W=k.convertShape(r[1].dims).slice();W.splice(-1,1,c/g),R.push(...K(T)),R.push(...K(W)),R.push(...K(r[2].dims)),r.length===4&&R.push(...K(k.convertShape(r[3].dims)));let H=[u,o,a];R.push(...K(H));let M=re=>{let B=T.length,w=z("a",r[0].dataType,B,h),V=z("b",12,W.length,g),Z=z("scales",r[2].dataType,r[2].dims.length),G=[w,V,Z],Q=r.length===4?z("zero_points",12,r[3].dims.length):void 0;Q&&G.push(Q);let ue=H.length,ae=q("output",r[0].dataType,ue),_e=Ge(r[0].dataType),fe=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${_e}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${_e}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${_e}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${_e}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${w.type.value}, ${O}>;
        var<workgroup> inter_results: array<array<${ae.type.value}, ${v}>, ${S}>;
        ${re.declareVariables(...G,ae)}
        ${re.mainStart([v,S,1])}
          let output_indices = ${ae.offsetToIndices(`workgroup_index * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${P} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${O};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${O}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${w.getByIndices(`${w.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${w.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${P} + local_id.x;
            ${Q?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/e.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${e.bits}u);
            let zero_point_word = ${Q.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${_e}((zero_point_word) & ${e.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,e.bits-1)} for unsigned ${e.bits}-bit quantization.
            let zero_point = ${_e}(${Math.pow(2,e.bits-1).toFixed(1)});`}
            let scale = ${Z.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${V.getByIndices(`${V.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/h};
            for (var i: u32 = 0; i < ${g}; i++) {
              let b_value = ${g===1?"b_data":"b_data[i]"};
              ${(()=>{let se=Math.floor(x/8),U="";for(let j=0;j<se;j++){let he=j*e.bits*4,lt=he+e.bits;U+=`
              ${fe()}
              {${e.bits===2?`
                let half_word = b_value >> ${j*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${he}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${lt}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${_e}>(${Array.from({length:4},(Ye,nt)=>`${_e}(b_value_lower[${nt}]), ${_e}(b_value_upper[${nt}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${_e}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ye,nt)=>`${`dot(a_data${nt}, b_dequantized_values[${nt}])`}`).join(" + ")};
              }
              word_offset += ${8/h};`}return U})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${S}) {
            var output_value: ${ae.type.value} = ${ae.type.value}(0);
            for (var b = 0u; b < ${v}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ae.setByIndices(`${ae.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${h};${g};${v};${S}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:p}],dispatchGroup:{x:C},programUniforms:R}),getShaderSource:M}},sx=(r,e)=>{pD(r.inputs,e),e.blockSize===32&&r.adapterInfo.isVendor("intel")&&r.adapterInfo.isArchitecture("gen-12lp")?r.compute(hD(r.inputs,e)):r.compute(fD(r.inputs,e))},ux=r=>ce(r)});var mD,gD,bD,yD,_D,vD,wD,xD,cx,dx=N(()=>{"use strict";pe();ge();ye();mD=r=>{if(!r||r.length<1)throw new Error("Too few inputs");if(r[0].dataType!==1&&r[0].dataType!==10)throw new Error("Input type must be float or float16.");if(r.length>=2){let e=r[0].dims.length*2===r[1].dims[0];if(r.length===4&&(e=r[3].dims[0]*2===r[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},gD=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${r.indicesGet("indices",o)}) - ${ne("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${ne("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${ne("uniforms.x_strides",o,e)});
        `;return`
          value = ${r.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},bD=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${ne("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${ne("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${ne("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${ne("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},yD=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${ne("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${ne("uniforms.x_shape",o,e)})) {
                  k = i32(${ne("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${ne("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},_D=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${ne("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${ne("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${ne("uniforms.x_shape",o,e)})) {
                  k -= i32(${ne("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${ne("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},vD=(r,e,n)=>{switch(n.mode){case 0:return gD(r,e,n.pads.length);case 1:return bD(r,e,n.pads.length);case 2:return yD(r,e,n.pads.length);case 3:return _D(r,e,n.pads.length);default:throw new Error("Invalid mode")}},wD=(r,e)=>{let n=k.padShape(r[0].dims.slice(),e.pads),t=r[0].dims,o=k.size(n),i=[{type:12,data:o},{type:6,data:e.pads}],a=r.length>=3&&r[2].data;e.mode===0&&i.push({type:a?r[2].dataType:1,data:e.value}),i.push(...K(r[0].dims,n));let s=["rank"],u=l=>{let c=q("output",r[0].dataType,n.length),p=z("x",r[0].dataType,t.length),h=p.type.value,g=vD(c,t.length,e),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&m.push({name:"constant_value",type:a?h:"f32"}),`
            ${l.registerUniforms(m).declareVariables(p,c)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(n)/64)},programUniforms:i}),getShaderSource:u}},xD=(r,e)=>{if(r.length>1){let n=r[1].getBigInt64Array(),t=r.length>=3&&r[2].data?r[2].dataType===10?r[2].getUint16Array()[0]:r[2].getFloat32Array()[0]:0,o=r[0].dims.length,i=new Int32Array(2*o).fill(0);if(r.length>=4){let s=r[3].getBigInt64Array();for(let u=0;u<s.length;u++)i[Number(s[u])]=Number(n[u]),i[Number(s[u])+o]=Number(n[u+s.length])}else n.forEach((s,u)=>i[Number(u)]=Number(s));let a=[];return i.forEach(s=>a.push(s)),{mode:e.mode,value:t,pads:a}}else return e},cx=(r,e)=>{mD(r.inputs);let n=xD(r.inputs,e);r.compute(wD(r.inputs,n),{inputs:[0]})}});var fs,px,fx,hx,mx,TD,ID,gx,bx,yx,_x,vx,wx,xx,Tx,Ix,Sx,$x,Ax,Ox=N(()=>{"use strict";ft();pe();ge();ye();fs=r=>{if(me.webgpu.validateInputContent&&(!r||r.length!==1))throw new Error("Pool ops requires 1 input.")},px=(r,e,n)=>{let t=e.format==="NHWC",o=r.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),s=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();Wr.adjustPoolAttributes(n,o,a,s,u,l);let c=Wr.computePoolOutputShape(n,o,s,u,a,l,e.autoPad,e.ceilMode),p=Object.assign({},e);i?Object.assign(p,{kernelShape:a,strides:s,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(p,{kernelShape:a,strides:s,pads:l,cacheKey:e.cacheKey});let h=c.slice();return h.push(h.splice(1,1)[0]),[p,t?h:c]},fx=(r,e)=>{let n=e.format==="NHWC",t=k.size(r),o=k.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],c=e.pads[e.pads.length-1],p=!!(l+c);i.push({type:12,data:s},{type:12,data:u},{type:12,data:l},{type:12,data:c}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(e.kernelShape.length===2){let g=e.kernelShape[e.kernelShape.length-2],m=e.strides[e.strides.length-2],_=e.pads[e.pads.length/2-2],S=e.pads[e.pads.length-2];h=!!(_+S),i.push({type:12,data:g},{type:12,data:m},{type:12,data:_},{type:12,data:S}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,p,h]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=k.computeStrides(e.kernelShape);i.push({type:12,data:s},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,c)=>l+c);return[i,a,!!u,!1,!1]}},hx=(r,e,n,t,o,i,a,s,u,l,c,p)=>{let h=o.format==="NHWC",g=e.type.value,m=q("output",e.type.tensor,t);if(o.kernelShape.length<=2){let _="",S="",v="",x=n-(h?2:1);if(c?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${x}] < 0 || xIndices[${x}]
                      >= uniforms.x_shape[${x}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let O=n-(h?3:2);p?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${O}] = indices[${O}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${O}] < 0 || xIndices[${O}] >= uniforms.x_shape[${O}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${O}] = indices[${O}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${r.registerUniforms(u).declareVariables(e,m)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${g}(${s});
              var pad = 0;
              ${S}
              ${_}
              ${v}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=o.kernelShape.length,S=o.pads.length,v="";return l?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:v=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${r.registerUniforms(u).declareVariables(e,m)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${g}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${_-1}u; j++) {
                  offsets[j] = offset / ${ne("uniforms.kernelStrides","j",_)};
                  offset -= offsets[j] * ${ne("uniforms.kernelStrides","j",_)};
                }
                offsets[${_-1}] = offset;

                isPad = false;
                for (var j = ${n-_}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${ne("uniforms.strides",`j - ${n-_}u`,_)}
                    + offsets[j - ${n-_}u] - ${ne("uniforms.pads","j - 2u",S)};
                  ${v}
              }
              ${a}

              output[global_idx] = value;
            }`}},mx=r=>`${r.format};${r.ceilMode};${r.autoPad};${r.kernelShape.length}`,TD=r=>`${mx(r)};${r.countIncludePad}`,ID=r=>`${mx(r)};${r.storageOrder};${r.dilations}`,gx=r=>({format:r.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],ceilMode:r.ceil_mode,kernelShape:r.kernel_shape,strides:r.strides,pads:r.pads}),bx=(r,e,n,t)=>{let[o,i]=px(e,t,n),a=z("x",e.dataType,e.dims.length),s=a.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${s}(uniforms.kernelSize);`:l+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[c,p,h,g,m]=fx(i,o);c.push(...K(e.dims,i));let _=["rank"];return{name:r,shaderCache:{hint:`${t.cacheKey};${h};${g};${m}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:c}),getShaderSource:S=>hx(S,a,e.dims.length,i.length,o,u,l,0,p,h,g,m)}},yx=r=>{let e=r.count_include_pad!==0,n=gx(r);if(n.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let t={countIncludePad:e,...n,cacheKey:""};return{...t,cacheKey:TD(t)}},_x=(r,e)=>{fs(r.inputs),r.compute(bx("AveragePool",r.inputs[0],!1,e))},vx={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},wx=r=>{let e=r.format;return{format:e,...vx,cacheKey:e}},xx=(r,e)=>{fs(r.inputs),r.compute(bx("GlobalAveragePool",r.inputs[0],!0,e))},Tx=(r,e,n,t)=>{let[o,i]=px(e,t,n),a=`
      value = max(x_val, value);
    `,s="",u=z("x",e.dataType,e.dims.length),l=["rank"],[c,p,h,g,m]=fx(i,o);return c.push(...K(e.dims,i)),{name:r,shaderCache:{hint:`${t.cacheKey};${h};${g};${m}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:c}),getShaderSource:_=>hx(_,u,e.dims.length,i.length,o,a,s,e.dataType===10?-65504:-1e5,p,h,g,m)}},Ix=(r,e)=>{fs(r.inputs),r.compute(Tx("MaxPool",r.inputs[0],!1,e))},Sx=r=>{let e=r.storage_order,n=r.dilations,t=gx(r);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let o={storageOrder:e,dilations:n,...t,cacheKey:""};return{...o,cacheKey:ID(o)}},$x=r=>{let e=r.format;return{format:e,...vx,cacheKey:e}},Ax=(r,e)=>{fs(r.inputs),r.compute(Tx("GlobalMaxPool",r.inputs[0],!0,e))}});var $D,AD,Px,Ex,Cx=N(()=>{"use strict";pe();ge();Xe();ye();$D=(r,e)=>{if(r.length<2||r.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(r.length===3&&r[1].dims===r[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[1].dims.length!==0&&r[1].dims.length!==1&&r[1].dims.length!==r[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(r.length>2){if(r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[1].dims.length!==r[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!r[1].dims.map((n,t)=>n===r[2].dims[t]).reduce((n,t)=>n&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(r[1].dims.length===0||r[1].dims.length===1&&r[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!r[1].dims.map((o,i)=>i===e.axis||o===r[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(r[1].dims.length!==r[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=r[0].dims[e.axis],t=r[1].dims[e.axis];if(e.blockSize<Math.ceil(n/t)||e.blockSize>Math.ceil(n/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},AD=(r,e)=>{let n=k.normalizeAxis(e.axis,r[0].dims.length),t=r[0].dataType,o=t===3,i=r[0].dims,a=r[1].dataType,s=k.size(i),u=t===3||t===2,l=u?[Math.ceil(k.size(r[0].dims)/4)]:r[0].dims,c=r[1].dims,p=r.length>2?r[2]:void 0,h=p?u?[Math.ceil(k.size(p.dims)/4)]:p.dims:void 0,g=c.length===0||c.length===1&&c[0]===1,m=g===!1&&c.length===1,_=Ne(s),S=g&&(!u||_===4),v=S?_:1,x=S&&!u?_:1,$=z("input",u?12:t,l.length,x),O=z("scale",a,c.length),P=p?z("zero_point",u?12:t,h.length):void 0,C=q("output",a,i.length,v),R=[$,O];P&&R.push(P);let T=[l,c];p&&T.push(h);let W=[{type:12,data:s/v},{type:12,data:n},{type:12,data:e.blockSize},...K(...T,i)],H=M=>{let re=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${M.registerUniforms(re).declareVariables(...R,C)}
      ${M.mainStart()}
          ${M.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${$.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${$.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${O.getByOffset("0")}`:m?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${O.getByOffset("scale_index")};`:`
            var scale_indices: ${O.type.indices} = output_indices;
            let index = ${O.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${O.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${O.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${P?g?u?`
                let zero_point_input = ${P.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${P.getByOffset("0")}`:m?u?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${P.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${P.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${O.indicesToOffset("scale_indices")};
                let zero_point_input = ${P.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${P.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":$.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:P?["rank","rank","rank"]:["rank","rank"]},getShaderSource:H,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/v/64),y:1,z:1},programUniforms:W})}},Px=(r,e)=>{$D(r.inputs,e),r.compute(AD(r.inputs,e))},Ex=r=>ce({axis:r.axis,blockSize:r.blockSize})});var OD,PD,Dx,kx=N(()=>{"use strict";ft();pe();ye();OD=(r,e,n)=>{let t=r===e,o=r<e&&n<0,i=r>e&&n>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},PD=(r,e,n,t)=>{let o=Math.abs(Math.ceil((e-r)/n)),i=[o],a=o,s=[{type:12,data:a},{type:t,data:r},{type:t,data:n},...K(i)],u=l=>{let c=q("output",t,i.length),p=c.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${l.registerUniforms(h).declareVariables(c)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s})}},Dx=r=>{let e=0,n=0,t=0;r.inputs[0].dataType===6?(e=r.inputs[0].getInt32Array()[0],n=r.inputs[1].getInt32Array()[0],t=r.inputs[2].getInt32Array()[0]):r.inputs[0].dataType===1&&(e=r.inputs[0].getFloat32Array()[0],n=r.inputs[1].getFloat32Array()[0],t=r.inputs[2].getFloat32Array()[0]),me.webgpu.validateInputContent&&OD(e,n,t),r.compute(PD(e,n,t,r.inputs[0].dataType),{inputs:[]})}});var ED,CD,Nx,Lx,Rx=N(()=>{"use strict";pe();ge();Xe();ye();ED=(r,e,n,t)=>{if(r!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${r}.`);let o=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,i=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${e}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(r){case"none":return`${e}=${n};`;case"add":return t==="i32"||t==="u32"?`atomicAdd(&${e}, bitcast<${t}>(${n}));`:`
              ${o}bitcast<${t}>(oldValue) + (${n})${i}`;case"max":return t==="i32"||t==="u32"?`atomicMax(&${e}, bitcast<${t}>(${n}));`:`
                ${o}max(bitcast<f32>(oldValue), (${n}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${n}));`:`${o}min(bitcast<${t}>(oldValue), (${n}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${n}))${i}`;default:throw new Error(`Reduction ${r} is not supported.`)}},CD=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n,i=1,a=Math.ceil(k.sizeToDimension(t,t.length-1)/i),s=t[t.length-1],u=k.sizeFromDimension(n,s),l=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...K(r[1].dims,r[2].dims,o)],c=p=>{let h=z("indices",r[1].dataType,r[1].dims.length),g=z("updates",r[2].dataType,r[2].dims.length,i),m=e.reduction!=="none"&&e.reduction!==""?Q_("output",r[0].dataType,o.length):q("output",r[0].dataType,o.length,i);return`
      ${p.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,g,m)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${r[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${ED(e.reduction,"output[data_offset + i]","value",m.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:c}},Nx=r=>ce({reduction:r.reduction}),Lx=(r,e)=>{r.compute(CD(r.inputs,e),{inputs:[r.inputs[1],r.inputs[2]],outputs:[]})}});var DD,kD,ND,zx,LD,RD,zD,MD,BD,VD,FD,GD,Mx,UD,WD,HD,qD,jD,Bx,Vx,Fx=N(()=>{"use strict";pe();ge();Xe();ye();DD=(r,e)=>{if(r.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),r.length>0){if(e.mode==="linear"){if(!(r.length===2||r.length===3||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1||r.length===5&&r[0]===1&&r[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(r.length===2||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},kD=(r,e,n)=>{e.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(n).fill(1);return e.forEach((o,i)=>t[o]=r[i]),t},ND=(r,e,n,t,o,i)=>{let[a,s,u]=n>10?[1,2,3]:[-1,r.length>1?1:-1,-1],l=r[0].dims.length;if(a>0&&r.length>a&&r[a].dims.length>0)r[a].getFloat32Array().forEach(c=>i.push(c));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&r.length>s&&r[s].dims.length===1&&r[s].dims[0]>0){if(r[s].getFloat32Array().forEach(c=>t.push(c)),t.length!==0&&t.length!==l&&n>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");DD(t,e),e.axes.length>0&&kD(t,e.axes,l).forEach((c,p)=>t[p]=c)}if(u>0&&r.length>u&&r[u].dims.length===1&&r[u].dims[0]>0&&(r[u].getBigInt64Array().forEach(c=>o.push(Number(c))),o.length!==0&&o.length!==l&&n>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},zx=(r,e,n,t)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${r}) * (${e});
  let whole = ${t}(big / (${n}));
  let fract = ${t}(big % (${n})) / ${t}(${n});
  return whole + fract;
`,LD=(r,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(r){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${zx("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${zx("xResized","lengthOriginal - 1","lengthResized - 1",e)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${e}(roiStart) * ${e}(lengthOriginal - 1) +
                        (${e}(xResized) * ${e}(roiEnd - roiStart) * ${e}(lengthOriginal - 1)) /
                        ${e}(lengthResized - 1);
                  } else {
                    return 0.5 * ${e}(roiStart + roiEnd) * ${e}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${e}xScale * ${e}(lengthResized);
                  const adjustment = ${e}(lengthResized) / outputWidth;
                  const center = ${e}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${r} is not supported`)}})()+"}",RD=(r,e,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${r} is not supported`)}})()+"}",zD=(r,e,n)=>{let t=new Array(n).fill(0).concat(new Array(n).fill(1)),o=r.length===0?t:r.slice();return e.length>0?(e.forEach((i,a)=>{t[i]=o[a],t[a+n]=o[e.length+a]}),t):o},MD=(r,e,n,t)=>{let o=[];if(n.length>0)if(t.length>0){if(r.forEach(i=>o.push(i)),Math.max(...t)>r.length)throw new Error("axes is out of bound");t.forEach((i,a)=>o[i]=n[a])}else n.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=r.map((i,a)=>Math.round(i*e[a]))}return o},BD=(r,e,n)=>{let t=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=r.slice();return n.axes.length>0?(n.axes.forEach(i=>e[i]=t),n.axes.forEach(i=>o[i]=Math.round(r[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,a)=>o[a]=Math.round(i*e[a]))),o},VD=(r,e,n,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${r.type.indices}) -> array<${r.type.value}, ${n.length}> {
      var original_indices: array<${r.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${r.indicesGet("output_indices","i")};
        var scale = ${ne("uniforms.scales","i",t)};
        var roi_low = ${ne("uniforms.roi","i",o)};
        var roi_hi = ${ne("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${r.type.value}(output_index);
        } else {
          var input_shape_i = ${ne("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${ne("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,FD=(r,e,n,t,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
      var input_indices: ${r.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${ne("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${ne("uniforms.roi","i",i)};
          var roi_hi = ${ne("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${ne("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${ne("uniforms.output_shape","i",t.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${e.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${e.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${r.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,GD=(r,e)=>`
    fn checkInputIndices(input_indices: ${r.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${r.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${ne("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,Mx=(r,e,n,t)=>r.rank>t?`
    ${r.indicesSet("input_indices",e,"channel")};
    ${r.indicesSet("input_indices",n,"batch")};
`:"",UD=(r,e,n,t,o)=>{let[a,s,u,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],c=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${c} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",s,`max(0, min(row, ${n[s]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${Mx(r,l,a,2)}
      return ${r.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${c} = originalIndices[${s}];
      var col:${c} = originalIndices[${u}];
      ${t?`if (row < 0 || row > (${n[s]} - 1) || col < 0 || col > (${n[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[s]} - 1));
      col = max(0, min(col, ${n[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${c} = getInputValue(batch, channel, row1, col1);
      var x12: ${c} = getInputValue(batch, channel, row1, col2);
      var x21: ${c} = getInputValue(batch, channel, row2, col1);
      var x22: ${c} = getInputValue(batch, channel, row2, col2);
      var dx1: ${c} = abs(row - ${c}(row1));
      var dx2: ${c} = abs(${c}(row2) - row);
      var dy1: ${c} = abs(col - ${c}(col1));
      var dy2: ${c} = abs(${c}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},WD=(r,e,n,t,o,i,a,s,u,l)=>{let c=n.length===2,p=!0,[h,g]=c?[0,1]:p?[2,3]:[1,2],m=r.type.value,_=S=>{let v=S===h?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${r.type.indices}, output_indices: ${e.type.indices}) -> ${m} {
        var output_index = ${e.indicesGet("output_indices",S)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[S]},
        ${t[S]}, ${n[S]}, ${i[S]}, ${i[S]} + ${n.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${n[S]} - 1))) {
          return ${u};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${m} = originalIdx + ${m}(i);
          if (${v} < 0 || ${v} >= ${n[S]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${v} = max(0, min(${v}, ${n[S]} - 1));`};
          }
        var input_indices_copy: ${r.type.indices} = input_indices;
          ${r.indicesSet("input_indices_copy",S,`u32(${v})`)};
          data[i + 1] = ${S===h?r.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(h)};
    ${_(g)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${m} {
    var input_indices: ${r.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},HD=(r,e,n,t,o)=>{let[a,s,u,l,c]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],p=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",s,`max(0, min(depth, ${n[s]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${r.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${Mx(r,c,a,3)}
      return ${r.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${s}];
      var height:${p} = originalIndices[${u}];
      var width:${p} = originalIndices[${l}];
      ${t?`if (depth < 0 || depth > (${n[s]} - 1) || height < 0 || height > (${n[u]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[s]} - 1));
      height = max(0, min(height, ${n[u]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${p} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${p} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${p} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${p} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${p} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${p} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${p} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${p} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${p} = abs(depth - ${p}(depth1));
      var dx2: ${p} = abs(${p}(depth2) - depth);
      var dy1: ${p} = abs(height - ${p}(height1));
      var dy2: ${p} = abs(${p}(height2) - height);
      var dz1: ${p} = abs(width - ${p}(width1));
      var dz2: ${p} = abs(${p}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},qD=(r,e,n,t,o,i)=>{let a=r.dims,s=zD(i,e.axes,a.length),u=MD(a,t,o,e.axes),l=t.slice();t.length===0&&(l=a.map((x,$)=>x===0?1:u[$]/x),e.keepAspectRatioPolicy!=="stretch"&&(u=BD(a,l,e)));let c=q("output",r.dataType,u.length),p=z("input",r.dataType,a.length),h=k.size(u),g=a.length===u.length&&a.every((x,$)=>x===u[$]),m=e.coordinateTransformMode==="tf_crop_and_resize",_=e.extrapolationValue,S=p.type.value,v=x=>`
      ${g?"":`
      ${LD(e.coordinateTransformMode,S)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${GD(p,a)};
              ${RD(e.nearestMode,n,S)};
              ${FD(p,c,a,u,l.length,s.length,m)};
              `;case"linear":return`
              ${VD(c,a,u,l.length,s.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${UD(p,c,a,m,_)}`;if(a.length===3||a.length===5)return`${HD(p,c,a,m,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${WD(p,c,a,u,l,s,e.cubicCoeffA,m,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${x.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",s.length).declareVariables(p,c)}
      ${x.mainStart()}
        ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${n}|${l.length>0?e.mode==="cubic"?l:l.length:""}|${o.length>0?o:""}|${s.length>0?s:""}|${g}|${e.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:u,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:l},{type:1,data:s},...K(a,u)]})}},jD=r=>{let e=r.customDataBuffer;return new Uint32Array(e.buffer,e.byteOffset,1)[0]},Bx=(r,e)=>{let n=[],t=[],o=[],i=jD(r);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");ND(r.inputs,e,i,n,t,o),r.compute(qD(r.inputs[0],e,i,n,t,o),{inputs:[0]})},Vx=r=>{let e=r.antialias,n=r.axes,t=r.coordinateTransformMode,o=r.cubicCoeffA,i=r.excludeOutside!==0,a=r.extrapolationValue,s=r.keepAspectRatioPolicy,u=r.mode,l=r.nearestMode===""?"simple":r.nearestMode;return ce({antialias:e,axes:n,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:l})}});var KD,XD,Gx,Ux=N(()=>{"use strict";pe();ge();ye();KD=r=>{if(!r||r.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dataType!==n.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(r.length>3){let a=r[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(r.length>4){let a=r[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},XD=(r,e,n,t)=>{let o=e.simplified,i=r[0].dims,a=k.size(i),s=i,u=a,l=i.slice(-1)[0],c=t?i.slice(0,-1).concat(1):[],p=!o&&r.length>3,h=r.length>4,g=t&&n>1,m=t&&n>2,_=n>3,S=64,v=Ne(l),x=[{type:12,data:u},{type:12,data:v},{type:12,data:l},{type:1,data:e.epsilon}],$=P=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],R=[z("x",r[0].dataType,r[0].dims,v),z("skip",r[1].dataType,r[1].dims,v),z("gamma",r[2].dataType,r[2].dims,v)];p&&R.push(z("beta",r[3].dataType,r[3].dims,v)),h&&R.push(z("bias",r[4].dataType,r[4].dims,v)),R.push(q("output",r[0].dataType,s,v)),g&&R.push(q("mean_output",1,c)),m&&R.push(q("inv_std_output",1,c)),_&&R.push(q("input_skip_bias_sum",r[0].dataType,s,v));let T=Ge(r[0].dataType),W=Ge(1,v);return`

      ${P.registerUniforms(C).declareVariables(...R)}
      var<workgroup> sum_shared : array<${W}, ${S}>;
      var<workgroup> sum_squared_shared : array<${W}, ${S}>;

      ${P.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":T+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${qr(T,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Zt("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Zt("square_sum",v)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${T}(mean)`}) *
            ${T}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},O=[{dims:s,dataType:r[0].dataType}];return n>1&&O.push({dims:c,dataType:1}),n>2&&O.push({dims:c,dataType:1}),n>3&&O.push({dims:i,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${g};${m};${_}`,inputDependencies:r.map((P,C)=>"type")},getShaderSource:$,getRunData:()=>({outputs:O,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:x})}},Gx=(r,e)=>{KD(r.inputs);let t=[0];r.outputCount>1&&t.push(-3),r.outputCount>2&&t.push(-3),r.outputCount>3&&t.push(3),r.compute(XD(r.inputs,e,r.outputCount,!1),{outputs:t})}});var ZD,hs,JD,Wx,YD,QD,Hx,qx,jx=N(()=>{"use strict";pe();ge();Xe();ye();ZD=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");r.slice(1).forEach((n,t)=>{if(r[t+1].dataType!==6&&r[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},hs=(r,e)=>{let n=[];if(r.length>e)if(r[e].dataType===7)r[e].getBigInt64Array().forEach(t=>n.push(Number(t)));else if(r[e].dataType===6)r[e].getInt32Array().forEach(t=>n.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return n},JD=(r,e)=>{if(r.length>1){let n=hs(r,1),t=hs(r,2),o=hs(r,3);return o.length===0&&(o=[...Array(r[0].dims.length).keys()]),ce({starts:n,ends:t,axes:o})}else return e},Wx=(r,e,n,t,o)=>{let i=r;return r<0&&(i+=n[t[e]]),o[e]<0?Math.max(0,Math.min(i,n[t[e]]-1)):Math.max(0,Math.min(i,n[t[e]]))},YD=(r,e,n)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${ne("uniforms.input_shape","i",n.length)};
            let steps_i = ${ne("uniforms.steps","i",n.length)};
            let signs_i = ${ne("uniforms.signs","i",n.length)};
            let starts_i = ${ne("uniforms.starts","i",n.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${r.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,QD=(r,e)=>{let n=r[0].dims,t=k.size(n),o=e.axes.length>0?k.normalizeAxes(e.axes,n.length):[...Array(n.length).keys()],i=hs(r,4);i.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=e.starts.map((v,x)=>Wx(v,x,n,o,i)),s=e.ends.map((v,x)=>Wx(v,x,n,o,i));if(o.length!==a.length||o.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let v=0;v<n.length;++v)o.includes(v)||(a.splice(v,0,0),s.splice(v,0,n[v]),i.splice(v,0,1));let u=i.map(v=>Math.sign(v));i.forEach((v,x,$)=>{if(v<0){let O=(s[x]-a[x])/v,P=a[x],C=P+O*i[x];a[x]=C,s[x]=P,$[x]=-v}});let l=n.slice(0);o.forEach((v,x)=>{l[v]=Math.ceil((s[v]-a[v])/i[v])});let c={dims:l,dataType:r[0].dataType},p=q("output",r[0].dataType,l.length),h=z("input",r[0].dataType,r[0].dims.length),g=k.size(l),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],_=[{type:12,data:g},{type:12,data:a},{type:6,data:u},{type:12,data:i},...K(r[0].dims,l)],S=v=>`
      ${v.registerUniforms(m).declareVariables(h,p)}
        ${YD(h,p,n)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:_})}},Hx=(r,e)=>{ZD(r.inputs,e);let n=JD(r.inputs,e);r.compute(QD(r.inputs,n),{inputs:[0]})},qx=r=>{let e=r.starts,n=r.ends,t=r.axes;return ce({starts:e,ends:n,axes:t})}});var ek,tk,Kx,Xx,Zx=N(()=>{"use strict";pe();ge();Xe();Qn();ye();ek=r=>{if(!r||r.length!==1)throw new Error("Softmax op requires 1 input.")},tk=(r,e)=>{let n=r.inputs[0],t=n.dims,o=k.size(t),i=t.length,a=k.normalizeAxis(e.axis,i),s=a<t.length-1,u,l=[];s?(l=Array.from({length:i},(R,T)=>T),l[a]=i-1,l[i-1]=a,u=r.compute(dt(n,l),{inputs:[n],outputs:[-1]})[0]):u=n;let c=u.dims,p=c[i-1],h=o/p,g=Ne(p),m=p/g,_=64;h===1&&(_=256);let S=(R,T)=>T===4?`max(max(${R}.x, ${R}.y), max(${R}.z, ${R}.w))`:T===2?`max(${R}.x, ${R}.y)`:T===3?`max(max(${R}.x, ${R}.y), ${R}.z)`:R,v=z("x",u.dataType,u.dims,g),x=q("result",u.dataType,u.dims,g),$=v.type.value,O=Ge(u.dataType)==="f32"?`var threadMax = ${$}(-3.4028234663852886e+38f);`:`var threadMax = ${$}(-65504.0h);`,P=R=>`
      var<workgroup> rowMaxShared : ${$};
      var<workgroup> rowSumShared : ${$};
      var<workgroup> threadShared : array<${$}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${$} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${$}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${R.registerUniform("packedCols","i32").declareVariables(v,x)}
      ${R.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${O}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${$}(${S("threadShared[0]",g)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${$}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${$}(${Zt("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${$}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=r.compute({name:"Softmax",shaderCache:{hint:`${g};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:u.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:m}]}),getShaderSource:P},{inputs:[u],outputs:[s?-1:0]})[0];s&&r.compute(dt(C,l),{inputs:[C]})},Kx=(r,e)=>{ek(r.inputs),tk(r,e)},Xx=r=>ce({axis:r.axis})});var Jx,nk,rk,ok,Yx,Qx=N(()=>{"use strict";pe();ge();ye();Jx=r=>Array.from(r.getBigInt64Array(),Number),nk=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 inputs.");if(r[0].dataType!==1&&r[0].dataType!==10&&r[0].dataType!==6&&r[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(r[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(r[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Jx(r[1]).length!==r[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},rk=(r,e)=>{let n=[];for(let t=0;t<r.length;++t)n.push(r[t]*e[t]);return n},ok=(r,e)=>{let n=r[0].dims,t=e??Jx(r[1]),o=rk(n,t),i=k.size(o),a=r[0].dataType,s=z("input",a,n.length),u=q("output",a,o.length),l=c=>`
      const inputShape = ${s.indices(...n)};
      ${c.registerUniform("output_size","u32").declareVariables(s,u)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...K(r[0].dims,o)]}),getShaderSource:l}},Yx=r=>{nk(r.inputs),r.compute(ok(r.inputs),{inputs:[0]})}});var ik,ak,eT,tT=N(()=>{"use strict";pe();ge();ye();ik=(r,e,n,t,o)=>{let i=q("output_data",o,n.length,4),a=z("a_data",e[1].dataType,e[1].dims.length,4),s=z("b_data",e[2].dataType,e[2].dims.length,4),u=z("c_data",e[0].dataType,e[0].dims.length,4),l,c=(p,h,g)=>`select(${h}, ${p}, ${g})`;if(!t)l=i.setByOffset("global_idx",c(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let p=(h,g,m="")=>{let _=`a_data[index_a${g}][component_a${g}]`,S=`b_data[index_b${g}][component_b${g}]`,v=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
            let output_indices${g} = ${i.offsetToIndices(`global_idx * 4u + ${g}u`)};
            let offset_a${g} = ${a.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let offset_b${g} = ${s.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let offset_c${g} = ${u.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let index_a${g} = offset_a${g} / 4u;
            let index_b${g} = offset_b${g} / 4u;
            let index_c${g} = offset_c${g} / 4u;
            let component_a${g} = offset_a${g} % 4u;
            let component_b${g} = offset_b${g} % 4u;
            let component_c${g} = offset_c${g} % 4u;
            ${h}[${g}] = ${m}(${c(_,S,v)});
          `};o===9?l=`
            var data = vec4<u32>(0);
            ${p("data",0,"u32")}
            ${p("data",1,"u32")}
            ${p("data",2,"u32")}
            ${p("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${p("output_data[global_idx]",0)}
            ${p("output_data[global_idx]",1)}
            ${p("output_data[global_idx]",2)}
            ${p("output_data[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(u,a,s,i)}
        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},ak=r=>{let e=r[1].dims,n=r[2].dims,t=r[0].dims,o=r[1].dataType,i=!(k.areEqual(e,n)&&k.areEqual(n,t)),a=e,s=k.size(e);if(i){let l=Un.calcShape(Un.calcShape(e,n,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");a=l,s=k.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>ik(l,r,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...K(t,e,n,a)]})}},eT=r=>{r.compute(ak(r.inputs))}});var nT,rT=N(()=>{"use strict";O0();ts();C0();k0();_v();Ev();kv();Xv();nw();iw();uw();gw();ww();Iw();$w();Pw();Dw();Lw();Mw();Fw();Ww();Qw();nx();ox();ax();lx();Qc();dx();Ox();Cx();kx();Rx();Qa();Fx();nd();Ux();jx();Zx();td();Qx();Qn();rs();tT();nT=new Map([["Abs",[N0]],["Acos",[L0]],["Acosh",[R0]],["Add",[vv]],["ArgMax",[A0,Bc]],["ArgMin",[$0,Bc]],["Asin",[z0]],["Asinh",[M0]],["Atan",[B0]],["Atanh",[V0]],["Attention",[P0]],["AveragePool",[_x,yx]],["BatchNormalization",[E0]],["BiasAdd",[D0]],["BiasSplitGelu",[yv]],["Cast",[G0,F0]],["Ceil",[W0]],["Clip",[U0]],["Concat",[Cv,Dv]],["Conv",[Kc,jc]],["ConvTranspose",[tw,Qv]],["Cos",[H0]],["Cosh",[q0]],["CumSum",[rw,ow]],["DepthToSpace",[aw,sw]],["DequantizeLinear",[Px,Ex]],["DFT",[hw,mw]],["Div",[wv]],["Einsum",[_w,vw]],["Elu",[j0,Qo]],["Equal",[xv]],["Erf",[K0]],["Exp",[X0]],["Expand",[Tw]],["FastGelu",[Sw]],["Floor",[Z0]],["FusedConv",[Kc,jc]],["Gather",[Ow,Aw]],["GatherElements",[zw,Rw]],["GatherBlockQuantized",[kw,Nw]],["GatherND",[Ew,Cw]],["Gelu",[J0]],["Gemm",[Vw,Bw]],["GlobalAveragePool",[xx,wx]],["GlobalMaxPool",[Ax,$x]],["Greater",[$v]],["GreaterOrEqual",[Ov]],["GridSample",[Gw,Uw]],["GroupQueryAttention",[Yw]],["HardSigmoid",[iv,ov]],["HardSwish",[av]],["InstanceNormalization",[tx]],["LayerNormalization",[rx]],["LeakyRelu",[Y0,Qo]],["Less",[Av]],["LessOrEqual",[Pv]],["Log",[mv]],["MatMul",[ix]],["MatMulNBits",[sx,ux]],["MaxPool",[Ix,Sx]],["Mul",[Tv]],["MultiHeadAttention",[jw,qw]],["Neg",[ev]],["Not",[Q0]],["Pad",[cx]],["Pow",[Iv]],["QuickGelu",[gv,Qo]],["Range",[Dx]],["Reciprocal",[tv]],["ReduceMin",[v0]],["ReduceMean",[m0]],["ReduceMax",[_0]],["ReduceSum",[x0]],["ReduceProd",[w0]],["ReduceL1",[g0]],["ReduceL2",[b0]],["ReduceLogSum",[I0]],["ReduceLogSumExp",[y0]],["ReduceSumSquare",[T0]],["Relu",[nv]],["Resize",[Bx,Vx]],["RotaryEmbedding",[Zw]],["ScatterND",[Lx,Nx]],["Sigmoid",[rv]],["Sin",[sv]],["Sinh",[uv]],["Slice",[Hx,qx]],["SkipLayerNormalization",[Gx]],["Split",[Kw,Xw]],["Sqrt",[lv]],["Softmax",[Kx,Xx]],["Sub",[Sv]],["Tan",[cv]],["Tanh",[pv]],["ThresholdedRelu",[hv,Qo]],["Tile",[Yx]],["Transpose",[n0,r0]],["Where",[eT]]])});var ms,oT=N(()=>{"use strict";ft();Gn();ye();ms=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t,o,i){gt(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let c of n)u.push({binding:u.length,resource:{buffer:c.buffer}});for(let c of t)u.push({binding:u.length,resource:{buffer:c.buffer}});i&&u.push({binding:u.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let c={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(c)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),pt(e.programInfo.name)}dispose(){}build(e,n){gt(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{t.features.has(p.feature)&&o.push(`enable ${p.extension};`)});let a=e0(n,this.backend.device.limits),s=e.getShaderSource(a),u=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,l=t.createShaderModule({code:u,label:e.name});xe("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let c=t.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return pt(e.name),{programInfo:e,computePipeline:c,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let n=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&t<=i&&o<=i)return[n,t,o];let a=n*t*o,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}});var iT={};Or(iT,{WebGpuBackend:()=>od});var sk,uk,rd,od,aT=N(()=>{"use strict";ft();pe();Gn();Oc();Y_();rT();oT();sk=(r,e)=>{if(e.length!==r.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${r.length}.`);let n=[];for(let t=0;t<r.length;++t){let o=r[t].dataType;switch(e[t]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=r[t].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=r[t].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return n.join("|")},uk=(r,e,n)=>{let t=r.name;return r.shaderCache?.hint&&(t+="["+r.shaderCache.hint+"]"),t+=":"+n+`:${sk(e,r.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},rd=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},od=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,n){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=u=>n.features.has(u)&&t.push(u)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await n.requestDevice(o);let a=n,s=n.info??(typeof a.requestAdapterInfo=="function"?await a.requestAdapterInfo():void 0);this.adapterInfo=new rd(s),this.gpuDataManager=J_(this),this.programManager=new ms(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ua(e.logLevel,!!e.debug),this.device.onuncapturederror=u=>{u.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${u.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;gt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<n.length/2;o++){let i=t[o],a=i.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,c=i.programName,p=i.inputTensorViews,h=i.outputTensorViews,g=n[o*2],m=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),S=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(v=>({dims:v.dims,dataType:Fn(v.dataType)})),outputsMetadata:h.map(v=>({dims:v.dims,dataType:Fn(v.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:c,startTime:_,endTime:S});else{let v="";p.forEach(($,O)=>{v+=`input[${O}]: [${$.dims}] | ${Fn($.dataType)}, `});let x="";h.forEach(($,O)=>{x+=`output[${O}]: [${$.dims}] | ${Fn($.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${c}" ${v}${x}start time: ${_} ns, execution time: ${S-_} ns`)}vi("GPU",`${c}::${g}::${m}`)}e.unmap(),this.pendingQueries.delete(e)}),pt()}run(e,n,t,o,i,a){gt(e.name);let s=[];for(let $=0;$<n.length;++$){let O=n[$].data;if(O===0)continue;let P=this.gpuDataManager.get(O);if(!P)throw new Error(`no GPU data for input: ${O}`);s.push(P)}let{outputs:u,dispatchGroup:l,programUniforms:c}=e.getRunData(n),p=t.length===0?u.map(($,O)=>O):t;if(p.length!==u.length)throw new Error(`Output size ${p.length} must be equal to ${u.length}.`);let h=[],g=[];for(let $=0;$<u.length;++$){if(!Number.isInteger(p[$])||p[$]<-3||p[$]>=a)throw new Error(`Invalid output index: ${p[$]}`);if(p[$]===-3)continue;let O=p[$]===-1,P=p[$]===-2,C=O||P?i(u[$].dataType,u[$].dims):o(p[$],u[$].dataType,u[$].dims);if(h.push(C),C.data===0)continue;let R=this.gpuDataManager.get(C.data);if(!R)throw new Error(`no GPU data for output: ${C.data}`);if(O&&this.temporaryData.push(R),P){let T=this.kernelPersistentData.get(this.currentKernelId);T||(T=[],this.kernelPersistentData.set(this.currentKernelId,T)),T.push(R)}g.push(R)}if(s.length!==n.length||g.length!==h.length){if(g.length===0)return pt(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let m;if(c){let $=0,O=[];c.forEach(T=>{let W=typeof T.data=="number"?[T.data]:T.data;if(W.length===0)return;let H=T.type===10?2:4,M,re;T.type===10?(re=W.length>4?16:W.length>2?8:W.length*H,M=W.length>4?16:H*W.length):(re=W.length<=2?W.length*H:16,M=16),$=Math.ceil($/re)*re,O.push($);let B=T.type===10?8:4;$+=W.length>4?Math.ceil(W.length/B)*M:W.length*H});let P=16;$=Math.ceil($/P)*P;let C=new ArrayBuffer($);c.forEach((T,W)=>{let H=O[W],M=typeof T.data=="number"?[T.data]:T.data;if(T.type===6)new Int32Array(C,H,M.length).set(M);else if(T.type===12)new Uint32Array(C,H,M.length).set(M);else if(T.type===10)new Uint16Array(C,H,M.length).set(M);else if(T.type===1)new Float32Array(C,H,M.length).set(M);else throw new Error(`Unsupported uniform type: ${Fn(T.type)}`)});let R=this.gpuDataManager.create($,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(R.buffer,0,C,0,$),this.gpuDataManager.release(R.id),m={offset:0,size:$,buffer:R.buffer}}let _=this.programManager.normalizeDispatchGroupSize(l),S=_[1]===1&&_[2]===1,v=uk(e,n,S),x=this.programManager.getArtifact(v);if(x||(x=this.programManager.build(e,_),this.programManager.setArtifact(v,x),xe("info",()=>`[artifact] key: ${v}, programName: ${e.name}`)),c&&x.uniformVariablesInfo){if(c.length!==x.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${x.uniformVariablesInfo.length}, got ${c.length} in program "${x.programInfo.name}".`);for(let $=0;$<c.length;$++){let O=c[$],P=O.type,C=typeof O.data=="number"?1:O.data.length,[R,T]=x.uniformVariablesInfo[$];if(P!==R||C!==T)throw new Error(`Uniform variable ${$} mismatch: expect type ${R} with size ${T}, got type ${P} with size ${C} in program "${x.programInfo.name}".`)}}if(xe("info",()=>`[ProgramManager] run "${e.name}" (key=${v}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let $={kernelId:this.currentKernelId,programName:x.programInfo.name,inputTensorViews:n,outputTensorViews:h};this.pendingKernels.push($),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push($)}return this.programManager.run(x,s,g,_,m),pt(e.name),h}upload(e,n){this.gpuDataManager.upload(e,n)}memcpy(e,n){this.gpuDataManager.memcpy(e,n)}async download(e,n){await this.gpuDataManager.download(e,n)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,n,t,o){let i=nT.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(n,a)}releaseKernel(e){let n=this.kernelPersistentData.get(e);if(n){for(let t of n)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,n,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,a=o.kernelName,s=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),xe("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(n,u[1]),0}catch(c){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${c}`)),1}finally{l&&t.push(this.device.popErrorScope().then(c=>c?`GPU validation error for kernel "[${i}] ${a}": ${c.message}`:null));for(let c of this.temporaryData)this.gpuDataManager.release(c.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,n,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(n),s=this.gpuDataManager.registerExternalBuffer(t,o,a);return i.set(n,[s,t]),s}unregisterBuffers(e){let n=this.sessionExternalDataMapping.get(e);n&&(n.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let n=this.gpuDataManager.get(e);if(!n)throw new Error(`no GPU data for buffer: ${e}`);return n.buffer}createDownloader(e,n,t){return async()=>{let o=await kc(this,e,n);return Ha(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){xe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){xe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){xe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),a=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var sT={};Or(sT,{init:()=>lk});var ri,id,lk,uT=N(()=>{"use strict";pe();Gn();ge();j_();ri=class r{constructor(e,n,t,o){this.module=e;this.dataType=n;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(k.size(e)!==k.size(this.dims))throw new Error("Invalid new shape");return new r(this.module,this.dataType,this.data,e)}},id=class{constructor(e,n,t){this.module=e;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo,this.deviceLimits=n.device.limits;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,a));let s=Number(e.getValue(o*i++,a));this.outputCount=Number(e.getValue(o*i++,a)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,a));let u=[];for(let l=0;l<s;l++){let c=Number(e.getValue(o*i++,a)),p=Number(e.getValue(o*i++,"*")),h=Number(e.getValue(o*i++,a)),g=[];for(let m=0;m<h;m++)g.push(Number(e.getValue(o*i++,a)));u.push(new ri(e,c,p,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,n){let t=n?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,o=n?.outputs??[],i=(s,u,l)=>new ri(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=wr(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let c=l>0?this.backend.gpuDataManager.create(l).id:0;return new ri(this.module,s,c,u)};return this.backend.run(e,t,o,i,a,this.outputCount)}output(e,n){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+n.length)*o);this.module.setValue(a,n.length,i);for(let s=0;s<n.length;s++)this.module.setValue(a+o*(s+1),n[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},lk=async(r,e,n,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(r==="webgpu"){let i=(aT(),Yr(iT)).WebGpuBackend,a=new i;await a.initialize(n,t),o("webgpu",[a,s=>a.alloc(Number(s)),s=>a.free(s),(s,u,l,c=!1)=>{if(c)xe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(u)}, size=${Number(l)}`),a.memcpy(Number(s),Number(u));else{xe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(u)}, size=${Number(l)}`);let p=e.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(l));a.upload(Number(u),p)}},async(s,u,l)=>{xe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${u}, size=${l}`),await a.download(Number(s),()=>e.HEAPU8.subarray(Number(u)>>>0,Number(u+l)>>>0))},(s,u,l)=>a.createKernel(s,Number(u),l,e.UTF8ToString(e._JsepGetNodeName(Number(u)))),s=>a.releaseKernel(s),(s,u,l,c)=>{xe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${s}, contextDataOffset=${u}`);let p=new id(e,a,Number(u));return a.computeKernel(Number(s),p,c)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let i=new Xa(n);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,s,u,l,c)=>i.ensureTensor(a,s,u,l,c),(a,s)=>{i.uploadTensor(a,s)},async(a,s)=>i.downloadTensor(a,s),(a,s)=>i.registerMLContext(a,s),!!n.trace])}}});var ck,Ca,Da,Kr,dk,lT,Zo,ka,Na,gs,pk,_o,dT,pT,cT,La,Ra,za,wc=N(()=>{"use strict";ft();N_();R_();pe();_r();Ba();Ga();ck=(r,e)=>{Oe()._OrtInit(r,e)!==0&&Ee("Can't initialize onnxruntime.")},Ca=async r=>{ck(r.wasm.numThreads,Yo(r.logLevel))},Da=async(r,e)=>{Oe().asyncInit?.();let n=r.webgpu.adapter;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=r.webgpu.powerPreference;if(t!==void 0&&t!=="low-power"&&t!=="high-performance")throw new Error(`Invalid powerPreference setting: "${t}"`);let o=r.webgpu.forceFallbackAdapter;if(o!==void 0&&typeof o!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:o}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(e==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let t=(uT(),Yr(sT)).init;e==="webgpu"&&await t("webgpu",Oe(),r,n),e==="webnn"&&await t("webnn",Oe(),r)}},Kr=new Map,dk=r=>{let e=Oe(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(r,o,o+t)!==0&&Ee("Can't get session input/output count.");let a=t===4?"i32":"i64";return[Number(e.getValue(o,a)),Number(e.getValue(o+t,a))]}finally{e.stackRestore(n)}},lT=(r,e)=>{let n=Oe(),t=n.stackSave(),o=0;try{let i=n.PTR_SIZE,a=n.stackAlloc(2*i);n._OrtGetInputOutputMetadata(r,e,a,a+i)!==0&&Ee("Can't get session input/output metadata.");let u=Number(n.getValue(a,"*"));o=Number(n.getValue(a+i,"*"));let l=n.HEAP32[o/4];if(l===0)return[u,0];let c=n.HEAPU32[o/4+1],p=[];for(let h=0;h<c;h++){let g=Number(n.getValue(o+8+h*i,"*"));p.push(g!==0?n.UTF8ToString(g):Number(n.getValue(o+8+(h+c)*i,"*")))}return[u,l,p]}finally{n.stackRestore(t),o!==0&&n._OrtFree(o)}},Zo=r=>{let e=Oe(),n=e._malloc(r.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${r.byteLength}.`);return e.HEAPU8.set(r,n),[n,r.byteLength]},ka=async(r,e)=>{let n,t,o=Oe();Array.isArray(r)?[n,t]=r:r.buffer===o.HEAPU8.buffer?[n,t]=[r.byteOffset,r.byteLength]:[n,t]=Zo(r);let i=0,a=0,s=0,u=[],l=[],c=[];try{if([a,u]=await L_(e),e?.externalData&&o.mountExternalData){let O=[];for(let P of e.externalData){let C=typeof P=="string"?P:P.path,R=typeof P=="string"?P:P.data;O.push(Ur(R).then(T=>{o.mountExternalData(C,T)}))}await Promise.all(O)}for(let O of e?.executionProviders??[])if((typeof O=="string"?O:O.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof O!="string"){let C=O,R=C?.context,T=C?.gpuDevice,W=C?.deviceType,H=C?.powerPreference;R?o.currentContext=R:T?o.currentContext=await o.webnnCreateMLContext(T):o.currentContext=await o.webnnCreateMLContext({deviceType:W,powerPreference:H})}else o.currentContext=await o.webnnCreateMLContext();break}i=await o._OrtCreateSession(n,t,a),o.webgpuOnCreateSession?.(i),i===0&&Ee("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[p,h]=dk(i),g=!!e?.enableGraphCapture,m=[],_=[],S=[],v=[],x=[];for(let O=0;O<p;O++){let[P,C,R]=lT(i,O);P===0&&Ee("Can't get an input name."),l.push(P);let T=o.UTF8ToString(P);m.push(T),S.push(C===0?{name:T,isTensor:!1}:{name:T,isTensor:!0,type:Fn(C),shape:R})}for(let O=0;O<h;O++){let[P,C,R]=lT(i,O+p);P===0&&Ee("Can't get an output name."),c.push(P);let T=o.UTF8ToString(P);_.push(T),v.push(C===0?{name:T,isTensor:!1}:{name:T,isTensor:!0,type:Fn(C),shape:R});{if(g&&e?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let W=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[T]??"cpu",H=o.webnnIsGraphOutput;if(W==="cpu"&&H&&H(i,T)){x.push("ml-tensor-cpu-output");continue}if(W!=="cpu"&&W!=="cpu-pinned"&&W!=="gpu-buffer"&&W!=="ml-tensor")throw new Error(`Not supported preferred output location: ${W}.`);if(g&&W!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${W}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(W)}}let $=null;return x.some(O=>O==="gpu-buffer"||O==="ml-tensor"||O==="ml-tensor-cpu-output")&&(s=o._OrtCreateBinding(i),s===0&&Ee("Can't create IO binding."),$={handle:s,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map(O=>O==="ml-tensor-cpu-output"?"ml-tensor":O).map(O=>$c(O))}),Kr.set(i,[i,l,c,$,g,!1]),[i,m,_,S,v]}catch(p){throw l.forEach(h=>o._OrtFree(h)),c.forEach(h=>o._OrtFree(h)),s!==0&&o._OrtReleaseBinding(s)!==0&&Ee("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&Ee("Can't release session."),p}finally{o._free(n),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&Ee("Can't release session options."),u.forEach(p=>o._free(p)),o.unmountExternalData?.()}},Na=r=>{let e=Oe(),n=Kr.get(r);if(!n)throw new Error(`cannot release session. invalid session id: ${r}`);let[t,o,i,a,s]=n;a&&(s&&e._OrtClearBoundOutputs(a.handle)!==0&&Ee("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&Ee("Can't release IO binding.")),e.jsepOnReleaseSession?.(r),e.webnnOnReleaseSession?.(r),e.webgpuOnReleaseSession?.(r),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&Ee("Can't release session."),Kr.delete(r)},gs=new Map,pk=1,_o=new Map,dT=r=>{let e=Oe(),n=e._malloc(r.byteLength);if(n===0)throw new Error(`Can't create a LoRA adapter. failed to allocate a buffer of size ${r.byteLength}.`);try{e.HEAPU8.set(r,n);let t=e._OrtCreateLoraAdapter(n,r.byteLength);t===0&&Ee("Can't create a LoRA adapter.");let o=pk++;return gs.set(o,t),o}finally{e._free(n)}},pT=r=>{let e=Oe(),n=gs.get(r);if(n===void 0)throw new Error(`cannot release LoRA adapter. invalid adapter id: ${r}`);if(_o.has(r))throw new Error(`cannot release LoRA adapter. the adapter is used by a run in progress. adapter id: ${r}`);e._OrtReleaseLoraAdapter(n)!==0&&Ee("Can't release LoRA adapter."),gs.delete(r)},cT=async(r,e,n,t,o,i,a=!1)=>{if(!r){e.push(0);return}let s=Oe(),u=s.PTR_SIZE,l=r[0],c=r[1],p=r[3],h=p,g,m;if(l==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let v=r[2].gpuBuffer;m=wr(vr(l),c);{let x=s.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');g=x(t,i,v,m)}}else if(p==="ml-tensor"){let v=r[2].mlTensor;m=wr(vr(l),c);let x=s.webnnRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');g=x(t,v,vr(l),c)}else{let v=r[2];if(Array.isArray(v)){m=u*v.length,g=s._malloc(m),n.push(g);for(let x=0;x<v.length;x++){if(typeof v[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);s.setValue(g+x*u,Et(v[x],n),"*")}}else{let x=s.webnnIsGraphInput,$=s.webnnIsGraphOutput;if(l!=="string"&&x&&$){let O=s.UTF8ToString(o);if(x(t,O)||$(t,O)){let P=vr(l);m=wr(P,c),h="ml-tensor";let C=s.webnnCreateTemporaryTensor,R=s.webnnUploadTensor;if(!C||!R)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let T=await C(t,P,c);R(T,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),g=T}else m=v.byteLength,g=s._malloc(m),n.push(g),s.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,m),g)}else m=v.byteLength,g=s._malloc(m),n.push(g),s.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,m),g)}}let _=s.stackSave(),S=s.stackAlloc(4*c.length);try{c.forEach((x,$)=>s.setValue(S+$*u,x,u===4?"i32":"i64"));let v=s._OrtCreateTensor(vr(l),g,m,S,c.length,$c(h));v===0&&Ee(`Can't create tensor for input/output. session=${t}, index=${i}.`),e.push(v)}finally{s.stackRestore(_)}},La=async(r,e,n,t,o,i,a=[])=>{let s=Oe(),u=s.PTR_SIZE,l=Kr.get(r);if(!l)throw new Error(`cannot run inference. invalid session id: ${r}`);let c=l[0],p=l[1],h=l[2],g=l[3],m=l[4],_=l[5],S=[];if(a.length>0){if(g)throw new Error("LoRA adapters are not supported for a session that uses IO binding, e.g. when an output is preferred to be on GPU, or when the WebNN execution provider produces an output.");for(let w of a){let V=gs.get(w);if(V===void 0)throw new Error(`cannot run inference. invalid LoRA adapter id: ${w}`);S.push(V)}}let v=e.length,x=t.length,$=0,O=[],P=[],C=[],R=[],T=[],W=s.stackSave(),H=s.stackAlloc(v*u),M=s.stackAlloc(v*u),re=s.stackAlloc(x*u),B=s.stackAlloc(x*u);try{for(let G of a)_o.set(G,(_o.get(G)??0)+1);[$,O]=k_(i,S),cr("wasm prepareInputOutputTensor");for(let G=0;G<v;G++)await cT(n[G],P,R,r,p[e[G]],e[G],m);for(let G=0;G<x;G++)await cT(o[G],C,R,r,h[t[G]],v+t[G],m);dr("wasm prepareInputOutputTensor");for(let G=0;G<v;G++)s.setValue(H+G*u,P[G],"*"),s.setValue(M+G*u,p[e[G]],"*");for(let G=0;G<x;G++)s.setValue(re+G*u,C[G],"*"),s.setValue(B+G*u,h[t[G]],"*");if(g&&!_){let{handle:G,outputPreferredLocations:Q,outputPreferredLocationsEncoded:ue}=g;if(p.length!==v)throw new Error(`input count from feeds (${v}) is expected to be always equal to model's input count (${p.length}).`);cr("wasm bindInputsOutputs");for(let ae=0;ae<v;ae++){let _e=e[ae];await s._OrtBindInput(G,p[_e],P[ae])!==0&&Ee(`Can't bind input[${ae}] for session=${r}.`)}for(let ae=0;ae<x;ae++){let _e=t[ae];o[ae]?.[3]?(T.push(C[ae]),s._OrtBindOutput(G,h[_e],C[ae],0)!==0&&Ee(`Can't bind pre-allocated output[${ae}] for session=${r}.`)):s._OrtBindOutput(G,h[_e],0,ue[_e])!==0&&Ee(`Can't bind output[${ae}] to ${Q[ae]} for session=${r}.`)}dr("wasm bindInputsOutputs"),Kr.set(r,[c,p,h,g,m,!0])}s.jsepOnRunStart?.(c),s.webnnOnRunStart?.(c);let w;g?w=await s._OrtRunWithBinding(c,g.handle,x,re,$):w=await s._OrtRun(c,M,H,v,B,x,re,$),w!==0&&Ee("failed to call OrtRun().");let V=[],Z=[];cr("wasm ProcessOutputTensor");for(let G=0;G<x;G++){let Q=Number(s.getValue(re+G*u,"*"));if(Q===C[G]||T.includes(C[G])){V.push(o[G]),Q!==C[G]&&s._OrtReleaseTensor(Q)!==0&&Ee("Can't release tensor.");continue}let ue=s.stackSave(),ae=s.stackAlloc(4*u),_e=!1,fe,se=0;try{s._OrtGetTensorData(Q,ae,ae+u,ae+2*u,ae+3*u)!==0&&Ee(`Can't access output tensor data on index ${G}.`);let j=u===4?"i32":"i64",he=Number(s.getValue(ae,j));se=s.getValue(ae+u,"*");let lt=s.getValue(ae+u*2,"*"),Ye=Number(s.getValue(ae+u*3,j)),nt=[];for(let rt=0;rt<Ye;rt++)nt.push(Number(s.getValue(lt+rt*u,j)));s._OrtFree(lt)!==0&&Ee("Can't free memory for tensor dims.");let Qe=nt.reduce((rt,Ue)=>rt*Ue,1);fe=Fn(he);let Wt=g?.outputPreferredLocations[t[G]];if(fe==="string"){if(Wt==="gpu-buffer"||Wt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let rt=[];for(let Ue=0;Ue<Qe;Ue++){let Ce=s.getValue(se+Ue*u,"*"),nr=s.getValue(se+(Ue+1)*u,"*"),To=Ue===Qe-1?void 0:nr-Ce;rt.push(s.UTF8ToString(Ce,To))}V.push([fe,nt,rt,"cpu"])}else if(Wt==="gpu-buffer"&&Qe>0){let rt=s.jsepGetBuffer;if(!rt)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Ue=rt(se),Ce=wr(he,Qe);if(Ce===void 0||!Va(fe))throw new Error(`Unsupported data type: ${fe}`);_e=!0,V.push([fe,nt,{gpuBuffer:Ue,download:s.jsepCreateDownloader(Ue,Ce,fe),dispose:()=>{s._OrtReleaseTensor(Q)!==0&&Ee("Can't release tensor.")}},"gpu-buffer"])}else if(Wt==="ml-tensor"&&Qe>0){let rt=s.webnnEnsureTensor,Ue=s.webnnIsGraphInputOutputTypeSupported;if(!rt||!Ue)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(wr(he,Qe)===void 0||!Fa(fe))throw new Error(`Unsupported data type: ${fe}`);if(!Ue(r,fe,!1))throw new Error(`preferredLocation "ml-tensor" for ${fe} output is not supported by current WebNN Context.`);let nr=await rt(r,se,he,nt,!1);_e=!0,V.push([fe,nt,{mlTensor:nr,download:s.webnnCreateMLTensorDownloader(se,fe),dispose:()=>{s.webnnReleaseTensorId(se),s._OrtReleaseTensor(Q)}},"ml-tensor"])}else if(Wt==="ml-tensor-cpu-output"&&Qe>0){let rt=s.webnnCreateMLTensorDownloader(se,fe)(),Ue=V.length;_e=!0,Z.push((async()=>{let Ce=[Ue,await rt];return s.webnnReleaseTensorId(se),s._OrtReleaseTensor(Q),Ce})()),V.push([fe,nt,[],"cpu"])}else{let rt=mo(fe),Ue=new rt(Qe);new Uint8Array(Ue.buffer,Ue.byteOffset,Ue.byteLength).set(s.HEAPU8.subarray(se,se+Ue.byteLength)),V.push([fe,nt,Ue,"cpu"])}}finally{s.stackRestore(ue),fe==="string"&&se&&s._free(se),_e||s._OrtReleaseTensor(Q)}}g&&!m&&(s._OrtClearBoundOutputs(g.handle)!==0&&Ee("Can't clear bound outputs."),Kr.set(r,[c,p,h,g,m,!1]));for(let[G,Q]of await Promise.all(Z))V[G][2]=Q;return dr("wasm ProcessOutputTensor"),V}finally{s.webnnOnRunEnd?.(c),s.stackRestore(W),P.forEach(w=>s._OrtReleaseTensor(w)),C.forEach(w=>s._OrtReleaseTensor(w)),R.forEach(w=>s._free(w)),$!==0&&s._OrtReleaseRunOptions($),O.forEach(w=>s._free(w));for(let w of a){let V=_o.get(w)-1;V===0?_o.delete(w):_o.set(w,V)}}},Ra=r=>{let e=Oe(),n=Kr.get(r);if(!n)throw new Error("invalid session id");let t=n[0],o=e._OrtEndProfiling(t);o===0&&Ee("Can't get an profile file name."),e._OrtFree(o)},za=r=>{let e=[];for(let n of r){let t=n[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var tr,Ut,oi,ys,_s,bs,ad,sd,vo,wo,hk,fT,hT,mT,gT,bT,yT,_T,vT,wT,vs=N(()=>{"use strict";ft();wc();_r();Pa();Ga();tr=()=>!!me.wasm.proxy&&typeof document<"u",oi=!1,ys=!1,_s=!1,sd=new Map,vo=(r,e)=>{let n=sd.get(r);n?n.push(e):sd.set(r,[e])},wo=()=>{if(oi||!ys||_s||!Ut)throw new Error("worker not ready")},hk=r=>{switch(r.data.type){case"init-wasm":oi=!1,r.data.err?(_s=!0,ad[1](r.data.err)):(ys=!0,ad[0]()),bs&&(URL.revokeObjectURL(bs),bs=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=sd.get(r.data.type);r.data.err?e.shift()[1](r.data.err):e.shift()[0](r.data.out);break}default:}},fT=async()=>{if(!ys){if(oi)throw new Error("multiple calls to 'initWasm()' detected.");if(_s)throw new Error("previous call to 'initWasm()' failed.");if(oi=!0,tr())return new Promise((r,e)=>{Ut?.terminate(),E_().then(([n,t])=>{try{Ut=t,Ut.onerror=i=>e(i),Ut.onmessage=hk,ad=[r,e];let o={type:"init-wasm",in:me};!o.in.wasm.wasmPaths&&(n||Tc)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Ut.postMessage(o),bs=n}catch(o){e(o)}},e)});try{await Ea(me.wasm),await Ca(me),ys=!0}catch(r){throw _s=!0,r}finally{oi=!1}}},hT=async r=>{if(tr())return wo(),new Promise((e,n)=>{vo("init-ep",[e,n]);let t={type:"init-ep",in:{epName:r,env:me}};Ut.postMessage(t)});await Da(me,r)},mT=async r=>tr()?(wo(),new Promise((e,n)=>{vo("copy-from",[e,n]);let t={type:"copy-from",in:{buffer:r}};Ut.postMessage(t,[r.buffer])})):Zo(r),gT=async(r,e)=>{if(tr()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return wo(),new Promise((n,t)=>{vo("create",[n,t]);let o={type:"create",in:{model:r,options:{...e}}},i=[];r instanceof Uint8Array&&i.push(r.buffer),Ut.postMessage(o,i)})}else return ka(r,e)},bT=async r=>{if(tr())return wo(),new Promise((e,n)=>{vo("release",[e,n]);let t={type:"release",in:r};Ut.postMessage(t)});Na(r)},yT=async r=>{if(tr())throw new Error("LoRA adapter is not supported for proxy.");let e=typeof r=="string"?await Ur(r):r;return dT(e)},_T=async r=>{if(tr())throw new Error("LoRA adapter is not supported for proxy.");pT(r)},vT=async(r,e,n,t,o,i,a)=>{if(tr()){if(a.length>0)throw new Error("LoRA adapter is not supported for proxy.");if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return wo(),new Promise((s,u)=>{vo("run",[s,u]);let l=n,c={type:"run",in:{sessionId:r,inputIndices:e,inputs:l,outputIndices:t,options:i}};Ut.postMessage(c,za(l))})}else return La(r,e,n,t,o,i,a)},wT=async r=>{if(tr())return wo(),new Promise((e,n)=>{vo("end-profiling",[e,n]);let t={type:"end-profiling",in:r};Ut.postMessage(t)});Ra(r)}});var xo,ud=N(()=>{"use strict";ft();vs();xo=class{async loadAdapter(e){gt(),this.adapterId=await yT(e),pt()}async dispose(){return _T(this.adapterId)}}});var xT,mk,ws,TT=N(()=>{"use strict";ft();ud();vs();pe();Oa();Ga();xT=(r,e)=>{switch(r.location){case"cpu":return[r.type,r.dims,r.data,"cpu"];case"gpu-buffer":return[r.type,r.dims,{gpuBuffer:r.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[r.type,r.dims,{mlTensor:r.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${r.location} for ${e()}`)}},mk=r=>{switch(r[3]){case"cpu":return new At(r[0],r[2],r[1]);case"gpu-buffer":{let e=r[0];if(!Va(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:n,download:t,dispose:o}=r[2];return At.fromGpuBuffer(n,{dataType:e,dims:r[1],download:t,dispose:o})}case"ml-tensor":{let e=r[0];if(!Fa(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:n,download:t,dispose:o}=r[2];return At.fromMLTensor(n,{dataType:e,dims:r[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${r[3]}`)}},ws=class{async fetchModelAndCopyToWasmMemory(e){return mT(await Ur(e))}async loadModel(e,n){gt();let t;typeof e=="string"?t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await gT(t,n),pt()}async dispose(){return bT(this.sessionId)}async run(e,n,t,o=[]){gt();let i=o.map(m=>{if(!(m instanceof xo))throw new Error("LoRA adapter was not created by the WebAssembly backend.");return m.adapterId}),a=[],s=[];Object.entries(e).forEach(m=>{let _=m[0],S=m[1],v=this.inputNames.indexOf(_);if(v===-1)throw new Error(`invalid input '${_}'`);a.push(S),s.push(v)});let u=[],l=[];Object.entries(n).forEach(m=>{let _=m[0],S=m[1],v=this.outputNames.indexOf(_);if(v===-1)throw new Error(`invalid output '${_}'`);u.push(S),l.push(v)});let c=a.map((m,_)=>xT(m,()=>`input "${this.inputNames[s[_]]}"`)),p=u.map((m,_)=>m?xT(m,()=>`output "${this.outputNames[l[_]]}"`):null),h=await vT(this.sessionId,s,c,l,p,t,i),g={};for(let m=0;m<h.length;m++)g[this.outputNames[l[m]]]=u[m]??mk(h[m]);return pt(),g}startProfiling(){}endProfiling(){wT(this.sessionId)}}});var ST={};Or(ST,{OnnxruntimeWebAssemblyBackend:()=>xs,initializeFlags:()=>IT,wasmBackend:()=>gk});var IT,xs,gk,$T=N(()=>{"use strict";ft();ud();vs();TT();_c();IT=()=>{(typeof me.wasm.initTimeout!="number"||me.wasm.initTimeout<0)&&(me.wasm.initTimeout=0);let r=me.wasm.simd;if(typeof r!="boolean"&&r!==void 0&&r!=="fixed"&&r!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${r}". Reset it to \`false\` and ignore SIMD feature checking.`),me.wasm.simd=!1),typeof me.wasm.proxy!="boolean"&&(me.wasm.proxy=!1),typeof me.wasm.trace!="boolean"&&(me.wasm.trace=!1),typeof me.wasm.numThreads!="number"||!Number.isInteger(me.wasm.numThreads)||me.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)me.wasm.numThreads=1;else{let e=typeof navigator>"u"?Jr("node:os").cpus().length:navigator.hardwareConcurrency;me.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},xs=class{async init(e){IT(),await fT(),await hT(e)}async createInferenceSessionHandler(e,n){Aa(n);let t=new ws;return await t.loadModel(e,n),t}async createLoraAdapterHandler(e){let n=new xo;return await n.loadAdapter(e),n}},gk=new xs});ft();ft();ft();var zf="1.31.1";var I7=Xs;{let r=(b_(),Yr(g_)).onnxjsBackend;lr("webgl",r,-10)}{let r=($T(),Yr(ST)).wasmBackend;lr("webgpu",r,5),lr("webnn",r,5),lr("cpu",r,10),lr("wasm",r,10)}Object.defineProperty(me.versions,"web",{value:zf,enumerable:!0});export{W2 as InferenceSession,H2 as LoraAdapter,vi as TRACE,cr as TRACE_EVENT_BEGIN,dr as TRACE_EVENT_END,gt as TRACE_FUNC_BEGIN,pt as TRACE_FUNC_END,At as Tensor,I7 as default,me as env,lr as registerBackend};
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/*! Bundled license information:

long/index.js:
long/umd/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=ort.all.bundle.min.mjs.map
