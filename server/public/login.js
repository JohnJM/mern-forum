const form = document.querySelector('#login');
const usernameErr = document.querySelector('#login .username-err');
const passwordErr = document.querySelector('#login .password-err'); 

console.log('her ');

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

         const res = await fetch('/login', {
             method: 'POST',
             body: JSON.stringify({username, password}),
             headers: { 'Content-Type': 'application/json' }
         })

     
         //check if res is error or a user
         const data = await res.json();

         if(data.errors) {
             console.log('her e');
             usernameErr.textContent = data.errors.username;
             passwordErr.textContent = data.errors.password;
         }
             
         else if (data.user){
            //    console.log({user: data.user})
             location.assign('/');
             console.log({user: data.user})
         }
     }
     catch(err) {
         console.log(`error: ${err}`);
     }

})