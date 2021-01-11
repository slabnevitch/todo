<template>
      <b-row>
        <!-- <pre>{{tasks}}</pre> -->
        <b-col class="mt-5" v-if="!getUserState.isAuthorized" cols="12">
            <b-alert show variant="warning">Чтобы создавать и просматривать задачи, 
                пожалуйста, <b-link v-b-modal.modalSignIn>войдите</b-link> или <b-link v-b-modal.modalSignUp>зарегистрируйтесь.</b-link>

            </b-alert>
        </b-col>

        <b-col v-else cols="12">
            <b-row align-v="end" class="mb-3">
              	<b-col md="6">
                	<h1 class="mt-50">Список задач</h1>
                	<b-form-select v-model="selected" class="mb-3 mb-md-0">
                		<!-- <template #first>
                			<b-form-select-option :value="null">Все</b-form-select-option>
                		</template> -->
                        <b-form-select-option v-for="option in options" :key="option.value" :value="option.value">{{option.text}} ({{taskCounter(option.value)}})</b-form-select-option>
                	</b-form-select>
              	</b-col>
                <b-col md="6" class="d-flex justify-content-center justify-content-md-end">
                    <b-button to="/create" variant="success" size="lg">Добавить задачу</b-button>
                </b-col>
                
                <div class="col-12">
            	<!-- <table class="table" id="my-table" :per-page="perPage" :current-page="currentPage">
            		<thead>
            			<tr>
            				<th scope="col">№</th>
            				<th scope="col">Название</th>
            				<th scope="col">Дата окончания</th>
            				<th scope="col">Описание</th>
            				<th scope="col">Стаус</th>
            				<th scope="col">Редактирование</th>
                            <th scope="col"></th>
            			</tr>
            		</thead>
            		<tbody>
            			<tr v-for="(task, ind) in filteredTasks" :key="task.id">
            				<td role="cell" class="">{{ind + 1}}</td>
        	    			<td role="cell" class="">{{task.title}}</td>
        	    			<td role="cell" class="">{{task.date}}
                                <p>Осталось {{days(task.date)}}</p>
                                <p>{{new Date(task.date) > new Date()}}</p>
                                <p>{{task.status}}</p>
                            </td>
        	    			<td role="cell" class=""><div class="trim-dotted"><p>{{task.description}}</p></div></td>
        	    			<td role="cell" v-html="status(task.status)"></td>
        	    			<td role="cell" class=""><router-link tag="button" :to="'/task/' + task.id" class="btn btn-secondary" size="sm" >Открыть</router-link></td>
                            <td role="cell" class="">
                                 <b-button class="del-button" 
                                    v-b-tooltip.hover title="Удалить задачу"
                                    @click="removeConfirm(task.id)"
                                    :data-id="task.id"
                                    >
                                     <b-icon 
                                        href="#"
                                        icon="x-circle-fill"  
                                        
                                        style="width: 20px; height: 20px; cursor:pointer"></b-icon>

                                 </b-button>
                                
                            </td>
            			</tr>
            		</tbody>
            	</table> -->
                
                <b-modal id="modal-1" title="Удаление задачи">
                    <!-- <p class="my-4">Задача в настоящее время активна. Удалить все равно?</p> -->
                    <template #modal-footer="{ ok, cancel }">
                      <b>Custom Footer</b>
                      <!-- Emulate built in modal footer ok and cancel button actions -->
                        <b-button size="sm" variant="success" @click="ok()">
                            Удалить
                        </b-button>
                        <b-button size="sm" variant="danger" @click="cancel()">
                            Отмена
                        </b-button>

                    </template>
                </b-modal>
                <p>{{getUserState.isAuthorized}}</p>
                

                <b-alert show v-if="items.length == 0" variant="warning">В списке пока еще нет задач. Вы можете
                    <b-link to="/create">создать</b-link> задачу.

                </b-alert>


                <b-table v-else
                    stacked="lg"
                    :items="items"
                    :fields="fields" 
                    id="my-table"
                    :per-page="perPage"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :current-page="currentPage">
                        <template #cell(Название)="data">
                            <!-- {{data.value}} -->
                            <h5 v-html="data.value"></h5>
                        
                        </template>
                        <template #cell(Окончание)="data">
                            <!-- {{data.value}} -->
                            <div v-html="data.value"></div>
                        
                        </template>
                        <template #cell(Описание)="data">
                            <div class="trim-dotted"><p v-text="data.value"></p></div>
                        
                        </template>
                        <template #cell(Стаус)="data">

                            <div role="alert" aria-live="polite" aria-atomic="true" class="alert"
                                :class="'alert-'+ taskStatusMessages[data.value].selector">{{taskStatusMessages[data.value].name}}</div> 
                        </template>
                        <template #cell(Редактирование)="data">
                            <!-- <div v-html="data.value"></div> -->
                            <router-link tag="button" :to="'/task/' + data.value" class="btn btn-secondary" size="sm" >Открыть</router-link>
                           
                        </template>
                        <template #cell(Удаление)="data">
                            <b-button class="del-button" 
                                v-b-tooltip.hover title="Удалить задачу"
                                @click="removeConfirm(data.value)"
                                >
                                 <b-icon 
                                    href="#"
                                    icon="x-circle-fill"  
                                    style="width: 20px; height: 20px; cursor:pointer"></b-icon>
                             </b-button>
                        </template>

            	</b-table>

                <b-overlay :show="!tasks.length > 0 && getUserState.isAuthorized" rounded="sm">

                </b-overlay>
               
                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                ></b-pagination>
          	
          </div>
                
            </b-row>
        </b-col>
     </b-row>
