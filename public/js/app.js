const checkUser = (e) => {
    let username = document.getElementById('username').value;
    // console.log(username);
    const req = new XMLHttpRequest;
    req.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = await JSON.parse(this.responseText);
            if (data.length < 6) {
                document.getElementById('user').innerHTML = 'Username must be atleast 6 character long';
                document.getElementById('user').style.color = 'red';
            } else {
                if (data.userExists) {
                    document.getElementById('user').innerHTML = 'User Exists';
                    document.getElementById('user').style.color = 'red';
                    document.getElementById('signUpSubmit').disabled = true;
                } else {
                    document.getElementById('user').innerHTML = 'Username can be used';
                    document.getElementById('user').style.color = 'green';
                    document.getElementById('signUpSubmit').disabled = false;
                }
            }
        }

    };
    req.open('GET', `https://college-blog-app.herokuapp.com/signup/username?username=${username}`, true);
    req.send();
}

const checkEmail = (e) => {
    let email = document.getElementById('email').value;
    const req = new XMLHttpRequest;
    req.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = await JSON.parse(this.responseText);
            if (data.userExists) {
                document.getElementById('user').innerHTML = 'Email is used by another User';
                document.getElementById('user').style.color = 'red';
                document.getElementById('signUpSubmit').disabled = true;
            } else {
                document.getElementById('user').innerHTML = '';
                document.getElementById('signUpSubmit').disabled = false;
            }
        }

    };
    req.open('GET', `https://college-blog-app.herokuapp.com/signup/email?email=${email}`, true);
    req.send();
}