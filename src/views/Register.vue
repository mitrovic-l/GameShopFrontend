<template>
    <div id="app">
        <b-container>
                <b-form @submit.stop.prevent @submit="onSubmit">
                    <b-form-group label="First name:" label-for="firstName">
                    <b-form-input :state="validatorFName" id="firstName" v-model="form.firstName" type="text" placeholder="First name" required></b-form-input>
                    <b-form-invalid-feedback :state="validatorFName">
                    First name must contain more than 1 character.
                    </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Last name:" label-for="lastName">
                    <b-form-input :state="validatorLName" id="lastName" v-model="form.lastName" type="text" placeholder="Last name" required></b-form-input>
                    <b-form-invalid-feedback :state="validatorLName">
                    Last name must contain more than 1 character.
                    </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Email:" label-for="email">
                    <b-form-input :state="validatorEmail" id="email" v-model="form.email" type="email" placeholder="email@example.com" required></b-form-input>
                    <b-form-invalid-feedback :state="validatorEmail">
                    That is not a valid email address.
                    </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Username:" label-for="username">
                    <b-form-input :state="validatorUsername" id="username" v-model="form.username" type="text" placeholder="Username" required></b-form-input>
                    <b-form-invalid-feedback :state="validatorUsername">
                    Username must be between 3 and 30 characters.
                    </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Password:" label-for="password">
                    <b-form-input :state="validatorPassword" id="password" v-model="form.password" type="password" placeholder="Password" required></b-form-input>
                    <b-form-invalid-feedback :state="validatorUsername">
                    Password must be between 8 and 256 characters.
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="validatorUsername && validatorPassword && validatorEmail && validatorFName && validatorLName">
                
                    </b-form-valid-feedback>
                    </b-form-group>
                <b-button type="submit" variant="success">Submit</b-button>
            </b-form>
        </b-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  
  components: {
    
  },

  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
      }
    }
  },

  methods: {
    ...mapActions([
      'register'
    ]),

    onSubmit(e) {
      e.preventDefault();
      const data = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        username: this.form.username,
        password: this.form.password,
      }
      if (this.validatorEmail && this.validatorFName && this.validatorLName && this.validatorPassword && this.validatorUsername){
        this.register(data);
        this.$router.push({ name: 'home' });
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
    },
    validatorEmail(){
        if (this.form.email.includes('@') && this.form.email.includes('.'))
            return true;
        return false;
    },
    validatorFName(){
        return this.form.firstName.length >= 1 && this.form.firstName.length <= 128;
    },
    validatorLName(){
        return this.form.lastName.length >= 1 && this.form.lastName.length <= 128;
    }
  }
}
</script>
<style scoped>
</style>