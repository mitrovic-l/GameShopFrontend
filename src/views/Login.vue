<template>
    <b-container>
        <br>
        <h4>Log in</h4>
            <b-form @submit.stop.prevent @submit="onSubmit">
            <b-form-group label="Username:" label-for="username">
            <b-form-input :state="validatorUsername" id="username" v-model="form.username" type="text" placeholder="Username" required></b-form-input>
            <b-form-invalid-feedback :state="validatorUsername">
            Username must be between 3 and 30 characters.
            </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Password:" label-for="password">
            <b-form-input :state="validatorPassword" id="password" v-model="form.password" type="password" placeholder="Password" required></b-form-input>
            <b-form-invalid-feedback :state="validatorPassword">
            Password must be between 8 and 256 characters.
            </b-form-invalid-feedback>  
            </b-form-group>
            <b-form-valid-feedback :state="validatorUsername && validatorPassword">
                
            </b-form-valid-feedback>
            <br>
            <b-button type="submit" variant="success">Log in</b-button>
        </b-form>
    </b-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  components: {
    
  },

  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions([
      'login'
    ]),

    onSubmit(e) {
      e.preventDefault();
      const data = {
        username: this.form.username,
        password: this.form.password
      }
      if (this.validatorUsername && this.validatorPassword){
        //this.login(data);
        this.login(data);
        this.$router.push({ name: 'home' });
      } else {
        
      }
    }
  },
  computed: {
    validatorUsername(){
        console.log("ispis za name"+this.form.username);
        return this.form.username.length >= 3 && this.form.username.length <= 30;
    },
    validatorPassword(){
        return this.form.password.length >= 8 && this.form.password.length <= 256;
    }
  }
}
</script>
<style scoped>
</style>