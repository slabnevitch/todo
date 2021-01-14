import moment from '@/plugins/moment/moment'

export default{
	install(Vue, options){
		Vue.prototype.$deadline = function(deadline){
			var b = moment(new Date());//now
            var a = moment(new Date(deadline));
            var result = {
                hours: a.diff(b, 'hours'),
                days: a.diff(b, 'days'),
                weeks: a.diff(b, 'weeks'),
                months: a.diff(b, 'months'),
                years: a.diff(b, 'years')
            };

            if(result.years > 0){
                return 'больше года'
            }else if(result.months > 0){
                return result.months + ' месяцев'
            }else if(result.weeks > 0){
                return result.weeks + ' недель'
            }else if(result.days > 0){
                return result.days + ' дней'
            }else if(result.days == 0){
                return result.hours + ' часов'
            }
		}

	}
}