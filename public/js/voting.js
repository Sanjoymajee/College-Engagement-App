const path = 'https://collegebloggers.herokuapp.com';
const devPath = 'http://localhost:5000';

const upVoted = () => {
    const blogId = document.getElementById('blogId').innerHTML;
    const msg = document.getElementById('message').innerHTML;
    const votes = document.getElementById('updatedVote').innerHTML;
    if(msg == 'notLiked'){
        document.getElementById('liked').style.display = 'block';
        document.getElementById('not-liked').style.display = 'none';
        document.getElementById('message').innerHTML = 'liked';
        document.getElementById('updatedVote').innerHTML = Number(votes)+1;
    }
    else if(msg == 'liked'){
        document.getElementById('not-liked').style.display = 'block';
        document.getElementById('liked').style.display = 'none';
        document.getElementById('message').innerHTML = 'notLiked';
        document.getElementById('updatedVote').innerHTML = Number(votes)-1;
    }
    const req = new XMLHttpRequest;
    req.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = await JSON.parse(this.responseText);
        }
    };
    req.open('GET', `${devPath}/blog/vote/${blogId}/1`, true);
    req.send();
}