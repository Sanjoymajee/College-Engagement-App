const upVoted = () => {
    const blogId = document.getElementById('blogId').innerHTML;
    const msg = document.getElementById('message').innerHTML;
    if(msg == 'notLiked'){
        document.getElementById('liked').style.display = 'block';
        document.getElementById('not-liked').style.display = 'none';
        document.getElementById('message').innerHTML = 'liked';
    }
    else if(msg == 'liked'){
        document.getElementById('not-liked').style.display = 'block';
        document.getElementById('liked').style.display = 'none';
        document.getElementById('message').innerHTML = 'notLiked';
    }
    const req = new XMLHttpRequest;
    req.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = await JSON.parse(this.responseText);
            document.getElementById('updatedVote').innerHTML = data.upvote;
        }
    };
    req.open('GET', `https://college-blog-app.herokuapp.com/blog/vote/${blogId}/1`, true);
    req.send();
}