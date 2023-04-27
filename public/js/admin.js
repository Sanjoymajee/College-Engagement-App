const path = 'https://college-engagement-51cbwktrf-sanjoymajee.vercel.app';
const devPath = 'http://localhost:5000';

const checkAdmin = (e) => {
    let type = document.getElementById('type').value;
    if (!(type === 'Notice' || type === 'Blog' || type === 'Interview')) {
        document.getElementById('submit').disabled = true;
        document.getElementById('admin').innerHTML = '';
    }
    const req = new XMLHttpRequest;
    req.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = await JSON.parse(this.responseText);
            // console.log(data);
            if (data.correct) {
                document.getElementById('submit').disabled = false;
                document.getElementById('admin').innerHTML = '';
            } else {
                if (!data.admin) {
                    document.getElementById('admin').innerHTML = 'Only Admins can create Notices';
                } else {
                    document.getElementById('submit').disabled = false;
                    document.getElementById('admin').innerHTML = '';
                }
            }
        }

    };
    if (type === 'Notice' || type === 'Blog' || type === 'Interview') {
        req.open('GET', `${path}/create-post/type?type=${type}`, true);
        req.send();
    }
}
