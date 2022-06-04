const upVoted = () => {
    const blogId = document.getElementById('blogId').innerHTML;
    const req = new XMLHttpRequest;
    req.onreadystatechange = async function() {
        if(this.readyState == 4 && this.status == 200){
            let data = await JSON.parse(this.responseText);
            document.getElementById('updatedVote').innerHTML = data.upvote;
            let changeButton = data.alreadyUpVoted;
            if(!changeButton){
                document.getElementById('liked').style.display = 'block';
                document.getElementById('not-liked').style.display = 'none';
            }
            else{
                document.getElementById('not-liked').style.display = 'block';
                document.getElementById('liked').style.display = 'none';
            }
        }
    };
    req.open('GET',`http://localhost:3000/blog/vote/${blogId}/1`,true);
    req.send();
}

const downVoted = () => {
    const blogId = document.getElementById('blogId').innerHTML;
    const req = new XMLHttpRequest;
    req.onreadystatechange = async function() {
        if(this.readyState == 4 && this.status == 200){
            let data = await JSON.parse(this.responseText);
            document.getElementById('updatedVote').innerHTML = data.upvote;
        }
    };
    req.open('GET',`http://localhost:3000/blog/vote/${blogId}/0`,true);
    req.send();
}