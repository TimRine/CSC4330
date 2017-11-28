//login authentication

window.addEventListener('load', function () {

    var webAuth = new auth0.WebAuth({
        domain: 'csc4330planit.auth0.com',
        clientID: 'x4vHo40XwEqmf4yzjNZkZC4n7HwiknAV',
        responseType: 'token id_token',
        audience: 'https://api.planit.com',
        scope: 'openid profile read:messages',
        redirectUri: 'index.html'
    });

    // ...
    var loginStatus = document.querySelector('.container h4');
    var loginView = document.getElementById('login-view');
    var homeView = document.getElementById('home-view');

    var apiUrl = 'http://localhost:3001/api';

    // ...
    function callAPI(endpoint, secured) {
        var url = apiUrl + endpoint;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        if (secured) {
            xhr.setRequestHeader(
                'Authorization',
                'Bearer ' + localStorage.getItem('access_token')
            );
        }
        xhr.onload = function () {
            if (xhr.status == 200) {
                // update message
                document.querySelector('#ping-view h2').innerHTML = JSON.parse(
                    xhr.responseText
                ).message;
            } else {
                alert('Request failed: ' + xhr.statusText);
            }
        };
        xhr.send();
    }

    var userProfile;

    function getProfile() {
        if (!userProfile) {
            var accessToken = localStorage.getItem('access_token');

            if (!accessToken) {
                console.log('Access token must exist to fetch profile');
            }

            webAuth.client.userInfo(accessToken, function (err, profile) {
                if (profile) {
                    userProfile = profile;
                    displayProfile();
                }
            });
        } else {
            displayProfile();
        }
    }

    function displayProfile() {
        // display the profile
        document.querySelector('#profile-view .nickname').innerHTML =
            userProfile.nickname;

        document.querySelector(
            '#profile-view .full-profile'
        ).innerHTML = JSON.stringify(userProfile, null, 2);

        document.querySelector('#profile-view img').src = userProfile.picture;
    }

    // buttons and event listeners
    var homeViewBtn = document.getElementById('btn-home-view');
    var loginBtn = document.getElementById('btn-login');
    var logoutBtn = document.getElementById('btn-logout');

    homeViewBtn.addEventListener('click', function () {
        homeView.style.display = 'inline-block';
        loginView.style.display = 'none';
    });

    logoutBtn.addEventListener('click', logout);

    function handleAuthentication() {
        webAuth.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                setSession(authResult);
                loginBtn.style.display = 'none';
                homeView.style.display = 'inline-block';
            } else if (err) {
                homeView.style.display = 'inline-block';
                console.log(err);
                alert(
                    'Error: ' + err.error + '. Check the console for further details.'
                );
            }
            displayButtons();
        });
    }

    function setSession(authResult) {
        // Set the time that the access token will expire at
        var expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    function logout() {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        displayButtons();
    }

    function isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    function displayButtons() {
        if (isAuthenticated()) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            loginStatus.innerHTML = 'You are logged in!';
        } else {
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            loginStatus.innerHTML =
                'You are not logged in! Please log in to continue.';
        }
    }

    window.addEventListener('load', function () {

        // ...
        handleAuthentication();
    });
});