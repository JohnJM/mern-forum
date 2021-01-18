const form = document.querySelector('#register');
const usernameErr = document.querySelector('#register .username-err');
const passwordErr = document.querySelector('#register .password-err');

 //all of this validation needs refactored with reuseable functions...
form.addEventListener('submit', async (e) => { 
     e.preventDefault();

     //reset err
     usernameErr.textContent = "";
     passwordErr.textContent = "";


     const username = form.username.value;
     const password = form.password.value;

     try {
         console.log('initial hits');

         const res = await fetch('/signup', {
             method: 'POST',
             body: JSON.stringify({username, password}),
             headers: { 'Content-Type': 'application/json' }
         })

     
         //check if res is error or a user
         const data = await res.json();

         if(data.errors) {
             usernameErr.textContent = data.errors.username;
             passwordErr.textContent = data.errors.password;
         }
             
         else if (data.user){
             location.assign('/');
         }
     }
     catch(err) {
         console.log(`error: ${err}`);
     }

})