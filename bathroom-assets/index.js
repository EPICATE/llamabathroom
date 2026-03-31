// add event listener to prevent enter key from submitting form
window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

// HANDLE ZIP ON HOME PAGE
const handleZipLead = (event) => {
    const zipLead = document.getElementById('zip_lead').value;
    const zipError = document.getElementById('zip-error');
    event.preventDefault();

    if (zipLead.length !== 5 || isNaN(zipLead)) {
        zipError.classList.remove('hidden');
        zipError.innerText = 'Please enter a valid zip code';
        return false;
    } else {
        zipError.classList.add('hidden');
        sessionStorage.setItem('zip_lead', zipLead);

        const params = new URLSearchParams(window.location.search);

        params.set('zip_lead', zipLead);

        // Redirect to steps with parameters
        window.location.href = `./steps?${params.toString()}`;
    }
}

// create a function to scroll to the top of the page when the user clicks the back or next button on mobile (use smooth scroll)
/*
const scrollToTop = () => {
    if (window.innerWidth < 768) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    } else {
        return;
    }
}
*/
const scrollToTop = () => {
    const scrollStep = -window.scrollY / (500 / 15); // Determines the speed of the scroll
    const animateScroll = () => {
        window.scrollBy(0, scrollStep);
        if (window.scrollY !== 0) {
            requestAnimationFrame(animateScroll);
        }
    };
    animateScroll();
};

// NAVBAR SCROLL EFFECT
/*
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.classList.remove('bg-transparent');
        navbar.classList.add('bg-black/80');
    } else {
        navbar.classList.remove('bg-black/80');
        navbar.classList.add('bg-transparent');
    }
});
*/

// SMOOTH SCROLL TO ZIP CODE SECTION
const ctaScroll = () => {
    document.getElementById('zipp').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    })
}

const handleAddress = () => {
    console.log('handleAddress');
    const address = document.getElementById('street_number');
    const error = document.getElementById('address-error');

    let addressValue = address.value;

    if (addressValue.length === 0) {
        error.classList.remove('hidden');
        error.innerText = 'Please enter your address';
        return false;
    } else {
        error.classList.add('hidden');
        error.innerText = '';
        return true;
    }
}

const handleEmail = () => {
    const email = document.getElementById('email').value;
    const error = document.getElementById('email-error');

    if (email.length === 0) {
        error.classList.remove('hidden');
        error.innerText = 'Please enter your email';
        return false;
    } else if (!email.includes('@')) {
        error.classList.remove('hidden');
        error.innerText = 'Please enter a valid email';
        return false;
    } else {
        error.classList.add('hidden');
        error.innerText = '';
        return true;
    }
}

const handleName = () => {
    const firstName = document.getElementById('first_name').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const firstNameError = document.getElementById('first-name-error');
    const lastNameError = document.getElementById('last-name-error');

    let isValid = true;

    // Validate First Name
    if (firstName.length === 0) {
        firstNameError.classList.remove('hidden');
        firstNameError.innerText = 'Please enter your first name';
        isValid = false;
    } else if (!isNaN(firstName) || firstName.length < 2) {
        firstNameError.classList.remove('hidden');
        firstNameError.innerText = 'Please enter a valid first name';
        isValid = false;
    } else {
        firstNameError.classList.add('hidden');
        firstNameError.innerText = '';
    }

    // Validate Last Name
    if (lastName.length === 0) {
        lastNameError.classList.remove('hidden');
        lastNameError.innerText = 'Please enter your last name';
        isValid = false;
    } else if (!isNaN(lastName) || lastName.length < 2) {
        lastNameError.classList.remove('hidden');
        lastNameError.innerText = 'Please enter a valid last name';
        isValid = false;
    } else {
        lastNameError.classList.add('hidden');
        lastNameError.innerText = '';
    }

    return isValid;
};


const handlePhone = () => {
    const error = document.getElementById('phone-error');
    const phone = document.getElementById('phone_number').value;

    if (phone.length === 0) {
        error.classList.remove('hidden');
        error.innerText = 'Please enter your phone number';
        return false;
    } else if (isNaN(phone)) {
        error.classList.remove('hidden');
        error.innerText = 'Please enter a valid phone number';
        return false;
    } else if (phone.length < 10) {
        error.classList.remove('hidden');
        error.innerText = 'Please enter a valid phone number';
        return false;
    } else {
        error.classList.add('hidden');
        error.innerText = '';
        return true;
    }
}



// PROGRESS BAR ANIMATION
const progress = document.getElementById('progress');
const progressText = document.getElementById('progress_percent');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
let form = document.getElementById('form');
let progressCount = 1;
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const nextBtn = document.querySelector('.next_btn');
const submitBtn = document.querySelector('.submit_btn');
const clickSubmitText = document.querySelector('.click_submit_text');

const steps = [step1, step2, step3];


function updateProgress(direction) {
    const currentStep = steps[progressCount - 1];
    const nextStep = steps[progressCount];

    currentStep.classList.remove('active');
    nextStep.classList.add('active');

    /*
    progressCount += direction;
    progress.style.width = `${(progressCount * 16.66).toFixed(0)}%`;
    progressText.innerText = `${(progressCount * 16.66).toFixed(0)}%`;
    */
    /* there are 3 steps, the first is on the home page, so we start at 2 */
    /* e.g the width starts at 14.28% and goes up to 100% */
    progressCount += direction;
    progress.style.width = `${(progressCount * 25).toFixed(0)}%`;
    // progressText.innerText = `${(progressCount * 25).toFixed(0)}%`;
}

