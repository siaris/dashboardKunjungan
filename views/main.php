<style>
.modal-container{background-color:#909090}
#poli-chart g.row text{fill:#000}
#dokter-chart g.row text{fill:#000}
div.result div.row {padding-left:10px}
</style>
<div class="box-content" id="app">
	<main class="main">
		<form class="form-horizontal" role="form">
		<div class="form-group">
			<label class="col-sm-1 control-label">Instalasi *</label>
			<div class="col-sm-3">
				<select v-model="report.instalasi">
					<?foreach($instalasi as $k=>$i){?>
						<option value="<?= $k?>"><?= $i?></option>
					<?}?>
				</select>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-1 control-label">Tanggal *</label>
			<div class="col-sm-2"><input autocomplete="off" id="tgl_dari" v-model="report.tgl_dari" type="text" value="" class="form-control"></div><div class="col-sm-2"><input autocomplete="off" id="tgl_sampai" v-model="report.tgl_sampai" type="text" value="" class="form-control"></div>
		</div>
		<div class="form-group">
			<label class="col-sm-1 control-label">&nbsp;</label>
			<div class="col-sm-1"><button @click.prevent="getDataReport()" class="btn btn-primary" id="do-load">Load Data</button></div>
			<div class="col-sm-3">
			{{report.status_data}}
			</div>
		</div>
		</form>
	</main>
	<div class="result">
	<hr></hr>
	<div class="row">
	<div class="form-group">
		<label class="col-sm-1 control-label">&nbsp;</label>
		<div class="col-sm-2"><button id="show-modal-pendaftaran" @click.prevent="modalPendaftaran = true" class="btn">Data Pendaftaran</button></div>
		<modal_p v-if="modalPendaftaran" @close="modalPendaftaran = false">
		<!--
		you can use custom content here to overwrite
		default content
		-->
		<h3 slot="header">Data Pendaftaran</h3>
		<ul id="pendaftaran_list">
		</ul>
		</modal_p>
		
		<div class="col-sm-2"><button id="show-modal-jasa" @click.prevent="modalJasa = true" class="btn">Data Jasa</button></div>			
		<modal v-if="modalJasa" @close="modalJasa = false">
		<!--
		you can use custom content here to overwrite
		default content
		-->
		<h3 slot="header">Data Jasa</h3>
		<ul id="jasa_list">
		</ul>
		</modal>

		<label class="col-sm-1 control-label">&nbsp;</label>
		<div class="col-sm-2"><button id="show-modal-pelunasan" @click.prevent="modalPelunasan = true" class="btn">Data Penagihan</button></div>
		<modal_plnsn v-if="modalPelunasan" @close="modalPelunasan = false">
		
		<h3 slot="header">Data Penagihan</h3>
		<ul id="pelunasan_list">
		</ul>
		</modal_plnsn>
		
		<div class="col-sm-2"><button @click.prevent="modalPasien = true" class="btn btn-primary">Demografi Pasien</button></div>
		<modal_psn v-if="modalPasien" @close="modalPasien = false">
		<!--
		you can use custom content here to overwrite
		default content
		-->
		<h3 slot="header">Demografi Pasien</h3>
		<ul id="pasien_list">
		</ul>
		</modal_psn>
		
	</div>
	</div>
	<hr></hr>
	<div class="row">
		<div class="chart-wrapper" id="total-kunjungan">
			<div class="chart-title">  <strong> Total Kunjungan </strong> </div>					
		</div>
		<div class="chart-wrapper hide" id="total-pendaftaran" style="padding-left: 20px;">
			<div class="chart-title">  <strong> Total Pendaftaran </strong> </div>					
		</div>
		<div class="chart-wrapper" id="total-pasien" style="padding-left: 20px;">
			<div class="chart-title">  <strong> Total Pasien </strong> </div>					
		</div>
		<div class="chart-wrapper" id="total-perolehan" style="padding-left: 20px;">
			<div class="chart-title">  <strong> Total Perolehan </strong> </div>	
		</div>
	</div>
	<div class="row">
		<div id="daily-chart">
			<strong>Daily Chart Pelayanan</strong>
			<span class="reset" style="display: none;">range: <span class="filter"></span></span>
			<a class="reset" href="javascript:PerolehanChart.filterAll();PerolehanChart.filterAll();dc.redrawAll();"
			   style="display: none;">reset</a>
			<div class="clearfix"></div>
		</div>
		<div id="perolehan-chart">
		</div>
	</div>
	<div class="row">
	<div id="cara-bayar-chart">
        <strong>Penjamin</strong>
        <a class="reset" href="javascript:caraBayarChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
		<a class="invert" href="javascript:invertChart.init('cara-bayar-chart','path');" style="display: none;">invert</a>
        <div class="clearfix"></div>
		</div>
		<div id="st-kunjungan-chart">
        <strong>Status Kunjungan</strong>
        <a class="reset" href="javascript:stKunjunganChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
        <div class="clearfix"></div>
		</div>
	</div>
	<div class="row">
		<div id="dokter-chart">
        <strong>20 Dokter dgn Kunjungan Terbanyak</strong>
        <a class="reset" href="javascript:dokterChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
		<a class="invert" href="javascript:invertChart.init('dokter-chart','rect');" style="display: none;">invert</a>
        <div class="clearfix"></div>
		</div>
		<div id="status-chart">
        <strong>Status Kunjungan</strong>
        <a class="reset" href="javascript:statusOKChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
        <div class="clearfix"></div>
		</div>
		<div id="poli-chart">
        <strong>Kunjungan by Poli</strong>
        <a class="reset" href="javascript:poliChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
		<a class="invert" href="javascript:invertChart.init('poli-chart','rect');" style="display: none;">invert</a>
        <div class="clearfix"></div>
		</div>
	</div>
	
	<div class="row">
		<div class="row" v-bind:class="isShowMins(report.instalasi)">
			<div class="col-sm-2"><button id="show-special-igd" @click.prevent="modalIn[report.instalasi] = true" class="btn">Informasi Instalasi</button></div>
			<modal_info_ins v-if="modalIn[report.instalasi]" @close="modalIn[report.instalasi] = false">
			
			<h3 slot="header">Informasi Instalasi</h3>
			<ul id="info_ins">
			</ul>
			</modal_info_ins>
		</div>
	</div>
	</div>
</div>

<script type="text/x-template" id="modal-pelunasan">
  <transition name="modal_plnsn">
    <div class="modal-mask" id="modal-list-pelunasan">
      <div class="modal-wrapper">
        <div class="modal-container">
			<div class="modal-header"><slot name="header">default header</slot></div>

        <div class="modal-body">
		<div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click.prevent="$emit('close')">
                OK
              </button>
            </slot>
          </div>
		</div>
		</div>
		</div>
		</div>
		</transition>
</script>

<script type="text/x-template" id="smodal-info-ins">
  <transition name="modal_info_ins">
    <div class="modal-mask" id="modal-info-ins">
      <div class="modal-wrapper">
        <div class="modal-container">
			<div class="modal-header"><slot name="header">default header</slot></div>

        <div class="modal-body">
		<div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click.prevent="$emit('close')">
                OK
              </button>
            </slot>
          </div>
		</div>
		</div>
		</div>
		</div>
		</transition>
</script>
<script type="text/x-template" id="modal-pendaftaran">
  <transition name="modal_p">
    <div class="modal-mask" id="modal-list-pendaftaran">
      <div class="modal-wrapper">
        <div class="modal-container">
			<div class="modal-header"><slot name="header">default header</slot></div>

        <div class="modal-body">
            <slot name="body">
			<div class="row">
				<div id="pendaftaran-penjamin-chart">
					<strong>By Penjamin</strong>
					<a class="reset" href="javascript:pPenjaminChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
					<div class="clearfix"></div>
				</div>
			</div>
			<div class="row">
				<div id="pendaftaran-cara-masuk-chart">
					<strong>By Cara Masuk</strong>
					<a class="reset" href="javascript:pcaraMasukChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
					<div class="clearfix"></div>
				</div>
				<div id="pendaftaran-jumlah-daftar-chart">
					<strong>By Jumlah Daftar</strong>
					<a class="reset" href="javascript:pjDaftarChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
					<div class="clearfix"></div>
				</div>
			</div>
			<div class="row hide" id="row-igd">
				<div id="pendaftaran-igd-status">
					<strong>By Status IGD</strong>
					<a class="reset" href="javascript:psIGDChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
					<div class="clearfix"></div>
				</div>
				<div id="pendaftaran-igd-kasus">
					<strong>By Kasus IGD</strong>
					<a class="reset" href="javascript:tKIGDChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
					<div class="clearfix"></div>
				</div>	
			</div>
			<div class="row hide" id="row-jkn">
				<div id="pendaftaran-jkn-faskes">
					<strong>By Faskes JKN</strong>
					<a class="reset" href="javascript:pFJKNChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
					<div class="clearfix"></div>
				</div>
			</div>
			</slot>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click.prevent="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
    </div>
  </transition>
</script>
<script type="text/x-template" id="modal-pasien">
  <transition name="modal_psn">
    <div class="modal-mask" id="modal-list-pasien">
      <div class="modal-wrapper">
        <div class="modal-container">
			<div class="modal-header"><slot name="header">default header</slot></div>

        <div class="modal-body">
            <slot name="body">
				<div class="row">
					<div id="pasien-kelurahan-chart">
						<strong>By Alamat</strong>
						<a class="reset" href="javascript:psnKelurahanChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
						<div class="clearfix"></div>
					</div>
				</div>
			</slot>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click.prevent="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
    </div>
  </transition>
</script>
<script type="text/x-template" id="modal-jasa">
  <transition name="modal">
    <div class="modal-mask" id="modal-list-jasa">
      <div class="modal-wrapper">
        <div class="modal-container">
			<div class="modal-header"><slot name="header">default header</slot></div>

        <div class="modal-body">
            <slot name="body">
			<div class="row">
				<div id="jasa-penjamin-chart">
					<strong>By Penjamin</strong>
					<a class="reset" href="javascript:jasaPenjaminChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
					<div class="clearfix"></div>
				</div>
			</div>
			<div class="row">
				<div id="jasa-chart">
					<strong>By Jenis Jasa</strong>
					<a class="reset" href="javascript:jasaChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
					<div class="clearfix"></div>
				</div>
				<div id="jasa-max-chart">
					<strong>10 Jasa Perolehan Terbesar</strong>
					<a class="reset" href="javascript:jasaMaxChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
					<div class="clearfix"></div>
				</div>
			</div>
			<div class="row hide" id="table-info-div">
				<table class="table table-hover" id="info-table">
					<thead>
					<tr class='header'>
						<th>RM</th>
						<th>Jasa</th>
					</tr>
					</thead>
				</table>
			</div>
			</slot>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click.prevent="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
    </div>
  </transition>
</script>