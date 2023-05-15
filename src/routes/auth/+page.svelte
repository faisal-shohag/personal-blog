<script>
    import Icon from '@iconify/svelte';
    import {goto} from '$app/navigation';
    import {ref, update} from "firebase/database";
    import { onMount } from 'svelte';
    import {onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
    import { fauth, db } from "../../firebase";
  

const handleSignIn = async () => {
    try {
        let res = await signInWithPopup(fauth, new GoogleAuthProvider());
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
}

onMount(async () => {
    onAuthStateChanged(fauth, async(user) => {
        if(user) {
            // console.log(user);
            // userStore.set({...user, loggedIn: true});
            let data ={
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }

            try {
                update(ref(db, 'users/'+user.uid), data);
            } catch (err) {
                console.log(err);
            }
            goto('/');
        } else{
            // console.log('User Not Logged In!');
        }
        
    });
})
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={handleSignIn} class="card flex items-center gap-2 justify-center p-2 text-lg cursor-pointer font-lato">
    <Icon icon="bi:google" /> <div>Google Sign In</div>
</div>

