function generatePendaftaranChart(data){
	pPenjaminChart = dc.pieChart('#pendaftaran-penjamin-chart');
	pcaraMasukChart = dc.rowChart('#pendaftaran-cara-masuk-chart');
	pjDaftarChart = dc.pieChart('#pendaftaran-jumlah-daftar-chart');
	pFJKNChart = dc.rowChart('#pendaftaran-jkn-faskes');
	var kategori_jk = {
		'k_o':'daftar ODC',
		'k_1':'daftar pertama',
		'k_20':'daftar s.d 20',
		'k_50':'daftar s.d 50',
		'k_100':'daftar s.d 100',
		'k_101':'daftar melebihi 100',
	}
	
	for (d of data) { 
		d.k_b = app.detail_reg_obj_filtered[d.id_id]['k_b'];
		if (isNaN(parseInt(d.rm.charAt(0))))
			d.cjk = 'k_o'
		else{
			if(d.jk > 100)
				d.cjk = 'k_101'
			else if(d.jk > 50)
				d.cjk = 'k_100'
			else if(d.jk > 20)
				d.cjk = 'k_50'
			else if(d.jk > 1)
				d.cjk = 'k_20'
			else
				d.cjk = 'k_1'
		}
	}
	
	var df_ndx = crossfilter(data);
	var df_all = df_ndx.groupAll();
	var kbDimension  = df_ndx.dimension(function(d) {return d.k_b;});
	var cmDimension = df_ndx.dimension(function (d) {return d.k_cm;});
	var jkDimension = df_ndx.dimension(function (d) {return d.cjk;});
	var pFDimension = df_ndx.dimension(function (d) {return d.k_fk;});
    var kbGroup = kbDimension.group().reduceCount();
    var cmGroup = cmDimension.group().reduceCount();
    var jkGroup = jkDimension.group().reduceCount();
    var pFGroup = pFDimension.group().reduceCount();
	
	
	pPenjaminChart
	.width(768)
    .height(480)
    .innerRadius(100)
	.dimension(kbDimension)
    .group(kbGroup)
	.legend(dc.legend().legendText(function(d,i) { return app.all_ref_kunjungan[d.name]; }))
	.label(function (d) {
		return app.all_ref_kunjungan[d.key]+':'+numberFormat(d.value)+' pendaftar';
	})
	.title(function (d) {
		return app.all_ref_kunjungan[d.key]+':'+numberFormat(d.value);
	});
	
	pjDaftarChart
	.width(350)
    .height(400)
	.dimension(jkDimension)
    .group(jkGroup)
	.legend(dc.legend().legendText(function(d,i) { return kategori_jk[d.name]; }))
	.label(function (d) {
		return kategori_jk[d.key]+':'+numberFormat(d.value)+' pendaftar';
	})
	.title(function (d) {
		return kategori_jk[d.key]+':'+numberFormat(d.value);
	});
	
	pFJKNChart
	.width(350)
    .height(400)
	.dimension(pFDimension)
    .group(pFGroup)
	// .valueAccessor(function(d){return d.value;})
	.label(function (d) {
		return app.all_ref_kunjungan[d.key]+':'+numberFormat(d.value)+' pendaftar';
	})
	.title(function (d) {
		return app.all_ref_kunjungan[d.key]+':'+numberFormat(d.value);
	})
	.rowsCap(20)
	.othersGrouper(false)
	.elasticX(true)
	.xAxis().ticks(4);
	
	pcaraMasukChart
	.width(350)
	.height(400)
	.group(cmGroup)
	.dimension(cmDimension)
	// .rowsCap(10)
	// .othersGrouper(false)
	.valueAccessor(function(d){return d.value;})
	// Assign colors to each value in the x scale domain
	// .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
	.label(function (d) {
		return app.all_ref_kunjungan[d.key];
	})
	// Title sets the row text
	.title(function (d) {
		return app.all_ref_kunjungan[d.key]+':'+numberFormat(d.value);
	})
	.elasticX(true)
	.xAxis().ticks(4);
	
	if(app.report.instalasi == '4'){
		$('#row-igd').removeClass('hide');
		psIGDChart = dc.pieChart('#pendaftaran-igd-status');
		tKIGDChart = dc.pieChart('#pendaftaran-igd-kasus');
		var sIGDDimension = df_ndx.dimension(function (d) {return d.i_te;});
		var tKIGDDimension = df_ndx.dimension(function (d) {return d.i_tk;});
		var sIGDGroup = sIGDDimension.group().reduceCount();
		var tKIGDGroup = tKIGDDimension.group().reduceCount();
		
		psIGDChart
		.width(350)
		.height(400)
		.dimension(sIGDDimension)
		.group(sIGDGroup)
		.legend(dc.legend().legendText(function(d,i) { return d.name == ''?'Unknown':d.name; }))
		.label(function (d) {
			name = d.key == ''?'Unknown':d.key;
			return name+':'+numberFormat(d.value)+' pendaftar';
		})
		.title(function (d) {
			name = d.key == ''?'Unknown':d.key;
			return name+':'+numberFormat(d.value);
		});
		tKIGDChart
		.width(350)
		.height(400)
		.dimension(tKIGDDimension)
		.group(tKIGDGroup)
		.legend(dc.legend().legendText(function(d,i) { return d.name == ''?'Unknown':app.all_ref_kunjungan[d.name]; }))
		.label(function (d) {
			name = d.key == ''?'Unknown':app.all_ref_kunjungan[d.key];
			return name+':'+numberFormat(d.value)+' pendaftar';
		})
		.title(function (d) {
			name = d.key == ''?'Unknown':app.all_ref_kunjungan[d.key];
			return name+':'+numberFormat(d.value);
		});
	}
	
	dc.renderAll();
	
	pPenjaminChart
	pjDaftarChart
	pcaraMasukChart
	.on('postRedraw', function() {
		clickInfoAsalFaskes();
	});
	
	return;
}

function clickInfoAsalFaskes(){
	if(in_array("k-b_14",pPenjaminChart.filters())){
		$('#row-jkn').removeClass('hide');
	}else{
		$('#row-jkn').addClass('hide');
	}
	return;
}