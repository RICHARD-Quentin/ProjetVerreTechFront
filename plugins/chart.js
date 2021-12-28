import Vue from 'vue'
import { Line } from 'vue-chartjs'

Vue.component('line-chart', {
	extends: Line,
	props: ['data', 'options','height','width'],
	mounted () {
		this.renderChart(this.data, {
            maintainAspectRatio:false
          })

	}
})