</template>

<script>
    import moment from '@/plugins/moment/moment'
    import taskStatusMessages from '@/utils/status'
    import datefilter from '@/filters/dateFilter'
    import toastsMixin from '@/mixins/toasts'

	export default{
		name: "List",
		data(){
			return {
                perPage: 3,
                currentPage: 1,
                taskStatusMessages,
                sortBy: 'Окончание',
                sortDesc: false,
                // tasks: [],
				fields: [
                    // {
                    //     key:'№',
                    //     sortable: false
                    // },
                    {
                        key: 'Название',
                        sortable: false 
                    },
                    {
                        key: 'Окончание',
                        sortable: true 
                    },
                    {
                        key: 'Описание',
                        sortable: false
                    }, 
                    {
                        key: 'Стаус',
                        sortable: false
                    },
                    {
                        key:'Редактирование',
                        sortable: false
                    }, 
                    {
                        key:'Удаление',
                        sortable: false
                    }
                ],
				selected: null,
		        options: [
		          { value: null, text: 'Все' },
                  { value: 'active', text: 'Активные' },
		          { value: 'completed', text: 'Завершенные' },
		          { value: 'outdated', text: 'Просроченные' }
		        ]
			}
		},

		methods: {
            taskCounter(status){
                console.log(status)
                return this.statusedTasks.filter(task => !status ? true : task.status === status).length
            },
            formatedDeadline(deadline){
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
            },
            removeTask(id){
                console.log(id)
                const title = this.$store.getters.getTasks.find(t => t.id === id).title
                this.$store.dispatch('removeTask', id)
                this.makeToast(title, 'remove')
            },
            removeConfirm(id){
                this.$bvModal.msgBoxConfirm('Действительно хотите удалить задачу?', {
                    okTitle: 'Да',
                    cancelTitle: 'Отмена',
                })
                  .then(value => {
                    console.log(value)
                      if(value){
                        this.removeTask(id)
                      }
                  })
                  .catch(err => {

                  })
            },
            countOfStatusedTasks(status){
                return this.items.filter(item => item.status === status).length
            }

		},
		computed: {
           tasks(){
				return this.$store.getters.getTasks
			},
			statusedTasks(){
				return this.tasks.map(t => {
                    return {
                        ...t,
                        status: new Date(t.date) > new Date() && t.status !== 'completed' ? 'active' :
                         t.status === 'completed' ? 'completed' : 'outdated'
                     }
                })
			},
            filteredTasks(){
                return this.statusedTasks.filter(t => !this.selected ? true : t.status === this.selected)
            },
            rows() {
                return this.filteredTasks.length
            },
            items(){
                var self = this;

                return this.filteredTasks.map((t, ind) => {
                    return {
                       // '№': ind + 1,
                       'Название': t.title,
                       'Окончание': t.status !== 'outdated' && t.status !== 'completed' ? `${datefilter(t.date)} <div><b>Осталось:</b> ${self.formatedDeadline(moment(t.date))}</div>` : datefilter(t.date),
                       'Описание': t.description,
                       'Стаус': t.status,
                       'Редактирование': t.id,
                       'Удаление': t.id
                       }
                })
               
            },
            getUserState(){
                return this.$store.getters.getUser
            }
        },
        async created(){
            // this.tasks = []
            const fetchedTasks = await this.$store.dispatch('getTasks')
            // console.log(fetchedTasks)
            // this.tasks = fetchedTasks
        },
        destroyed(){
            console.log('list destroyed')
        },
        mixins: [toastsMixin]
	}
</script>

<style>
    .bi-x-circle-fill{
        color: red;
    }
    .trim-dotted p{
        max-width: 300px;
        white-space: nowrap;
         overflow: hidden;
        text-overflow: ellipsis;
    }
    .del-button, 
    .del-button:hover, 
    .del-button:focus, 
    .del-button:active, 
    .del-button:active:focus,
    .del-button:not(:disabled):not(.disabled):active:focus{
        padding: 0;
        border: none;
        background-color: transparent;
        outline: none;
        box-shadow: none;
    }
</style>