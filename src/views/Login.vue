<template>
  <card class="card" >
  
    <div class="">
      <form @submit.prevent="handleSubmit">
    

       <div class="container col-md-4">
        <div class="row">

          <img alt="Vue logo" src="../assets/logo.png">

          <div class="row">
            <label>Preencha com usuario e senha</label>
          </div>
          <br>
          <br>

          <v-alert
           :value="status.loggedErro"
           type="error"
           transition="scale-transition" >
           Houve um erro, por favor verifique usuário e senha

           <template v-slot:close="{ toggle }">
              <v-btn  color="error" @click="closeAlert(toggle)">X</v-btn>
           </template>

          </v-alert>

          <div class="row">
            <div>
              <div class="form-group">
                <input type="text" placeholder="Email" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
              </div>
            </div>
          </div>

        <div class="col-md-3">
            <div class="col-md-12 col-bg-color">
                <div class="row">
                </div>
            </div>
        </div>

          <div class="row">
            <div >
              <div class="form-group">
                <input type="password" placeholder="Senha"  v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
              </div>
            </div>
          </div>

        </div>
       </div>
        <br>
        <br>
        
        <div class="text-center">
            <div class="form-group">
                <button class="btn btn-primary btn-color" :disabled="status.loggingIn">Login</button>
                <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              
            </div>

        </div>
       
      </form>
    </div>
  </card>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            alert: false,
            username: '',
            password: '',
            submitted: false,
            dismissSecs: 10,
            dismissCountDown: 0,
            showDismissibleAlert: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit () {
            this.submitted = true;
            const { username, password } = this;
            
            if (username && password) {
                this.login({ username, password}),
                  setTimeout(() => {
                    this.status.loggedErro = false
                  }, 5000);
            }
        },

        closeAlert(toggle){
          toggle()
        },
    },

};

</script>
<style>
.btn-color {
    background-color: #1976d2 !important;
    border-color: #1976d2 !important;
}
</style>