next.addEventListener('click', event => {
    event.preventDefault();
    switch (progressCount) {
        case 1:
            next.style.display = 'block';
            scrollToTop();
            updateProgress(1);
            break;
        case 2:
            if (!handleAddress()) {
                return;
            }
            else {
                next.style.display = 'none';
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'flex';
                clickSubmitText.style.display = 'block';
                document.getElementById('click_submit_text_container').style.display = 'block';
                document.getElementById('prev').style.display = 'none';
                scrollToTop();
                updateProgress(1);
            }
            break;

        case 3:
            scrollToTop();
            updateProgress(1);
            break;
        default:
            break;
    }
})

prev.addEventListener('click', () => {

    next.style.display = 'none';
    if (progressCount === 1) {
        return;
    }
    const steps = [step1, step2, step3];
    steps[progressCount - 1].classList.remove('active');
    steps[--progressCount - 1].classList.add('active');

    progress.style.width = `${(progressCount * 25).toFixed(0)}%`;

    if (progressCount === 1) {
        next.style.display = 'none';
    } else {
        next.style.display = 'block';
    }
});


/* STEP 7 START */
// make the phone automatically format to (xxx) xxx-xxxx while typing in the input field but only if the user is typing in numbers

var phoneField = document.getElementById('phone_mask');
var phone = document.getElementById('phone_number');

phoneField.addEventListener('keyup', function () {
    var phoneValue = phoneField.value;
    var output;
    phoneValue = phoneValue.replace(/[^0-9]/g, '');
    var area = phoneValue.substr(0, 3);
    var pre = phoneValue.substr(3, 3);
    var tel = phoneValue.substr(6, 4);

    // if first number is 1, remove it
    if (area.charAt(0) == 1) {
        area = area.substr(1);
    }

    if (pre.length === 0) {
        output = "(" + area;
    } else if (area.length === 3 && pre.length < 3) {
        output = "(" + area + ")" + " " + pre;
    } else if (tel.length === 0) {
        output = "(" + area + ")" + " - " + pre;
    } else if (tel.length <= 4) {
        output = "(" + area + ")" + " - " + pre + " - " + tel;
    }

    phoneField.value = output;
    phone.value = area + pre + tel;
});

function setOwner(value) {
    let input = document.getElementsByName('residence_ownership')[0];
    let renter = document.getElementById('renter');
    let owner = document.getElementById('owner');

    if (value === true) {
        input.value = 1;
        owner.classList.add('active');
        renter.classList.remove('active');
    } else {
        input.value = 0
        renter.classList.add('active');
        owner.classList.remove('active');
    }
    next.click();
}


/* STEP 7 END */

// submit form in post request to jsonplaceholder.typicode.com/posts
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = handleName();
    const isPhoneValid = handlePhone();
    const isEmailValid = handleEmail();

    // If any validation fails, stop form submission
    if (!isNameValid || !isPhoneValid || !isEmailValid) {
        return; // Prevent form submission if any validation fails
    }

    var data = {
        zip_code: sessionStorage.getItem('zip_lead'),
        first_name: document.getElementById('first_name').value,
        _token: document.getElementById('_token').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        phone_number: document.getElementById('phone_number').value,
        street_number: document.getElementById('street_number').value,
        route: document.getElementById('route').value,
        locality: document.getElementById('locality').value,
        state: document.getElementById('state').value,
        postal_code: document.getElementById('postal_code').value,
        country: document.getElementById('country').value,
        full_address: document.getElementById('full_address').value,
        universal_leadid: document.getElementById('leadid_token').value,
        ip_address: document.getElementsByName('ip_address')[0].value,
        user_agent: document.getElementsByName('user_agent')[0].value,
        xxTrustedFormCertUrl: document.getElementsByName('xxTrustedFormCertUrl')[0].value,
        xxTrustedFormToken: document.getElementsByName('xxTrustedFormToken')[0].value,
        lp_campaign_id: document.getElementsByName('lp_campaign_id')[0].value,
        lp_campaign_key: document.getElementsByName('lp_campaign_key')[0].value,
        reqid: document.getElementsByName('reqid')[0].value,
        gclid: document.getElementsByName('gclid')[0].value,
        service_type: document.getElementById('service_type').value,
        home_owner: document.getElementById('residence_ownership').value,
        s1: document.getElementsByName('s1')[0].value,
        s2: document.getElementsByName('s2')[0].value,
        s3: document.getElementsByName('s3')[0].value,
        s4: document.getElementsByName('s4')[0].value,
        s5: document.getElementsByName('s5')[0].value,
        time_spent: TIME_SPENT,
        full_source_url: document.getElementsByName('full_source_url')[0].value,
    };

    let encodedData = '';
    for (const key of Object.keys(data)) {
        encodedData += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`;
    }

    encodedData = encodedData.slice(0, -1);

    console.log(encodedData);
    document.getElementById('submit').setAttribute('disabled', 'disabled');
    document.getElementById('submit').innerText = 'Loading...';

    fetch('/leads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodedData,
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            document.getElementById('submit').removeAttribute('disabled');
            document.getElementById('submit').innerText = 'Get My Quote';
            window.location.href = json.redirect_url;
        });
});





