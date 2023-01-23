<template>
    <div class="">
        <div style="display: flex; flex-direction: row;">
            <div :style="{'width' : isNew ? '100%' : '100%'}" style="">
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
                    label: 'SMS',
                    field: 'description',
                },
            ],
            rows: []
        };
    },
    mounted() {
        this.getList()
    },
    methods: {
        selectionChanged(arg){
        },
        getList(){
            let header = this.$store.getters.headerReq
            
            var self = this

            axios.post('http://localhost:8080/api/logs', {}, header)
                .then(function (response) {
                    // console.log(response.data.data)
                    self.rows = response.data.data
                })
                .catch(function (error) {
                });
        },
        
    }
}
</script>

<style scoped>

</style>