import Vue from 'vue'
import { Line } from 'vue-chartjs'

Vue.component('line-chart', {
	extends: Line,
	props: ['data', 'options','height','width','id'],
	mounted () {
		this.data.label = this.id
		this.renderChart(this.data, {
            maintainAspectRatio:false
          })
		
	},

	watch: {
		data: function () {
			this.renderChart(this.data, {
				maintainAspectRatio:false
			})
		}
	},

	methods: {
		UpdateData(data) {
			this.data = data
		}
	}

})
