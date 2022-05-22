<template>
 <div v-if="loading">

  <v-alert
    :value="alertSucess"
    type="success"
    transition="scale-transition" >
    Alteração realizada com sucesso
    <template v-slot:close="{ toggle }">
      <v-btn  color="success" @click="closeAlert(toggle)">X</v-btn>
    </template>

  </v-alert>

  <v-data-table
    :headers="headers"
    :items="individuals"
    :loading="loadingGrid"
    :hide-default-footer="true"
    class="elevation-1" >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title></v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" >
 
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4">
                    <v-text-field :disabled="true"
                      v-model="editedItem.name"
                      label="Nome"></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4">
                    <v-text-field :disabled="true"
                      v-model="editedItem.ocupation"
                      label="Ocupação"></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4">
         
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogApprove" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Deseja alterar o status desse usuário</v-card-title>

            <div>
              <div style="width: max-content; margin: auto;">
                <input type="checkbox" id="checkbox" v-model="editedItem.active">
                <label for="checkbox" style="padding-left: 10px;"> {{ editedItem.active ? 'Aprovado' : 'Não Aprovado' }} </label>
              </div>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeApprove">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="approveItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`] ="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)">
        mdi-account
      </v-icon>
      <v-icon
        small
        @click="approveItem(item)">
        mdi-pencil
      </v-icon>
    </template>


      <template v-slot:[`item.creationDate`] ="{ item }">
        <span>{{ format_date(item.creationDate) }}</span>
      </template>


      <template v-slot:[`item.document`] ="{ item }">
        <span>{{ item.document | VMask('###.###.###-##') }}</span>
      </template>

      <template v-slot:[`item.active`] ="{ item }">
        <span>{{ item.active ? 'Aprovado' : 'Não Aprovado' }}</span>
      </template>


  </v-data-table>


    <div class="text-center">
      <div class="pagination-custom">
        <v-pagination class="color-default-buton" v-model="page" :length="totalPage" circle @input="pageUpdateFunction"></v-pagination>
      </div>
    </div>

 </div>
 
</template>

<script>

  import { mapState, mapActions } from 'vuex'
  import moment from 'moment'

  export default {
    data: () => ({
      loading: false,
      loadingGrid: true,
      dialog: false,
      dialogDelete: false,
      dialogApprove: false,
      alertSucess: false,
      page: 1, 
      size: 5,
      totalPage: 0,

      headers: [
        {
          text: 'Volutários cadastradas',
          align: 'start',
          value: 'name',
        },
        { text: 'email', value: 'email' },
        { text: 'Documento', value: 'document' },
        { text: 'Data de criação', value: 'creationDate' },
        { text: 'Status', value: 'active' },
        { text: 'Actions', value: 'actions' },
      ],
      individuals: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      ...mapState('account', ['status']),
      formTitle () {
        return  ''
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      ...mapActions('account', ['getAllIndividuals', 'updateStatus']),
      initialize () {
        this.getList();
      },

    editItem(item) {
      this.editedIndex = this.individuals.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    approveItem(item) {
      this.editedIndex = this.individuals.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogApprove = true
    },

    approveItemConfirm () {
      this.closeApprove()
    },

    close () {
      this.dialog = false;
    },

    closeApprove () {
      this.dialogApprove = false;

      const id = this.editedItem.id;
      const approve = this.editedItem.active;
      var individual = this.individuals.find(element => element.id == id);

      if(individual.active != approve) {
        this.updateStatus({ id, approve }).then(() => {
            individual.active = approve;
            this.alertSucess = true;
            setTimeout(() => {
              this.alertSucess = false;
            }, 5000);
        }).catch(err => {
          console.log(err);
        });
      }

    },

    format_date(value){
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },

    pageUpdateFunction(newPageNumber) {
        this.page = newPageNumber;
        this.getList();
    },

     getList() {
        this.loadingGrid = true;
        const { page, size } = this;

        this.getAllIndividuals({ page, size }).then(response => {
          if(response!=null && response.total > 0) {
            this.individuals=response.items;
            this.totalPage=Math.ceil(response.total / size);
            this.loading=true;
            this.loadingGrid=false;
          }
        }).catch(err => {
          console.log(err)
        })
      },

      closeAlert(toggle){
        toggle()
      },

    },
  }
</script>

<style>

.pagination-custom {
    background: white;
    margin-top: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    
    border-radius: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
}

button v-application {
  background-color: #7A9E9F !important;
  border-color: #7A9E9F !important;
}


</style>
