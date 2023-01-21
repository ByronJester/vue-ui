<template>
    <div class="">
        <div style="width:100%; padding: 3vw 2vw">
            <button class="action-button" style="float: left; background-color: #2692FF"
                v-if="selectedCount == 0" @click="isNew = true"
            >
                ADD
            </button>
            
            <button class="action-button" style="float: left; background-color: #00A396"
                v-if="selectedCount == 1"
                @click="update()"
            >
                UPDATE
            </button>

            <button class="action-button" style="float: left; background-color: #BF0D3E"
                v-if="selectedCount > 0"
                @click="detele()"
            >
                DELETE
            </button>

            <input type="text" placeholder="Message...." style="float:left; height: 37px; width: 30vw; margin-left: 5vw; margin-right: 10px; border-radius: 5px"
              v-if="selectedCount > 0" v-model="sms"
            >

            <button class="action-button" style="float: left; background-color: #00A396"
                v-if="selectedCount > 0"
                @click="sendMessage()"
            >
                SMS
            </button>
        </div>
        
        <div style="display: flex; flex-direction: row;">
            <div :style="{'width' : isNew ? '75%' : '100%'}" style="">
                <vue-good-table
                    styleClass="vgt-table condensed"
                    style="padding: 0vw 2vw; width: 96%"
                    v-on:selected-rows-change="selectionChanged"
                    :columns="columns"
                    :rows="rows"
                    :pagination-options="{ enabled: true }"
                    :select-options="{ enabled: true }"
                    :search-options="{ enabled: true }">
                </vue-good-table>
            </div>

            <div v-if="isNew" style="width: 25%">
                <div style="border: 1px solid black; border-radius: 5px; padding: 10px 10px 10px 10px">
                    <input type="text" class="form-input" placeholder="Employee Name" v-model="form.name"><br><br>

                    <input type="text" class="form-input" placeholder="Contact #" v-model="form.contact"><br><br>

                    <select class="form-input" v-model="form.company_id">
                      <option :value="company.id" v-for="company in companies" :key="company.id">
                        {{company.name}}
                      </option>
                    </select><br><br>

                    <select class="form-input" v-model="form.department_id">
                      <option :value="department.id" v-for="department in departments" :key="department.id">
                        {{department.name}}
                      </option>
                    </select><br><br>

                    <button class="submit-button" @click="submit()">
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';
import axios from 'axios'

export default {
    name: 'employee',
    components: {
        VueGoodTable,
    },
    data(){
        return {
            columns: [
                {
                    label: 'Employee Name',
                    field: 'name',
                },
                {
                    label: 'Contact #',
                    field: 'contact',
                },
                {
                    label: 'Company',
                    field: 'company_name',
                },
                {
                    label: 'Department',
                    field: 'department_name',
                },
            ],
            rows: [],
            form: {
                id: null,
                company_id: null,
                department_id: null,
                name: null,
                contact : null,
            },
            selectedCount: 0,
            selectedItems: [],
            isNew: false,
            companies: [],
            departments: [],
            sms: null
        };
    },
    mounted() {
        this.getList()
        this.getCompanies()
        this.getDepartments()
    },
    methods: {
        selectionChanged(arg){
            this.selectedCount = arg.selectedRows.length

            this.selectedItems = arg.selectedRows
        },
        getList(){
            let header = this.$store.getters.headerReq
            
            var self = this

            axios.post('http://localhost:8080/api/employees', {}, header)
                .then(function (response) {
                    // console.log(response.data.data)
                    self.rows = response.data.data
                })
                .catch(function (error) {
                });
        },
        getCompanies(){
          let header = this.$store.getters.headerReq
            
            var self = this

            axios.post('http://localhost:8080/api/companies', {}, header)
                .then(function (response) {
                    // console.log(response.data.data)
                    self.companies = response.data.data
                })
                .catch(function (error) {
                });
        },
        getDepartments(){
          let header = this.$store.getters.headerReq
            
            var self = this

            axios.post('http://localhost:8080/api/departments', {}, header)
                .then(function (response) {
                    // console.log(response.data.data)
                    self.departments = response.data.data
                })
                .catch(function (error) {
                });
        },
        submit() {
            let header = this.$store.getters.headerReq

            let url = 'http://localhost:8080/api/employees/create'

            if(!!this.form.id) {
                url = 'http://localhost:8080/api/employees/update'
            }

            axios.post(url, this.form, header)
                .then(function (response) {
                    location.reload()
                })
                .catch(function (error) {
                });
        },

        update() {
            this.form = {
                id: this.selectedItems[0].id,
                name: this.selectedItems[0].name,
                contact: this.selectedItems[0].email,
                company_id: this.selectedItems[0].company_id,
                department_id: this.selectedItems[0].department_id,
            }
            
            this.isNew = true
        },

        detele(){
            let header = this.$store.getters.headerReq

            var ids = this.pluck(this.selectedItems, 'id')

            axios.post('http://localhost:8080/api/employees/delete', {ids: ids}, header)
                .then(function (response) {
                    location.reload()
                })
                .catch(function (error) {
                });
        },
        sendMessage(){
          let header = this.$store.getters.headerReq

            var contacts = this.pluck(this.selectedItems, 'contact')

            axios.post('http://localhost:8080/api/employees/send-sms', {contacts: contacts, message: this.sms}, header)
                .then(function (response) {
                    location.reload()
                })
                .catch(function (error) {
                });
        },
        pluck(array, key) {
            return array.map(function(item) { return item[key]; });
        }
    }
}
</script>

<style scoped>
    .action-button {
        height: 40px;
        width: 100px;
        margin-right: 3px;
        color: white;
        border-radius: 5px;
        cursor: pointer;
    }

    .form-input {
        width: 100%;
        height: 40px;
        text-align: center;
        border: 1px solid black;
        border-radius: 5px;
    }

    .submit-button {
        width: 100%;
        height: 40px;
        text-align: center;
        border: 1px solid black;
        border-radius: 5px;
        background: #2692FF;
        color: white;
        font-weight: bold;
        letter-spacing: 2px;
        cursor: pointer;
    }
</style>