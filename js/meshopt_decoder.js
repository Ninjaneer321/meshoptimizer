// This file is part of meshoptimizer library and is distributed under the terms of MIT License.
// Copyright (C) 2016-2022, by Arseny Kapoulkine (arseny.kapoulkine@gmail.com)
var MeshoptDecoder = (function() {
	"use strict";

	// Built with clang version 14.0.4 (https://github.com/llvm/llvm-project 29f1039a7285a5c3a9c353d054140bf2556d4c4d)
	// Built from meshoptimizer 0.18
	var wasm_base = "B9h79tEBBBE8fV9gBB9gVUUUUUEU9gIUUUB9gEUEU9gIUUUEUIKQBEEEDDDILLVIEBEOWEUEC+Q/IEKR/LEdO9tw9t9vv95DBh9f9f939h79t9f9j9h229f9jT9vv7BB8a9tw79o9v9wT9f9kw9j9v9kw9WwvTw949C919m9mwvBEy9tw79o9v9wT9f9kw9j9v9kw69u9kw949C919m9mwvBDe9tw79o9v9wT9f9kw9j9v9kw69u9kw949Twg91w9u9jwBIl9tw79o9v9wT9f9kw9j9v9kws9p2Twv9P9jTBLk9tw79o9v9wT9f9kw9j9v9kws9p2Twv9R919hTBVl9tw79o9v9wT9f9kw9j9v9kws9p2Twvt949wBOL79iv9rBRQ+p8yQDBK/3SEZU8jJJJJBCJ/EB9rGV8kJJJJBC9+HODNADCEFAL0MBCUHOAIrBBC+gE9HMBAVAIALFGRAD9rADZ1JJJBHWCJ/ABAD9uHOAICEFHLDNADtMBAOC/wfBgGOCJDAOCJD6eHdCBHQINAQAE9PMEAdAEAQ9rAQAdFAE6eGKCSFGOCL4CIFCD4HXDNDNDNDNAOC9wgGMtMBCBHpCEHSAWCJDFHZALHhINARAh9rAX6MIDNARAhAXFGL9rCk6MBCZHOINAWCJ/CBFAOGIFGOC9wFHoDNDNDNDNDNAhAIC9wFGaCO4FrBBAaCI4COg4CIgpLBEDIBKAo9CB83IBAoCWF9CB83IBXIKAoALrBLALrBBGaCO4GcAcCIsGce86BBAOCgFALCLFAcFGorBBAaCL4CIgGcAcCIsGce86BBAOCvFAoAcFGorBBAaCD4CIgGcAcCIsGce86BBAOC7FAoAcFGorBBAaCIgGaAaCIsGae86BBAOCTFAoAaFGarBBALrBEGoCO4GcAcCIsGce86BBAOC91FAaAcFGarBBAoCL4CIgGcAcCIsGce86BBAOC4FAaAcFGarBBAoCD4CIgGcAcCIsGce86BBAOC93FAaAcFGarBBAoCIgGoAoCIsGoe86BBAOC94FAaAoFGarBBALrBDGoCO4GcAcCIsGce86BBAOC95FAaAcFGarBBAoCL4CIgGcAcCIsGce86BBAOC96FAaAcFGarBBAoCD4CIgGcAcCIsGce86BBAOC97FAaAcFGarBBAoCIgGoAoCIsGoe86BBAOC98FAaAoFGorBBALrBIGLCO4GaAaCIsGae86BBAOC99FAoAaFGorBBALCL4CIgGaAaCIsGae86BBAOC9+FAoAaFGorBBALCD4CIgGaAaCIsGae86BBAOCUFAoAaFGOrBBALCIgGLALCIsGLe86BBAOALFHLXDKAoALrBWALrBBGaCL4GcAcCSsGce86BBAOCgFALCWFAcFGorBBAaCSgGaAaCSsGae86BBAOCvFAoAaFGorBBALrBEGaCL4GcAcCSsGce86BBAOC7FAoAcFGorBBAaCSgGaAaCSsGae86BBAOCTFAoAaFGorBBALrBDGaCL4GcAcCSsGce86BBAOC91FAoAcFGorBBAaCSgGaAaCSsGae86BBAOC4FAoAaFGorBBALrBIGaCL4GcAcCSsGce86BBAOC93FAoAcFGorBBAaCSgGaAaCSsGae86BBAOC94FAoAaFGorBBALrBLGaCL4GcAcCSsGce86BBAOC95FAoAcFGorBBAaCSgGaAaCSsGae86BBAOC96FAoAaFGorBBALrBVGaCL4GcAcCSsGce86BBAOC97FAoAcFGorBBAaCSgGaAaCSsGae86BBAOC98FAoAaFGorBBALrBOGaCL4GcAcCSsGce86BBAOC99FAoAcFGorBBAaCSgGaAaCSsGae86BBAOC9+FAoAaFGorBBALrBRGLCL4GaAaCSsGae86BBAOCUFAoAaFGOrBBALCSgGLALCSsGLe86BBAOALFHLXEKAoAL8pBB83BBAoCWFALCWF8pBB83BBALCZFHLKDNAIAM9PMBAICZFHOARAL9rCl0MEKKAIAM6MIALtMIDNAKtMBAWApFrBBHoCBHOAZHIINAIAWCJ/CBFAOFrBBGaCE4CBAaCEg9r7AoFGo86BBAIADFHIAOCEFGOAK9HMBKKAZCEFHZApCEFGpAD6HSALHhApAD9HMEXVKKCBHLASCEgMDXIKALAXAD2FHcDNAKtMBCBHhCEHSAWCJDFHMINARAL9rAX6MIALtMDALAXFHLAWAhFrBBHoCBHOAMHIINAIAWCJ/CBFAOFrBBGaCE4CBAaCEg9r7AoFGo86BBAIADFHIAOCEFGOAK9HMBKAMCEFHMAhCEFGhAD6HSAhAD9HMBKAcHLXIKCBHOCEHSINARAL9rAX6MDALtMEALAXFHLAOCEFGOAD6HSADAO9HMBKAcHLXDKCBHLASCEgtMEKC9+HOXIKABAQAD2FAWCJDFAKAD2Z1JJJB8aAWAWCJDFAKCUFAD2FADZ1JJJB8aAKAQFHQALMBKC9+HOXEKCBC99ARAL9rADCAADCA0eseHOKAVCJ/EBF8kJJJJBAOK/YZEhU8jJJJJBC/AE9rGV8kJJJJBC9+HODNAECI9uGRChFAL0MBCUHOAIrBBGWC/wEgC/gE9HMBAWCSgGdCE0MBAVC/ABFCfECJEZ+JJJJB8aAVCuF9CU83IBAVC8wF9CU83IBAVCYF9CU83IBAVCAF9CU83IBAVCkF9CU83IBAVCZF9CU83IBAV9CU83IWAV9CU83IBAIALFC9wFHQAICEFGWARFHODNAEtMBCMCSAdCEseHKCBHXCBHMCBHdCBHICBHLINDNAOAQ9NMBC9+HOXIKDNDNAWrBBGRC/vE0MBAVC/ABFALARCL4CU7FCSgCITFGpYDLHSApYDBHZDNARCSgGpAK9PMBAVAIARCU7FCSgCDTFYDBAXApeHRAptHpDNDNADCD9HMBABAdCETFGhAZ87EBAhCDFAS87EBAhCLFAR87EBXEKABAdCDTFGhAZbDBAhCLFASbDBAhCWFARbDBKAXApFHXAVC/ABFALCITFGhARbDBAhASbDLAVAICDTFARbDBAVC/ABFALCEFCSgGLCITFGhAZbDBAhARbDLAIApFHIALCEFHLXDKDNDNApCSsMBAMApFApC987FCEFHMXEKAOCEFHRAO8sBBGpCfEgHhDNDNApCU9MMBARHOXEKAOCVFHOAhCfBgHhCRHpDNINAR8sBBGoCfBgApTAhvHhAoCU9KMEARCEFHRApCRFGpC8j9HMBXDKKARCEFHOKAhCE4CBAhCEg9r7AMFHMKDNDNADCD9HMBABAdCETFGRAZ87EBARCDFAS87EBARCLFAM87EBXEKABAdCDTFGRAZbDBARCLFASbDBARCWFAMbDBKAVC/ABFALCITFGRAMbDBARASbDLAVAICDTFAMbDBAVC/ABFALCEFCSgGLCITFGRAZbDBARAMbDLAICEFHIALCEFHLXEKDNARCPE0MBAXCEFGoAVAIAQARCSgFrBBGpCL49rCSgCDTFYDBApCZ6GheHRAVAIAp9rCSgCDTFYDBAoAhFGSApCSgGoeHpAotHoDNDNADCD9HMBABAdCETFGZAX87EBAZCDFAR87EBAZCLFAp87EBXEKABAdCDTFGZAXbDBAZCLFARbDBAZCWFApbDBKAVAICDTFAXbDBAVC/ABFALCITFGZARbDBAZAXbDLAVAICEFGICSgCDTFARbDBAVC/ABFALCEFCSgCITFGZApbDBAZARbDLAVAIAhFCSgGICDTFApbDBAVC/ABFALCDFCSgGLCITFGRAXbDBARApbDLALCEFHLAIAoFHIASAoFHXXEKAXCBAOrBBGZeGaARC/+EsGRFHSAZCSgHcAZCL4HxDNDNAZCS0MBASCEFHoXEKASHoAVAIAx9rCSgCDTFYDBHSKDNDNAcMBAoCEFHXXEKAoHXAVAIAZ9rCSgCDTFYDBHoKDNDNARtMBAOCEFHRXEKAOCDFHRAO8sBEGhCfEgHpDNAhCU9KMBAOCOFHaApCfBgHpCRHODNINAR8sBBGhCfBgAOTApvHpAhCU9KMEARCEFHRAOCRFGOC8j9HMBKAaHRXEKARCEFHRKApCE4CBApCEg9r7AMFGMHaKDNDNAxCSsMBARHpXEKARCEFHpAR8sBBGOCfEgHhDNAOCU9KMBARCVFHSAhCfBgHhCRHODNINAp8sBBGRCfBgAOTAhvHhARCU9KMEApCEFHpAOCRFGOC8j9HMBKASHpXEKApCEFHpKAhCE4CBAhCEg9r7AMFGMHSKDNDNAcCSsMBApHOXEKApCEFHOAp8sBBGRCfEgHhDNARCU9KMBApCVFHoAhCfBgHhCRHRDNINAO8sBBGpCfBgARTAhvHhApCU9KMEAOCEFHOARCRFGRC8j9HMBKAoHOXEKAOCEFHOKAhCE4CBAhCEg9r7AMFGMHoKDNDNADCD9HMBABAdCETFGRAa87EBARCDFAS87EBARCLFAo87EBXEKABAdCDTFGRAabDBARCLFASbDBARCWFAobDBKAVC/ABFALCITFGRASbDBARAabDLAVAICDTFAabDBAVC/ABFALCEFCSgCITFGRAobDBARASbDLAVAICEFGICSgCDTFASbDBAVC/ABFALCDFCSgCITFGRAabDBARAobDLAVAIAZCZ6AxCSsvFGICSgCDTFAobDBAIActAcCSsvFHIALCIFHLKAWCEFHWALCSgHLAICSgHIAdCIFGdAE6MBKKCBC99AOAQseHOKAVC/AEF8kJJJJBAOK+LLEVU8jJJJJBCZ9rHVC9+HODNAECVFAL0MBCUHOAIrBBC/+EgC/QE9HMBAV9CB83IWAICEFHRAIALFC98FHWDNAEtMBDNADCDsMBCBHdINDNARAW6MBC9+SKARCEFHOAR8sBBGLCfEgHIDNDNALCU9MMBAOHRXEKARCVFHRAICfBgHICRHLDNINAO8sBBGDCfBgALTAIvHIADCU9KMEAOCEFHOALCRFGLC8j9HMBXDKKAOCEFHRKABAdCDTFAICD4CBAICE4CEg9r7AVCWFAICEgCDTvGOYDBFGLbDBAOALbDBAdCEFGdAE9HMBXDKKCBHdINDNARAW6MBC9+SKARCEFHOAR8sBBGLCfEgHIDNDNALCU9MMBAOHRXEKARCVFHRAICfBgHICRHLDNINAO8sBBGDCfBgALTAIvHIADCU9KMEAOCEFHOALCRFGLC8j9HMBXDKKAOCEFHRKABAdCETFAICD4CBAICE4CEg9r7AVCWFAICEgCDTvGOYDBFGL87EBAOALbDBAdCEFGdAE9HMBKKCBC99ARAWseHOKAOK+lVOEUE99DUD99EUD99DNDNADCL9HMBAEtMEINDNDNABCDFGD8sBB+yAB8sBBGI+yGL+L+TABCEFGV8sBBGO+yGR+L+TGWjBB/+9CAWAWnjBBBBAWAWjBBBB9gGdeGQ+MGKAQAICB9IeALmGWAWnAKAQAOCB9IeARmGQAQnmm+R+VGLnjBBBzjBBB+/AdemGR+LjBBB9P9dtMBAR+oHIXEKCJJJJ94HIKADAI86BBDNDNAQALnjBBBzjBBB+/AQjBBBB9gemGQ+LjBBB9P9dtMBAQ+oHDXEKCJJJJ94HDKAVAD86BBDNDNAWALnjBBBzjBBB+/AWjBBBB9gemGW+LjBBB9P9dtMBAW+oHDXEKCJJJJ94HDKABAD86BBABCLFHBAECUFGEMBXDKKAEtMBINDNDNABCLFGD8uEB+yAB8uEBGI+yGL+L+TABCDFGV8uEBGO+yGR+L+TGWjB/+fsAWAWnjBBBBAWAWjBBBB9gGdeGQ+MGKAQAICB9IeALmGWAWnAKAQAOCB9IeARmGQAQnmm+R+VGLnjBBBzjBBB+/AdemGR+LjBBB9P9dtMBAR+oHIXEKCJJJJ94HIKADAI87EBDNDNAQALnjBBBzjBBB+/AQjBBBB9gemGQ+LjBBB9P9dtMBAQ+oHDXEKCJJJJ94HDKAVAD87EBDNDNAWALnjBBBzjBBB+/AWjBBBB9gemGW+LjBBB9P9dtMBAW+oHDXEKCJJJJ94HDKABAD87EBABCWFHBAECUFGEMBKKK/SILIUI99IUE99DNAEtMBCBHIABHLINDNDNj/zL81zALCOF8uEBGVCIv+y+VGOAL8uEB+ynGRjB/+fsnjBBBzjBBB+/ARjBBBB9gemGW+LjBBB9P9dtMBAW+oHdXEKCJJJJ94HdKALCLF8uEBHQALCDF8uEBHKABAVCEFCIgAIvCETFAd87EBDNDNAOAK+ynGWjB/+fsnjBBBzjBBB+/AWjBBBB9gemGX+LjBBB9P9dtMBAX+oHKXEKCJJJJ94HKKABAVCDFCIgAIvCETFAK87EBDNDNAOAQ+ynGOjB/+fsnjBBBzjBBB+/AOjBBBB9gemGX+LjBBB9P9dtMBAX+oHQXEKCJJJJ94HQKABAVCUFCIgAIvCETFAQ87EBDNDNjBBJzARARn+TAWAWn+TAOAOn+TGRjBBBBARjBBBB9ge+RjB/+fsnjBBBzmGR+LjBBB9P9dtMBAR+oHQXEKCJJJJ94HQKABAVCIgAIvCETFAQ87EBALCWFHLAICLFHIAECUFGEMBKKK9MBDNADCD4AE2GEtMBINABABYDBGDCWTCW91+yADCE91CJJJ/8IFCJJJ98g++nuDBABCLFHBAECUFGEMBKKK9TEIUCBCBYDJ1JJBGEABCIFC98gFGBbDJ1JJBDNDNABzBCZTGD9NMBCUHIABAD9rCffIFCZ4NBCUsMEKAEHIKAIK/lEEEUDNDNAEABvCIgtMBABHIXEKDNDNADCZ9PMBABHIXEKABHIINAIAEYDBbDBAICLFAECLFYDBbDBAICWFAECWFYDBbDBAICXFAECXFYDBbDBAICZFHIAECZFHEADC9wFGDCS0MBKKADCL6MBINAIAEYDBbDBAECLFHEAICLFHIADC98FGDCI0MBKKDNADtMBINAIAErBB86BBAICEFHIAECEFHEADCUFGDMBKKABK/AEEDUDNDNABCIgtMBABHIXEKAECfEgC+B+C+EW2HLDNDNADCZ9PMBABHIXEKABHIINAIALbDBAICXFALbDBAICWFALbDBAICLFALbDBAICZFHIADC9wFGDCS0MBKKADCL6MBINAIALbDBAICLFHIADC98FGDCI0MBKKDNADtMBINAIAE86BBAICEFHIADCUFGDMBKKABKKKEBCJWKLZ9kBB";
	var wasm_simd = "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";

	// Uses bulk-memory and simd extensions
	var detector = new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]);

	// Used to unpack wasm
	var wasmpack = new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);

	if (typeof WebAssembly !== 'object') {
		// This module requires WebAssembly to function
		return {
			supported: false,
		};
	}

	var wasm = wasm_base;

	if (WebAssembly.validate(detector)) {
		wasm = wasm_simd;
	}

	var instance;

	var promise =
		WebAssembly.instantiate(unpack(wasm), {})
		.then(function(result) {
			instance = result.instance;
			instance.exports.__wasm_call_ctors();
		});

	function unpack(data) {
		var result = new Uint8Array(data.length);
		for (var i = 0; i < data.length; ++i) {
			var ch = data.charCodeAt(i);
			result[i] = ch > 96 ? ch - 71 : ch > 64 ? ch - 65 : ch > 47 ? ch + 4 : ch > 46 ? 63 : 62;
		}
		var write = 0;
		for (var i = 0; i < data.length; ++i) {
			result[write++] = (result[i] < 60) ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
		}
		return result.buffer.slice(0, write);
	}

	function decode(fun, target, count, size, source, filter) {
		var sbrk = instance.exports.sbrk;
		var count4 = (count + 3) & ~3; // pad for SIMD filter
		var tp = sbrk(count4 * size);
		var sp = sbrk(source.length);
		var heap = new Uint8Array(instance.exports.memory.buffer);
		heap.set(source, sp);
		var res = fun(tp, count, size, sp, source.length);
		if (res == 0 && filter) {
			filter(tp, count4, size);
		}
		target.set(heap.subarray(tp, tp + count * size));
		sbrk(tp - sbrk(0));
		if (res != 0) {
			throw new Error("Malformed buffer data: " + res);
		}
	}

	var filters = {
		// legacy index-based enums for glTF
		0: "",
		1: "meshopt_decodeFilterOct",
		2: "meshopt_decodeFilterQuat",
		3: "meshopt_decodeFilterExp",
		// string-based enums for glTF
		NONE: "",
		OCTAHEDRAL: "meshopt_decodeFilterOct",
		QUATERNION: "meshopt_decodeFilterQuat",
		EXPONENTIAL: "meshopt_decodeFilterExp",
	};

	var decoders = {
		// legacy index-based enums for glTF
		0: "meshopt_decodeVertexBuffer",
		1: "meshopt_decodeIndexBuffer",
		2: "meshopt_decodeIndexSequence",
		// string-based enums for glTF
		ATTRIBUTES: "meshopt_decodeVertexBuffer",
		TRIANGLES: "meshopt_decodeIndexBuffer",
		INDICES: "meshopt_decodeIndexSequence",
	};

	var workers = [];
	var requestId = 0;

	function createWorker(url) {
		var worker = {
			worker: new Worker(url),
			pending: 0,
			requests: {}
		};

		worker.worker.onmessage = function(event) {
			var data = event.data;

			worker.pending -= data.count;

			if (data.error) {
				worker.requests[data.id].reject(data.error);
			} else {
				worker.requests[data.id].resolve(data.target);
			}

			delete worker.requests[data.id];
		};

		return worker;
	}

	function initWorkers(count) {
		var source = `
var wasm = new Uint8Array([${new Uint8Array(unpack(wasm)).toString()}]);
var instance;

var promise =
	WebAssembly.instantiate(wasm, {})
	.then(function(result) {
		instance = result.instance;
		instance.exports.__wasm_call_ctors();
	});

${decode.toString()}
${processWorker.toString()}

self.onmessage = processWorker;
`;

		var blob = new Blob([source], {type: 'text/javascript'});
		var url = URL.createObjectURL(blob);

		for (var i = 0; i < count; ++i) {
			workers[i] = createWorker(url);
		}

		URL.revokeObjectURL(url);
	}

	function decodeWorker(count, size, source, mode, filter) {
		var worker = workers[0];

		for (var i = 1; i < workers.length; ++i) {
			if (workers[i].pending < worker.pending) {
				worker = workers[i];
			}
		}

		var id = requestId++;
		worker.pending += count;

		var data = new Uint8Array(source);

		return new Promise(function (resolve, reject) {
			worker.requests[id] = { resolve, reject };
			worker.worker.postMessage({ id, count, size, source: data, mode, filter }, [ data.buffer ]);
		});
	}

	function processWorker(event) {
		var data = event.data;
		var target = new Uint8Array(data.count * data.size);

		promise.then(function() {
			try {
				decode(instance.exports[data.mode], target, data.count, data.size, data.source, instance.exports[data.filter]);
				self.postMessage({ id: data.id, count: data.count, target }, [ target.buffer ]);
			} catch (error) {
				self.postMessage({ id: data.id, count: data.count, error });
			}
		});
	}

	return {
		ready: promise,
		supported: true,
		useWorkers: function(count) {
			initWorkers(count);
		},
		decodeVertexBuffer: function(target, count, size, source, filter) {
			decode(instance.exports.meshopt_decodeVertexBuffer, target, count, size, source, instance.exports[filters[filter]]);
		},
		decodeIndexBuffer: function(target, count, size, source) {
			decode(instance.exports.meshopt_decodeIndexBuffer, target, count, size, source);
		},
		decodeIndexSequence: function(target, count, size, source) {
			decode(instance.exports.meshopt_decodeIndexSequence, target, count, size, source);
		},
		decodeGltfBuffer: function(target, count, size, source, mode, filter) {
			decode(instance.exports[decoders[mode]], target, count, size, source, instance.exports[filters[filter]]);
		},
		decodeGltfBufferAsync: function(count, size, source, mode, filter) {
			if (workers.length > 0) {
				return decodeWorker(count, size, source, decoders[mode], filters[filter]);
			}

			return promise.then(function() {
				var target = new Uint8Array(count * size);
				decode(instance.exports[decoders[mode]], target, count, size, source, instance.exports[filters[filter]]);
				return target;
			});
		}
	};
})();

// UMD-style export
if (typeof exports === 'object' && typeof module === 'object')
	module.exports = MeshoptDecoder;
else if (typeof define === 'function' && define['amd'])
	define([], function() {
		return MeshoptDecoder;
	});
else if (typeof exports === 'object')
	exports["MeshoptDecoder"] = MeshoptDecoder;
else
	(typeof self !== 'undefined' ? self : this).MeshoptDecoder = MeshoptDecoder;
