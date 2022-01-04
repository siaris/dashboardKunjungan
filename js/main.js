const modal_jasa_app = Vue.component('modal', {
  template: '#modal-jasa',
  data() {
	return{
			detail_reg: []
		}
	},
	mounted() {
		this.simpanDetailReg()
		this.fetchJasa()
		return
	},
	methods:{
		simpanDetailReg(){
			for(kunj of ndx.allFiltered()){
				kunj.id_id = kunj.id
				this.detail_reg.push(kunj.id_id)
				app.detail_reg_obj_filtered[kunj.id_id] = {}
				app.detail_reg_obj_filtered[kunj.id_id]['rm'] = kunj.rm 
				app.detail_reg_obj_filtered[kunj.id_id]['nreg'] = kunj.rm
				app.detail_reg_obj_filtered[kunj.id_id]['k_b'] = kunj.k_b
			}
			return
		},
		fetchJasa(){
			var data = new FormData();
			data.append('detail_reg', this.detail_reg);
			if(statusDimension.currentFilter() == '0'){
				data.append('jasa_utk_batal', '0');
			}
			axios.post(BASEURL+'/hidden/tools/load_data_jasa/', data, {crossdomain: false})
			.then((resp) => {
				if(resp.data.length > 0){
					generateJasaChart(resp.data)
				}else{
					
				}
			})
			
		},
	}
})
const modal_pendaftaran_app = Vue.component('modal_p', {
  template: '#modal-pendaftaran',
  data() {
	return{
			detail_reg: []
		}
	},
	mounted() {
		this.simpanDetailReg()
		this.fetchPendaftaran()
		return
	},
	methods:{
		simpanDetailReg(){
			for(kunj of ndx.allFiltered()){
				kunj.id_id = kunj.id
				this.detail_reg.push(kunj.id_id)
				app.detail_reg_obj_filtered[kunj.id_id] = {}
				app.detail_reg_obj_filtered[kunj.id_id]['rm'] = kunj.rm 
				app.detail_reg_obj_filtered[kunj.id_id]['nreg'] = kunj.rm
				app.detail_reg_obj_filtered[kunj.id_id]['k_b'] = kunj.k_b
			}
			return
		},
		fetchPendaftaran(){
			var data = new FormData();
			data.append('detail_reg', this.detail_reg);
			axios.post(BASEURL+'/hidden/tools/load_data_pendaftaran/', data, {crossdomain: false})
			.then((resp) => {
				if(resp.data.length > 0){
					generatePendaftaranChart(resp.data)
				}else{
					
				}
			})
			
		},
	}
})
const modal_pasien_app = Vue.component('modal_psn', {
  template: '#modal-pasien',
  data() {
	return{
			list_id: {
				rm: [],
				detail_reg: []
			},
			mergeRM: []
		}
	},
	mounted() {
		// this.mergeRMExist()
		this.simpanDetailReg()
		this.fetchPendaftaran()
		return
	},
	methods:{
		mergeRMExist(){
			if(!isObjEmpty(rm_mute)){
				for(rmm of rm_mute){
					this.mergeRM.push(rmm.rm)
				}
			}
			if(!isObjEmpty(rm_now)){
				for(rmn of rm_now){
					this.mergeRM.push(rmn.rm)
				}
			}
			return
		},
		simpanDetailReg(){
			for(kunj of ndx.allFiltered()){
				this.list_id.rm.push(kunj.rm)
				kunj.id_id = kunj.id
				this.list_id.detail_reg.push(kunj.id_id)
				app.detail_reg_obj_filtered[kunj.id_id] = {}
				app.detail_reg_obj_filtered[kunj.id_id]['rm'] = kunj.rm 
				app.detail_reg_obj_filtered[kunj.id_id]['nreg'] = kunj.rm
				app.detail_reg_obj_filtered[kunj.id_id]['k_b'] = kunj.k_b
			}
			return
		},
		fetchPendaftaran(){
			var data = new FormData();
			data.append('list_detail_reg', this.list_id.detail_reg);
			data.append('list_rm', this.list_id.rm);
			axios.post(BASEURL+'/hidden/tools/load_data_pasien/', data, {crossdomain: false})
			.then((resp) => {
				if(resp.data.length > 0){
					generatePasienChart(resp.data)
				}else{
					
				}
			})
			
		},
	}
})
const modal_pelunasan = Vue.component('modal_plnsn', {
  template: '#modal-pelunasan',
  data() {
	return{
			allReg:[],
			rg:[],
			mx: 500,
			btn:{
				jkn : '<input type="button" id="klaim-jkn-farmasi" class="btn hide" value="Show Klaim Farmasi JKN">'
			},
			rsJKN:{}
		}
	},
	mounted() {
		this.simpanReg()
		//this.simpanReg19()
		this.fetchTran()
		return
	},
	methods:{
		simpanReg19(){
			app.result.tRS = parseFloat($('#total-perolehan span').text().replace(/,/g,''))
			var rF = []
			axios.post(BASEURL+'/hidden/tools/lDK/', null, {crossdomain: false})
			.then((resp) => {
				
				
				var r = []
				for(i of resp.data[0]){
					r.push(i.n)
				}
				
				this.allReg = r
				if(r.length > this.mx){
					let it = Math.floor(r.length/this.mx)
					let sisa = r.length % this.mx;
					let k = 0
					for(i=0;i < it;i++ ){
						this.rg[i] = []
						var arr = []
						for(j=k;j <((i*this.mx)+this.mx) ;j++){
							arr.push(r[k])
							k += 1
						}
						this.rg[i] = arr
					}
					arr = []
					if(sisa > 0){
						this.rg[it] = []
						for(j=0;j<sisa;j++)
							arr.push(r[(it*this.mx)+j])
						this.rg[it] = arr
					}
				}else{
					this.rg[0] = []
					this.rg[0] = r
				}
				app.resPelunasan = []
				this.fetchTran()
			})
		},
		simpanReg(){
			app.result.tRS = parseFloat($('#total-perolehan span').text().replace(/,/g,''))
			var rF = []
			for(kunj of ndx.allFiltered()){
				rF.push(kunj.reg)
			}
			
			var r = rF.filter(function (x, i, a) { 	return a.indexOf(x) == i; })
			this.allReg = r
			if(r.length > this.mx){
				let it = Math.floor(r.length/this.mx)
				let sisa = r.length % this.mx;
				let k = 0
				for(i=0;i < it;i++ ){
					this.rg[i] = []
					var arr = []
					for(j=k;j <((i*this.mx)+this.mx) ;j++){
						arr.push(r[k])
						k += 1
					}
					this.rg[i] = arr
				}
				arr = []
				if(sisa > 0){
					this.rg[it] = []
					for(j=0;j<sisa;j++)
						arr.push(r[(it*this.mx)+j])
					this.rg[it] = arr
				}
			}else{
				this.rg[0] = []
				this.rg[0] = r
			}
			app.resPelunasan = []

			return
		},
		async fetchTran(){
			let rT = ''
			let tT = 0
			let aR = this.allReg  
			let noTgh = []
			
			//d.data.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			rT += '- nominal tarif RS : '+app.result.tRS.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'<br>- nominal penagihan : <span id="tghn">0</span> (bisa lebih besar karena termasuk semua instalasi dlm satu register)<br>- register belum penagihan : <span id="not-yet-tgh"></span><br><span id="act-button"><span id="jkn-only"></span></span><br><div id="tab-rslt"></div>'
			$('#modal-list-pelunasan .modal-body').prepend(rT)
			
			const sleep = ms => {
			  return new Promise(resolve => setTimeout(resolve, ms))
			}
			const getData = data => {
			  //var rsJ = this.rsJKN 
			  return sleep(2000).then(v => {
				var d = new FormData()
				d.append('nr', data);
				axios.post(BASEURL+'/laporan/data_rumah_sakit/load_penagihan/', d, {crossdomain: false})
				.then((resp) => {
					if(resp.data.length > 0){
						let t = 0
						let bfr = parseFloat($('#tghn').text().replace(/,/g,''))
						//hitung total
						for(i in resp.data){
							app.resPelunasan.push(resp.data[i])
							tR = resp.data[i]['nr']
							data = data.filter(function(e) { return e !== tR })
							t += parseFloat(resp.data[i]['t'])
							if(typeof resp.data[i]['jrs'] !== 'undefined'){
								let ky = resp.data[i]['jr']+resp.data[i]['jd']
								if(ky in app.result.inJKN){
									//allcost & jumlah
									app.result.inJKN[ky]['o'] += (typeof resp.data[i]['jO'] === 'undefined')?0:parseFloat(resp.data[i]['jO'])
									app.result.inJKN[ky]['a'] += (typeof resp.data[i]['jA'] === 'undefined')?0:parseFloat(resp.data[i]['jA'])
									app.result.inJKN[ky]['r'] += parseFloat(resp.data[i]['jrs'])
									app.result.inJKN[ky]['c'] += parseFloat(resp.data[i]['jin'])
									app.result.inJKN[ky]['k'] += 1
									//LOS
									app.result.inJKN[ky]['L'] += parseFloat(resp.data[i]['jlr'])
								}else{
									//init
									app.result.inJKN[ky] = {
										'o':0,
										'a':0,
										'r':0,
										'c':0,
										'k':0,
										'L':0
									}
									//allcost
									app.result.inJKN[ky]['o'] = (typeof resp.data[i]['jO'] === 'undefined')?0:parseFloat(resp.data[i]['jO'])
									app.result.inJKN[ky]['a'] = (typeof resp.data[i]['jA'] === 'undefined')?0:parseFloat(resp.data[i]['jA'])
									app.result.inJKN[ky]['r'] = parseFloat(resp.data[i]['jrs'])
									app.result.inJKN[ky]['c'] = parseFloat(resp.data[i]['jin'])
									app.result.inJKN[ky]['k'] = 1
									//LOS
									app.result.inJKN[ky]['L'] = parseFloat(resp.data[i]['jlr'])
								}
								tx = ($('#jkn-only').html() == '')?this.btn.jkn:''
								$('#jkn-only').append(tx)
							}
						}
						bfr += parseFloat(t)
						$('#tghn').text(bfr.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
					}
					apnd = ($('#not-yet-tgh').text() == '')?'':', '	
					console.log(data)					
					$('#not-yet-tgh').append(apnd+implode(', ',data.map( v => '<a target="blank" href="'+BASEURL+'/billing/draft_tagihan/'+v+'">'+v+'</a>')))
					
					return data
				})
			  })
			}
			
			for(i in this.rg){
				let d = await getData(this.rg[i])
				//console.log(d)
				//render
			}
			alert('data penagihan selesai diambil dari server')
			klaimJKNF.init()
			
			return
		},
	}
})

var modalInstalasi = Vue.component('modal_info_ins', {
  template: '#smodal-info-ins',
  data() {
	return{
			allReg:[],
			rg:[],
			mx: 500
		}
	},
	mounted() {
		this.simpanReg()
		this.fetchTran(app.report.instalasi)
		return
	},
	methods:{
		simpanReg(){
			app.result.tRS = parseFloat($('#total-perolehan span').text().replace(/,/g,''))
			var rF = []
			for(kunj of ndx.allFiltered()){
				rF.push(kunj.id)
			}
			
			var r = rF.filter(function (x, i, a) { 	return a.indexOf(x) == i; })
			this.allReg = r

			return
		},
		async fetchTran(ins){
			switch(ins){
			case '3' :
			
			//new index
			ndx_3 = crossfilter(ndx.allFiltered())
			PIi = ndx_3.dimension(d => d.tg)
			POi = ndx_3.dimension(d => d.tP)
			PIig = PIi.group().reduceCount()
			POig = POi.group().reduceCount()
			A = {}
			for(o of PIig.all())
				if(typeof o !== 'undefined'){
					A[o.key] = {}
					A[o.key]['m'] = o.value
				}
			for(o of POig.all())
				if(typeof A[o.key] === 'undefined') console.info(o.key)
				else
					if(typeof o !== 'undefined' )
						if(o.key != ''){
							A[o.key]['k'] = -1*o.value
						}
			console.info(A)	
			break
			
			
			default :
			let rT = ''
			let tT = 0
			let aR = this.allReg  
			let noTgh = []
			
			var detectDescCaraBayarRegister = function(){
				function inti(RM,CB){
					let isc19 = 'N'
					let isrujukan = 'n'
					if(RM.attr_tambahan.includes('spgdt_id')) isrujukan = 'r'
					if(CB.includes('_12345844')) isc19 = 'C'
					return isc19+isrujukan
				}
				return{
					init: inti
				}
			}()
			
			rT += '<div id="tab-rslt"></div>'
			$('#modal-info-ins .modal-body').prepend(rT)
			
			// const sleep = ms => {
			  // return new Promise(resolve => setTimeout(resolve, ms))
			// }
			 
			var d = new FormData()
			d.append('nr', aR);
			axios.post(BASEURL+'/laporan/data_rumah_sakit/load_info_igd/', d, {crossdomain: false})
			.then((resp) => {
					let Text = '<table id="tabExport" class="table table-striped table-bordered "><tr><th>NAMA</th><th>AlASAN KELUAR</th><th>SATURASI@TRIASE</th></tr>'
					let D = resp.data
					
					var getSatu = function(){
						function inti(Ob){
							if(typeof Ob !== 'undefined'){
								for(i of Ob)
									if(in_array(i.kode,['RM-B01','RM-B01-A'])){
										let P = JSON.parse(i.json_result)
										return P.nama+' / '+P.saturasi_oksigen
									}
									
							}
							return 'tanpa triase'
						}
						return{
							init: inti
						}
					}()
					
					for(i in D){
						Text += '<tr><td>['+D[i]['no_rm']+']'+D[i]['nama']+'</td><td>'+D[i]['alasan_keluar']+'</td><td>'+getSatu.init(D[i]['emr'])+'</td></tr>'
					}
					Text += '</table>'
					Text += '<div><input type="button" id="export-table" value="Export Saturasi @ Triase"></div>'
					
					
					
					let indx = JSON.parse(JSON.stringify(ndx.allFiltered()))
					
					for(o of indx){
						o.dscRIgd = o.tg+'|'+detectDescCaraBayarRegister.init(D[o.id],o.cb)
					}
					
					ndx_4 = crossfilter(indx)
					PIi = ndx_4.dimension(d => d.dscRIgd)
					PIig = PIi.group().reduceCount()
					console.info(PIig.all())
					$('#tab-rslt').append(Text)
					
					exportTab.init()
					
					
			})
			  
			alert('data selesai diambil dari server')
			break
			}
			return
		},
	}
})

const app = new Vue({
	el:'#app',
	data() {
		return {
			arr_pre_pasien : ['space','minus','backticks','C','M','O','X',0,1,2,3,4,5,6,7,8,9],
			// arr_pre_pasien : ['space','C',8,9],
			// arr_pre_pasien : [1,2,3,4,5,6],
			all_jasa: {},
			all_ref_kunjungan: {},
			all_pasien_ref: {},
			all_pasien: {
				rm_no_numeric: []
			},
			report:{
				tgl_dari:"php:date('d-m-Y')",
				tgl_sampai:"php:date('d-m-Y')",
				instalasi:'',
				status_data:'Tidak Ada Data'
			},
			result:{
				tRS:0,
				tTghn:0,
				tLns:0,
				inJKN:{}
			},
			resPelunasan:[],
			modalJasa: false,
			modalPendaftaran: false,
			modalPelunasan: false,
			modalPasien: false,
			modalIgd: false,
			modalIn:{'4':false,'3':false},
			detail_reg_obj_filtered : {}
		}
	},
	mounted: function(){
		this.fetchDataRef()
		//this.fetchDatePicker()		
	},
	methods:{
		isShow(v){
			if(in_array(v,['4']))
				return ""
			return "hide"
		},
		isShowMins(v){
			if(in_array(v,['4','3']))
				return ""
			return "hide"
		},
		fetchDataRef(){
			//get jasa
			// this.fetchJasa()
			//get pasien
			// this.fetchPasien()
			//get referensi pasien
			this.fetchRefPasien()
			this.fetchRefKunjungan()
			this.fetchjasaMaster()
			//this.fetchIDTopo()
			// this.getRMMute()
		},
		fetchjasaMaster(){
			if(isObjEmpty(this.all_jasa)){
				foo = (PrimaSession.user_id == '3246')?'jasa_all':'all_jasa';
				axios.get(ROOTURL+'/devapi/api/master_ref_jasa/'+foo+'/',{ crossdomain: false })
				.then((resp) => {
					for(d of resp.data){
						this.all_jasa[d.id] = d.n;
					}
					this.all_jasa['Karcis'] = 'Karcis';
				})
			}
			return;
		},
		fetchRefPasien(){
			axios.get(ROOTURL+'/devapi/api/master_ref_personal/all_ref/',{ crossdomain: false })
			.then((resp) => {
				for(d of resp.data){
					this.all_pasien_ref[d.id] = d.n;
				}
				//klik submit init
				$('#do-load').click()
			})
			return;
		},fetchIDTopo(){
			axios.get(ROOTURL+'/dev/assets/topo.json',{ crossdomain: false })
			.then((resp) => {
				topo_id = resp.data
			})
			return;
		},
		getRMMute(){
			if (typeof localStorage.getItem('dashboard_RMMute') !== 'undefined') {
				rm_mute = localStorage.getItem('dashboard_RMMute');
				return;
			}
		},
		fetchRefKunjungan(){
			foo = (PrimaSession.user_id == '3246')?'ref_all':'all_ref';
			axios.get(ROOTURL+'/devapi/api/master_ref_kunjungan/'+foo+'/',{ crossdomain: false })
			.then((resp) => {
				for(d of resp.data){
					this.all_ref_kunjungan[d.id] = d.n;
				}
			})
		},
		fetchPasien(){
			for (i = 0; i < this.arr_pre_pasien.length; i += 1){
				axios.get(ROOTURL+'/devapi/api/master_pasien/all_psn/'+this.arr_pre_pasien[i]+'/',{ crossdomain: false })
				.then((resp) => {
					if(isNaN(resp.data[0]['no_rm'][0]) || resp.data[0]['no_rm'][0] == ' '){
						if(this.all_pasien.rm_no_numeric.length > 0)
							this.all_pasien.rm_no_numeric = this.all_pasien.rm_no_numeric.concat(resp.data);
						else
							this.all_pasien.rm_no_numeric = resp.data;
					}else{
						this.all_pasien['rm_'+resp.data[0]['no_rm'][0]] = []
						this.all_pasien['rm_'+resp.data[0]['no_rm'][0]] = resp.data
					}
					// //this.all_pasien = this.all_pasien.concat(resp.data);
				})
			}
		},
		getDataReport(){
			/*if(this.report.instalasi==''){
				alert('Instalasi Wajib Diisi!');
				return;
			}*/
			$('#do-load').addClass('disabled')
			this.report.status_data = 'Tunggu, Data Sedang Diambil'
			var data = new FormData();
			data.append('tgl_dari', $('#tgl_dari').val());
			data.append('tgl_sampai', $('#tgl_sampai').val());
			data.append('instalasi', this.report.instalasi);
			this.report.tgl_dari = $('#tgl_dari').val();
			this.report.tgl_sampai = $('#tgl_sampai').val();
			if(!isObjEmpty(data_kunjungan)){
				dc.filterAll();
				dc.redrawAll();
			}
			data_kunjungan = {}
			
			axios.post(BASEURL+'/hidden/tools/load_data_kunjungan/', data, {crossdomain: false})
			.then((resp) => {
				if(resp.data.length > 0){
					this.result.inJKN = {}
					data_kunjungan = resp.data;
					
					var Qprocess = [];
					
					Qprocess.push(callChart);
					
					for(myFunction in Qprocess){
						Qprocess[myFunction].call(window);
					}
				}else
					this.report.status_data = 'Data kosong'
				$('#do-load').removeClass('disabled')
				return
			})
		},
		popPendaftaran(){
			
		},
		popJasa(){
			
		},
		popDemogrfPasien(){
			
		}
	}
})



var data_kunjungan = {}
var rm_mute = rm_now = {}
var topo_id = {}

var callRef = function(){
	app.fetchRefKunjungan();
}

var callChart = function(){	
	generateChart(data_kunjungan[0]);
}
var dateFormat = d3.timeParse("%d-%m-%Y");
var jenis_jasa = ['ADMINISTRASI','TINDAKAN','EQUIPMENT','VISITE','PENUNJANG','AKOMODASI','OBAT RUANGAN','OPERASI','OBAT RESEP']
var numberFormat = d3.format(',');

$(document).ready(function(){
	$('#tgl_dari,#tgl_sampai').datepicker({"format": "dd-mm-yyyy", "weekStart": 1, "autoclose": true});
	dailyChart = dc.lineChart('#daily-chart');
	PerolehanChart = dc.barChart('#perolehan-chart');
	dokterChart = dc.rowChart('#dokter-chart');
	statusOKChart = dc.pieChart('#status-chart');
	poliChart = dc.rowChart('#poli-chart');
	cntKunjungan = dc.numberDisplay('#total-kunjungan');
	sumPerolehan = dc.numberDisplay("#total-perolehan");
	cntPendaftaran = dc.numberDisplay("#total-pendaftaran");
	cntPasien = dc.numberDisplay("#total-pasien");
	caraBayarChart = dc.pieChart('#cara-bayar-chart')
	stKunjunganChart = dc.pieChart('#st-kunjungan-chart')
	// mapChart = dc.geoChoroplethChart('#map-chart');
})

//error, data, population

function generateChart(data){
	countReg = countPsn = countP = 0;
	for (d of data) {
		d.tg = d.tgl
		d.tgl = dateFormat(d.tgl);
		d.tp = (in_array(d.s,['pung','Pusi']))?d.Tp:''
		d.cb = d.k_b
		d.cb2 = (d.k_b == 'k-b_1')?'Tunai':'Jaminan'
		d.cnt = '1';
		d.tP = in_array(d.tP,['','00-00-0000'])?'':d.tP
	}
	
	ndx = crossfilter(data);
	all = ndx.groupAll();
	totalPerolehan = ndx.groupAll().reduceSum(function(d) {return d.j;});
	
	dateDimension = ndx.dimension(function (d) { 		return d.tgl; 	});
	dokterDimension = ndx.dimension(function (d) { 		return d.k_pg; 	});
	statusDimension = ndx.dimension(function (d) { 		return d.ok; 	}); 
	penjaminDimension = ndx.dimension(function (d) { 		return d.cb; 	}); 
	stKunjDimension = ndx.dimension(function (d) { 		return d.s; 	}); 
	poliDimension = ndx.dimension(function (d) { 		return d.k_p; 	});
	totalKunj  = ndx.dimension(function(d) { return d.cnt; });
	pendaftaran = ndx.dimension(function(d) { return d.reg; }); 
	pasien = ndx.dimension(function(d) { return d.rm; });
	
	
	
	dateGroup = dateDimension.group().reduceCount();
	perolehanGroup = dateDimension.group().reduceSum(function(d) {return d.j;});
	dokterGroup = dokterDimension.group().reduceCount();
	statusGroup = statusDimension.group().reduceCount();
	penjaminGroup = penjaminDimension.group().reduceSum(function(d) {return d.j;});
	stKunjGroup = stKunjDimension.group().reduceSum(function(d) {return d.j;});
	poliGroup = poliDimension.group().reduceCount();
	totalKunjGroup = totalKunj.group().reduceCount();
	
	
	totalPend  = pendaftaran.group().reduce(
		function (p, d) {
            if( d.nreg in p.nregs)
                p.nregs[d.reg]+=1;
            else{ 
				p.nregs[d.nreg] = 1;
				p.nreg_cnt++;
				countReg+=1	
			}
            return p;
        },
        function (p, d) {
            p.nregs[d.nreg]--;
            if(p.nregs[d.reg] === 0){
                delete p.nregs[d.reg];
				p.nreg_cnt--;
				countReg-=1
			}
            return p;
        },
        function () {
            return {nregs: {},nreg_cnt:0};
        }
	);
	
	totalPasien  = pasien.group().reduce(
		function (p, d) {
			++p.count
            if( d.rm in p.rms)
                p.rms[d.rm]+=1;
            else{ 
				p.rms[d.rm] = 1;
				p.rm_cnt++;
				countPsn+=1
			}
            return p;
        },
        function (p, d) {
			--p.count
            p.rms[d.rm]--;
            if(p.rms[d.rm] === 0){
                delete p.rms[d.rm];
				p.rm_cnt--;
				countPsn-=1
			}
            return p;
        },
        function () {
            return {rms: {},rm_cnt:0,count:countPsn};
        }
	);
	
	// mapChart
	// .width(1000)
    // .height(330)
    // .dimension(kotaDimension)
    // .group(kotaGroup)
    // .colors(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"])
    // .colorDomain([0, 10])
    // .overlayGeoJson(us_topo["features"], "state", function (d) {
        // return d.properties.name;
    // })
    // .projection(d3.geoAlbersUsa()
                // .scale(600)
                // .translate([340, 150]))
    // .title(function (p) {
        // return "State: " + p["key"]
                // + "\n"
                // + "Total Pasien: " + Math.round(p["value"]);
    // })
	
	
	minDate = dateDimension.bottom(1)[0].tgl;
	maxDate = dateDimension.top(1)[0].tgl;
	// console.log(minDate,maxDate);
	
	cntKunjungan
	.formatNumber(d3.format(","))
	.dimension(totalKunj)
	.valueAccessor(function(d){ return d.value; })
	.group(totalKunjGroup);
	
	cntPendaftaran
	.formatNumber(d3.format(","))
	.dimension(pendaftaran)
	.valueAccessor(function(d){return countReg;})
	.group(totalPend);
	
	cntPasien
	.formatNumber(d3.format(","))
	.dimension(pasien)
	.valueAccessor(function(d){ return countPsn; })
	.group(totalPasien);
	
	sumPerolehan
	.formatNumber(d3.format(',.2f'))
	.valueAccessor(function(d){return d; })
	.group(totalPerolehan);
	
	dailyChart /* dc.lineChart('#monthly-move-chart', 'chartGroup') */
	.renderArea(true)
	.width(1200)
	.height(250)
	// .transitionDuration(1000)
	.margins({top: 30, right: 50, bottom: 25, left: 40})
	.dimension(dateDimension)
	// .mouseZoomable(true)
// // Specify a "range chart" to link its brush extent with the zoom of the current "focus chart".
	.x(d3.scaleTime().domain([minDate, maxDate]))
	// .round(d3.timeDay.round)
	.xUnits(d3.timeDays)
	.elasticY(true)
	.renderHorizontalGridLines(true)
	.rangeChart(PerolehanChart)
// //##### Legend
	// // Position the legend relative to the chart origin and specify items' height and separation.
	// .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
	.brushOn(false)
	// // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
	// // legend.
	// // The `.valueAccessor` will be used for the base layer
	.group(dateGroup, 'Kunjungan Harian')
	.valueAccessor(function (d) {
		return d.value;
	})
	
	PerolehanChart
	.width(1200)
	.height(80)
	.margins({top: 0, right: 50, bottom: 20, left: 40})
	.dimension(dateDimension)
	.group(perolehanGroup)
	.centerBar(true)
	.gap(1)
	.x(d3.scaleTime().domain([minDate, maxDate]))
	// .round(d3.timeMonth.round)
	.alwaysUseRounding(true)
	.xUnits(d3.timeDays);
	
	/*Chart Dokter*/
	dokterChart
	.width(300)
	.height(400)
	// .margins({top: 20, left: 10, right: 10, bottom: 20})
	.group(dokterGroup)
	.dimension(dokterDimension)
	.rowsCap(20)
	.othersGrouper(false)
	// Assign colors to each value in the x scale domain
	// .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
	.label(function (d) {
		return app.all_ref_kunjungan[d.key];
	})
	// Title sets the row text
	.title(function (d) {
		return app.all_ref_kunjungan[d.key]+':'+d.value+' pengunjung.';
	})
	.elasticX(true)
	.xAxis().ticks(4);
	
	
	statusOKChart 
        .width(300)
        .height(400)
        .radius(80)
        .dimension(statusDimension)    
        .group(statusGroup)
        .label(function (d) {
			var sts =  (d.key == '1')?'Aktif':'Batal'
			return sts+'-'+d.key+':'+d.value;
		})
		.title(function (d) {
			var sts =  (d.key == '1')?'Aktif':'Batal'
			return sts+':'+d.value;
		})
		
	caraBayarChart
        .width(400)
        .height(400)
        .radius(500)
        .dimension(penjaminDimension)
        .group(penjaminGroup)
		.legend(dc.legend().legendText(function(d,i) { 
			return app.all_ref_kunjungan[d.name]+' : '+d.data.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
		}))
        .label(function (d) {
			// kode = d.key.split('+')
			return app.all_ref_kunjungan[d.name]; 
		})
	
	stKunjunganChart
        .width(400)
        .height(400)
        .radius(500)
        .dimension(stKunjDimension)
        .group(stKunjGroup)
		.legend(dc.legend().legendText(function(d,i) { 
			let nm = (typeof publicStatusKunjungan[d.name] !== 'undefined')?publicStatusKunjungan[d.name]:d.name 
			return nm+' : '+d.data.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
		}))
        .label(function (d) {
			// kode = d.key.split('+')
			return publicStatusKunjungan[d.name]; 
		})
		
	poliChart
        .width(700)
		.height(400)
        .group(poliGroup)
		.dimension(poliDimension)
		// .rowsCap(10)
		.othersGrouper(false)
		// Assign colors to each value in the x scale domain
		// .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
		.label(function (d) {
			return app.all_ref_kunjungan[d.key];
		})
		// Title sets the row text
		.title(function (d) {
			return app.all_ref_kunjungan[d.key]+':'+d.value+' kunj.';
		})
        .elasticX(true)
		.xAxis().ticks(4);
	
	app.report.status_data = 'Data Tersedia'
	dc.renderAll()
	onlyActive.init()
	return;
}

var onlyActive = function(){
	function init(){
		statusOKChart.filter('1')
		dc.redrawAll()
		return
	}
	return {
		init: init
	}
}()

var publicStatusKunjungan = {
'Baar':	'Baru Mendaftar',
'Anan':	'Antrian',
'pung':	'Pulang',
'Keng':	'Kembalikan Uang',
'Kegi':	'Kembali Lagi',
'Seer':	'Selesai Dokter',
'KoGD':	'Konsul IGD',
'Inap':	'Inap',
'Piap':	'Pindah Inap',
'Pusi':	'Pulang Non Verifikasi'
}

const invertChart = function(){
	function inti(id,shape){
		d3.selectAll('#'+id+' '+shape).each(function(d, i) {
			var onClickFunc = d3.select(this).on("click")
    		onClickFunc.apply(this, [d, i])
		})
	}
	return{
		init : inti
	}
}()

const klaimJKNF = function(){
	function inti(){
		$('#klaim-jkn-farmasi').on('click',function(){
			//kosongin
			$('#tab-rslt').html('')
			
			//set localstorage
			/*
			mo = moment(app.report.tgl_sampai,'YYYY-MM-DD').format('M')
			localStorage.setItem('all_inJKN'+mo, JSON.stringify(app.result.inJKN));
			alert('set all_inJKN'+mo+' in localStorage done!')
			return
			*/
			
			//draw result
			let rT = `<table id="tabExport" class="table table-striped table-bordered "><tr>
			<th>No</th>
			<th>NR</th>
			<th>isrj?</th>
			<th>icd</th>
			<th>deskripsi</th>
			<th>LOS</th>
			<th>Jumlah</th>
			<th>RS</th>
			<th>C Obat</th>
			<th>C Alkes</th>
			<th>Klaim</th>
			</tr>`
			let j = 0
			for(i in app.result.inJKN){
				rw = app.result.inJKN[i]
				isrwt = i[0]
				// if(typeof rw.jrs !== 'undefined'){
					j += 1
					A = parseFloat(rw['a']).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
					O = parseFloat(rw['o']).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
					rT += `<tr><td>`+j+`</td>
					<td>-</td>
					<td>`+isrwt+`</td>
					<td>`+i+`</td>
					<td>d</td>
					<td>`+parseFloat(rw.L).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+`</td>
					<td>`+parseFloat(rw.k).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+`</td>
					<td>`+parseFloat(rw.r).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+`</td>
					<td>`+O+`</td>
					<td>`+A+`</td>
					<td>`+parseFloat(rw.c).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+`</td>
					</tr>`
				// }
			}
			rT += '</table>'
			rT += '<div><input type="button" id="export-table" value="Export Klaim Farmasi JKN"></div>'
			$('#tab-rslt').html(rT)
			exportTab.init()
			return
		})
	}
	return {
		init: inti
	}
}()
const exportTab = function(){
	function inti(){
		$('#export-table').on('click',function(){
			$("#tabExport").btechco_excelexport({
                containerid: "tabExport"
               , datatype: $datatype.Table
            });
		})
	}
	return{
		init: inti
	}
}()
var pReg = []