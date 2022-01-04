function generatePasienChart(data){
	psnKelurahanChart = dc.pieChart('#pasien-kelurahan-chart');
	
	var df_ndx = crossfilter(data);
	var df_all = df_ndx.groupAll();
	var qDimension = df_ndx.dimension(function(d) {return d.q;});
	var qGroup = qDimension.group().reduceCount();
	
	psnKelurahanChart
	.width(768)
    .height(480)
    .innerRadius(100)
	.dimension(qDimension)
    .group(qGroup)
	.legend(dc.legend().legendText(function(d,i) { return app.all_pasien_ref[d.name.replace(/q_/,'p-ak_')]; }))
	.label(function (d) {
		return app.all_pasien_ref[d.key.replace(/q_/,'p-ak_')]+':'+numberFormat(d.value)+' pasien';
	})
	.title(function (d) {
		return app.all_pasien_ref[d.key.replace(/q_/,'p-ak_')]+':'+numberFormat(d.value);
	});
	
	dc.renderAll();
	return;
}