function generateJasaChart(data){
	jasaChart = dc.rowChart('#jasa-chart');
	jasaMaxChart = dc.rowChart('#jasa-max-chart');
	jasaPenjaminChart = dc.pieChart('#jasa-penjamin-chart');
	
	for (d of data) { 
		d.k_b = app.detail_reg_obj_filtered[d.q_r]['k_b'];
	}
	
	var j_ndx = crossfilter(data);
	var j_all = j_ndx.groupAll();
	
	var jenisDimension = j_ndx.dimension(function (d) {return d.j;});
	var jasaMaxDimension = j_ndx.dimension(function (d) {return d.N;});
	var kbDimension  = j_ndx.dimension(function(d) {return d.k_b;})
    var kbGroup = kbDimension.group().reduceSum(function(d) {return d.t;});
	var jenisGroup  = jenisDimension.group().reduceSum(function(d) { return d.t; });	
	var jasaMaxGroup  = jasaMaxDimension.group().reduceSum(function(d) { return d.t; });
	
	jasaPenjaminChart
	.width(768)
    .height(480)
    .innerRadius(100)
	.dimension(kbDimension)
    .group(kbGroup)
	.legend(dc.legend().legendText(function(d,i) { return app.all_ref_kunjungan[d.name]; }))
	.label(function (d) {
		return app.all_ref_kunjungan[d.key]+':'+numberFormat(d.value);
	})
	.title(function (d) {
		return app.all_ref_kunjungan[d.key]+':'+numberFormat(d.value);
	});
	
	jasaChart
        .width(350)
		.height(400)
        .group(jenisGroup)
		.dimension(jenisDimension)
		// .rowsCap(10)
		// .othersGrouper(false)
		.valueAccessor(function(d){return d.value;})
		// Assign colors to each value in the x scale domain
		// .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
		.label(function (d) {
			return jenis_jasa[d.key];
		})
		// Title sets the row text
		.title(function (d) {
			return jenis_jasa[d.key]+':'+d.value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		})
        .elasticX(true)
		.xAxis().ticks(4);
	jasaMaxChart
        .width(350)
		.height(400)
        .group(jasaMaxGroup)
		.dimension(jasaMaxDimension)
		.rowsCap(10)
		.othersGrouper(false)
		.valueAccessor(function(d){return d.value;})
		// Assign colors to each value in the x scale domain
		// .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
		.label(function (d) {
			return app.all_jasa[d.key];
		})
		// Title sets the row text
		.title(function (d) { //console.log(d.key);
			return app.all_jasa[d.key]+':'+d.value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		})
        .elasticX(true)
		.xAxis().ticks(4);
	
	if(statusDimension.currentFilter() == '0'){
		$('#table-info-div').removeClass('hide');
		//inisiasi tabel informasi pasien yg dibatalkan
		var infoTable = dc.dataTable('#info-table');
		var infoDimension = j_ndx.dimension(function (d) {return String(d.q_r);});
		var infoGroup  = infoDimension.group().reduce(
			function (p, d) {
				++p.detail_cnt;
				if( d.q_r in p.detail)
					p.detail[d.q_r]+=parseFloat(d.t);
				else{ 
					p.detail[d.q_r] = parseFloat(d.t);
				}
				return p;
			},
			function (p, d) {
				--p.detail_cnt;
				p.detail[d.q_r]-=parseFloat(d.t);
				if(p.detail[d.q_r] === 0){
					delete p.detail[d.q_r];
				}
				return p;
			},
			function () {
				return {detail: {},detail_cnt:0};
			}
		)
		
		var detail_reg_obj = app.detail_reg_obj_filtered;
		

		infoTable /* dc.dataTable('.dc-data-table', 'chartGroup') */
		.width(300)
		.height(480)
        .showSections(false)
		.dimension(infoGroup)
		// There are several ways to specify the columns; see the data-table documentation.
		// This code demonstrates generating the column header automatically based on the columns.
		.size(Infinity)
		.columns([
			function (d) { return '<a class="btn click-info">'+detail_reg_obj[d.key]['rm']+'<span class="hide detail-reg">'+d.key+'</span></a>' },
			function (d) { return numberFormat(parseFloatReturnZero(d.value.detail[d.key])) }
		])
		.sortBy(function (d) { return d.key; })
        .order(d3.descending);
		
	}
	dc.renderAll();
	clickInfoPasienBatal();
	jasaPenjaminChart
	jasaChart
	jasaMaxChart
	.on('postRedraw', function() {
		clickInfoPasienBatal();
	});
	
	return;
	
}

function clickInfoPasienBatal(){
	$('.click-info').on('click',function(){
		d_r = $( this ).children( '.detail-reg' ).html()
		$.ajax({
				type: "POST",
				url: BASEURL+"/hidden/tools/get_data_batal/"+d_r,
				data: [],
				dataType: "json",
				cache : false,
				success: function(data){
						alert('nama pasien :'+data.nama+', poli:'+app.all_ref_kunjungan['k-p_'+data.poli]+', alasan:'+data.alasan+', user:'+app.all_ref_kunjungan['k-pg_'+data.pegawai_id]+', waktu batal:'+data.tanggal_batal)
				} ,error: function(xhr, status, error) {
					console.log(error)
				},

			});
	})
}