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
                    <input type="text" class="form-input" placeholder="Company Name" v-model="form.name"><br><br>

                    <input type="text" class="form-input" placeholder="Company Location" v-model="form.location"><br><br>

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
    name: 'company',
    components: {
        VueGoodTable,
    },
    data(){
        return {
            columns: [
                {
                    label: 'Company Name',
                    field: 'name',
                },
                {
                    label: 'Company Location',
                    field: 'location',
                },
            ],
            rows: [],
            form: {
                id: null,
                name: null,
                location: null
            },
            selectedCount: 0,
            selectedItems: [],
            isNew: false
        };
    },
    mounted() {
        this.getList()
    },
    methods: {
        selectionChanged(arg){
            this.selectedCount = arg.selectedRows.length

            this.selectedItems = arg.selectedRows
        },
        getList(){
            let header = this.$store.getters.headerReq
            
            var self = this

            axios.post('http://localhost:8080/api/companies', {}, header)
                .then(function (response) {
                    // console.log(response.data.data)
                    self.rows = response.data.data
                })
                .catch(function (error) {
                });
        },
        submit() {
            let header = this.$store.getters.headerReq

            let url = 'http://localhost:8080/api/companies/create'

            if(!!this.form.id) {
                url = 'http://localhost:8080/api/companies/update'
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
                location: this.selectedItems[0].location,
            }
            
            this.isNew = true
        },

        detele(){
            let header = this.$store.getters.headerReq

            var ids = this.pluck(this.selectedItems, 'id')

            axios.post('http://localhost:8080/api/companies/delete', {ids: ids}, header)
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